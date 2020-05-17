<template>
  <div class="viewfacultad">
    <CabezeraTitulo msg="Facultades"/>
    <FormFacultad/>
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