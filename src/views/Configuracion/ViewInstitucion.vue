<template>
  <div class="viewinstitucion">
    <CabezeraTitulo 
    msg="Configuracion de la Institucion"
    :image-path="require('@/assets/images/0e37a827-396c-4641-8547-056f4b61bd98.jpg')"/>
    <FormInstitucion/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormInstitucion from '@/components/Configuracion/FormInstitucion.vue'
export default {
  name: 'ViewInstitucion',
  components: {
    CabezeraTitulo,
    FormInstitucion
  }
}
</script>
