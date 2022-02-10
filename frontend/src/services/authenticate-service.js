
import api from '../services/api-service'
class AuthenticateService {

    vue = null;

    init(vue){
      this.vue = vue;
      api.init(vue);
    }


    // Authenticate User - get access token and refresh token from auth server
   auth(input) {
    
      let url = 'authentication'
      let response = api.post(url,input)
      .then((response)=>{
        console.log(response);

        // Check Status - 200
        if(response.status == '200'){
          console.log(response.data);

          this.vue.$store.commit('setAccessToken',response.data.access_token);

          // Create Success Message
          let msg = {
            'msg' : "Welcome, "+ response.data.payload.username,
          };

          this.vue.$store.commit('setMessage',msg);

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

    logout(){
      this.vue.$store.commit('setAccessToken',null);

      // Create Success Message
      let msg = {
        'msg' : "You've been logged out.",
      };

      this.vue.$store.commit('setMessage',msg);
      this.vue.$router.push('/login');
    }
  
  }

  export default new AuthenticateService()