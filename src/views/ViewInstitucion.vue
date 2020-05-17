<template>
  <div class="viewinstitucion">
    <CabezeraTitulo msg="Configuracion de la Institucion"/>
    <FormInstitucion/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormInstitucion from '@/components/Estructura/FormInstitucion.vue'
export default {
  name: 'ViewInstitucion',
  components: {
    CabezeraTitulo,
    FormInstitucion
  }
}
</script>
