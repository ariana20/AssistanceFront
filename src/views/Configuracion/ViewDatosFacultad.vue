<template>
  <div name="View Datos Facultad">
    <CabezeraTitulo 
    msg="Facultad"
    :image-path="require('@/assets/images/0e37a827-396c-4641-8547-056f4b61bd98.jpg')"/>
    <DatosFacultad/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import DatosFacultad from '@/components/Configuracion/FormDatosFacultad.vue'
export default {
  name: 'ViewDatosFacultad',
  components: {
    CabezeraTitulo,
    DatosFacultad
  }
}
</script>