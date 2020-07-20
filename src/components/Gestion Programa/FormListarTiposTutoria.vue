<template>
  <div class="FormRoles contenedor ">  
    <div style="text-align: left" >
      
			<div class="row" style="width:100%">
				<div class="form-inline col-11 col-md-2 col-lg-1">
					<h5 style="margin-top:5%;margin-bottom:5%">Nombre: </h5>
				</div>
				<div class="form-inline col-11 col-md-4">
					<input maxlength="100"  class="form-control" style="margin-top:3%" v-model="nombre" placeholder="Buscar por nombre">
				</div>
				<div class="form-inline col-11 col-md-2 offset-md-3 offset-lg-5">
					<button  type="button" style="border-radius: 10px" @click="nuevo()" class="btn btn-info">Añadir Nuevo</button>
				</div>
			</div> 

      <div style="overflow: auto;width:100%">
        <table class="table " style="text-align:left;margin-top:2%" >
          <thead>
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col" style="text-align: center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tipostutoriasFiltrados" :key="index">
              <th scope="row">{{index+1}}</th>
              <td>{{item.nombre}}</td>        
              <td >
                  <b-icon v-if="item.estado == 'act'" icon="check" style="color:green;width:35px; height:35px;"/>
                  <b-icon v-else icon="x" style="color:#757575;width:35px; height:35px;"/>
              </td>     
              <td  style="text-align: center">
                    <router-link :to="{name: 'TiposTutoria', params: {id: item.id_tipo_tutoria}}">                          
                      <b-icon style="color:#0097A7;width:20px; height:20px;margin-right:20px;" icon="pencil"/>
                    </router-link>                  
                    <b-icon v-on:click="eliminarTtutoria(item,index)" style="color:#757575;width:20px; height:20px;cursor:pointer" icon="dash-circle-fill"/>
                
              </td>
            
            </tr>
          </tbody>
        </table>
      </div>
    </div>
        <!-- MODAL CARGANDO  -->
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
import Axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data(){
    return{
      tipostutorias:[], //
      miprog:this.$store.state.programaActual,
      miUsuario:null,
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
  
    if(this.$store.state.tipostutorias === null) this.listarTT(); //
    else this.tipostutorias = this.$store.state.tipostutorias; //
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
          tipostutoriasFiltrados: 'filtrarTipoTutorias'
        })
  },
  methods:{
    
    listarTT() {
      this.showModal();
    //   this.axios.post('/TipoTutoria/listarTodo/'+this.programas.id) //
      Axios.post('/TipoTutoria/listarTodo/'+ this.miprog.id_programa)
        .then(response=>{
          // Ordenadito por estado
           let par=response.data;
           this.$store.state.tipostutorias=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});

            // this.$store.state.tipostutorias = response.data; //
           this.miUsuario=this.$store.state.usuario;
       
            this.hideModal();
        })
        .catch(e=>{
        console.log('catch Listar',e);
        this.hideModal();
        //Swal de problema
         Swal.fire({
                    text:"Estamos teniendo problemas al listar los tipos de tutorias. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
           });
        });
    },
    Editar(id){
      this.$router.push('/tiposdeTutoria/'+id); //
    },
    
    eliminarTtutoria(item,index){
    
      Swal.fire({
            text:'¿Desea eliminar el tipo de tutoria '+item.nombre+'?',
            icon:'warning',
            confirmButtonText: 'Eliminar',
             confirmButtonColor:'#0097A7',
            cancelButtonText: 'Cancelar',
            cancelButtonColor:'C4C4C4',
            showCancelButton: true,
            showConfirmButton: true,
            //html:' <div >Hello</div>',

        }).then((result) => {
            if (result.value) {
              Swal.fire({
                icon:'success',
                text:'El tipo de tutoria ha sido eliminado',
                confirmButtonText:'Confirmo' ,
                confirmButtonColor:'#0097A7'
                }
              )
              let params ={usuario_actualizacion:this.miUsuario.id_usuario}
              //aqui iriía el eliminar

              Axios.post('/TipoTutoria/eliminar/'+item.id_tipo_tutoria,params)
                .then(response=>{
                  response
                  
                  this.$store.state.tipostutorias.splice(index, 1); //  
                 

                })
                .catch(e=>{
                  console.log('catch del eliminar',e);
                   Swal.fire({
                    text:"Estamos teniendo problemas al eliminar este tipo de tutoria. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });

                });

            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              Swal.fire({
                text:'Se ha cancelado la eliminación',
                icon:'warning',
                confirmButtonColor:'#0097A7',}
              )
            }
          })
   }, // eliminart
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    nuevo(){
      this.$router.push('/tiposdeTutoria/0');
    },


  }
}
</script>
<style scoped>
.formUsuario { 
  font-size: 20px;
}

  body{
    background-image: null;
    background-color: #B2EBF2;
  }
  .form-control {
    border-radius: 1.25rem;  
    border: 1px solid #757575;
    margin-bottom: 10px;
    width: 100%;
  }


.btn-derecha{
   margin-top: 5px;
}  
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}


</style>