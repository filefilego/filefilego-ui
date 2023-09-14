import { reactive } from 'vue'
import queue from "queue";
import axios from "axios";
import uploader from "./uploader";
import { callJsonRpc2Endpoint } from "./rpc.js"
import path from "path"
import { Units } from "./unit.js"
import BigNumber from 'bignumber.js';

const { ipcRenderer } = window.require("electron");

const globalState = reactive({
    blockchain_height: 0,
    heighest_block_number_discovered: 100,
    syncing: true,

    // downloader
    downloads: [

    ],
    // uploader
    lastHowManyItemsToUpload: 0,
    uploadingData: false,
    uploadEndpoint: "http://127.0.0.1:9036/uploads",
    mediaEndpoint: "http://127.0.0.1:9036/media",
    upload_data: [],
    name_conflicts: [],

    remoteUploadEndpoint: "",
    remoteUploadAccessToken: "",

    rpcEndpoint: "",
    password: "",
    node_type: "",
    downloadsPath: "",
    storagePath: "",
    storageAccessToken: "",
    storageFees: "",
    jwtAccessToken: "",
    nodeAddress: "",
    publicKey: "",
    peerID: "",
    peerCount: 0,
    storagePublic: false,
    allowDynamicFees: false,
    channel_creation_fees_ffg_hex: "",
    remaining_channel_operation_fees_miliffg_hex: "",
    storage_providers: [],
    // balance related
    nodeBalance: "",
    currentNounce: "",
    nextNounce: "",
    entryCreationMode: false,
    updateEntryMode: false,
})

var GlobalQueue = (function () {
    // Private variable
    var instance;

    // Private method or variable declaration
    function initialize() {
        // Private properties
        var variable = new queue();

        // Public methods
        return {
            getVariable: function () {
                return variable;
            }
        };
    }

    // Public method to create/access the instance
    return {
        getInstance: function () {
            if (!instance) {
                instance = initialize();
            }
            return instance;
        }
    };
})();

var filesQueue = GlobalQueue.getInstance().getVariable()
filesQueue.concurrency = 4;
filesQueue.autostart = false;

