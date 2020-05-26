<template>
    <div name="Seleccion" style="margin-top:30px;margin-left:-250px">
        <h1>Elige tu Programa</h1>
        <div id="app" class="container row" style="text-align:center;margin:auto" >
            <div class="borde" v-for="(item,index) in this.programas" :key="index">
                <button v-on:click="irPrograma(item)" v-if="item.programa && item.programa.nombre!=='Administrador'" style="background:transparent;border:red;color:white;">
                    <h1 slot="header">{{item.programa.nombre}}</h1>
                    <p slot="content">Rol: {{item.tipoUsuario.nombre}}</p>
                </button>
                <button v-on:click="irAdmin(item)" v-else style="background:transparent;border:red;color:white;">
                    <h1 slot="header">Administrador</h1>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
//import card from '@/components/Card.vue'
import axios from 'axios'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'FormSeleccionPrograma',
  components: {
    //card
  },
  data(){
      return{
          programas:null,
      }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
      if(this.$store.state.usuario){
        this.axios.post('/usuarios/permisosProgramas',{usuario: this.$store.state.usuario})
            .then(response=>{
                this.programas = response.data
                this.$store.state.cantProg = response.data;
                if(this.programas.length == 1){
                    this.irPrograma(this.programas[0]);
                }
                else{
                    if(this.programas.length == 0){
                        this.$router.push('/userNuevo')
                    }
                }
            })
      }
  },
  methods:{
    openStorage () {
        return JSON.parse(localStorage.getItem('programaSel'))
    },
    saveStorage (item) {
        localStorage.setItem('programaSel', JSON.stringify(item))
    },
    irPrograma(item){
        if(this.$store.state.usuario !== null && this.$store.state.usuario !== undefined){
            let paramr = {
                usuario:this.$store.state.usuario,
                programa: item.programa.nombre
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
                this.$store.state.programaActual = item.programa;
                this.$store.state.tipoActual = item.tipoUsuario;
                let stored = this.openStorage() // extract stored form
                if (!stored) stored = {} 
                stored = item; // store new value
                this.saveStorage(stored)
                if(this.$route.path == '/seleccion' && this.$store.state.rutas[0]) {
                    this.$router.push(this.$store.state.rutas[0].path)
                }
                else {
                    if(this.$route.path=='/seleccion') this.$router.push('/userNuevo')
                }
            }).catch( e=>console.log(e));
        }
        
    },
    irAdmin(item){
        if(this.$store.state.usuario !== null && this.$store.state.usuario !== undefined){
            let paramr = {
                usuario:this.$store.state.usuario,
                programa: 'admin'
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
                this.$store.state.programaActual = item.programa;
                this.$store.state.tipoActual = item.tipoUsuario;
                let stored = this.openStorage() // extract stored form
                if (!stored) stored = {} 
                stored = item; // store new value
                this.saveStorage(stored)
                if(this.$route.path == '/seleccion' && this.$store.state.rutas[0]) {
                    this.$router.push(this.$store.state.rutas[0].path)
                }
                else {
                    if(this.$route.path=='/seleccion') this.$router.push('/userNuevo')
                }
            }).catch( e=>console.log(e));
        }
        
    }
  }
}
</script>


<!-- <style lang="scss" scoped>
    @import '../assets/styles/seleccion.scss';
 </style>-->

 <style scoped>
    .borde{
        border-radius: 1.25rem;  
        border: 2px solid #757575;
        width: 300px;
        padding-block: 30px;
        margin: 40px auto 40px auto;
        background-color: #009892;
        display: grid;
        color: white;
    }
 </style>