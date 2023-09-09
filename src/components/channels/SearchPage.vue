<template>
    <div style="margin: 0px 10px; border: 1px solid rgb(234, 234, 234); background-color: rgb(255, 255, 255);">
        <div style="padding-left: 15px; padding-top: 15px; padding-right: 15px;">
            <div class="uk-grid-match" uk-grid>
                <div class="uk-width-expand">
                    <h4 style="color: rgb(13, 13, 13);  font-weight: 700; margin-top:10px;">
                        Search
                    </h4>
                </div>
                <div class="uk-width-auto uk-text-right">

                </div>
            </div>
            <hr />
            <div>
                <div style="padding-top:10px;" class="uk-text-center">
                    <p v-if="searchInChannelName!=''" class="normal-txt" style="font-size:1em;">
                        Search under: <span style="color:#1e87f0; font-weight: bold;"> {{ searchInChannelName }} </span> 
                    </p>
                    <p v-else class="normal-txt" style="font-size:1em;">
                        Search all channels
                    </p>

                    <div class="">
                        <label class="normal-txt"><input v-model="searchType" class="uk-radio" type="radio" name="radio2"
                                value="all" checked />
                            Match all words
                        </label>
                        <label class="normal-txt"><input v-model="searchType" class="uk-radio" type="radio" name="radio2"
                                value="any" />
                            Match any word
                        </label>
                    </div>

                    <div style="width:60%; margin-top:20px;" class="uk-search uk-search-default">
                        <span uk-search-icon></span>
                        <input id="searchinpt" @keypress.enter="submit" v-model="query" class="uk-search-input normal-txt"
                            type="search" placeholder="Search..." />
                    </div>
                    <button @click="submit" style="background-color:#2c0fcd; color:white;"
                        class="uk-button uk-button-default">
                        Search
                    </button>
                </div>
            </div>

            <div v-show="nodes.length == 0 && !loading" class="uk-text-center" style="padding-top:20px;">
                <div style="width:70%; margin:0 auto;">
                    <p v-if="submited" class="med-text"
                        style="font-size:1em; margin-top:20px;">
                        <span uk-icon="warning"></span> We could not find any results matching your search query.
                        Would you like to try a different search term instead?
                    </p>
                    <p v-else class="normal-txt" style="font-size:1em; margin-top:20px;">
                        Your search results will be available here
                    </p>
                </div>
            </div>

            <div v-show="loading" class="uk-text-center" style="padding-top: 50px">
                <div style="text-align: center">
                    <div class="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div style="width: 70%; margin: 0 auto">
                    <span style="color: rgb(13, 13, 13); font-size:1em; padding-bottom: 11px">
                        Please wait while we search for you term
                    </span>

                    <div class="uk-margin">
                        <span class="uk-margin-small-right" uk-spinner="ratio: 3"></span>
                    </div>
                </div>
            </div>

            <div v-show="!loading && nodes.length > 0" style="padding-top: 20px">
                <div style="padding:0px 10px; text-align: center; text-transform: none;">
                    <table style="margin:0px;" class="uk-table uk-table-divider">
                        <tbody>
                            <tr v-for="(ch) in nodes" :key="ch.node_hash">
                                <td style="width: 34px; vertical-align: middle">
                                    <div uk-tooltip="Channel" v-if="ch.node_type <= 1"
                                        style=" background-color: #000; margin: 0px auto;width: 32px;font-weight: 600;color: white;font-size: 1.2em;text-align: center;border-radius: 4px;height: 32px; ">
                                        <span style="display:inline-block; margin-top:2px;"> {{
                                            $filters.firstletter(getAltName(ch)) }} </span>
                                    </div>
                                    <div uk-tooltip="Subchannel" v-if="ch.node_type == 2"
                                        style=" background-color: #000; margin: 0px auto;width: 32px;font-weight: 600;color: white;font-size: 1.2em;text-align: center;border-radius: 4px;height: 32px; ">
                                    
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 90 112.5" style="fill:white; enable-background:new 0 0 90 90;" xml:space="preserve"><path d="M17.310547,56.456055c-0.136719,0.422363,0.021484,0.885254,0.388672,1.135254  c0.169922,0.116211,0.366211,0.17334,0.5625,0.17334c0.226563,0,0.452148-0.07666,0.635742-0.228516  c0.151367-0.124023,3.552734-2.950195,6.745117-7.413086c0.788147,0.393311,1.613831,0.739685,2.456238,1.056824  c1.073853,8.711487,10.898499,15.556458,22.825012,15.556458c3.853516,0,7.661133-0.736816,11.054688-2.134766  c5.150391,4.104492,10.963867,6.495117,11.21582,6.597656c0.12207,0.049805,0.25,0.07373,0.376953,0.07373  c0.301758,0,0.595703-0.136719,0.789063-0.38623c0.275391-0.353516,0.28125-0.847168,0.015625-1.20752  c-2.114258-2.865723-3.479492-7.292969-4.276367-10.679688c2.456055-2.79541,3.750977-6.036621,3.750977-9.404785  c0-6.703735-5.176392-12.517151-12.694885-15.333252c-1.088806-8.760864-10.921875-15.534424-22.801208-15.534424  c-12.641602,0-22.925781,7.689453-22.925781,17.141602c0,3.188477,1.185547,6.296875,3.431641,9.011719  C18.918945,47.888184,18.682617,52.229004,17.310547,56.456055z M71.850586,49.594727  c0,3.013672-1.236328,5.932129-3.574219,8.438965c-0.225586,0.242188-0.317383,0.580078-0.244141,0.902832  c0.819336,3.621094,1.826172,6.647949,3.007813,9.044434c-2.238281-1.14209-5.419922-2.960938-8.262695-5.306641  c-0.182617-0.150391-0.408203-0.228516-0.636719-0.228516c-0.136719,0-0.273438,0.027832-0.402344,0.084473  c-3.28125,1.443359-7.021484,2.206055-10.814453,2.206055c-11.539063,0-20.926758-6.79248-20.926758-15.141602  s9.387695-15.141602,20.926758-15.141602S71.850586,41.245605,71.850586,49.594727z M38.354492,20.727051  c10.432129,0,19.146606,5.528687,20.685608,12.839233c-2.52478-0.717102-5.259216-1.113159-8.116272-1.113159  c-12.372009,0-22.480591,7.366089-22.906372,16.540527c-0.761902-0.317383-1.507751-0.657043-2.211792-1.041504  c-0.453125-0.245605-1.015625-0.108887-1.305664,0.314453c-1.494141,2.191895-3.103516,4.03125-4.389648,5.364746  c0.703125-3.472656,0.807617-6.764648,0.741211-9.154785c-0.006836-0.22998-0.092773-0.451172-0.243164-0.625488  c-2.080078-2.411133-3.179688-5.171387-3.179688-7.982422C17.428711,27.519531,26.816406,20.727051,38.354492,20.727051z"/><path d="M48.035156,49.594727c0,1.592773,1.295898,2.888672,2.888672,2.888672S53.8125,51.1875,53.8125,49.594727  s-1.295898-2.888672-2.888672-2.888672S48.035156,48.001953,48.035156,49.594727z M51.8125,49.594727  c0,0.490234-0.398438,0.888672-0.888672,0.888672s-0.888672-0.398438-0.888672-0.888672s0.398438-0.888672,0.888672-0.888672  S51.8125,49.104492,51.8125,49.594727z"/><path d="M42.9375,46.706055c-1.592773,0-2.888672,1.295898-2.888672,2.888672s1.295898,2.888672,2.888672,2.888672  s2.888672-1.295898,2.888672-2.888672S44.530273,46.706055,42.9375,46.706055z M42.9375,50.483398  c-0.490234,0-0.888672-0.398438-0.888672-0.888672s0.398438-0.888672,0.888672-0.888672s0.888672,0.398438,0.888672,0.888672  S43.427734,50.483398,42.9375,50.483398z"/><path d="M58.910156,52.483398c1.592773,0,2.888672-1.295898,2.888672-2.888672s-1.295898-2.888672-2.888672-2.888672  s-2.888672,1.295898-2.888672,2.888672S57.317383,52.483398,58.910156,52.483398z M58.910156,48.706055  c0.490234,0,0.888672,0.398438,0.888672,0.888672s-0.398438,0.888672-0.888672,0.888672s-0.888672-0.398438-0.888672-0.888672  S58.419922,48.706055,58.910156,48.706055z"/></svg>
                                    </div>
                                    <div v-if="ch.node_type == 3"
                                        style=" background-color: #3e15ca; margin: 0px auto;width: 32px;font-weight: 600;color: white;font-size: 1.2em;text-align: center;border-radius: 4px;height: 32px; ">
                                        <span style="display:inline-block; margin-top:2px;"> {{
                                            $filters.firstletter(getAltName(ch)) }} </span>
                                    </div>
                                    <img v-if="ch.node_type==4" src="/assets/folder.png" />
                                    <img v-if="ch.node_type==5" :src="nodeVector(getAltName(ch))" />
                                </td>
                                <td>
                                    <div style="text-align: left; vertical-align: middle; padding-top:5px;">
                                        <router-link style="font-weight: bold"
                                            :to="'/channels/node/' + ch.node_hash"> {{ getAltName(ch) }}</router-link>
                                        <div v-if="ch.description != '' && ch.node_type <= 2 " style="font-size: 0.9em; padding: 0; margin: 0">
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
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
import { ref } from 'vue';
import { globalState } from '../../store';
import ftype from "../../filetype";

