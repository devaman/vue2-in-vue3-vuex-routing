<template>
  <div>
    <h3>Vue2 App</h3>
    <Content :count="count" />
    <Button @btnClick="inc" />
  </div>
</template>

<script>
import Content from './components/Content';
import Button from './components/Button';

export default {
  components: {
    Content,
    Button,
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    inc() {
      this.$store.commit('increment');
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
