<template>
  <div name="FormPrograma" class="contenedor">
    <div style="text-align: left;">
      <div class="row" style="width:100%">
        <div class="form-inline col-12 col-md-2 col-lg-1">
          <h5 style="margin-top:10%;margin-bottom:5%">Nombre: </h5>
        </div>
        <div class="form-inline col-12 col-md-2">
          <input class="form-control" style="margin-top:3%" v-model="nombre" placeholder="Ingrese nombre del programa">
        </div>
        <div class="form-inline col-12 col-md-3">
          <select v-on:change="FacultadSel"  class="form-control" style="margin-top:2%"
            v-model="facuSeleccionadoInd">  <!--aqui guardo-->
            <option selected :value="null">Selecciona una facultad</option>
            <option v-for="(prog, i) in facultades"  :key="i" :value="prog.id_programa"> 
              {{ prog.nombre }} 
            </option>
          </select>
        </div>
      </div>

      <div style="overflow: auto;width:100%;">
        <table class="table" style="margin-top:2%">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Coordinador</th>
              <th scope="col">Facultad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in programasFiltrados" :key="index">
              <td>{{item.programa.codigo}}</td>
              <td>{{item.programa.nombre}}</td>
              <td>{{item.programa.correo}}</td>
              <td>
                <a style="font-weight:normal" v-if="item.coordinador">{{item.coordinador.nombre + " " + item.coordinador.apellidos }}</a>
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
    </div>
    
    <div v-if="programasFiltrados==null || programasFiltrados.length==0" class="row" style="width:100%">
      <div class="col-12" style="margin-top:1%;margin-bottom:5%;text-align:center;font-size:150%">
        Ningún Registro de Programas
      </div>
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
      programas:[],
      facuSeleccionadoInd:null,
      facuSeleccionado:null,
      facultades:null,
    }
  },
  created(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    this.listarFacultades();
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
    filtroFacu:{
      get(){
        return this.$store.state.filtro.facultad;
      },
      set(val){
        this.$store.commit('SET_Facu',val);
      }
    },
    ...mapGetters({
      programasFiltrados: 'filtrarProgramas'
    })
  },
  methods:{
    listarFacultades(){
      this.axios.post('/programa/facultadesProg')
        .then(response=>{
          this.facultades = response.data
        })
        .catch(e=>{
          console.log(e)
        })
    },
    FacultadSel(){
      if(this.facuSeleccionadoInd == null){
        this.filtroFacu = null;
      }
      else{
        this.facultades.forEach(element => {
          if(element.id_programa == this.facuSeleccionadoInd){
            this.facuSeleccionado = element;
            this.filtroFacu = element;
          }
        });
      }
    },
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
    width: 100%;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin:auto;
}
</style>