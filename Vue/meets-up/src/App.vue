<template>
  <MyTemp></MyTemp>
</template>

<script>
import MyTemp from "./components/MyTemp.vue";

export default {
  name: 'App',
  components: {
    MyTemp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #80b8f0;
  margin-top: 60px;
}
</style>
