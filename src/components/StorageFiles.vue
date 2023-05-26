<template>
    <div id="files-container"
        style="margin: 0px 10px; border: 1px solid rgb(234, 234, 234); background-color: rgb(255, 255, 255);">
        <div style="padding-left: 15px; padding-top: 15px; padding-right: 15px;">
            <div style="padding-bottom: 15px;" class="uk-grid-match" uk-grid>
                <div class="uk-width-expand">
                    <h4 style="color: rgb(13, 13, 13);  font-weight: 700; margin-top:10px;">
                        Storage
                    </h4>
                </div>
                <div class="k-width-expand uk-text-right">
                    <div>
                    </div>
                </div>
            </div>
            <nav style="padding:0px 10px;" class="uk-navbar-container storage-nav" uk-navbar>
                <div class="uk-navbar-left">
                    <ul class="uk-navbar-nav">
                        <li>
                            <router-link style="text-transform: none;" to="/home/storage">
                                <span uk-icon="icon:server; ratio:1"></span>
                                Storage Providers
                            </router-link>
                        </li>
                        <li>
                            <router-link style="text-transform: none;" to="/home/files">
                                <span uk-icon="icon:database; ratio:1"></span>
                                Uploaded files
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="uk-navbar-right">
                    <ul class="uk-navbar-nav">
                        <li>
                            <span @click="openUploadModal" style="color: #1e87f0; font-weight: bold; text-transform: none; cursor: pointer;">
                                <span uk-icon="icon:upload; ratio:1"></span>
                                Upload
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style="border:1px solid #d7d7d7; border-radius: 2px;">
                <div style="padding:10px;">
                    <table class="uk-table uk-table-striped uk-table-middle uk-table-justify">
                        <thead>
                            <tr>
                                <th><span style="color:#000;"> File Name </span></th>
                                <th><span style="color:#000;"> File Hash </span></th>
                                <th><span style="color:#000;"> Merkle Hash </span></th>
                                <th style="width:130px;"> <span style="color:#000;"> Size </span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="" v-for="f in files" :key="f.hash">
                                <td class="uk-text-truncate">
                                   <span :uk-tooltip="f.file_name"> {{ f.file_name }} </span> 
                                </td>
                                <td class="uk-text-truncate">
                                    {{ f.hash }}
                                </td>
                                <td class="uk-text-truncate">
                                    <span>
                                        {{ f.merkle_root_hash }}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {{  $filters.formatsize(f.size)  }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="loadingFiles" style="text-align: center; padding: 10px; margin-top:5px;">
                        <span style="color:#000;" uk-icon="icon: database; ratio:2;"></span>
                        <div style="margin-top:15px;">
                            Loading uploaded files to this node
                        </div>
                        <span class="uk-margin-small-right" uk-spinner="ratio: 1.4"></span>
                    </div>

                    <div style="text-align: center; padding: 20px 0px;" v-if="files.length == 0">
                        <span style="color:#000;" uk-icon="icon: database; ratio:2;"></span>
                        <div style="margin-top:15px; color:#000;">
                            There are no files on this node, you can upload files to this node or if you are running a public storage provider users uploads will be shown here.
                        </div>
                    </div>
                    <div class="uk-visible@s uk-flex uk-flex-center" v-if="files.length > 0">
                        <pagination-bar size="m-l" :range="pagination.range" :total="pagination.total"
                            :last_page="pagination.last_page" :page="pagination.page"
                            :first_page_url="pagination.first_page_url" :last_page_url="pagination.last_page_url"
                            :next_page_url="pagination.next_page_url" :previous_page_url="pagination.previous_page_url" />
                    </div>
                </div>
            </div>
        </div>

        <div id="modal-upload" uk-modal="container:#files-container">
            <div style="padding-top:17px; width:60%; padding-bottom: 20px;" class="uk-modal-dialog uk-modal-body">
                <button id="close-modal-create" class="uk-modal-close-default" type="button" uk-close></button>
                <h2 style="font-size: 1.2em; font-weight: bold;" class="uk-modal-title">Upload files</h2>
                <div style="padding: 10px; margin-top:10px;">
                    <uploader-component parent="" place="storage" />
                </div>
            </div>
        </div>


    </div>
</template>
        
<script>
// const { ipcRenderer } = window.require("electron");
import UploaderComponent from './UploaderComponent.vue'
import axios from 'axios';
import { globalState } from '../store';
import { ref } from 'vue';
import Pagination from "../pagination.js";
import PaginationBar from "./PaginationBar.vue"

export default {
    components: {
        PaginationBar,
        UploaderComponent
    },
    data() {
        return {
            loadingFiles: false,
            pagination: {},
            nodeAddress: "",
            files: [],
            page_size: 100
        }
    },
    computed: {
        globalState() {
            return globalState
        },
    },
    watch: {},
    unmounted() {

    },
    async mounted() {
        const addr = ref(globalState.nodeAddress);
        if (addr.value != "") {
            this.nodeAddress = addr.value;
        }

        let page = this.$route.query.page || 1;
        const req = {
            originalUrl: "",
            query: {
                include_metadata: "true",
                per_page: this.page_size,
                page: page,
            },
        };

        await this.getFiles(req)

    },
    methods: {
        openUploadModal() {
            const myModal = document.getElementById('modal-upload');
            const modal = window.UIkit.modal(myModal);
            modal.show();
        },
        closeUploadModal() {
            const myModal = document.getElementById('modal-upload');
            const modal = window.UIkit.modal(myModal);
            modal.hide();
        },
        async getFiles(req) {
            try {
                this.loadingFiles = true;
                const paginator = new Pagination.Pagination(req);
                const paginationParams = paginator.extractPaginationData();
                this.loadingChannels = true;


                const data = {
                    jsonrpc: '2.0',
                    method: "storage.ListUploadedFiles",
                    params: [{ current_page: parseInt(req.query.page) - 1, page_size: paginationParams.limit }],
                    id: 1
                };

                let endpoint = ref(globalState.rpcEndpoint);
                let response = await axios.post(endpoint.value, data);
                if (response.data.result.files && response.data.result.files != null) {
                    this.files = [...response.data.result.files];
                }

                paginator.paginate({ rows: this.files, count: response.data.result.total });
                let pl = paginator.payload();
                this.pagination = { ...pl };

            } catch (e) {
                alert(e.message)
            } finally {
                this.loadingFiles = false;
            }
        },
    }
}
</script>

<style scoped>
.circles {
    padding: 0px;
    margin: 0px;
    position: relative;
}

.wallet-button {
    --ripple-color: #fff;
    cursor: pointer;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 3px;
    --keyboard-offset: 0px;
    --offset-top: 0px;
    --offset-bottom: 0px;
    --overflow: hidden;
    --color-activated: var(--color);
    --color-focused: var(--color);
    --color-hover: var(--color);
    display: inline-block;
    font-family: var(--ion-font-family, inherit);
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: none;
    vertical-align: -webkit-baseline-middle;
    font-kerning: none;
    --border-radius: 4px;
    --padding-top: 0;
    --padding-bottom: 0;
    --padding-start: 1.1em;
    --padding-end: 1.1em;
    --transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), background-color 15ms linear, color 15ms linear;
    margin-inline: 2px;
    margin-top: 4px;
    margin-bottom: 4px;
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    --background: transparent;
    --color: var(--ion-color-primary, #3880ff);
    --border-width: 2px;
    --border-style: solid;
    --box-shadow: none;
    --background-activated: transparent;
    --background-focused: var(--ion-color-primary, #3880ff);
    --background-hover: var(--ion-color-primary, #3880ff);
    --background-activated-opacity: 0;
    --background-focused-opacity: 0.12;
    --background-hover-opacity: 0.04;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    width: 100px;
    --border-color: #ffffff;
    color: rgb(255, 255, 255);
}

.ffg-button-search {
    background-color: #f0f0f0;
    color: white;
    border-radius: 3px;
    text-transform: none;
}

.ffg-button-search:hover {
    background-color: #cecece;
    color: white;
    border-radius: 3px;
    text-transform: none;
}

.storage-nav .router-link-active {
    color: #333;
    font-weight: bold;
}
</style>
