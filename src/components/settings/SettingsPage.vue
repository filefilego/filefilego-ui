<template>
  <div style="margin: 0px 10px; border: 1px solid rgb(234, 234, 234); background-color: rgb(255, 255, 255);">
    <div style="padding-left: 15px; padding-top: 15px; padding-right: 15px;">
      <h4 style="color: rgb(13, 13, 13); border-bottom: 1px solid #ddd; padding-bottom: 11px; font-weight: 700;">
        Settings
      </h4>

      <div class="uk-text-left" style="padding-bottom:15px;">
        <div class="uk-form-horizontal uk-margin-large normal-txt">
          <div class="uk-margin">
            <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">Peer ID</label>
            <div class="uk-form-controls">
              <input readonly v-model="peerID" class="uk-input normal-txt" id="form-horizontal-text" type="text"
                placeholder="Peer ID">
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">Peer Count</label>
            <div class="uk-form-controls">
              <input readonly v-model="peerCount" class="uk-input normal-txt" id="form-horizontal-text" type="text"
                placeholder="Peer Count">
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">Address</label>
            <div class="uk-form-controls">
              <input readonly v-model="nodeAddr" class="uk-input normal-txt" id="form-horizontal-text" type="text"
                placeholder="Address">
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-select">Node
              Type</label>
            <div class="uk-form-controls">
              <select v-model="nodeType" class="uk-select uk-form-width-medium normal-txt" id="form-horizontal-select">
                <option value="superlight">Super Light Node</option>
                <option value="storage">Storage Node</option>
              </select>
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">Downloads
              Directory</label>
            <div class="uk-form-controls">
              <input readonly v-model="downloadsDir" class="uk-input uk-form-width-large normal-txt" id="form-horizontal-text"
                type="text" placeholder="Downloads Directory">
              <button @click="chooseDir('downloadDir')" class="uk-button ffg-button" style="width:150px; height:40px; ">
                Change
                <span class="uk-icon" uk-icon="icon: folder"></span>
              </button>
            </div>
          </div>

          <div v-if="nodeType == 'storage'">

            <div class="uk-margin">
              <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">Storage
                Directory</label>
              <div class="uk-form-controls">
                <input readonly v-model="storageDir" class="uk-input uk-form-width-large normal-txt" id="form-horizontal-text"
                  type="text" placeholder="Downloads Directory">
                <button @click="chooseDir('storageDir')" class="uk-button ffg-button" style="width:150px; height:40px; ">
                  Change
                  <span class="uk-icon" uk-icon="icon: folder"></span>
                </button>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">
              Allow Public Storage
              </label>
              <div class="uk-form-controls">
                

                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                  <label><input v-model="allowPublicStorage" class="uk-checkbox" type="checkbox"> Allow everyone to store data on this computer</label>
                </div>


              </div>
            </div>


            <div class="uk-margin">
              <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">Storage
                Access Token</label>
              <div class="uk-form-controls">
                <input  v-model="storageAccessToken" class="uk-input normal-txt" id="form-horizontal-text"
                  type="text" placeholder="Storage Access Token">
               
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">Storage
                Fees Per Byte</label>
              <div class="uk-form-controls">
                <input  v-model="storageFeesPerByte" class="uk-input normal-txt" id="form-horizontal-text"
                  type="text" placeholder="Storage Fees Per Byte">

                  <span class="normal-txt" style="font-size: 0.9em; font-weight: 500;">
                    You will charge {{ storageFeesCalculatedGB  }} FFG for 1 GB file
                  </span>
               
              </div>
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label normal-txt" style="font-size:0.9em; font-weight: 500;" for="form-horizontal-text">
              Wallet Key Location
            </label>
            <div class="uk-form-controls">
              
              <button @click="openFolder()" class="uk-button ffg-button" style="width:150px; height:40px; ">
                Open
                <span class="uk-icon" uk-icon="icon: folder"></span>
              </button>
              <div>
                <span class="normal-txt" style="font-size: 0.9em; font-weight: 500;">
                  Click open and backup your "node_identity.json" file
                </span>
                
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center;">
          <div v-if="error != ''" style="">
              <span class="uk-text-small uk-text-danger"> <span style="margin-right:5px;" uk-icon="icon: warning;"></span> {{ error }} </span>
          </div>

          <div v-show="successUpdate" class="uk-alert-success" uk-alert>
              <a class="uk-alert-close" uk-close></a>
              <p>Settings were successfully updated. Please restart filefilego for the changes to be applied.</p>
          </div>


          <div style="margin-top:10px;">
            <button @click="save" class="uk-button ffg-button" style="width:180px; height:40px; ">
              Save
              <span class="uk-icon" uk-icon="icon: cog"></span>
            </button>
          </div>
        </div>

      </div>



    </div>
  </div>
