<template>
  <div class="viewfacultad">
    <CabezeraTitulo msg="Facultades"
    :image-path="require('.././assets/images/903a21b5-3410-4e68-a521-6dac52b783b8.jpg')"/>
    <FormFacultad />
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormFacultad from '@/components/Estructura/FormFacultad.vue'
export default {

  name: 'ViewFacultad',
  components: {
    CabezeraTitulo,
    FormFacultad
  }
}
</script>