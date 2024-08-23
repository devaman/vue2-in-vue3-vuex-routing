import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex'
import router from './router';
// Create a new store instance.
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
const app = createApp(App);
app.use(router)
app.use(store)
app.mount('#app');
export {store}