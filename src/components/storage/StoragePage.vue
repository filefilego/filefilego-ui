<template>
    <div id="storage-container"
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
                            <router-link style="text-transform: none;" to="/storage">
                                <span uk-icon="icon:server; ratio:1"></span>
                                Storage Providers
                            </router-link>
                        </li>
                        <li>
                            <router-link style="text-transform: none;" to="/storage/files">
                                <span uk-icon="icon:database; ratio:1"></span>
                                Uploaded files
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style="border:1px solid #d7d7d7; border-radius: 2px;">
                <div style="padding:10px;">
                    <table class="uk-table uk-table-striped uk-table-middle uk-table-justify">
                        <thead>
                            <tr>
                                <th style="width:20px;"><span style="color:#000;"> # </span></th>
                                <th><span style="color:#000;"> Peer ID </span></th>
                                <th style="width:40px;"> <span style="color:#000;"> Space </span></th>
                                <th style="width:40px;"> <span style="color:#000;"> Uptime </span></th>
                                <th style="width:40px;"> <span style="color:#000;"> Country </span></th>
                                <th style="width:100px;"> <span style="color:#000;"> Network </span></th>
                                <th style="width:180px;"> <span style="color:#000;"> Fees per byte </span> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="" v-for="p in providers" :key="p.public_key">
                                <td>
                                    <span uk-tooltip="Save peer" v-if="!isSelected(p)"  :class="isSelected(p) ? 'uk-button-selected' : ''" @click="saveStoragePeer(p)" style="cursor: pointer;" class="uk-icon-button uk-margin-small-right" uk-icon="star"></span>
                                    <span uk-tooltip="Remove peer" v-else :class="isSelected(p) ? 'uk-button-selected' : ''" @click="removeStoragePeer(p)" style="cursor: pointer;" class="uk-icon-button uk-margin-small-right" uk-icon="star"></span>
                                </td>
                                <td class="uk-text-truncate">{{ p.storage_provider_peer_addr }}</td>
                                <td>
                                    {{ $filters.formatsize(p.storage_capacity) }}
                                </td>
                                <td>
                                    {{ secondsToHours(p.uptime_seconds,2) }} h
                                </td>
                                <td style="text-align: center;">
                                    <span v-if="getCountry(p) == '' || getCountry(p) == 'fi-'">
                                    N/A</span>
                                    <span v-else :class="getCountry(p)" class="fi"></span>
                                </td>
                                <td>
                                    
                                    <span v-if="getSpeedTestLoading(p)" class="uk-margin-small-right" uk-spinner="ratio: 1"></span>
                                    <div v-else>
                                        <button v-if="getSpeedTest(p) == ''" @click="perfromSpeedTest(p)" class="uk-button ffg-button"
                                            style="padding:5px;  margin:0px; height:30px; font-size: 0.9em; line-height: 0.9em;">
                                            Speed Test
                                        </button>
                                        <span v-else>
                                            {{ getSpeedTest(p) }} MB/s
                                        </span>
                                    </div>
                                </td>
                                <td>{{ getFees(p.fees_per_byte) }} FFG</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="text-align: center; padding: 20px 0px;" v-if="providers.length == 0">
                        <span style="color:#000;" uk-icon="icon: server; ratio:2;"></span>
                        <div style="color:#000; margin-top:15px;">
                            The storage provider list is empty. Click on the button below to find storage providers within the network.
                        </div>
                    </div>
                    <div style="text-align: center; padding: 10px; margin-top:5px;">
                        <span v-if="storageProvidersIntervalCount > 1" class="uk-margin-small-right"
                            uk-spinner="ratio: 1.4"></span>
                    </div>
                    <div style="text-align: center; margin-top:18px; padding-bottom:30px;">
                        <button @click="startSearchProviders" class="uk-button ffg-button"
                            style="width:150px; height:40px; ">
                            Find providers
                            <span class="uk-icon" uk-icon="icon: thumbnails"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
        
<script>
const { ipcRenderer } = window.require("electron");
import axios from 'axios';
import { globalState, RemoveStorageProviders, SetStorageProviders} from '../../store';
import { ref } from 'vue';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Units } from "../../unit.js"
import { localNodeEndpoint } from "../../rpc"
import BigNumber from 'bignumber.js';

