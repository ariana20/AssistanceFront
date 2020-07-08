<template>
<!-- Para la barra principal parece -->
  
  <div id="app">
    <HomeNavBar style="z-index:9000" v-if="this.$route.path === '/' || this.$route.path == '/recuperarContrasena'"/>
    <NavBar style="z-index:9000" v-if="this.valor && this.$route.path !== '/' && this.$route.path !== '/recuperarContrasena' && this.$route.path !== '/404'"/> 
    <SidebarAdministrador
		:nav-links="$store.state.rutas"
    :image-path="require('./assets/images/assistance-logo.png')"
    background="#009892"
    link-color="#eee"
    hoverBackground="#026662"
    v-if="this.valor && this.$route.path !== '/' && this.$route.path !== '/recuperarContrasena' && this.$route.path !== '/404' && this.$route.path !== '/seleccion'"   />
    <div style="height:60px"></div>
    <div v-if="this.valor && this.$route.path !== '/' && this.$route.path !== '/recuperarContrasena' && this.$route.path !== '/404'" id="container" class="wrapper">
      <router-view/>
    </div>
    <router-view v-else/>

  </div>
  
</template>

<script>
import HomeNavBar from '@/components/Principal/HomeNavBar.vue'
import NavBar from '@/components/Principal/NavBar.vue'
import SidebarAdministrador from '@/components/Principal/SideNavBar'
import Vue from 'vue'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {MultiSelectPlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(MultiSelectPlugin);
Chart.plugins.unregister(ChartDataLabels);
Chart.defaults.global.defaultFontStyle = 'bold';
Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontFamily='Brandon Bold';

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
    const stored = this.openStorage('usuarioActual')
    if (stored) {
      this.$store.state.usuario = {
        ...this.$store.state.usuario,
        ...stored
      }
    }
    const prog = this.openStorage('programaSel')
    if (prog) {
      this.$store.state.programaActual = {
        ...this.$store.state.programaActual,
        ...prog.programa
      }
      this.$store.state.tipoActual = {
        ...this.$store.state.tipoActual,
        ...prog.tipoUsuario
      }
    }
    if(this.$store.state.usuario){
      this.axios.post('/usuarios/permisosProgramas',{usuario: this.$store.state.usuario})
        .then(response=>{
            this.$store.state.cantProg = response.data;
        })
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
    }
  },
  methods:{    
    openStorage (nombre) {
      return JSON.parse(localStorage.getItem(nombre))
    },
  },
}
</script>

<style>
  @import './assets/styles/main.css';
</style>

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
  font-family: "Brandon Bold";
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
hr {
  height:1px !important;
  border-width:0;
  color:gray;
  background-color:gray;
  border-top: 0.4px solid rgba(0, 0, 0, 0.1) !important;
}

</style>
