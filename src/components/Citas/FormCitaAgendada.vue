<template>
    <div class="formcitaagendada container">
        <div class="top-info">
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
                <div class="row grid-divider">
            <div class="izq col-lg-6 col-xm-2 col-md-12">
                <div class="font-weight-bolder text-left">Alumno</div>
                <div class="row">
                    <div class="col-md-4 col-sm-4">
                     
                    </div>
                    <div class="col">
                    
                    </div>
                </div>
                <div style="position:absolute; bottom:30px;">      <input type="checkbox" v-model="asistencia"/>Asistencia         </div>
            </div>
            
            <div class="der col-lg-6 col-xm col-md-12">
                <div class="font-weight-bolder text-left">Resultado</div>
                 <div class="top-titulo" style="margin-bottom:20px;">
                    <div class="col-sm-3 motivo-dropdown-title">Motivo: </div>
                    <select class="col-sm-6 form-control" style="left:-40px;top:5px;" v-model="selectedMotivo">
                        <option selected disabled :value="null" >Selecciona un motivo</option>
                        <option
                        v-for="(motivo, i) in motivos" 
                        :key="i" 
                        :value="motivo.id_motivo_consulta">
                        {{ motivo.nombre }}
                        </option>
                    </select>
                    <div class="botones">
                    <button type="button" 
                            :disabled="!this.selectedMotivo"
                            class="btn btn-info" 
                            @click="addMotivos(i)">Seleccionar</button>
                    </div>
                </div>
                <div class="left-content" >
                    <h5 style="color:black;font-weight:900;text-align:left;">Motivos Seleccionados</h5>
                    <hr>
                    <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
                        <div v-if="listMotivos.length == 0">No tiene motivos seleccionados</div>
                        <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                            v-for="(newMotivo,motivoIndex) in listMotivos"  
                            :key="motivoIndex">
                            {{newMotivo}}
                            <span name="remove" class="close" @click="deleteMotivo(motivoIndex)" style="margin-right : 20px;float:right;">&times;</span>           
                        </li>
                    </ul>
                    <hr>
                    <div class="form-group" style="text-align:left;margin-bottom:20px;">
                        <label for="descripcion">Descripción:</label>
                        <textarea class="form-control" id="descripcion-motivo" rows="7" v-model="descripcion"></textarea>
                    </div>
                    <div class="top-titulo" style="text-align:left;">
                    <div class="col-sm-4 derivar-dropdown-title">Derivar: </div>
                    <select class="col-sm form-control" style="left:-40px;" v-model="selectedUnidadApoyo">
                        <option selected disabled :value="null" >Seleccionar</option>
                        <option
                        v-for="(unidadApoyo, i) in unidadesApoyo" 
                        :key="i" 
                        :value="unidadApoyo.id_unidad_apoyo">
                        {{ unidadApoyo.nombre }}
                        </option>
                    </select>
                    </div>
                </div>                
            </div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
    </div>
</template>


<script>
//import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import Swal from 'sweetalert2'
import 'vue2-datepicker/index.css'
import axios from 'axios';
import Vue from 'vue'
import emailjs from 'emailjs-com';
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);
export default Vue.extend ({
    name: 'formSesionTutoria',
    components:{
        //DatePicker
    },
    data: function () {
        return {
            date: '',
            time: '',
            timePickerOptions:{
                start: '07:00',
                step: '00:30',
                end: '21:00'
            },
            datetime: '',
            descripcion: null,
            motivo: null,
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
            asistencia:false,
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
        document.querySelector("#container > div > div.formSesionTutoria.container > div.top-titulo > div.col-sm-3.mx-datepicker > div > input").style.borderRadius = "1.25rem"; 
        document.querySelector("#container > div > div.formSesionTutoria.container > div.top-titulo > div.col-sm-3.mx-datepicker > div > input").style.border= "0.5px solid #757575";    
        document.querySelector("#container > div > div.formSesionTutoria.container > div.top-titulo > div.col-sm-3.mx-datepicker > div > input").style.fontWeight = "400";
        document.querySelector("#container > div > div.formSesionTutoria.container > div.top-titulo > div.col-sm-3.mx-datepicker > div > input").style.fontSize = "1rem";
        document.querySelector("#container > div > div.formSesionTutoria.container > div.top-titulo > div.col-sm-3.mx-datepicker > div > input").style.height = "2.4em";
  
    axios.post('unidadesApoyo/unidadesxProg',{idProg:this.$store.state.programaActual.id_programa})
        .then(response => {
            this.unidadesApoyo = response.data[0];
        }).catch(e => {
            console.log(e.response);
        });
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
    axios.post('TipoTutoria/listarTodo/' + this.$store.state.programaActual.id_programa)
        .then( response => {
            this.tiposTutoria = response.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    axios.post('motivosConsulta/listarTodo')
        .then( response => {
            this.motivos = response.data;
        })
        .catch(e => {
          console.log(e.response);
        });
        console.log("datetime es: ",this.datetime);
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
            
            
        },
        enviarCorreo(unidad){
            let mensaje = "Se te ha derivado a "+unidad.nombre+":<br>"
                            +"Nombre Contacto: "+unidad.nombre_contacto+"<br>"
                            +"Correo Contacto: "+unidad.correo_contacto+"<br>"
            emailjs.send(
                  "gmail",
                  "template_bV7OIjEW",
                  {
                  "nombre":this.$store.state.usuario.nombre+" "+this.$store.state.usuario.apellidos,
                  "mensaje":mensaje,
                  "correo": this.$store.state.usuario.correo
                  }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                  .then((result) => {
                      console.log('SUCCESS!', result.status, result.text);
                  }, (error) => {
                      console.log('FAILED...', error);
                  });
        }
    }
})
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
.grid-divider {
  overflow-x: hidden; //quickfix to hide divider on left side
  position: relative;
}
.grid-divider > [class*="col-"]:nth-child(n + 2):after {
  content: "";
  background-color: #BABABA;
  position: absolute;
  top: 0;
  bottom: 0;
  @media (max-width: 767px) {
    width: 100%;
    height: 1px;
    left: 0;
    top: -4px; // quickfix to center line between columns
  }
  @media (min-width: 768px) {
    width: 1px;
    height: auto;
    left: -1px; // quickfix to hide divider on left side
  }
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