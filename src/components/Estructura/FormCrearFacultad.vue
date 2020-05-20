<template>
  <div class="FormCrearFacultad">
    
    <div class="container" style="text-align: left">
        <b-container fluid>
        <b-row class="my-1"  style="text-align: right">
            <b-col sm="12">
            <button type="button" class="btn btn-info" style="margin-left:30px" v-on:click="guardarFacultad()">Guardar</button>
            
            <router-link to="/facultad">
              <button type="button" class="btn btn-secondary" style="margin-left:30px">Cancelar</button>
            </router-link>
            </b-col>
        </b-row>
        <b-row>
        </b-row>
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
            <!-- button type="button" class="btn btn-outline-secondary"><b-icon icon="search"></b-icon></button-->
            <a href="#ventana1" class="btn btn-outline-secondary" data-toggle="modal"><b-icon icon="search"></b-icon></a>
            <div class="modal fade" id="ventana1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h2 class="modal-tittle">Encabezado</h2>

                  </div>

                </div>
              </div>
            </div>
              

            </b-col>
        </b-row>
        <b-row></b-row>


        </b-container>
        <br>

     
        <b-container fluid>
        <b-row>
            
            <h4 class="font-weight-bold">Programas de la Facultad:</h4>
            

            <b-col sm="12" style="text-align: right">
            <b-button class="btn btn-info" style="margin-left:50px" type="submit" v-on:click="agregarPrograma()">Añadir Programa</b-button>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label for="input-none">Nombre del Programa:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="nombre" v-model="programa.nombre"></b-form-input>
            </b-col>

        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label for="input-none">Correo Electrónico:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="correo" v-model="programa.correo"></b-form-input>
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
                <th scope="col">Coordinador</th>
                <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in programas" :key="index">
                <th scope="row">{{index+1}}</th>
                <td>{{item.nombre}}</td>
                <td>{{item.correo}}</td>
                <td></td>
                <td></td>
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
      facultad:{
          id_facultad:null,
          id_institucion:1,
          nombre:null,
          descripcion:null,
          correo:null
      },
      programas:[],
      idCoordPrograma: null,
      idCoordFacultad: null,
      
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
          id_coordinador:0
      },
    }
  },
  created(){
    
  },
  methods:{
    
    guardarFacultad() {

      axios.create({withCredentials: true })
        .post('/facultad/insertar',this.facultad)
          .then( response=>{
            this.facultad.id_facultad=response.data
            console.log(response)
          })
        .catch(e => {
          console.log(e.response);
        })
    },
    agregarPrograma(){
      console.log(this.programa);
      var prog= new Object();
      prog.nombre=this.programa.nombre;
      prog.correo=this.programa.correo;
      prog.id_coordinador=this.programa.id_coordinador;
      this.programas.push(prog);
    }
  }
}
</script>
