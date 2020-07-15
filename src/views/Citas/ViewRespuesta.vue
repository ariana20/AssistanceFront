<template>
  <div class="viewRespuesta">
    <CabezeraTitulo msg="Responder Encuesta"
    :image-path="require('@/assets/images/coffe-cream.jpg')"/>
    <FormRespuesta :agrupador="id"/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormRespuesta from '@/components/Citas/FormRespuesta.vue'
export default {
  name: 'ViewRespuesta',
  props: {
      id: String,
  },
  components: {
    CabezeraTitulo,
    FormRespuesta
  }
}
</script>