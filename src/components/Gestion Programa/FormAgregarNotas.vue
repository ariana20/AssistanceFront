<template>
        <!-- <div>Hola</div> -->
    <div class= "container">
         <!-- <div class="row grid-divider "> -->
            <div >
                <div>
                  <hr style="width:105%;border:0px;">

                </div>
             
                <div class="row " >
                    <div class="col-xs-6 col-sm-2" sytle="padding:50px;padding-top:10px;">
                        <div class="col-sm-6">
                            <label  for="formGroupExampleInput" >
                                <b>Código</b>
                            </label>
                        </div>
                        <hr style="width:458%;border:0px;">
                        <ejs-autocomplete
                            :dataSource='codigos' 
                            :fields='campoCodigo' 
                            placeholder="Código" 
                            :change='onCodigoChange'
                            v-model="sel"
                            class="form-control"
                            style="margin-bottom: 10px;"
                            :showClearButton="false">
                        </ejs-autocomplete>

                        <ul class="col-sm-6" style="text-align:left;margin-left:-8px;">
                            <li class="form-control" style="width:300%;text-align:center;margin-top:8px;"
                                v-for="(newAlumnoCod,alcIndex) in listAlumnosCod"  
                                :key="alcIndex">
                                {{newAlumnoCod}}           
                            </li>
                        </ul>

                    </div>
                    <div class="col-md-4">
                        <div class="col-sm-8" style="text-align:left;padding-bottom:40px;">
                            <b>Nombre y Apellidos</b>
                         
                        </div>
                        <div type="text" class="col-sm-4 form-control" placeholder="Nombre" style="margin-left:10px;color: white;background:#BEBEBE;" >
                            {{alSeleccionado}} </div>
                         
                        <div class="col-sm-8 form-control list-group-item" 
                        style="padding: 0.4rem 0.5rem;text-align:center;width:200%;margin-left:10px;padding-right:0px;"
                            v-for="(newAlumno,alIndex) in listAlumnosNom"  
                            :key="alIndex">
                            {{newAlumno}}    
                            <span name="remove" class="close" @click="deleteAl(alIndex)">&times;</span> 
                        </div>  
                    </div>
                    <div class="col-md-4">
                        <div class="col-sm-4" style="text-align:left;padding-bottom:40px;">
                            <b>Notas</b>
                         
                        </div>
                        <div type="text" class="col-sm-4" placeholder="Nombre" style="top:-5px">
                            <button  :disabled="!this.sel" type="button" class="btn btn-info" 
                                    @click="addAlumno">Agregar
                            </button>          
                        </div>
                         
                        <div class="row" style="margin-left:0px"
                        v-for="(newAlumno,alIndex) in listAlumnosNom"  
                        :key="alIndex">
                            <input class="col-sm-4 form-control"  style="text-align:center;
                            width:200%;margin-left:10px;padding-right:0px;text-align:center; ">
                            <div style="line-height:35px;margin-left:10px">
                                <b>Archivo</b>
                            </div> 
                        </div>  
                    </div>
                </div>
                <div style="position:absolute; bottom:30px;">
                </div>
            </div>
            
        
        <!-- </div> -->
        <!-- <div style="width:100%; border-bottom:0.5px solid #bababa; height:0.5px;padding-top:15px; margin-bottom:15px;"></div> -->
    </div> 
</template>


<script>

