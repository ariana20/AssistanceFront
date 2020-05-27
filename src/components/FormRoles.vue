<template>
  <div class="FormRoles container" style="margin-top:20px">
    <div class="row top-titulo " >
        <div class="row col-sm-4 tutoria-title"  style="margin:10px;font-size:25px;font-weight:bold">Buscar:  
        <input placeholder="Busque por nombre" class="row col-sm-8 form-control" style="left:25px;" type="text" v-model="nombre">  
        </div>
        <div style="margin-right:100px"></div>                   
                  <!-- <button  type="button"  style="text-align:right" class="btn btn-info">Añadir</button> -->
                  <b-button v-on:click="nuevo()" style="height:40px;border-color:transparent;margin-left:25%;background: #0097A7">Añadir</b-button>
           
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
            <td  style="text-align: center"><button v-on:click="Editar(item.id_tipo_usuario)" class="btn link"><b-icon icon="pencil"/></button>
            <button v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill"/></button></td>
          </tr>
        </tbody>
      </table>
  

      
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
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.axios.post('/tipoUsuarios/eliminar/'+item.id_tipo_usuario)
              .then(response=>{
                response
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
              .catch(e=>console.log(e));

          }
        })
      
    }
  }
}
</script>
<style scoped>
  .form-control {
    border-radius: 1.25rem;  
    border: 2px solid #757575;
    margin-bottom: 10px;
    width: 200%;
    
}
</style>