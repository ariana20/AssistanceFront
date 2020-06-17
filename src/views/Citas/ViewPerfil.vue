<template>
  <div class="viewPerfil">
    <CabezeraTitulo msg="Perfil"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormPerfil :idUsuario="id"/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormPerfil from '@/components/Citas/FormPerfil.vue'
export default {
  name: 'ViewPerfil',
  props: {
      id: String,
  },
  components: {
    CabezeraTitulo,
    FormPerfil
  }
}
</script>