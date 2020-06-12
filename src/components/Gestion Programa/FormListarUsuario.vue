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
        <button  type="button" style="border-radius: 10px;margin-right:50px" class="row btn btn-info">Añadir</button>
      </router-link>
      </div>  
         

      <table responsive class="table" style="text-align:left" >
        <thead>
          <tr>
            <th scope="col" style="width:100px">Código</th>
            <th scope="col" style="width:200px">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Estado</th>
            <th scope="col">Tipo de Usuario</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usuariosFiltrados"  :key="index">
            <td v-if="item!=undefined">{{item.codigo}}</td>
            <td v-if="item!=undefined">{{item.nombre}}</td>
            <td v-if="item!=undefined">{{item.correo}}</td>  
            <td style="font-size:30px">
                <b-icon v-if="item.estado == 'act'" icon="check" style="color:green"/>
                <b-icon v-else icon="x" style="color:#757575"/>
            </td>
              <td>{{item.tipo_usuario[0].nombre}}</td>
            <td style="text-align:right" >
               <router-link :to="{name: 'GestionarUsuario', params: {id: item.id_usuario}}"> 
              <button class="btn link"><b-icon icon="pencil" style="color:#0097A7;margin-left:-120px" v-on:click="llenarUsuarioEscogido(item)"></b-icon></button>
              </router-link>              
              <button class="btn link"><b-icon icon="dash-circle-fill" style="color:#757575;margin-left:-100px"  v-on:click="eliminarUsuario(item,index)"></b-icon></button>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation example">
				<ul class="pagination justify-content-center">
					<li class="page-item" v-if="paginate.current_page > 1">
						<a class="page-link" href="#" tabindex="-1" @click.prevent="changePage(paginate.current_page - 1)" style="color:rgb(0, 152, 146)">
							<span>Anterior</span>
						</a>
					</li>
					<li class="page-item" v-for="page in pagesNumber" :key="page">
							<a class="page-link" href="#" @click.prevent="changePage(page)" style="color:rgb(0, 152, 146)">
								<span class="sr-only">(current_page)</span>
								{{ page }}
						</a>
					</li>
					<li class="page-item" v-if="paginate.current_page < paginate.last_page">
						<a class="page-link" href="#" @click.prevent="changePage(paginate.current_page + 1)" style="color:rgb(0, 152, 146)">
							<span>Siguiente</span>
						</a>
					</li>
				</ul>
			</nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data(){
    return{
      keeps:[],
			paginate:{
				'total': 0,
				'current_page': 0,
				'per_page': 0,
				'last_page': 0,
				'from': 0,
				'to': 0
			},
			offset: 3,
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
        isActived: function(){
          return this.paginate.current_page;
        },
        pagesNumber: function(){
          if(!this.paginate.to){
            return [];
          }
          var from = this.paginate.current_page - 2;
          if(from<1){//debe ser un numero positivo
            from=1;
          }
          var to=from+(2 * 2);//TO DO
          if(to >= this.paginate.last_page){
            to=this.paginate.last_page;
          }
          //calculo de la numeracion exacta
          var pagesArray=[];
          while(from<=to){
            pagesArray.push(from);
            from++;
          }
          return pagesArray;
        },
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
		changePage: function(page){
			this.paginate.current_page=page;
			this.listarUsuarios(page);//trae un nuevo listadp
			event.preventDefault();
		},
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
    listarUsuarios(page) {
    console.log(this.$store.state.programaActual.id_programa);
    var url='/programa/usuarioPrograma/'+this.$store.state.programaActual.id_programa+'?page='+page;
     if(this.$store.state.tipoActual.nombre!="Admin"){ //Para coordinador
        axios.post(url) //Por ahora dsp será x program
        .then(res =>{
          console.log('Usuarios ',res.data);    
          //ordenado por estado
          let par=res.data.tasks.data;      
          this.$store.state.usuarios=par.sort((a, b) => { return a.estado.localeCompare(b.estado);});
          this.paginate=res.data.paginate;
          // this.$store.state.usuarios=res.data;
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
