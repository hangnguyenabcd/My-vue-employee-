<template>
    <div class="home">
        <center><p>This is home page</p></center>
    </div>
</template>
<script>
export default {
  name: 'Homecome',
    data: () => ({
      isLogin: false,
      ga: '',
      name: 'Admin'
    }),

    // created () {
    //   EventBus.$on('dangnhapthanhcong', this.handle)
    //   console.log(this.isLogin)
    //   this.checkLogin()
    // },

    methods: {
      checkLogin () {
        if(!this.isLogin){
          this.$router.replace({ name: 'Login' })
        }

      },

      
      Login: function(){
          console.log(this.ga)
      },
      handle: function(e){
          console.log(e)
          this.isLogin = e
          console.log(this.isLogin)
      }
    }
  }
</script>
<style>
span{
    font: 50px;
    color: rgb(196, 199, 201);
}
</style>

