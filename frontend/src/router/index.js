import { createRouter, createWebHistory } from 'vue-router'
// import api from '../services/api-service'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{
      // needLogin : false,
      layout : 'AppLayoutDefault'
    },
    component: () => import('../views/Home.vue'),
    
    beforeRouteEnter (to, from, next){
      debugger
      next({ name: 'About' });
    }
  },
  {
    path: '/about',
    name: 'About',
    meta:{
      needLogin : false,
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

router.beforeEach((to, from, next) => {
  // debugger
  if(to.meta && to.meta.needLogin == false){
    next()
  }else{
    console.log(to);
    
    // api.sendRequest();
    
    next({ name: 'Login' })
  }
  
 

})

export default router
