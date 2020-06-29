<template>
  <div class="viewreportes">
    <CabezeraTitulo msg="Reporte Bajo Rendimiento"
    :image-path="require('@/assets/images/studying.jpg')"/>
    <FormReporteRendimiento/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormReporteRendimiento from '@/components/Reportes/FormReporteRendimiento.vue'
export default {
  name: 'ViewReporteRendimiento',
  components: {
    CabezeraTitulo,
    FormReporteRendimiento
  }
}
</script>