
<template>
  <div class="Alumnos">
    <CabezeraTitulo msg="Agregar alumnos"
    :image-path="require('@/assets/images/person-writing.jpg')"/>
    <FormAgregarAlumnos/>
  </div>
</template>
<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormAgregarAlumnos    from '@/components/Gestion Programa/FormAgregarAlumnos.vue'
export default {
  name: 'ViewAgregarAlumnos',
  components: {
    CabezeraTitulo,
    FormAgregarAlumnos,
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