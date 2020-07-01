<template>
  <div class="viewreportes">
    <CabezeraTitulo msg="Reporte Asignados"
    :image-path="require('@/assets/images/studying.jpg')"/>
    <FormAsignado/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormAsignado from '@/components/Reportes/FormAsignado.vue'
export default {
  name: 'ViewReporteAsignado',
  components: {
    CabezeraTitulo,
    FormAsignado
  }
}
</script>