</template>
    
<script>
const { ipcRenderer } = window.require("electron");
import { globalState, SetPeerCount } from '../../store';
import { localNodeEndpoint } from '../../rpc';
import axios from 'axios';
import { ref } from 'vue';
import { Units } from "../../unit.js"
import BigNumber from 'bignumber.js';

export default {
  components: {
  },
  data() {
    return {
      successUpdate: false,
      storageFeesCalculatedGB: "",
      error: "",
      peerID: "",
      nodeAddr: "",
      peerCount: 0,
      nodeType: "",
      downloadsDir: "",
      storageDir: "",
      allowPublicStorage: false,
      storageAccessToken: "",
      storageFeesPerByte: "",
      storageFeesIsValid: true,
    }
  },
  unmounted() {

  },
  async mounted() {
    this.nodeAddr = globalState.nodeAddress;
    this.peerID = globalState.peerID;
    this.peerCount = globalState.peerCount;
    this.nodeType = globalState.node_type;
    this.downloadsDir = globalState.downloadsPath;
    this.storageDir = globalState.storagePath;
    this.allowPublicStorage = globalState.storagePublic;
    this.storageAccessToken = globalState.storageAccessToken;
    this.storageFeesPerByte = globalState.storageFees || "0.0000000001";

    try {
      const data = {
        jsonrpc: '2.0',
        method: "filefilego.Stats",
        params: [{}],
        id: 1
      };
      const endpoint = ref(localNodeEndpoint);
      const response = await axios.post(endpoint.value, data);
      SetPeerCount(response.data.result.peer_count)
      this.peerCount = response.data.result.peer_count;
    } catch (e) {
      alert(e.message);
    }

  },
  computed: {
    globalState() {
      return globalState
    }
  },
  watch: {
    storageFeesPerByte(newVal) {
        if(newVal== "") return;
        try{
          let oneGB = new BigNumber("1073741824", 10);
          let feesBig = Units.convert(newVal, "FFG", "FFGOne")
          let feesBigVal = new BigNumber(feesBig, 10);
          let totalFees = oneGB.mul(feesBigVal);
          this.storageFeesCalculatedGB = Units.convert(totalFees.toString(10), "FFGOne", "FFG")
          this.error = "";
          this.storageFeesIsValid = true;
        } catch (e) {
          this.error = "Storage Fees: " + e.message
          this.storageFeesIsValid = false;
        }
      }
  },
  methods: {
    openFolder() {
      let filePath = ipcRenderer.sendSync("get-datadir", {})
      ipcRenderer.sendSync("open-folder", filePath);
    },
    chooseDir(selectType) {
        let selected = ipcRenderer.sendSync("select-dir", {})
        if(selected.filePaths && selected.filePaths.length > 0) {
          if(selectType=='downloadDir') {
            this.downloadsDir = selected.filePaths[0];
          } else {
            this.storageDir = selected.filePaths[0];
          }
        }
    },
    save() {
        this.error = "";
        this.successUpdate = false;

        let st = ipcRenderer.sendSync("get-settings", {});
        if(st.error != "") {
            this.error = st.error;
            return
        }

        if(this.downloadsDir == "") {
          this.error = "Downloads directory is empty"
          return;
        }

        st.settings.downloadsFolder = this.downloadsDir;
        st.settings.node_type = this.nodeType;

        if(this.nodeType == "storage") {

          if(this.storageDir == "") {
            this.error = "Storage directory is empty"
            return;
          }

          if(this.storageAccessToken == "") {
            this.error = "Storage Access token is empty"
            return;
          }

          if(this.storageFeesPerByte == "") {
            this.error = "Storage fees is empty"
            return;
          }

          if(!this.storageFeesIsValid) {
            this.error = "Storage fees is invalid"
            return;
          }

          st.settings.storageFolder = this.storageDir;
          st.settings.storageAccessToken = this.storageAccessToken;
          st.settings.storageFees = this.storageFeesPerByte;
          st.settings.storagePublic = this.allowPublicStorage;
        
        }

        const saveRes = ipcRenderer.sendSync("save-settings", st.settings);
        if(saveRes.error != "") {
          this.error = saveRes.error;
          return
        }

        this.successUpdate = true;
    }
  }
}
</script>
    
<style scoped></style>
        