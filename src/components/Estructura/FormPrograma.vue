<template>
  <div class="FormPrograma">
    <div class="container" style="left:60px;text-align: left;margin-top:20px">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left">
            <td>Buscar:</td>
            <td> <input class="borde-textbox" type="text" style="margin-left:10%;padding:7px" v-model="nombre"></td>
          </tr>
        </td>
      </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Coordinador</th>
            <th scope="col">Facultad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in programasFiltrados" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.programa.nombre}}</td>
            <td>{{item.programa.correo}}</td>
            <td>
              <a style="font-weight:normal" v-if="item.coordinador">{{item.coordinador.nombre}}</a>
              <a style="font-weight:normal" v-else>Sin Coordinador</a>
            </td>
            <td>
              <a style="font-weight:normal" v-if="item.facultad">{{item.facultad.nombre}}</a>
              <a style="font-weight:normal" v-else>Sin Facultad</a>
            </td>
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
    if(this.$store.state.programas.length == 0) this.listarProgramas();
    else this.programas = this.$store.state.programas;
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
            programasFiltrados: 'filtrarProgramas'
        })
  },
  methods:{
    
    listarProgramas() {
      this.axios.post('/programa/listarConCoord')
        .then(res =>{
          this.$store.state.programas = res.data
          this.programas = res.data
        })
        .catch(e => {
          console.log(e.response);
        })
    },
  }
}
</script>
