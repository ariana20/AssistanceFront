<template>
  <div class="about">
    <h1>This is an about page, but similar to HOME</h1>
     <HelloWorld msg="Welcome to Your About Vue.js App"/>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>