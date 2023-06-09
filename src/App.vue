<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
import axios from 'axios';
import { globalState, SetBlockchainStats } from './store';
import { ref } from 'vue';

export default {
    name: 'App',
    components: {},
    data() {
        return {
            blockchain_height: 0,
            heighest_block_number_discovered: 100,
            syncing: true,
            
            interval: null,
            numFailedCalls: 0,
        }
    },
    unmounted() {
        clearInterval(this.interval)
    },
    computed: {
        nodeType() {
            return globalState.node_type;
        }
    },
    watch: {
        nodeType(val) {
            if(val == "storage" && this.interval == null ) {
                this.interval = setInterval(async () => {
                    if(globalState.node_type != "storage" && globalState.node_type != "") {
                        clearInterval(this.interval);
                    }

                    if (this.numFailedCalls > 50) {
                        clearInterval(this.interval);
                        alert("failed to connect to local node retried 50 times");
                        return;
                    }

                    await this.getStats()
                }, 4000)
            }
        }
    },
    mounted() {

        let nodeKeyExists = ipcRenderer.sendSync("node-key-exists", {})
        if (nodeKeyExists) {
            this.$router.replace("/unlock")
        }
    },
    methods: {
        async getStats() {
            try {
                const data = {
                    jsonrpc: '2.0',
                    method: "filefilego.Stats",
                    params: [{}],
                    id: 1
                };
                const endpoint = ref(globalState.rpcEndpoint);
                const response = await axios.post(endpoint.value, data);

                this.blockchain_height = response.data.result.blockchain_height;
                this.heighest_block_number_discovered = response.data.result.heighest_block_number_discovered;
                if (this.heighest_block_number_discovered == 0) {
                    this.heighest_block_number_discovered = 100;
                }
                if (this.blockchain_height > this.heighest_block_number_discovered) {
                    this.heighest_block_number_discovered = this.blockchain_height;
                }
                this.syncing = response.data.result.syncing;

                SetBlockchainStats(this.blockchain_height, this.heighest_block_number_discovered, this.syncing);
                this.numFailedCalls = 0;
            } catch (e) {
                this.numFailedCalls++
            }
        }
    }
}
</script>

<style>
html { font-family: "Inter", "system-ui"; }

@supports (font-variation-settings: normal) {
  html { font-family: "Inter var", "system-ui"; }
}

#app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.clickable {
    cursor: pointer;
}

body {
    margin: 0;
}

body :not(input) {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.ffg-button {
    background-color: #3e15ca;
    color: white;
    border-radius: 3px;
    text-transform: none;
    font-weight: 600;
}

.ffg-button:disabled{
    background-color: transparent;
    color: #757575;
    border:1px solid #e5e5e5;
}

.ffg-button:disabled:hover{
    background-color: transparent;
    color: #757575;
}

.ffg-button:hover {
    background-color: #4b16f8;
    color: white;
}

.area {
    background: #4e54c8;
    /* background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8); */
    width: 100%;
}

.circles {
    padding: 0px;
    margin: 0px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 283px;
    overflow: hidden;
}

.circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;

}

.circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}

.circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}



@keyframes animate {

    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }

}


.normal-txt {
    color: rgb(71 85 105);
    line-height: 1.75rem;
    font-size: 1rem;
}

.normal-txt-header {
    color: rgb(15 23 42);
    line-height: 1.5rem;
    font-weight: 600;
    font-size: 1rem;
}

.modal-header {
    color: rgb(17 24 39);
    line-height: 1.5rem;
    font-weight: 600;
    font-size: 1rem;
}

.modal-txt {
    color: rgb(107 114 128);
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.app-header {

    color: rgb(17 24 39);
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.app-header2 {
    color: rgb(17 24 39);
    letter-spacing: -0.025em;
    line-height: 2.25rem;
    font-weight: 700;
    font-size: 1.5rem;

}

</style>