import moment from 'moment'
import Swal from 'sweetalert2'
import 'vue2-datepicker/index.css'
import axios from 'axios';
import Vue from 'vue'
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);
export default Vue.extend ({
    name: 'formNotas',
    
    data: function () {
        return {
        
            bordes:'borde-textbox',
            sel: '',
            alSeleccionado: 'Nombre Alumno',
            codigos:[],
            campoCodigo: {value:'codigo'},    
            selectedTipoTutoria: null,
            tiposTutoria: [],
            selectedMotivo: '',
            motivos: [],
            newMotivo: null,
            listMotivos:[],
            listMotivosId: [],
            motivosBorrados:[],
            listAlumnosNom: [],
            listAlumnosCod: [],
            listAlumnosId: [],
            unidadesApoyo: [],
            selectedUnidadApoyo: null,
        }
    },
    mounted(){
       
    
    axios.post('sesiones/alumnoProg', {idTipoU:5,idProg: this.$store.state.programaActual.id_programa})
        .then( response => {
            console.log("listado alumnos: ",response.data)
            for(var i in response.data){ 
                this.codigos.push(response.data[i][0]);
            }
        })
        .catch(e => {
            console.log(e.response);
        });
   
    },
    methods: {
        guardar: function () {
            const sesion_params = {
                id_usuario: this.$store.state.usuario.id_usuario,
                fecha: moment(new Date(String(this.datetime))).format('YYYY-MM-DD'),
                hora_inicio: moment(new Date(String(this.datetime))).format('hh:mm:ss'), 
                usuario_creacion: this.$store.state.usuario.id_usuario,
                usuario_actualizacion: this.$store.state.usuario.id_usuario,
                id_tipo_tutoria: this.selectedTipoTutoria,
                id_motivo_consulta: this.listMotivosId[0],
                resultado: this.descripcion,
                idAlumnos: this.listAlumnosId,
                idMotivos: this.listMotivosId,
            };
            if(this.selectedTipoTutoria != null) {
                if(this.listMotivos.length > 0) {
                    if(this.listAlumnosCod.length > 0) {
                        if(this.datetime != null) {
                            if(this.descripcion!=null) {
                                axios.post('/sesiones/asistencia',sesion_params)
                                    .then( response=>{
                                        console.log(response);
                                        Swal.fire({
                                            text:"Se ha registrado la sesión con éxito",
                                            icon:"success",
                                            confirmButtonText: 'OK',
                                            confirmButtonColor:'#0097A7',
                                            showConfirmButton: true,
                                        }) 
                                    })  .catch(e => {
                                        console.log(e.response);
                                    });
                                }
                                else {
                                    Swal.fire({
                                        text:"Debe llenar el campo descripción",
                                        icon:"error",
                                        confirmButtonText: 'OK',
                                        confirmButtonColor:'#0097A7',
                                        showConfirmButton: true,
                                    })
                                }
                            }
                        else {
                            Swal.fire({
                                text:"Debe seleccionar una hora y fecha",
                                icon:"error",
                                confirmButtonText: 'OK',
                                confirmButtonColor:'#0097A7',
                                showConfirmButton: true,
                            })
                        }
                    }
                    else {
                        Swal.fire({
                            text:"Debe agregar por lo menos un alumno",
                            icon:"error",
                            confirmButtonText: 'OK',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                        })
                    }
                }
                else {
                    Swal.fire({
                        text:"Debe seleccionar por lo menos un motivo",
                        icon:"error",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                }
            }
            else {
                Swal.fire({
                    text:"Debe seleccionar el tipo de tutoría",
                    icon:"error",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                })
            }
        },
        cancelar: function () {
            this.datetime= '';
            this.descripcion= null;
            this.motivo= null;
            this.sel= '';
            this.alSeleccionado= 'Nombre Alumno';
            this.selectedTipoTutoria= null;
            this.selectedMotivo= '';
            this.newMotivo= null;
            this.listMotivosId= [];
            this.motivosBorrados=[];
            this.listAlumnosNom= [];
            this.listAlumnosCod= [];
            this.listAlumnosId= [];
            this.selectedUnidadApoyo= null;
        },
        onCodigoChange: function () {
            var i;
            for(i in this.codigos){
                if(this.sel==this.codigos[i].codigo){
                    this.alSeleccionado = this.codigos[i].nombre + ' ' + this.codigos[i].apellidos;                
                }
                console.log(this.alSeleccionado);
                //break;   
            }
        },
        addMotivos: function () {
            for(var i in this.motivos)
                if(this.selectedMotivo==this.motivos[i].id_motivo_consulta) {
                    this.listMotivos.push(this.motivos[i].nombre);
                    this.listMotivosId.push(this.motivos[i].id_motivo_consulta);
                    this.motivosBorrados.push(this.motivos[i]);
                    this.motivos.splice(i,1);  
                }
        },
        deleteMotivo: function (index) {
            var i;
            for(i in this.motivosBorrados)
                if(this.listMotivos[index]==this.motivosBorrados[i].nombre) {
                    this.motivos.push(this.motivosBorrados[i]);
                    break;
                }
            this.listMotivos.splice(index,1);
            this.listMotivosId.splice(index,1);
        },
        deleteAl: function(index) {
            this.listAlumnosCod.splice(index,1);
            this.listAlumnosNom.splice(index,1);
        },
        addAlumno: function () {  
            var estaAl = false;
            for( var i in this.listAlumnosCod ){
                    if(this.sel == this.listAlumnosCod[i]){
                        estaAl = true;
                        break;
                    }
            }
            if(this.alSeleccionado != 'Nombre Alumno' && !estaAl && this.sel.length == 8){ 
                this.listAlumnosNom.push(this.alSeleccionado);
                this.listAlumnosCod.push(this.sel);
                for(var j in this.codigos){
                    if(this.sel == this.codigos[j].codigo)
                        this.listAlumnosId.push(this.codigos[j].id_usuario);
                }
                this.alSeleccionado='Nombre Alumno';
                this.sel= '';
            }
            console.log(this.listAlumnosId);
            
            
        }
    }
})
</script>


<style lang="scss" scoped>
@import '../../assets/styles/intento.css';

.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}
.e-input-group:not(.e-float-icon-left),
.e-input-group.e-success:not(.e-float-icon-left),
.e-input-group.e-warning:not(.e-float-icon-left),
.e-input-group.e-error:not(.e-float-icon-left),
.e-input-group.e-control-wrapper:not(.e-float-icon-left),
.e-input-group.e-control-wrapper.e-success:not(.e-float-icon-left),
.e-input-group.e-control-wrapper.e-warning:not(.e-float-icon-left),
.e-input-group.e-control-wrapper.e-error:not(.e-float-icon-left) {
  border: transparent;
  border-width: 0 0 1px 0;
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
.grid-divider {
  overflow-x: hidden; //quickfix to hide divider on left side
  position: relative;
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
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}
hr {
    height: 0px !important;
    border-width: 0;
    color: gray;
    background-color: gray;
    border-top: 0.4px solid rgba(0, 0, 0, 0.1) !important;
}
</style>