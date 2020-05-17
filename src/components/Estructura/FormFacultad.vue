<template>
  <div class="FormFacultad">
    <div class="container">

      <div class="float-right">
        
        <router-link to="/crearFacultad">
          <button type="button"  class="btn btn-outline-secondary">Añadir</button>
        </router-link>
      </div><br>

      <div class="form-group row">
        <label for="inputNombre" class="col-sm-1 col-form-label">Buscar</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="nombre">
        </div>
        <button type="button" class="btn btn-outline-secondary"><b-icon icon="search"></b-icon></button>
      </div>

            
      <table class="table" style="text-align: left">
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
              <button class="btn link"><b-icon icon="pencil"></b-icon></button>
              <button class="btn link"><b-icon icon="dash-circle-fill"></b-icon></button>
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
