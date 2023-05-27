<template>
    <div style="margin: 0px 10px; border: 1px solid rgb(234, 234, 234); background-color: rgb(255, 255, 255);">
        <div style="padding-left: 15px; padding-top: 15px; padding-right: 15px;">
        <h4
          style="color: rgb(13, 13, 13); border-bottom: 1px solid #ddd; padding-bottom: 11px; font-weight: 700;">
          Settings
        </h4>
    
        <div class="uk-text-left" style="padding-bottom:10px;">
         
          <div style="border:1px solid #d7d7d7; border-radius: 2px;">
                <div style="padding:10px;">
                 <b> Node address: </b> {{globalState.nodeAddress}} <br />
                 <b> Node type:</b> {{globalState.node_type}} <br />
                 <b> Downloads Directory:</b> {{globalState.downloadsPath}} <br />
                </div>
            </div>
        </div>
    </div>
    </div>
    </template>
    
    <script>
    import { globalState } from '../../store';
    export default {
        components: {
        },
        data() {
        return {

        }
        },
        unmounted() {
      
        },
        async mounted() {
        },
        computed: {
          globalState() {
            return globalState
          }  
        },
        methods: {
        }
    }
    </script>
    
    <style scoped>
    </style>
        