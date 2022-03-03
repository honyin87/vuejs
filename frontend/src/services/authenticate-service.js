

class AuthenticateService {

    vue = null;
    api = null;
    store = null;


    init(vue){
      this.vue = vue;
      this.api = this.vue.config.globalProperties.$api;
      this.store = this.vue.config.globalProperties.$store;
 
    }


    // Authenticate User - get access token and refresh token from auth server
   auth(input) {
    
      let url = 'authentication';
      
      let response = this.api.post(url,input,{withCredentials: true,crossDomain: true})
      .then((response)=>{
        console.log(response);

        // Check Status - 200
        if(response.status == '200'){
          console.log(response.data);

          this.store.commit('setAccessToken',response.data.access_token);

          // Create Success Message
          let msg = {
            'msg' : "Welcome, "+ response.data.payload.username,
          };

          this.store.commit('setMessage',msg);

          return true;
        }else{
          return response.status;
        }
      })
      .catch ( (error)=>{
        return error.response;
       })
      return response;
    }

    // To verify user login status
    async isAuth(){

      let access_token = this.store.getters.getAccessToken;

      if(!access_token){
        // console.log("test..");
        let url = 'authentication/verify_auth';

        let input = {
          access_token : access_token,
        };
      
        let response = await this.api.post(url,input,{withCredentials: true,crossDomain: true,})
        .then((response)=>{
          console.log(response);

          // Check Status - 200
          if(response.status == '200'){
            console.log(response.data);

            this.store.commit('setAccessToken',response.data.access_token);

            // // Create Success Message
            // let msg = {
            //   'msg' : "Welcome, "+ response.data.payload.username,
            // };

            // this.store.commit('setMessage',msg);

            return Promise.resolve(true);
          }else{
            return Promise.resolve(response.status);
          }
        })
        .catch ( (error)=>{
          return Promise.resolve(error.response);
        })
        return response;
      }
      

      return false;
    }

    logout(){
      this.store.commit('setAccessToken',null);

      // Create Success Message
      let msg = {
        'msg' : "You've been logged out.",
      };

      this.store.commit('setMessage',msg);
      
    }
  
  }

  export default new AuthenticateService()