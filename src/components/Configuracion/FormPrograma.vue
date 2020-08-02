<template>
  <div name="FormPrograma" class="contenedor">
    <div style="text-align: left;">
      <div class="row" style="width:100%">
        <div class="form-inline col-12 col-md-2 col-lg-1">
          <h5 style="margin-top:10%;margin-bottom:5%">Buscar: </h5>
        </div>
        <div class="form-inline col-12 col-md-5 col-lg-4">
          <input class="form-control" style="margin-top:3%" v-model="nombre" placeholder="Buscar">
        </div>
        <div class="form-inline col-12 col-md-5 col-lg-4">
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
    <div v-if="$store.state.usuariosA!=null && $store.state.usuariosA.last_page!=1">
      <nav aria-label="Page navigation example" class="paginar">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-if="$store.state.usuariosA.current_page > 1">
            <a class="page-link" href="#" tabindex="-1" @click.prevent="Page($store.state.usuariosA.current_page - 1)" style="color:rgb(0, 152, 146)">
              <span>Anterior</span>
            </a>
          </li>
          <li class="page-item">
            <a  v-if="$store.state.usuariosA.current_page!=1" class="page-link" href="#" @click.prevent="Page(1)" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ '1' }}
            </a>
            <a v-else class="page-link" href="#" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ '1' }}
            </a>
          </li>
          <li class="page-item" v-if="$store.state.usuariosA.last_page > 3 && $store.state.usuariosA.current_page != 2 && ($store.state.usuariosA.current_page != 1 && $store.state.usuariosA.current_page != $store.state.usuariosA.last_page)">
            <a class="page-link" href="#" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ '...' }}
            </a>
          </li>
          <li class="page-item" v-if="$store.state.usuariosA.last_page > 2 && ($store.state.usuariosA.current_page == 1 || $store.state.usuariosA.current_page == $store.state.usuariosA.last_page)">
            <a class="page-link" href="#" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ '...' }}
            </a>
          </li>
          <li class="page-item" v-if="$store.state.usuariosA.current_page!=1 && $store.state.usuariosA.current_page!=$store.state.usuariosA.last_page">
            <a class="page-link" href="#" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ $store.state.usuariosA.current_page }}
            </a>
          </li>
          <li class="page-item" v-if="$store.state.usuariosA.last_page > 3 && $store.state.usuariosA.current_page != $store.state.usuariosA.last_page-1 && ($store.state.usuariosA.current_page != 1 && $store.state.usuariosA.current_page != $store.state.usuariosA.last_page)">
            <a class="page-link" href="#" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ '...' }}
            </a>
          </li>
          <li class="page-item" v-if="$store.state.usuariosA.last_page!=1">
            <a  v-if="  $store.state.usuariosA.current_page!=$store.state.usuariosA.last_page" class="page-link" href="#" @click.prevent="Page($store.state.usuariosA.last_page)" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ $store.state.usuariosA.last_page }}
            </a>
            <a v-else class="page-link" href="#" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ $store.state.usuariosA.last_page }}
            </a>
          </li>
          <li class="page-item" v-if="$store.state.usuariosA.current_page < $store.state.usuariosA.last_page">
            <a class="page-link" href="#" @click.prevent="Page($store.state.usuariosA.current_page + 1)" style="color:rgb(0, 152, 146)">
              <span>Siguiente</span>
            </a>
          </li>
        </ul>
      </nav>
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
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    this.facuSeleccionadoInd = null
    this.showModal()
    this.listarProgramas();
  },
  created(){
    this.listarFacultades();
    this.$store.state.filtro.query = ''
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
          this.filtroFacu = null
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
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
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