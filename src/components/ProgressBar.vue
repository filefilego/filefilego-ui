<template>
  <div>
    Hello world
    <input type="button" @click="run"  value="Run" />
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  name: 'ProgressBar',
  props: {
    msg: String
  },
  methods: {
    run() {
      ipcRenderer.send("run-ffg");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
