<template>
  <div class="about">
    <h1>This is an about page</h1>
    <table>
      <tbody>
        <tr v-for="user in users" :key="user.id">
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
        .get('http://127.0.0.1:8000/api/user')
          .then( response=>{
            this.users = response.data.data
          })
          .catch( e=>console.log(e))
    }
  }
}
</script>