<template>
  <div class="viewcitaagendada">
    <CabezeraTitulo msg="Detalle de Cita"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormDetalleCitaAgendada2/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormDetalleCitaAgendada2 from '@/components/Citas/FormDetalleCitaAgendada2.vue'
export default {
  name: 'ViewDetalleCitaAgendada2',
  props: ['evento'],
  components: {
    CabezeraTitulo,
    FormDetalleCitaAgendada2
  }
}
</script>