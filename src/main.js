import { createApp } from 'vue'
import App from './App.vue'
import { filesize } from "filesize";
import { createRouter, createWebHashHistory } from 'vue-router'
import StartScreen from './components/StartScreen.vue'
import CreateNodeIdentity from './components/CreateNodeIdentity.vue'
import ChooseNodeType from './components/ChooseNodeType.vue'
import ConfigureNode from './components/ConfigureNode.vue'
import UnlockKey from './components/UnlockKey.vue'
import HomePage from './components/HomePage.vue'
import HomeIntro from './components/HomeIntro.vue'
import WalletPage from './components/WalletPage.vue'
import ChannelsPage from './components/ChannelsPage.vue'
import SearchPage from './components/SearchPage.vue'
import ChannelNode from './components/ChannelNode.vue'
import StoragePage from './components/StoragePage.vue'
import StorageFiles from './components/StorageFiles.vue'
import SecureDrive from './components/SecureDrive.vue'
import DownloadPage from './components/DownloadPage.vue'

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
        path: '/home',
        name: "HomePage",
        component: HomePage,
        children: [
            {
                path: "",
                name: "HomeIntro",
                component: HomeIntro,
            },
            {
                path: 'wallet',
                name: "WalletPage",
                component: WalletPage,
            },
            {
                path: 'channels',
                name: "ChannelsPage",
                component: ChannelsPage,
            },
            {
                path: 'search',
                name: "SearchPage",
                component: SearchPage
            },
            {
                path: 'node/:hash',
                name: "ChannelNode",
                component: ChannelNode
            },
            {
                path: 'storage',
                name: "StoragePage",
                component: StoragePage
            },
            {
                path: 'files',
                name: "StorageFiles",
                component: StorageFiles
            },
            {
                path: 'drive',
                name: "SecureDrive",
                component: SecureDrive
            },
            {
                path: 'downloads',
                name: "DownloadPage",
                component: DownloadPage
            }
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
        return val.charAt(0).toUpperCase();
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