<template>
  <div name="View Datos Programa">
    <CabezeraTitulo 
    msg="Programa"
    :image-path="require('@/assets/images/0e37a827-396c-4641-8547-056f4b61bd98.jpg')"/>
    <DatosPrograma/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import DatosPrograma from '@/components/Configuracion/FormDatosPrograma.vue'
export default {
  name: 'ViewDatosPrograma',
  components: {
    CabezeraTitulo,
    DatosPrograma
  }
}
</script>