<template>
    <v-content>
      <v-card max-width="500" class="mx-auto mt-9" elevation="10">
        <v-card-title style="margin-left:2.7vw">Log-In</v-card-title>
        <v-card-text>
          <v-text-field label="Username" prepend-icon="mdi-account-circle"/>
          <v-text-field 
          label="Password" 
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"/>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions style="float:right">
          <!-- <v-btn color="success">Register</v-btn> -->
          <v-btn color="info" >Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
</template>

<script>
export default {
  data()
  {
    return{
      showPassword:false
    }
  }
}
</script>