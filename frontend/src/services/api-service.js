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
      // console.log(final_config);
      const response = await axios.post(this.api_url+path, input,final_config)
      .catch (async (error)=>{
        // console.log(error);
        if(error.response.status == '401'){
          this.store.commit('setAccessToken',error.response.data.access_token);

          error.config.headers['Authorization'] = this.getHeaders(true);
          
          let retry =  await axios.request(error.config);
          return retry;
        }else if(error.response.status == '403'){
          // Create Message
          let msg = {
            'msg' : "You've been logged out.",
            'type':'danger',
          };

          this.store.commit('setMessage',msg);
          this.vue.config.globalProperties.$router.push('/logout');
        }
        return error.response;
       })
      return response;
    }

    async get(path,config = {}){
      let headers = this.getHeaders();
      
      let temp_config = {
        headers : headers
      };

      let final_config = Object.assign(config, temp_config);
      // console.log(final_config);
      const response = await axios.get(this.api_url+path,final_config)
      .catch (async (error)=>{
        // console.log(error);

        if(error.response.status == '401'){
          this.store.commit('setAccessToken',error.response.data.access_token);

          error.config.headers['Authorization'] = this.getHeaders(true);
          // console.log(error.config.headers['Authorization']);
          
          let retry =  await axios.request(error.config);
          return retry;
        }else if(error.response.status == '403'){
          // Create Message
          let msg = {
            'msg' : "You've been logged out.",
            'type':'danger',
          };

          this.store.commit('setMessage',msg);
          this.vue.config.globalProperties.$router.push('/logout');
        }
        return error.response;
       })
      return response;
    }

    getHeaders(val = false){
      let headers = {};
      // console.log(this.store);
      if(typeof(this.store.getters.getAccessToken) !== 'undefined'
        && this.store.getters.getAccessToken !== null
      ){
        console.log(this.store.getters.getAccessToken);

        headers['Authorization'] = "Bearer "+this.store.getters.getAccessToken;
      }

      if(!val){
        return headers;
      }
        return headers['Authorization'];
    }
  
  }

  export default new APIService()