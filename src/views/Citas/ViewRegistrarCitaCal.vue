<template>
  <div class="viewregcita">
    <CabezeraTitulo msg="Registrar una cita"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormRegistrarCitaCal/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormRegistrarCitaCal from '@/components/FormRegistrarCitaCal.vue'
export default {
  name: 'ViewRegistrarCitaCal',
  props: ['evento'],
  components: {
    CabezeraTitulo,
    FormRegistrarCitaCal,
  }
}
</script>