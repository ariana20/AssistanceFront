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
            <button v-on:click="loginbtn()" class="user_registered-login" id="login-button">Ingresar</button>
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
                <div class="forms_field" style="margin-top:15%">
                  <input v-model="state.password" type="password" placeholder="Contraseña" class="forms_field-input" required />
                </div>
              </fieldset>
              <div class="forms_buttons" style="margin-top:20%; font-size:15px;  font-family:'Brandon Bold'">
                <input type="submit" value="Ingresar" class="forms_buttons-action" style="width:100%">
              </div>
              
            </form>
              <button @click="authenticate('google')" class="btn btn-lg btn-google btn-block" style="margin-top:15%;margin-bottom:5%;font-family:'Brandon Bold'">Ingresar con Google</button>
              <a href="#openModal" type="button" class="forms_buttons-forgot" >¿Olvidaste tu contraseña?</a>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title">Usuario Nuevo</h2>
            <form v-on:submit.prevent="checkFormReg" class="forms_form">
              <fieldset class="forms_fieldset">
                <div class="forms_field" style="margin-top:-7%">
                  <input v-model="reg.codigo" type="text" placeholder="Código" class="forms_field-input" required autofocus onkeypress="return ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 165))"/>
                </div>
                <div class="forms_field">
                  <input v-model="reg.nombre" type="text"  maxlength="100" placeholder="Nombres" class="forms_field-input" onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 165) )" required />
                </div>
                <div class="forms_field">
                  <input v-model="reg.apellidos" type="text"  maxlength="100" placeholder="Apellidos" class="forms_field-input" onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 165) )" required />
                </div>
                <div class="forms_field">
                  <input v-model="reg.email" type="email" maxlength="150"  placeholder="Correo" class="forms_field-input" required />
                </div>
                <div class="forms_field">
                  <input v-model="reg.password" type="password" placeholder="Contraseña" class="forms_field-input" required />
                </div>
                <div class="forms_field">
                  <select @change="ProgEl" class= "form-control" style="color:gray" v-model="programaElIn">
                    <option selected disabled :value="null">Elige un Programa</option>
                    <option v-for="(options,index) in programasT" v-bind:key="index" :value="options.nombre">
                      {{ options.nombre}}
                    </option>
                  </select>
                </div>
              </fieldset>
              <div class="forms_buttons">
                <input type="submit" value="Registrarse" class="btn-reg forms_buttons-action">
                <button type="button" v-on:click="registrate('google')" class="btn btn-google2" style="margin-top:0px;margin-bottom:0px;">Registrarse con Google</button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </section>
    
    <div id="openModal" class="modalbg">
      <div class="dialog" >
        <a href="#close" title="Close" class="close" style="height:40px;margin-top:5%;left:92.7%;text-align:left">X</a>
        <h1>¿Olvidaste tu contraseña?</h1><br>
        <div style="margin-left:-40%">
          <div style="text-align:center;margin-left:-140px">
            <strong >Email</strong><br>
          </div>
          <input v-model="emailRec" type="email" style="margin-left:30%;width:55%;border-radius: 1.25rem;border: 2px solid #757575;padding:10px;margin-bottom:3%" required><br>
        </div>
        <div >
          <button v-on:click="OlvidarContra" style="border-radius: 1.2rem;background: #0097A7;width:40%;height:40px;color:white;line-height: 40px">Recuperar Contraseña</button>
        </div>
      </div>
    </div>
  </div>
  
</template>


