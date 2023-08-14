<template>
    <div id="uploader-comp">
        <div v-if="uploadType == ''">
            <div style="text-align: center;">
                <span class="normal-txt" style="font-weight: 500;">  Select where to upload your data to: </span>
            </div>
            <div style="margin-top:20px; text-align: center;" class="uk-grid-match" uk-grid>
                <div @click="selectUploadType('node')" class="uk-width-expand">
                    <div class="box-content-effect">
                        <div class="content">
                            <div style="padding-bottom:3px;">
                                <div
                                    style="width: 40px; box-shadow: 0 16px 28px rgb(37 38 45 / 12%); padding: 5px; border: 1px solid #dcdde0; border-radius: 3px; margin: 0 auto;">
                                    <span style="color:#3e15ca;" uk-icon="icon:desktop; ratio:2;"></span>
                                </div>
                            </div>
                            <div>
                                <span class="normal-txt" style="font-size:0.9em; font-weight: 500;"> This Node </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="uk-width-expand">
                    <div @click="selectUploadType('network')" class="box-content-effect">
                        <div class="content">
                            <div style="padding-bottom:3px;">
                                <div
                                    style="width: 40px; box-shadow: 0 16px 28px rgb(37 38 45 / 12%); padding: 5px; border: 1px solid #dcdde0; border-radius: 3px; margin: 0 auto;">
                                    <span style="color:#3e15ca;" uk-icon="icon:world; ratio:2;"></span>
                                </div>
                            </div>
                            <div>
                                <span class="normal-txt" style="font-size:0.9em; font-weight: 500;"> Network </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="uk-width-expand">
                    <div @click="selectUploadType('other')" class="box-content-effect">
                        <div class="content">
                            <div style="padding-bottom:3px;">
                                <div
                                    style="width: 40px; box-shadow: 0 16px 28px rgb(37 38 45 / 12%); padding: 5px; border: 1px solid #dcdde0; border-radius: 3px; margin: 0 auto;">
                                    <span style="color:#3e15ca;" uk-icon="icon:link; ratio:2;"></span>
                                </div>
                            </div>
                            <div>
                                <span class="normal-txt" style="font-size:0.9em; font-weight: 500;"> Other </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="uploadType == 'node'">
            <div style="text-align: center; padding-bottom: 10px;">
                <span class="normal-txt" style="font-weight: 500;"> Select files to upload to your local storage node:</span>
            </div>
            <div v-if="globalState.node_type =='storage' && uploadData.length > 0" style="padding-top:10px;  max-height:500px; overflow-y:auto;">
                <div v-for="(u, idx) in uploadData" :key="'up' + idx"
                    style="border-top:1px solid #ededed; padding:0px; margin:0px; padding-bottom:8px;" uk-grid>
                    <div class="uk-width-expand" style="vertical-align:middle;">
                        <div style="padding:10px;" uk-grid>
                            <div class="uk-width-1-1" style="padding:0px; margin:0px;">
                                <div
                                    style="color:#3f383f;  -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; white-space: normal; -webkit-line-clamp: 1; display: -webkit-box; color: #2c3e50; margin-bottom: 0; vertical-align: middle;">
                                    <span v-if="u.type == 'dir'"
                                        style="color:#818284; font-size:1.3em; vertical-align:middle;"
                                        class="icon-folder"></span>
                                    <img v-if="u.type == 'file'" :src="nodeVector(u.name)"
                                        style="width:16px; height:16px; font-size: 32px; vertical-align: middle; " />
                                    <span v-if="!u.canceled && u.error == ''"
                                        style="margin-left:5px; font-size: 0.9em; vertical-align:middle;">{{ u.name
                                        }}</span>
                                    <span v-if="u.canceled || u.error != ''"
                                        style="margin-left:5px; vertical-align:middle;">
                                        <span style="text-decoration: line-through; color:red;">{{ u.name }}</span>
                                        <span v-if="u.error != ''">({{ u.error }})</span></span>
                                </div>
                            </div>
                            <div class="uk-width-expand" style="padding:0px; margin:0px;">
                                <span style="color:#000000; font-size: 0.9em;">{{ $filters.formatsize(u.progress) }} / {{
                                    $filters.formatsize(u.size) }}</span>
                            </div>
                            <div class="uk-width-auto" style="padding:0px; margin:0px; vertical-align:middle;">
                                <span style="color:#000000; font-size: 0.9em; display:inline-block; ">{{ getProgress(u)
                                }}%</span>
                            </div>
                            <div class="uk-width-1-1" style="padding:0px; margin:0px;">
                                <div style="height:4px; background-color:#e6e6e6;">
                                    <div :style="'width: ' + getProgress(u) + '%;'"
                                        style="background-color:#5cb85c; height:4px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="padding-left:0px;" class="uk-width-auto">
                        <div style="padding:5px;">
                            <span uk-tooltip="Remove" v-if="u.canceled || u.size == u.progress"
                                @click="removeItemFromUpload(idx)"
                                style="font-size:1.4em; margin-top:26px; display:inline-block;" uk-icon="icon:trash"
                                class="clickable"></span>
                            <span uk-tooltip="Cancel" v-else @click="cancelItemFromUpload(idx)"
                                style="font-size:1.4em; margin-top:26px; display:inline-block;" uk-icon="icon:trash"
                                class="clickable"></span>

                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top:15px; text-align: center;" v-if="globalState.node_type !='storage'">
                <span class="normal-txt"> 
                    Your node is not a storage node. If you want to upload data directly to your node you should set up a storage node.
                </span>
            </div>

            <div v-if="globalState.node_type =='storage' && !uploadingData" style="height: 40px; margin-top:15px; text-align: center;">
                <span
                    style="padding: 10px; color: #ffff; background-color: #0160fe; border: 1px solid #0160fe; border-radius: 2px;">
                    <span uk-icon="upload"></span>
                    <label style="margin-left:5px; color:#fff; font-size: 1em; cursor:pointer;" for="filesinputnode"
                        class="custom-file-upload">Choose file</label>
                    <input :accept="acceptFileTypes()" ref="fileInputNode" @click="$refs.fileInputNode.value=null" @change="selectFilesWithDestinationNode" id="filesinputnode" type="file"
                        multiple />
                </span>
            </div>

            <div style="margin-top:20px; text-align: center;">
                <button @click="uploadType = ''" class="uk-button"
                    style="text-transform: none; height:40px; margin-right:20px; ">
                    Back
                    <span class="uk-icon" uk-icon="icon:  arrow-left"></span>
                </button>
                <button :disabled="uploadingData" v-if="globalState.node_type =='storage'" @click="startUploading" class="uk-button ffg-button">
                    Upload
                    <span class="uk-icon" uk-icon="icon:  upload"></span>
                </button>
            </div>
        </div>
        <!-- <div v-if="uploadType == 'other'">
            <div style="text-align: center; padding-bottom: 10px;">
                <span class="normal-txt" style="font-weight: 500;"> Enter the RPC endpoint and credentials to upload files to remote storage provider:</span>
            </div>
            <div>
                <div style=" width:100%;" class="uk-inline">
                    <span style="color: #000;" class="uk-form-icon" uk-icon="icon: world"></span>
                    <input v-model="otherNodeRPCEndpoint" style="width:100%; border-radius: 4px;"
                        class="normal-txt uk-input" type="text" placeholder="Upload Endpoint" aria-label="Input">
                </div>
                <div style=" width:100%; margin-top:10px;" class="uk-inline">
                    <span style="color: #000;" class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input v-model="otherNodeStorageToken" style="width:100%; border-radius: 4px;"
                        class="normal-txt uk-input" type="text" placeholder="Storage Access Token" aria-label="Input">
                </div>
            </div>
            <div v-if="uploadData.length > 0" style="padding-top:10px;  max-height:500px; overflow-y:auto;">
                <div v-for="(u, idx) in uploadData" :key="'up' + idx"
                    style="border-top:1px solid #ededed; padding:0px; margin:0px; padding-bottom:8px;" uk-grid>
                    <div class="uk-width-expand" style="vertical-align:middle;">
                        <div style="padding:10px;" uk-grid>
                            <div class="uk-width-1-1" style="padding:0px; margin:0px;">
                                <div
                                    style="color:#3f383f;  -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; white-space: normal; -webkit-line-clamp: 1; display: -webkit-box; color: #2c3e50; margin-bottom: 0; vertical-align: middle;">
                                    <span v-if="u.type == 'dir'"
                                        style="color:#818284; font-size:1.3em; vertical-align:middle;"
                                        class="icon-folder"></span>
                                    <img v-if="u.type == 'file'" :src="nodeVector(u.name)"
                                        style="width:16px; height:16px; font-size: 32px; vertical-align: middle; " />
                                    <span v-if="!u.canceled && u.error == ''"
                                        style="margin-left:5px; font-size: 0.9em; vertical-align:middle;">{{ u.name
                                        }}</span>
                                    <span v-if="u.canceled || u.error != ''"
                                        style="margin-left:5px; vertical-align:middle;">
                                        <span style="color:red; text-decoration: line-through;">{{ u.name }}</span>
                                        <span v-if="u.error != ''">({{ u.error }})</span></span>
                                </div>
                            </div>
                            <div class="uk-width-expand" style="padding:0px; margin:0px;">
                                <span style="color:#000000; font-size: 0.9em;">{{ $filters.formatsize(u.progress) }} / {{
                                    $filters.formatsize(u.size) }}</span>
                            </div>
                            <div class="uk-width-auto" style="padding:0px; margin:0px; vertical-align:middle;">
                                <span style="color:#000000; font-size: 0.9em; display:inline-block; ">{{ getProgress(u)
                                }}%</span>
                            </div>
                            <div class="uk-width-1-1" style="padding:0px; margin:0px;">
                                <div style="height:4px; background-color:#e6e6e6;">
                                    <div :style="'width: ' + getProgress(u) + '%;'"
                                        style="background-color:#5cb85c; height:4px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="padding-left:0px;" class="uk-width-auto">
                        <div style="padding:5px;">
                            <span uk-tooltip="Remove" v-if="u.canceled || u.size == u.progress"
                                @click="removeItemFromUpload(idx)"
                                style="font-size:1.4em; margin-top:26px; display:inline-block;" uk-icon="icon:trash"
                                class="clickable"></span>
                            <span uk-tooltip="Cancel" v-else @click="cancelItemFromUpload(idx)"
                                style="font-size:1.4em; margin-top:26px; display:inline-block;" uk-icon="icon:trash"
                                class="clickable"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!uploadingData" style="height: 40px; margin-top:25px; text-align: center;">
                <span
                    style="padding: 10px; color: #ffff; background-color: #0160fe; border: 1px solid #0160fe; border-radius: 2px;">
                    <span uk-icon="upload"></span>
                    <label style="margin-left:5px; color:#fff; font-size: 1em; cursor:pointer;" for="filesinputother"
                        class="custom-file-upload">Choose file</label>
                    <input :accept="acceptFileTypes()" ref="fileInputOther" @click="$refs.fileInputOther.value=null" @change="selectFilesWithDestinationOther" id="filesinputother" type="file"
                        multiple />
                </span>
            </div>

            <div style="margin-top:20px; text-align: center;">
                <button @click="uploadType = ''" class="uk-button"
                    style="text-transform: none; height:40px; margin-right:20px; ">
                    Back
                    <span class="uk-icon" uk-icon="icon:  arrow-left"></span>
                </button>

                <button :disabled="uploadingData" @click="startUploading" class="uk-button ffg-button">
                    Upload
                    <span class="uk-icon" uk-icon="icon:  upload"></span>
                </button>
            </div>
        </div> -->
        <div v-if="uploadType == 'network'">
            <div v-if="selectedStorageProviderPeerIDForUpload == null" style="text-align: center; padding-bottom: 10px;">
                <span class="normal-txt" style="font-weight: 500;"> Select a storage provider from your saved list to upload data to:</span>
            </div>
            <div v-if="selectedStorageProviderPeerIDForUpload == null" style="max-height:500px; overflow-y:auto;">
                <table v-if="providers.length > 0" id="storage-providers" class="uk-table uk-table-striped uk-table-middle uk-table-justify">
                    <thead>
                        <tr class="tr-heeader">
                            <th style="text-transform: none; width:120px;"><span style="color:#000;"> Type </span></th>
                            <th style="text-transform: none;"><span style="color:#000;"> Peer ID </span></th>
                            <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Space </span></th>
                            <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Uptime </span></th>
                            <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Country </span></th>
                            <th style="text-transform: none; width:180px;"> <span style="color:#000;"> Fees per byte </span> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="selectSP(p)" style="" v-for="p in providers" :key="p.public_key">
                            <td class="uk-text-truncate">{{ p.access_type == "public_storage" ? "Public Storage" : "Access Token" }}</td>
                            <td class="uk-text-truncate">{{ p.storage_provider_peer_addr }}</td>
                            <td>
                                {{ $filters.formatsize(p.storage_capacity) }}
                            </td>
                            <td>
                                {{ secondsToHours(p.uptime_seconds) }}
                            </td>
                            <td style="text-align: center;">
                                <span v-if="getCountry(p) == '' || getCountry(p) == 'fi-'">
                                    N/A</span>
                                <span v-else :class="getCountry(p)" class="fi"></span>
                            </td>
                            <td>{{ getFees(p.fees_per_byte) }} FFG</td>
                        </tr>
                    </tbody>
                </table>
                <div style="text-align: center; margin-top:10px;" v-else>
                    <span style="color: #000;">
                        We're sorry, but it seems like there are no storage providers in your selected list. Please visit the <router-link to="/storage"> "Storage Providers" </router-link> section to explore and find suitable providers. Tap the star icon to add them to your list, and you'll be able to see them here.
                    </span>
                </div>
            </div>

            <div v-else>
                <div v-if="uploadData.length > 0" style="padding-top:10px;  max-height:500px; overflow-y:auto;">
                    <div v-for="(u, idx) in uploadData" :key="'up' + idx">
                        <div
                            style="border-top:1px solid #ededed; padding:0px; margin:0px; padding-bottom:8px;" uk-grid>
                            <div class="uk-width-expand" style="vertical-align:middle;">
                                <div style="padding:10px;" uk-grid>
                                    <div class="uk-width-1-1" style="padding:0px; margin:0px;">
                                        <div
                                            style="color:#3f383f;  -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; white-space: normal; -webkit-line-clamp: 1; display: -webkit-box; color: #2c3e50; margin-bottom: 0; vertical-align: middle;">
                                            <span v-if="u.type == 'dir'"
                                                style="color:#818284; font-size:1.3em; vertical-align:middle;"
                                                class="icon-folder"></span>
                                            <img v-if="u.type == 'file'" :src="nodeVector(u.name)"
                                                style="width:16px; height:16px; font-size: 32px; vertical-align: middle; " />
                                            <span v-if="!u.canceled && u.error == ''"
                                                style="margin-left:5px; font-size: 0.9em; vertical-align:middle;">{{ u.name
                                                }}</span>
                                            <span v-if="u.canceled || u.error != ''"
                                                style="margin-left:5px; vertical-align:middle;">
                                                <span style="color:red; text-decoration: line-through;">{{ u.name }}</span>
                                                <span v-if="u.error != ''">({{ u.error }})</span></span>
                                        </div>
                                    </div>
                                    <div class="uk-width-expand" style="padding:0px; margin:0px;">
                                        <span style="color:#000000; font-size: 0.9em;">{{ $filters.formatsize(u.progress) }}
                                            /
                                            {{
                                                $filters.formatsize(u.size) }}</span>
                                    </div>
                                    <div class="uk-width-auto" style="padding:0px; margin:0px; vertical-align:middle;">
                                        <span style="color:#000000; font-size: 0.9em; display:inline-block; ">{{
                                            getProgress(u)
                                        }}%</span>
                                    </div>
                                    <div class="uk-width-1-1" style="padding:0px; margin:0px;">
                                        <div style="height:4px; background-color:#e6e6e6;">
                                            <div :style="'width: ' + getProgress(u) + '%;'"
                                                style="background-color:#5cb85c; height:4px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="padding-left:0px;" class="uk-width-auto">
                                <div style="padding:5px;">
                                    <span uk-tooltip="Remove" v-if="u.canceled || u.size == u.progress"
                                        @click="removeItemFromUpload(idx)"
                                        style="font-size:1.4em; margin-top:26px; display:inline-block;" uk-icon="icon:trash"
                                        class="clickable"></span>
                                    <span uk-tooltip="Cancel" v-else @click="cancelItemFromUpload(idx)"
                                        style="font-size:1.4em; margin-top:26px; display:inline-block;" uk-icon="icon:trash"
                                        class="clickable"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div style="text-align: center;">
                        <span class="normal-txt" style="font-weight:500;"> Select files to upload to the selected peer:</span>
                    </div>
                </div>

                <div v-if="!uploadingData" style="height: 40px; margin-top:25px; text-align: center;">
                    <span
                        style="padding: 10px; color: #ffff; background-color: #0160fe; border: 1px solid #0160fe; border-radius: 2px;">
                        <span uk-icon="upload"></span>
                        <label style="margin-left:5px; color:#fff; font-size: 1em; cursor:pointer;" for="filesinputnetwork"
                            class="custom-file-upload">Choose file</label>
                        <input :accept="acceptFileTypes()" ref="fileInputNetwork" @change="selectFilesWithDestinationNetwork"  @click="$refs.fileInputNetwork.value=null" id="filesinputnetwork" type="file"
                            multiple />
                    </span>
                </div>
            </div>

            <div style="margin-top:20px; text-align: center;">
                <button @click="goBackNetwork" class="uk-button"
                    style="text-transform: none; height:40px; margin-right:20px; ">
                    Back
                    <span class="uk-icon" uk-icon="icon:  arrow-left"></span>
                </button>

                <button v-if="selectedStorageProviderPeerIDForUpload != null && selectedStorageProviderPeerIDForUpload.access_type =='access_token'" :disabled="uploadingData" @click="startUploading"
                    class="uk-button ffg-button">
                    Upload
                    <span class="uk-icon" uk-icon="icon:  upload"></span>
                </button>

                <button v-if="selectedStorageProviderPeerIDForUpload != null && selectedStorageProviderPeerIDForUpload.access_type !='access_token'" :disabled="uploadingData" @click="startUploadingNetwork"
                    class="uk-button ffg-button">
                    Upload
                    <span class="uk-icon" uk-icon="icon:  upload"></span>
                </button>
            </div>
        </div>


        <div id="modal-sendFiles" uk-modal="container:#app; esc-close:false; bg-close:false; stack:true;">
            <div  style="width:60%;" class="uk-modal-dialog uk-modal-body">
                <button id="close-modal-create" class="uk-modal-close-default" type="button" uk-close></button>
                <h2 style="font-size: 1.2em; font-weight: bold;" class="uk-modal-title">Save files in channel</h2>
                <div style="padding-bottom:10px; text-align: center; border-bottom:1px solid rgb(230, 230, 230);">
                    <img style="height: 54px; background-color: white; width: 54px; border-radius: 50%;" src="/assets/icon.png" />                   
                </div>
                <div style="padding: 10px; margin-top:5px;">
                    <div v-if="uploadData.length > 0" style="padding-top:10px;  max-height:500px; overflow-y:auto;">
                        <div v-for="(u, idx) in uploadData" :key="'up' + idx"
                            style="border-top:1px solid #ededed; padding:0px; margin:0px; padding-bottom:8px;" uk-grid>
                            <div class="uk-width-expand" style="vertical-align:middle;">
                                <div style="padding:10px;" uk-grid>
                                    <div class="uk-width-1-1" style="padding:0px; margin:0px;">
                                        <div
                                            style="color:#3f383f;  -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; white-space: normal; -webkit-line-clamp: 1; display: -webkit-box; color: #2c3e50; margin-bottom: 0; vertical-align: middle;">
                                            <span v-if="u.type == 'dir'"
                                                style="color:#818284; font-size:1.3em; vertical-align:middle;"
                                                class="icon-folder"></span>
                                            <img v-if="u.type == 'file'" :src="nodeVector(u.name)"
                                                style="width:16px; height:16px; font-size: 32px; vertical-align: middle; " />
                                            <span v-if="!u.canceled && u.error == ''"
                                                style="margin-left:5px; font-size: 0.9em; vertical-align:middle;">{{ u.name
                                                }}</span>
                                            <span v-if="u.canceled || u.error != ''"
                                                style="margin-left:5px; vertical-align:middle;">
                                                <span style="text-decoration: line-through; color:red;">{{ u.name }}</span>
                                                <span v-if="u.error != ''">({{ u.error }})</span></span>
                                        </div>
                                    </div>
                                    <div class="uk-width-expand" style="padding:0px; margin:0px;">
                                        <span style="color:#000000; font-size: 0.9em;">{{ $filters.formatsize(u.progress) }} / {{
                                            $filters.formatsize(u.size) }}</span>
                                    </div>
                                    <div class="uk-width-auto" style="padding:0px; margin:0px; vertical-align:middle;">
                                        <span style="color:#000000; font-size: 0.9em; display:inline-block; ">{{ getProgress(u)
                                        }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="text-align: center;">
                            <div style="text-align:center;" v-if="creatingFilesOnBlockchain">
                                <span style="color:#3e15ca;" class="uk-margin-small-right" uk-spinner="ratio: 1"></span>
                            </div>
                            <button v-if="!creatingFilesOnBlockchain" class="uk-button ffg-button" @click="saveFilesInBlockchain">
                                Save Uploaded Files
                                <span class="uk-icon" uk-icon="icon: check"></span>
                            </button>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
const { ipcRenderer } = window.require("electron");
import { globalState, AddToUploadData, StartUpload, RemoveItemFromUpload, CancelItemFromUpload, UpdateFileUploadToNetworkProgress, SetHowManyItemsToUpload, StopUpload} from '../store';
import { ref } from 'vue';
import ftype from "../filetype";
import { Units } from "../unit.js"
import BigNumber from 'bignumber.js';
import axios from 'axios';
import { callJsonRpc2Endpoint, localNodeEndpoint } from "../rpc"
import numberToBN from "number-to-bn";

export default {
    components: {
    },
    props: ["parent", "place", "callback", "accept", "uploadmedia", "maxsize", "maxfiles"],
    data() {
        return {
            filesOwnerPublicKey: "",
            loadingIntervalProgressBarNetworkUploads: null,
            selectedStorageProviderPeerIDForUpload: null,
           
            uploadType: "",
            nodeAddress:"",
            creatingFilesOnBlockchain: false,
            creatingFilesOnBlockchainError: "",
        }
    },
    async mounted() {
        const addr = ref(globalState.nodeAddress);
        if (addr.value != "") {
            this.nodeAddress = addr.value;
        }

        console.log(globalState)
        const pubKey = ref(globalState.publicKey);
        console.log(pubKey.value)
        if(pubKey.value != "") {
            this.filesOwnerPublicKey = pubKey.value;
        }

        let st = ipcRenderer.sendSync("get-settings", {});
        if(st.error != "") {
            return
        }

        
      
    },
    computed: {
        lastHowManyItemsToUpload() {
            const data = ref(globalState.lastHowManyItemsToUpload);
            return data.value
        },
        uploadingData() {
            const data = ref(globalState.uploadingData);
            return data.value
        },
        globalState(){
            return globalState
        },
        uploadData() {
            const data = ref(globalState.upload_data);
            return data.value
        },
        providers() {
            const data = ref(globalState.storage_providers);
            return data.value
        }
    },
    watch: {
        uploadData: {
            handler(val) {
                if(val.length == 0) {
                    clearInterval(this.loadingIntervalProgressBarNetworkUploads);
                    StopUpload()
                }

                if(this.uploadmedia && this.place == "channel") return;
                if(this.uploadmedia) {
                    if (this.place == "channel-entry") {
                        let totalCompleted = val.filter((o) => {
                            return o.from == 'channel-entry' && ((o.progress > 0 && o.size == o.progress && o.file_hash != "") || (o.error != ""))
                        }).length

                        if (totalCompleted > 0 && totalCompleted == this.lastHowManyItemsToUpload) {
                            if(this.loadingIntervalProgressBarNetworkUploads != null) {
                                clearInterval(this.loadingIntervalProgressBarNetworkUploads);
                                this.loadingIntervalProgressBarNetworkUploads = null
                            }

                            let uploadedImages = val.filter((o) => {
                                return o.from == 'channel-entry' && ((o.progress > 0 && o.size == o.progress && o.file_hash != "") || (o.error != ""))
                            })
                        
                            this.callback(uploadedImages)
                        }
                    }
                    return
                }

                if (this.place == "channel") {
                    let totalCompleted = val.filter((o) => {
                        return o.from == 'channel' && ((o.progress > 0 && o.size == o.progress && o.file_hash != "") || (o.error != ""))
                    }).length

                    if (totalCompleted > 0 && totalCompleted == this.lastHowManyItemsToUpload) {
                        if(this.loadingIntervalProgressBarNetworkUploads != null) {
                            clearInterval(this.loadingIntervalProgressBarNetworkUploads);
                            this.loadingIntervalProgressBarNetworkUploads = null
                        }

                        this.openSaveFilesModal();
                    }
                }

                if(this.place == "storage") {
                    let totalCompleted = val.filter((o) => {
                        return o.from == 'storage' && (( o.progress > 0 && o.size == o.progress && o.file_hash != "") || (o.error != ""))
                    }).length

                    if (totalCompleted > 0 && totalCompleted == this.lastHowManyItemsToUpload) {
                        if(this.loadingIntervalProgressBarNetworkUploads != null) {
                            clearInterval(this.loadingIntervalProgressBarNetworkUploads);
                            this.loadingIntervalProgressBarNetworkUploads = null
                        }
                        if(this.callback != null) {
                            this.callback()
                        }
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        acceptFileTypes() {
            if(this.accept=="") {
                return "*"
            }
            return this.accept
        },
        async saveFilesInBlockchain() {
            const totalCompleted = this.uploadData.filter((o) => o.progress >= o.size).map((o) => {
                return { 
                    parent_hash: this.parent, 
                    enabled: true, 
                    description: "", 
                    name: o.name, 
                    node_type: 5, 
                    timestamp: Math.floor(Date.now() / 1000),
                    size: o.size,
                    file_hash: o.file_hash,
                    merkle_root: o.merkle_root_hash,
                } 
            })

            if (totalCompleted.length == 0) {
                return
            }

            const data = {
                jsonrpc: '2.0',
                method: "channel.CreateNodeItemsTxDataPayload",
                params: [{ nodes: totalCompleted }],
                id: 1
            };

            try {
                const endpoint = ref(globalState.rpcEndpoint);
                const response = await axios.post(endpoint.value, data);
                let channelFees = numberToBN(response.data.result.total_fees_required);
                let balanceRes = await this.getBalance();
                let balanceFFGOneBig = numberToBN(balanceRes.balance_hex);
                if (balanceFFGOneBig.lt(channelFees)) {
                    throw new Error(
                        `You don't have enough coins in your balance!`
                    );
                }

                const jwtAccess = ref(globalState.jwtAccessToken);
                const sendTxRes = await callJsonRpc2Endpoint("transaction.SendTransaction", [{ access_token: jwtAccess.value, nounce: balanceRes.next_nounce, data: response.data.result.transaction_data_payload_hex, from: this.nodeAddress, to: "0x01", value: "0x0", transaction_fees: response.data.result.total_fees_required }])
                this.lastTXSent = sendTxRes.data.result.transaction.hash
                this.creatingFilesOnBlockchain = true;

                let tries = 0;
                let loadTxInterval = setInterval(async() => {
                    if(tries > 21) {
                        this.creatingFilesOnBlockchainError = "It seems like there was an error sending your transaction. Please reload the page to see if your files were saved.";
                        this.creatingFilesOnBlockchain = false;
                        clearInterval(loadTxInterval);
                        return
                    }
                    tries++;
                    let res = await this.getTransaction(this.lastTXSent)
                    if(res.transactions && res.transactions.length > 0) {
                        this.creatingFilesOnBlockchain = false;
                        clearInterval(loadTxInterval);

                        this.closeSaveFilesModal();
                        if(this.callback != null) {
                            this.callback()
                        }
                        
                        return
                    }
                }, 2000)

            } catch (e) {
                this.creatingFilesOnBlockchain = false;
                this.creatingFilesOnBlockchainError = e.message;
            }
        },
        async getTransaction(hash) {
            const data = {
                jsonrpc: '2.0',
                method: "transaction.Receipt",
                params: [{ hash: hash}],
                id: 1
            };
            const endpoint = ref(globalState.rpcEndpoint);
            const response = await axios.post(endpoint.value, data);
            return response.data.result;
        },
        openSaveFilesModal() {
            const myModal = document.getElementById('modal-sendFiles');
            const modal = window.UIkit.modal(myModal);
            modal.show();
        },
        closeSaveFilesModal() {
            const myModal = document.getElementById('modal-sendFiles');
            const modal = window.UIkit.modal(myModal);
            modal.hide();
        },
        startUploading() {
            // upload using http and access token
            if(this.uploadingData) return;
            if (this.uploadData.length == 0) return;

            const uploads = this.uploadData.filter((o) => o.rpc_upload).filter((o) => o.progress < o.size && !o.canceled && o.error == "")

            if (uploads.length == 0) {
                return
            }

            StartUpload(uploads.length)
        },
        async startUploadingNetwork() {
            // upload using network tcp using backend
            const networkUploads = this.uploadData.filter((o) => !o.rpc_upload).filter((o) => o.progress < o.size && o.error == "")
            if (networkUploads.length == 0) {
                return
            }

            SetHowManyItemsToUpload(networkUploads.length);

            const files = [];
            networkUploads.filter((o) => {
                let f = {
                    peer_id: this.selectedStorageProviderPeerIDForUpload.storage_provider_peer_addr,
                    file_path: o.filepath,
                    channel_node_item_hash: "",
                    owner_public_key: this.filesOwnerPublicKey,
                    file_fees_per_byte: ""
                }

                if (this.parent && this.parent != "") {
                    f.channel_node_item_hash = this.parent;
                }

                files.push(f)
            })

            const data = {
                jsonrpc: '2.0',
                method: "storage.UploadFileToProvider",
                params: [{ files: files }],
                id: 1
            };

            try {
                const endpoint = localNodeEndpoint;
                const response = await axios.post(endpoint, data);
                if(response.data.result.success) {
                    this.loadingIntervalProgressBarNetworkUploads = setInterval(async () => {
                        try {
                            const data = {
                                jsonrpc: '2.0',
                                method: "storage.FileUploadsProgress",
                                params: [{ files: files }],
                                id: 1
                            };

                            const response = await axios.post(endpoint, data);
                            if(response.data.result.files != undefined) {
                                let allCompleted = UpdateFileUploadToNetworkProgress(response.data.result.files);
                                if(allCompleted) {
                                    StopUpload()
                                    clearInterval(this.loadingIntervalProgressBarNetworkUploads);
                                }
                            }
                        } catch (e) {
                            console.log(e.message)
                        }
                    }, 2000)
                }
            } catch (e) {
                alert("error " + e.message)
            }
        },
        goBackNetwork() {
            if (this.selectedStorageProviderPeerIDForUpload != null) {
                this.selectedStorageProviderPeerIDForUpload = null;
            } else {
                this.uploadType = ''
            }
        },
        selectSP(p) {
            this.selectedStorageProviderPeerIDForUpload = p;
        },
        getFees(feesBig) {
            try {
                let feesBigVal = new BigNumber(feesBig, 10);
                return Units.convert(feesBigVal.toString(10), "FFGOne", "FFG")
            } catch (e) {
                return ""
            }
        },
        getCountry(p) {
            if (p.country != undefined && p.country.Country != undefined && p.country.Country.IsoCode != undefined) {
                return 'fi-' + p.country.Country.IsoCode.toLowerCase();
            }
            return "";
        },
        secondsToHours(uptimeInSeconds) {
            const intervals = [
                { unit: 'year', abbreviation: 'y', seconds: 31536000 },
                { unit: 'month', abbreviation: 'mo', seconds: 2592000 },
                { unit: 'week', abbreviation: 'w', seconds: 604800 },
                { unit: 'day', abbreviation: 'd', seconds: 86400 },
                { unit: 'hour', abbreviation: 'h', seconds: 3600 },
                { unit: 'minute', abbreviation: 'm', seconds: 60 },
                { unit: 'second', abbreviation: 's', seconds: 1 }
            ];

            for (const interval of intervals) {
                if (uptimeInSeconds >= interval.seconds) {
                const count = Math.floor(uptimeInSeconds / interval.seconds);
                return `${count} ${interval.abbreviation}`;
                }
            }

            return '0s'; // If uptime is zero or negative
        },
        removeItemFromUpload(idx) {
            RemoveItemFromUpload(idx);
        },
        cancelItemFromUpload(idx) {
            CancelItemFromUpload(idx);
        },
        getProgress(node) {
            let pg = parseInt((node.progress / node.size) * 100)
            let result = pg > 100 ? 100 : pg;
            // make sure the file hash is there
            if(result == 100 && node.file_hash == "") {
                return 99;
            }
            return result
        },
        nodeVector(name) {
            let img = `/assets/file_types/${ftype.getVectorOf(ftype.getExt(name))}.svg`;
            return img;
        },
        parseURL(url) {
            try {
                const parsedURL = new URL(url);
                const domain = parsedURL.hostname;
                const port = parsedURL.port;
                const protocol = parsedURL.protocol;
                
                let baseUrl = protocol + '//' + domain;
                if (port) {
                baseUrl += ':' + port;
                }
                
                return {
                domain: domain,
                port: port,
                baseUrl: baseUrl
                };
            } catch (error) {
                return null;
            }
        },
        selectFilesWithDestinationNode(e) {
            const storageAccessToken = ref(globalState.storageAccessToken);
            const uploadEndpoint = ref(globalState.uploadEndpoint);
            this.selectFiles(e, storageAccessToken.value, uploadEndpoint.value, "node");
        },
        selectFilesWithDestinationOther(e) {
            let accessToken = this.selectedStorageProviderPeerIDForUpload.access_token.token
            let endpoint =  this.parseURL(this.selectedStorageProviderPeerIDForUpload.http_upload_endpoint)
            if(!endpoint) {
                alert("Invalid upload endpoint")
                return
            }

            this.selectFiles(e, accessToken, endpoint.baseUrl + "/uploads", "other");
        },
        selectFilesWithDestinationNetwork(e) {
            // if upload to remote node using http call the above method
            if(this.selectedStorageProviderPeerIDForUpload.access_type == "access_token") {
                this.selectFilesWithDestinationOther(e);
                return
            }

        
            let count = 0
            for (let i = 0; i < e.target.files.length; i++) {
                if(this.maxfiles>0 && count > this.maxfiles -1) {
                    continue
                }


                if(this.maxsize > 0 && e.target.files[i].size > this.maxsize) {
                    alert("file " + e.target.files[i].name + " must be smaller than 512KB")
                    continue
                }
                if (e.target.files[i].size <= 0) continue;

                count++;

                let payload = {
                    remote_peer: this.selectedStorageProviderPeerIDForUpload.storage_provider_peer_addr,
                    upload_type : "network",
                    rpc_upload: false,
                    filepath: e.target.files[i].path,
                    from: this.place,
                    parent_hash: this.parent,
                    size: e.target.files[i].size,
                    canceled: false,
                    cancel: null,
                    progress: 0,
                    error: "",
                    type: "file",
                    name: e.target.files[i].name,
                    file: e.target.files[i],
                    node_hash: ipcRenderer.sendSync("sha256", this.parent + e.target.files[i].name),
                    file_hash: "",
                    merkle_root_hash: "",
                };

                AddToUploadData(payload, "", "", true);
            }
        },
        selectFiles(e, storageAccessToken, uploadEndpoint, uploadType) {
            console.log("i am here", storageAccessToken, uploadEndpoint, uploadType );
            let count = 0
            for (let i = 0; i < e.target.files.length; i++) {
                if(this.maxfiles>0 && count > this.maxfiles - 1) {
                    console.log("continue")
                    continue
                }

                if(this.maxsize > 0 && e.target.files[i].size > this.maxsize) {
                    alert("file " + e.target.files[i].name + " must be smaller than 512KB")
                    continue
                }

                if (e.target.files[i].size <= 0) continue;
                count++;

                console.log("prepare payload")
                let payload = {
                    remote_peer: "",
                    upload_type : uploadType,
                    rpc_upload: true,
                    filepath: "",
                    from: this.place,
                    parent_hash: this.parent,
                    size: e.target.files[i].size,
                    canceled: false,
                    cancel: null,
                    progress: 0,
                    error: "",
                    type: "file",
                    name: e.target.files[i].name,
                    file: e.target.files[i],
                    node_hash: ipcRenderer.sendSync("sha256", this.parent + e.target.files[i].name),
                    file_hash: "",
                    merkle_root_hash: "",
                };

                if (storageAccessToken != "") {
                    AddToUploadData(payload, storageAccessToken, uploadEndpoint);
                } else {
                    alert("storage access token is empty");
                }
            }
        },
        async getBalance() {
            const data = {
                jsonrpc: '2.0',
                method: "address.Balance",
                params: [{ address: this.nodeAddress }],
                id: 1
            };
            const endpoint = ref(globalState.rpcEndpoint);
            const response = await axios.post(endpoint.value, data);
            return response.data.result;
        },
        selectUploadType(uploadType) {
            this.uploadType = uploadType;
        }
    }
}
</script>
<style scoped>
.box-content-effect {
    background: #fff;
    border: 1px solid #dcdde0;
    border-radius: 3px;
    color: inherit;
    cursor: pointer;
    transition: box-shadow 0.25s, transform 0.25s;
    width: 100%;
}

.box-content-effect:hover {
    box-shadow: 0 16px 28px rgb(37 38 45 / 12%);
    transform: translateY(-4px);
}

.box-content-effect .content {
    display: block;
    padding: 32px;
}

#storage-providers tr:not(.tr-heeader):hover {
    background-color: #160091;
    color: #ffffff;
    cursor: pointer;
}

input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

</style>