<template>
  <b-navbar toggleable="lg" type="dark" style="box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 26px;background:#FFFFFF;position: fixed;width:100%;margin-top:0;height:60px;">
      
      <select 
        v-if="this.$route.path != '/seleccion' && this.$route.path != '/login' && this.$store.state.cantProg !== null && this.$store.state.cantProg.length!=0 && this.$store.state.cantProg.length!=1"
        class="col-5 col-md-2 form-control selectf"
        v-model="selectedPrograma"
        @change="cambiarProg()">
        <option selected disabled :value="null" style=";font-family:'Brandon Bold'">Cambia de Programa</option>
        <option
          v-for="(item, index) in $store.state.cantProg" 
          :key="index" 
          :value="item">
          <a v-if="item.programa && item.programa.nombre!=='Administrador'">{{ item.programa.nombre }} ({{item.tipoUsuario.nombre}})</a>
          <a v-else>Administrador</a>
        </option>
      </select>

      
      <b-navbar-nav class="col-5 col-md-2 offset-md-10 offset-8" style="text-align:right;">
          <b-nav-item href="/login" v-if="this.$route.path != '/login' && (this.$store.state.usuario === null || this.$store.state.usuario === undefined)">
            <a style="color:#000;font-weight:normal;margin-left:auto">Ingresar</a>
          </b-nav-item>
          <b-nav-item-dropdown class="buttonnav" style=";margin-left:auto;width:100%;color:black" right v-if="this.$store.state.usuario !== null && this.$store.state.usuario !== undefined">
              <template v-slot:button-content aria-expanded="false" style="overflow: hidden;color:black">
                <em style="color:#000000;font-weight:normal;overflow: hidden;display:unset;width:10%" >
                  {{$store.state.usuario.nombre}}
                </em>
              </template>
              <b-dropdown-item class="buttonnav btnnac" style="background:white"  v-on:click="Perfil()">
                Perfil
              </b-dropdown-item>
              <b-dropdown-item class="buttonnav btnnac" style="background:white"  v-on:click="logout()">
                Cerrar Sesión
              </b-dropdown-item>
          </b-nav-item-dropdown>
      </b-navbar-nav>
      <figure v-if="(usuario!=null && usuario.imagen!='' && usuario.imagen!=null)" id="floated" class="image-logo" >
        <img v-if="usuario!=null && usuario.imagen[0]!='u'" :src="usuario.imagen" alt="Foto"/>
        <img v-else :src="'https://assisstanceproyecto20201.vizcochitos.cloudns.cl/'+usuario.imagen" alt="Foto" />
      </figure>
      <figure v-if="usuario!=null && (usuario.imagen=='' || usuario.imagen==null)" id="floated" class="image-logo">	
        <b-avatar size="2rem" style="margin-left:-10px;width:40px"></b-avatar>		
      </figure>
      <figure v-if="usuario==null && $store.state.usuario!=null && $store.state.usuario.imagen!='' && $store.state.usuario.imagen!=null" id="floated" class="image-logo">	
        <img v-if="$store.state.usuario.imagen[0]!='u'" :src="$store.state.usuario.imagen" alt="Foto"/>
        <img v-else :src="'https://assisstanceproyecto20201.vizcochitos.cloudns.cl/'+$store.state.usuario.imagen" alt="Foto" />
      </figure>
      <figure v-if="usuario==null && $store.state.usuario!=null && ($store.state.usuario.imagen=='' || $store.state.usuario.imagen==null)" id="floated" class="image-logo">
        <b-avatar size="2rem" style="margin-left:-10px;width:40px" ></b-avatar>		
      </figure>
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
      usuario:null,
    }
  },
  mounted(){
    if(this.$store.state.usuario !== null && this.$store.state.usuario!== undefined){
      this.nombre = this.$store.state.usuario.nombre
      this.axios.post('/usuarios/listar/'+this.$store.state.usuario.id_usuario)
        .then(response=>{
          this.usuario = response.data;
        })
      let prog;
      if(this.$store.state.programaActual){
        prog = this.$store.state.programaActual.nombre;
        let paramr = {
          usuario: this.$store.state.usuario,
          programa: prog
        }
        axios.post('/usuarios/permisos',paramr)
          .then(response=>{
            this.$store.state.permisosUsuario = response.data;
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
      if (this.$route.path !== '/login' &&  !this.$route.path.toString().includes('recuperar')) {
        this.$router.push('/login')
      }
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
            Swal.fire({
                text:"Cierre de Sesión Exitoso",
                icon:"success",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
            }).then((result)=>{
              console.log(result)
              this.$store.state.usuario=null;
              this.nombre = null;
              localStorage.setItem('usuarioActual', null)
              localStorage.setItem('programaSel', null)
              this.$store.state.programaActual = null;
              if (this.$route.path !== '/login') this.$router.go('/login');
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
            this.$store.state.permisosUsuario = response.data;
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
            this.$store.state.roles = null;
            this.$store.state.permisos = null;
            this.$store.state.unidades = null;
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
    },
    Perfil(){
      this.$router.push('/perfilConf');
    }
  }
}
</script>

<style scoped>
.form-control {
    border-radius: 1.25rem ;  
    border: 0.5px solid #757575 ;
    width: 110%;
    margin-bottom: 10px;
}
.selectf{
  position: fixed;
  left:14%;
  top:1%;
  font-family:'Brandon Bold';
}
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


#floated{
    float: left;
    width: 150px;
    margin-top:15px;
    text-align:center;
}
#botones {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}
.btn-enviar-msg { 
    margin-left:540px;
    background-color: white;
    color: black;
    border: 2px solid #17a2b8;
}
.btn:focus {
    outline:none;
    box-shadow: none;
    border: 2.3px solid transparent;
}
select:focus {
    outline:none;
    box-shadow: none;
}
img {
  border-radius: 50%;
}
.image-logo{
  height:40px;
  margin-left:-1%;
  width: 20%;
}

.image-logo img{
  margin-top:-10px;
  margin-left:-50%;
  height:40px;
  width: 220%;
}


@media screen and (max-width: 1200px) {
  .image-logo{
    height:40px;
    margin-left:-2%;
    width: 20%;
  }
  .image-logo img{
    margin-left:-50%;
    height:40px;
    width: 220%;
  }

  .image-logo b-avatar{
    margin-left:-50%;
    height:40px;
    width: 220%;
  }
}
@media screen and (max-width: 800px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
  .btn-navs{
    margin-left: 80%;
    color: black;
    border: 1px solid;
    background:#009892;
  }
  .menusnav{
    background:#FFFFFF;
    margin-top: 2%;
    margin-left: 77%;
    font-size: 4vw;
    width: 5vw;
    color: #757575;
  }
  .optionnav{
    width: 5vw;
  }

  .btnnac{
    width: 100%;
    padding-left: 0%;
    margin-top: -5%;
  }

  .dropdown-item{
    padding-left: 5%;
  }

  .selectf{
    top:2%;
    left:20%;
  }

  .image-logo{
    visibility: hidden;
  }
}
</style>