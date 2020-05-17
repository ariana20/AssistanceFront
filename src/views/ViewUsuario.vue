<template>
  <div class="viewusuario">
    <Usuario/>
  </div>
</template>

<script>
// @ is an alias to /src
import Usuario from '@/components/Usuario.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewUsuario',
  components: {
    Usuario
  }
}
</script>
