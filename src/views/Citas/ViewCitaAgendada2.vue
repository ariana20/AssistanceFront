<template>
  <div class="viewcitaagendada">
    <CabezeraTitulo msg="Cita Agendada"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormCitaAgendada2/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormCitaAgendada2 from '@/components/Citas/FormCitaAgendada2.vue'
export default {
  name: 'ViewCitaAgendada2',
  props: ['evento'],
  components: {
    CabezeraTitulo,
    FormCitaAgendada2
  }
}
</script>