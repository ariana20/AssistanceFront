<template>
  <div name="FormAsignarTutor">
    <div style="text-align: center;margin-top:2%;margin-left:5%">

        <div class="row" style="text-align:left;">
            <h4 class="font-weight-bolder col-sm-2">Tutor: </h4>
            <select class="col-sm-5 form-control" v-model="tutorSeleccionado"  @click="listarTT()" >
                <option disabled selected :value="null" focusable="false">Selecciona un tutor</option>
                <option 
                    v-for="(item, index) in tutores" 
                    :key="index" 
                    :value="item">
                    {{ item.usuario.nombre + " " + item.usuario.apellidos }}
                </option>
            </select>
        </div>
        <div class="row" >
          <div class="font-weight-bolder col-sm-2" style="text-align:left;">Temas: </div>
          <div>
              <label v-for="(item,index) in tipoTutoria" :key="index">
                  {{item.nombre}}<label v-if="index<tipoTutoria.length-1" style="margin-right:5px">, </label>
              </label>
          </div>
        </div>
        <div class="row" style="margin-top:2%">
            <div class="font-weight-bolder col-sm-2" style="text-align:left;">Alumnos</div>
            <div class="font-weight-bolder col-sm-6" style="text-align:right;"><button  :disabled="!this.sel" type="button" class="btn btn-info" style="text-align:right;" @click="addAlumno">
                Asignar
            </button>
            </div>
        </div>
        <table class="table" style="text-align: left">
            <thead>
                <tr>
                    <th scope="col" style="width:150px">Código</th>
                    <th scope="col" style="width:500px">Nombre y Apellidos</th>
                    <th scope="col" style="width:400px">Condición</th>
                    <th scope="col" >    
                    <!--button  :disabled="!this.sel" type="button" class="btn btn-info" style="display:inline;margin:-3px;" @click="addAlumno">
                        Agregar
                    </button-->
                    </th>
                </tr>
            </thead>
   
            <tbody>
                <tr>
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
                        <div v-if="alSeleccionado!=null" type="text" class="form-control" placeholder="Condicion" style="color: white;background:#BEBEBE;" >{{alSeleccionado.condicion}}</div>
                        <div v-if="alSeleccionado==null" type="text" class="form-control" placeholder="Condicion" style="color: white;background:#BEBEBE;" >Condición Alumno</div>
                    </td>
                    <td scope="col">
                        <button class="btn link" v-on:click="Cancelar"><b-icon icon="x-circle-fill"></b-icon></button>
                    </td>
                </tr>
                <tr v-for="(item,index) in alumnosAsig" :key="index">
                    <td v-if="item!=undefined">{{item.codigo}}</td>
                    <td v-if="item!=undefined">{{item.nombre+" "+item.apellidos}}</td>
                    <td v-if="item!=undefined">{{item.condicion}}</td>
                    <td v-if="item!=undefined"><button class="btn link" v-on:click="Eliminar(item, index)"><b-icon icon="dash-circle-fill"></b-icon></button></td>
                </tr>
            </tbody>
        </table>

    </div>

  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Vue from 'vue'
import emailjs from 'emailjs-com';
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);
import axios from 'axios'

export default {
  data(){
    return{
        tutores:[],
        tutorSeleccionado:null,
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
      .post('/programa/tutoresListar', params)
        .then(res =>{
          this.tutores=res.data;            
        })
        .catch(e => {
          console.log(e.response);
        })
    },

    listarTT(){
      if(this.tutorSeleccionado){
        this.tipoTutoria=this.tutorSeleccionado.usuario.tipo_tutorias;
        const params = {
          id_tutor: this.tutorSeleccionado.usuario.id_usuario,
          id_programa: this.$store.state.programaActual.id_programa
        };
        //Falta corregir por caro!!!
        axios
        .post('/registros/listarAlumnos', params)
        .then(res =>{
          this.alumnosAsig=res.data;            
        })
        .catch(e => {
          console.log(e.response);
        })
      }

    },

    addAlumno: function () {  

        const params = {
        id_tutor: this.tutorSeleccionado.usuario.id_usuario,
        id_programa: this.$store.state.programaActual.id_programa,
        id_alumno: this.alSeleccionado.id_usuario,
        id_usuario_creacion: this.$store.state.usuario.id_usuario,
        cambiar:this.cambiar,
        };
        
        axios
        .post('/registros/insertar', params)
        .then(res =>{
            if(res.data.status=="error"){
                Swal.fire({
                    text:res.data.mensaje+", ¿desea asignar de todos modos?",
                    icon:"warning",
                    confirmButtonText: 'Si',
                    showCancelButton: true,
                    cancelButtonText: 'No',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.value) {
                        params.cambiar=true;
                        axios
                        .post('/registros/insertar', params)
                        .then(rr =>{
                            console.log(rr);
                            Swal.fire({
                                text:"Se ha realizado correctamente la asignación",
                                icon:"success",
                                confirmButtonText: 'OK',
                                confirmButtonColor:'#0097A7',
                                showConfirmButton: true,
                            }) 
                            this.enviarCorreo(); 
                            this.alumnosAsig.push(this.alSeleccionado);
                            this.alSeleccionado=null;
                            this.sel='';
                            this.cambiar=false; 
                            

                        }).catch(e => {
                        console.log(e.response);
                        })


                    } 
                })
                
            }else if (res.data.status=="success"){
                Swal.fire({
                    text:"Se ha realizado correctamente la asignación",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                }) 
                
                this.alumnosAsig.push(this.alSeleccionado);
                this.enviarCorreo();
                this.alSeleccionado=null;
                this.sel='';  
                
            }
            
     
        })
        .catch(e => {
        console.log(e.response);
        })

            
    },

    enviarCorreo(){
        var mensaje = "Se le acaba de asignar a "+this.tutorSeleccionado.usuario.nombre+" "+this.tutorSeleccionado.usuario.apellidos+" como tutor o tutora.";
        emailjs.send(
            "gmail",
            "template_bV7OIjEW",
            {
            "nombre":this.alSeleccionado.nombre+" "+this.alSeleccionado.apellidos,
            "mensaje":mensaje,
            "correo": this.alSeleccionado.correo
            }, 'user_ySzIMrq3LRmXhtVkmpXAA')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    },

    Eliminar: function(item, index) {
        Swal.fire({
            title: '¿Desea eliminar la asignación de '+item.nombre+'?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0097A7',
            cancelButtonColor: '#757575',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.value) {
                const params = {
                id_tutor: this.tutorSeleccionado.usuario.id_usuario,
                id_programa: this.$store.state.programaActual.id_programa,
                id_alumno: item.id_usuario,
                };
                axios
                .post('/registros/eliminar',params)
                .then(response=>{
                    console.log(response);
                    this.alumnosAsig.splice(index,1);
                    Swal.fire({
                        text:"Eliminación Exitosa",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                })
                .catch(e => {
                console.log(e.response);
                })
            }
        })	

    },

    Cancelar(){
        this.alSeleccionado=null;
        this.sel='';
    }
    
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