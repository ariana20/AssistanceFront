<template>
  <div class="viewPrograma">
    <CabezeraTitulo msg="Programas"
    :image-path="require('.././assets/images/79eedb4b-3f05-4bb9-9178-21336660b90e.jpg')"/>
    <FormPrograma/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormPrograma from '@/components/Estructura/FormPrograma.vue'
export default {
  name: 'ViewPrograma',
  components: {
    CabezeraTitulo,
    FormPrograma
  }
}
</script>