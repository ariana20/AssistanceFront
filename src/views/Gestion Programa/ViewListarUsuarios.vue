<!-- <template>
  <div class="viewusuario">
    <Usuario/>
  </div> 
</template> -->

<template>
  <div class="Usuario">
    <CabezeraTitulo msg="Listado de usuarios"
    :image-path="require('@/assets/images/person-writing.jpg')"/>
    <FormListarUsuario/>
  </div>
</template>
<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormListarUsuario    from '@/components/Gestion Programa/FormListarUsuario.vue'
export default {
  name: 'ViewListarUsuarios',
  components: {
    CabezeraTitulo,
    FormListarUsuario,
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