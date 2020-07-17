<template>
  <div name="View Perfil">
    <CabezeraTitulo msg="Perfil"
    :image-path="require('@/assets/images/903a21b5-3410-4e68-a521-6dac52b783b8.jpg')"/>
    <FormPerfil />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormPerfil from '@/components/Configuracion/FormPerfil.vue'
export default {

  name: 'ViewPerfil',
  components: {
    CabezeraTitulo,
    FormPerfil
  }
}
</script>