export default {
    components: {},
    data() {
        return {
            loadingSpeedTest: {},
            speedTest: {},
            storageProvidersInterval: null,
            storageProvidersIntervalCount: 0,
            loadingDiscoveredProviders: false,
            providers: []
        }
    },
    computed: {
        globalState() {
            return globalState
        },
    },
    watch: {},
    unmounted() {},
    async mounted() {
        const addr = ref(globalState.nodeAddress);
        if (addr.value != "") {
            this.nodeAddress = addr.value;
        }

        const sp = ref(globalState.storage_providers);
        if (sp.value != undefined && sp.value.length > 0) {
            this.providers = [...sp.value];
        }
    },
    methods: {
        isSelected(p) {
            const sp = ref(globalState.storage_providers);
            if (sp.value != undefined && sp.value.length > 0) {
                return sp.value.filter((o) => o.storage_provider_peer_addr == p.storage_provider_peer_addr).length > 0
            }
            return false;
        },
        secondsToHours(seconds, precision) {
            const hours = seconds / (60 * 60);
            const roundedHours = Number(hours.toFixed(precision));
            return roundedHours;
        },
        saveStoragePeer(sp) {
            const spj = JSON.stringify(sp);

            const s = ref(globalState.storage_providers);
            let all = [];
            if (s.value != undefined && s.value.length > 0) {
               all = [JSON.parse(spj), ...s.value]
            } else {
                all = [JSON.parse(spj)];
            }

            SetStorageProviders(all);
            const saveRes = ipcRenderer.sendSync("save-storage-providers", JSON.parse(JSON.stringify(all)));
            
            if(saveRes.error != "") {
                alert(saveRes.error);
                return
            }
        },
        removeStoragePeer(p) {
            RemoveStorageProviders(p.storage_provider_peer_addr);
            const s = ref(globalState.storage_providers);
            let all = [...s.value];
            const saveRes = ipcRenderer.sendSync("save-storage-providers", JSON.parse(JSON.stringify(all)));
            if(saveRes.error != "") {
                alert(saveRes.error);
                return
            }
        },
        getSpeedTestLoading(p) {
            if(this.loadingSpeedTest[p.storage_provider_peer_addr] !== undefined) {
                return this.loadingSpeedTest[p.storage_provider_peer_addr].loading;
            }
            return false;
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
            if(p.country != undefined && p.country.Country != undefined && p.country.Country.IsoCode != undefined) {
                return 'fi-'+ p.country.Country.IsoCode.toLowerCase();
            }
            return "";
        },
        getSpeedTest(p) {
            if (this.speedTest[p.storage_provider_peer_addr] !== undefined) {
                return Math.round((parseFloat(this.speedTest[p.storage_provider_peer_addr].download_throughput_mb) + Number.EPSILON) * 100) / 100
            } else {
                return ""
            }
        },
        async perfromSpeedTest(p) {
            try {
                this.loadingSpeedTest[p.storage_provider_peer_addr] = { loading: true }
                this.loadingDiscoveredProviders = true;
                const data = {
                    jsonrpc: '2.0',
                    method: "storage.TestSpeedWithRemotePeer",
                    params: [{ peer_id: p.storage_provider_peer_addr, file_size: 1024 * 1024 * 10 }],
                    id: 1
                };

                let response = await axios.post(localNodeEndpoint, data);
                this.speedTest[p.storage_provider_peer_addr] = { download_throughput_mb: response.data.result.download_throughput_mb }
            } catch (e) {
                console.log(e.message)
            } finally {
                this.loadingDiscoveredProviders = false;
                this.loadingSpeedTest[p.storage_provider_peer_addr] = { loading: false }
            }
        },
        async populateResultsOfProviders() {
            try {
                this.loadingDiscoveredProviders = true;
                const data = {
                    jsonrpc: '2.0',
                    method: "storage.GetDiscoveredProviders",
                    params: [{}],
                    id: 1
                };

                let response = await axios.post(localNodeEndpoint, data);
                this.providers = [...response.data.result.storage_providers];
            } catch (e) {
                console.log(e.message)
            } finally {
                this.loadingDiscoveredProviders = false;
            }
        },
        async findProviders() {
            try {
                const data = {
                    jsonrpc: '2.0',
                    method: "storage.FindProviders",
                    params: [{ preferred_location: "" }],
                    id: 1
                };

                
                let response = await axios.post(localNodeEndpoint, data);
                return response.data.result;
            } catch (e) {
                alert(e.message)
            }
        },
        async startSearchProviders() {
            if(this.storageProvidersInterval != null) {
                clearInterval(this.storageProvidersInterval);
                this.storageProvidersInterval = null;
            }
            this.storageProvidersInterval = null;
            this.storageProvidersIntervalCount = 1;
            await this.findProviders();

            this.storageProvidersInterval = setInterval(async () => {
                if (this.storageProvidersIntervalCount > 11) {
                    clearInterval(this.storageProvidersInterval);
                    this.storageProvidersIntervalCount = 0;
                    return;
                }
                if (this.loadingDiscoveredProviders) return;
                await this.populateResultsOfProviders()
                this.storageProvidersIntervalCount++;
            }, 1000)

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

.uk-button-selected {
    background: #ffee9d;
    color: #000;
}

</style>
