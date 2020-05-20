<template>
  <div class="FormRoles" style="margin-top:20px">
    <div class="container" style="left:60px;text-align: left">
      <table style="margin-bottom:20px">
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left">
            <div style="text-align:right">
            <router-link to="tiposdeTutoria/0"> 
                  <button  type="button" class="btn btn-info">Añadir</button>
                </router-link></div>  
          </tr>
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
          <tr v-for="(item, index) in $store.state.roles" :key="index">
            <td>{{item.nombre}}</td>
            <td  style="text-align: center"><button v-on:click="Editar(item.id_tipo_tutoria)" class="btn link"><b-icon icon="pencil"/></button>
            <button v-on:click="eliminarTtutoria(item.id_tipo_tutoria)" class="btn link"><b-icon icon="dash-circle-fill"/></button></td>
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
      programas:[] //
    }
  },
  created(){
    if(this.$store.state.programas === null) this.listarRoles(); //
    else this.programas = this.$store.state.programas; //
  },
  computed:{
        nombre:{
            get(){
                return this.$store.state.programasFilter.query; //
            },
            set(val){
                this.$store.commit('SET_QUERY',val);
            }
        },
        ...mapGetters({
            programasFiltrados: 'filtrarProgramas' //
        })
  },
  methods:{
    
    listarRoles() {
    //   this.axios.post('/TipoTutoria/listarTodo/'+this.programas.id) //
      Axios.post('/TipoTutoria/listarTodo/4')
        .then(response=>{
            this.$store.state.roles = response.data; //
            console.log(this.$store.state.roles)
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
                  let index = this.$store.state.roles.indexOf( //
                    function(element){
                      return element.id_tipo_tutoria === id; //
                    })
                  this.$store.state.roles.splice(index, 1); //
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