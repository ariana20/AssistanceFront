<template>
  <div class="viewRoles">
    <CabezeraTitulo msg="Tipos de Usuario y Permisos"
    :image-path="require('@/assets/images/profe-alumna.jpg')"/>
    <FormRoles />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormRoles from '@/components/Configuracion/FormRoles.vue'
export default {
  name: 'ViewRoles',
  components: {
    CabezeraTitulo,
    FormRoles
  }
}
</script>