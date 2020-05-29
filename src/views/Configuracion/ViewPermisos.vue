<template>
  <div class="ViewPermisos">
    <CabezeraTitulo msg="Permisos de un Rol"
    :image-path="require('@/assets/images/profe-alumna.jpg')"/>
    <FormPermisos :idRol="id"/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormPermisos from '@/components/Configuracion/FormPermisos.vue'
export default {
  props: {
      id: String,
  },
  name: 'ViewPermisos',
  components: {
    CabezeraTitulo,
    FormPermisos
  }
}
</script>