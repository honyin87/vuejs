import axios from 'axios';

class APIService {

    api_url = 'default';
    vue = null;

    constructor(){
      this.api_url = process.env.VUE_APP_API_URL;
    }

    init(vue){
      this.vue = vue;
    }

    setURL(url){
      this.api_url = url;
    }

    async post(path,input,config = {}) {
      // Use vue-resource or any other http library to send your request
      console.log('sending request... '+ this.api_url);
      
      console.log(input);
      
      let headers = this.getHeaders();
      
      config = {
        headers : headers
      };
      const response = await axios.post(this.api_url+path, input,config)
      .catch ( (error)=>{
        return error.response;
       })
      return response;
    }

    getHeaders(){
      let headers = {};
      console.log(this.vue.$store);
      if(typeof(this.vue.$store.getters.getAccessToken) !== 'undefined'
        && this.vue.$store.getters.getAccessToken !== null
      ){
        console.log(this.vue.$store.getters.getAccessToken);

        headers['Authorization'] = "Bearer "+this.vue.$store.getters.getAccessToken;
      }


      return headers;
    }
  
  }

  export default new APIService()