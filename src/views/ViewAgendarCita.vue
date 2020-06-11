<template>
  <div class="viewagendarcita">
    <CabezeraTitulo msg="Agendar Cita"
    :image-path="require('.././assets/images/studying.jpg')"/>
    <FormAgendarCita/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormAgendarCita from '@/components/FormAgendarCita.vue'
export default {
  name: 'ViewAgendarCita',
  components: {
    CabezeraTitulo,
    FormAgendarCita
  }
}
</script>