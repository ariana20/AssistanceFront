<template>
  <div class="FormPrograma">
    <div class="container" style="left:60px;text-align: left;">
      <div class="top-titulo">
        <h4 class="col-sm-4 title-container">Nombre: </h4>
        <input class="col-sm-4 form-control" style="left:-600px;top:26px;right:0px;" v-model="nombre" placeholder="Ingrese nombre del programa">
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Coordinador</th>
            <th scope="col">Facultad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in programasFiltrados" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.programa.nombre}}</td>
            <td>{{item.programa.correo}}</td>
            <td>
              <a style="font-weight:normal" v-if="item.coordinador">{{item.coordinador.nombre}}</a>
              <a style="font-weight:normal" v-else>Sin Coordinador</a>
            </td>
            <td>
              <a style="font-weight:normal" v-if="item.facultad">{{item.facultad.nombre}}</a>
              <a style="font-weight:normal" v-else>Sin Facultad</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando... 
      </div>
    </b-modal>
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      programas:[]
    }
  },
  created(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    if(this.$store.state.programas.length == 0) {
      this.showModal()
      this.listarProgramas();
    }
    else this.programas = this.$store.state.programas;
  },
  computed:{
    nombre:{
      get(){
          return this.$store.state.filtro.query;
      },
      set(val){
          this.$store.commit('SET_QUERY',val);
      }
    },
    ...mapGetters({
      programasFiltrados: 'filtrarProgramas'
    })
  },
  methods:{
    listarProgramas() {
      this.showModal()
      this.axios.post('/programa/listarConCoord')
        .then(res =>{
          this.$store.state.programas = res.data
          this.programas = res.data
          this.hideModal()
        })
        .catch(e => {
          console.log(e.response);
          this.hideModal()
        })
    },
    showModal() {
      //this.$refs['my-modal'].show()
    },
    hideModal() {
      //this.$refs['my-modal'].hide()
    },
  }
}
</script>

<style scoped>
.title-container{
    margin-top: 30px;
    margin-bottom: 30px;
}
.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin:auto;
}
</style>