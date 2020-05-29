<template>
  <div class="home">
    <FormHome/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormHome from '@/components/Principal/FormHome.vue'
// Solo llamo al componente
export default {
  name: 'Home',
  components: {
    FormHome,
  },
}
</script>
