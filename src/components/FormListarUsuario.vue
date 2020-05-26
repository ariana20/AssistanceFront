<template>
  <div class="FormListarUsuario container"  style="margin-top:20px">
    <!-- para que lo vea bien un coordinador -->
    <div class="row top-titulo">
      <div class="row col-sm-4 tutoria-title" style="margin:10px;">Buscar: 
        <input style="left:25px;" placeholder="Busque por nombre" class="row col-sm-8 form-control" type="text" v-model="nombre">  </div>
                <div style="margin-right:600px"></div>
                <div class="row btn-derecha" >
                <router-link to="/Usuario/0"> 
                  <button  type="button" style="margin-right:10px" class="row btn btn-info">Añadir</button>
                </router-link>
                </div>  
         

      <table class="table" >
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Estado</th>
            <th scope="col">Tipo de Usuario</th>
            <th scope="col">Modif/Elim</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usuariosFiltrados"  :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.nombre}}</td>
            <td>{{item.correo}}</td>  
            <td>{{item.estado}}</td>    
            <!-- va a cambiar, me daran nombre -->
            <div  v-for="e in TodosarrayTU" :key="e.id">
              <td style="width:585px" v-if="e.id_tipo_usuario == item.pivot.id_tipo_usuario">
                    <span >{{e.nombre}}</span>  
              </td>
            </div>
            <td style="text-align: center">
               <router-link :to="{name: 'GestionarUsuario', params: {id: item.id_usuario}}"> 
              <button class="btn link"><b-icon icon="pencil"  v-on:click="llenarUsuarioEscogido(item)"></b-icon></button>
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
      state:{
        usuarioEscogido:null,}
      
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
          usuariosFiltrados: 'filtrarUsuarios'
        })
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
    
    this.listarTUsuarios();
    console.log('Store state usuariosA',this.$store.state.usuariosA);
     if(this.$store.state.usuarios === null  ) {     
       this.listarUsuarios(); } //}
    else this.usuarios = this.$store.state.usuarios; //
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
    console.log(this.$store.state.programaActual.id_programa);
     if(this.$store.state.tipoActual.nombre!="Admin"){ //Para coordinador
        axios.post('/programa/usuarioPrograma/'+this.$store.state.programaActual.id_programa) //Por ahora dsp será x program
        .then(res =>{
          console.log('Usuarios ',res.data);          
          this.$store.state.usuarios=res.data;
          console.log(this.$store.state.tipoActual.nombre);
                   
        })
        .catch(e => {
          console.log(e.response);
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
              axios.post('/usuarios/eliUsuarioPrograma/'+id)
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
   }, // eliminart
   llenarUsuarioEscogido(item){
      console.log('usuario escogido :',item);
      this.$store.state.usuarioEscogido=item;
      console.log('usuario escogido en store:',this.$store.state.usuarioEscogido);
      this.usuarioEscogido=item;
   }
   
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
    border: 2px solid #757575;
    margin-bottom: 10px;
    /* width: 100%; */
    
}
.btn-derecha{
   margin-top: 5px;
}  
</style>