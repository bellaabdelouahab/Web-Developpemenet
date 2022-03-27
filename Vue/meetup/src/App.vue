<template>
  <h1>Milionir</h1>
  <userinput :tags="tagse"></userinput>
</template>

<script>
import userinput from './components/userinput.vue'

export default {
  name: 'App',
  components: {
    userinput 
    
  },
  data: ()=>({
    tagse:true,
  })
}
</script>

<style> 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
