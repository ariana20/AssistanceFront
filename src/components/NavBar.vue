<template>
  <b-navbar toggleable="lg" type="dark" style="background:#009688;position: fixed;width:100%;z-index: 9999;">
      <div id="mySidenav" class="sidenav" style="text-align:left">
        <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a>
        <router-link to="/institucion"><img style="margin-right: 15px;" alt="Vue logo" src="../assets/bank.png" height="25px">Institucion</router-link>
        <router-link to="/facultad"><img style="margin-right: 15px;" alt="Vue logo" src="../assets/vacaciones.png" height="25px">Facultad</router-link>
        <router-link to="/">Programa</router-link>
        <router-link to="/">Coordinador</router-link>
        <router-link to="/">Unidades de Apoyo</router-link>
      </div>
      <span style="font-size:30px;cursor:pointer;color: #FFFFFF" v-on:click="openNav()">
        &#9776;
      </span>
      <b-navbar-brand><router-link to="/">SoftVizcochitos</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          
            <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-if="this.$store.state.usuario===null">
              <router-link to="/login">Ingresar</router-link>
            </b-nav-item>
            <b-nav-item-dropdown right v-if="this.$store.state.usuario!==null">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                <em >{{$store.state.usuario.nombre}}</em>
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
  mounted(){
    this.user = null
  },
  methods:{
    openNav() {
        document.getElementById("mySidenav").style.width = "214px";
    },
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    },
    logout(){
      axios.create({withCredentials: true }).post('http://localhost:8000/api/vuelogout', null).then(response=>{  
          alert(response.data.status);
          if(response.data.status=='success') this.$store.state.usuario=null;
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