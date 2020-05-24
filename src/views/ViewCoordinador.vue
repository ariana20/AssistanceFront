<template>
  <div class="viewcoordinador">
    <CabezeraTitulo msg="Coordinadores"
    :image-path="require('.././assets/images/903a21b5-3410-4e68-a521-6dac52b783b8.jpg')"/>
    <FormCoordinador/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/CabezeraTitulo.vue'
import FormCoordinador from '@/components/FormFCoordinador.vue'
export default {
  name: 'ViewCoordinador',
  components: {
    CabezeraTitulo,
    FormCoordinador
  }
}
</script>