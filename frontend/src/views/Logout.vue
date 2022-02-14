<template>
 <div></div>
</template>

<script>

// import authentication from '../services/authenticate-service'

export default {
  name: 'Logout',
  beforeMount(){
    this.$auth.logout();

    this.$router.push("/login");

  }
      
    
  
}
</script>
