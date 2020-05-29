
<template>
  <div class="viewTiposUsuario">
    <CabezeraTitulo msg="Configuración de los Tipos de Usuario"/>
    <FormTiposUsuario/>
  </div>
</template>

<script>
// @ is an alias to /src
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormTiposUsuario from '@/components/Gestion Programa/FormTiposUsuario.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewTiposUsuario',
  components: {
    CabezeraTitulo,
    FormTiposUsuario
  }
}
</script>
