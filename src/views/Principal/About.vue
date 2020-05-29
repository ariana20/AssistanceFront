<template>
  <div class="about">
    <h1>This is an about page</h1>
    <table>
      <tbody>
        <tr v-for="user in users" :key="user.id_usuario">
          <td>{{user}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'About',
  data(){
    return{
      users:null
    }
  },
  mounted(){
    this.getUser();
  },
  methods: {
    getUser(){
      axios
        .post('/usuarios/listarTodo')
          .then( response=>{
            this.users = response.data
          })
          .catch( e=>console.log(e))
    }
  }
}
</script>