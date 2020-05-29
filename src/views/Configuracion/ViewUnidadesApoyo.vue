<template>
  <div class="viewUnidadesApoyo">
    <CabezeraTitulo msg="Unidades de Apoyo"
    :image-path="require('@/assets/images/79eedb4b-3f05-4bb9-9178-21336660b90e.jpg')"/>
    <FormUnidadesApoyo/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormUnidadesApoyo from '@/components/Configuracion/FormUnidadesApoyo.vue'
export default {
  name: 'ViewUnidadesApoyo',
  components: {
    CabezeraTitulo,
    FormUnidadesApoyo
  }
}
</script>