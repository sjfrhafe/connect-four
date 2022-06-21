import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/getstarted', 
    name: 'GetStarted', 
    component: () => import('../views/GetStarted.vue')
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: () => import('../views/Impressum.vue')
  }, 
  {
    path: '/play', 
    name: 'Play', 
    component: () => import('../views/Play.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
