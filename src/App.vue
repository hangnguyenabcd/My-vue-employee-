<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon @click="adb=!adb" v-if="isLogin"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Employees Mananer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isLogin"
        flat
        @click="logout"
      >
        <span class="mr-2">Log out</span>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="adb" app temporary>
      <Navigation/>
    </v-navigation-drawer>
    <v-content>
      <div v-if="isLogin">
        <center><h3>Wellcome {{name}}</h3></center>
      <router-view/>
      </div>
    
    <div v-if="!isLogin">
        <Login @login-success="loginsuccess" @login-name="loginname"/>
    </div>
    </v-content>
  
  </v-app>
</template>

<script>
import Navigation from './components/Navigation'
import Login from './views/Login'
export default {
  name: 'App',
  components: {
    Navigation, Login
  },
  created(){
    if(this.isLogin == false){
      this.$router.replace({name: 'home'})
    }
  },
  
  data () {
    return {
      adb: false,
      isLogin: false,
      name: ''
    }
  },
methods:{
  loginsuccess(e){
    this.isLogin=e
  },
  logout(){
    this.isLogin=!this.isLogin
    this.$router.replace({name: 'home'})
    this.name = ''
  },
  loginname(name){
    this.name= name;
  }
}
}
</script>
