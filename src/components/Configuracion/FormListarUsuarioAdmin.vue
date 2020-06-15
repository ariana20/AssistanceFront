<template>
  <div class="FormListarUsuario">
    <div style="margin-left:5%;text-align: left">
      <div style="heigth:20%">
        <div style="float:left;">
          <h5 class="col-sm-4 title-container">Buscar: </h5>
        </div>
        <div style="float: left;width:40vw">
          <input v-on:change="Buscar(nombre)" class="col-sm-6 form-control" style="top:26px" v-model="nombre" placeholder="Ingrese un nombre">
        </div>
      </div>
      <br>
      <div style="margin-top:7%;width:100%;display:block ruby">
      <div style="overflow: auto;width:100%;">
        <table class="table" style="width:99%">
          <thead>
            <tr>
              <th scope="col" style="width:5%">Codigo</th>
              <th scope="col" style="width:15%">Nombre</th>
              <th scope="col" style="width:25%">Correo</th>
              <th scope="col" style="width:25%">Programa (Tipo de Usuario)</th>
              <!-- <th scope="col">Modif/Elim</th> -->
            </tr>
          </thead>
          <tbody v-if="$store.state.usuariosA!=null">
            <tr v-for="(item, index) in $store.state.usuariosA.data"  :key="index">
              <th scope="row">{{item.codigo}}</th>
              <td>{{item.nombre}} {{item.apellidos}}</td>
              <td>{{item.correo}}</td>   
              <!-- va a cambiar, me daran nombre -->
              <td style="width:50%">
                <div class="row" v-for="(itema,index) in item.usuario_x_programas" :key="index" style="text-align:center;margin-left:0">
                  <span v-if="itema.programa">{{itema.programa.nombre}}</span>
                  <span v-else> Sin Asignar </span>
                  <span style="margin-left:5px"> ({{itema.tipo_usuario.nombre}})</span>
                  <hr v-if="item.usuario_x_programas.length > 1" style="border: 0px solid #757575;width:100%">
                </div>  
                <div v-if="item.usuario_x_programas.length == 0" >
                  <span> Sin Asignar </span>
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
      </div>
      </div>
      <div v-if="$store.state.usuariosA!=null">
      <nav aria-label="Page navigation example">
				<ul class="pagination justify-content-center">
					<li class="page-item" v-if="$store.state.usuariosA.current_page > 1">
						<a class="page-link" href="#" tabindex="-1" @click.prevent="Page($store.state.usuariosA.current_page - 1)" style="color:rgb(0, 152, 146)">
							<span>Anterior</span>
						</a>
					</li>
					<li class="page-item" v-for="page in $store.state.usuariosA.last_page" :key="page">
						<a  v-if="page != $store.state.usuariosA.current_page" class="page-link" href="#" @click.prevent="Page(page)" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ page }}
						</a>
						<a v-else class="page-link" href="#" style="color:rgb(0, 152, 146)">
              <span class="sr-only">(current_page)</span>
              {{ page }}
						</a>
					</li>
					<li class="page-item" v-if="$store.state.usuariosA.current_page < $store.state.usuariosA.last_page">
						<a class="page-link" href="#" @click.prevent="Page($store.state.usuariosA.current_page + 1)" style="color:rgb(0, 152, 146)">
							<span>Siguiente</span>
						</a>
					</li>
				</ul>
			</nav>
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
       this.listarUsuarios(); } 
  },
  methods:{
    listarUsuarios() {
      axios.post('/usuarios/listarTodo')
      .then(res =>{
        this.$store.state.usuariosA=res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    Buscar(n) {
      let obj = { busqueda: n}
      axios.post('/usuarios/listarTodo',obj)
      .then(res =>{
        this.$store.state.usuariosA=res.data;
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
        this.$store.state.usuariosA=res.data;
        console.log('usuarios: ',res.data.data);
        
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