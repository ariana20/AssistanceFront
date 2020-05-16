<template>
  <div class="FormPrograma">
    <div class="container" style="left:60px;text-align: left">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left"><td>Nombre</td>   <td> <input type="text" v-model="nombre"></td></tr>
        </td>
      </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in programasFiltrados" :key="index">
            <th scope="row">{{item.id_programa}}</th>
            <td>{{item.nombre}}</td>
            <td>{{item.correo}}</td>
            <td>{{item.estado}}</td>
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
    if(this.$store.state.programas === null) this.listarProgramas();
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
    
    listarProgramas() {
      this.axios.create({withCredentials: true }).post('/programa/listarTodo')
        .then(res =>{
          this.$store.state.programas = res.data
          this.programas=res.data;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
  }
}
</script>
