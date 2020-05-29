<!-- <template>
  <div class="viewusuario">
    <Usuario/>
  </div> 
</template> -->

<template>
  <div class="viewusuario">
    <CabezeraTitulo msg="Configuración de un usuario"
    :image-path="require('@/assets/images/person-writing.jpg')"/>
    <FormUsuario/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormUsuario    from '@/components/Configuracion/FormUsuarioAdmin.vue'
export default {
  name: 'ViewUsuario',
  components: {
    CabezeraTitulo,
    FormUsuario,
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->