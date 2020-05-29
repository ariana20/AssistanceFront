<template>
  <div class="viewusuarionnuevo">
    <UsuarioNuevo/>
  </div>
</template>

<script>
// @ is an alias to /src
import UsuarioNuevo from '@/components/Principal/FormUsuarioNuevo.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewUsuarioNuevo',
  components: {
    UsuarioNuevo
  }
}
</script>
