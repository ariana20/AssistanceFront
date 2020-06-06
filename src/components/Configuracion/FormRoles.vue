<template>
  <div class="FormRoles container" >
    <div class="row top-titulo" style="text-align: left" >
      <div class="top-titulo">
            <h5 class="col-sm-4 title-container">Nombre: </h5>
            <input class="col-sm-6 form-control" style="top:26px;right:100px;" v-model="nombre" placeholder="Busque por nombre" onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)  )" >
            <div class="botones">
            <button type="button" class="btn btn-info" @click="nuevo()" style="margin-left:280px" >Añadir</button>
            </div>
      </div>
        <!--<div class="row col-sm-4 tutoria-title"  style="margin:10px;font-size:25px;font-weight:bold">Buscar:  
        <input placeholder="Busque por nombre" class="row col-sm-8 form-control" style="left:25px;" type="text" v-model="nombre">  
        </div>
        <div style="margin-right:100px"></div>                   
                 <button  type="button"  style="text-align:right" class="btn btn-info">Añadir</button> 
                  <b-button v-on:click="nuevo()" style="height:40px;border-color:transparent;margin-left:25%;background: #0097A7">Añadir</b-button>-->
           
      </div>
      <table class="table"  style="text-align:left">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col" style="text-align: center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          
          <tr v-for="(item, index) in rolesFiltrados" :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.nombre}}</td>
            <td  style="text-align: center">
              <button v-on:click="Editar(item.id_tipo_usuario)" class="btn link"><b-icon icon="pencil" style="color:#0097A7"/></button>
              <button v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill" style="color:#757575"/></button>
            </td>
          </tr>
        </tbody>
      </table>
  
    <b-modal ref="my-modal" style="margin-left:20%" size="sm" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="color:#0097A7;margin-left:25%" class="sb-1 d-flex">
        Loading... <b-spinner style="margin-left:15px"/>
      </div>
    </b-modal>

      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      roles:[]
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    if(this.$store.state.roles === null) this.listarRoles();
    else this.roles = this.$store.state.roles;
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
          rolesFiltrados: 'filtrarRoles'
        })
  },
  methods:{
    listarRoles() {
        this.axios.post('/tipoUsuarios/listarTodo')
        .then(response=>{
          if(this.$store.state.tipoActual.nombre == 'Admin'){
            this.$store.state.roles = response.data;
          }
          else{
            this.$store.state.roles = response.data;
            let index;
            for (index = 0; index < this.$store.state.roles.length; index++) {
              if(this.$store.state.roles[index].nombre == "Admin") break;              
            }
            this.$store.state.roles.splice(index, 1);
          }
        })
        .catch(e=>console.log(e));
      
    },
    Editar(id){
      this.$router.push('/permisos/'+id);
    },
    nuevo(){
      this.$router.push('/permisos');
    },
    Eliminar(item){
      Swal.fire({
          title: '¿Dese eliminar '+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.showModal();
            this.axios.post('/tipoUsuarios/eliminar/'+item.id_tipo_usuario)
              .then(response=>{
                response
                this.hideModal();
                let index = this.$store.state.roles.indexOf(
                  function(element){
                    return element.id_tipo_usuario === item.id_tipo_usuario;
                  })
                this.$store.state.roles.splice(index, 1);
                Swal.fire({
                  text:"Eliminación Exitosa",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                })
              })
              .catch(e=>{
                console.log(e)
                this.hideModal();
              });

          }
        })
      
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

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}
.title-container{
    margin-top: 30px;
    margin-bottom: 30px;
}

.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin:auto;
}
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}
</style>