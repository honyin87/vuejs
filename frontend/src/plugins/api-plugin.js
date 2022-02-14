import api from '@/services/api-service'
export default {
    // called by Vue.use(FirstPlugin)
    install(app) {
        api.init(app);
        app.config.globalProperties.$api = api;
    },
};