<template>
  <div name="View Rec. Contrasena" style="background:#8CD0D7;width:100%;height:93.8vh">
    <FormRecuperarContrasena/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormRecuperarContrasena from '@/components/Principal/FormRecuperarContrasena.vue'
// Solo llamo al componente
export default {
  name: 'View Recuperar Contrasena',
  components: {
    FormRecuperarContrasena,
  },
}
</script>