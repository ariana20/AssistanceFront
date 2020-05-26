<template>
  <div class="Usuario">
    <CabezeraTitulo msg="Listado de tipos de tutoria"
    :image-path="require('.././assets/images/coffe-cream.jpg')"/>
    <FormListarTiposTutoria/>
  </div>
</template>
<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormListarTiposTutoria  from '@/components/FormListarTiposTutoria.vue'
export default {
  name: 'ViewListarUsuarios',
  components: {
    CabezeraTitulo,
    FormListarTiposTutoria,
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