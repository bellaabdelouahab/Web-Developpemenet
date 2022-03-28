import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import log_in from "@/components/User/LogIn.vue"
import sign_up from '@/components/User/SignUp.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: log_in
  },
  {
    path: '/signup',
    name: 'signup',
    component: sign_up
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
