<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Content from './components/Content';
import { vue2ToVue3,wrapVue2ComponentForVue3 } from './utils';
import Button from 'vue2App/Button';
import { computed } from 'vue'
import { RouterLink } from 'vue-router';

export default {
  components: {
    Content
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
