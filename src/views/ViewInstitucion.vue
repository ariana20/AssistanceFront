<template>
  <div class="viewinstitucion">
    <Institucion/>
  </div>
  
  
</template>

<script>
// @ is an alias to /src
import Institucion from '@/components/Institucion.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewInstitucion',
  components: {
    Institucion
  }
}
</script>