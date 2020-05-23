<template>
  <b-navbar toggleable="lg" type="dark" style="box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 26px;background:#FFFFFF;position: fixed;width:100%;margin-top:0;height:60px;">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            
      <b-collapse id="nav-collapse" is-nav>
              <select 
               v-if="this.$route.path != '/seleccion' && this.$route.path != '/login' && this.$store.state.cantProg.length!=0"
               class="col-sm-2 form-control"
               style="left:250px;top:5px"
               v-model="selectedPrograma"
               @change="cambiarProg()">
                <option selected disabled value="">Cambia de Programa</option>
                <option 
                    v-for="(item, index) in $store.state.cantProg" 
                    :key="index" 
                    :value="item">
                    {{ item.programa.nombre }} ({{item.tipoUsuario.nombre}})
                </option>
              </select>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          
            <b-nav-item href="/login" v-if="this.$store.state.usuario === null || this.$store.state.usuario === undefined">
              <a style="color:#000;font-weight:normal">Ingresar</a>
            </b-nav-item>
            <b-nav-item-dropdown right v-if="this.$store.state.usuario !== null && this.$store.state.usuario !== undefined">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                <em style="color:#000000;font-weight:normal;" >{{$store.state.usuario.nombre}}</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="logout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      nombre:null ,
      selectedPrograma: null,
    }
  },
  mounted(){
    if(this.$store.state.usuario !== null && this.$store.state.usuario!== undefined){
      this.nombre = this.$store.state.usuario.nombre
      let prog;
      if(this.$store.state.programaActual){
        prog = this.$store.state.programaActual.nombre;
        let paramr = {
          usuario: this.$store.state.usuario,
          programa: prog
        }
        axios.post('/usuarios/permisos',paramr)
          .then(response=>{
            let acceder = false;
            for(var i=0; i < this.$store.state.navLinks.length; i++){
              for(var j=0; j < response.data.length; j++){
                if( this.$store.state.navLinks[i].text == response.data[j]){
                    this.$store.state.rutas.push(this.$store.state.navLinks[i]);
                    if(this.$route.path == this.$store.state.navLinks[i].path) acceder = true;
                }
              }
            }
            if(acceder!= true && this.$route.path != '/login' && this.$route.path != '/seleccion'){
              if(this.$store.state.rutas[0]) this.$router.push(this.$store.state.rutas[0].path);
              else if(this.$route.path !== '/userNuevo' && (this.$store.state.rutas == undefined || this.$store.state.rutas.length==0)) this.$router.push('/userNuevo');
            }
            if((this.$route.path == '/login' || this.$route.path == '/seleccion') && this.$store.state.rutas[0]) this.$router.push(this.$store.state.rutas[0].path)
            else{
              if(this.$route.path !== '/userNuevo' && (this.$store.state.rutas == undefined || this.$store.state.rutas.length==0)) this.$router.push('/userNuevo');
            }    
          }).catch( e=>console.log(e));
      }
      else{
        if (this.$route.path !== '/seleccion' ) this.$router.push('/seleccion')
      }
    }
    else{
      if (this.$route.path !== '/login' ) this.$router.push('login')
    }
    
  },
  methods:{
    openNav() {
        document.getElementById("mySidenav").style.width = "214px";
    },
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    },
    logout(){
      axios.post('/vuelogout', null).then(response=>{
          if(response.data.status=='success') {
            this.$store.state.usuario=null;
            this.nombre = null;
            Swal.fire({
                text:"Cierre de Sesión Exitoso",
                icon:"success",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
            }).then((result)=>{
              console.log(result)
              localStorage.setItem('usuarioActual', null)
              localStorage.setItem('programaSel', null)
              this.$store.state.programaActual = null;
              if (this.$route.path !== '/login') this.$router.go('login');
            }
            )
            
          }
      }).catch( e=>console.log(e));
      
    },
    goToSeleccion(){
      localStorage.setItem('programaSel', null)
      this.$router.push('/seleccion')
    },
    openStorage () {
        return JSON.parse(localStorage.getItem('programaSel'))
    },
    saveStorage (item) {
        localStorage.setItem('programaSel', JSON.stringify(item))
    },
    cambiarProg() {
      if(this.$store.state.usuario !== null && this.$store.state.usuario !== undefined){
          let paramr = {
              usuario:this.$store.state.usuario,
              programa: this.selectedPrograma.programa.nombre
          }
          axios.post('/usuarios/permisos',paramr)
          .then(response=>{
              this.$store.state.rutas = [];
              for(var i=0; i < this.$store.state.navLinks.length; i++){
                  for(var j=0; j < response.data.length; j++){
                      if( this.$store.state.navLinks[i].text == response.data[j]){
                          this.$store.state.rutas.push(this.$store.state.navLinks[i]);
                      }
                  }
              }
              this.$store.state.programaActual = this.selectedPrograma.programa;
              this.$store.state.tipoActual = this.selectedPrograma.tipoUsuario;
              let stored = this.openStorage() // extract stored form
              if (!stored) stored = {} 
              stored = this.selectedPrograma; // store new value
              this.saveStorage(stored)
              if(this.$store.state.rutas[0]) {
                  this.$router.push(this.$store.state.rutas[0].path)
              }
              else {
                this.$router.push('/userNuevo')
              }
          }).catch( e=>console.log(e));
      }
    }
  }
}
</script>

<style>
  .sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 8.1%;
  left: 0;
  background-color: #009892;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  }

  .sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #FFFFFF;
  display: block;
  transition: 0.3s;
  }

  .sidenav a:hover {
  color: #f1f1f1;
  }

  .sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  }
  @media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
  }
</style>