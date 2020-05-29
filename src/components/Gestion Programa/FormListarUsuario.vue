<template>
  <div class="FormListarUsuario container"  style="margin-top:20px">
    <!-- para que lo vea bien un coordinador -->
    <div class="row top-titulo" style="text-align: left">
    
      <div class="row col-sm-4 tutoria-title"  style="margin:10px;font-size:20px">Nombre o Código:  
        <input placeholder="Nombre o código" class="input row col-sm-6 form-control" style="left:25px;" type="text"  id="nombres"  v-model="nombre">  
        </div>
        <!-- <div class="row col-sm-4 tutoria-title"  style="margin:10px;font-size:25px">Codigo:  
        <input placeholder="Busque por Código" class="row col-sm-8 form-control" style="left:25px;" type="text" id="codigos" v-model="codigo">  
        </div> -->
        
      <div class="row btn-derecha" >
      <router-link to="/Usuario/0"> 
        <button  type="button" style="margin-right:50px" class="row btn btn-info">Añadir</button>
      </router-link>
      </div>  
         

      <table class="table" style="text-align:left" >
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Código</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Estado</th>
            <th scope="col">Tipo de Usuario</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usuariosFiltrados"  :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.codigo}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.correo}}</td>  
            <td style="font-size:30px">
                <b-icon v-if="item.estado == 'act'" icon="check" style="color:green"/>
                <b-icon v-else icon="check" style="color:#757575"/>
            </td>
              <td>{{item.tipo_usuario[0].nombre}}</td>
            <td style="text-align:right" >
               <router-link :to="{name: 'GestionarUsuario', params: {id: item.id_usuario}}"> 
              <button class="btn link"><b-icon icon="pencil" style="margin-left:-120px" v-on:click="llenarUsuarioEscogido(item)"></b-icon></button>
              </router-link>              
              <button class="btn link"><b-icon icon="dash-circle-fill" style="margin-left:-100px"  v-on:click="eliminarUsuario(item,index)"></b-icon></button>
              
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
        }),
        // codigo:{
        //   get(){
        //       return this.$store.state.filtro.query;
        //   },
        //   set(val){
        //       this.$store.commit('SET_QUERY',val);
        //   }
        // },
        // ...mapGetters({
        //   usuariosFiltrados2: 'filtrarUsuariosCod'
        // })
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
    
    this.listarTUsuarios();
    console.log('Store state usuariosA',this.$store.state.usuariosA);
     if(this.$store.state.usuarios == null  ) {     
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
    eliminarUsuario(item,index){
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
              let param = {
                id_usuario:item.id_usuario,
                tipo_usuario:item.pivot.id_tipo_usuario,
                id_programa:item.pivot.id_programa,
              }
              //aqui iriía el eliminar
              //ESte eliminar no debería estar.Debería ser un eliminar del programa
              axios.post('/usuarios/eliUsuarioPrograma',param)
              .then(res =>{
              // Ordenadito
                    console.log(res);
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
    border: 1px solid #757575;
    margin-bottom: 10px;
    /* width: 100%; */
    
}
.btn-derecha{
   margin-top: 5px;
}  
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}
</style>
