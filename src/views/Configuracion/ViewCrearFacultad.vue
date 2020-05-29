<template>
  <div class="viewCrearFacultad">
    <CabezeraTitulo 
    msg="Configuración de una Facultad"
    :image-path="require('@/assets/images/gray-laptop.jpg')"/>
    <FormCrearFacultad :idFacultad="id"/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormCrearFacultad from '@/components/Configuracion/FormCrearFacultad.vue'
export default {
  props: {
      id: String,
  },
  name: 'ViewCrearFacultad',
  components: {
    CabezeraTitulo,
    FormCrearFacultad
  }
}
</script>