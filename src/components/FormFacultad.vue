<template>
  <div name="FormFacultad">
    <div class="container">
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
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Coordinador</th>
            <th scope="col">Correo</th>
            <th scope="col">N° Programas</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in facultades" :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.nombre}}</td>
            <td>FaltaNombreCoordinador</td>
            <td>{{item.correo}}</td>
            <td>FaltaNumProg</td>
            <td>
              <button>{{index}}</button>
            </td>
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
      facultades:[]
    }
  },
  created(){
    this.listarFacultades();
  },
  methods:{
    
    listarFacultades() {
      this.axios.create({withCredentials: true }).post('/facultad/listarTodo')
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
