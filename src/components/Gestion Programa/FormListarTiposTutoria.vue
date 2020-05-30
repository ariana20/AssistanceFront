<template>
  <div class="FormRoles container" style="margin-top:20px">
        <div class="row top-titulo">
        <div class="row col-sm-4 tutoria-title"  style="margin:10px;font-size:20px">Nombre:  
        <input placeholder="Busque por nombre" class="row col-sm-8 form-control" style="left:25px;" type="text" v-model="nombre" onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)  )" >  
        </div>
        <div style="margin-right:500px"></div>
        <div class="row btn-derecha" >
                <router-link to="tiposdeTutoria/0"> 
                  <button  type="button"  style="text-align:right;border-radius: 10px;" class="btn btn-info">Añadir</button>
           </router-link></div>    
  <!-- </tr> -->

      <table class="table" style="text-align:left" >
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
            <td style=";font-size:30px">
                <b-icon v-if="item.estado == 'act'" icon="check" style="color:green"/>
                <b-icon v-else icon="x" style="color:#757575"/>
            </td>     
            <td  style="text-align: center">
                 <router-link :to="{name: 'TiposTutoria', params: {id: item.id_tipo_tutoria}}"> 
                <button  class="btn link">         
                <b-icon style="color:#0097A7" icon="pencil"/></button>
                       </router-link>  
                <button v-on:click="eliminarTtutoria(item.id_tipo_tutoria)" class="btn link">
                  <b-icon style="color:#757575" icon="dash-circle-fill"/>
                </button>
            </td>
          
          </tr>
        </tbody>
      </table>
    </div>

      
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
    
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
    console.log('mi programa actual: ',this.$store.state.programaActual);
    if(this.$store.state.tipostutorias === null) this.listarTT(); //
    else this.tipostutorias = this.$store.state.tipostutorias; //
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
    //   this.axios.post('/TipoTutoria/listarTodo/'+this.programas.id) //
      Axios.post('/TipoTutoria/listarTodo/'+ this.miprog.id_programa)
        .then(response=>{
          // Ordenadito por estado
           let par=response.data;
           this.$store.state.tipostutorias=par.sort((a, b) => { return a.estado.localeCompare(b.estado);});

            // this.$store.state.tipostutorias = response.data; //

            console.log('Listado de tt: ',this.$store.state.tipostutorias)
        })
        .catch(e=>console.log(e));
    },
    Editar(id){
      this.$router.push('/tiposdeTutoria/'+id); //
    },
    
    eliminarTtutoria(id){
        console.log('Id del tipo de tutoria a eliminar: ',id);
      Swal.fire({
            text:'¿Desea eliminar?',
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
              //aqui iriía el eliminar
              Axios.post('/TipoTutoria/eliminar/'+id)
                .then(response=>{
                  console.log(response);
                  console.log('eliminaré a :', this.$store.state.tipostutorias.id_tipo_tutoria);
                  let index = this.$store.state.tipostutorias.indexOf( //
                    function(element){
                      return element.id_tipo_tutoria === id; //
                    })
                  this.$store.state.tipostutorias.splice(index, 1); //
                })
                .catch(e=>console.log(e));

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
   } // eliminart

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
    .tutoria-title{
    margin-top: 30px;
    margin-bottom: 20px;
    }

.btn-derecha{
   margin-top: 5px;
}  
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}


</style>