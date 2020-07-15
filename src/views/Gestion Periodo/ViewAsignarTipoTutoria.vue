<template>
  <div name="ViewAsignarTipoTutoria">
    <CabezeraTitulo msg="Asignar Tipo de Tutoría"
    :image-path="require('@/assets/images/profe-alumna.jpg')"/>
    <FormAsignarTipoTutoria />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormAsignarTipoTutoria from '@/components/Gestion Periodo/FormAsignarTipoTutoria.vue'
export default {
  name: 'ViewAsignarTipoTutoria',
  components: {
    CabezeraTitulo,
    FormAsignarTipoTutoria
  }
}
</script>