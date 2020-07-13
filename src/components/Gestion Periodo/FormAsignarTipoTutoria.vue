<template>
  <div name="FormAsignarTipoTutoria" class="contenedor">
    <div style="text-align: center;">

        <div class="row" style="text-align:left;">
            <h4 class="font-weight-bolder col-sm-2">Tutor: </h4>
            <select class="col-12 col-md-5 form-control" v-model="tutorSeleccionado"  v-on:change="listarTT()" >
                <option disabled selected :value="null" focusable="false">Selecciona un tutor</option>
                <option 
                    v-for="(item, index) in tutores" 
                    :key="index" 
                    :value="item">
                    {{ item.nombre + " " + item.apellidos }}
                </option>
            </select>
        </div>
        <div class="row" style="text-align:left;">
          <div class="font-weight-bolder col-12 col-md-2" style="text-align:left;">Tipo de Tutoría: </div>
          <div class="col-12 col-md-5" style="padding-left: 0px; padding-right: 0px;">
            <select class="form-control" v-model="tutoriaSeleccionada"  v-on:change="listarAlumnos()" >
                <option disabled selected :value="null" focusable="false">Selecciona un Tipo de Tutoria</option>
                <option 
                    v-for="(item, index) in tipoTutoria" 
                    :key="index" 
                    :value="item">
                    {{ item.nombre}}
                </option>
            </select>
          </div>
        </div>
        <div class="row" style="margin-top:2%">
            <div class="font-weight-bolder col-12 col-md-3" style="text-align:left;">Alumnos Asignados</div>
            <div class="font-weight-bolder col-sm-6" style="text-align:right;">
            </div>
        </div>
        <table class="table" style="text-align: left; margin-top:15px">
            <thead>
                <tr>
                    <th scope="col" style="width:150px">Código</th>
                    <th scope="col" style="width:500px">Nombre y Apellidos</th>
                    <th scope="col" style="width:400px">Tipo de Tutoría</th>
                    <th scope="col" > 
                    </th>
                </tr>
            </thead>
   
            <tbody>
                <tr v-if="tutoriaSeleccionada">
                    <td scope="col" style="width:150px">
                        <ejs-autocomplete
                            :enabled="this.tutorSeleccionado"
                            :dataSource='codigos' 
                            :fields='campoCodigo' 
                            placeholder="Código" 
                            :change='onCodigoChange'
                            v-model="sel"
                            class="form-control"
                            style="margin-bottom: 5px;"
                            :showClearButton="false">
                        </ejs-autocomplete>
                    </td>
                    <td scope="col" style="width:500px">
                        <div v-if="alSeleccionado!=null" type="text" class="form-control" placeholder="Nombre" style="color: white;background:#BEBEBE;" >{{alSeleccionado.nombre+" "+alSeleccionado.apellidos}}</div>
                        <div v-if="alSeleccionado==null" type="text" class="form-control" placeholder="Nombre" style="color: white;background:#BEBEBE;" >Nombre Alumno</div>
                    </td>
                    <td scope="col" style="width:400px">
                        <select v-if="alSeleccionado!=null" class="form-control" v-model="tutoriaAlumno" >
                            <option disabled selected :value="null" focusable="false">Selecciona un Tipo de Tutoria</option>
                            <option 
                                v-for="(item, index) in tipoTutoria" 
                                :key="index" 
                                :value="item">
                                {{ item.nombre}}
                            </option>
                        </select>
                        <!--div v-if="alSeleccionado!=null" type="text" class="form-control" placeholder="Condicion" style="color: white;background:#BEBEBE;" >{{alSeleccionado.condicion}}</div-->
                        <div v-if="alSeleccionado==null" type="text" class="form-control" placeholder="Condicion" style="color: white;background:#BEBEBE;" >Tipo de Tutoría</div>
                    </td>
                    <td scope="col">
                        <button  :disabled="!this.sel" type="button" class="btn btn-info" style="text-align:right;" @click="addAlumno">Asignar</button>
                    </td>
                </tr>
                <tr v-for="(item,index) in alumnosAsig" :key="index">
                    <td v-if="item!=undefined">{{item.codigo}}</td>
                    <td v-if="item!=undefined">{{item.nombre+" "+item.apellidos}}</td>
                    <td v-if="item!=undefined">pendiente{{item.tipo_tutoria}}</td>
                    <td v-if="item!=undefined"><button class="btn link" v-on:click="Eliminar(item, index)"><b-icon  style="color:#757575;width:20px; height:20px;" icon="dash-circle-fill"></b-icon></button></td>
                </tr>
            </tbody>
        </table>

    </div>

  </div>
