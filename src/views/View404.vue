<template>
  <div class="404">
    <Form404 />
    
  </div>
</template>

<script>
// @ is an alias to /src
import Form404 from '@/components/Form404.vue'
// Solo llamo al componente
export default {
  name: 'Home',
  components: {
    Form404
  },
}
</script>