import auth from '@/services/authenticate-service'
export default {
    // called by Vue.use(FirstPlugin)
    install(app) {
        auth.init(app);
        app.config.globalProperties.$auth = auth;
    },
};