<template>
  <div class="FormRoles" style="margin-top:20px">
    <div class="container" style="left:60px;text-align: left">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left">
            <td>Buscar</td>   
            <td> <input type="text" v-model="nombre" style="margin-left:10px"></td>
            <td> <b-button v-on:click="nuevo()" style="margin-left:700px;background: #0097A7">Añadir</b-button></td>
          </tr>
        </td>
      </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Permisos</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in $store.state.roles" :key="index">
            <td>{{item.nombre}}</td>
            <td><b-button v-on:click="Editar(item.id_tipo_usuario)" style="background: #0097A7">Lapiz</b-button></td>
            <td><b-button v-on:click="Eliminar(item.id_tipo_usuario)">Eliminar</b-button></td>
          </tr>
        </tbody>
      </table>
    </div>

      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    Eliminar(id){
      this.axios.post('/tipoUsuarios/eliminar/'+id)
        .then(response=>{
          console.log(response)
          let index = this.$store.state.roles.indexOf(
            function(element){
              return element.id_tipo_usuario === id;
            })
          this.$store.state.roles.splice(index, 1);
        })
        .catch(e=>console.log(e));
    }
  }
}
</script>
