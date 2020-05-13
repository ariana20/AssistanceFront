<template>
  <div class="viewfacultad">
    <Facultad/>
  </div>
</template>

<script>
// @ is an alias to /src
import Facultad from '@/components/Facultad.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewFacultad',
  components: {
    Facultad
  }
}
</script>