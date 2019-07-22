<template>
  <div>
    <div class="row">
      <div class="col s6">{{ time1 }} </div>
      <div class="col s6">{{ time2 }} </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      time1 : '',
      time2 : '',
    }
  },
  created(){
    this.time1 = this.$parent.time1; 
    this.time2 = this.$parent.time2; 
  },
  name: 'Stats'  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
</style>
