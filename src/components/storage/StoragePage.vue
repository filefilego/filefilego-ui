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
                                Files
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style="border:1px solid #d7d7d7; border-radius: 2px;">
                <div style="padding:10px;">
                    <table v-if="providers.length > 0" class="uk-table uk-table-striped uk-table-middle uk-table-justify">
                        <thead>
                            <tr>
                                <th style="text-transform: none; width:20px;"><span style="color:#000;"> # </span></th>
                                <th style="text-transform: none;"><span style="color:#000;"> Peer ID </span></th>
                                <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Space </span></th>
                                <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Uptime </span></th>
                                <th style="text-transform: none; width:40px;"> <span style="color:#000;"> Info </span></th>
                                <th style="text-transform: none; width:100px;"> <span style="color:#000;"> Network </span></th>
                                <th style="text-transform: none; width:180px;"> <span style="color:#000;"> Fees per byte </span> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="" v-for="p in providers" :key="p.public_key">
                                <td>
                                    <span uk-tooltip="Save peer" v-if="!isSelected(p)"  :class="isSelected(p) ? 'uk-button-selected' : ''" @click="saveStoragePeer(p)" style="cursor: pointer;" class="uk-icon-button uk-margin-small-right" uk-icon="star"></span>
                                    <span uk-tooltip="Remove peer" v-else :class="isSelected(p) ? 'uk-button-selected' : ''" @click="removeStoragePeer(p)" style="cursor: pointer;" class="uk-icon-button uk-margin-small-right" uk-icon="star"></span>
                                </td>
                                <td class="normal-txt uk-text-truncate">{{ p.storage_provider_peer_addr }}</td>
                                <td class="normal-txt">
                                    {{ $filters.formatsize(p.storage_capacity) }}
                                </td>
                                <td class="normal-txt">
                                    {{ secondsToHours(p.uptime_seconds) }}
                                </td>
                                <td class="normal-txt" style="text-align: center;">
                                    <svg v-if="p.platform =='linux'" fill="rgb(15 23 42)" uk-tooltip="Linux" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7.8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4.6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1.8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7.4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6.8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1.3-.2.7-.3 1-.5.8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"/></svg>
                                    <svg v-if="p.platform =='windows'" fill="rgb(15 23 42)" uk-tooltip="Windows" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>
                                    <svg v-if="p.platform =='darwin'" fill="rgb(15 23 42)" uk-tooltip="macOS" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                                    <span style="margin-left:3px;" v-if="getCountry(p) == '' || getCountry(p) == 'fi-'">
                                    N/A</span>
                                    <span style="margin-left:3px;" v-else :class="getCountry(p)" class="fi"></span>
                                </td>
                                <td style="text-align: center;" class="normal-txt">
                                         <div v-if="speedTestError(p) != ''" class="uk-inline">
                                            <span uk-icon="icon: warning" style="color:red; cursor: pointer;"> </span>
                                            <div style="color: #c50000; font-size: 0.9em;" uk-dropdown="delay-hide:1;">
                                                {{speedTestError(p)}}
                                            </div>
                                        </div>

                                   
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
                                <td class="normal-txt">{{ getFees(p.fees_per_byte) }} FFG</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="text-align: center; padding: 20px 0px;" v-if="providers.length == 0">
                        <span style="color:#000;" uk-icon="icon: server; ratio:2;"></span>
                        <div class="normal-txt" style="margin-top:15px;">
                            The storage provider list is empty. Click on the button below to find storage providers within the network.
                        </div>
                    </div>
                    <div v-if="storageProvidersIntervalCount >= 1" style="text-align: center; padding: 10px; margin-top:5px;">
                        <span class="uk-margin-small-right"
                            uk-spinner="ratio: 1.4"></span>
                    </div>
                    <div v-else style="text-align: center; margin-top:18px; padding-bottom:30px;">
                        <button @click="startSearchProviders" class="uk-button ffg-button"
                            style="width:180px; height:40px; ">
                            Find providers
                            <span class="uk-icon" uk-icon="icon: server"></span>
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
import { Units } from "../../unit.js"
import { localNodeEndpoint } from "../../rpc"
import BigNumber from 'bignumber.js';

export default {
    components: {},
    data() {
        return {
            speedTestErrors: {},
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
        speedTestError(p) {
            if(this.speedTestErrors[p.storage_provider_peer_addr] !== undefined) {
                if(this.speedTestErrors[p.storage_provider_peer_addr].includes("no addresses")) {
                    return "Storage provider seems to be offline";
                }

                if(this.speedTestErrors[p.storage_provider_peer_addr].includes("timeout") || this.speedTestErrors[p.storage_provider_peer_addr].includes("backoff")) {
                    return "Storage provider connection timeout";
                }

                return this.speedTestErrors[p.storage_provider_peer_addr]
            }
            return "";
        },
        isSelected(p) {
            const sp = ref(globalState.storage_providers);
            if (sp.value != undefined && sp.value.length > 0) {
                return sp.value.filter((o) => o.storage_provider_peer_addr == p.storage_provider_peer_addr).length > 0
            }
            return false;
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
                delete this.speedTestErrors[p.storage_provider_peer_addr];
                this.loadingSpeedTest[p.storage_provider_peer_addr] = { loading: true }
                this.loadingDiscoveredProviders = true;
                const data = {
                    jsonrpc: '2.0',
                    method: "storage.TestSpeedWithRemotePeer",
                    params: [{ peer_id: p.storage_provider_peer_addr, file_size: 1024 * 1024 * 5 }],
                    id: 1
                };

                let response = await axios.post(localNodeEndpoint, data);
                this.speedTest[p.storage_provider_peer_addr] = { download_throughput_mb: response.data.result.download_throughput_mb }
            } catch (e) {
                this.speedTestErrors[p.storage_provider_peer_addr] = e.response.data.error
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
        async findProvidersFromVerifiers() {
            try {
                const data = {
                    jsonrpc: '2.0',
                    method: "storage.FindProvidersFromPeers",
                    params: [{ }],
                    id: 1
                };
                await axios.post(localNodeEndpoint, data);
            } catch (e) {
                console.log(e.message)
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
            await this.findProvidersFromVerifiers();

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
