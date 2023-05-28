<template>
    <div id="channel-container" style="margin: 0px 10px; border: 1px solid rgb(234, 234, 234); background-color: rgb(255, 255, 255);">
        <div style="padding-left: 15px; padding-top: 15px; padding-right: 15px;">
            
            <div class="uk-grid-match" uk-grid>
                <div class="uk-width-expand">
                    <h4 style="color: rgb(13, 13, 13);  font-weight: 700; margin-top:10px;">
                    Channels
                    </h4>
                </div>
                <div class="k-width-expand uk-text-right">
                    <div>
                        <router-link style="margin-right: 10px;" to="/channels/search/">
                            <button class="uk-button ffg-button-search " style=" padding:0px 10px; width:50px; height:40px; ">
                                <span style="color:#000;" class="uk-icon" uk-icon="icon: search"></span>
                            </button>
                        </router-link>
                        <button @click="openCreateChannelModal" class="uk-button ffg-button" style="width:150px; height:40px; ">
                            New Channel
                            <span class="uk-icon" uk-icon="icon: thumbnails"></span>
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div class="uk-text-center" style="padding-bottom: 20px;">
                <div v-if="loadingChannels" style="padding:0px 10px; text-align: center;">
                    <div style="border:1px solid #d7d7d7; border-radius: 2px;">
                        <div style="margin-top:50px;">
                            <span style="color:#000; font-size: 25px; font-weight: bold;">Loading channels</span>
                        </div>
                        <div style="margin-top:18px; padding-bottom:30px;">
                            <div style="margin-top:35px;">
                                <div class="uk-margin">
                                    <span class="uk-margin-small-right" uk-spinner="ratio: 3"></span>
                                </div>
                                <span class="uk-text-small">Please wait while we load the channels</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div v-if="channels.length <= 0" style="padding:0px 10px; text-align: center;">
                        <div style="border:1px solid #d7d7d7; border-radius: 2px;">
                            <div style="margin-top:50px;">
                                <span style="color:#000; font-size: 25px; font-weight: bold;">No channels yet</span>
                            </div>
                            <div style="margin-top:18px; padding-bottom:30px;">
                                <div style="margin-top:35px;">
                                    <div class="uk-margin">
                                        <svg style="vertical-align:middle;" xmlns="http://www.w3.org/2000/svg" height="110px" width="110px" fill="#3e15ca" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px" > <title> </title> <path d="M90,39a4,4,0,0,0-3.86,3H83v8.36l-3.11-3.11L66.38,52.13l-3.17,8.79L54,56.6l-8.62,4,4-8.07-4.53-5.72L51.73,40h5.41a4,4,0,1,0,0-2H50.9l-7.29,7.29-3.14-4-7.34-.17,2.89-8-4.28-4.28L39.63,21H50.14a4,4,0,1,0,0-2H38.81l-8.48,8.48L27,24.15V13H37.14a4,4,0,1,0,0-2H25V24L12.85,28.38,8,41.89l9.66,9.66,3.94-1.42L20,53.24l4.31,5.44L19,64H12.86a4,4,0,1,0,0,2h7l5.74-5.74L29,64.49l12,.27V70H30.86a4,4,0,1,0,0,2H41v4.37l5,2.35V82H37.86a4,4,0,1,0,0,2H48V79.66l6,2.81,6-2.81V87H76.14a4,4,0,1,0,0-2H62V78.72l5-2.35V71.12l4.17,4.17,13.5-4.87,4.88-13.51L85,52.36V44h1.14A4,4,0,1,0,90,39ZM61,37a2,2,0,1,1-2,2A2,2,0,0,1,61,37ZM54,18a2,2,0,1,1-2,2A2,2,0,0,1,54,18ZM41,10a2,2,0,1,1-2,2A2,2,0,0,1,41,10ZM9,67a2,2,0,1,1,2-2A2,2,0,0,1,9,67Zm18,6a2,2,0,1,1,2-2A2,2,0,0,1,27,73Zm7,12a2,2,0,1,1,2-2A2,2,0,0,1,34,85Zm46-1a2,2,0,1,1-2,2A2,2,0,0,1,80,84ZM68,53.69l9.91-3.58L74,59.7l-7.56,2.73L65,61.78ZM65,65.07v1.22l-.9-.9Zm-2.47-2.26L62.1,64l-7.83,3.32L45.06,63,54,58.81Zm-23-19.51L46,51.57l-10.33-.63-4.19-5.29.9-2.5Zm-10-.22.83,0-.26.71Zm-.94,2.41-2.95,1.06,1.34-2.68ZM31,41.12,26.91,41l-4.52-4.51,4.07-10.07,7.25,7.25ZM14.42,30l9.91-3.58L20.46,36,11,39.36Zm3.74,19.29-7.59-7.59L21,37.9l4.48,4.48-2.57,5.15Zm6.14-.1,5.78-2.08,4,5-4.78,9.6L22.39,53ZM31,62.54,35.81,53l10.84.66L42.46,62,41,62.7v.06ZM43,64.8h.31l.17-.34L53,68.94V79.79L43,75.1ZM65,75.1,55,79.79V69.19l7.07-3L65,69.12Zm2-6.81v-4l7.49-2.7,7.58,7.59L71.69,73Zm16.49-.47-7.57-7.57L80,50.18l7.25,7.25ZM90,45a2,2,0,1,1,2-2A2,2,0,0,1,90,45Z" /> </svg>
                                    </div>
                                    <span style="color:#000;">
                                        Create a channel on the network to easily organize and share information with the rest of the world, without the risk of censorship.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else style="padding:0px 10px; text-align: center; text-transform: none;">
                        <table class="uk-table uk-table-divider">
                            <thead>
                                <tr>
                                    <th>
                                        <div style=" margin: 0px auto; width: 24px; font-weight: 600; color: white; font-size: 1.2em; text-align: center; border-radius: 50%; height: 24px; background-color: #bdbdbd;"></div>
                                    </th>
                                    <th style="color:#000; text-transform: none;">Channel Name</th>
                                    <th style="text-align:right; color:#000; text-transform: none;">Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ch, idx) in channels" :key="ch.node_hash">
                                    <td style="width: 34px; vertical-align: middle">
                                        <div :style="'background-color: ' + getBgColor(idx)" style="margin: 0px auto;width: 32px;font-weight: 600;color: white;font-size: 1.2em;text-align: center;border-radius: 50%;height: 32px; ">
                                            <span style="display:inline-block; margin-top:2px;"> {{ $filters.firstletter(ch.name)}} </span> 
                                        </div>
                                    </td>
                                    <td>
                                        <div style="text-align: left; vertical-align: middle">
                                            <svg style="margin-right: 5px;" height="20px" width="20px" viewBox="0 0 101 102" class="sc-fQcmUk dFdwND itemAnimation"><path d="M9.2,38.3C9.2,37.4,8.8,36.3,8.4,35.1C7.9,33.7,7.3,32.2,6.8,30.8C5.2,26.1,6.4,24.1,11.3,23.2C13.1,22.9,14.8,22.6,16.6,22.3C19.4,21.8,21.1,20.2,21.6,17.3C22,15.1,22.4,12.8,22.9,10.6C23.7,7.1,25.5,6,28.9,7C31,7.6,33.1,8.5,35.1,9.2C38.5,10.5,40.1,9.6,42.5,7C44.1,5.3,45.4,3.4,47.1,1.8C49-0.1,51-0.2,53.1,1.5C54.5,2.7,55.5,4.2,56.7,5.5C57.5,6.4,58.3,7.3,59.1,8.2C60.5,9.7,62.2,10.1,64.2,9.4C66.5,8.6,68.8,7.7,71.2,7C75,5.8,76.6,6.7,77.6,10.4C78.2,12.8,78.5,15.2,79,17.7C79.5,20.2,81.1,21.6,83.6,22.1C85.9,22.6,88.2,23,90.5,23.3C93.5,23.7,95.1,25.8,94.3,28.8C93.7,31.1,92.9,33.3,92.1,35.4C90.9,38.4,91.5,40.9,94,42.9C95.3,44,96.7,45.1,98,46.2C101.7,49.4,101.7,52.1,97.9,55.2C96.4,56.4,94.9,57.7,93.5,58.9C91.4,60.7,91,62.9,91.9,65.4C92.5,67.1,93.2,68.8,94,70.4C95.7,74.1,94.6,76.9,90.7,78C88.5,78.6,86.2,78.8,84,79.3C81.4,79.8,79.8,81,79.2,84.1C78.7,86.7,78.4,89.5,77.4,92C76.4,94.5,75,95.2,72.4,94.7C69.7,94.2,67.3,92.7,64.6,92.1C62.3,91.5,60.4,91.8,58.8,93.7C57.1,95.7,55.5,97.7,53.7,99.6C51.7,101.6,49.6,102,48,100.7C46.8,99.7,45.7,98.5,44.7,97.3C43.8,96.2,42.7,95.1,41.9,93.9C40.2,91.5,37.7,91.8,35.3,92.6C33,93.3,30.8,94.2,28.5,94.9C25.8,95.6,24.2,94.7,23.3,91.9C22.7,90,22.5,88.1,22.2,86.2C21.4,81.2,20.1,79.9,15,79.1C13.5,78.9,12,78.6,10.5,78.3C6.5,77.4,5.5,75.7,6.7,71.8C7.4,69.6,8.3,67.4,9,65.2C9.7,63,9.4,61.1,7.6,59.6C6,58.2,4.4,56.8,2.7,55.4C-1,52.5-1,49.7,2.4,46.6C4.2,45.1,6.1,43.8,7.7,42C8.7,41.1,9.2,40,9.2,38.3z" fill="rgb(0, 153, 255)" order="0" opacity="1"></path><path d="M41.9,71.1C43.8,71.2,45.2,70.3,46.5,69C55.4,60,64.3,51.1,73.2,42.1C73.8,41.5,74.4,40.8,74.9,40.1C76.6,37.5,76.1,34.3,73.7,32.4C71.1,30.3,67.7,30.8,64.9,33.6C57.7,40.9,50.4,48.2,43.2,55.6C42.2,56.7,41.5,56.8,40.5,55.6C38.9,53.8,37.1,52.2,35.4,50.5C32.7,47.9,29,47.7,26.6,50.1C24.1,52.6,24.1,56,26.9,58.8C30.3,62.4,33.9,65.8,37.4,69.3C38.6,70.4,40.1,71.1,41.9,71.1z" fill="rgb(255, 255, 255)" order="1" opacity="1"></path></svg>
                                            <router-link style="font-weight: bold" :to="'/channels/node/' + ch.node_hash"> {{ ch.name }}</router-link>
                                            <div style="font-size: 0.9em; padding: 0; margin: 0">
                                                {{ ch.description }}
                                            </div>
                                        </div>
                                    </td>
                                    <td style="vertical-align: middle; text-align:right;">
                                        <div>{{ $filters.timestamptodate(ch.timestamp) }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="uk-visible@s uk-flex uk-flex-center" v-if="channels.length > 0">
                            <pagination-bar
                                size="m-l"
                                :range="pagination.range"
                                :total="pagination.total"
                                :last_page="pagination.last_page"
                                :page="pagination.page"
                                :first_page_url="pagination.first_page_url"
                                :last_page_url="pagination.last_page_url"
                                :next_page_url="pagination.next_page_url"
                                :previous_page_url="pagination.previous_page_url"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="modal-create" uk-modal="container:#channel-container">
            <div class="uk-modal-dialog uk-modal-body">
                <button id="close-modal-create" class="uk-modal-close-default" type="button" uk-close></button>
                <h2 class="uk-modal-title">Create Channel</h2>
                <div style="padding-bottom:10px; text-align: center; border-bottom:1px solid rgb(230, 230, 230);">
                    <img style="height: 72px; background-color: white; width: 72px; border-radius: 50%;" src="/assets/icon.png" />
                    <br />
                    <span class="uk-text-lead"> Channel Details </span>
                   
                </div>
                <div style="padding: 10px; margin-top:10px;">
                    <div style=" width:100%;" class="uk-inline">
                        <span style="color: #000;" class="uk-form-icon" uk-icon="icon: pencil"></span>
                        <input v-model="name" style="width:100%; border-radius: 4px; color:#000;" class="uk-input" type="text" placeholder="Channel Name" aria-label="Input">
                    </div>
                    <div v-if="validateNameError != ''" style="margin-top:10px;">
                        <span class="uk-text-small uk-text-danger"> <span style="margin-right:5px;" uk-icon="icon: warning;"></span> {{ validateNameError }} </span>
                    </div>

                </div>
                <div style="padding: 10px; margin-top:5px;">
                    <div style="width:100%;" class="uk-inline">
                        <textarea v-model="description" class="uk-textarea" rows="5" placeholder="Description" aria-label="Textarea"></textarea>
                    </div>
                    <div v-if="validateDescError != ''" style="margin-top:10px;">
                        <span class="uk-text-small uk-text-danger"> <span style="margin-right:5px;" uk-icon="icon: warning;"></span> {{ validateDescError }}</span>
                    </div>
                    <br /> <br />
                    <span style="font-weight: bold; color:#000;">
                        Channel registration fees: {{ channelRegistrationFees }} FFG
                    </span>
                </div>
                
                <div style="padding: 10px; margin-top:5px;">
                    <button v-if="!creatingChannel && !channelCreated"  @click="createChannel" class="uk-button ffg-button" style="font-weight: bold; text-transform: none; width:100%; height:50px;">
                        Create Channel
                        <span class="uk-icon" uk-icon="icon: thumbnails"></span>
                    </button>
                    <div style="text-align:center;" v-if="creatingChannel">
                        <span style="color:#3e15ca;" class="uk-margin-small-right" uk-spinner="ratio: 1"></span>
                    </div>

                     <div style="text-align:center;" v-if="channelCreated">
                        Channel was successfully created
                    </div>

                    <br />
                    <div v-if="createChannelError != ''" style="margin-top:10px;">
                        <span class="uk-text-small uk-text-danger"> <span style="margin-right:5px;" uk-icon="icon: warning;"></span> {{ createChannelError  }} </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
        
<script>
// const { ipcRenderer } = window.require("electron");
import axios from 'axios';
import { globalState} from '../../store';
import { ref } from 'vue';
import { callJsonRpc2Endpoint } from '../../rpc'
import numberToBN from "number-to-bn";
import { Units } from "../../unit.js"
import BigNumber from 'bignumber.js';
import Pagination from "../../pagination.js";
import PaginationBar from "./../PaginationBar.vue"

export default {
    components: {
        PaginationBar
    },
    data() {
        return {
            pagination: {},
            channelCreated: true,
            lastTXSent: "",
            creatingChannel: false,
            nodeAddress: "",
            page_size: "40",
            name: "",
            description: "",
            validateNameError: "",
            validateDescError: "",
            createChannelError : "",
            colors: [
                "#3e15ca",
                "#f0506e",
                "#32d296",
                "#ff6200",
                "#00cca6",
                "#4947ef",
                "#bdbdbd",
            ],
            loadingChannels: false,
            channels: []
        }
    },
    computed: {
        globalState() {
            return globalState
        },
        channelRegistrationFees() {
            let feedBig = new BigNumber(this.globalState.channel_creation_fees_ffg_hex, 16);
            let ffgFees = Units.convert(feedBig.toString(10), "FFGOne", "FFG")
            return ffgFees
        }
    },
    watch: {
        $route: async function(val) {
            if (val && val.name == "ChannelsPage") {
                const req = {
                    originalUrl: "",
                    query: {
                        include_metadata: "true",
                        per_page: this.page_size,
                        page: val.query.page,
                    },
                };

                await this.getData(req);
            }
        },
    },
    unmounted() {

    },
    async mounted() {
        const addr = ref(globalState.nodeAddress);
        if(addr.value != "") {
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
        
        await this.getData(req);
    },
    methods: {
        async getData(req) {
            const paginator = new Pagination.Pagination(req);
            const paginationParams = paginator.extractPaginationData();
            this.loadingChannels = true;

            try {
                const res = await this.getChannels(
                    parseInt(req.query.page) - 1,
                    paginationParams.limit
                );

                if (res.channels && res.channels != null) {
                    this.channels = [...res.channels];
                }

                paginator.paginate({ rows: this.channels, count: res.total });
                let pl = paginator.payload();
                this.pagination = { ...pl };
            } catch (e) {
                alert(e.message);
            } finally {
                this.loadingChannels = false;
            }
        
        },
        async getChannels(currentPage, pageSize) {
            const data = {
                jsonrpc: '2.0',
                method: "channel.List",
                params: [{ current_page: currentPage,  page_size: pageSize, order: "asc" }],
                id: 1
            };

            let endpoint = ref(globalState.rpcEndpoint);
            let response = await axios.post(endpoint.value, data);
            return response.data.result;
        },
        async createChannel() {
            try {
                if(this.creatingChannel) {
                    return;
                }

                if(this.name == "") {
                    this.validateNameError = "Channel name is required";
                    return;
                } else {
                    this.validateNameError = "";
                }

                if(this.description == "") {
                    this.validateDescError = "Channel description is required";
                    return;
                } else {
                    this.validateDescError = "";
                }
            
                this.creatingChannel = true;

                this.createChannelError = "";

                const data = {
                    jsonrpc: '2.0',
                    method: "channel.CreateNodeItemsTxDataPayload",
                    params: [{ nodes: [{ enabled: true, name: this.name, description: this.description, node_type: 1, timestamp: Math.floor(Date.now() / 1000) }] }],
                    id: 1
                };
    
                const endpoint = ref(globalState.rpcEndpoint);
                const response = await axios.post(endpoint.value, data);
               
                let channelFees = numberToBN(response.data.result.total_fees_required);
                let balanceRes = await this.getBalance();
                let balanceFFGOneBig = numberToBN(balanceRes.balance_hex);
                if(balanceFFGOneBig.lt(channelFees)) {
                    throw new Error(
                        `You don't have enough coins in your balance!`
                    );
                }
                const jwtAccess = ref(globalState.jwtAccessToken);   
                const sendTxRes = await callJsonRpc2Endpoint("transaction.SendTransaction", [{ access_token: jwtAccess.value, nounce: balanceRes.next_nounce, data : response.data.result.transaction_data_payload_hex, from: this.nodeAddress , to: "0x01", value: "0x0", transaction_fees: response.data.result.total_fees_required }])
                this.lastTXSent = sendTxRes.data.result.transaction.hash
                this.channelCreated = true;                
                this.closeCreateChannelModal()
            } catch (e) {
                this.createChannelError = e.message;
            } finally {
                this.creatingChannel = false;
            }
        },
        async getBalance() {
            const data = {
                jsonrpc: '2.0',
                method: "address.Balance",
                params: [{ address: this.nodeAddress}],
                id: 1
            };
            const endpoint = ref(globalState.rpcEndpoint);
            const response = await axios.post(endpoint.value, data);
            return response.data.result;
        },
        openCreateChannelModal() {
            this.channelCreated = false;
            const myModal = document.getElementById('modal-create');
            const modal = window.UIkit.modal(myModal);
            modal.show();
        },
        closeCreateChannelModal() {
            const myModal = document.getElementById('close-modal-create');
            myModal.click()
        },
        getBgColor(idx) {
            let which = idx % this.colors.length
            return this.colors[which];
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
    border-radius: 3px; text-transform: none;
}

.ffg-button-search:hover {
    background-color: #cecece;
    color: white;
    border-radius: 3px; text-transform: none;
}
</style>
