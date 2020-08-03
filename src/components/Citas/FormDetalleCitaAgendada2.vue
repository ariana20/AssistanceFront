<template>
    <div class="formcitaagendada contenedor">
        <div class="top-info" style="text-align:left;">
            <div id="botones">
                 <button v-if=" !this.editar && this.$store.state.citaDatos.alumnos[0].pivot.asistencia=='pen'" type="button" class="btn btn-info" @click="editFields">Editar</button>
                <button v-else-if="this.editar" type="button" class="btn btn-info" @click="guardar">Guardar</button>
                 
                
                <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
            </div>
                <div class="botones list-data"><div id="left">Día:          </div> <div id="right"> {{ this.$store.state.citaDatos.fechaIni }} </div></div>
                 <div class="list-data"><div id="left">Hora Inicio:  </div> <div id="right"> {{ this.$store.state.citaDatos.fechaFin }} </div></div>
               <!-- <div class="list-data"><div id="left">Hora Fin:     </div> <div id="right"> {{ this.event.end | formatHour }} </div></div>-->
                <div class="list-data"><div id="left">Tipo Tutoría: </div> <div v-if="this.tutoriaTutor!=null" id="right"> {{ this.tutoriaTutor.nombre }} </div></div> 
                
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
            <div class="row grid-divider">
            <div class="izq col-lg-6 col-xm-2 col-md-12" style="text-align:left;">
                <!--LADO IZQUIERDO-->
                <div class="font-weight-bolder text-left">Alumno(s)</div>
                <div class="row">
                    <div class="col-md-4 col-sm-4">
                        <div class="col-sm-6"><label for="formGroupExampleInput">Código</label></div>
                        <hr style="width:335%;">
                        <ul class="col-sm-12 col-md-12" style="text-align:left;margin-left:-8px;">
                            <li class="form-control" style="width:120%;text-align:center;margin-top:8px;"
                                v-for="(newAlumnoCod,alcIndex) in listAlumnosCod"  
                                :key="alcIndex">
                                {{newAlumnoCod}}           
                            </li>
                        </ul>

                    </div>  <!-- termina la columa de codigos -->
                    <div class="col-md-8 col-xs-4">
                        <div class="col" style="text-align:left;padding-bottom:30px;">
                            <label for="formGroupExampleInput" style="margin-right:50px">Nombre y Apellidos</label>
                            <label for="formGroupExampleInput">Asistencia</label>
                        </div>
                        <ul class="col" style="text-align:center;width:200%;margin-left:-10px;padding-top:4px;">
                            <li class="form-control list-group-item" style="padding: 0.4rem 0.5rem;"
                                v-for="(newAlumno,alIndex) in listAlumnosNom"  
                                :key="alIndex">
                                {{newAlumno.nombres}}    
                                <input id="asis" type="checkbox" style="height:20px;width:20px;text-indent: 25px" v-model="newAlumno.asistencia" />                                  
                            </li>
 
                             
                        </ul>
                        
                    </div> 
                     <!-- termina la columna de nombres -->
                    
                </div> <!-- termina row1 que es todos los alumnos -->
                <!-- <div style="margin-top:10%;font-size:23px;"><input type="checkbox" style="height:20px;width:30px;" v-model="asistencia" />Asistencia</div> -->
            </div>  <!-- termina     LADO IZQUIERDO -->
            <div class="der col-lg-6 col-xm col-md-12">
                <div class="font-weight-bolder text-left">Resultado</div>
                 <div class="top-titulo" style="margin-bottom:20px;">
                    <div class="col-sm-3 motivo-dropdown-title">Motivo:* </div>
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
                        <label for="descripcion">Descripción:*</label>
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
//import emailjs from 'emailjs-com';
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
            //condicion_alumno: this.$store.state.curEvent.extendedProps.alumno.condicion_alumno.toUpperCase(),
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
            motivos: null,
            newMotivo: null,
            asistencia:[],
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
            tt:[],
            ttselect:"no",
            idCita:null,
            alumnosEli:[],
            miUsuario:this.$store.state.usuario, 
            mipermisosUsuario:null,
            tutoriaTutor:null,
        }
    },
    mounted(){
       
        //LLENANDO LOS CAMPOS CUANDO HAY INFO EN LA SESION
        /*
        console.log('Cita-: ',this.cita);
            console.log('Cita1: ',this.cita[1]);
         if(this.cita[1] != "l") {
             this.descripcion = this.cita[1].resultado
             if(this.cita[0].cita_x_usuarios[0].pivot.asistencia == 'asi') {
                 this.asistencia = true
             }
           
             for(var i in this.cita[1].motivo_consultas) {
                 this.selectedMotivo = this.cita[1].motivo_consultas[i].id_motivo_consulta
                
                 this.addMotivos()
             }
        
        //    
        //     //si hay info de la sesion quiere decir que ha asistido a su 
         }
         */
        axios.post('motivosConsulta/listarTodo')
        .then( response => {
           
            this.motivos = response.data;
            // console.log('M',this.motivos);              
            if(this.cita==null) this.llenarTT();
            // console.log('?M mount', this.motivos!=null);
            // console.log('?C mount',this.cita!=null );
            if(this.cita!=null && this.motivos!=null){
                if(this.cita[1] != "l") {   
                    this.descripcion = this.cita[1].resultado;    
                    for(var i in this.cita[1].motivo_consultas) {
                        this.selectedMotivo = this.cita[1].motivo_consultas[i].id_motivo_consulta;             
                        this.addMotivos();
                    }
            }}
          
        })
        .catch(e => {
          console.log('catch motivos:',e);
        });
        
        this.disableFields();
        this.fillFields();
        
       
        axios.post('unidadesApoyo/unidadesxProg',{idProg:this.$store.state.programaActual.id_programa})
        .then(response => {
            this.us = response.data
        }).catch(e => {
            console.log(e);
        });
      
        axios.post('unidadesApoyo/unidadesxProg',{idProg:this.$store.state.programaActual.id_programa})
            .then(response => {
                for(var i in response.data) {
                    this.unidadesApoyo.push(response.data[i][0]);
                }
                this.hideModal()
            }).catch(e => {
                console.log(e);
                this.hideModal()
            });

        
       
    
    },
    methods: {
        llenarTT(){
            // console.log('En tt');
            this.showModal();
            axios.post('disponibilidades/mostrarCita2', 
                {idDisponibilidad:this.$store.state.citaDatos.id_disponibilidad})
            .then((response) => {
            
                this.tutoriaTutor=response.data[0].tipo_tutoria;
                //  console.log('TutoriaTutor: ',this.tutoriaTutor);
                 this.cita=response.data;
               
                // console.log('Cita:',this.cita);
                // console.log('?M tt', this.motivos!=null);
                // console.log('?C tt',this.cita!=null );
                if(this.cita!=null && this.motivos!=null){
                        if(this.cita[1] != "l") {                            
                            this.descripcion = this.cita[1].resultado;    
                            for(var i in this.cita[1].motivo_consultas) {
                                this.selectedMotivo = this.cita[1].motivo_consultas[i].id_motivo_consulta;             
                                this.addMotivos();
                            }
                    }}
                this.hideModal();
            }).catch(e => {
                console.log('catch: ',e);
                this.hideModal();
            });
            
            
        },
        fillFields() {
            // console.log('cita: ',this.cita);
            // console.log('CitaDatos: ',this.$store.state.citaDatos);
            let alumnosCita=this.$store.state.citaDatos.alumnos;
            // console.log(alumnosCita);
            if(alumnosCita.length > 1) { //Solo muestro varios alumnos
                for(let i in alumnosCita){
                     this.listAlumnosCod.push(alumnosCita[i].codigo);
                    this.listAlumnosId.push(alumnosCita[i].id_usuario);
                    var infoAlumno=new Object();
                    
                    if(alumnosCita[i].pivot.asistencia == 'asi') {
                        infoAlumno.asistencia = true;
                    }
                    else if(alumnosCita[i].pivot.asistencia == 'noa' || alumnosCita[i].pivot.asistencia == 'pen' ) {
                        infoAlumno.asistencia = false;
                        
                    }                    
                    infoAlumno.nombres=alumnosCita[i].nombre+" " +alumnosCita[i].apellidos;
                    this.listAlumnosNom.push(infoAlumno);
                    //Podría hacerlo más responsive si todo lo junto en un solo arreglo e imprimo por i
                   }             
            }
            //console.log('1 ',this.cita);
            
        },
        enableFields() {

            let elems2 = document.getElementsByTagName('select');
            for(let i = 0; i < elems2.length; i++) {
                elems2[i].disabled = false;
            }
            let elems3 = document.getElementsByTagName('textarea');
            elems3[0].disabled = false;
        },
        disableFields() {

            let elems2 = document.getElementsByTagName('select');
            for(let i = 0; i < elems2.length; i++) {
                elems2[i].disabled = true;
            }
            let elems3 = document.getElementsByTagName('textarea');
            elems3[0].disabled = true;
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
                        this.cita=undefined;
                        this.$store.state.curSesion=null;
                        this.$store.state.citaDatos=null;
                        //lo redirigo
                        this.$router.push('/listadocitas');
                    } 
                })
        },
        
        editFields: function () {
            if(this.cita[1]=='l') {
                this.enableFields();
                this.editar=true;
            }
            

            
        },
        guardar: function () {

            let faltaron=false;            
            for(let i in this.listAlumnosNom ){
                if(this.listAlumnosNom[i].asistencia==true)            this.asistencia[i]="asi";
                else if(this.listAlumnosNom[i].asistencia==null || this.listAlumnosNom[i].asistencia==false  )  { 
                    this.asistencia[i]="noa"; 
                     faltaron=true; //Por lo menos faltó uno
                    //  console.log('o es false o el null');
                }
                
            }
            // console.log(faltaron);
            //varios un alumno
            console.log(this.$store.state.citaDatos);
            const sesion_params = {
                id_cita:this.$store.state.citaDatos.props,
                resultado: this.descripcion,
                usuario_creacion: this.cita[1].usuario_creacion,
                usuario_actualizacion:this.$store.state.usuario.id_usuario,
                idAlumnos: this.listAlumnosId,
                asistencia: this.asistencia,
                idMotivos: this.listMotivosId,
            };
                 console.log(sesion_params);

            if(faltaron==false){
                if(this.listMotivos.length > 0) {
                       
                            
                            if(this.descripcion!=null  ) {
                               
                                if(this.selectedUnidadApoyo) {
                                    this.enviarCorreo(this.selectedUnidadApoyo)
                                }

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
                                        //lo redirigo a los calendarios
                                        this.$router.push('/listadocitas');
                                    })  
                                    .catch(e => {
                                        console.log(e);
                                        Swal.fire({
                                                    text:"Estamos teniendo problemas al guardar la cita. Vuelve a intentar en unos minutos.",
                                                    icon:"warning",
                                                     confirmButtonText: 'Continuar',
                                                     confirmButtonColor:'#0097A7',
                                                     showConfirmButton: true,
                                         });
                                    });
                            }
                            else if(this.descripcion==null) {
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
                        text:"Debe seleccionar por lo menos un motivo",
                        icon:"error",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                }
            }
            else if(faltaron==true){
                                 Swal.fire({
                                        text:"Por lo menos un alumno no asisitó a la cita. ¿Está seguro que desea guardar",
                                        icon:"warning",
                                        confirmButtonText: 'Sí',
                                        confirmButtonColor:'#0097A7',
                                        showConfirmButton: true,

                                        cancelButtonText: 'No',
                                        cancelButtonColor:'C4C4C4',
                                        showCancelButton: true,
                                    }).then((result) => {
                                        if (result.value) {
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
                                                 //lo redirigo a los calendarios
                                                 this.$router.push('/listadocitas');
                                             })  .catch(e => {
                                                 console.log('catch sesion: ',e);
                                                 Swal.fire({
                                                             text:"Estamos teniendo problemas al guardar la cita. Vuelve a intentar en unos minutos.",
                                                             icon:"warning",
                                                              confirmButtonText: 'Continuar',
                                                              confirmButtonColor:'#0097A7',
                                                              showConfirmButton: true,
                                                  });
                                             });

                                        }   //fin del if result.value
                                    
                                    }) //fin del then re
            }
            
        },
        onCodigoChange: function () {
            var i;
            for(i in this.codigos){
                if(this.sel==this.codigos[i].codigo){
                    this.alSeleccionado = this.codigos[i].nombre + ' ' + this.codigos[i].apellidos;                
                }
              
            }
        },
        addMotivos: function () {
        //    console.log('selectMotivo: ',this.selectedMotivo);
        //    console.log('motivos: ',this.motivo);
            for(var i in this.motivos)
                if(this.selectedMotivo==this.motivos[i].id_motivo_consulta) {
                    this.listMotivos.push(this.motivos[i].nombre);
                    this.listMotivosId.push(this.motivos[i].id_motivo_consulta);
                    this.motivosBorrados.push(this.motivos[i]);
                    this.motivos.splice(i,1);  
                }
            this.selectedMotivo=null;
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
        /*
        enviarCorreo(unidad){
            let mensaje = "Se te ha derivado a "+unidad.nombre+":<br>"
                            +"Nombre Contacto: "+unidad.nombre_contacto+"<br>"
                            +"Correo Contacto: "+unidad.correo_contacto+"<br>"
            emailjs.send(
                  "gmail",
                  "template_bV7OIjEW",
                  {
                  "nombre":this.event.extendedProps.alumno.nombre+" "+ this.event.extendedProps.alumno.apellidos,
                  "mensaje":mensaje,
                  "correo": this.event.extendedProps.alumno.correo
                  }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                  .then((result) => {
                      console.log('SUCCESS!', result.status, result.text);
                  }, (error) => {
                      console.log('FAILED...', error);
                  });
        },*/
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
            //this.$router.push('/perfil/'+this.event.extendedProps.alumno.id_usuario)
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        //METODOS PARA LLENAR ALUMNOS 
        llenarAlumnos(){
           // this.codigo  //Los alumnos que lista
        
           let n=this.$store.state.citaDatos.alumnos.length;
           
           if(n==1){
             this.listAlumnosNom.push(this.$store.state.citaDatos.alumnos[0].nombre +" " +this.$store.state.citaDatos.alumnos[0].apellidos);
             this.listAlumnosCod.push(this.$store.state.citaDatos.alumnos[0].codigo);
             this.listAlumnosId.push(this.$store.state.citaDatos.alumnos[0].id_usuario);
           }
           else if(n>1){
                for(let i=0;i<n;i++){
                    this.listAlumnosNom.push(this.$store.state.citaDatos.alumnos[i].nombre+" " +this.$store.state.citaDatos.alumnos[i].apellidos);
                     this.listAlumnosCod.push(this.$store.state.citaDatos.alumnos[i].codigo);
                    this.listAlumnosId.push(this.$store.state.citaDatos.alumnos[i].id_usuario);
                }
           }
        
        },  
              
       
        listarAlumnosxProg(){
            this.showModal();
            axios.post('sesiones/alumnoProg', {
                    idTipoU:5, //Id=5 lista los alumnos, 
                    idProg: this.$store.state.programaActual.id_programa
                })
            .then( response => {
                   
                    for(var i in response.data){ 
                        this.codigos.push(response.data[i][0]);
                    }
                    this.hideModal();
                   this.mipermisosUsuario=this.$store.state.permisosUsuario;
                  
                })
            .catch(e => {
                    console.log('catch',e.response);
                    this.hideModal();
                    Swal.fire({
                     text:"Estamos teniendo problemas al cargar el listado de alumnos. Vuelva a intentar en unos minutos",
                     icon:"error",
                     confirmButtonText: 'OK',
                     confirmButtonColor:'#0097A7',
                     showConfirmButton: true,
                 }) 

                });
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
 .btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}   
</style>