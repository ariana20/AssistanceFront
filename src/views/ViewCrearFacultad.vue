<template>
  <div class="viewCrearFacultad">
    <CabezeraTitulo 
    msg="Configuración de una Facultad"
    :image-path="require('.././assets/images/gray-laptop.jpg')"/>
    <FormCrearFacultad/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormCrearFacultad from '@/components/Estructura/FormCrearFacultad.vue'
export default {
  name: 'ViewCrearFacultad',
  components: {
    CabezeraTitulo,
    FormCrearFacultad
  }
}
</script>