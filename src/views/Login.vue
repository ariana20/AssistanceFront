<template>
  <div class="Login">
    <LoginForm message="Welcome to SoftVizcochitos App"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
}
</script>