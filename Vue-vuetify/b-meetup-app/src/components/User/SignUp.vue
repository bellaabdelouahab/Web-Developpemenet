<template>
    <v-content>
      <v-card max-width="500" class="mx-auto mt-5" elevation="10">
        <v-card-title style="margin-left:2.7vw">Sign-up</v-card-title>
        <v-card-text>
          <v-text-field label="Username" prepend-icon="mdi-account-circle"/>
          <v-text-field label="Email" prepend-icon="mdi-email"/>
          <v-text-field label="Password" style="paddin:0" prepend-icon="mdi-lock"></v-text-field>
            <v-checkbox label="Agree to terms and conditions" @click="dialog=true" value="value"></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions style="float:right">
          <!-- <v-btn color="success">Register</v-btn> -->
          <v-btn color="info" >SignUp</v-btn>
        </v-card-actions>
      </v-card>
        
        <div class="text-xs-center" absolute>
        <v-dialog v-model="dialog">
        <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Well, this is a privacy policy.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    </v-content>
</template>




<script>
export default {
  data()
  {
    return{
      showPassword:false,
      dialog: false
      }
    }
  }
</script>