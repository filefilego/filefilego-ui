<template>
  <ProgressBar msg="Welcome to Your Vue.js App"/>
</template>

<script>
import ProgressBar from './components/ProgressBar.vue'

export default {
  name: 'App',
  components: {
    ProgressBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}
</style>
