<template>
  <div class="LoginForm" >
    <div class="container" >
        <div class="row justify-content-center" >
            <div class="page-header">
              <h2>Vizcochitos Login</h2>
            </div>
            <div class="col-md-12 text-center">
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul class="list-group">
                      <li v-for="error in errors" :key="error.id" class="list-group-item list-group-item-danger">{{ error }}</li>
                    </ul>
                </p>
            </div>
            <div class="col-md-6" v-if="loginfalse = true">
                <form v-on:submit.prevent="checkForm" id="createAdministrator">
                  <div class="form-group">
                    <label for="email">Email address:</label>
                    <input v-model="state.email" type="email" class="form-control" id="email" placeholder="Enter Email" name="email">
                  </div>
                  <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input v-model="state.password" type="password" class="form-control" id="password" placeholder="********" name="password">
                  </div>
                  <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

  export default {
      mounted() {
        if(this.$store.state.usuario!==null) this.$router.push('/institucion');
      },
        data() {
          return {
            errors: [],
            state: {
                email: '',
                password: ''
            }
          }
      },
      methods:{
      checkForm: function (e) {
          
        this.errors = [];
        if (!this.state.email) {
          this.errors.push('Email required.');
        }
        if (!this.state.password) {
          this.errors.push('Password required.');
        }
      else
      {
        if(this.$store.state.usuario !== null && this.$store.state.usuario!== undefined) {
          this.$router.push('/institucion');
        }
        else{
          const params ={
            correo: this.state.email,
            password: this.state.password,
          }
          
          axios.post('/vuelogin', params,)
            .then(response=>{  
              alert(response.data.status); 
              if(response.data.status==='success') {
                this.$store.state.usuario = response.data.user;
                this.$router.push('/institucion'); 
              }                
            }).catch( e=>console.log(e));
        }
      }
      
        e.preventDefault();
      }
    }
  }
</script>