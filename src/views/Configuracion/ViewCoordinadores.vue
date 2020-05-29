<template>
  <div class="viewCoordinador">
    <CabezeraTitulo msg="Coordinadores"
    :image-path="require('@/assets/images/79eedb4b-3f05-4bb9-9178-21336660b90e.jpg')"/>
    <FormCoordinadores/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormCoordinadores from '@/components/Configuracion/FormCoordinadores.vue'
export default {
  name: 'ViewCoordinador',
  components: {
    CabezeraTitulo,
    FormCoordinadores
  }
}
</script>