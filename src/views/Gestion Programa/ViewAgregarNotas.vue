
<template>
  <div class="Notas">
    <CabezeraTitulo msg="Notas de los alumnos"
    :image-path="require('@/assets/images/person-writing.jpg')"/>
    <FormAgregarNotas/>
  </div>
</template>
<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormAgregarNotas    from '@/components/Gestion Programa/FormAgregarNotas.vue'
export default {
  name: 'ViewAgregarNotas',
  components: {
    CabezeraTitulo,
    FormAgregarNotas,
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