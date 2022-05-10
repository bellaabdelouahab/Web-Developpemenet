<template>
  <v-app class="grey lighten-4">
    
    <Navbar v-if="show"/>
    <AuthR />
    <v-content class="mb-4" v-if="show">
      <router-view></router-view>
    </v-content>

    <v-content class="ma-0" v-if="!show">
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import Navbar from '@/components/NavBar'
import AuthR from '@/views/AuthR'
 

export default {
  name: 'App',
  components: { Navbar,AuthR },

  data () {
    return {
      //
    }
  },
  computed: {
    show () {
      return true; 
    }
  }
}
</script>
