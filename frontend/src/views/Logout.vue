<template>
 <div></div>
</template>

<script>

import authentication from '../services/authenticate-service'

export default {
  name: 'Logout',
  beforeMount(){
    authentication.init(this);
    authentication.logout();
    debugger
    // this.$router.push('/login');

  }
      
    
  
}
</script>
