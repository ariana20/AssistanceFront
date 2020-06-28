<template>
    <div class="formcitaagendada container">
        <div class="top-info" style="text-align:left;">
            <div id="botones">
                <button type="button" class="btn btn-info" @click="guardar">Guardar</button>
                <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
            </div>

               <!-- <div class="list-data"><div id="left">Tipo Tutoría: </div> <div id="right"> {{ this.event.extendedProps.description }} </div></div> -->
                <div class="botones list-data"><div id="left">Día:          </div> <div id="right"> {{ this.$store.state.citaDatos.fechaIni   | formatDate }} </div></div>
                <div class="list-data"><div id="left">Hora Inicio:  </div> <div id="right"> {{ this.$store.state.citaDatos.fechaIni | formatHour}} </div></div>
                <div class="list-data"><div id="left">Hora Fin:  </div> <div id="right"> {{ this.$store.state.citaDatos.fechaFin | formatHour}} </div></div>
                <div class="list-data"><div id="left">Tipo de Tutoria:  </div> <div id="right"> 
                <select  class="col-sm-12 form-control"    v-model="ttselect">
                        <option selected disabled value="no">Selecciona un tipo de tutoria</option>
                        <option v-for="(ttutoria, i) in tt"  :key="i"   :value="ttutoria.id_tipo_tutoria">
                        {{ ttutoria.nombre }}
                        </option>
                </select>
               
                </div></div>
        
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
       
          <div class="row ">
            <div class="izq col-lg-6 col-xm-2 col-md-12">
                <div class="font-weight-bolder text-left">Alumno</div>
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
                            <button  :disabled="!this.sel" type="button" class="btn btn-info" style="display:inline;margin:-3px;"
                                    @click="addAlumno">Agregar
                            </button>
                        </div>
                        <div type="text" class="form-control" placeholder="Nombre" style="color: white;background:#BEBEBE;" >{{alSeleccionado}}</div>
                        <ul class="col" style="text-align:center;width:200%;margin-left:-10px;padding-right:0px;">
                            <li class="form-control list-group-item" style="padding: 0.4rem 0.5rem;"
                                v-for="(newAlumno,alIndex) in listAlumnosNom"  
                                :key="alIndex">
                                {{newAlumno}}    
                                <span name="remove" class="close" @click="deleteAl(alIndex)">&times;</span> 
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <div style="position:absolute; bottom:30px;">
                    <!--<date-picker v-model="datetime" lang="es" type="datetime" format="YYYY-MM-DD HH:mm" :time-picker-options="timePickerOptions" width="500" placeholder="Selecciona Hora y Fecha"></date-picker>
                    <date-picker v-model="datetime" type="datetime" :time-picker-options="timePickerOptions" placeholder="Selecciona Hora y Fecha"></date-picker> -->
                </div>
            </div>
          </div>



            
<!--             
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
                        :value="unidadApoyo">
                        {{ unidadApoyo.nombre }}
                        </option>
                    </select>
                    </div>
                    
                </div> 
                               
            </div> -->


       
        
     
    </div>
</template>


<script>
//import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import Swal from 'sweetalert2'
import 'vue2-datepicker/index.css'
import axios from 'axios';
import Vue from 'vue'
// import emailjs from 'emailjs-com';
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);

