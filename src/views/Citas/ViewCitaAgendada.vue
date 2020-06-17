<template>
  <div class="viewcitaagendada">
    <CabezeraTitulo msg="Cita Agendada"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormCitaAgendada/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormCitaAgendada from '@/components/Citas/FormCitaAgendada.vue'
export default {
  name: 'ViewCitaAgendada',
  props: ['evento'],
  components: {
    CabezeraTitulo,
    FormCitaAgendada
  }
}
</script>