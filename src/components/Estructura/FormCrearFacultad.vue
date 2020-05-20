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
            <label>Nombre de la Facultad:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="nombreF" v-model="facultad.nombre"></b-form-input>
            </b-col>

        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label>Correo Electrónico:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="correoF" v-model="facultad.correo"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label>Coordinador de Facultad:</label>
            </b-col>
            <b-col sm="8">
            <b-form-input id="idCoordinadorF" readonly v-if="facultad.coordinador!=null" v-model="facultad.coordinador.nombre" ></b-form-input>
            <b-form-input id="idCoordinadorF" readonly v-else></b-form-input>
            </b-col>

            <b-col sm="1">
            <b-col sm="1">
            <modalJ2 v-on:childToParent="onChildClick" tipo="Facultad"/>
              <strong>{{tipoCoord}}</strong>
            
            </b-col>
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
            <label>Nombre del Programa:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="nombre" v-model="programa.nombre"></b-form-input>
            </b-col>

        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label>Correo Electrónico:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input id="correo" v-model="programa.correo"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label>Coordinador de Programa:</label>
            </b-col>
            <b-col sm="8">
            <b-form-input id="idCoordinador" readonly v-if="programa.coordinador!=null" v-model="programa.coordinador.nombre" ></b-form-input>
            <b-form-input id="idCoordinador" readonly v-else></b-form-input>
            </b-col>

            <b-col sm="1">
            <modalJ v-on:childToParent="onChildClick" tipo="Programa"/>
            <strong>{{tipoCoord}}</strong>
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
import modalJ from '@/components/Modal.vue'
import modalJ2 from '@/components/Modal.vue'
export default {
  data(){
    return{
      facultad:{
          id_facultad:null,
          id_institucion:1,
          nombre:null,
          descripcion:null,
          correo:null,
          coordinador:null
      },
      programas:[],
      
      programa:{
          id_programa:null,
          id_facultad:null,
          nombre:null,
          descripcion:null,
          correo:null,
          coordinador:null
      },
      coordinadorSeleccionado:null,
      tipoCoord:"",

    }
  },
  components:{
    modalJ,
    modalJ2
  },
  created(){
    
  },
  methods:{
    
    guardarFacultad() {

      axios.create({withCredentials: true })
        .post('/facultad/insertar',this.facultad)
          .then( response=>{
            this.facultad.id_facultad=response.data.id_facultad;
            console.log(response)

            for(var i=0; i<this.programas.length; i++){
              this.programas[i].id_facultad=this.facultad.id_facultad;
            }
            axios.create({withCredentials: true })
              .post('/programa/insertarVariosPro',this.programas)
                .then( response=>{
                  console.log(response)
                })
              .catch(e => {
                console.log(e.response);
              })

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
      this.programas.push(prog);
      console.log(this.programas);
    },
    onChildClick (value, tipo) {
      this.coordinadorSeleccionado = value;
      this.tipoCoord=tipo;
      console.log(tipo);
      if(tipo[0]=='P'){
        console.log("Programa");
        this.programa.coordinador=value;
        console.log(this.programa);
      }else if(tipo[0]=='F'){
        console.log("Facultad");
        this.facultad.coordinador=value;
        console.log(this.facultad);
      }
      
      
    },


  }
}
</script>
