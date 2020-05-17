<template>
<!-- Para la barra principal parece -->
  <div id="app">
    <HomeNavBar style="z-index:9000" v-if="this.$route.path === '/'"/>
    <NavBar style="z-index:9000" v-if="this.valor && this.$route.path !== '/' && this.$route.path !== '/404'"/> 
    <SidebarAdministrador
		:nav-links="navLinks"
    :image-path="require('./assets/assistance-logo.png')"
    background="#009892"
    link-color="#eee"
    hoverBackground="#ccc"
    v-if="this.valor && this.$route.path !== '/' && this.$route.path !== '/404'"  />
    <div style="height:80px"></div>
    <div id="container" class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import HomeNavBar from '@/components/HomeNavBar.vue'
import NavBar from '@/components/NavBar.vue'
import SidebarAdministrador from '@/components/SideNavBar'
import Vue from 'vue'
import {MultiSelectPlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(MultiSelectPlugin);
export default {
  name: 'App',
  mounted(){
    let result = this.$router.options.routes.map(a => a.path);  
    for(var i=0; i < result.length; i++){
      if( result[i] == this.$route.path){
          this.valor=true;
      }
    }
    if(this.valor==false){
      this.$router.push('/404')
    }
  },
  components: {
    HomeNavBar,
    NavBar,
    SidebarAdministrador
  },
  data() {
    return{
    valor:false,
    usuario: this.$store.state.user,
    navLinks: [
      {
        text: 'Institucion',
		path: '/institucion',
		icon: 'ion-ios-business'
      },
      {
        text: 'Facultad',
		path: '/facultad',
		icon: 'ion-ios-school'
      },
      {
        text: 'Programa',
		path: '/programa',
		icon: 'ion-ios-home'
      },
      {
        text: 'Coordinador',
		path: '/',
		icon: 'ion-ios-person'
      },
      {
        text: 'Unidades de Apoyo',
		path: '/',
		icon: 'ion-ios-people'
      },
      {
        text: 'Tipos de Tutoria',
		path: '/tiposdeTutoria',
		icon: 'ion-ios-book'
      },
       {
        text: 'Gestionar Usuario',
		path: '/Usuario',
		icon: 'ion-ios-book'
      },
    ],
    }
  }
}
</script>

<style  lang="scss">
@import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';
@font-face {
  font-family: "Brandon Bold";
  src: url('./assets/fonts/BrandonText-Regular.otf');
}
figure {
	margin-block-start: 0;
	margin-block-end: 0;
	margin-inline-start: 10px;
	margin-inline-end: 0;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Brandon Bold",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
}

#container {
  margin-left: 250px;

}
@media screen and (max-width: 759px){
  #container{
    margin-left:60px;
  }
}
</style>
