import Vue from 'vue';
import App from './App.vue';
import Content from './components/Content.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
Vue.use(Vuex)
Vue.use(VueRouter)
const routes = [
  { path: '/content', component: Content },
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
const app = new Vue({
  store,
  router,
  ...App
})
console.log(app)
app.$mount('#app');
