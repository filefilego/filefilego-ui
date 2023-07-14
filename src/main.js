import { createApp } from 'vue'
import App from './App.vue'
import { filesize } from "filesize";
import { createRouter, createWebHashHistory } from 'vue-router'
import StartScreen from './components/StartScreen.vue'
import CreateNodeIdentity from './components/CreateNodeIdentity.vue'
import ChooseNodeType from './components/ChooseNodeType.vue'
import ConfigureNode from './components/ConfigureNode.vue'
import UnlockKey from './components/UnlockKey.vue'

import HomeView from './components/home/HomeView.vue'
import HomeIntro from './components/home/HomeIntro.vue'
import WalletView from './components/wallet/WalletView.vue'
import WalletPage from './components/wallet/WalletPage.vue'
import ChannelsView from './components/channels/ChannelsView.vue'
import ChannelsPage from './components/channels/ChannelsPage.vue'
import ChannelNode from './components/channels/ChannelNode.vue'
import SearchPage from './components/channels/SearchPage.vue'

import StorageView from './components/storage/StorageView.vue'
import StoragePage from './components/storage/StoragePage.vue'
import StorageFiles from './components/storage/StorageFiles.vue'

import DownloadsView from './components/downloads/DownloadsView.vue'
import DownloadsPage from './components/downloads/DownloadsPage.vue'

import SecureView from './components/secure/SecureView.vue'
import SecurePage from './components/secure/SecurePage.vue'

import SettingsView from './components/settings/SettingsView.vue'
import SettingsPage from './components/settings/SettingsPage.vue'

const routes = [
    {
        path: '/',
        name: "StartScreen",
        component: StartScreen
    },
    {
        path: '/create_node_identity',
        name: "CreateNodeIdentity",
        component: CreateNodeIdentity
    },
    {
        path: '/choose_node_type',
        name: "ChooseNodeType",
        component: ChooseNodeType
    },
    {
        path: '/configure_node',
        name: "ConfigureNode",
        component: ConfigureNode
    },
    {
        path: '/unlock',
        name: "UnlockKey",
        component: UnlockKey
    },
    {
        path: '/secure',
        name: "SecureView",
        component: SecureView,
        children: [
            {
                path: "",
                name: "SecurePage",
                component: SecurePage,
            },
        ]
    },
    {
        path: '/downloads',
        name: "DownloadsView",
        component: DownloadsView,
        children: [
            {
                path: "",
                name: "DownloadsPage",
                component: DownloadsPage,
            },
        ]
    },
    {
        path: '/storage',
        name: "StorageView",
        component: StorageView,
        children: [
            {
                path: "",
                name: "StoragePage",
                component: StoragePage,
            },
            {
                path: "files",
                name: "StorageFiles",
                component: StorageFiles,
            },
        ]
    },
    {
        path: '/channels',
        name: "ChannelsView",
        component: ChannelsView,
        children: [
            {
                path: "",
                name: "ChannelsPage",
                component: ChannelsPage,
            },
            {
                path: "node/:hash",
                name: "ChannelNode",
                component: ChannelNode,
            },
            {
                path: "search",
                name: "SearchPage",
                component: SearchPage
            }
        ]
    },
    {
        path: '/wallet',
        name: "WalletView",
        component: WalletView,
        children: [
            {
                path: "",
                name: "WalletPage",
                component: WalletPage,
            },
        ]
    },
    {
        path: '/settings',
        name: "SettingsView",
        component: SettingsView,
        children: [
            {
                path: "",
                name: "SettingsPage",
                component: SettingsPage,
            },
        ]
    },
    {
        path: '/home',
        name: "HomeView",
        component: HomeView,
        children: [
            {
                path: "",
                name: "HomeIntro",
                component: HomeIntro,
            },
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})


const app = createApp(App)
app.config.globalProperties.$filters = {
    firstletter(val) {
        const trimmedString = val.trim();
        const regex = /^[A-Za-z]/; // Regular expression to match the first alphabetical character
        
        const match = trimmedString.match(regex);
        
        if (match) {
          const firstLetter = match[0];
          return firstLetter.toUpperCase();
        }
      
        // If no match found using the previous regular expression,
        // fallback to extracting the first letter using a workaround
        const letterMatch = trimmedString.match(/\p{L}/u);
        
        if (letterMatch) {
          const firstLetter = letterMatch[0];
          return firstLetter.toUpperCase();
        }
        
        return "*";
    },
    timestamptodate(val) {
        return new Date(val * 1000).toLocaleString();
    },
    formaldatetime(val) {
        return new Date(val).toLocaleString();
    },
    formatsize(val) {
        if (!val) return "0";
        return filesize(val);
    }
}
app.use(router)
app.mount('#app')