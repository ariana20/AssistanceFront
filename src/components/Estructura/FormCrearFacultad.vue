<template>
  <div class="FormCrearFacultad">

    <div class="container" style="text-align: left">
      <div class="top-title title-container" style="text-align:right">
        <button type="button" class="btn btn-info" style="margin-left:30px" v-on:click="guardarFacultad()">Guardar</button>
            
            <router-link to="/facultad">
              <button type="button" class="btn btn-secondary" style="margin-left:30px">Cancelar</button>
            </router-link>
      </div>
        <b-container fluid>
        <b-row class="my-1"  style="text-align: right">
            <!--<b-col sm="12">
            
            <button type="button" class="btn btn-info" style="margin-left:30px" v-on:click="guardarFacultad()">Guardar</button>
            
            <router-link to="/facultad">
              <button type="button" class="btn btn-secondary" style="margin-left:30px">Cancelar</button>
            </router-link>
            </b-col>-->
        </b-row>
        <b-row>
        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label>Nombre de la Facultad:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input v-if="idFacultad" id="nombreF" v-model="facultad.nombre"></b-form-input>
            <b-form-input v-else id="nombreF" v-model="facultad.nombre"></b-form-input>

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
            <b-form-input id="idCoordinadorF" readonly v-if="facultad.coordinador!=null" v-model="facultad.coordinador.nombCompleto" ></b-form-input>
            <b-form-input id="idCoordinadorF" readonly v-else></b-form-input>
            </b-col>

            <b-col sm="1">
            <b-col sm="1">
            <modalJ2 v-on:childToParentFacu="onChildClickFacu" tipoF="Facultad"/>            
            </b-col>
            </b-col>
        </b-row>
        <b-row></b-row>


        </b-container>
        <br>

        <div class="top-titulo" style="">
          <h4 class="font-weight-bolder " style="margin-bottom:40px">Programas de la Facultad</h4>
          <button type="submit" class="btn btn-info" style="margin-right:-510px; height:38px" v-on:click="agregarPrograma()">Añadir Programa</button>            
          <router-link to="/facultad"><button type="button" class="btn btn-secondary" style="margin-left:0px">Cancelar</button></router-link>
        </div>

        <b-container fluid>
        <!--<b-row>
            
            <h4 class="font-weight-bolder" style="color:black;">Programas de la Facultad</h4>
            

            <b-col sm="12" style="text-align: right">
            <b-button class="btn btn-info" style="margin-left:50px" type="submit" v-on:click="agregarPrograma()">Añadir Programa</b-button>
            </b-col>
        </b-row>-->
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
            <b-form-input id="idCoordinador" readonly v-if="programa.coordinador!=null" v-model="programa.coordinador.nombCompleto" ></b-form-input>
            <b-form-input id="idCoordinador" readonly v-else></b-form-input>
            </b-col>

            <b-col sm="1">
            <modalJ v-on:childToParentProg="onChildClickProg"/>
            </b-col>
        </b-row>
        <br>


        
        </b-container>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">N°</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Coordinador</th>
                <th scope="col" style="text-align: center">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in programas" :key="index">
                <th v-if="item!=''" scope="row">{{index}}</th>
                <td v-if="item!=''">{{item.nombre}}</td>
                <td v-if="item!=''">{{item.correo}}</td>
                <td v-if="item!='' && item.coordinador!=undefined">{{item.coordinador.nombre}}</td>
                <td v-else-if="item!=''">Sin coordinador</td>
                <td v-if="item!=''" style="text-align: center">
                  <button class="btn link" v-on:click="Editar(item.id_programa)"><b-icon icon="pencil"></b-icon></button>
                  <button class="btn link" v-on:click="Eliminar(item)"><b-icon icon="dash-circle-fill"></b-icon></button>
                </td>
            </tr>
            </tbody>
        </table>
        
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import modalJ from '@/components/ModalProg.vue'
import modalJ2 from '@/components/Modal.vue'
import Vue from 'vue'
import {MultiSelectPlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(MultiSelectPlugin);
import Swal from 'sweetalert2'

export default {
  //props: {
  //    idFacultad: String,
  //},
  data(){
    return{
      idFacultad: (this.$route.path).substring(15,17),
      facultad:{
          id_facultad:null,
          id_programa:null,
          id_institucion:1,
          nombre:"",
          descripcion:null,
          correo:"",
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
  mounted(){
    if(this.idFacultad) this.obtenerDatos();
    console.log(this.idFacultad);
  },

  methods:{

    obtenerDatos() {
        axios.post('/facultad/listar/'+this.idFacultad)
            .then(response=>{
                this.facultad.id_facultad = response.data.id_facultad;
                this.facultad.id_programa = response.data.id_programa;
                this.facultad.nombre = response.data.nombre;
                this.facultad.correo = response.data.correo;
                console.log(response);
                const paramL = {
                  id_facultad: this.facultad.id_facultad,
                  nombre: this.facultad.nombre
                };
                axios.post('/facultad/listarProgramas', paramL)
                    .then(response=>{
                        this.programas = response.data;
                        console.log(response);

                    })
                    .catch(e=>console.log(e));

                axios.post('/facultad/coordinador/'+this.facultad.id_programa)
                    .then(response=>{
                        this.facultad.coordinador=response.data;
                        console.log(response);

                    })
                    .catch(e=>console.log(e));
            })
            .catch(e=>console.log(e));

    },

    guardarFacultad() {

      if(this.facultad.nombre =="" || this.facultad.correo==""){
         Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 

      }else{

      axios.create()
        .post('/facultad/insertar',this.facultad)
          .then( response=>{
            this.facultad.id_facultad=response.data.id_facultad;
            this.facultad.id_programa=response.data.id_programa;
            console.log(response)

            const params = {
              id_usuario: this.facultad.coordinador.id_usuario,
              id_programa: this.facultad.id_programa
            };
            axios.create()
              .post('/facultad/asignarCoordi',params)
                .then( response=>{
                  console.log(response)
                })
              .catch(e => {
                console.log(e.response);
              })

            
            for(var i=0; i<this.programas.length; i++){
              this.programas[i].id_facultad=this.facultad.id_facultad;
            }
            axios.create()
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
      }

    },
    agregarPrograma(){
      console.log(this.programa);
      var prog= new Object();
      prog.nombre=this.programa.nombre;
      prog.correo=this.programa.correo;
      this.programas.push(prog);
      console.log(this.programas);
    },
    onChildClickProg (value) {
      this.programa.coordinador=value;
      this.programa.coordinador.nombCompleto=value.nombre+" "+value.apellidos;

    },
    onChildClickFacu (value) {
      this.facultad.coordinador=value;  
      this.facultad.coordinador.nombCompleto=value.nombre+" "+value.apellidos;

    },
    Eliminar(item){
      this.programas.splice(item);
    },


  }
}
</script>

<style scoped>

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    text-align-last: left;
    margin-bottom:1.3em;

}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}

</style>