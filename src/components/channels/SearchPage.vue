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
                <div style="padding-top:20px;" class="uk-text-center">
                    <div class="">
                        <label class="normal-txt"><input v-model="searchType" class="uk-radio" type="radio" name="radio2"
                                value="all" checked />
                            Match all words
                        </label>
                        <label class="normal-txt"><input v-model="searchType" class="uk-radio" type="radio" name="radio2"
                                value="any" />
                            Match any word
                        </label>
                        <!-- <label
              ><input
                v-model="searchType"
                class="uk-radio"
                type="radio"
                name="radio2"
                value="3"
              />
              Exact match
            </label> -->
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
                                    <div v-if="ch.node_type <= 2"
                                        style=" background-color: #000; margin: 0px auto;width: 32px;font-weight: 600;color: white;font-size: 1.2em;text-align: center;border-radius: 4px;height: 32px; ">
                                        <span style="display:inline-block; margin-top:2px;"> {{
                                            $filters.firstletter(ch.name) }} </span>
                                    </div>
                                    <div v-if="ch.node_type == 3"
                                        style=" background-color: #3e15ca; margin: 0px auto;width: 32px;font-weight: 600;color: white;font-size: 1.2em;text-align: center;border-radius: 4px;height: 32px; ">
                                        <span style="display:inline-block; margin-top:2px;"> {{
                                            $filters.firstletter(ch.name) }} </span>
                                    </div>
                                    <img v-if="ch.node_type==4" src="/assets/folder.png" />
                                    <img v-if="ch.node_type==5" :src="nodeVector(ch.name)" />
                                </td>
                                <td>
                                    <div style="text-align: left; vertical-align: middle; padding-top:5px;">
                                        <router-link style="font-weight: bold"
                                            :to="'/channels/node/' + ch.node_hash"> {{ ch.name }}</router-link>
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
        let q = this.$route.query.query || -1;
        if (q == -1) {
            this.query = "";
            this.submited = false;
            this.nodes = [];
        } else {
            this.query = q;

            this.search(this.query, this.searchType, this.pageSize, 0);
        }
        document.getElementById("searchinpt").focus();
    },
    computed: {
    },
    methods: {
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
        async search(query, search_type, size, currentPage) {

            try {
                this.loading = true;
                let endpoint = ref(globalState.rpcEndpoint);

                const rawRes = await axios.post(endpoint.value, {
                    jsonrpc: "2.0",
                    method: "channel.Search",
                    params: [{ query: query, search_type: search_type, size: size, current_page: currentPage }],
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
                    this.search(this.query, val, this.pageSize, 0);
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
                    this.search(this.query, this.searchType, this.pageSize, 0);
                }
            }
        },
    },
};
</script>
  
<style></style>
  