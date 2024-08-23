<template>
  <div>
    <h3>Vue3 App</h3>
    <Content :count="count" />

    <!-- <div id="vue2Button"></div> -->
    <vue2-button @btnClick="increment" />
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Content from './components/Content';
// import { vue2ToVue3,wrapVue2ComponentForVue3 } from './utils';
import MyWrappedVue2Component from './components/MyVue2Comp';
import Button from 'vue2App/Button';
import { computed } from 'vue'
import { RouterLink } from 'vue-router';

export default {
  components: {
    Content,
    vue2Button: MyWrappedVue2Component,
  },
  setup() {
    const store = useStore()

    return {
      // access a state in computed function
      count: computed(() => store.state.count),
      increment: () => store.commit('increment'),

      // access a getter in computed function
    }
  },
};
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
