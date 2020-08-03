<template>
  <div class="viewcitaagendada">
    <CabezeraTitulo msg="Detalle de Cita"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormDetalleCitaAgendada/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormDetalleCitaAgendada from '@/components/Citas/FormDetalleCitaAgendada.vue'
export default {
  name: 'ViewDetalleCitaAgendada',
  props: ['evento'],
  components: {
    CabezeraTitulo,
    FormDetalleCitaAgendada
  }
}
</script>