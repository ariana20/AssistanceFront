<template>
  <div class="FormRoles" style="margin-top:20px">
    <div class="container" style="left:60px;text-align: left">
        <tr style="text-align:left"></tr>
          <tr style="text-align:left"><td>Buscar</td>   <td> <input type="text" v-model="nombre"></td>
          
        
             <div style="text-align:right" >
                <router-link to="tiposdeTutoria/0"> 
                  <button  type="button" class="btn btn-info">Añadir</button>
                </router-link></div>    
  </tr>
      <table style="margin-bottom:20px">
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          
          
        
          <!-- <td >  -->
          <!-- </td> -->
        
        </td>
      </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col" style="text-align: center">Modif/Elim</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tipostutoriasFiltrados" :key="index">
            <td>{{item.nombre}}</td>             
            <td  style="text-align: center">
                 <router-link :to="{name: 'TiposTutoria', params: {id: item.id_tipo_tutoria}}"> 
                <button  class="btn link">         
                <b-icon icon="pencil"/></button>
                       </router-link>  
                <button v-on:click="eliminarTtutoria(item.id_tipo_tutoria)" class="btn link"><b-icon icon="dash-circle-fill"/>
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
    console.log(this.$store.state.programaActual);
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
            this.$store.state.tipostutorias = response.data; //
            console.log(this.$store.state.tipostutorias)
        })
        .catch(e=>console.log(e));
    },
    Editar(id){
      this.$router.push('/tiposdeTutoria/'+id); //
    },
    
    eliminarTtutoria(id){
        console.log(id);
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
                icon:'success!',
                text:'El tipo de tutoria ha sido eliminado',
                confirmButtonText:'Confirmo' ,
                confirmButtonColor:'#0097A7'
                }
              )
              //aqui iriía el eliminar
              Axios.post('/TipoTutoria/eliminar/'+id)
                .then(response=>{
                  console.log(response);
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
                confirmButtonColor:'#0097A7',}
              )
            }
          })
   } // eliminart

  }
}
</script>