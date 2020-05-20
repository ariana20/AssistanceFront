<template>
  <div class="LoginForm" style="margin-top:-20px" >
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">¿Todavía no está registrado?</h2><br>
            <p class="user_unregistered-text">El sistema de tutorías está más que feliz de poder aceptar</p>
            <p class="user_unregistered-text">a todos los estudiantes. Crea tu cuenta para poder acceder</p>
            <p class="user_unregistered-text" >a todos los servicios ahora mismo.</p>
            <button v-on:click="signupbtn()" class="user_unregistered-signup" id="signup-button">Registrarse</button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">¿Ya se encuentra registrado?</h2><br>
            <p class="user_registered-text">Para poder sacar una cita entre a su cuenta con su correo institucional.</p>
            <button v-on:click="loginbtn()" class="user_registered-login" id="login-button">Login</button>
          </div>
        </div>
        
        <div class="user_options-forms" id="user_options-forms">
          <div class="user_forms-login">
            <h2 class="forms_title">Inicia Sesión</h2>
            <form v-on:submit.prevent="checkForm" class="forms_form">
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input v-model="state.email" type="email" placeholder="Correo" class="forms_field-input" required autofocus />
                </div>
                <div class="forms_field">
                  <input v-model="state.password" type="password" placeholder="Contraseña" class="forms_field-input" required />
                </div>
              </fieldset>
              <div class="forms_buttons">
                <button type="button" class="forms_buttons-forgot">¿Olvidaste tu contraseña?</button>
                <input type="submit" value="Ingresar" class="forms_buttons-action">
              </div>
              
              <button @click="authenticate('google')" class="btn btn-lg btn-google btn-block" style="margin-top:20px">Ingresar con Google</button>
            </form>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title">Usuario Nuevo</h2>
            <form v-on:submit.prevent="checkFormReg" class="forms_form">
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input v-model="reg.nombre" type="text" placeholder="Nombre Completo" class="forms_field-input" required />
                </div>
                <div class="forms_field">
                  <input v-model="reg.email" type="email" placeholder="Correo" class="forms_field-input" required />
                </div>
                <div class="forms_field">
                  <input v-model="reg.password" type="password" placeholder="Contraseña" class="forms_field-input" required />
                </div>
              </fieldset>
              <div class="forms_buttons">
                <input type="submit" value="Registrarse" class="forms_buttons-action" style="width:100%">
              </div>
            </form>
            <button @click="authenticate('google')" class="btn btn-lg btn-google btn-block" style="margin-top:20px">Registrarse con Google</button>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</template>


<script>
import axios from 'axios'

  export default {
      mounted() {
        if(this.$store.state.rutas[0]) this.$router.push(this.$store.state.rutas[0].path);
      },
        data() {
          return {
            errors: [],
            state: {
                email: '',
                password: ''
            },
            reg:{
              nombre:'',
              email:'',
              password:''
            },
            authRes: "none",
            profileRes: "none",
          }
      },
      methods:{
        checkForm() {
          if(this.$store.state.usuario !== null && this.$store.state.usuario!== undefined) {
            if(this.$store.state.rutas[0].path) this.$router.push(this.$store.state.rutas[0].path);
            else this.$router.push('/userNuevo');
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
                  this.rutas(response.data.user);
                }                
              }).catch( e=>console.log(e));
          }
        },
        checkFormReg(){
          if(this.$store.state.usuario !== null && this.$store.state.usuario!== undefined) {
            if(this.$store.state.rutas[0].path) this.$router.push(this.$store.state.rutas[0].path);
          }
          else{
            const params ={
              nombre: this.reg.nombre,
              correo: this.reg.email,
              password: this.reg.password,
            }
            console.log(params)
            axios.post('/vueregister', params,)
              .then(response=>{  
                alert(response.data.status); 
                if(response.data.status==='success') {
                  this.$store.state.usuario = response.data.user;
                  this.$router.push('/userNuevo')
                }                
              }).catch( e=>console.log(e));
          }
        },
        rutas(item){
          let paramr = {
            usuario:item,
          }
          axios.post('/usuarios/permisos',paramr)
              .then(response=>{
                for(var i=0; i < this.$store.state.navLinks.length; i++){
                  for(var j=0; j < response.data.length; j++){
                    if( this.$store.state.navLinks[i].text == response.data[j]){
                        this.$store.state.rutas.push(this.$store.state.navLinks[i]);
                    }
                  }
                }
                console.log(this.$store.state.rutas);
                if(this.$store.state.rutas[0]) this.$router.push('/seleccion');  
                else this.$router.push('/userNuevo');        
              }).catch( e=>console.log(e));
        },
        authenticate(network) {
          const _this = this;
          const hello = this.hello;
          hello(network).login().then(() => {
            const authRes = hello(network).getAuthResponse();
            /*
              performs operations using the token from authRes
            */
            let output = JSON.stringify(authRes, undefined, 4);
            _this.authRes = output;
            hello(network).api('me').then(function (profile) {
              /*
                performs operations using the user info from profile
              */
              let output = JSON.stringify(profile, undefined, 4);
              _this.profileRes = output;
              let parametros = {
                password: "dummy123",
                correo: profile.email,
                imagen: profile.picture,
                nombre: profile.given_name,
                ap_paterno: profile.family_name,
                institucion: profile.hd,
              }
              axios.post('/googlelogin', parametros,)
                .then(response=>{  
                  alert(response.data.status); 
                  if(response.data.status=='success') {
                    _this.$store.state.usuario = response.data.user;
                    _this.rutas(response.data.user);
                  }
                }).catch( e=>console.log(e));
            });
          });
        },
        signupbtn(){
          let userForms = document.getElementById('user_options-forms')
          userForms.classList.remove('bounceRight')
          userForms.classList.add('bounceLeft')
        },
        loginbtn(){
          let userForms = document.getElementById('user_options-forms')
          userForms.classList.remove('bounceLeft')
          userForms.classList.add('bounceRight')
        },
      }
  }
</script>


<style lang="sass" scoped>
  @import '../assets/styles/login.sass'
</style>

<style scoped>
  .btn-google {
    color: white;
    background-color: #DD4B39;
    height: 45px;
  }
</style>

