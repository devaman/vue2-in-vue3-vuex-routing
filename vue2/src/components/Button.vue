<template>
  <div>
    <button @click="click">vue2 button click</button>
<div @click="navigate">Click</div>amit {{ countvue2 }}
<!-- <RouterLink to="/about">Go to About</RouterLink> -->

  </div>
</template>

<script>
export default {
  computed: {
    countvue2() {
      return this.$store?.state?.count
    }
  },
  methods: {
    navigate() {
      this.$router.push('/about');
    },
    click() {
     this.$store.commit('increment')
    },
  },
};
</script>
