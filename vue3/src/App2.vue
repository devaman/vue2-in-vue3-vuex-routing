<template>
  <div>
    <h3>Vue3 App2</h3>
    <Content :count="count" />

    <!-- <div id="vue2Button"></div> -->
    <vue2-button @btnClick="increment" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Content from './components/Content';
import MyWrappedVue2Component from './components/MyVue2Comp';

import Button from 'vue2App/Button';
import { computed } from 'vue'

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
