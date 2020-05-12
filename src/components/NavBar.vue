<template>
  <b-navbar toggleable="lg" type="dark" style="background:#009688;position: fixed;width:100%;z-index: 9999;">
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a>
                  <a href="/institucion" style="text-align: left;"><img style="margin-right: 15px;" alt="Vue logo" src="../assets/bank.png" height="25px">Institucion</a>
                  <a href="#" style="text-align: left;"><img style="margin-right: 15px;" alt="Vue logo" src="../assets/vacaciones.png" height="25px">Facultad</a>
                  <a href="#" style="text-align: left;">Programa</a>
                  <a href="#" style="text-align: left;">Coordinador</a>
                  <a href="#" style="text-align: left;">Unidades de Apoyo</a>
      </div>
      <span style="font-size:30px;cursor:pointer;color: #FFFFFF" v-on:click="openNav()">
        &#9776;
      </span>
      <b-navbar-brand href="/">SoftVizcochitos</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          
            <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
            <li class="nav-item">
                <a class="nav-link" href="/login" style="color: #FFFFFF">Ingresar</a>
            </li>
            <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                <em >{{user.nombre}}</em>
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
export default {
  data(){
    return{
      user:{
        id_usuario:null,
        estado: null,
        fecha_creacion: null,
        fecha_actualizacion: null,
        usuario_creacion: null,
        usuario_actualizacion: null,
        correo: null,
        telefono: null,
        imagen: null,
        nombre: null,
        ap_paterno: null,
        ap_materno: null,
        sexo: null,
        ultimo_logueo_fallido: null,
        bloqueado: null,
        intentos_fallidos: 0,
        notas: null
      }
    }
  },
  mounted(){
    axios.post('http://127.0.0.1:8000/api/vueuser', null).then(response=>{  
        if(response.data.id_usuario===null) this.user={id_usuario:null,nombre:'User'};   
        else this.user = response.data;         
      }).catch( e=>console.log(e));
  },
  methods:{
    openNav() {
        document.getElementById("mySidenav").style.width = "214px";
    },
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    },
    logout(){
      axios.post('http://127.0.0.1:8000/api/vuelogout', null).then(response=>{  
          alert(response);
      }).catch( e=>console.log(e));
    },
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
  background-color: #009688;
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