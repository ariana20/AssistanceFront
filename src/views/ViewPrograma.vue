<template>
  <div class="viewPrograma">
    <Programa/>
  </div>
</template>

<script>
// @ is an alias to /src
import Programa from '@/components/Programa.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewFacultad',
  components: {
    Programa
  }
}
</script>