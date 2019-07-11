<template>
  <div class="login">
    <form>
      <h1>{{msg}}</h1>
          <input placeholder="Username" type="text" name="username" v-model="user.username">
          <input placeholder="Password" type="password" name="password" v-model="user.password">
        <center><v-btn class="btn" @click="clicked" type="submit">Login</v-btn></center>
    <center><p>{{msgErrorText}}</p></center>
    </form>
  </div>
</template>
<script>
import UsersRepository from './../service/UsersRepository'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login',
      user: {
        username:'',
        password:''
      },
      msgErrorText: ''
    }
  },
 
  methods: {
    clicked: function () {
        UsersRepository.Login(this.user).then(res=>{
        if(res) {
        this.$emit("login-success",true)
         this.$emit("login-name",this.user.username)
        this.$router.replace({ name: 'home' })
      } else {
        this.msgErrorText="username and password are wrong, please re-enter"
      }
    })
  }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form{
  box-sizing: border-box;
  width: 260px;
  margin:  auto;
  box-shadow: 2px 2px 5px 1px rgb(53, 52, 52);
  padding-bottom: 40px;
  border-radius: 3px;
  background-color: rgb(244, 244, 245);
}
form h1 {
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
}
input{
  margin: 40px 25px;
  width: 200px;
  display: block;
  border: none;
  padding: 10px;
  border-bottom: solid 1px #c5d2d3
}
</style>