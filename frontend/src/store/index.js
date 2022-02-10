import { createStore } from 'vuex'

const store = createStore({
    state: {
      user: null,
      access_token: null,
      refresh_token: null,
      message: null,
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
      setAccessToken(state, token) {
        state.access_token = token;
      },
      setRefreshToken(state, token) {
        state.refresh_token = token;
      },
      setMessage(state, message) {
        state.message = message;
      },
    },
    actions: {},
    getters: {
        getUser:(state) =>{
            return state.user
        },
        getAccessToken:(state) =>{
            return state.access_token
        },
        getRefreshToken:(state) =>{
            return state.refresh_token
        },
        getMessage:(state) =>{
          return state.message
        }
    },
  });

  export default store;