export default {
    data() {
        return {
            searchInChannelName: "",
            searchInChannel: "",
            pageSize: 100,
            searchType: "any",
            query: "",
            nodes: [],
            loading: false,
            submited: false,
            colors: [
                "#3e15ca",
                "#f0506e",
                "#32d296",
                "#ff6200",
                "#00cca6",
                "#4947ef",
                "#bdbdbd",
            ]
        };
    },
    async mounted() {
        let channel = this.$route.query.channel || -1;
        if(channel != -1) {
            this.searchInChannel = "ChannelHash:"+ channel;
            this.searchInChannelName = this.$route.query.channel_name;
        }

        let q = this.$route.query.query || -1;
        if (q == -1) {
            this.query = "";
            this.submited = false;
            this.nodes = [];
        } else {
            this.query = q;

            this.search(this.query, this.searchType, this.pageSize, 0, this.searchInChannel);
        }
        document.getElementById("searchinpt").focus();
    },
    computed: {
    },
    methods: {
        getAltName(node){
            if(node.attributes != undefined && node.attributes.length > 0) {
                let finalName = ""
                node.attributes.forEach((attr) => {
                    if(attr.includes("alt_name:")) {
                        let names = attr.split("alt_name:")
                        if(names.length > 0) {
                            finalName = names[1]
                        }
                    }
                })
                if(finalName != "") return finalName;
            }
            return node.name
        },
        nodeVector(name) {
            let img = `/assets/file_types/${ftype.getVectorOf(ftype.getExt(name))}.svg`;
            return img;
        },
        getBgColor(idx) {
            let which = idx % this.colors.length
            return this.colors[which];
        },
        submit() {
            this.$router.push("/channels/search?query=" + this.query);
        },
        async search(query, search_type, size, currentPage, fieldScope) {

            try {
                this.loading = true;
                let endpoint = ref(globalState.rpcEndpoint);

                const rawRes = await axios.post(endpoint.value, {
                    jsonrpc: "2.0",
                    method: "channel.Search",
                    params: [{ query: query, search_type: search_type, size: size, current_page: currentPage, field_scope: fieldScope }],
                    id: 1,
                });

                if (rawRes.data.result.nodes.length > 0) {
                    this.nodes = [...rawRes.data.result.nodes];
                    this.submited = false;
                } else {
                    this.submited = true;
                    this.nodes = [];
                }
            } catch (e) {
                alert(e.message);
            } finally {
                this.loading = false;
            }

        },
    },
    watch: {
        searchType: function(val) {
            let q = this.$route.query.query || -1;
                if (q == -1) {
                    this.query = "";
                    this.submited = false;
                    this.nodes = [];
                } else {
                    this.query = q;
                    this.search(this.query, val, this.pageSize, 0, this.searchInChannel);
                }
        },
        $route: async function (val) {
            if (val && val.name == "SearchPage") {
                let q = this.$route.query.query || -1;
                if (q == -1) {
                    this.query = "";
                    this.submited = false;
                    this.nodes = [];
                } else {
                    this.query = q;
                    this.search(this.query, this.searchType, this.pageSize, 0, this.searchInChannel);
                }
            }
        },
    },
};
</script>
  
<style></style>
  