<template>
  <div style="width: 247px; max-width: 247px; z-index: 99999999; background-color:#230061; height:100vh;"
    class="main-side-container uk-text-center">
    <h4 style="margin-top:25px; padding-top: 14px; color: #fff;" class="header-display-1">
      <div
        style="background-color:#fff; border-radius:50%; border:1px solid #3e15ca; width:50px; height:50px; text-align:center; margin:0 auto;">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="28px" width="28px"
          fill="#3e15ca" version="1.1" x="0px" y="0px" viewBox="0 0 28 26" xml:space="preserve"
          style="margin-top: 14px; fill: #3e15ca;enable-background:new 0 0 28 26;">
          <g>
            <polygon points="10,7 5,0 0,7 5,7 5,14 12.995,17.998 28,3 15,3  "></polygon>
            <polygon points="18,14.406 13.541,18.865 18,26  "></polygon>
          </g>
        </svg>
      </div>
      <span style="margin-top: 9px; display: inline-block;">
        filefilego
      </span>
    </h4>
    <ul class="uk-nav-default uk-nav uk-nav-parent-icon uk-nav" uk-nav>
      <router-link to="/home">
        <li class="uk-text-center main-sidebar-item" style="font-size: 1em; padding-left: 12px; padding: 12px;">
          <span uk-icon="icon: home"></span>
          <div>Home</div>
        </li>
      </router-link>
      <router-link to="/wallet">
        <li class="uk-text-center main-sidebar-item" style="font-size: 1em; padding-left: 12px; padding: 12px;">
          <span uk-icon="icon: credit-card"></span>
          <div>Wallet</div>
        </li>
      </router-link>
      <router-link to="/channels">
        <li class="uk-text-center main-sidebar-item" style="font-size: 1em; padding-left: 12px; padding: 12px;">
          <span uk-icon="icon: thumbnails"></span>
          <div>Channels</div>
        </li>
      </router-link>

      <router-link to="/storage">
        <li class="uk-text-center main-sidebar-item" style="font-size: 1em; padding-left: 12px; padding: 12px;">
          <span uk-icon="icon: server"></span>
          <div>Storage</div>
        </li>
      </router-link>

      <router-link to="/secure">
        <li class="uk-text-center main-sidebar-item" style="font-size: 1em; padding-left: 12px; padding: 12px;">
          <span uk-icon="icon: lock"></span>
          <div>Secure Drive </div>
        </li>
      </router-link>

      <router-link to="/downloads">
        <li class="uk-text-center main-sidebar-item" style="font-size: 1em; padding-left: 12px; padding: 12px;">
          <span uk-icon="icon: download"></span>
          <div>Downloads</div>
        </li>
      </router-link>

      <router-link to="/settings">
        <li class="uk-text-center main-sidebar-item" style="font-size: 1em; padding-left: 12px; padding: 12px;">
          <span uk-icon="icon: cog"></span>
          <div>Settings</div>
        </li>
      </router-link>
    </ul>

    <div v-if="globalState.node_type =='storage'"
      style="width:247px; max-width:247px; position: fixed; bottom: 20px; text-align: center; color: #fff; font-weight: bold;">
      <CircleProgressBar style="margin: 0 auto; width:80px; height:80px; color: #fff; font-weight: bold;" percentage
        :value="blockchain_height" :max="heighest_block_number_discovered">
        <!-- <span style="color: #fff; font-weight: bold;"> {{ value }} / {{ max }} </span> -->
      </CircleProgressBar>
      <div v-if="syncing || blockchain_height == 0" style="margin-top:5px;">
        Syncing blockchain
        <br />
        {{ blockchain_height }}
      </div>
      <div v-else style="margin-top:5px;">
        <span uk-icon="icon: check; ratio:0.9"></span>
        Synced
      </div>
    </div>
  </div>
</template>
  
<script>
import { globalState } from '../store';
import { CircleProgressBar } from 'vue3-m-circle-progress-bar';
export default {
  components: {
    CircleProgressBar
  },
  data() {
    return {
    }
  },
  computed: {
    globalState(){
      return globalState
    },
    blockchain_height() {
      return globalState.blockchain_height;
    },
    heighest_block_number_discovered() {
      return globalState.heighest_block_number_discovered;
    },
    syncing() {
      return globalState.syncing;
    }
  },
    methods: {}
};
</script>
  
<style>
.main-side-container a {
  color: #fff;
}

a.router-link-active .main-sidebar-item {
  background-color: #1d007e;
}

.main-side-container a:hover .main-sidebar-item {
  background-color: #2e05b3;
}
</style>
  