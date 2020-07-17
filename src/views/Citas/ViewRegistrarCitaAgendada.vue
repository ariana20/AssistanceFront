<template>
  <div class="viewcitaagendada">
    <CabezeraTitulo msg="Registrar Cita"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormRegistrarCitaAgendada/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormRegistrarCitaAgendada from '@/components/Citas/FormRegistrarCitaAgendada.vue'
export default {
  name: 'ViewRegistrarCitaAgendada',
  // props: ['evento'],
  components: {
    CabezeraTitulo,
    FormRegistrarCitaAgendada
  }
}
</script>