<template>
  <div class="institucion">
    <CabezeraTitulo msg="Configuracion de la Institucion"/>
    <FormInstitucion/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormInstitucion from '@/components/FormInstitucion.vue'
export default {
  name: 'Institucion',
  components: {
    CabezeraTitulo,
    FormInstitucion
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
