<template>
  <div class="about">
    <h1 class="text-3xl  mb-3 font-sans">This is an about page customized</h1>
    <div v-if="loading">
      <h2 class="bg-gray-400 animate-pulse h-4 w-1/3 mb-2 rounded-md"></h2>
      <h3 class="w-1/2 mb-4 h-4 animate-pulse bg-gray-500 rounded-md"></h3>
    </div>
    
    <p>{{msg}}</p>
  </div>
</template>
<script>


export default {
  name: 'About',
   data(){
    return {
      msg:'',
      loading:true,
    };
  },
  async beforeMount(){
    console.log("About loading..");
    let url = "test/output";

    let response = await this.$api.get(url,{withCredentials: true,crossDomain: true});
    this.msg = response.data;
    this.loading = false;
    console.log(response);
  }
      
    
  
}
</script>