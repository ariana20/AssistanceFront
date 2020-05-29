<template>
  <div class="viewcoordinador">
    <CabezeraTitulo msg="Coordinador"
    :image-path="require('@/assets/images/903a21b5-3410-4e68-a521-6dac52b783b8.jpg')"/>
    <FormCoordinador :id="this.id"/>
  </div>
</template>

<script>
import CabezeraTitulo from '@/components/Principal/CabezeraTitulo.vue'
import FormCoordinador from '@/components/Configuracion/FormCoordinador.vue'
export default {
  name: 'ViewCoordinador',
  components: {
    CabezeraTitulo,
    FormCoordinador
  },
  props:{
    id:String
  }
}
</script>