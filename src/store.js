import { reactive } from 'vue'
import queue from "queue";
import axios from "axios";
import uploader from "./uploader";
import { callJsonRpc2Endpoint } from "./rpc.js"

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
    upload_data: [],
    name_conflicts: [],

    rpcEndpoint: "",
    password: "",
    node_type: "",
    downloadsPath: "",
    storagePath: "",
    storageAccessToken: "",
    storageFees: "",
    jwtAccessToken: "",
    nodeAddress: "",
    channel_creation_fees_ffg_hex: "",
    remaining_channel_operation_fees_miliffg_hex: "",
    storage_providers: [],
    // balance related
    nodeBalance: "",
    currentNounce: "",
    nextNounce: "",
    entryCreationMode: false,
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

const asyncFunctionFactory = (item, storageAccessToken, uploadEndpoint) => {
    return () => {
        /* eslint-disable no-async-promise-executor */
        return new Promise(async (resolve, reject) => {
            try {
                if (item.canceled) return resolve("CANCELED");

                if (item.type == "file") {

                    // single file
                    item.cancel = axios.CancelToken.source();
                    let formData = new FormData();
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


const asyncDownloadFileWithProgress = (fileItem) => {
    return () => {
        /* eslint-disable no-async-promise-executor */
        return new Promise(async (resolve, reject) => {
            let progressInterval = null;
            try {
                await callJsonRpc2Endpoint("data_transfer.DownloadFile", [{ contract_hash: fileItem.contract_hash, file_hash: fileItem.file_hash, re_download: false }])
                progressInterval = setInterval(async () => {
                    let res = await callJsonRpc2Endpoint("data_transfer.DownloadFileProgress", [{ contract_hash: fileItem.contract_hash, file_hash: fileItem.file_hash }])
                    fileItem.progress = res.data.result.bytes_transferred;
                    if(res.data.result.error != "") {
                        clearInterval(progressInterval)
                        fileItem.error = res.data.result.error;
                        reject(res.data.result.error);
                    }
                    if(fileItem.progress >= fileItem.size) {
                        clearInterval(progressInterval)
                        resolve(fileItem);
                    }
                }, 1000)
            } catch (e) {
                clearInterval(progressInterval)
                reject(e);
            }
        });
    };
};



const asyncDownloadFactory = (item) => {
    return () => {
        /* eslint-disable no-async-promise-executor */
        return new Promise(async (resolve, reject) => {
            try {
                item.started = true;
                item.started_at = Date.now(); 
                for(let i=0; i<item.contracts.length;i++) {
                   for(let j=0; j<item.contracts[i].file_hashes_needed.length;j++) {
                       item.fileDownloads.push({
                           contract_hash: item.contracts[i].contract_hash,
                           file_hash:  item.contracts[i].file_hashes_needed[j],
                           size:  item.contracts[i].file_hashes_needed_sizes[j],
                           progress: 0,
                           error: ""
                       })
                       item.queue.push(asyncDownloadFileWithProgress(item.fileDownloads[item.fileDownloads.length -1]))
                   }
                }
                item.queue.start()
                item.queue.addEventListener('end', e => {
                    item.finished_at = Date.now();
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
    fileDownloadsQueue.push(asyncDownloadFactory(globalState.downloads[globalState.downloads.length - 1]))
    
    return true;
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
    files.filter((o) => {
        globalState.upload_data.filter((j) => {
            if (o.file_path == j.filepath) {
                j.progress = o.progress;
                j.error = o.error;
            }
        })
    })
}

export function CancelItemFromUpload(index) {
    globalState.upload_data[index].canceled = true;
    if (globalState.upload_data[index].cancel) globalState.upload_data[index].cancel.cancel();
}


export function RemoveItemFromUpload(index) {
    globalState.upload_data.splice(index, 1);
}

export function AddToUploadData(val, storageAccessToken, endPoint, onlyState) {
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
                        endPoint
                    )
                );
            }
        }
    }
}

export function SetStorageProviders(val) {
    globalState.storage_providers = val;
}

export function RemoveStorageProviders(storage_provider_peer_addr) {
    const index = globalState.storage_providers.findIndex(obj => obj.storage_provider_peer_addr === storage_provider_peer_addr);
    if (index !== -1) {
        globalState.storage_providers.splice(index, 1);
    }
}

export function SetEntryCreationMode(val) {
    globalState.entryCreationMode = val;
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

export function SetNodeAddress(addr) {
    globalState.nodeAddress = addr;
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