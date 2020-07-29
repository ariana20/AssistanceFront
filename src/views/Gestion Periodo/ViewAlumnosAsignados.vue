<template>
  <div name="ViewAlumnosAsignados">
    <CabezeraTitulo msg="Alumnos Asignados"
    :image-path="require('@/assets/images/profe-alumna.jpg')"/>
    <FormAlumnosAsignados />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormAlumnosAsignados from '@/components/Gestion Periodo/FormAlumnosAsignados.vue'
export default {
  name: 'ViewAlumnosAsignados',
  components: {
    CabezeraTitulo,
    FormAlumnosAsignados
  }
}
</script>