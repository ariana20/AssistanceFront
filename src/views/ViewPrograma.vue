<template>
  <div class="viewPrograma">
<<<<<<< HEAD
    <Programa/>
=======
    <CabezeraTitulo msg="Programas"/>
    <FormPrograma/>
>>>>>>> origin/Ariana
  </div>
</template>

<script>
<<<<<<< HEAD
// @ is an alias to /src
import Programa from '@/components/Programa.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewFacultad',
  components: {
    Programa
=======
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormPrograma from '@/components/Estructura/FormPrograma.vue'
export default {
  name: 'ViewPrograma',
  components: {
    CabezeraTitulo,
    FormPrograma
>>>>>>> origin/Ariana
  }
}
</script>