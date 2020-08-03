<template>
    <div class= "formSesionTutoria contenedor">
        <div class="top-titulo row top-row" style="text-align:left;">
            <h4 class="row col-sm-4 tutoria-title">Tipo de Tutoría: </h4>
            <select class="col-sm-4 form-control selectedTT" v-model="selectedTipoTutoria">
                <option disabled selected :value="null" focusable="false">Selecciona un tipo de tutoría</option>
                <option 
                    v-for="(tipoTutoria, index) in tiposTutoria" 
                    :key="index" 
                    :value="tipoTutoria.id_tipo_tutoria">
                    {{ tipoTutoria.nombre }}
                </option>
            </select>
            <date-picker class="col-sm-3 dateSlot" :lang="lang" v-model="datetime" type="datetime" format="DD-MM-YYYY HH:mm" :time-picker-options="timePickerOptions" width="500" placeholder="Selecciona Hora y Fecha"></date-picker>
            <div class="row botones col-sm-4 botones-top">
            <button type="button" class="btn btn-info" @click="guardar()" >Guardar</button>
            <button type="button" class="btn btn-info" @click="cancelar()" style="border-color:gray;background-color:gray;">Cancelar</button>
            </div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        <div class="row grid-divider">
            <div class="izq col-lg-6 col-xm-2 col-md-12">
                <div class="font-weight-bolder text-left">Alumno
                    <button  :disabled="!this.sel" type="button" class="btn btn-info btnAgregarAlM"
                                    @click="addAlumno">Agregar
                </button>
                </div>
                
                <div class="row">
                    <div class="col-md-4 col-sm-4">
                        <div class="col-sm-6"><label for="formGroupExampleInput">Código</label></div>
                        <hr style="width:335%;">
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

                        <ul class="col-sm-12 col-md-12" style="text-align:left;margin-left:-8px;">
                            <li class="form-control" style="width:120%;text-align:center;margin-top:8px;"
                                v-for="(newAlumnoCod,alcIndex) in listAlumnosCod"  
                                :key="alcIndex">
                                {{newAlumnoCod}}           
                            </li>
                        </ul>

                    </div>
                    <div class="col">
                        <div class="col" style="text-align:left;padding-bottom:30px;">
                            <label for="formGroupExampleInput" style="margin-right:50px">Nombre y Apellidos</label>
                            <button  :disabled="!this.sel" type="button" class="btn btn-info btnAgregarAlD"
                                    @click="addAlumno">Agregar
                            </button>
                        </div>
                        <div type="text" class="form-control" placeholder="Nombre" style="color: white;background:#BEBEBE;" >{{alSeleccionado}}</div>
                        <ul class="col" style="color:red;text-align:center;width:200%;margin-left:-10px;padding-right:0px;">
                            <li class="form-control list-group-item" style="padding: 0.4rem 0.5rem;"
                                v-for="(newAlumno,alIndex) in listAlumnosNom"  
                                :key="alIndex">
                                {{newAlumno}}    
                                <span name="remove" class="close" @click="deleteAl(alIndex)" style="color:red;">&times;</span> 
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <div style="position:absolute; bottom:30px;">
                    <!--<date-picker v-model="datetime" lang="es" type="datetime" format="YYYY-MM-DD HH:mm" :time-picker-options="timePickerOptions" width="500" placeholder="Selecciona Hora y Fecha"></date-picker>
                    <date-picker v-model="datetime" type="datetime" :time-picker-options="timePickerOptions" placeholder="Selecciona Hora y Fecha"></date-picker> -->
                </div>
            </div>
            
            <div class="der col-lg-6 col-xm col-md-12">
                <div class="font-weight-bolder text-left">Resultado</div>
                 <div class="top-titulo" style="margin-bottom:20px;">
                    <div class="col-sm-3 motivo-dropdown-title">Motivo: </div>
                    <select class="col-sm-6 form-control" style="left:-40px;top:5px;" v-model="selectedMotivo">
                        <option disabled selected value="null">Selecciona un motivo</option>
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
                            @click="addMotivos">Seleccionar</button>
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
                            <span name="remove" class="close" @click="deleteMotivo(motivoIndex)" style="color:red;margin-right : 20px;float:right;">&times;</span>           
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
                        <option selected disabled hidden :value="null">Seleccionar</option>
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
        <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
            <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
                <b-spinner style="width: 3rem; height: 3rem;"/>
                <br >Cargando... 
            </div>
        </b-modal>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import Swal from 'sweetalert2'
