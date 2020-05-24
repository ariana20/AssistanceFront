<template>
  <div class="FormListarUsuario">
    <div class="container">
       <div style="text-align:right" >
          <tr style="text-align:left"><td>Buscar</td>   <td> <input type="text" v-model="nombre"></td>
          
                <router-link to="/Usuario/0"> 
                  <button  type="button" class="btn btn-info">Añadir</button>
                </router-link>
                  </tr>  
                   </div>   

              
      <table>
      <tbody>
        
          <!-- <td >  -->
          <!-- </td> -->
         
      </tbody>
      </table>
      <table class="table" >
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Tipo de Usuario</th>
            <th scope="col">Modif/Elim</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usuariosFiltrados"  :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.nombre}}</td>
            <td>{{item.correo}}</td>   
            <!-- va a cambiar, me daran nombre -->
            <!-- <div  v-for="e in TodosarrayTU" :key="e.id">
              <td style="width:645px" v-if="e.id_tipo_usuario == item.pivot.id_tipo_usuario">
                    <span >{{e.nombre}}</span>  
              </td>
            </div> -->
            <td style="text-align: center">
               <router-link :to="{name: 'GestionarUsuario', params: {id: item.id_usuario}}"> 
              <button class="btn link"><b-icon icon="pencil"></b-icon></button>
              </router-link>              
              <button class="btn link"><b-icon icon="dash-circle-fill"  v-on:click="eliminarUsuario(item.id_usuario)"></b-icon></button>
              
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
     if(this.$store.state.usuariosA === null) {     this.listarUsuarios(); } //}
    else this.usuarios = this.$store.state.usuariosA; //
  },
  methods:{
    //4 es el id del programa de admin
    //1 es el id tipo usuario de admin
    //2 es el id de usuairo admin
     listarTUsuarios() {
      Axios.post('/tipoUsuarios/listarTodo')
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
    
     if(this.$store.state.tipoActual.nombre!="Admin"){
        Axios.post('/programa/usuarioPrograma/'+this.$store.state.programaActual.id_programa) //Por ahora dsp será x program
        .then(res =>{
          console.log(res.data);          
          this.usuarios=res.data;
                   
        })
        .catch(e => {
          console.log(e.response);
        })
     }
     else{
       //esa admin le debe de listar todos los usuarios
       Axios.post('/usuarios/listarTodo') //Por ahora dsp será x program
        .then(res =>{
                 
          this.usuarios=res.data;
          console.log('Usuarios[0].usuario ',this.usuarios[0].usuario);   
                   
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
              Axios.create({withCredentials: true }).post('/usuarios/eliUsuarioPrograma/'+id)
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
