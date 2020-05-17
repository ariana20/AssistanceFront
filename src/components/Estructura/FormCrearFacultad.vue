<template>
  <div class="FormCrearFacultad">
    <div class="container" style="text-align: left">
        <b-container fluid>
        <b-row class="my-1">
            <b-col sm="3">
            <label for="input-none">Nombre de la Facultad:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="nombre" v-model="facultad.nombre"></b-form-input>
            </b-col>

        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label for="input-none">Correo Electrónico:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="correo" v-model="facultad.correo"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label for="input-none">Coordinador de Facultad:</label>
            </b-col>
            <b-col sm="8">
            <b-form-input id="idCoordinador" v-model="idCoordFacultad" disabled></b-form-input>
            </b-col>

            <b-col>
            <button type="button" class="btn btn-outline-secondary"><b-icon icon="search"></b-icon></button>
            </b-col>
        </b-row>
        <b-row></b-row>
        <b-row class="my-1"  style="text-align: center">
            <b-col sm="12">
            <button type="button" class="btn btn-info" style="margin-left:50px">Guardar</button>
            <button type="button" class="btn btn-secondary" style="margin-left:50px">Cancelar</button>
            </b-col>
        </b-row>

        </b-container>
        <br>

     
        <b-container fluid>
        <b-row>
            
            <h4 class="font-weight-bold">Programas de la Facultad:</h4>
            

            <b-col sm="12" style="text-align: right">
            <button type="button" class="btn btn-info" style="margin-left:50px">Añadir Programa</button>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label for="input-none">Nombre del Programa:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="nombre" v-model="nombrePrograma"></b-form-input>
            </b-col>

        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label for="input-none">Correo Electrónico:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="correo" v-model="correoPrograma"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label for="input-none">Coordinador de Programa:</label>
            </b-col>
            <b-col sm="8">
            <b-form-input id="idCoordinador" v-model="idCoordPrograma" disabled></b-form-input>
            </b-col>

            <b-col sm="1">
            <button type="button" class="btn btn-outline-secondary"><b-icon icon="search"></b-icon></button>
            </b-col>
        </b-row>
        <br>


        </b-container>
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
      facultad:{
          id_facultad:null,
          id_institucion:1,
          nombre:null,
          descripcion:null,
          correo:null,
          id_coordinador:null,
          nombre_coordinador:null,
          programas:[],
      },
      coordinador:{
          id_coordinador:null,
          nombre_coordinador:null,
      },
      programa:{
          id_programa:null,
          id_facultad:null,
          nombre:null,
          descripcion:null,
          correo:null,
          id_coordinador:null,
          nombre_coordinador:null,
      },
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
