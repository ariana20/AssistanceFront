<template>
  <div class="ViewSeleccionPrograma">
    <SeleccionPrograma/>
  </div>
</template>

<script>
// @ is an alias to /src
import SeleccionPrograma from '@/components/Principal/FormSeleccionPrograma.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewSeleccionPrograma',
  components: {
    SeleccionPrograma
  }
}
</script>