</template>

<script>
//import Swal from 'sweetalert2'
import Vue from 'vue'
//import emailjs from 'emailjs-com';
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);
import axios from 'axios'

export default {
  data(){
    return{
        tutores:[],
        tutoriaAlumno:null,
        tutorSeleccionado:null,
        tutoriaSeleccionada:null,
        tipoTutoria:[],
        alumnos:[],
        alumnosAsig:[],
        sel:'',
        alSeleccionado: null,
        codigos:[],
        campoCodigo: {value:'codigo'},  
        cambiar: false,

    }
  },
  components: {

  },
  mounted(){
    this.listarTutores();
    //usuarios/condAlumno 
    this.obtenerAlumnos();
  },
  computed:{

  },
  methods:{

    obtenerAlumnos(){
      axios.post('programa/alumnosProg', {idTipoU:5,idProg: this.$store.state.programaActual.id_programa})
      .then( response => {
          this.codigos=response.data;
      })
      .catch(e => {
          console.log(e.response);
      });
    },

    onCodigoChange: function () {
        var i;
        for(i in this.codigos){
            if(this.sel==this.codigos[i].codigo){
                this.alSeleccionado=this.codigos[i];
                
            }
            
        }
    },
    listarTutores() {
      const params = {
        id_programa : this.$store.state.programaActual.id_programa,
        nomFacu:this.$store.state.programaActual.facultad.nombre,
        nombre: "",
      };
      axios
      .post('/programa/tutoresAsignar', params)
        .then(res =>{
          this.tutores=res.data; 
          console.log(res);           
        })
        .catch(e => {
          console.log(e.response);
        })
    },

  
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/material.css';

.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}

input.e-input, .e-input-group input.e-input, .e-input-group.e-control-wrapper input.e-input, textarea.e-input, .e-input-group textarea.e-input, .e-input-group.e-control-wrapper textarea.e-input{
    border-width: 1px !important;
}
.input.e-input, .e-input-group input.e-input, .e-input-group input, .e-input-group.e-control-wrapper input.e-input, .e-input-group.e-control-wrapper input, .e-float-input input, .e-float-input.e-input-group input, .e-float-input.e-control-wrapper input, .e-float-input.e-control-wrapper.e-input-group input, .e-input-group, .e-input-group.e-control-wrapper, .e-float-input, .e-float-input.e-control-wrapper {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    text-align: center;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif;
    font-size: 17px;
    margin-bottom:0px!important;
}
.e-control .e-autocomplete .e-lib .e-input .e-keyboard {
    z-index: -100;
}
.borde-textbox {
    border-radius: 1.25rem;  
    border: 2px solid #757575;
}
.izq {
    //background-color: cornflowerblue;
    padding: 20px;
}
.der {
    //background-color: darkgreen;
    padding: 20px;
}
.tutoria-title{
    margin-top: 30px;
    margin-bottom: 20px;
}

.font-weight-bolder {
    color: black;
    font-size: 24px;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
}
.botones {
    margin:auto;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.text-left {
    margin-bottom: 20px;
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.btn:focus {
    outline:none;
    box-shadow: none;
    border: 2.3px solid transparent;
}
select:focus {
    outline:none;
    box-shadow: none;
}

</style>