<template>
  <div class="viewreportes">
    <CabezeraTitulo msg="Reporte Plan de acción"
    :image-path="require('@/assets/images/studying.jpg')"/>
    <FormReportePlanAccion/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormReportePlanAccion from '@/components/Reportes/FormReportePlanAccion.vue'
export default {
  name: 'ViewReportePlanAccion',
  components: {
    CabezeraTitulo,
    FormReportePlanAccion
  }
}
</script>