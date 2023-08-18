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
            </div>
        </div>
        <div v-if="uploadType == 'node'">
            <div style="text-align: center; padding-bottom: 10px;">
                <span class="normal-txt" style="font-weight: 500;"> Select files to upload to your local storage node:</span>
            </div>
            <div v-if="globalState.node_type =='storage' && uploadData.length > 0" style="padding-top:10px;  max-height:500px; overflow-y:auto;">
                <div id="dropdown-fees-container"></div>
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

                                <div v-if="u.override_fees_enabled" style="margin-top:-5px" class="uk-inline">
                                    <!-- <button class="uk-button uk-button-default" type="button">Click</button> -->
                                    <span uk-tooltip="Choose fees" style="padding:13px; cursor: pointer;">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"/></svg>
                                    </span>
                                    <div class="uk-width-small" style="max-width: 400px; font-size: 0.9em;" uk-dropdown="mode: click; container: #dropdown-fees-container;">
                                        <div class="uk-margin">
                                            <select v-model="u.fees_input_model" class="uk-select" aria-label="Select">
                                                <option selected value="">node fee</option>
                                                <option value="0">free</option>
                                                <option value="set">set fees</option>
                                            </select>
                                        </div>
                                        <div v-show="u.fees_input_model == '0'">
                                            <div style="text-align: center; margin-top:10px;">
                                                <div>      
                                                    <button @click="applyFeeTo(idx, '0')" style="padding: 0px 13px; text-transform: none; border-radius: 3px; border:1px solid #ababab; width:143px;" class="uk-button uk-button-default" type="button">
                                                        Set to free
                                                        <span v-if="setFeeWasClicked(idx)" style="color:green;" uk-icon="check"></span>
                                                    </button>
                                                </div>
                                                <div v-if="uploadData.length > 1" style="margin-top:16px;">
                                                    <button @click="applyFeesToAll(idx, 'free')" style="padding: 0px 13px; text-transform: none; border-radius: 3px; border:1px solid #ababab; width:143px;" class="uk-button uk-button-default" type="button">
                                                            Apply to all
                                                            <span v-if="setAllFeeWasClicked(idx)" style="color:green;" uk-icon="check"></span>
                                                        </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-show="u.fees_input_model == 'set'">
                                            <span> Total FFG fees for the whole file: </span> 
                                            <div>
                                            <div style=" width:100%;" class="uk-inline">
                                                <span style="color: #000;" class="uk-form-icon">FFG</span>
                                                <input class="uk-input uk-form-width-medium uk-form-small" v-model="u.fees_input_value" type="text" placeholder="e.g. 5" aria-label="Small">
                                            </div>

                                            <div style="text-align: center; margin-top:3px;">
                                                <button @click="applyFeeTo(idx, u.fees_input_value)" style="padding: 0px 13px; text-transform: none; border-radius: 3px; border:1px solid #ababab; width:143px;" class="uk-button uk-button-default" type="button">
                                                    Set fee
                                                    <span v-if="setFeeWasClicked(idx)" style="color:green;" uk-icon="check"></span>
                                                </button>
                                            </div>

                                            </div>
                                            <div v-if="uploadData.length > 1" style="text-align: center; margin-top:16px;">
                                                <button @click="applyFeesToAll(idx, u.fees_input_value)" style="padding: 0px 13px; text-transform: none; border-radius: 3px; border:1px solid #ababab; width:143px;" class="uk-button uk-button-default" type="button">
                                                    Apply to all
                                                    <span v-if="setAllFeeWasClicked(idx)" style="color:green;" uk-icon="check"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                <button @click="goBack()" class="uk-button"
                    style="text-transform: none; height:40px; margin-right:20px; ">
                    Back
                    <span class="uk-icon" uk-icon="icon:  arrow-left"></span>
                </button>
                <button :disabled="uploadingData  || uploadData.length == 0" v-if="globalState.node_type =='storage'" @click="startUploading" class="uk-button ffg-button">
                    Upload
                    <span class="uk-icon" uk-icon="icon:  upload"></span>
                </button>
            </div>
        </div>
        <div v-if="uploadType == 'network'">
            <div v-if="selectedStorageProviderPeerIDForUpload == null" style="text-align: center; padding-bottom: 10px;">
                <span class="normal-txt" style="font-weight: 500;"> Select a storage provider from your saved list to upload data to:</span>
            </div>
            <div v-if="selectedStorageProviderPeerIDForUpload == null" style="max-height:500px; overflow-y:auto;">
                <table v-if="providers.length > 0" id="storage-providers" class="uk-table uk-table-striped uk-table-middle uk-table-justify">
                    <thead>
                        <tr class="tr-heeader">
                            <th style="text-transform: none; width:30px;"><span style="color:#000;"> Type </span></th>
                            <th style="text-transform: none;"><span style="color:#000;"> Peer ID </span></th>
                            <th style="text-transform: none; width:100px;"> <span style="color:#000;">  Dynamic Fees </span></th>
                            <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Space </span></th>
                            <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Uptime </span></th>
                            <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Country </span></th>
                            <th style="text-transform: none; width:180px;"> <span style="color:#000;"> Fees per byte </span> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="selectSP(p)" style="" v-for="p in providers" :key="p.public_key">
                            <td style="text-align: center;" class="uk-text-truncate">
                                <span uk-tooltip="Public Storage" v-if="p.access_type == 'public_storage'" uk-icon="world"></span>
                                <span uk-tooltip="Storage Access Token" v-if="p.access_type == 'access_token'" uk-icon="unlock"></span>
                            </td>
                            <td class="uk-text-truncate">{{ p.alias != undefined && p.alias != '' ? p.alias : p.storage_provider_peer_addr }}</td>
                            <td style="text-align: center;" class="normal-txt">
                                    <span v-if="p.allow_fees_override != undefined && p.allow_fees_override" uk-tooltip="You can set fees for the data" uk-icon="check"></span>
                                    <span v-else uk-tooltip="Dynamic Fees Disabled on Node" uk-icon="close"></span>
                                </td>
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
                <div id="dropdown-fees-container"></div>
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
                                    
                                    <div v-if="u.override_fees_enabled" style="margin-top:-5px" class="uk-inline">
                                        <!-- <button class="uk-button uk-button-default" type="button">Click</button> -->
                                        <span uk-tooltip="Choose fees" style="padding:13px; cursor: pointer;">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"/></svg>
                                        </span>
                                        <div class="uk-width-small" style="max-width: 400px; font-size: 0.9em;" uk-dropdown="mode: click; container: #dropdown-fees-container;">
                                            <div class="uk-margin">
                                                <select v-model="u.fees_input_model" class="uk-select" aria-label="Select">
                                                    <option selected value="">node fee</option>
                                                    <option value="0">free</option>
                                                    <option value="set">set fees</option>
                                                </select>
                                            </div>
                                            <div v-show="u.fees_input_model == '0'">
                                                <div style="text-align: center; margin-top:10px;">
                                                    <div>      
                                                        <button @click="applyFeeTo(idx, '0')" style="padding: 0px 13px; text-transform: none; border-radius: 3px; border:1px solid #ababab; width:143px;" class="uk-button uk-button-default" type="button">
                                                            Set to free
                                                            <span v-if="setFeeWasClicked(idx)" style="color:green;" uk-icon="check"></span>
                                                        </button>
                                                    </div>
                                                    <div v-if="uploadData.length > 1" style="margin-top:16px;">
                                                        <button @click="applyFeesToAll(idx, 'free')" style="padding: 0px 13px; text-transform: none; border-radius: 3px; border:1px solid #ababab; width:143px;" class="uk-button uk-button-default" type="button">
                                                             Apply to all
                                                             <span v-if="setAllFeeWasClicked(idx)" style="color:green;" uk-icon="check"></span>
                                                         </button>
                                                    </div>
                                               </div>
                                            </div>
                                            <div v-show="u.fees_input_model == 'set'">
                                               <span> Total FFG fees for the whole file: </span> 
                                               <div>
                                                <div style=" width:100%;" class="uk-inline">
                                                    <span style="color: #000;" class="uk-form-icon">FFG</span>
                                                    <input class="uk-input uk-form-width-medium uk-form-small" v-model="u.fees_input_value" type="text" placeholder="e.g. 5" aria-label="Small">
                                                </div>

                                                <div style="text-align: center; margin-top:3px;">
                                                    <button @click="applyFeeTo(idx, u.fees_input_value)" style="padding: 0px 13px; text-transform: none; border-radius: 3px; border:1px solid #ababab; width:143px;" class="uk-button uk-button-default" type="button">
                                                        Set fee
                                                        <span v-if="setFeeWasClicked(idx)" style="color:green;" uk-icon="check"></span>
                                                    </button>
                                                </div>

                                               </div>
                                               <div v-if="uploadData.length > 1" style="text-align: center; margin-top:16px;">
                                                   <button @click="applyFeesToAll(idx, u.fees_input_value)" style="padding: 0px 13px; text-transform: none; border-radius: 3px; border:1px solid #ababab; width:143px;" class="uk-button uk-button-default" type="button">
                                                        Apply to all
                                                        <span v-if="setAllFeeWasClicked(idx)" style="color:green;" uk-icon="check"></span>
                                                    </button>
                                               </div>
                                            </div>
                                        </div>
                                    </div>

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

                <button v-if="selectedStorageProviderPeerIDForUpload != null && selectedStorageProviderPeerIDForUpload.access_type =='access_token'" :disabled="uploadingData  || uploadData.length == 0" @click="startUploading"
                    class="uk-button ffg-button">
                    Upload
                    <span class="uk-icon" uk-icon="icon:  upload"></span>
                </button>

                <button v-if="selectedStorageProviderPeerIDForUpload != null && selectedStorageProviderPeerIDForUpload.access_type !='access_token'" :disabled="uploadingData || uploadData.length == 0" @click="startUploadingNetwork"
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
import { globalState, CheckAndFixFileFeesBeforeUpload, SetFeesUpload, SetFeesAllUploads, ClearItemsFromUpload, SetNodeAddress, AddToUploadData, StartUpload, RemoveItemFromUpload, CancelItemFromUpload, UpdateFileUploadToNetworkProgress, SetHowManyItemsToUpload, StopUpload} from '../store';
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

            // this will be populated if the running node is a storage node
            localStorageNode: null,

            // ui improvement for settings fees to indicate the buttons were clicked 
            clickedSetButton: {},
            clickedSetAllButtons: {}
        }
    },
    async mounted() {
        const addr = ref(globalState.nodeAddress);
        if (addr.value != "") {
            this.nodeAddress = addr.value;
        }

        const statsResult = await callJsonRpc2Endpoint("filefilego.HostInfo", []);
        SetNodeAddress(statsResult.data.result.address, statsResult.data.result.peer_id, statsResult.data.result.node_public_key);

        const pubKey = ref(globalState.publicKey);
        if(pubKey.value != "") {
            this.filesOwnerPublicKey = pubKey.value;
        }

        await this.loadLocalStorageNodeDetails()

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
        },
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
        setFeeWasClicked(idx) {
            let res = this.clickedSetButton[idx]
            if(!res || res == undefined) return false;
            return res
        },
        setAllFeeWasClicked(idx) {
            let res = this.clickedSetAllButtons[idx]
            if(!res || res == undefined) return false;
            return res
        },
        applyFeeTo(idx, fee) { 
            if(fee== "") {
                alert("Invalid fees, please enter a valid amount in FFG")
                return
            }
            SetFeesUpload(idx, fee);

            this.clickedSetButton[idx] = true;
            this.clickedSetAllButtons[idx] = false;
            setTimeout(() => {
                this.clickedSetButton[idx] = false;
            }, 3000)
        },
        applyFeesToAll(idx, val) {
            if(val == "") {
                alert("Invalid fees, please enter a valid amount in FFG")
                return
            }

            if(val == "free") {
                SetFeesAllUploads("0");
            } else  {
                SetFeesAllUploads(val.toString());
            }
            this.clickedSetAllButtons[idx] = true;
            this.clickedSetButton[idx] = false;
            setTimeout(() => {
                this.clickedSetAllButtons[idx] = false;
            }, 3000)
        },
        goBack() {
            if(this.uploadData.length > 0) {
                const userConfirmed = confirm("Are you sure you want to cancel the current operations?");
                if (!userConfirmed) {
                    return
                }
            }

            this.uploadType = ''
            ClearItemsFromUpload();
        },
        async loadLocalStorageNodeDetails() {
            if(globalState.node_type != "storage") return;
            try {
                const storageAccessToken = ref(globalState.storageAccessToken);
                const headers = {
                    'Authorization': storageAccessToken.value,
                    'Content-Type': 'application/json'
                };
    
                const uploadEndpoint = ref(globalState.uploadEndpoint);
                let endPoint = this.parseURL(uploadEndpoint.value)
                if(!endPoint) {
                    return
                }
    
                let response = await axios.post(endPoint.baseUrl + "/storage/introspect", {}, { headers })
                let remoteNodeWithAccess = response.data;
                remoteNodeWithAccess.access_type = "access_token"
                remoteNodeWithAccess.location = "";
                remoteNodeWithAccess.hash = "";
                remoteNodeWithAccess.signature = "";
                remoteNodeWithAccess.country = {};
                remoteNodeWithAccess.http_upload_endpoint = endPoint.baseUrl;
                remoteNodeWithAccess.alias = "Local Storage Node";
    
                this.localStorageNode = remoteNodeWithAccess;
            } catch (e) {
                this.localStorageNode = null
            }
        },
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
            CheckAndFixFileFeesBeforeUpload();
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
            CheckAndFixFileFeesBeforeUpload();
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
                    public_key_owner: this.filesOwnerPublicKey,
                    fees_per_byte: o.fees_per_byte
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
            if(this.uploadData.length > 0) {
                const userConfirmed = confirm("Are you sure you want to cancel the current operations?");
                if (!userConfirmed) {
                    return
                }
            }
            
            if (this.selectedStorageProviderPeerIDForUpload != null) {
                this.selectedStorageProviderPeerIDForUpload = null;
            } else {
                this.uploadType = ''
            }
            ClearItemsFromUpload();
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
            if(this.localStorageNode == null) return

            let accessToken = this.localStorageNode.access_token.token
            let endpoint =  this.parseURL(this.localStorageNode.http_upload_endpoint)
            if(!endpoint) {
                alert("Invalid upload endpoint")
                return
            }

            let dynamicFeesEnabled = this.localStorageNode.access_token.access_type == 'admin' || this.localStorageNode.allow_fees_override
            this.selectFiles(e, accessToken, endpoint.baseUrl + "/uploads", "node", dynamicFeesEnabled);
        },
        selectFilesWithDestinationOther(e) {
            let accessToken = this.selectedStorageProviderPeerIDForUpload.access_token.token
            let endpoint =  this.parseURL(this.selectedStorageProviderPeerIDForUpload.http_upload_endpoint)
            if(!endpoint) {
                alert("Invalid upload endpoint")
                return
            }

            let dynamicFeesEnabled = this.selectedStorageProviderPeerIDForUpload.access_token.access_type == 'admin' || this.selectedStorageProviderPeerIDForUpload.allow_fees_override
            this.selectFiles(e, accessToken, endpoint.baseUrl + "/uploads", "other", dynamicFeesEnabled);
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
                    fees_per_byte: "",
                    fees_input_model: "",
                    fees_input_value: "",
                    override_fees_enabled: this.selectedStorageProviderPeerIDForUpload.allow_fees_override || false
                };

                AddToUploadData(payload, "", "", true, "");
            }
        },
        selectFiles(e, storageAccessToken, uploadEndpoint, uploadType, dynamicFeesEnabled) {
            let count = 0
            for (let i = 0; i < e.target.files.length; i++) {
                if(this.maxfiles>0 && count > this.maxfiles - 1) {
                    continue
                }

                if(this.maxsize > 0 && e.target.files[i].size > this.maxsize) {
                    alert("file " + e.target.files[i].name + " must be smaller than 512KB")
                    continue
                }

                if (e.target.files[i].size <= 0) continue;
                count++;

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
                    fees_per_byte: "",
                    fees_input_model: "",
                    fees_input_value: "",
                    override_fees_enabled: dynamicFeesEnabled
                };

                if (storageAccessToken != "") {
                    AddToUploadData(payload, storageAccessToken, uploadEndpoint, false, this.filesOwnerPublicKey);
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