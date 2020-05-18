<template>
  <div class="viewPrograma">
    <CabezeraTitulo msg="Programas"/>
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