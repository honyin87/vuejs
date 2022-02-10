<template>
 
    <!-- ======= Notification ======= -->
    <div  v-if="msg" class="alert alert-dismissible fade show" :class="[typePrefix+type]" role="alert">
      <i class="bi me-1" :class="[icon]"></i>
      {{msg}}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <!-- ======= End Notification ======= -->
</template>
<script>
export default {
  name: 'Notification',
  data(){
    return {
      msg:false,
      type: 'success',
      typePrefix:'alert-',
      icon:'',
    };
  },
  created(){

      if(typeof(this.$store.getters.getMessage) !== 'undefined'
        && this.$store.getters.getMessage !== null
      ){

        let data = this.$store.getters.getMessage;

        if(data["msg"] !== undefined){
          this.msg = data["msg"];
        }

        if(data["type"] !== undefined){
          this.type = data["type"];
        }

        if(data["icon"] !== undefined){
          this.icon = data["icon"];
        }

        if(this.type == 'success' && this.icon == ''){
            this.icon = 'bi-check-circle';
        }else if(this.type == 'warning'  && this.icon == ''){
            this.icon = 'bi-exclamation-triangle';
        }else if(this.type == 'info'  && this.icon == ''){
            this.icon = 'bi-info-circle';
        }else if(this.type == 'danger'  && this.icon == ''){
            this.icon = 'bi-exclamation-octagon';
        }

        this.$store.commit('setMessage',null);

      }

    
  }
}
</script>
