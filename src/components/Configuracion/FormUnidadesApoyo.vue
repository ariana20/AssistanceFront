<template>
  <div class="FormUnidadesApoyo">
    <div class="container" style="left:60px;text-align: left;">
      <div class="top-titulo">
            <h4 class="col-sm-4 title-container">Nombre: </h4>
            <input class="col-sm-4 form-control" style="left:-220px;top:26px;right:0px;" v-model="nombre" placeholder="Ingrese nombre del programa">
            <div class="botones">
                <button type="button" class="btn btn-info" @click="nuevo()" style="margin-left:90px" >Añadir</button>
            </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Contacto</th>
            <th scope="col">Correo Contacto</th>
            <th scope="col">Facultad / Programa</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="$store.state.tipoActual.nombre == 'Admin'">
          <tr v-for="(item, index) in unidadesFiltrados" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.nombre_contacto}}</td>
            <td>{{item.correo_contacto}}</td>
            <td>
              <div v-for="(prog,index) in item.programas" :key="index">
                  <a v-if="prog.nombre!='Administrador'" style="font-weight:normal">{{prog.nombre}}</a>
                  <a v-else style="font-weight:normal">General</a>
              </div>
            </td>
            <td  style="text-align:left">
              <button v-on:click="Editar(item.id_unidad_apoyo)" class="btn link" style="margin-left:-19px"><b-icon icon="pencil" style="color:#0097A7"/></button>
              <button v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill" style="color:#757575"/></button>
            </td>
          </tr>
        </tbody>
        <tbody v-if="$store.state.tipoActual.nombre == 'Coordinador Facultad'">
          <tr v-for="(item, index) in unidadesFiltrados" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.nombre_contacto}}</td>
            <td>{{item.correo_contacto}}</td>
            <td>
              <div v-for="(prog,index) in item.programas" :key="index">
                  <a v-if="prog.nombre!='Administrador'" style="font-weight:normal">{{prog.nombre}}</a>
                  <a v-else style="font-weight:normal">General</a>
              </div>
            </td>
            <td  style="text-align:left">
              <div v-if="item.programas[0].nombre!='Administrador'">
                <button v-on:click="Editar(item.id_unidad_apoyo)" class="btn link" style="margin-left:-19px"><b-icon icon="pencil" style="color:#0097A7"/></button>
                <button v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill" style="color:#757575"/></button>
              </div>
              <div v-else>
                Solo Visualización
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-if="$store.state.tipoActual.nombre == 'Coordinador Programa'">
          <tr v-for="(item, index) in unidadesFiltrados" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.nombre_contacto}}</td>
            <td>{{item.correo_contacto}}</td>
            <td v-if="$store.state.tipoActual.nombre == 'Coordinador Programa'">
              <div v-if="item.programas[0].nombre!='Administrador'">
                <div v-for="(prog,index) in item.programas" :key="index">
                  <a v-if="prog.nombre!='Administrador'" style="font-weight:normal">{{prog.nombre}}</a>
                  <a v-else style="font-weight:normal">General</a>
                </div>
              </div>
              <div v-else>
                <a style="font-weight:normal">General</a>
              </div>
            </td>
            <td  style="text-align:left">
                <div v-if="(item.programas[0].nombre!='Administrador' && item.programas[0].nombre!=$store.state.programaActual.facultad.nombre && item.programas.length==1)||(item.programas[0].nombre!='Administrador' && item.programas[0].nombre!=$store.state.programaActual.facultad.nombre && item.programas.length==1)">
                  <button   v-if="item.programas[0].nombre!='Administrador' && item.programas[0].nombre!=$store.state.programaActual.facultad.nombre && item.programas.length==1" v-on:click="Editar(item.id_unidad_apoyo)" class="btn link" style="margin-left:-19px"><b-icon icon="pencil" style="color:#0097A7"/></button>
                  <button v-if="item.programas[0].nombre!='Administrador' && item.programas[0].nombre!=$store.state.programaActual.facultad.nombre && item.programas.length==1" v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill" style="color:#757575"/></button>
                </div>
                <div v-else>
                  Solo Visualización
                </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="my-modal" style="margin-left:20%" size="sm" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="color:#0097A7;margin-left:25%" class="sb-1 d-flex">
        Loading... <b-spinner style="margin-left:15px"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      unidades:[]
    }
  },
  mounted(){
    if(this.$store.state.unidades == null) this.listarUnidades();
    else this.unidades = this.$store.state.unidades;
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
            unidadesFiltrados: 'filtrarUnidades'
        })
  },
  methods:{
    listarUnidades() {
      if (this.$store.state.tipoActual.nombre == 'Admin') {
        this.axios.post('/unidadesApoyo/unidadesAdmin')
          .then(res =>{
            this.$store.state.unidades = res.data
            this.unidades = res.data
          })
          .catch(e => {
            console.log(e.response);
          })
      } else if(this.$store.state.tipoActual.nombre == 'Coordinador Facultad'){
        let obj = { id_facultad: this.$store.state.programaActual.id_facultad}
        this.axios.post('/unidadesApoyo/unidadesFacultad',obj)
          .then(res =>{
            this.$store.state.unidades = res.data
            this.unidades = res.data
          })
          .catch(e => {
            console.log(e.response);
          })
      }
      else{
        let obj = {
          id_programa: this.$store.state.programaActual.id_programa,
          id_facultad: this.$store.state.programaActual.id_facultad
        }
        this.axios.post('/unidadesApoyo/unidadesPrograma',obj)
          .then(res =>{
            this.$store.state.unidades = res.data
            this.unidades = res.data
          })
          .catch(e => {
            console.log(e.response);
          })
      }
    },
    Editar(id){
      this.$router.push('/unidad/'+id);
    },
    nuevo(){
      this.$router.push('/unidad');
    },
    Eliminar(item){
      Swal.fire({
          title: '¿Dese eliminar '+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.showModal();
            let obj = {
              tipoUsuario: this.$store.state.tipoActual.nombre,
              id_facultad: this.$store.state.programaActual.id_facultad,
              id_programa: this.$store.state.programaActual.id_programa  
            }
            this.axios.post('/unidadesApoyo/eliminar/'+item.id_unidad_apoyo,obj)
              .then(response=>{
                response
                let index = this.$store.state.unidades.indexOf(
                  function(element){
                    return element.id_unidad_apoyo === item.id_unidad_apoyo;
                  })
                this.$store.state.unidades.splice(index, 1);
                this.hideModal();
                Swal.fire({
                  text:"Eliminación Exitosa",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                })
              })
              .catch(e=>console.log(e));

          }
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
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin:auto;
}
</style>
