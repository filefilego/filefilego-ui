<template>
<div style="-webkit-app-region:drag; left:0px; top:0px; width: 100%; height:50px; position:absolute;">
    <div style="-webkit-app-region:none; z-index: 99999999; position: fixed; right: 4px; top: 2px; margin-right: 8px; margin-top: 0px; ">
        <div style="margin-left: 5px; margin-right: 5px;">
            <span
            class="clickable"
            @click="minimizeApp()"
            style="color:#fff; font-size:1.9em; margin-right:25px;"
            >-</span
            >
            <span
            class="clickable"
            @click="maximizeApp()"
            style="color:#fff; font-size:1.6em; margin-right:25px;"
            >□</span
            >
            <span
            class="clickable"
            @click="closeApp()"
            style="color:#fff; font-size:1.6em;"
            >×</span
            >
        </div>
    </div>
</div>
</template>
  
  <script>
  const { ipcRenderer } = window.require("electron");
  export default {
    methods: {
      closeApp() {
        ipcRenderer.send("close-me");
      },
      maximizeApp() {
        ipcRenderer.send("maximize");
      },
      minimizeApp() {
        ipcRenderer.send("minimize");
      },
    }
  }
  </script>
  
  <style scoped>
  </style>
  