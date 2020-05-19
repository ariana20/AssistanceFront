<template>
  <div class="ViewPermisos">
    <CabezeraTitulo msg="Permisos de un Rol"/>
    <FormPermisos :idRol="id"/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormPermisos from '@/components/FormPermisos.vue'
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