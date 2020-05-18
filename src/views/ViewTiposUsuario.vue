
<template>
  <div class="viewTiposUsuario">
    <FormTiposUsuario/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormTiposUsuario from '@/components/FormTiposUsuario.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewTiposUsuario',
  components: {
    FormTiposUsuario
  }
}
</script>
