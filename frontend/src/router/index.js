import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: "/home",
  },
  {
    path: '/home',
    name: 'Home',
    meta:{
      // needLogin : false,
      layout : 'AppLayoutDefault'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta:{
      // needLogin : false,
      layout : 'AppLayoutDefault'
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta:{
      needLogin : false,
      layout : 'BlankLayout'
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    meta:{
      needLogin : false,
      layout : 'BlankLayout'
    },
    // route level code-splitting
    component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default {
  install(app) {
    router.install(app);
    
    router.beforeEach(async (to, from, next) => {
      
      // debugger
      if(to.meta && to.meta.needLogin == false){
        next()
      }else{
        // console.log(store);
        console.log("Check token..");
        if(typeof(store.getters.getAccessToken) !== 'undefined'
            && store.getters.getAccessToken !== null
          ){
            console.log(store.getters.getAccessToken);

            next()
          }else{
            // Get Access Token by calling API
            let auth = app.config.globalProperties.$auth;
            console.log(auth);
            
            // Check user login status
            let response = await auth.isAuth();
            if(response == true){
              //console.log("here.."+response);
              next()
            }else{
              //console.log("no.."+response);
              next({ name: 'Login' })
            }
            
          }
        
        
      }
      
    

    })
  }
};
//export default router
