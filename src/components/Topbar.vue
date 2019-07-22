<template>
    <nav>
    <div class="nav-wrapper ">
      <a href="#" class="brand-logo">Contador de Estatísticas</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">        
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Topbar'  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../sass/base";
  .nav-wrapper{
    background-color: $color-1 !important;
  }

  nav .brand-logo {
    color: $color-4!important ;
    font-size: 14px

  }
</style>
