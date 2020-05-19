<template>
  <div class="viewRoles">
    <CabezeraTitulo msg="Roles y Permisos"/>
    <FormRoles />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormRoles from '@/components/FormRoles.vue'
export default {
  name: 'ViewRoles',
  components: {
    CabezeraTitulo,
    FormRoles
  }
}
</script>