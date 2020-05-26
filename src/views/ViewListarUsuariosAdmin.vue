<!-- <template>
  <div class="viewusuario">
    <Usuario/>
  </div> 
</template> -->

<template>
  <div class="Usuario">
    <CabezeraTitulo msg="Listado de usuarios"
    :image-path="require('.././assets/images/person-writing.jpg')"/>
    <FormListarUsuarioAdmin/>
  </div>
</template>
<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormListarUsuarioAdmin    from '@/components/FormListarUsuarioAdmin.vue'
export default {
  name: 'ViewListarUsuariosAdmin',
  components: {
    CabezeraTitulo,
    FormListarUsuarioAdmin,
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