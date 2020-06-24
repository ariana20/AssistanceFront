<template>
  <div class="viewreportes">
    <CabezeraTitulo msg="Reportes"
    :image-path="require('@/assets/images/studying.jpg')"/>
    <FormReportes/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormReportes from '@/components/Reportes/FormReportes.vue'
export default {
  name: 'ViewReportes',
  components: {
    CabezeraTitulo,
    FormReportes
  }
}
</script>