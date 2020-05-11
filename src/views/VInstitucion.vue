<template>
  <div class="vinstitucion">
    <Institucion/>
  </div>
</template>

<script>
// @ is an alias to /src
import Institucion from '@/components/Institucion.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'VInstitucion',
  components: {
    Institucion
  }
}
</script>