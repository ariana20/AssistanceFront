<template>
  <div class="FormRoles" style="margin-top:20px">
    <div class="container" style="left:60px;text-align: left">
      <table style="margin-bottom:20px">
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left">
            <td> <b-button v-on:click="nuevo()" style="margin-left:860px;background: #0097A7">Añadir</b-button></td>
          </tr>
        </td>
      </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col" style="text-align: center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in $store.state.roles" :key="index">
            <td>{{item.nombre}}</td>
            <td  style="text-align: center"><button v-on:click="Editar(item.id_tipo_usuario)" class="btn link"><b-icon icon="pencil"/></button>
            <button v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill"/></button></td>
          </tr>
        </tbody>
      </table>
    </div>

      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      programas:[]
    }
  },
  created(){
    if(this.$store.state.programas === null) this.listarRoles();
    else this.programas = this.$store.state.programas;
  },
  computed:{
        nombre:{
            get(){
                return this.$store.state.programasFilter.query;
            },
            set(val){
                this.$store.commit('SET_QUERY',val);
            }
        },
        ...mapGetters({
            programasFiltrados: 'filtrarProgramas'
        })
  },
  methods:{
    
    listarRoles() {
      this.axios.post('/tipoUsuarios/listarTodo')
        .then(response=>{
            this.$store.state.roles = response.data;
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
                console.log(response)
                let index = this.$store.state.roles.indexOf(
                  function(element){
                    return element.id_tipo_usuario === item.id_tipo_usuario;
                  })
                this.$store.state.roles.splice(index, 1);
              })
              .catch(e=>console.log(e));
            Swal.fire({
              text:"Eliminación Exitosa",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
          }
        })
      
    }
  }
}
</script>
