<template>
  <div class="FormListarUsuario">
    <div class="container" style="margin-left:100px;text-align: left">
      <div class="top-titulo">
            <h4 class="col-sm-4 title-container">Buscar: </h4>
            <input class="col-sm-6 form-control" style="top:26px;right:230px;" v-model="nombre" placeholder="Ingrese nombre del usuario">
            <div class="botones">
            <button type="button" class="btn btn-info" style="text-align:right">Añadir</button>
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
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Programa (Tipo de Usuario)</th>
            <th scope="col">Modif/Elim</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usuariosFiltrados"  :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.nombre}} {{item.apellidos}}</td>
            <td>{{item.correo}}</td>   
            <!-- va a cambiar, me daran nombre -->
            <td style="width:50%">
              <div class="row" v-for="(item,index) in item.usuario_x_programas" :key="index" style="text-align:center">
                <span>{{item.programa.nombre}} ({{item.tipo_usuario.nombre}})</span>
              </div>  
            </td>
            <td style="text-align: center">
              <div class="row" style="width:115px">
                <button class="btn link"><b-icon icon="pencil"></b-icon></button>
                <button class="btn link"><b-icon icon="dash-circle-fill"  v-on:click="eliminarUsuario(item.id_usuario)"></b-icon></button>
              </div>              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data(){
    return{
      
      usuarios:[],
      //id_tipoXUsuario:[],
      cantU:null,
      TodosarrayTU:[],
      tipoXUsuario:[],
      miUsuario:this.$store.state.usuario, //Para sacar el id del programa

      
    }
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
          usuariosFiltrados: 'filtrarUsuariosAdmin'
        })
  },
  mounted(){
    console.log('Store state usuariosA',this.$store.state.usuariosA);
     if(this.$store.state.usuariosA === null  ) {     
       this.listarUsuarios(); } //}
    else this.usuarios = this.$store.state.usuariosA; //
  },
  methods:{
    //4 es el id del programa de admin
    //1 es el id tipo usuario de admin
    //2 es el id de usuairo admin
     listarTUsuarios() {
      axios.post('/tipoUsuarios/listarTodo')
        .then(res =>{
          // Ordenadito
          let par=res.data;
          this.TodosarrayTU=par;
          console.log(res.data);
          
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    listarUsuarios() {
    console.log('Estoy en listarU,mi rol es:');
     if(this.$store.state.tipoActual.nombre!="Admin"){
        axios.post('/programa/usuarioPrograma/'+this.$store.state.programaActual.id_programa) //Por ahora dsp será x program
        .then(res =>{
          console.log(res.data);          
          this.$store.state.usuarios=res.data;
          console.log(this.$store.state.tipoActual.nombre);
                   
        })
        .catch(e => {
          console.log(e.response);
        })
     }
     else{
       //esa admin le debe de listar todos los usuarios
       axios.post('/usuarios/listarTodo') //Por ahora dsp será x program
        .then(res =>{
          console.log('Respuesta: ')
          console.log(res.data)
          this.$store.state.usuariosA=res.data;
                   
        })
        .catch(e => {
          console.log(e.response);
          //DEBE DE HABER UNMENSAJITO AQUI
        })
     }
      
       
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