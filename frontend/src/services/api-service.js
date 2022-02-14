import axios from 'axios';

class APIService {

    api_url = 'default';
    vue = null;
    store = null;

    constructor(){
      this.api_url = process.env.VUE_APP_API_URL;
    }

    init(vue){
      this.vue = vue;
      this.store = this.vue.config.globalProperties.$store;
    }

    setURL(url){
      this.api_url = url;
    }

    async post(path,input,config = {}) {
      // Use vue-resource or any other http library to send your request
      console.log('sending request... '+ this.api_url);
      
      console.log(input);
      
      let headers = this.getHeaders();
      
      let temp_config = {
        headers : headers
      };

      let final_config = Object.assign(config, temp_config);
      console.log(final_config);
      const response = await axios.post(this.api_url+path, input,final_config)
      .catch ( (error)=>{
        return error.response;
       })
      return response;
    }

    getHeaders(){
      let headers = {};
      console.log(this.store);
      if(typeof(this.store.getters.getAccessToken) !== 'undefined'
        && this.store.getters.getAccessToken !== null
      ){
        console.log(this.store.getters.getAccessToken);

        headers['Authorization'] = "Bearer "+this.store.getters.getAccessToken;
      }


      return headers;
    }
  
  }

  export default new APIService()