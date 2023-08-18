<template>
    <div class="dashboard-header" style="-webkit-app-region:drag;">  
      <span
        v-if="hasPreviousPage()"
        @click="goBack"
        uk-icon="icon: arrow-left"
        class="clickable"
        style="-webkit-app-region:none; color:#000; z-index: 99999999; display:inline-block; margin-top:10px; margin-left:10px; cursor: pointer; border: 1px solid; border-radius: 50%; padding: 5px; vertical-align: middle; font-size: 1.3em;"
        title=""
        aria-expanded="false"
      >
      </span>
      <div
        style="-webkit-app-region:none; z-index: 99999999; position: fixed; right: 4px; top: 2px; margin-right: 8px; margin-top: 0px; "
      >
        <div style="margin-left: 5px; margin-right: 5px;">
          <span
            class="clickable"
            @click="minimizeApp()"
            style="color:#000; font-size:1.6em; margin-right:25px;"
            >-</span
          >
          <span
            class="clickable"
            @click="maximizeApp()"
            style="color:#000; font-size:1.6em; margin-right:25px;"
            >□</span
          >
          <span
            class="clickable"
            @click="closeApp()"
            style="color:#000; font-size:1.6em;"
            >×</span
          >
        </div>
      </div>
    </div>
  </template>
  
  <script>
  const { ipcRenderer } = window.require("electron");
  import { globalState, SetEntryCreationMode } from '../store';
  import { ref } from 'vue';

  export default {
    data() {
      return {};
    },
    computed: {
      entryMode() {
          const mode = ref(globalState.entryCreationMode);
          return mode.value
      }
    },
    watch: {
    },
    methods: {
      hasPreviousPage() {
        return window.history.state.back !== null
      },
      goBack() {  
        if(this.entryMode) {
          SetEntryCreationMode(false);
        } else {
          this.$router.go(-1);
        }
      },
      closeApp() {
        ipcRenderer.send("close-me");
      },
      maximizeApp() {
        ipcRenderer.send("maximize");
      },
      minimizeApp() {
        ipcRenderer.send("minimize");
      },
    },
  };
  </script>
  
  <style>
  .dashboard-header {
    border-bottom: 1px solid #f0f0f0;
    height: 56px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
    background-color: #fff;
  }
  </style>
  