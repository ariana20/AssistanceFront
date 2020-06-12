<template>
  <div name="ViewAsignarTutor">
    <CabezeraTitulo msg="Tutores"
    :image-path="require('@/assets/images/profe-alumna.jpg')"/>
    <FormAsignarTutor />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormAsignarTutor from '@/components/Gestion Periodo/FormAsignarTutor.vue'
export default {
  name: 'ViewAsignarTutor',
  components: {
    CabezeraTitulo,
    FormAsignarTutor
  }
}
</script>