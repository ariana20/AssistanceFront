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
          <tr v-for="(item, index) in programas" :key="index">
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


export default {
  data(){
    return{
      nombre:null,
      programas:[]
    }
  },
  created(){
    this.listarProgramas();
  },
  methods:{
    
    listarProgramas() {
      this.axios.create({withCredentials: true }).post('/programa/listarTodo')
        .then(res =>{
          this.programas=res.data;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
  }
}
</script>
