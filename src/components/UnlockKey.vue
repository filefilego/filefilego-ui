<template>
    <div style="padding-bottom: 20px;">
      <window-header></window-header>
      <div class="area" style="padding-bottom: 12px; padding-top: 21px; background-color: rgb(62, 21, 202); text-align: center;">
          <ul class="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
          <div>
            <img style="height: 72px; background-color: white; width: 72px; border-radius: 50%;" src="/assets/icon.png" />
          </div>
          <div style="margin-top:13px;">
              <span class="app-header" style="color: #fff;"> FILEFILEGO</span>
          </div>
          <div style="margin-top:13px; padding-bottom: 13px;">
              <span class="app-header" style="color: #fff;">Decentralized Data Sharing Network</span>
          </div> 
  
        <!-- Hello world
        <input type="button" @click="run"  value="Run" /> -->
      </div>
  
      <div style="text-align: center; margin-top: 60px;">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="90pt" height="90pt" version="1.1" viewBox="0 0 700 700"> <defs> <symbol id="n" overflow="visible"> <path d="m29.312-1.75c-1.5117 0.78125-3.0898 1.3711-4.7344 1.7656-1.6367 0.40625-3.3398 0.60938-5.1094 0.60938-5.3125 0-9.5273-1.4844-12.641-4.4531-3.1055-2.9688-4.6562-7-4.6562-12.094s1.5508-9.125 4.6562-12.094c3.1133-2.9688 7.3281-4.4531 12.641-4.4531 1.7695 0 3.4727 0.19922 5.1094 0.59375 1.6445 0.39844 3.2227 0.99219 4.7344 1.7812v6.5938c-1.5312-1.0391-3.0391-1.8008-4.5156-2.2812-1.4805-0.48828-3.0391-0.73438-4.6719-0.73438-2.9375 0-5.2461 0.94531-6.9219 2.8281-1.6797 1.875-2.5156 4.4648-2.5156 7.7656 0 3.293 0.83594 5.8828 2.5156 7.7656 1.6758 1.875 3.9844 2.8125 6.9219 2.8125 1.6328 0 3.1914-0.23828 4.6719-0.71875 1.4766-0.48828 2.9844-1.2539 4.5156-2.2969z"/> </symbol> <symbol id="c" overflow="visible"> <path d="m21.453-17.406c-0.67969-0.3125-1.3516-0.53906-2.0156-0.6875-0.65625-0.15625-1.3203-0.23438-1.9844-0.23438-1.9688 0-3.4844 0.63281-4.5469 1.8906-1.0547 1.2617-1.5781 3.0703-1.5781 5.4219v11.016h-7.6562v-23.922h7.6562v3.9219c0.97656-1.5625 2.1016-2.7031 3.375-3.4219 1.2812-0.71875 2.8125-1.0781 4.5938-1.0781 0.25 0 0.52344 0.011719 0.82812 0.03125 0.30078 0.023438 0.73438 0.070312 1.2969 0.14062z"/> </symbol> <symbol id="a" overflow="visible"> <path d="m27.562-12.031v2.1875h-17.891c0.1875 1.793 0.83203 3.1367 1.9375 4.0312 1.1133 0.89844 2.6719 1.3438 4.6719 1.3438 1.6016 0 3.25-0.23438 4.9375-0.70312 1.6875-0.47656 3.4219-1.2031 5.2031-2.1719v5.8906c-1.8047 0.6875-3.6094 1.2031-5.4219 1.5469-1.8125 0.35156-3.6211 0.53125-5.4219 0.53125-4.3359 0-7.7031-1.0977-10.109-3.2969-2.3984-2.207-3.5938-5.2969-3.5938-9.2656 0-3.9062 1.1758-6.9727 3.5312-9.2031 2.3633-2.2383 5.6094-3.3594 9.7344-3.3594 3.7578 0 6.7695 1.1367 9.0312 3.4062 2.2578 2.2617 3.3906 5.2812 3.3906 9.0625zm-7.8594-2.5312c0-1.457-0.42969-2.6289-1.2812-3.5156-0.84375-0.89453-1.9492-1.3438-3.3125-1.3438-1.4922 0-2.6992 0.41797-3.625 1.25-0.91797 0.83594-1.4922 2.0391-1.7188 3.6094z"/> </symbol> <symbol id="h" overflow="visible"> <path d="m14.391-10.766c-1.5938 0-2.793 0.27344-3.5938 0.8125-0.80469 0.54297-1.2031 1.3398-1.2031 2.3906 0 0.96875 0.32031 1.7305 0.96875 2.2812 0.64453 0.54297 1.5469 0.8125 2.7031 0.8125 1.4375 0 2.6445-0.51562 3.625-1.5469 0.98828-1.0312 1.4844-2.3203 1.4844-3.875v-0.875zm11.688-2.8906v13.656h-7.7031v-3.5469c-1.0312 1.4492-2.1875 2.5078-3.4688 3.1719s-2.8398 1-4.6719 1c-2.4805 0-4.4961-0.72266-6.0469-2.1719-1.543-1.4453-2.3125-3.3203-2.3125-5.625 0-2.8125 0.96094-4.8672 2.8906-6.1719 1.9375-1.3125 4.9688-1.9688 9.0938-1.9688h4.5156v-0.60938c0-1.207-0.48047-2.0938-1.4375-2.6562-0.94922-0.5625-2.4375-0.84375-4.4688-0.84375-1.6367 0-3.1562 0.16797-4.5625 0.5-1.4062 0.32422-2.7188 0.8125-3.9375 1.4688v-5.8281c1.6445-0.40625 3.2891-0.70703 4.9375-0.90625 1.6562-0.20703 3.3047-0.3125 4.9531-0.3125 4.3203 0 7.4375 0.85547 9.3438 2.5625 1.9141 1.6992 2.875 4.4609 2.875 8.2812z"/> </symbol> <symbol id="g" overflow="visible"> <path d="m12.031-30.719v6.7969h7.875v5.4688h-7.875v10.141c0 1.1172 0.21875 1.8711 0.65625 2.2656 0.4375 0.38672 1.3125 0.57812 2.625 0.57812h3.9375v5.4688h-6.5625c-3.0234 0-5.1641-0.62891-6.4219-1.8906-1.2617-1.2578-1.8906-3.3984-1.8906-6.4219v-10.141h-3.7969v-5.4688h3.7969v-6.7969z"/> </symbol> <symbol id="b" overflow="visible"> <path d="m19.953-20.422v-12.812h7.6875v33.234h-7.6875v-3.4531c-1.0547 1.4062-2.2148 2.4375-3.4844 3.0938-1.2734 0.65625-2.7422 0.98438-4.4062 0.98438-2.9492 0-5.3711-1.1719-7.2656-3.5156-1.8867-2.3438-2.8281-5.3594-2.8281-9.0469s0.94141-6.7031 2.8281-9.0469c1.8945-2.3438 4.3164-3.5156 7.2656-3.5156 1.6562 0 3.1172 0.33594 4.3906 1 1.2812 0.65625 2.4453 1.6836 3.5 3.0781zm-5.0469 15.484c1.6445 0 2.8945-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.85547-1.1953-2.1055-1.7969-3.75-1.7969-1.625 0-2.8711 0.60156-3.7344 1.7969-0.85547 1.1992-1.2812 2.9375-1.2812 5.2188 0 2.2734 0.42578 4.0078 1.2812 5.2031 0.86328 1.1992 2.1094 1.7969 3.7344 1.7969z"/> </symbol> <symbol id="f" overflow="visible"> <path d="m16.406-4.9375c1.6328 0 2.8828-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.86719-1.1953-2.1172-1.7969-3.75-1.7969-1.6367 0-2.8906 0.60547-3.7656 1.8125-0.875 1.1992-1.3125 2.9336-1.3125 5.2031 0 2.2617 0.4375 3.9961 1.3125 5.2031 0.875 1.1992 2.1289 1.7969 3.7656 1.7969zm-5.0781-15.484c1.0508-1.3945 2.2188-2.4219 3.5-3.0781 1.2812-0.66406 2.7539-1 4.4219-1 2.9453 0 5.3672 1.1719 7.2656 3.5156 1.8945 2.3438 2.8438 5.3594 2.8438 9.0469s-0.94922 6.7031-2.8438 9.0469c-1.8984 2.3438-4.3203 3.5156-7.2656 3.5156-1.668 0-3.1406-0.33594-4.4219-1s-2.4492-1.6914-3.5-3.0781v3.4531h-7.6562v-33.234h7.6562z"/> </symbol> <symbol id="e" overflow="visible"> <path d="m0.53125-23.922h7.6562l6.4219 16.234 5.4688-16.234h7.6562l-10.062 26.188c-1.0117 2.6641-2.1953 4.5234-3.5469 5.5781-1.3438 1.0625-3.1211 1.5938-5.3281 1.5938h-4.4219v-5.0156h2.3906c1.3008 0 2.2422-0.21094 2.8281-0.625 0.59375-0.40625 1.0547-1.1484 1.3906-2.2188l0.20312-0.65625z"/> </symbol> <symbol id="d" overflow="visible"> <path d="m22.359-23.172v5.7969c-1.6367-0.67578-3.2148-1.1875-4.7344-1.5312-1.5234-0.34375-2.9609-0.51562-4.3125-0.51562-1.4609 0-2.543 0.18359-3.25 0.54688-0.69922 0.36719-1.0469 0.92188-1.0469 1.6719 0 0.61719 0.26562 1.0898 0.79688 1.4219 0.53125 0.32422 1.4883 0.5625 2.875 0.71875l1.3438 0.1875c3.9141 0.5 6.5508 1.3242 7.9062 2.4688 1.3516 1.1367 2.0312 2.9219 2.0312 5.3594 0 2.5547-0.94531 4.4688-2.8281 5.75-1.875 1.2812-4.6797 1.9219-8.4062 1.9219-1.5859 0-3.2188-0.125-4.9062-0.375s-3.4219-0.625-5.2031-1.125v-5.8125c1.5195 0.74219 3.082 1.2969 4.6875 1.6719 1.6016 0.36719 3.2344 0.54688 4.8906 0.54688 1.4883 0 2.6094-0.20312 3.3594-0.60938 0.75781-0.41406 1.1406-1.0312 1.1406-1.8438 0-0.6875-0.26172-1.1953-0.78125-1.5312-0.52344-0.33203-1.5586-0.59375-3.1094-0.78125l-1.3438-0.17188c-3.4062-0.42578-5.793-1.2109-7.1562-2.3594-1.3672-1.1562-2.0469-2.9102-2.0469-5.2656 0-2.5312 0.86719-4.4062 2.6094-5.625 1.7383-1.2266 4.3984-1.8438 7.9844-1.8438 1.4062 0 2.8828 0.10938 4.4375 0.32812 1.5508 0.21094 3.2383 0.54297 5.0625 1z"/> </symbol> <symbol id="m" overflow="visible"> <path d="m3.6719-23.922h7.6562v23.922h-7.6562zm0-9.3125h7.6562v6.2344h-7.6562z"/> </symbol> <symbol id="l" overflow="visible"> <path d="m19.953-4.0625c-1.0547 1.3984-2.2148 2.4219-3.4844 3.0781-1.2734 0.65625-2.7422 0.98438-4.4062 0.98438-2.918 0-5.3281-1.1484-7.2344-3.4531-1.9062-2.3008-2.8594-5.2266-2.8594-8.7812 0-3.582 0.95312-6.5156 2.8594-8.7969s4.3164-3.4219 7.2344-3.4219c1.6641 0 3.1328 0.32812 4.4062 0.98438 1.2695 0.64844 2.4297 1.6797 3.4844 3.0938v-3.5469h7.6875v21.516c0 3.8438-1.2148 6.7734-3.6406 8.7969-2.4297 2.0312-5.9492 3.0469-10.562 3.0469-1.5 0-2.9492-0.11719-4.3438-0.34375-1.3984-0.21875-2.7969-0.57031-4.2031-1.0469v-5.9531c1.3438 0.76953 2.6562 1.3438 3.9375 1.7188s2.5664 0.5625 3.8594 0.5625c2.5078 0 4.3477-0.54688 5.5156-1.6406 1.1641-1.0938 1.75-2.8047 1.75-5.1406zm-5.0469-14.891c-1.5742 0-2.8047 0.58984-3.6875 1.7656-0.88672 1.168-1.3281 2.8203-1.3281 4.9531 0 2.1875 0.42578 3.8516 1.2812 4.9844 0.85156 1.1367 2.0977 1.7031 3.7344 1.7031 1.5938 0 2.832-0.58203 3.7188-1.75 0.88281-1.1758 1.3281-2.8203 1.3281-4.9375 0-2.1328-0.44531-3.7852-1.3281-4.9531-0.88672-1.1758-2.125-1.7656-3.7188-1.7656z"/> </symbol> <symbol id="k" overflow="visible"> <path d="m27.734-14.562v14.562h-7.7031v-11.156c0-2.0625-0.046875-3.4844-0.14062-4.2656-0.085937-0.78125-0.24219-1.3594-0.46875-1.7344-0.30469-0.5-0.71094-0.88281-1.2188-1.1562-0.51172-0.28125-1.0938-0.42188-1.75-0.42188-1.5938 0-2.8516 0.61719-3.7656 1.8438-0.90625 1.2305-1.3594 2.9375-1.3594 5.125v11.766h-7.6562v-23.922h7.6562v3.5c1.1445-1.3945 2.3633-2.4219 3.6562-3.0781 1.3008-0.66406 2.7383-1 4.3125-1 2.7578 0 4.8516 0.85156 6.2812 2.5469 1.4375 1.6875 2.1562 4.1523 2.1562 7.3906z"/> </symbol> <symbol id="j" overflow="visible"> <path d="m9.7188-12.234-8.625-11.688h8.0938l4.8906 7.0938 4.9531-7.0938h8.0938l-8.625 11.641 9.0625 12.281h-8.0938l-5.3906-7.5625-5.3125 7.5625h-8.1094z"/> </symbol> <symbol id="i" overflow="visible"> <path d="m11.328-3.4531v12.547h-7.6562v-33.016h7.6562v3.5c1.0508-1.3945 2.2188-2.4219 3.5-3.0781 1.2812-0.66406 2.7539-1 4.4219-1 2.9453 0 5.3672 1.1719 7.2656 3.5156 1.8945 2.3438 2.8438 5.3594 2.8438 9.0469s-0.94922 6.7031-2.8438 9.0469c-1.8984 2.3438-4.3203 3.5156-7.2656 3.5156-1.668 0-3.1406-0.33594-4.4219-1s-2.4492-1.6914-3.5-3.0781zm5.0781-15.5c-1.6367 0-2.8906 0.60547-3.7656 1.8125-0.875 1.1992-1.3125 2.9336-1.3125 5.2031 0 2.2617 0.4375 3.9961 1.3125 5.2031 0.875 1.1992 2.1289 1.7969 3.7656 1.7969 1.6328 0 2.8828-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.86719-1.1953-2.1172-1.7969-3.75-1.7969z"/> </symbol> </defs> <g> <path d="m559.91 74.812h-419.83v274.57h419.82zm-8.75 265.91h-402.33v-257.16h402.32z"/> <path d="m137.9 368.55-37.797 116.64h499.89l-37.801-116.55h-424.3zm207.73 107.89h-69.477l14.352-30.273h55.039v30.273zm8.75 0v-30.273h55.039l14.352 30.273zm79.188 0-18.551-39.023h-130.02l-18.551 39.023h-154.26l32.199-99.051h411.43l32.199 99.051z"/> <path d="m322.09 99.926h55.824v8.75h-55.824z"/> <path d="m355.69 272.48 83.211-49.438-83.211-49.523v28.352h-77.176v42.176h77.176zm-68.336-37.102v-24.676h77.176v-21.789l57.398 34.125-57.398 34.125-0.003906-21.785z"/> </g> </svg>
          </div>
          <span  class="app-header2">Unlock node wallet</span>
          <div v-if="!loading && !unlockingWallet" style="margin-top:20px;">
              <span v-if="nodeAddress != ''" class="normal-txt"> Node wallet address: {{ nodeAddress }}</span>
              <div class="uk-margin">
                  <div class="uk-inline">
                      <span class="uk-form-icon" uk-icon="icon: lock"></span>
                      <input ref="inputPass1" v-model="password" style="width:400px; border-radius: 4px;" class="uk-input" type="password" placeholder="Password" aria-label="Input">
                  </div>
                  <button style="text-transform: none;" @click="togglePass" class="uk-button uk-button-default">{{ showPass ? 'Hide' : 'Show'  }}</button>
              </div>
              <span v-if="error != ''" class="uk-text-small uk-text-danger">{{ error }}</span>
          </div>

          <div v-if="loading" style="margin-top:35px;">
              <div class="uk-margin">
                <span class="uk-margin-small-right" uk-spinner="ratio: 3"></span>
              </div>
              <span class="uk-text-small">Initializing filefilego</span>
          </div>

          <div v-if="unlockingWallet" style="margin-top:35px;">
              <div class="uk-margin">
                <span class="uk-margin-small-right" uk-spinner="ratio: 3"></span>
              </div>
              <span class="uk-text-small">Unlocking wallet</span>
          </div>
          <div v-if="!loading && !unlockingWallet" style="margin-top:35px;">
              <button :disabled="nodeAddress==''" @click="unlock" class="uk-button ffg-button" style="width:250px; height:50px; ">
                Open Application
                <span class="uk-icon" uk-icon="icon: unlock"></span>
              </button>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  const { ipcRenderer } = window.require("electron");
  import WindowHeader from './WindowHeader.vue'
  import { callJsonRpc2Endpoint } from '../rpc'
  import { SetJwtAccessToken, SetNodeAddress, SetNodeType, SetDownloadsPath, SetStoragePath, SetStorageAccessToken, SetStorageFees, SetRpcEndpoint, SetChannelOperationFees, SetStorageProviders, SetDownloads, SetPublicStorage, SetRemoteUploadSettings} from '../store';


  export default {
    components: {
      WindowHeader,
    },
    data() {
      return {
        unlockingWallet : false,
        nodeAddress: "",
        showPass: false,
        checkInterval: null,
        loading: false,
        error: "",
        password: ""
      }
    },
    async mounted() {
      this.loading = true;
      let st = ipcRenderer.sendSync("get-settings", {});

      if(st.error != "") {
          this.error = st.error;
          this.loading = false;
          return
        }

      if(st.settings.password == null || st.settings.password == "") {
          this.error = "Wallet password is empty";
          this.loading = false;
          return;
      }

      this.password = st.settings.password;      


      try {
        const statsResult = await callJsonRpc2Endpoint("filefilego.HostInfo", []);
        this.nodeAddress = statsResult.data.result.address;
        SetNodeAddress(this.nodeAddress, statsResult.data.result.peer_id, statsResult.data.result.node_public_key);
        SetChannelOperationFees(statsResult.data.result.channel_creation_fees_ffg_hex, statsResult.data.result.remaining_channel_operation_fees_miliffg_hex);
        this.saveSettingsToStore(st.settings)
        this.loading = false;
      } catch (e) {

        this.run(st.settings.password);
        let numberOfTries = 0;
        this.checkInterval = setInterval(async() => {
          numberOfTries++
          if(numberOfTries == 80) {
            clearInterval(this.checkInterval);
            this.loading = false
            this.error = "Failed to initialize filefilego after 40 attemps. Please make sure no other instance of filefilego is running on this device."
            return;
          }

          try {
            const statsResult = await callJsonRpc2Endpoint("filefilego.HostInfo", []);
            this.nodeAddress = statsResult.data.result.address;
            SetNodeAddress(this.nodeAddress, statsResult.data.result.peer_id), statsResult.data.result.node_public_key;
            SetChannelOperationFees(statsResult.data.result.channel_creation_fees_ffg_hex, statsResult.data.result.remaining_channel_operation_fees_miliffg_hex);
            this.saveSettingsToStore(st.settings);
            this.loading = false;
            clearInterval(this.checkInterval);
          } catch (e) {
            console.log(e.message)
          }
        }, 1000);

      }
    },
    methods: {
      saveSettingsToStore(settings) {
        SetRpcEndpoint(settings.node_type);
        SetDownloadsPath(settings.downloadsFolder);
        SetStoragePath(settings.storageFolder);
        SetNodeType(settings.node_type);
        SetStorageAccessToken(settings.storageAccessToken);
        SetStorageFees(settings.storageFees);
        SetStorageProviders(settings.storage_providers);
        SetDownloads(settings.downloads);
        SetPublicStorage(settings.storagePublic);
        if(settings.remoteUploadEndpoint != undefined && settings.remoteUploadAccessToken != undefined) {
          SetRemoteUploadSettings(settings.remoteUploadEndpoint, settings.remoteUploadAccessToken);
        }
      },
      async unlock() {
        try {
          if(this.nodeAddress=='') {
            return;
          }

          if(this.unlockingWallet) {
            return;
          }
          this.unlockingWallet = true;
          const statsResult = await callJsonRpc2Endpoint("address.Unlock", [{ address: this.nodeAddress, passphrase: this.password }]);
          SetJwtAccessToken(statsResult.data.result.token);

          this.$router.replace("/home")
        } catch (e) {
          this.error = e.response.data.error + " or password is incorrect.";
        } finally {
          this.unlockingWallet = false;
        }
      },
      togglePass() {
        this.showPass = !this.showPass
        if(this.showPass) {
          this.$refs.inputPass1.type = "text"
        } else {
          this.$refs.inputPass1.type = "password"
        }
      },
      run(password) {
        ipcRenderer.send("run-ffg", { password: password });
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  