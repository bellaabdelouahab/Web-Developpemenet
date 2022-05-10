<template>
  <v-app>
    
    <v-toolbar elevation="6">
      <v-app-bar-nav-icon
        color="pink"
        dark
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      >
      </v-app-bar-nav-icon>

      <v-title >
        Bella
      </v-title>
      <v-spacer></v-spacer>
      <v-btn class="hidden-xs" flat v-for="item in items" :key="item.title" rout :to="item.link"><v-icon left>{{ item.icon }}</v-icon>{{ item.title }}</v-btn>
    </v-toolbar>
      <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      

      <v-list class="pt-0" dense>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-btn flat width="100%" rout :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>{{ item.title }}
          </v-btn>
          <br>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>
      <!-- <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"> -->
        <router-view></router-view>
      <!-- </v-parallax> -->
    </main>
    <v-bottom-navigation height="25">
      <v-btn value="recent">
        <span>no reserved rights</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
  
</template>
<script>

export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard',link:"/" },
          { title: 'Sign-in', icon: 'mdi-login',link:"/login" },
          { title: 'Sign-up', icon: 'mdi-content-save-move',link:"/signup" },
          
          { title: 'About', icon: 'mdi-information' ,link:"/about" }
        ]
    }
  },
}
</script>

<style lang="scss">

</style>
