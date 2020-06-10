<template>
  <div name="ViewTutoresDisponibles">
    <CabezeraTitulo msg="Tutores"
    :image-path="require('@/assets/images/profe-alumna.jpg')"/>
    <FormTutoresDisponibles />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormTutoresDisponibles from '@/components/Gestion Periodo/FormTutoresDisponibles.vue'
export default {
  name: 'ViewTutoresDisponibles',
  components: {
    CabezeraTitulo,
    FormTutoresDisponibles
  }
}
</script>