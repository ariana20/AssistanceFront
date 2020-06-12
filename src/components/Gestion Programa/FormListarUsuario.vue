<template>
  <div class="FormListarUsuario container"  style="margin-top:10px">
    <!-- para que lo vea bien un coordinador -->
    <div class="row top-titulo" style="text-align: left">
      <div class="col-sm-6 top-titulo">
            <h5 class="col-sm-6 "  style="top:13px;" >Nombre o Código: </h5>
            <input class="col-sm-6 form-control" style="top:13px;" 
                   v-model="nombre" placeholder="Buscar por nombre"  >
           
      </div>
      <!-- <div class="row col-sm-6"  style="margin:10px;font-size:20px">Nombre o Código:  
        <input placeholder="Busca por nombre o código" class="input row col-sm-6 form-control" style="left:25px;" type="text"  v-model="nombre">  
        <router-link to="/Usuario/0"> 
        <button  type="button" style="border-radius: 10px;margin-right:50px" class="row btn btn-info">Añadir</button>
      </router-link>
      </div> -->
     
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
            <td >
                <b-icon v-if="item.estado == 'act'" icon="check" style="color:green;width:35px; height:35px;padding:0px"/>
                <b-icon v-else icon="x" style="color:#757575;width:35px; height:35px;padding:0px"/>
            </td>
              <td>{{item.tipo_usuario[0].nombre}}</td>
            <td  >
               <router-link :to="{name: 'GestionarUsuario', params: {id: item.id_usuario}}"> 
              
                <b-icon icon="pencil" style="color:#0097A7;margin-right:20px;width:20px; height:20px;" v-on:click="llenarUsuarioEscogido(item)"></b-icon>
                
              </router-link>              
              
                <b-icon icon="dash-circle-fill" style="color:#757575;width:20px; height:20px;"  v-on:click="eliminarUsuario(item,index)"></b-icon>
                
              
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
      <!-- MODAL CARGANDO  -->
      <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando... 
      </div>
      </b-modal>

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
    
    listarUsuarios(page) {
    this.showModal();
    console.log(this.$store.state.programaActual.id_programa);
    var url='/programa/usuarioPrograma/'+this.$store.state.programaActual.id_programa+'?page='+page;
     if(this.$store.state.tipoActual.nombre!="Admin"){ //Para coordinador
        axios.post(url) //Por ahora dsp será x program
        .then(res =>{
          console.log('Usuarios ',res.data.tasks.data);    
          //ordenado por estado
          let par=res.data.tasks.data;  
          this.$store.state.usuarios=par.sort((a, b) => { return a.estado.localeCompare(b.estado) && a.nombre.localeCompare(b.nombre);});    
          //this.$store.state.usuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
          this.paginate=res.data.paginate;
          // this.$store.state.usuarios=res.data;
          console.log(this.$store.state.tipoActual.nombre);
            this.hideModal();
                   
        })
        .catch(e => {
          console.log(e.response);
            this.hideModal();
          //Swal de problema
           Swal.fire({
                    text:"Estamos teniendo problemas al listar los uusarios. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
           });

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
   },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
   
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
    flex: 1;
    /* width: 100%; */
    
}
.btn-derecha{
   margin-top: 5px;
}  

.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}

</style>
