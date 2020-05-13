<template>
  <div class="FormFacultad">
    <div class="container" style="left:0%;text-align: left">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left"><td>Nombre</td>   <td> <input type="text" v-model="nombre"></td></tr>
        </td>
      </tbody>
      </table>
    </div>

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
          <tr v-for="(item, index) in facultades" :key="index">
            <th scope="row">{{item.id_facultad}}</th>
            <td>{{item.nombre}}</td>
            <td>{{item.correo}}</td>
            <td>{{item.estado}}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>

export default {
  data(){
    return{
      nombre:null,
      facultades:[]
    }
  },
  created(){
    this.listarFacultades();
  },
  methods:{
    
    listarFacultades() {
      this.axios.post('/facultad/listarTodo')
        .then(res =>{
          console.log(res.data);
          this.facultades=res.data;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
  }
}
</script>
