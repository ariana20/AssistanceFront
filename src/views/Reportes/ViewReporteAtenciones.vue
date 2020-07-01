<template>
  <div class="viewreportes">
    <CabezeraTitulo msg="Reporte Atenciones"
    :image-path="require('@/assets/images/studying.jpg')"/>
    <FormAtenciones/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormAtenciones from '@/components/Reportes/FormAtenciones.vue'
export default {
  name: 'ViewReporteAtenciones',
  components: {
    CabezeraTitulo,
    FormAtenciones
  }
}
</script>