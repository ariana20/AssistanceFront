<template>
  <div name="ViewReportesSatisfaccion">
    <CabezeraTitulo msg="Reporte Encuestas"
    :image-path="require('@/assets/images/studying.jpg')"/>
    <FormSatisfaccion/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormSatisfaccion from '@/components/Reportes/FormSatisfaccion.vue'
export default {
  name: 'ViewReporteSatisfaccion',
  components: {
    CabezeraTitulo,
    FormSatisfaccion
  }
}
</script>