<template>
<div>
  <div clas="uk-grid-match" uk-grid>
    <div
      class="uk-width-auto"
      style="background-color:#230061;"
    >
      <div style="max-width: 247px; width: 247px; height:100vh; background-color:#230061;">
        <div style="position:absolute; ">
          <div style="position:fixed; max-width: 247px; width: 247px; background-color:#230061;">
            <side-bar />
          </div>
        </div>
      </div>
    </div>
    <div style="padding:0; margin:0;" class="uk-width-expand">
      <dashboard-header />
      <div style="margin-top: 56px;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>
  
<script>
import DashboardHeader from './DashboardHeader.vue'
import SideBar from './SideBar.vue'
export default {
  components: {
    DashboardHeader,
    SideBar,
  },
  data() {
    return {
    }
  },
  async mounted() {

  },
  methods: {
  }
}
</script>

<style scoped>
</style>