<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com';

  export default {
      mounted() {
        if(this.$store.state.usuario!=null) this.$router.push('/seleccion')
        if(this.$store.state.rutas[0]) this.$router.push(this.$store.state.rutas[0].path);
        axios.post('/programa/listarTodo')
          .then(response=>{
            this.programasT = response.data
          })
        if(this.$store.state.reg == true){
          this.signupbtn();
        }
      },
        data() {
          return {
            programasT: null,
            programaEl:null,
            programaElIn:null,
            errors: [],
            emailRec:null,
            state: {
                email: '',
                password: ''
            },
            reg:{
              codigo:'',
              nombre:'',
              apellidos:'',
              email:'',
              password:''
            },
            authRes: "none",
            profileRes: "none",
          }
      },
      methods:{  
        openStorage () {
          return JSON.parse(localStorage.getItem('usuarioActual'))
        },
        saveStorage (item) {
          localStorage.setItem('usuarioActual', JSON.stringify(item))
        },
        ProgEl(){
          let index;
          for (index = 0; index < this.programasT.length; index++) {
            if(this.programasT[index].nombre == this.programaElIn){
              break;
            }            
          }
          this.programaEl = this.programasT[index];
        },
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
                if(response.data.status==='success') {
                  this.$store.state.usuario = response.data.user;
                  let stored = this.openStorage() // extract stored form
                  if (!stored) stored = {} 
                  stored = response.data.user; // store new value
                  this.saveStorage(stored)
                  Swal.fire({
                      text:"Ingreso Exitoso",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                  })
                  this.$router.push('/seleccion')
                }
                else{
                  Swal.fire({
                      title:"Ingreso Incorrecto",
                      text:"Credenciales Inválidas",
                      icon:"error",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                  })
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
              codigo: this.reg.codigo,
              nombre: this.reg.nombre,
              apellidos: this.reg.apellidos,
              correo: this.reg.email,
              password: this.reg.password,
              programa: this.programaEl,
            }
            if(this.programaEl==null){
              Swal.fire({
                text:"Selecciona un Programa",
                icon:"error",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
              })
            }
            else{
              axios.post('/vueregister', params,)
                .then(response=>{
                  if(response.data.status==='success') {
                    this.$store.state.usuario = response.data.user;
                    let stored = this.openStorage() // extract stored form
                    if (!stored) stored = {} 
                    stored = response.data.user; // store new value
                    this.saveStorage(stored)
                    Swal.fire({
                        text:"Registro Exitoso",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                    this.$router.push('/userNuevo')
                  }
                  else{
                    Swal.fire({
                        title:"Registro Invalido",
                        text:response.data.status,
                        icon:"error",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                  }           
                }).catch( e=>console.log(e));
            }
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
                apellidos: profile.family_name,
                institucion: profile.hd,
              }
              axios.post('/googlelogin', parametros,)
                .then(response=>{
                  if(response.data.status=='success') {
                    _this.$store.state.usuario = response.data.user;
                    let stored = _this.openStorage() // extract stored form
                    if (!stored) stored = {};
                    stored = response.data.user; // store new value
                    _this.saveStorage(stored)
                    Swal.fire({
                      text:"Ingreso Exitoso",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                    })
                    _this.$router.push('/seleccion')
                  }
                  else{
                    Swal.fire({
                      title:"Ingreso Incorrecto",
                      text:"Credenciales Inválidas",
                      icon:"error",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                    })
                  }
                }).catch( e=>console.log(e));
            });
          });
        },
        registrate(network) {
          if(this.programaEl==null){
            Swal.fire({
              text:"Selecciona un Programa",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
          }
          else{
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
                let obj = {
                  password : 'dummy123',
                  correo:profile.email,
                  imagen:profile.picture,
                  nombre: profile.given_name,
                  apellidos: profile.family_name,
                  institucion: profile.hd,
                  programa: _this.programaEl,
                }
                axios.post('/googleregister', obj,)
                  .then(response=>{
                    if(response.data.status=='success') {
                      _this.$store.state.usuario = response.data.user;
                      let stored = _this.openStorage() // extract stored form
                      if (!stored) stored = {} 
                      stored = response.data.user; // store new value
                      _this.saveStorage(stored)
                      Swal.fire({
                        text:"Registro Exitoso",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                      })
                      _this.$router.push('/userNuevo')
                    }
                    else{
                      Swal.fire({
                        title:"Registro Incorrecto",
                        text:"El correo no pertenece a la institución",
                        icon:"error",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                      })
                    }
                  }).catch( e=>console.log(e));
              });
            });
          }
          
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
        OlvidarContra(){
          axios.post('/vueuser',{usuario: {correo:this.emailRec}})
            .then(response=>{
              if(response.data.user){
                this.axios.post('/usuarios/modificar/'+response.data.user.id_usuario,{bloqueado: "2",recuperar:true})
                  .then(response=>{
                    response
                    window.location.href = '/login#close'
                    let direccion = "https://proyectosoftware20201front.vizcochitos.cloudns.cl/recuperarContrasena/"+response.data.token_recuperacion
                    emailjs.send(
                      "gmail",
                      "template_bV7OIjEW",
                      {
                      "nombre":response.data.nombre,
                      "mensaje":"Olvidaste tu contrasena?<br><br>Entra a este <a href="+direccion+">link</a> "+direccion,
                      "correo": response.data.correo
                      }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                      .then((result) => {
                        console.log('SUCCESS!', result.status, result.text);
                        Swal.fire({
                          text:"Se le envió las instrucciones al correo registrado",
                          icon:"success",
                          confirmButtonText: 'OK',
                          confirmButtonColor:'#0097A7',
                          showConfirmButton: true,
                        })
                      }, (error) => {
                        console.log('FAILED...', error);
                      });
                  }) 
              }
              else{
                window.location.href = '/login#close'
                Swal.fire({
                  text:"No existe un usuario con ese correo",
                  icon:"error",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                })
                
              }
            })          
        },
      }
  }
</script>


<style lang="sass" scoped>
  @import '../../assets/styles/login.sass'
</style>

<style lang="less" scoped>
    @import '../../assets/styles/modal.less';
</style>

<style scoped>
  .btn-reg {
    height:4.5vw;
  }
  .btn-google {
    color: white;
    background-color: #DD4B39;
    padding-top: 2%;
    padding-bottom: 2%;
    font-size: 1vw;
    margin-left: 0px;
    margin-right: 0px;
    border-radius: 10px;
  }
  .btn-google2 {
    color: white;
    background-color: #DD4B39;
    font-size: 1vw;
    margin-left: 0px;
    margin-right: 0px;
    padding-top:3%;
    padding-bottom:3%;
    padding-right: 2%;
    padding-left: 2%;
    font-size:1vw;
    font-family:'Brandon Bold';
    margin-left:18%;
    width:41.01%;
    overflow: auto;
    border-radius: 10px;
  }
  .form-control {
    border-radius: 1.25rem;
    border: 0.5px solid #757575;
    margin-bottom: 5%;
    margin-top: 10%;
    font-size: 1vw;
  }
  @media only screen and (max-width: 900px) {
    .btn-google {
      height:4.5vw;
    }
    .btn-google2 {
      height:4.5vw;
      padding-top: 2%;
      padding-bottom: 2%;
      width:40%;
      font-size:1vw;
    }
    .btn-reg{
      font-size:4vw;
      padding-right: 4%;
    }
  }
</style>

