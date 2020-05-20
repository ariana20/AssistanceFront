<template>
  <div name="FormFacultad">
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
            <th scope="col" style="text-align: center">N° Programas</th>
            <th scope="col" style="text-align: center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in facultades" :key="index">
            <th scope="row">{{index+1}}</th>
            <td v-if="item!=undefined">{{item.nombre}}</td>
            <td v-if="coordinadores[index]!=undefined">{{coordinadores[index].nombre}}</td>
            <td>{{item.correo}}</td>
            <td style="text-align: center">{{item.cantidad-1}}</td>
            <td style="text-align: center">
              <button class="btn link" v-on:click="Editar(item.id_facultad)"><b-icon icon="pencil"></b-icon></button>
              <button class="btn link"><b-icon icon="dash-circle-fill"></b-icon></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      nombre:null,
      facultades:[],
      coordinadores:[]
    }
  },
  created(){
    this.listarFacultades();
  },
  methods:{
    
    listarFacultades() {
      axios
      .post('/facultad/listFacuConCant/')
        .then(res =>{
          console.log(res.data);
          this.facultades=res.data
          this.$store.state.facultades = res.data;


        })
        .catch(e => {
          console.log(e.response);
        })
      axios
      .post('/facultad/listFacuConCoordi/')
        .then(res =>{
          console.log(res.data);
          this.coordinadores=res.data

        })
        .catch(e => {
          console.log(e.response);
        })
    },
    Editar(id){
      this.$router.push('/crearFacultad/'+id);
    },
    nuevo(){
      this.$router.push('/crearFacultad');
    },
    
  }
}
</script>
