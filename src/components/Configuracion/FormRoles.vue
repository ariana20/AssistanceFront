<template>
  <div class="FormRoles contenedor" style="text-align: left">

    <div class="row" style="width:100%"
      v-if="$store.state.permisosUsuario!=null && ($store.state.permisosUsuario.includes('Usuarios') || $store.state.permisosUsuario.includes('Datos Facultad') || $store.state.permisosUsuario.includes('Datos Programa'))">
      <div class="form-inline col-11 col-md-2 col-lg-1">
        <h5 style="margin-top:5%;margin-bottom:5%">Nombre: </h5>
      </div>
      <div class="form-inline col-11 col-md-4">
        <input class="form-control" style="margin-top:3%" v-model="nombre" placeholder="Buscar por nombre">
      </div>
      <div class="form-inline col-11 col-md-2 offset-md-3 offset-lg-4">
        <button  type="button" style="border-radius: 10px" @click="nuevo()" class="btn btn-info">Añadir</button>
      </div>
    </div>

    <div style="overflow: auto;width:99%;margin-top:2%"
      v-if="$store.state.permisosUsuario!=null && ($store.state.permisosUsuario.includes('Usuarios') || $store.state.permisosUsuario.includes('Datos Facultad') || $store.state.permisosUsuario.includes('Datos Programa'))">
      <table class="table" style="width:99%">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th v-if="$store.state.permisosUsuario.includes('Usuarios')" scope="col">Facultad/Programa</th>
            <th scope="col" style="text-align: center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in rolesFiltrados" :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.nombre}}</td>
            <td v-if="$store.state.permisosUsuario.includes('Usuarios') && item.programa!=null">
              <div v-if="item.programa.nombre == 'Administrador'">
                General
              </div>
              <div v-else>
                {{item.programa.nombre}}
              </div>
            </td>
            <td  style="text-align: center" v-if="$store.state.permisosUsuario.includes('Usuarios')">
              <button  style="
									padding-top: 0px;
									padding-bottom: 0px;
									margin-top: 0px;
									margin-bottom: 0px;
								"  v-on:click="Editar(item.id_tipo_usuario,false)" class="btn link"><b-icon icon="pencil" style="color:#0097A7"/></button>
              <button  style="
									padding-top: 0px;
									padding-bottom: 0px;
									margin-top: 0px;
									margin-bottom: 0px;
								"  v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill" style="color:#757575"/></button>
            </td>
            <td  style="text-align: center" v-else>
              
              <div v-if="(item.programa.nombre!='Administrador' && item.programa.nombre!=$store.state.programaActual.facultad.nombre)">
                <button  style="
									padding-top: 0px;
									padding-bottom: 0px;
									margin-top: 0px;
									margin-bottom: 0px;
								"  v-on:click="Editar(item.id_tipo_usuario,false)" class="btn link"><b-icon icon="pencil" style="color:#0097A7"/></button>
                <button  style="
									padding-top: 0px;
									padding-bottom: 0px;
									margin-top: 0px;
									margin-bottom: 0px;
								"  v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill" style="color:#757575"/></button>
              </div>
              
              <div v-else v-on:click="Editar(item.id_tipo_usuario,true)" style="cursor: pointer;">
                Solo Visualización
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="row" style="width:100%">
        <div class="col-12" style="margin-top:1%;margin-bottom:5%;text-align:center;font-size:150%">
            Su tipo de usuario no soporta esta funcionalidad comuníquese con Soporte
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
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      roles:[]
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    this.listarRoles();
    this.nombre="";
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
      rolesFiltrados: 'filtrarRoles'
    })
  },
  methods:{
    async listarRoles() {
      if(this.$store.state.permisosUsuario==null){
        await this.axios.post('/usuarios/permisos',{
                usuario: this.$store.state.usuario,
                programa: this.$store.state.programaActual.nombre
              })
              .then(response=>{
                this.$store.state.permisosUsuario = response.data
              })
      }
      if(this.$store.state.permisosUsuario.includes('Usuarios')){
        this.showModal()
        this.axios.post('/tipoUsuarios/tiposAdmin')
          .then(response=>{
              this.$store.state.roles = response.data;
            this.hideModal()
          })
          .catch(e=>{
            console.log(e)
            this.hideModal()
          });
      }
      else if(this.$store.state.permisosUsuario.includes('Datos Facultad')){
        let obj = { id_facultad: this.$store.state.programaActual.id_facultad}
        this.showModal()
        this.axios.post('/tipoUsuarios/tiposFacultad',obj)
          .then(response=>{
              this.$store.state.roles = response.data;
            this.hideModal()
          })
          .catch(e=>{
            console.log(e)
            this.hideModal()
          });
      }
      else if(this.$store.state.permisosUsuario.includes('Datos Programa')){
        let obj = {
          id_programa: this.$store.state.programaActual.id_programa,
          id_facultad: this.$store.state.programaActual.id_facultad
        }
        this.showModal()
        this.axios.post('/tipoUsuarios/tiposPrograma',obj)
          .then(response=>{
              this.$store.state.roles = response.data;
            this.hideModal()
          })
          .catch(e=>{
            console.log(e)
            this.hideModal()
          });
      }
    },
    Editar(id,Visualización){
      this.$store.state.visualizacion = Visualización;  
      this.$router.push('/permisos/'+id);
    },
    nuevo(){
      this.$router.push('/permisos');
    },
    Eliminar(item){
      Swal.fire({
          text: '¿Desea eliminar '+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.showModal();
            this.axios.post('/tipoUsuarios/eliminar/'+item.id_tipo_usuario)
              .then(response=>{
                response
                this.hideModal();
                let index = this.$store.state.roles.indexOf(
                  function(element){
                    return element.id_tipo_usuario === item.id_tipo_usuario;
                  })
                this.$store.state.roles.splice(index, 1);
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

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}
.title-container{
    margin-top: 30px;
    margin-bottom: 30px;
}

.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin-top: -0.5%;
}
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}
</style>