<template>
    <div class="formcitaagendada container">
        <div class="top-info" style="text-align:left;">
            <div id="botones">
                <button type="button" class="btn btn-info" @click="guardar">Guardar</button>
                <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
            </div>
                <div class="list-data"><div id="left">Día:          </div> <div id="right"> {{ this.event.extendedProps.fecha }} </div></div>
                <div class="list-data"><div id="left">Hora Inicio:  </div> <div id="right"> {{ this.event.start | formatHour}} </div></div>
                <div class="list-data"><div id="left">Hora Fin:     </div> <div id="right"> {{ this.event.end | formatHour }} </div></div>
                <div class="list-data"><div id="left">Tipo Tutoría: </div> <div id="right"> {{ this.event.extendedProps.description }} </div></div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
            <div class="row grid-divider">
            <div class="izq col-lg-6 col-xm-2 col-md-12" style="text-align:left;">
                <div class="font-weight-bolder text-left">Alumno</div>
                <div class="row">
                    <div class="col center-block">
                        <div class="list-data"><div id="left">Código:          </div> <div id="right"> {{ this.event.extendedProps.alumno.codigo }} </div></div>
                        <div class="list-data"><div id="left">Nombre:  </div> <div id="right"> {{ this.event.extendedProps.alumno.nombre }} </div></div>
                        <div class="list-data"><div id="left">Apellidos:     </div> <div id="right"> {{ this.event.extendedProps.alumno.apellidos }} </div></div>
                        <div class="list-data"><div id="left">Condición: </div> <div id="right"> {{ this.condicion_alumno }} </div></div>
                    </div>
                    <div class="col center-block text-center">
                        <figure id="floated" class="image-logo">
                            <img :src='this.event.extendedProps.alumno.imagen' height="110px" width="110px" alt="imagen usuario" style="border-color:gray;border-radius: 25%;"/><br>	
                        </figure>
                        <button type="button" class="btn btn-info">Ver Perfil</button>
                    </div>
                </div>
                <div style="bottom:30px;">
                    <div>
                        <div class="font-weight-bolder text-left">Información Adicional</div>
                        <div id="botones">
                            <button type="button" class="btn btn-info" >Historico de Citas</button>
                            <button type="button" class="btn btn-info" >Historico de Notas</button>
                            <button type="button" class="btn btn-info" >Plan de acción</button>
                        </div>
                    </div>
                </div>
                <div style="position:absolute; bottom:30px;">
                    <input type="checkbox" v-model="asistencia"/>Asistencia
                    <button v-on:click="Perfil">Ver Perfil</button>  
                </div>
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

Vue.filter('formatHour', function(value) {
  if (value) {
    return moment(value).format('hh:mm a')
  }
});

export default Vue.extend ({
    name: 'formCitaAgendada',
    components:{
        //DatePicker
    },
    /*props: {
        fecha: String,
        horaIni: String,
        horaFin: String,
        tipoTutoria: String,
        alumno: Object,
    },*/
    //props: ['evento'],
    data: function () {
        return {
            event: this.$store.state.curEvent,
            condicion_alumno: this.$store.state.curEvent.extendedProps.alumno.condicion_alumno.toUpperCase(),
            fechIni: this.fecha,
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
        console.log(this.event);
        //console.log('evento actual: ', this.$store.state.programaActual);

    axios.post('unidadesApoyo/unidadesxProg',{idProg:this.$store.state.programaActual.id_programa})
        .then(response => {
            for(var i in response.data) {
                this.unidadesApoyo.push(response.data[i][0]);
            }
        }).catch(e => {
            console.log(e.response);
        });
    axios.post('motivosConsulta/listarTodo')
        .then( response => {
            this.motivos = response.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    methods: {
        cancelar: function(){
            Swal.fire({
                    text:"¿Está seguro que desea cancelar?",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    cancelButtonText: 'No',
                    cancelButtonColor:'C4C4C4',
                    showCancelButton: true,
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.value) {
                    //lo redirigo
                    this.$router.push('/calendariocitas');
                    
                    } 
                })
        },
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
                                axios.post('/sesiones/asistenciaFormal',sesion_params)
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
        },
        Perfil(){
            this.$router.push('/perfil/1')
        }
    }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/material.css';
@import '../../assets/styles/main.css';
@import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';
#left {
    float: left;
    margin-right: 27px;
}

#right {
    text-align: right;
}
#floated {
    margin-right: 50px;
    float: right;
    height: 100px;
}
.list-data { 
    display: flex;
    width: 100%;
    height: 40px;
}
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