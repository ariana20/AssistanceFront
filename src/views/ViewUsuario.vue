<!-- <template>
  <div class="viewusuario">
    <Usuario/>
  </div> 
</template> -->

<template>
  <div class="viewusuario">
    <CabezeraTitulo msg="Configuración de un usuario"
    :image-path="require('.././assets/images/cup-of-coffee-e.jpg')"/>
    <FormUsuario/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormUsuario    from '@/components/FormUsuario.vue'
export default {
  name: 'ViewUsuario',
  components: {
    CabezeraTitulo,
    FormUsuario,
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->