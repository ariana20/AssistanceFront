<template>
  <!-- <div class="FormPrograma">
    <div class="container" style="left:60px;text-align: left"> -->
	<div name="FormCoordinador" class="contenedor">
		<div style="text-align: left;">
			<div class="row" style="width:100%">
				<div class="form-inline col-12 col-md-2 col-lg-1">
					<h5 style="margin-top:5%;margin-bottom:5%">Buscar: </h5>
				</div>
				<div class="form-inline col-12 col-md-6 col-lg-4">
					<input class="form-control" style="margin-top:3%" v-model="nombre" placeholder="Buscar">
				</div>
        <div class="form-inline col-12 col-md-6 col-lg-3">
          <select v-on:change="FacultadSel"  class="form-control" style="margin-top:4%"
            v-model="facuSeleccionadoInd">  <!--aqui guardo-->
            <option selected :value="null">Selecciona una facultad</option>
            <option v-for="(prog, i) in facultades"  :key="i" :value="prog.id_programa"> 
              {{ prog.nombre }} 
            </option>
          </select>
        </div>
        <div class="form-inline col-12 col-md-6 col-lg-3">
          <select v-on:change="ProgramaSel"  class="form-control" style="margin-top:4%"
            v-model="progSeleccionadoInd">  <!--aqui guardo-->
            <option selected :value="null">Selecciona un programa</option>
            <option v-for="(prog, i) in programas"  :key="i" :value="prog.id_programa"> 
              {{ prog.nombre }} 
            </option>
          </select>
        </div>
			</div>

      <div style="overflow: auto;width:100%;">
        <table class="table" style="text-align:left;margin-top:2%">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Facultad/Programa</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in coordinadoresFiltrados" :key="index">
              <td>{{item.codigo}}</td>
              <td>{{item.nombre + " " +item.apellidos}}</td>
              <td>{{item.correo}}</td>
              <td>
                <div v-for="(lugar,ind) in item.lugares" :key="ind">
                    <a style="font-weight:normal">{{lugar}}</a>
                </div>
                <div v-if="item.lugares.length==0">
                  <a style="font-weight:normal">Sin Asignar</a>
                </div>
              </td>
              <td style=";font-size:30px;
									padding-top: 0px;
									padding-bottom: 0px;
									margin-top: 0px;
									margin-bottom: 0px;
								" >
                  <b-icon v-if="item.estado == 'act'" icon="check" style="color:green"/>
                  <b-icon v-else icon="check" style="color:#757575"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div v-if="coordinadoresFiltrados==null || coordinadoresFiltrados.length==0" class="row" style="width:100%">
      <div class="col-12" style="margin-top:1%;margin-bottom:5%;text-align:center;font-size:150%">
        Ningún Registro de Coordinadores
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
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      coordinadores:[],
      progSeleccionadoInd:null,
      progSeleccionado:null,
      facuSeleccionadoInd:null,
      facuSeleccionado:null,
      programas:null,
      facultades:null,
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    this.showModal();
    this.listarCoordinadores();
  },
  created(){
    this.listarProgramas();
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
    filtroProg:{
      get(){
        return this.$store.state.filtro.programa;
      },
      set(val){
        this.$store.commit('SET_Prog',val);
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
      coordinadoresFiltrados: 'filtrarCoordinadoresL'
    })
  },
  methods:{
    listarProgramas(){
      this.axios.post('/programa/listarTodo')
        .then(response=>{
          this.programas = response.data
          this.filtroProg = null
        })
        .catch(e=>{
          console.log(e)
        })
    },
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
    ProgramaSel(){
      if(this.progSeleccionadoInd == null){
        this.filtroProg = null;
      }
      else{
        this.programas.forEach(element => {
          if(element.id_programa == this.progSeleccionadoInd){
            this.progSeleccionado = element;
            this.filtroProg = element;
          }
        });
      }
    },
    FacultadSel(){
      this.showModal();
      this.axios.post('/programa/listarTodo')
        .then(response=>{
          this.programas = response.data
          this.progSeleccionadoInd = null;
          this.filtroProg = null;
          if(this.facuSeleccionadoInd == null){
            this.filtroFacu = null;
            this.listarProgramas();
          }
          else{
            this.facultades.forEach(element => {
              if(element.id_programa == this.facuSeleccionadoInd){
                this.facuSeleccionado = element;
                this.filtroFacu = element;
              }
            });
            let aux = []
            this.programas.forEach(element => {
              if(element.id_facultad == this.facuSeleccionado.id_facultad) aux.push(element);
            });
            this.programas = aux
            this.$store.state.filtroProgs = aux;
          }
          this.hideModal();
        })
        .catch(e=>{
          console.log(e)
        })
    },
    listarCoordinadores() {
      this.axios.post('/facultad/coordinadoresPyF')
        .then(res =>{
          this.$store.state.coordinadoresL = res.data;
          this.coordinadores = res.data;
          this.hideModal();
        })
        .catch(e => {
          console.log(e.response);
          this.hideModal();
        })
    },
    Editar(item){
      this.$store.state.usuarioEscogido=item;
      this.$router.push('/coordinador/'+item.id_usuario);
    },
    Eliminar(item,index){
      Swal.fire({
          text: '¿Desea eliminar a '+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.value) {
            this.showModal();
            this.axios.post('/usuarios/eliminar/'+item.id_usuario)
              .then(response=>{
                response
                this.$store.state.roles.splice(index, 1);
                this.hideModal();
                Swal.fire({
                  text:"Eliminación Exitosa",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                })
              })
              .catch(e=>{
                console.log(e)
                this.hideModal();
              });

          }
        })
    },
    nuevo(){
      this.$router.push('/coordinador/'+0);
    },
    showModal() {
      if (this.$refs['my-modal']) this.$refs['my-modal'].show()
    },
    hideModal() {
      if (this.$refs['my-modal']) this.$refs['my-modal'].hide()
    },
  }
}
</script>

<style scoped>
.title-container{
    margin-top: 30px;
    margin-bottom: 30px;
    color:black !important;
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
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}

</style>