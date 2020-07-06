<template>
  <div class="FormListarUsuario contenedor">
    <div style="text-align: left">
      <div class="row" style="width:100%">
        <div class="form-inline col-12 col-md-2 col-lg-1">
          <h5 style="margin-top:10%;margin-bottom:5%">Buscar: </h5>
        </div>
        <div class="form-inline col-12 col-md-4">
          <input v-on:change="Buscar(nombre)" class="form-control" style="margin-top:3%" v-model="nombre" placeholder="Ingrese un nombre">
        </div>
        <div class="form-inline col-12 col-md-2 offset-md-2 offset-lg-4">
          <button  type="button" style="border-radius: 10px" @click="nuevo()" class="btn btn-info">Añadir</button>
        </div>
      </div>

      <br>
      <div style="width:100%;display:block ruby">
      <div style="overflow: auto;width:95%;">
        <table class="table" style="width:99%">
          <thead>
            <tr>
              <th scope="col" style="width:5%">Codigo</th>
              <th scope="col" style="width:20%">Nombre</th>
              <th scope="col" style="width:25%">Correo</th>
              <th scope="col" style="width:25%">Programa (Tipo de Usuario)</th>
              <th scope="col">Estado</th>
              <th scope="col">Modif/Elim</th>
            </tr>
          </thead>
          <tbody v-if="$store.state.usuariosA!=null">
            <tr v-for="(item, index) in $store.state.usuariosA.data"  :key="index">
              <td>
                <div v-if="item.codigo!=null">{{item.codigo}}</div>
                <div v-else>Pendiente</div>
              </td>
              <td>{{item.nombre}} {{item.apellidos}}</td>
              <td>{{item.correo}}</td>   
              <!-- va a cambiar, me daran nombre -->
              <td style="width:50%">
                <div class="row">
                  <div v-for="(itema,index) in item.usuario_x_programas" :key="index" style="text-align:center;margin-left:2%">
                    <div v-if="index!=item.usuario_x_programas.length-1 && itema.programa">{{itema.programa.nombre+" ("+itema.tipo_usuario.nombre+")"+","+" "}}</div>
                    <div v-else-if="itema.programa">{{itema.programa.nombre+" ("+itema.tipo_usuario.nombre+")"}}</div>
                    <div v-else> Sin Asignar </div>
                  </div>  
                  <div v-if="item.usuario_x_programas.length == 0" style="text-align:center;margin-left:2%">
                    <span> Sin Asignar </span>
                  </div>
                </div>  
              </td>
              <td style=";font-size:30px;text-align:center">
                  <b-icon v-if="item.estado == 'act'" icon="check" style="color:green"/>
                  <b-icon v-else icon="x" style="color:#757575;width:35px; height:35px;"/>
              </td>
              <td style="text-align: center">
                <div class="row" style="width:115px">
                  <button class="btn link"><b-icon icon="pencil" v-on:click="llenarUsuarioEscogido(item)"></b-icon></button>
                  <button class="btn link"><b-icon icon="dash-circle-fill"  v-on:click="eliminarUsuario(item)"></b-icon></button>
                </div>              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div v-if="$store.state.usuariosA!=null && $store.state.usuariosA.last_page!=1">
          <nav aria-label="Page navigation example" class="paginar">
            <ul class="pagination justify-content-center">
              <li class="page-item" v-if="$store.state.usuariosA.current_page > 1">
                <a class="page-link" href="#" tabindex="-1" @click.prevent="Page($store.state.usuariosA.current_page - 1)" style="color:rgb(0, 152, 146)">
                  <span>Anterior</span>
                </a>
              </li>
              <li class="page-item">
                <a  v-if="$store.state.usuariosA.current_page!=1" class="page-link" href="#" @click.prevent="Page(1)" style="color:rgb(0, 152, 146)">
                  <span class="sr-only">(current_page)</span>
                  {{ '1' }}
                </a>
                <a v-else class="page-link" href="#" style="color:rgb(0, 152, 146)">
                  <span class="sr-only">(current_page)</span>
                  {{ '1' }}
                </a>
              </li>
              <li class="page-item" v-if="$store.state.usuariosA.last_page > 3 && $store.state.usuariosA.current_page != 2 && ($store.state.usuariosA.current_page != 1 && $store.state.usuariosA.current_page != $store.state.usuariosA.last_page)">
                <a class="page-link" href="#" style="color:rgb(0, 152, 146)">
                  <span class="sr-only">(current_page)</span>
                  {{ '...' }}
                </a>
              </li>
              <li class="page-item" v-if="$store.state.usuariosA.last_page > 2 && ($store.state.usuariosA.current_page == 1 || $store.state.usuariosA.current_page == $store.state.usuariosA.last_page)">
                <a class="page-link" href="#" style="color:rgb(0, 152, 146)">
                  <span class="sr-only">(current_page)</span>
                  {{ '...' }}
                </a>
              </li>
              <li class="page-item" v-if="$store.state.usuariosA.current_page!=1 && $store.state.usuariosA.current_page!=$store.state.usuariosA.last_page">
                <a class="page-link" href="#" style="color:rgb(0, 152, 146)">
                  <span class="sr-only">(current_page)</span>
                  {{ $store.state.usuariosA.current_page }}
                </a>
              </li>
              <li class="page-item" v-if="$store.state.usuariosA.last_page > 3 && $store.state.usuariosA.current_page != $store.state.usuariosA.last_page-1 && ($store.state.usuariosA.current_page != 1 && $store.state.usuariosA.current_page != $store.state.usuariosA.last_page)">
                <a class="page-link" href="#" style="color:rgb(0, 152, 146)">
                  <span class="sr-only">(current_page)</span>
                  {{ '...' }}
                </a>
              </li>
              <li class="page-item" v-if="$store.state.usuariosA.last_page!=1">
                <a  v-if="  $store.state.usuariosA.current_page!=$store.state.usuariosA.last_page" class="page-link" href="#" @click.prevent="Page($store.state.usuariosA.last_page)" style="color:rgb(0, 152, 146)">
                  <span class="sr-only">(current_page)</span>
                  {{ $store.state.usuariosA.last_page }}
                </a>
                <a v-else class="page-link" href="#" style="color:rgb(0, 152, 146)">
                  <span class="sr-only">(current_page)</span>
                  {{ $store.state.usuariosA.last_page }}
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
    
    <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando... 
      </div>
    </b-modal>

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
      selectedFile:null,
      selectedFiles:[],
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    this.showModal();    
    this.listarUsuarios();
  },
  methods:{
    listarUsuarios() {
      this.showModal()
      axios.post('/usuarios/listarTodo')
      .then(res =>{
        this.$store.state.usuariosA=res.data;
        this.hideModal()
      })
      .catch(e => {
        console.log(e.response);
        this.hideModal()
      })
    },
    Buscar(n) {
      this.showModal()
      let obj = { busqueda: n}
      axios.post('/usuarios/listarTodo',obj)
      .then(res =>{
        this.$store.state.usuariosA=res.data;
        this.hideModal()
      })
      .catch(e => {
        console.log(e.response);
        this.hideModal()
      })
    },
    Page(n) {
      let obj;
      this.showModal()
      if(this.nombre!='') obj = {page: n, busqueda: this.nombre}
      else obj = { page: n}
      axios.post('/usuarios/listarTodo',obj)
      .then(res =>{
        this.$store.state.usuariosA=res.data;
        this.hideModal()
      })
      .catch(e => {
        console.log(e.response);
        this.hideModal()
      })
    },
    llenarUsuarioEscogido(item){
      this.$store.state.usuarioEscogido=item;
      this.usuarioEscogido=item;
      this.$router.push('/AUsuario/'+item.id_usuario)
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

        })
        .then((result) => {
          if (result.value) {
            //this.showModal()
            //aqui iriía el eliminar
            //ESte eliminar no debería estar.Debería ser un eliminar del programa\
            axios.post('/usuarios/eliminar/'+id.id_usuario)
            .then(res =>{
              res
              let index = this.$store.state.usuariosA.data.indexOf(
              function(element){
                return element.id_usuario === id.id_usuario; 
              })
              this.$store.state.usuarios.splice(index, 1);
              this.hideModal()
              Swal.fire({
                icon:'success',
                text:'El usuario ha sido eliminado',
                confirmButtonText:'Confirmo' ,
                confirmButtonColor:'#0097A7'
                }
              )
            })
            .catch(e => {
              console.log(e.response);
              this.hideModal()
            })
          }
        })
    }, 
    onFileSelected(e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      for (let index = 0; index < files.length; index++) {
        this.createFile(files[index]);
      }
      console.log(this.selectedFiles);
    },
    createFile(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
          vm.selectedFile = e.target.result;
          vm.selectedFiles.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    subirPDFs(){
      this.showModal()
      let obj = {files:this.selectedFiles}
      axios.post('/usuarios/notas',obj)
        .then(res =>{
          this.$store.state.usuariosA=res.data;
          this.hideModal()
        })
        .catch(e => {
          console.log(e.response);
          this.hideModal()
        })
    },
    nuevo(){
      this.$router.push('/AUsuario/0');
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
    border: 0.5px solid #757575;
    margin-bottom: 10px;
    width: 100%;
}
.btn-derecha{
   margin-top: 0px;
}  

@media screen and (max-width: 800px) {
  .paginar{
    font-size: 65%;
  }
}

</style>