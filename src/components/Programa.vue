<template>
  <div class="Programa">
    <CabezeraTitulo msg="Configuración de los Programas"/>
    <FormPrograma/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormPrograma from '@/components/FormPrograma.vue'
export default {
  name: 'Programa',
  components: {
    CabezeraTitulo,
    FormPrograma
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