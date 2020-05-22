<template>
  <div class="viewsesiontutoria">
    <CabezeraTitulo msg="Sesión de Tutoría"
    :image-path="require('.././assets/images/coffe-cream.jpg')"/>
    <FormSesionTutoria/>
  </div>
  
  
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormSesionTutoria from '@/components/FormSesionTutoria.vue'
export default {
  name: 'ViewSesionTutoria',
  components: {
    CabezeraTitulo,
    FormSesionTutoria
  }
}
</script>