import 'vue2-datepicker/index.css'
import axios from 'axios';
import Vue from 'vue'
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);
export default Vue.extend ({
    name: 'formSesionTutoria',
    components:{
        DatePicker
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
            selectedMotivo: null,
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
            bloque:null,
            
            lang: {
                formatLocale: {
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    // MMM
                    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
                    // dddd
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    // ddd
                    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                    // dd
                    weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                    firstDayOfWeek: 1,
                },
                monthBeforeYear: true,
            },
        }
    },
    mounted(){
        if(this.$store.state.usuario==null) this.$router.push('/login')
        if (window.matchMedia("(max-width: 767px)").matches) {
            document.querySelector("#container > div > div.formSesionTutoria.container > div.top-titulo.row.top-row > div.col-sm-3.dateSlot.mx-datepicker").style.width = "100%"
        }

        document.querySelector("#container > div > div.formSesionTutoria.contenedor > div.top-titulo.row.top-row > div.col-sm-3.dateSlot.mx-datepicker > div > input").style.borderRadius = "1.25rem";
        document.querySelector("#container > div > div.formSesionTutoria.contenedor > div.top-titulo.row.top-row > div.col-sm-3.dateSlot.mx-datepicker > div > input").style.border= "0.5px solid #757575";    
        document.querySelector("#container > div > div.formSesionTutoria.contenedor > div.top-titulo.row.top-row > div.col-sm-3.dateSlot.mx-datepicker > div > input").style.fontWeight = "400";
        document.querySelector("#container > div > div.formSesionTutoria.contenedor > div.top-titulo.row.top-row > div.col-sm-3.dateSlot.mx-datepicker > div > input").style.fontSize = "1rem";
        document.querySelector("#container > div > div.formSesionTutoria.contenedor > div.top-titulo.row.top-row > div.col-sm-3.dateSlot.mx-datepicker > div > input").style.height = "2.4em"; 
        axios.post('/programa/listar/'+this.$store.state.programaActual.id_programa)
            .then( response=>{
                this.bloque = response.data.hora_bloque
                this.timePickerOptions.step = '00:'+this.bloque.toString()
            })
            .catch(e => {
                console.log(e.response);
            });
        axios.post('unidadesApoyo/unidadesxProg',{idProg:this.$store.state.programaActual.id_programa})
            .then(response => {
                for(var i in response.data) {
                    this.unidadesApoyo.push(response.data[i][0]);
                }
            }).catch(e => {
                console.log(e.response);
            });
        axios.post('sesiones/alumnoProg', {idTipoU:5,idProg: this.$store.state.programaActual.id_programa})
            .then( response => {
                this.codigos = response.data;
            })
            .catch(e => {
                console.log(e.response);
            });
        // axios.post('TipoTutoria/listarTodo/' + this.$store.state.programaActual.id_programa)
        //     .then( response => {
        //         this.tiposTutoria = response.data;
        //     })
        //     .catch(e => {
        //     console.log(e.response);
        //     });
             const params = {
                idTutor: this.$store.state.usuario.id_usuario,
                id_programa: this.$store.state.programaActual.id_programa,
            }
            console.log(params);
            axios.post('usuarios/tutoriaTutor', params)
            .then((response) => {
                
                this.tiposTutoria= response.data
            }).catch(e => {
                console.log(e.response);
            });




        axios.post('motivosConsulta/listarTodo')
            .then( response => {
                this.motivos = response.data;
                this.hideModal()
            })
            .catch(e => {
                console.log(e.response);
                this.hideModal()
            });
    },
    methods: {
        guardar: function () {
            const sesion_params = {
                id_usuario: this.$store.state.usuario.id_usuario,
                id_programa: this.$store.state.programaActual.id_programa,
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
                                this.showModal()
                                axios.post('/sesiones/asistencia',sesion_params)
                                    .then( response=>{
                                        if(response) {
                                            this.hideModal()
                                            Swal.fire({
                                                text:"Se ha registrado la sesión con éxito",
                                                icon:"success",
                                                confirmButtonText: 'OK',
                                                confirmButtonColor:'#0097A7',
                                                showConfirmButton: true,
                                            }) 
                                            this.$router.push({name:'Calendario'});
                                        }
                                    })  
                                    .catch(e => {
                                        console.log(e.response);
                                        this.hideModal()
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
            this.selectedMotivo= null;
            this.newMotivo= null;
            this.listMotivos=[],
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
            this.selectedMotivo = null
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
            this.selectedMotivo = null
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
            if(this.alSeleccionado != 'Nombre Alumno' && !estaAl ){ 
                this.listAlumnosNom.push(this.alSeleccionado);
                this.listAlumnosCod.push(this.sel);
                for(var j in this.codigos){
                    if(this.sel == this.codigos[j].codigo)
                        this.listAlumnosId.push(this.codigos[j].id_usuario);
                }
                this.alSeleccionado='Nombre Alumno';
                this.sel= '';
            }            
            
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
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
.btnAgregarAlD {
    display:none;
}

@media screen and (min-width: 800px) {
    .dateSlot {
        left:-160px;
        top:26px
    }
    .btnAgregarAlM {
        display:none;
    }
    .btnAgregarAlD {
        display:inline;
        margin:-3px;
    }
    .selectedTT {
        left:-160px;
        top:26px;
    }
    .botones-top {
        margin-left: -150px;
        margin-bottom:10px;
    }
    .top-row {
        flex-wrap: inherit;
    }

}
@media (max-width: 767px) {
    .selectedTT {
        width: 87%;
        left: 17px;
    }
    .top-titulo {
        padding: 0px 20px;
    }
    .botones-top { 
        top:15px;
    }
}
</style>