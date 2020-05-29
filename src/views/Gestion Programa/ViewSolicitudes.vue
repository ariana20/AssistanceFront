<template>
  <div name="ViewSolicitudes">
    <CabezeraTitulo msg="Solicitudes"
    :image-path="require('@/assets/images/profe-alumna.jpg')"/>
    <FormSolicitudes />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormSolicitudes from '@/components/Gestion Programa/FormSolicitudes.vue'
export default {
  name: 'ViewSolicitudes',
  components: {
    CabezeraTitulo,
    FormSolicitudes
  }
}
</script>