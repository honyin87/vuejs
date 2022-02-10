export default {
    // called by Vue.use(FirstPlugin)
    install(Vue, options) {
        
        console.log(Vue);
        console.log(options);
        console.log(process.env.VUE_APP_API_URL);
    },
};