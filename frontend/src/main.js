import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api_plugin from '@/plugins/api-plugin'
import auth_plugin from '@/plugins/authentication-plugin'
import AppLayout from './layouts/AppLayout'

const app =  createApp(App)


app.use(store)
app.component('AppLayout', AppLayout)

app.use(api_plugin)
app.use(auth_plugin)
app.use(router,app).mount('#app')