const asyncFunctionFactory = (item, storageAccessToken, uploadEndpoint, fileOwnerPublicKey) => {
    return () => {
        /* eslint-disable no-async-promise-executor */
        return new Promise(async (resolve, reject) => {
            try {
                if (item.canceled) return resolve("CANCELED");

                if (item.type == "file") {

                    // single file
                    item.cancel = axios.CancelToken.source();
                    let formData = new FormData();
                    let feesPerByte = item.fees_per_byte;
                    
                    formData.append("fees_per_byte", feesPerByte);
                    formData.append("public_key_owner", fileOwnerPublicKey);
                    formData.append("file", item.file);
                    formData.append("node_hash", item.node_hash);

                    let result = await uploader.uploadData(
                        uploadEndpoint,
                        storageAccessToken,
                        formData,
                        item.cancel,
                        (progressEvent) => {
                            item.progress = Number(progressEvent.loaded);
                        }
                    );

                    if (result.error != undefined) {
                        item.error = result.error.message;
                    } else {
                        item.file_hash = result.data.file_hash;
                        item.merkle_root_hash = result.data.merkle_root_hash;
                        item.progress = result.data.size

                        if(item.upload_type == "other") {
                            try {
                                await callJsonRpc2Endpoint("storage.SaveUploadedFileMetadataLocally", [{ files: [{ file_name: result.data.file_name, merkle_root_hash: result.data.merkle_root_hash, hash: result.data.file_hash , file_path: "", size: result.data.size, remote_peer: uploadEndpoint }] }])
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }
                }

                if (filesQueue.length <= 1) {
                    StopUpload();
                }

                resolve("success");
            } catch (e) {
                if (filesQueue.length <= 1) {
                    StopUpload();
                }

                item.error = e.message;
                reject(e);
            }
        });
    };
};


const asyncDownloadFileWithProgress = (fileItem, reDownload) => {
    return () => {
        /* eslint-disable no-async-promise-executor */
        return new Promise(async (resolve, reject) => {
           
            try {
                await callJsonRpc2Endpoint("data_transfer.DownloadFile", [{ contract_hash: fileItem.contract_hash, file_hash: fileItem.file_hash, re_download: reDownload }])
                fileItem.progressInterval = setInterval(async () => {
                    let res = await callJsonRpc2Endpoint("data_transfer.DownloadFileProgress", [{ contract_hash: fileItem.contract_hash, file_hash: fileItem.file_hash }])
                    fileItem.progress = res.data.result.bytes_transferred;
                    if(res.data.result.error != "") {
                        clearInterval(fileItem.progressInterval)
                        fileItem.error = res.data.result.error;
                        reject(res.data.result.error);
                    }

                    if(res.data.result.paused) {
                        clearInterval(fileItem.progressInterval)
                        reject("paused");
                    }

                    if(fileItem.progress >= fileItem.size && res.data.result.file_concatenation) {
                        clearInterval(fileItem.progressInterval)
                        
                        let fileName = ""
                        for(let i=0; i< fileItem.contract.file_hoster_response.file_hashes.length;i++) {
                            if(fileItem.contract.file_hoster_response.file_hashes[i] == fileItem.file_hash) {
                                fileName = fileItem.contract.file_hoster_response.file_names[i];
                            }
                        }

                        // restore the original file name
                        if(fileName != "" && fileItem.free_download) {
                            let restoredFilePath = path.join(globalState.downloadsPath, fileName)
                            fileItem.restoredFilePath = restoredFilePath;
                            await callJsonRpc2Endpoint("data_transfer.MoveDirectDownloadsToDestination", [{ contract_hash: fileItem.contract_hash, file_hashes: [fileItem.file_hash], restored_file_paths: [ restoredFilePath ] }])
                        }

                        if(!fileItem.free_download) {
                            try {
                                let sigResponse = await callJsonRpc2Endpoint("data_transfer.SendFileMerkleTreeNodesToVerifier", [{ contract_hash: fileItem.contract_hash, file_hash: fileItem.file_hash }])
                                if(sigResponse.data.result.success) {
                                    fileItem.sentSig = true;
                                }
                            } catch (e) {
                                if (e.name == 'NetworkError') {
                                    fileItem.sendSigError =  e.message;
                                } else {
                                    fileItem.sendSigError =  e.response.data.error;
                                }
                            }
                        }

                        resolve(fileItem);
                    }
                }, 1000)
            } catch (e) {
                clearInterval(fileItem.progressInterval)
                reject(e);
            }
        });
    };
};



const asyncDownloadFactory = (item, reDownload) => {
    return () => {
        /* eslint-disable no-async-promise-executor */
        return new Promise(async (resolve, reject) => {
            try {
                item.started = true;
                item.started_at = Date.now(); 
                for(let i=0; i<item.contracts.length;i++) {
                   for(let j=0; j<item.contracts[i].file_hashes_needed.length;j++) {
                       item.fileDownloads.push({
                           progressInterval: null,
                           sendSigError: "",
                           sentSig: false,
                           free_download: item.free_download,
                           restoredFilePath: "",
                           contract: item.contracts[i],
                           contract_hash: item.contracts[i].contract_hash,
                           file_hash:  item.contracts[i].file_hashes_needed[j],
                           size:  item.contracts[i].file_hashes_needed_sizes[j],
                           progress: 0,
                           error: ""
                       })

                       item.queue.push(asyncDownloadFileWithProgress(item.fileDownloads[item.fileDownloads.length -1], reDownload))
                   }
                }
                
                item.queue.start()
                item.queue.addEventListener('end', e => {
                    try {
                        if(e.detail != undefined && e.detail.error == "paused") {
                            reject("paused");
                            return;
                        }
                    } catch (e) {
                        console.log(e)
                    }
                   
                    item.finished_at = Date.now();
                    let downloadsWithErrors = item.fileDownloads.filter((o) => o.error != "").length
                    if(downloadsWithErrors > 0) {
                        item.error = item.fileDownloads[0].error
                        reject(item.error);
                        return
                    }

                    if(!item.free_download) {
                        let tries = 0;
                        let decryptInterval = setInterval(async() => {
                            if(tries > 50) {
                                clearInterval(decryptInterval);
                                item.decryptionError = "Timeout asking verifier for decryption key";
                                reject(item.decryptionError);
                            }
                            tries++
                            try {
                                let res = await callJsonRpc2Endpoint("data_transfer.VerifierHasEncryptionMetadata", [ { contract_hash: item.contracts[0].contract_hash }] )
                                if(res.data.result.verified) {
                                    // decrypt all files
                                    // TODO: refactor this so it getts the file names and hashes based on item.contracts[i].file_hashes_needed[j],
                                    let filePaths = item.contracts[0].file_hoster_response.file_names.map((o) => {
                                        return path.join(globalState.downloadsPath, o)
                                    })

                                    try {
                                        let decryptionResult = await callJsonRpc2Endpoint("data_transfer.RequestEncryptionDataFromVerifierAndDecrypt", [ { contract_hash: item.contracts[0].contract_hash, file_hashes: item.contracts[0].file_hoster_response.file_hashes, file_merkle_root_hashes: item.contracts[0].file_hoster_response.file_merkle_root_hashes, restored_file_paths: filePaths}] )
                                        if(decryptionResult.data.result.decrypted_file_paths.length == filePaths.length) {
                                            item.decrypted = true;
                                            clearInterval(decryptInterval);
                                            ipcRenderer.sendSync("remove-folder", path.join(globalState.downloadsPath, item.contracts[0].contract_hash))
                                        }
                                    } catch (e) {
                                        if (e.name == 'NetworkError') {
                                            item.decryptionError = e.message;
                                        } else {
                                            item.decryptionError = e.response.data.error
                                        }
                                    }
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }, 3000)
                    } else {
                        item.decrypted = true;
                        ipcRenderer.sendSync("remove-folder", path.join(globalState.downloadsPath, item.contracts[0].contract_hash))
                        resolve("done");
                    }
                    resolve(e);
                })
            } catch (e) {
                reject(e);
            }
        });
    };
};

var GlobalDownloadsQueue = (function () {
    // Private variable
    var inst;

    // Private method or variable declaration
    function initialize() {
        // Private properties
        var q = new queue();

        // Public methods
        return {
            getVariable: function () {
                return q;
            }
        };
    }

    // Public method to create/access the instance
    return {
        getInstance: function () {
            if (!inst) {
                inst = initialize();
            }
            return inst;
        }
    };
})();


let fileDownloadsQueue = GlobalDownloadsQueue.getInstance().getVariable()
fileDownloadsQueue.concurrency = 3;
fileDownloadsQueue.autostart = true;

export function AddToDownloads(downloadItem) {
    // skip if a contract is already there with the same hash
    let foundDupes = downloadItem.contracts.filter((l) => {
        let found = false;
        globalState.downloads.filter((o) => {
            o.contracts.filter((j) => {
                if (JSON.stringify(j.file_hashes_needed) == JSON.stringify(l.file_hashes_needed)) {
                    found = true;
                }
            })
        })
        return found;
    })

    if (foundDupes.length > 0) {
        return false;
    }

    let localQueue = new queue();
    localQueue.concurrency = 2;
    localQueue.autostart = false;
    downloadItem.queue = localQueue;

    globalState.downloads.push(downloadItem);
    fileDownloadsQueue.push(asyncDownloadFactory(globalState.downloads[globalState.downloads.length - 1], false))
    
    return true;
}

export function ResumeDownloads(downloadItem) {
    let localQueue = new queue();
    localQueue.concurrency = 2;
    localQueue.autostart = false;
    downloadItem.queue = localQueue;
    downloadItem.paused = false;
    fileDownloadsQueue.push(asyncDownloadFactory(downloadItem, false))
}

export function RestartDownload(downloadItem) {
    let localQueue = new queue();
    localQueue.concurrency = 2;
    localQueue.autostart = false;
    downloadItem.queue = localQueue;
    downloadItem.paused = false;
    downloadItem.cancelled = false;

    fileDownloadsQueue.push(asyncDownloadFactory(downloadItem, true))
}

export {
    globalState
}

export function SetBlockchainStats(blockchain_height, heighest_block_number_discovered, syncing) {
    globalState.blockchain_height = blockchain_height
    globalState.heighest_block_number_discovered = heighest_block_number_discovered;
    globalState.syncing = syncing;
}

export function SetRpcEndpoint(nodeType) {
    if (nodeType == "superlight") {
        globalState.rpcEndpoint = "https://rpc.filefilego.com/rpc";
        // globalState.rpcEndpoint = "http://validator.local:8090/rpc";
    } else {
        globalState.rpcEndpoint = "http://127.0.0.1:9036/rpc";
    }
}

export function SetPublicStorage(storagePublic, allowDynamic){
    globalState.storagePublic = storagePublic;
    globalState.allowDynamicFees = allowDynamic;
}

export function SetRemoteUploadSettings(endpoint, accessToken){
    globalState.remoteUploadEndpoint = endpoint;
    globalState.remoteUploadAccessToken = accessToken;

}

export function SetHowManyItemsToUpload(items) {
    globalState.uploadingData = true;
    globalState.lastHowManyItemsToUpload = items;
}

export function StartUpload(howManyItems) {
    if(filesQueue.length == 0) return;
    globalState.uploadingData = true;
    globalState.lastHowManyItemsToUpload = howManyItems;
    filesQueue.start();
}

export function StopUpload() {
    globalState.uploadingData = false;
    filesQueue.stop();
}

export function UpdateFileUploadToNetworkProgress(files) {
    let completed = 0;
    let atLeastOneWithoutMetadata = false;
    files.filter((o) => {
        globalState.upload_data.filter((j) => {
            if (o.file_path == j.filepath) {
                // its an async operation, the API might get the full progress however the filemetadata wont
                // be in leveldb when we read them, so we make sure to read 
                // until we find metadata
                if(o.metadata.merkle_root_hash == "" && o.error == "") {
                    atLeastOneWithoutMetadata = true;
                }

                j.progress = o.progress;
                j.error = o.error;
                j.merkle_root_hash = o.metadata.merkle_root_hash;
                // j.size = o.metadata.size;
                j.file_hash = o.metadata.hash;
                if(j.progress >= j.size || j.error != "") {
                    completed++
                }
            }
        })
    })

    if(atLeastOneWithoutMetadata) {
        return false;
    }

    return completed == files.length;
}

export function CancelItemFromUpload(index) {
    globalState.upload_data[index].canceled = true;
    if (globalState.upload_data[index].cancel) globalState.upload_data[index].cancel.cancel();

    if(globalState.upload_data[index].upload_type == "network"){
        callJsonRpc2Endpoint("storage.CancelUpload", [{ files: [ { peer_id: globalState.upload_data[index].remote_peer, file_path: globalState.upload_data[index].filepath }] }])
    }
}


export function RemoveItemFromUpload(index) {
    globalState.upload_data.splice(index, 1);
}

export function ClearItemsFromUpload() {
    globalState.upload_data = []
}

export function SetFeesAllUploads(fees) {
    globalState.upload_data.forEach((obj) => {
        try {
            if(fees == "0") {
                obj.fees_per_byte = "0";
                obj.fees_input_model = "0"
            } else {
                let userFees = Units.convert(fees, "FFG", "FFGOne")
                let userFeesFFGOne = new BigNumber(userFees, 10)
                let sizeBig = new BigNumber(obj.size, 10);
                let finalFeesPerByte = userFeesFFGOne.div(sizeBig)
                obj.fees_per_byte = finalFeesPerByte.toFixed(0);
                obj.fees_input_model = "set"
                obj.fees_input_value = fees
            }
        } catch (e) {
            alert("Enter a valid fee: " + e.message)
        }
    })
}

export function SetFeesUpload(idx, fees) {
    if(fees == "0") {
        globalState.upload_data[idx].fees_per_byte = "0"
        globalState.upload_data[idx].fees_input_model = "0"
    } else {
        let sizeBig = new BigNumber(globalState.upload_data[idx].size, 10);
        let userFees = Units.convert(fees, "FFG", "FFGOne")
        let userFeesFFGOne = new BigNumber(userFees, 10)
        let finalFeesPerByte = userFeesFFGOne.div(sizeBig)
        globalState.upload_data[idx].fees_per_byte = finalFeesPerByte.toFixed(0);
        globalState.upload_data[idx].fees_input_model = "set"
        globalState.upload_data[idx].fees_input_value = fees
    }
}

export function CheckAndFixFileFeesBeforeUpload() {
    globalState.upload_data.forEach((o) => {
        if(o.fees_input_model == "") {
            o.fees_per_byte = ""
        }
    })
}

export function AddToUploadData(val, storageAccessToken, endPoint, onlyState, ownerPublicKey) {
    let isConflict = globalState.upload_data.filter((o) => o.name == val.name).length > 0;
    if (isConflict) {
        globalState.name_conflicts.push(val);
    } else {
        globalState.upload_data.push(val);
        if (!onlyState) {
            if (val.rpc_upload) {
                filesQueue.push(
                    asyncFunctionFactory(
                        globalState.upload_data[globalState.upload_data.length - 1],
                        storageAccessToken,
                        endPoint,
                        ownerPublicKey
                    )
                );
            }
        }
    }
}

export function SetStorageProviders(val) {
    globalState.storage_providers = val;
}

export async function RemoveItemFromDownloads(index) {
    if(globalState.downloads[index].decrypted) {
        globalState.downloads.splice(index, 1);
        return
    }

    if(globalState.downloads[index].cancelled) {
        globalState.downloads.splice(index, 1);
    } else {
        globalState.downloads[index].cancelled = true;
        for (let i=0;i<globalState.downloads[index].contracts.length;i++) {
            let contractHash = globalState.downloads[index].contracts[i].contract_hash
            await callJsonRpc2Endpoint("data_transfer.CancelFileDownloadsByContractHash", [{ contract_hash: contractHash}])
        }
    }
}           

export async function PauseDownload(index) {
    for (let i=0;i<globalState.downloads[index].contracts.length;i++) {
        // clear any running interval
        // for(let m = 0; m<globalState.downloads[index].fileDownloads.length;m++) {
        //     clearInterval(globalState.downloads[index].fileDownloads[m].progressInterval)
        // }

        globalState.downloads[index].paused = true;
        let contractHash = globalState.downloads[index].contracts[i].contract_hash
        for(let j=0; j<globalState.downloads[index].contracts[i].file_hashes_needed.length;j++) {
            let fileHash = globalState.downloads[index].contracts[i].file_hashes_needed[j]
            await callJsonRpc2Endpoint("data_transfer.PauseFileDownload", [{ contract_hash: contractHash, file_hash: fileHash }])
        }
    }
}

// export async function Resume(index) {
//     for (let i=0;i<globalState.downloads[index].contracts.length;i++) {
//         let contractHash = globalState.downloads[index].contracts[i].contract_hash
//         for(let j=0; j<globalState.downloads[index].contracts[i].file_hashes_needed.length;j++) {
//             let fileHash = globalState.downloads[index].contracts[i].file_hashes_needed[j]
//             await callJsonRpc2Endpoint("data_transfer.PauseFileDownload", [{ contract_hash: contractHash, file_hash: fileHash }])
//         }
//     }
// }

export function SetDownloads(val) {
    if(val && val.length > 0) {
        globalState.downloads = val;
    }
}

export function RemoveStorageProviders(storage_provider_peer_addr, accessType) {
    const index = globalState.storage_providers.findIndex(obj => obj.storage_provider_peer_addr === storage_provider_peer_addr && obj.access_type == accessType);
    if (index !== -1) {
        globalState.storage_providers.splice(index, 1);
    }
}

export function SetEntryCreationMode(val) {
    globalState.entryCreationMode = val;
}

export function SetEntryUpdateMode(val) {
    globalState.updateEntryMode = val;
}

export function SetChannelOperationFees(channelFees, otherOperationFees) {
    globalState.channel_creation_fees_ffg_hex = channelFees;
    globalState.remaining_channel_operation_fees_miliffg_hex = otherOperationFees;
}

export function SetBalanceNounce(balance, currentNoounce, nextNounce) {
    globalState.nodeBalance = balance;
    globalState.currentNounce = currentNoounce;
    globalState.nextNounce = nextNounce;
}

export function SetNodeAddress(addr, peerID, pub) {
    globalState.nodeAddress = addr;
    globalState.peerID = peerID;
    globalState.publicKey = pub;
}

export function SetPeerCount(count) {
    globalState.peerCount = count;
}

export function SetJwtAccessToken(accessToken) {
    globalState.jwtAccessToken = accessToken;
}

export function SetPassword(password) {
    globalState.password = password;
}

export function SetNodeType(node_type) {
    globalState.node_type = node_type;
}

export function SetDownloadsPath(downPath) {
    globalState.downloadsPath = downPath;
}

export function SetStoragePath(storagePath) {
    globalState.storagePath = storagePath;
}

export function SetStorageAccessToken(token) {
    globalState.storageAccessToken = token;
}

export function SetStorageFees(fees) {
    globalState.storageFees = fees;
}