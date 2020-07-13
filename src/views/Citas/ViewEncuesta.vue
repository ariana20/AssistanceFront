<template>
  <div class="viewEncuesta">
    <CabezeraTitulo msg="Encuestas"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormEncuesta/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormEncuesta from '@/components/Citas/FormEncuesta.vue'
export default {
  name: 'ViewEncuesta',
  props: {
      id: String,
  },
  components: {
    CabezeraTitulo,
    FormEncuesta
  }
}
</script>