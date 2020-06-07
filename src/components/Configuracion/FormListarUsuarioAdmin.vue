<template>
  <div class="FormListarUsuario">
    <div class="container" style="margin-left:100px;text-align: left">
      <div class="top-titulo">
            <h4 class="col-sm-4 title-container">Buscar: </h4>
            <input v-on:change="Buscar(nombre)" class="col-sm-6 form-control" style="top:26px;right:230px;" v-model="nombre" placeholder="Ingrese nombre del usuario">
            <div class="botones">
            <!-- <button type="button" class="btn btn-info" style="text-align:right">Añadir</button> -->
            </div>
      </div>
    <!-- para que lo vea bien un coordinador
    <div class="row top-titulo">
      <div class="row col-sm-4 tutoria-title" style="margin:10px;">Buscar: 
        <input style="left:25px;" placeholder="Busque por nombre" class="row col-sm-8 form-control" type="text" v-model="nombre">  </div>
                <div style="margin-right:600px"></div>
                <div class="row btn-derecha" >
                <router-link to="/Usuario/0"> 
                  <button  type="button" style="margin-right:10px" class="row btn btn-info">Añadir</button>
                </router-link>
                </div>  -->
      
      <table class="table" >
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Programa (Tipo de Usuario)</th>
            <!-- <th scope="col">Modif/Elim</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in $store.state.usuariosA"  :key="index">
            <th scope="row">{{item.codigo}}</th>
            <td>{{item.nombre}} {{item.apellidos}}</td>
            <td>{{item.correo}}</td>   
            <!-- va a cambiar, me daran nombre -->
            <td style="width:50%">
              <div class="row" v-for="(item,index) in item.usuario_x_programas" :key="index" style="text-align:center">
                <span v-if="item.programa">{{item.programa.nombre}}</span>
                <span v-else> Sin Asignar </span>
                <span style="margin-left:5px"> ({{item.tipo_usuario.nombre}})</span>
              </div>  
            </td>
            <!-- <td style="text-align: center">
              <div class="row" style="width:115px">
                <button class="btn link"><b-icon icon="pencil"></b-icon></button>
                <button class="btn link"><b-icon icon="dash-circle-fill"  v-on:click="eliminarUsuario(item.id_usuario)"></b-icon></button>
              </div>              
            </td> -->
          </tr>
        </tbody>
      </table>
      <div class="row" style="text-align:center">
        <button v-if="usuarios.current_page!=1" v-on:click="Page(usuarios.current_page-1)"> <b-icon icon="arrow-left-circle"/> </button>
        <button v-else disabled> <b-icon icon="arrow-left-circle"/> </button>
        <div v-for="n in usuarios.last_page" :key="n" >
            <button v-if="n != usuarios.current_page" v-on:click="Page(n)">
              {{n}}
            </button>
            <button v-else disabled>
              {{n}}
            </button>
        </div>
        <button v-if="usuarios.current_page!=usuarios.last_page" v-on:click="Page(usuarios.current_page+1)"> <b-icon icon="arrow-right-circle"/> </button>
        <button v-else disabled> <b-icon icon="arrow-right-circle"/> </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data(){
    return{
      nombre:null,
      usuarios:[],
      //id_tipoXUsuario:[],
      cantU:null,
      TodosarrayTU:[],
      tipoXUsuario:[],
      miUsuario:this.$store.state.usuario, //Para sacar el id del programa

      
    }
  },
 
  // computed:{
  //       nombre:{
  //         get(){
  //             return this.$store.state.filtro.query;
  //         },
  //         set(val){
  //             this.$store.commit('SET_QUERY',val);
  //         }
  //       },
  //       ...mapGetters({
  //         usuariosFiltrados: 'filtrarUsuariosAdmin'
  //       })
  // },
  mounted(){
    console.log('Store state usuariosA',this.$store.state.usuariosA);
     if(this.$store.state.usuariosA === null  ) {     
       this.listarUsuarios(); } //}
    else this.usuarios = this.$store.state.usuariosA; //
  },
  methods:{
    listarUsuarios() {
      axios.post('/usuarios/listarTodo')
      .then(res =>{
        this.$store.state.usuariosA=res.data.data;
        this.usuarios = res.data
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    Buscar(n) {
      let obj = { busqueda: n}
      axios.post('/usuarios/listarTodo',obj)
      .then(res =>{
        this.$store.state.usuariosA=res.data.data;
        this.usuarios = res.data
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    Page(n) {
      let obj;
      if(this.nombre!='') obj = {page: n, busqueda: this.nombre}
      else obj = { page: n}
      axios.post('/usuarios/listarTodo',obj)
      .then(res =>{
        this.$store.state.usuariosA=res.data.data;
        this.usuarios = res.data
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    eliminarUsuario(id){
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
                text:'El usuario ha sido eliminado',
                confirmButtonText:'Confirmo' ,
                confirmButtonColor:'#0097A7'
                }
              )
              //aqui iriía el eliminar
              //ESte eliminar no debería estar.Debería ser un eliminar del programa
              axios.post('/usuarios/eliminar/'+id)
              .then(res =>{
              // Ordenadito
                    console.log(res);
                     let index = this.$store.state.usuarios.indexOf( //
                    function(element){
                      return element.id_tipo_tutoria === id; //
                    })
                  this.$store.state.usuarios.splice(index, 1); //
          
                })
                .catch(e => {
                  console.log(e.response);
                })

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
    border: 0.5px solid #757575;
    margin-bottom: 10px;
    width: 100%;
}
.btn-derecha{
   margin-top: 0px;
}  
</style>