
<template>
  <div class="viewTiposUsuario">
    <CabezeraTitulo msg="Configuración de los Tipos de Usuario"/>
    <FormTiposUsuario/>
  </div>
</template>

<script>
// @ is an alias to /src
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormTiposUsuario from '@/components/FormTiposUsuario.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewTiposUsuario',
  components: {
    CabezeraTitulo,
    FormTiposUsuario
  }
}
</script>
