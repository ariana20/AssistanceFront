<template>
  <div class="viewUnidadApoyo">
    <CabezeraTitulo msg="Unidad de Apoyo"
    :image-path="require('@/assets/images/79eedb4b-3f05-4bb9-9178-21336660b90e.jpg')"/>
    <FormUnidadApoyo :idUnidad="id"/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormUnidadApoyo from '@/components/Configuracion/FormUnidadApoyo.vue'
export default {
  props: {
      id: String,
  },
  name: 'ViewUnidadApoyo',
  components: {
    CabezeraTitulo,
    FormUnidadApoyo
  }
}
</script>