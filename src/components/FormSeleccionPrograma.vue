<template>
    <div name="Seleccion" style="margin-top:30px;margin-left:-250px">
        <h1>Elige tu Programa</h1>
        <div id="app" class="container">
            <card @click="irPrograma(item)" v-for="(item,index) in this.programas" :key="index" data-image="https://www.colorhexa.com/009892.png">
                <h1 @click="irPrograma(item)" slot="header">{{item.programa.nombre}}</h1>
                <p @click="irPrograma(item)" slot="content">Rol: {{item.tipoUsuario.nombre}}</p>
            </card>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import card from '@/components/Card.vue'
import axios from 'axios'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'FormSeleccionPrograma',
  components: {
    card
  },
  data(){
      return{
          programas:null,
      }
  },
  mounted(){
      this.axios.post('/usuarios/permisosProgramas',{usuario: this.$store.state.usuario})
        .then(response=>{
            this.programas = response.data
        })
  },
  methods:{
      irPrograma(item){
          axios.post('/vueuser',{usuario: this.$store.state.usuario}).then(response=>{
              
            this.$store.state.usuario = response.data.user;
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
                    if(this.$route.path == '/seleccion' && this.$store.state.rutas[0]) this.$router.push(this.$store.state.rutas[0].path)
                    else this.$router.push('/userNuevo')
                }).catch( e=>console.log(e));
            }
          })
            
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../assets/styles/seleccion.scss';
</style>