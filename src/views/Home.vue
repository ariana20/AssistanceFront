<template>
  <div class="home">
    <HelloWorld msg="Welcome to SoftVizcochitos App"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// Solo llamo al componente
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
}
</script>