Vue.filter('formatHour', function(value) {
  if (value) {
    return moment(value).format('hh:mm a')
  }
});
Vue.filter('formatDate', function(value) {
  if (value) {
    // return moment(value).format('MM/DD/YYYY')
    return moment(value).format('DD/MM/YYYY')
  }
});
export default Vue.extend ({
    name: 'formRegistrarCitaAgendada',
     components:{
        //DatePicker
     },

    data: function () {
        return {
            fechIni: this.fecha,
            descripcion: null,
            motivo: null,
            bordes:'borde-textbox',
            sel: '',
            alSeleccionado: 'Nombre del alumno',
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
            us:null,
            tt:[],
            ttselect:"no",
        }
    },
    mounted(){
        if(this.$store.state.usuario==null) this.$router.push('/login');
        console.log(this.$store.state.citaDatos);
       // this.listarUnidxProg();        
        //this.listarMotivos();
        
        this.listarTT();
        this.resultadosCita();
        if(this.$store.state.citaDatos.isGray==true){
            //no es disponible, o hay 1 alumnbo o hay varios
            //Viene a modificar una cita
            this.llenarAlumnos();
            this.listarAlumnosxProg();

        }
        else{
            //es disponible, listo todos los alumnos
            //Viene a registrar una cita recién
            this.listarAlumnosxProg();
        }
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
                    this.$router.push('/registrarCita');
                    this.$store.state.citaDatos=null;
                    
                    } 
                })
        },
        guardar: function () {
             const params={
              //Listo el tipo de tutoria
              id_tipo_tutoria: this.ttselect,
              id_disponibilidad: this.$store.state.citaDatos.id_disponibilidad,
              usuario_creacion: this.$store.state.usuario.id_usuario,
              usuario_actualizacion: this.$store.state.usuario.id_usuario,
              //envío los id de alumnos
              idUsuario: this.listAlumnosId,
              
            };
            console.log('params:',params);
            //Registra cita
            axios.post('citas/registrarCitaCoord' ,params).then(response => {
              console.log('datos cita ', response.data);
              Swal.fire({
                      text:"Registro Exitoso",
                      icon:"success",
                      confirmButtonText: 'Continuar',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                    });
                    
                }).catch(e => {
                console.log(e.response);
            }   );
          





            //Se debe poder guardar sin todo lo del lado derecho
            /*
            let array = []
            array.push(this.event.extendedProps.alumno.id_usuario);
            console.log(array);
            const sesion_params = {
                resultado: this.descripcion,
                idAlumnos: array,
                id_cita: this.$store.state.idCita, 
                asistencia: this.asistencia,
                idMotivos: this.listMotivosId,
            };
                if(this.listMotivos.length > 0) {
                        
                            if(this.descripcion!=null) {
                                if(this.selectedUnidadApoyo) {
                                    //console.log('asdfasdf',this.selectedUnidadApoyo);
                                    this.enviarCorreo(this.selectedUnidadApoyo)
                                }
                                
                                axios.post('/sesiones/regSesionFormal',sesion_params)
                                    .then( response=>{
                                        console.log(response);
                                        
                                        Swal.fire({
                                            text:"Se ha registrado la sesión con éxito",
                                            icon:"success",
                                            confirmButtonText: 'OK',
                                            confirmButtonColor:'#0097A7',
                                            showConfirmButton: true,
                                        }) 
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
                else {
                    Swal.fire({
                        text:"Debe seleccionar por lo menos un motivo",
                        icon:"error",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                }
           */ 
       
          
        },
        onCodigoChange: function () {
            var i;
            for(i in this.codigos){
                if(this.sel==this.codigos[i].codigo){
                    this.alSeleccionado = this.codigos[i].nombre + ' ' + this.codigos[i].apellidos;                
                    // this.alSeleccionado.condi=this.codigos[i].condicion_alumno;
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
            
            if(this.alSeleccionado != 'Nombre del alumno' && !estaAl && this.sel.length == 8){ 
                this.listAlumnosNom.push(this.alSeleccionado);
                this.listAlumnosCod.push(this.sel);
                for(var j in this.codigos){
                    if(this.sel == this.codigos[j].codigo)
                        this.listAlumnosId.push(this.codigos[j].id_usuario);
                }
                this.alSeleccionado='Nombre del alumno';
                this.sel= '';
            }
            else if(estaAl) {
                 Swal.fire({
                     text:" ya se encuentra",
                     icon:"success",
                     confirmButtonText: 'OK',
                     confirmButtonColor:'#0097A7',
                     showConfirmButton: true,
                 }) 
            
            }
            console.log(this.listAlumnosId);
            
            
        },
        enviarCorreo(unidad){
            console.log(unidad);
            /*
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
                  */
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
            // this.$router.push('/perfil/'+this.event.extendedProps.alumno.id_usuario)
        },
        listarUnidxProg(){
                axios.post('unidadesApoyo/unidadesxProg',{idProg:this.$store.state.programaActual.id_programa})
            .then(response => {
                for(var i in response.data) {
                    this.unidadesApoyo.push(response.data[i][0]);
                }
                
            }).catch(e => {
                console.log(e.response);
                
            });
        },
     
        listarAlumnosxProg(){
                axios.post('sesiones/alumnoProg', {
                    idTipoU:5, //Id=5 lista los alumnos, 
                    idProg: this.$store.state.programaActual.id_programa
            })
            .then( response => {
                console.log("listado alumnos: ",response.data)
                for(var i in response.data){ 
                    this.codigos.push(response.data[i][0]);
                }
                console.log(this.codigos);
            })
            .catch(e => {
                console.log(e.response);
            });
        },
        listarTT(){
            console.log('tutor',this.$store.state.citaDatos.tutorSel);
            this.tt=this.$store.state.citaDatos.tutorSel.usuario.tipo_tutorias;
        },
        resultadosCita(){

        },
        llenarAlumnos(){
           // this.codigo  //Los alumnos que lista
           //console.log('n: ',this.$store.state.citaDatos.alumnos.nombre);
           let n=this.$store.state.citaDatos.alumnos.length;
           console.log('cods ',this.codigos);
           if(n==1){
             this.listAlumnosNom.push(this.$store.state.citaDatos.alumnos[0].nombre);
             this.listAlumnosCod.push(this.$store.state.citaDatos.alumnos[0].codigo);
             this.listAlumnosId.push(this.$store.state.citaDatos.alumnos[0].id_usuario);
           }
           else if(n>1){
                for(let i=0;i<n;i++){
                    this.listAlumnosNom.push(this.$store.state.citaDatos.alumnos[i].nombre);
                     this.listAlumnosCod.push(this.$store.state.citaDatos.alumnos[i].codigo);
                    this.listAlumnosId.push(this.$store.state.citaDatos.alumnos[i].id_usuario);
                }
           }
        
        },
        eliminarAlumno(){
           
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