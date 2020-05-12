<template>
  <div class="vfacultad">
    <Facultad/>
  </div>
</template>

<script>
// @ is an alias to /src
import Facultad from '@/components/Facultad.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'VFacultad',
  components: {
    Facultad
  }
}
</script>