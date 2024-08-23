import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './App1.vue'
import AboutView from './App2.vue'

const routes = [
  { path: '/', component: HomeView, children:[{ path: '/about', component: AboutView }] },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router