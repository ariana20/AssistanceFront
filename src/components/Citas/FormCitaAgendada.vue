<template>
    <div class="formcitaagendada container">
        <div class="top-info" style="text-align:left;">
            <div id="botones">
                <button v-if="this.cita[1]=='l' && !this.editar" type="button" class="btn btn-info" @click="editFields">Editar</button>
                <button v-else-if="this.editar" type="button" class="btn btn-info" @click="guardar">Guardar</button>
                
                
                <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
            </div>
                <div class="botones list-data"><div id="left">Día:          </div> <div id="right"> {{ this.event.extendedProps.fecha }} </div></div>
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
                        <figure v-if="this.event.extendedProps.alumno.imagen!='' && this.event.extendedProps.alumno.imagen!=null" id="floated" class="image-logo" style="margin-bottom:15%">
                                <img  :src="this.event.extendedProps.alumno.imagen" height="110px" width="110px" />		
                        </figure>
                        <figure v-if="this.event.extendedProps.alumno.imagen=='' || this.event.extendedProps.alumno.imagen==null" id="floated" class="image-logo" style="margin-bottom:15%">	
                                <b-avatar size="7rem" ></b-avatar>		
                        </figure>
                        <button type="button" class="btn btn-info" style="margin-left: 4%;" @click="Perfil(3)">Ver Perfil</button>
                    </div>
                </div>
                <div style="bottom:30px;">
                    <div>
                        <div class="font-weight-bolder text-left">Información Adicional</div>
                        <div v-if="$store.state.permisosUsuario!= null && $store.state.permisosUsuario.includes('Visualizar Documentos')" id="botones" style="justify-content: space-between;margin-left: 55px;margin-right: 75px;">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44.4444 5H41.6667V2.5C41.6667 1.125 40.4167 0 38.8889 0C37.3611 0 36.1111 1.125 36.1111 2.5V5H13.8889V2.5C13.8889 1.125 12.6389 0 11.1111 0C9.58333 0 8.33333 1.125 8.33333 2.5V5H5.55556C2.47222 5 0.0277778 7.25 0.0277778 10L0 45C0 46.3261 0.585316 47.5979 1.62718 48.5355C2.66905 49.4732 4.08213 50 5.55556 50H44.4444C47.5 50 50 47.75 50 45V10C50 7.25 47.5 5 44.4444 5ZM44.4444 42.5C44.4444 43.875 43.1944 45 41.6667 45H8.33333C6.80556 45 5.55556 43.875 5.55556 42.5V17.5H44.4444V42.5ZM11.1111 22.5H16.6667V27.5H11.1111V22.5ZM22.2222 22.5H27.7778V27.5H22.2222V22.5ZM33.3333 22.5H38.8889V27.5H33.3333V22.5Z" fill="black"/>
                            </svg>
                            <svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4737 13.6579H16.1329L16.0083 13.9751L1.53462 50.8172L1.26637 51.5H2H7.78947H8.13869L8.25891 51.1721L11.0334 43.6053H26.6508L29.4253 51.1721L29.5455 51.5H29.8947H36.2105H36.9442L36.6759 50.8172L22.2022 13.9751L22.0776 13.6579H21.7368H16.4737ZM52.5 8.89474V8.39474H52H44.6053V1V0.5H44.1053H38.8421H38.3421V1V8.39474H30.9474H30.4474V8.89474V14.1579V14.6579H30.9474H38.3421V22.0526V22.5526H38.8421H44.1053H44.6053V22.0526V14.6579H52H52.5V14.1579V8.89474ZM13.515 37.3421L19.1053 22.6677L24.6955 37.3421H13.515Z" fill="black" stroke="black"/>
                            </svg>
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.57247 26.0949L10.6574 30.0712L36.8383 15.7898L21.0476 34.2107L43.6809 44.5158C44.068 44.6853 44.4902 44.7592 44.9119 44.7311C45.3335 44.7029 45.7422 44.5737 46.1033 44.3543C46.4645 44.1349 46.7674 43.8318 46.9867 43.4706C47.2059 43.1093 47.3349 42.7006 47.3628 42.279L49.9946 2.80565C50.0239 2.34877 49.9337 1.89213 49.733 1.48066C49.5322 1.0692 49.2278 0.71709 48.8496 0.458985C48.4715 0.20088 48.0326 0.0456746 47.5763 0.00864158C47.1199 -0.0283915 46.6618 0.0540238 46.2469 0.247778L1.50668 21.3002C1.0503 21.5167 0.665713 21.8598 0.398658 22.2885C0.131603 22.7172 -0.00668216 23.2137 0.000248292 23.7187C0.00717875 24.2238 0.159033 24.7162 0.437752 25.1374C0.71647 25.5587 1.11032 25.891 1.57247 26.0949ZM15.7841 50L28.3535 43.9053L15.7841 38.0422V50Z" fill="black"/>
                            </svg>
                        </div>
                        <div v-else style="justify-content: space-between;margin-left: 55px;margin-right: 75px;">
                            <svg style="margin-left:2%" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44.4444 5H41.6667V2.5C41.6667 1.125 40.4167 0 38.8889 0C37.3611 0 36.1111 1.125 36.1111 2.5V5H13.8889V2.5C13.8889 1.125 12.6389 0 11.1111 0C9.58333 0 8.33333 1.125 8.33333 2.5V5H5.55556C2.47222 5 0.0277778 7.25 0.0277778 10L0 45C0 46.3261 0.585316 47.5979 1.62718 48.5355C2.66905 49.4732 4.08213 50 5.55556 50H44.4444C47.5 50 50 47.75 50 45V10C50 7.25 47.5 5 44.4444 5ZM44.4444 42.5C44.4444 43.875 43.1944 45 41.6667 45H8.33333C6.80556 45 5.55556 43.875 5.55556 42.5V17.5H44.4444V42.5ZM11.1111 22.5H16.6667V27.5H11.1111V22.5ZM22.2222 22.5H27.7778V27.5H22.2222V22.5ZM33.3333 22.5H38.8889V27.5H33.3333V22.5Z" fill="black"/>
                            </svg>
                            <svg style="margin-left:28%" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.57247 26.0949L10.6574 30.0712L36.8383 15.7898L21.0476 34.2107L43.6809 44.5158C44.068 44.6853 44.4902 44.7592 44.9119 44.7311C45.3335 44.7029 45.7422 44.5737 46.1033 44.3543C46.4645 44.1349 46.7674 43.8318 46.9867 43.4706C47.2059 43.1093 47.3349 42.7006 47.3628 42.279L49.9946 2.80565C50.0239 2.34877 49.9337 1.89213 49.733 1.48066C49.5322 1.0692 49.2278 0.71709 48.8496 0.458985C48.4715 0.20088 48.0326 0.0456746 47.5763 0.00864158C47.1199 -0.0283915 46.6618 0.0540238 46.2469 0.247778L1.50668 21.3002C1.0503 21.5167 0.665713 21.8598 0.398658 22.2885C0.131603 22.7172 -0.00668216 23.2137 0.000248292 23.7187C0.00717875 24.2238 0.159033 24.7162 0.437752 25.1374C0.71647 25.5587 1.11032 25.891 1.57247 26.0949ZM15.7841 50L28.3535 43.9053L15.7841 38.0422V50Z" fill="black"/>
                            </svg>
                        </div>
                        <div id="botones" v-if="$store.state.permisosUsuario!= null && $store.state.permisosUsuario.includes('Visualizar Documentos')">
                            <button id="adicional" type="button" class="btn btn-info" height="20px" @click="Perfil(1)">Histórico de Citas</button>
                            <button id="adicional" v-if="$store.state.permisosUsuario!= null && $store.state.permisosUsuario.includes('Visualizar Documentos')" type="button" class="btn btn-info" @click="Perfil(2)">Histórico del Alumno</button>
                            <button id="adicional" type="button" class="btn btn-info" @click="Perfil(3)">Plan de acción</button>
                        </div>
                        <div v-else>
                            <button id="adicional" type="button" class="btn btn-info" height="20px" @click="Perfil(1)">Historico de Citas</button>
                            <button id="adicional"  type="button" class="btn btn-info" @click="Perfil(3)">Plan de acción</button>
                        </div>
                    </div>
                    <!--<div style="margin-top:10%;float:left;font-size:23px;"><input type="checkbox" style="height:20px;width:30px;" v-model="asistencia" />Asistencia</div>-->
                                 
                </div>
                
                
                <!--<div style="position:absolute; bottom:30px;">
                    <input type="checkbox" v-model="asistencia"/>Asistencia
                </div>-->
            </div>
            <div class="der col-lg-6 col-xm col-md-12">
                <div class="font-weight-bolder text-left">Resultado</div>
                <p class="col-sm-12" style="text-align:left">
                    <nobr style="margin-right:30px"><input type="radio" class="col-sm-1" id="asistio" v-model="asistencia" value="asistio">Asistió</nobr>
                    <input type="radio" class="col-sm-1" id="noasistio" v-model="asistencia" value="noasistio">No asistió
                </p> 
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
                            @click="addMotivos()">Seleccionar</button>
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
                        <option selected disabled :value="null" >Seleccionar</option>
                        <option
                        v-for="(unidadApoyo, i) in unidadesApoyo" 
                        :key="i" 
                        :value="unidadApoyo">
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
            condicion_alumno: null,
            //this.$store.state.curEvent.extendedProps.alumno.condicion_alumno.toUpperCase(),
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
            selectedMotivo: null,
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
            cita: this.$store.state.curSesion,
            editar: false,
            us:null,
        }
    },
    mounted(){
        console.log('datos', this.cita[0])
        if (this.$store.state.cond) 
            this.condicion_alumno=this.$store.state.cond.toUpperCase();
        else 
            this.condicion_alumno='Sin asignar';
        // console.log('idCita: ',this.$store.state.idCita)
        //LLENANDO LOS CAMPOS CUANDO HAY INFO EN LA SESION
        // console.log('editar status: ',this.editar)
        // console.log('obtuve la cita: ',this.$store.state.curSesion)
        // if(this.cita[1] != "l") {
        //     this.descripcion = this.cita[1].resultado
        //     if(this.cita[0].cita_x_usuarios[0].pivot.asistencia == 'asi') {
        //         this.asistencia = true
        //     }
        //     console.log('longitud for:', this.cita[1].motivo_consultas)
        //     for(var i in this.cita[1].motivo_consultas) {
        //         this.selectedMotivo = this.cita[1].motivo_consultas[i].id_motivo_consulta
        //         console.log('motivo selected: ', this.selectedMotivo)
        //         this.addMotivos()
        //     }
        
        //     console.log('motivos: ', this.listMotivos)
        //     //si hay info de la sesion quiere decir que ha asistido a su 
        // }
        // console.log('cita  ', this.cita);
        this.disableFields()
        
        
        //console.log('evento actual: ', this.$store.state.programaActual);
        axios.post('unidadesApoyo/unidadesxProg',{idProg:this.$store.state.programaActual.id_programa})
            .then(response => {
                for(var i in response.data) {
                    this.unidadesApoyo.push(response.data[i][0]);
                }
                this.hideModal()
            }).catch(e => {
                console.log(e.response);
                this.hideModal()
            });
        axios.post('motivosConsulta/listarTodo')
            .then( response => {
                this.motivos = response.data;
                console.log('motivos:',this.motivos)
                this.fillFields()
                this.hideModal()
            })
            .catch(e => {
            console.log(e.response);
        });    
        console.log('motivos:',this.motivos)
        if(this.asistencia) {
            document.getElementById("adicional").style.display = "none" 
        }
    },
    methods: {
        fillFields() {
            if(this.cita[1] != "l") {
            this.descripcion = this.cita[1].resultado
            if(this.cita[0].cita_x_usuarios[0].pivot.asistencia == 'asi') {
                document.getElementById('asistio').checked = true
            } 
            else if(this.cita[0].cita_x_usuarios[0].pivot.asistencia == 'noa')
                document.getElementById('noasistio').checked = true
            //console.log('longitud for:', this.cita[1].motivo_consultas)
            for(var i in this.cita[1].motivo_consultas) {
                this.selectedMotivo = this.cita[1].motivo_consultas[i].id_motivo_consulta
                // console.log('motivo selected: ', this.selectedMotivo)
                this.addMotivos()
            }
        }
        },
        enableFields() {
            let elems = document.getElementsByTagName('input')
            elems[0].disabled = false;
            elems[1].disabled = false;
            let elems2 = document.getElementsByTagName('select');
            for(let i = 0; i < elems2.length; i++) {
                elems2[i].disabled = false;
            }
            let elems3 = document.getElementsByTagName('textarea');
            elems3[0].disabled = false;
            
        },
        disableFields() {
            let elems = document.getElementsByTagName('input')
            elems[0].disabled = true;elems[1].disabled = true;
            let elems2 = document.getElementsByTagName('select');
            for(let i = 0; i < elems2.length; i++) {
                elems2[i].disabled = true;
            }
            let elems3 = document.getElementsByTagName('textarea');
            elems3[0].disabled = true;
            var aux = document.querySelector("#app > nav.navbar.navbar-dark.navbar-expand-lg > select")
            if(aux) {
                aux.disabled = false
            }
        },
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
                        this.descripcion= '';
                        this.motivo= null;
                        this.sel= '';
                        this.selectedTipoTutoria= null;
                        this.selectedMotivo= '';
                        this.newMotivo= null;
                        this.listMotivosId= [];
                        this.motivosBorrados=[];
                        this.selectedUnidadApoyo= null;
                        //lo redirigo
                        this.$router.push('/calendariocitas');
                    } 
                })
        },
        editFields: function () {
            if(this.cita[1]=='l') {
                this.enableFields()
                this.editar=true
            }
            
        },
        guardar: function () {
            let array = []
            let arrayAsis = []
            array.push(this.event.extendedProps.alumno.id_usuario);
            if(this.asistencia.value == 'asistio') 
                arrayAsis[0] = 'asi'
            else
                arrayAsis[0] = 'noa'
            //console.log(arrayAsis);
            const sesion_params = {
                id_cita: this.$store.state.idCita,
                resultado: this.descripcion,
                usuario_creacion: this.cita[1].usuario_creacion,
                usuario_actualizacion: this.cita[1].usuario_actualizacion,
                idAlumnos: array,
                asistencia: arrayAsis,
                idMotivos: this.listMotivosId,
            }; console.log(sesion_params );
                if(this.listMotivos.length > 0) {
                        
                            if(this.descripcion!=null) {
                                if(this.selectedUnidadApoyo) {
                                    this.enviarCorreo(this.selectedUnidadApoyo)
                                }
                                axios.post('/sesiones/regSesionFormal',sesion_params)
                                    .then( response=>{
                                        response
                                        this.disableFields()
                                        Swal.fire({
                                            text:"Se ha registrado la sesión con éxito",
                                            icon:"success",
                                            confirmButtonText: 'OK',
                                            confirmButtonColor:'#0097A7',
                                            showConfirmButton: true,
                                        }) 
                                        this.$router.push('/calendariocitas')
                                    })  
                                    .catch(e => {
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
                else if(arrayAsis[0]=='noa'){
                    Swal.fire({
                        text:"¿Está seguro que sea desea guardar esta cita con No Asistió del alumno?",
                        icon:"warning",
                        confirmButtonText: 'Sí',
                        confirmButtonColor:'#0097A7',
                        cancelButtonText: 'Corregir',
                        cancelButtonColor:'C4C4C4',
                        showCancelButton: true,
                        showConfirmButton: true,
                    })
                    .then((result) => {
                            if (result.value) {
                                let sesion_params = {
                                    id_cita: this.$store.state.idCita,
                                    resultado: "",
                                    usuario_creacion: this.cita[1].usuario_creacion,
                                    usuario_actualizacion: this.cita[1].usuario_actualizacion,
                                    idAlumnos: array,
                                    asistencia: arrayAsis,
                                    idMotivos: [],
                                }; 
                                axios.post('/sesiones/regSesionFormal',sesion_params)
                                        .then( response=>{
                                            response
                                            this.disableFields();
                                            Swal.fire({
                                                text:"Se ha registrado la sesión con éxito",
                                                icon:"success",
                                                confirmButtonText: 'OK',
                                                confirmButtonColor:'#0097A7',
                                                showConfirmButton: true,
                                            }) 
                                            this.$router.push('/listadocitas');
                                        })  
                                        .catch(e => {
                                            console.log(e);
                                        });
                            }
                            else  if( result.dismiss === Swal.DismissReason.cancel ) {
                                //Nada que corrija
                            }
                    });
                    }            
        },
        onCodigoChange: function () {
            var i;
            for(i in this.codigos){
                if(this.sel==this.codigos[i].codigo){
                    this.alSeleccionado = this.codigos[i].nombre + ' ' + this.codigos[i].apellidos;                
                }
                // console.log(this.alSeleccionado);
                //break;   
            }
        },
        addMotivos: function () {
            // console.log('la funcion addmotivos ha sido llamada',this.motivos)
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
            if(this.cita[1]=='l'){
            for(i in this.motivosBorrados)
                if(this.listMotivos[index]==this.motivosBorrados[i].nombre) {
                    this.motivos.push(this.motivosBorrados[i]);
                    break;
                }
            
            this.listMotivos.splice(index,1);
            this.listMotivosId.splice(index,1);

            }
        },
        enviarCorreo(unidad){
            let mensaje = "Se te ha derivado a "+unidad.nombre+":<br>"
                            +"Nombre Contacto: "+unidad.nombre_contacto+"<br>"
                            +"Correo Contacto: "+unidad.correo_contacto+"<br>"
                            //"responder": this.$store.state.usuario.correo,
            emailjs.send(
                  "gmail",
                  "template_bV7OIjEW",
                  {
                  "nombre":this.event.extendedProps.alumno.nombre+" "+ this.event.extendedProps.alumno.apellidos,
                  "mensaje":mensaje,
                  "responder": this.$store.state.usuario.correo,
                  "correo": this.event.extendedProps.alumno.correo
                  }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                  .then((result) => {
                      console.log('SUCCESS!', result.status, result.text);
                  }, (error) => {
                      console.log('FAILED...', error);
                  });
        },
        Perfil(tipo){
            if(tipo == 1){
                this.$store.state.verPdf=false;this.$store.state.verCitas=true;this.$store.state.verPlan=false;
            }
            if(tipo == 2){
                this.$store.state.verPdf=true;this.$store.state.verCitas=false;this.$store.state.verPlan=false;
            }
            if(tipo == 3){
                this.$store.state.verPdf=false;this.$store.state.verCitas=false;this.$store.state.verPlan=true;
            }
            this.$store.state.citaDatos=null;
            this.$router.push('/perfil/'+this.event.extendedProps.alumno.id_usuario)
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
    @import '../../assets/styles/main.css';
    @import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';
    #left {
        float: left;
        margin-right: 27px;
        width: 100px;
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