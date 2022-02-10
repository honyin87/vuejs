import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/services/api-service'
import api_plugin from '@/plugins/api-plugin'
import AppLayout from './layouts/AppLayout'
// import "@/plugins/mixins";

const app =  createApp(App)

// Define Global Functions
app.config.globalProperties.$api = api

app.use(store)
app.use(api_plugin)
app.component('AppLayout', AppLayout)
app.use(router).mount('#app')


