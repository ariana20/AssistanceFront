<!-- <template>
  <div class="viewusuario">
    <Usuario/>
  </div> 
</template> -->

<template>
  <div class="Usuario">
    <CabezeraTitulo msg="Configuración de un usuario"/>
    <FormUsuario/>
  </div>
</template>
<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormUsuario    from '@/components/FormUsuario.vue'
export default {
  name: 'ViewUsuario',
  components: {
    CabezeraTitulo,
    FormUsuario,
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>