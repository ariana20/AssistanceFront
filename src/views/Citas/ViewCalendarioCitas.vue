<template>
  <div class="viewcalendariocitas">
    <CabezeraTitulo msg="Calendario de Citas"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormCalendarioCitas/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormCalendarioCitas from '@/components/Citas/FormCalendarioCitas.vue'
export default {
  name: 'ViewCalendarioCitas',
  components: {
    CabezeraTitulo,
    FormCalendarioCitas
  }
}
</script>