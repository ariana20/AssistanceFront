<template>
    <div class="formcitaagendada contenedor">
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
       
        <div class="font-weight-bolder text-left">Alumno(s)</div>
        <div class="row">
            <div class="col-12 col-sm-4 col-md-3">
                <div class="col-sm-6"><label for="formGroupExampleInput">Código</label></div>
                <hr style="width:355%;">
                <!-- combo box para seleccionar alumnos -->
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
                <!-- codigos seleccionados -->
                <ul class="col-12 col-sm-12 col-md-11" style="text-align:left;margin-left:-8px;">
                    <li class="form-control" style="width:120%;text-align:center;margin-top:8px;"
                        v-for="(newAlumnoCod,alcIndex) in listAlumnosCod"  
                        :key="alcIndex">
                        {{newAlumnoCod}}           
                    </li>
                </ul>

            </div>
            <div class="col-12 col-sm-4 col-md-4 ">
                <div class="col" style="text-align:left;padding-bottom:30px;">
                    <label for="formGroupExampleInput" style="margin-right:50px">Nombre y Apellidos</label>
                    
                </div>
                <div type="text" class="form-control" placeholder="Nombre" style="color: white;background:#BEBEBE;" >{{alSeleccionado}}</div>
                <ul class="col" style="text-align:center;width:200%;margin-left:-10px;padding-right:0px;">
                   <!-- nombres seleccionados -->
                    <li class="form-control list-group-item" style="padding: 0.4rem 0.5rem;"
                        v-for="(newAlumno,alIndex) in listAlumnosNom"  
                        :key="alIndex">
                        {{newAlumno}}    
                        <!-- <span name="remove" class="close" @click="deleteAl(alIndex)">&times;</span>  -->
                    </li>
                </ul>
            </div>
            <div class="col-12  col-sm-4 col-md-5">

                <div  style="text-align:left;padding-bottom:30px;">
                    <label for="formGroupExampleInput" style="margin-right:50px">Condición</label>
                </div>
                <div class ="row" style="margin-left:5px">
                    <div type="text" class="form-control col-12  col-sm-4 col-md-6" placeholder="Condicion" style="color: white;background:#BEBEBE;margin-bottom:10px;" >{{condSeleccionado}}
                    </div>
                    <div class="col-12  col-sm-4 col-md-4">
                        <button  :disabled="!this.sel" type="button" class="btn btn-info" style="display:inline;margin:0px;"
                                    @click="addAlumno">Agregar
                                </button>                     
                    </div>
                </div>
                
                <ul class="col-12  col-sm-4 col-md-7" style="text-align:center;margin-left:-10px;padding-right:0px;">
                    <!-- condiciones seleccionadas -->
                    <li class="form-control list-group-item" style="padding: 0.4rem 0.5rem;"
                        v-for="(newAlumno,alIndex) in listAlumnosCond"  
                        :key="alIndex">
                        {{newAlumno}}    
                        <span name="remove" class="close" @click="deleteAl(alIndex)">&times;</span> 
                    </li>
                </ul>
            </div>
  
            
        </div>
         <!-- Modal de cargando -->
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
            condSeleccionado: 'Condición',
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
            listAlumnosCond: [],
            listAlumnosId: [],
            unidadesApoyo: [],
            selectedUnidadApoyo: null,
            us:null,
            tt:[],
            ttselect:"no",
            idCita:null,
            alumnosEli:[],
            miUsuario:this.$store.state.usuario, 
            mipermisosUsuario:null,
        }
    },
    mounted(){
        if(this.$store.state.usuario==null) this.$router.push('/login');        
        this.listarTT();
        this.resultadosCita();
        if(this.$store.state.citaDatos.isGray==true){
            //no es disponible, o hay 1 alumnbo o hay varios
            //Viene a modificar una cita
            this.llenarAlumnos();
            this.listarAlumnosxProg();
            this.getIdCita();
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
                    if(this.mipermisosUsuario.includes("Registrar Cita")){
                            this.$router.push('/registrarCita');
                        }
                        else  if(this.mipermisosUsuario.includes("Calendario")){
                              
                                this.$router.push('/calendariocitas');
                        }
                    this.$store.state.citaDatos=null;
                    
                    } 
                })
        },
        guardar: function () {
          if(this.validaciones()){

           
            if(this.$store.state.citaDatos.isGray==false){
                //si no es gris, es disponible
                 const params={
              //Listo el tipo de tutoria
                    id_tipo_tutoria: this.ttselect,
                    id_disponibilidad: this.$store.state.citaDatos.id_disponibilidad,
                    usuario_creacion: this.$store.state.usuario.id_usuario,
                    usuario_actualizacion: this.$store.state.usuario.id_usuario,
                    //envío los id de alumnos
                    idUsuario: this.listAlumnosId,
              
                };
           
            //Registra cita
                axios.post('citas/registrarCitaCoord' ,params).then(response => {

                 if(response.data.id_cita!=0){
                   
                        Swal.fire({
                            text:"Registro Exitoso",
                            icon:"success",
                            confirmButtonText: 'Continuar',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                          });
                        if(this.mipermisosUsuario.includes("Registrar Cita")){
                            this.$router.push('/registrarCita');
                        }
                        else  if(this.mipermisosUsuario.includes("Calendario")){
                              
                                this.$router.push('/calendariocitas');
                        }

                 }
                }).catch(e => {
                         console.log('catch',e);
                         Swal.fire({
                                text:"Estamos teniendo problemas al guardar la cita. Vuelve a intentar en unos minutos.",
                                icon:"warning",
                                 confirmButtonText: 'Continuar',
                                 confirmButtonColor:'#0097A7',
                                 showConfirmButton: true,
                         });
                   });
                        //push registrarcita

                        
            }
            else{
                //ya se había marcado como gris o ocupado, así que modifico
                this.modificarCita();
                this.enviarCorreoAlumnosEli();
            }
         }  
  


          
        },
        modificarCita(){
           
            const params={
                id_cita:this.idCita,
                id_tipo_tutoria:this.ttselect,
                id_usuario:this.listAlumnosId,
                usuario_actualizacion:this.miUsuario.id_usuario,
            }
            
            axios.post('citas/editarCitaCoord' ,params).then(response => {
               
                  if(response.data.status=="Cambios realizados" ){
                        Swal.fire({
                            text:"Registro Exitoso",
                            icon:"success",
                            confirmButtonText: 'Continuar',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                          });
                         
                        if(this.mipermisosUsuario.includes('Registrar Cita')){
                            this.$router.push('/registrarCita');
                        }
                        else  if(this.mipermisosUsuario.includes('Calendario')){
                              
                                this.$router.push('/calendariocitas');
                        }
                    }else{
                        Swal.fire({
                                text:"Estamos teniendo problemas al guardar la cita. Vuelve a intentar en unos minutos.",
                                icon:"warning",
                                 confirmButtonText: 'Continuar',
                                 confirmButtonColor:'#0097A7',
                                 showConfirmButton: true,
                         });
                    }
                    
                }).catch(e => {
                         console.log('catch guardar cita ',e);
                         Swal.fire({
                                text:"Ocurrió un problema al guardar la cita. Vuelve a intentar en unos minutos.",
                                icon:"warning",
                                 confirmButtonText: 'Continuar',
                                 confirmButtonColor:'#0097A7',
                                 showConfirmButton: true,
                         });
            });
        },
        validaciones(){
            if(this.ttselect=="no"){
                 Swal.fire({
                            text:"No ha seleccionado un tipo de tutoría",
                            icon:"error",
                            confirmButtonText: 'Corregir',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                });
            }
            else if(this.listAlumnosId.length==0){
                 Swal.fire({
                            text:"No puede dejar vacía la lista de alumnos, debe agregar por lo menos un alumno",
                            icon:"error",
                            confirmButtonText: 'Corregir',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                });
            }
            else return true;


        },
        onCodigoChange: function () {
            var i;
            for(i in this.codigos){
                if(this.sel==this.codigos[i].codigo){
                    this.alSeleccionado = this.codigos[i].nombre + ' ' + this.codigos[i].apellidos;       
                    this.condSeleccionado = this.codigos[i].cond;     
               }            
            }
        },
  
        deleteAl: function(index) {
            
            var estabaAntes=this.$store.state.citaDatos.alumnos.find(alum => alum.codigo == this.listAlumnosCod[index]); 
            //Si encuentra el código, estabaAntes es un objeto, si no, estabaAntes es undefined
            var al=  this.listAlumnosCod.splice(index,1);
            this.listAlumnosNom.splice(index,1);
            this.listAlumnosCond.splice(index,1);
            this.listAlumnosId.splice(index,1);

            //revisar duplicado y no enviar correo a quien se agregó y eliminó de casualidad, pero como no estaba originalmente,no le envío correo
            if(estabaAntes==undefined)        
                 this.analizarAlumnoEliminado(this.codigos.find( alumno => alumno.codigo === al[0]),false) //No estaba antes
            else          
                 this.analizarAlumnoEliminado(this.codigos.find( alumno => alumno.codigo === al[0]),true)  //sí estaba antes

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
                this.listAlumnosCond.push(this.condSeleccionado);
                for(var j in this.codigos){
                    if(this.sel == this.codigos[j].codigo)
                        this.listAlumnosId.push(this.codigos[j].id_usuario);
                }
                this.alSeleccionado='Nombre del alumno';
                this.condSeleccionado='Condición del alumno';
                this.sel= '';
            }
            else if(estaAl) {
                 Swal.fire({
                     text:"Ya se encuentra este alumno en la lista.",
                     icon:"warning",
                     confirmButtonText: 'OK',
                     confirmButtonColor:'#0097A7',
                     showConfirmButton: true,
                 }) 
            
            }
            else if (this.alSeleccionado == 'Nombre del alumno'){
                 Swal.fire({
                     text:"Selección de alumno inválida",
                     icon:"warning",
                     confirmButtonText: 'OK',
                     confirmButtonColor:'#0097A7',
                     showConfirmButton: true,
                 }) 
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
        listarTT(){
            this.tt=this.$store.state.citaDatos.tttutorSel.sort((a, b) => { return  a.nombre.localeCompare(b.nombre);});
            // this.tt=this.$store.state.citaDatos.tttutorSel;
            
        },
        resultadosCita(){

        },
        llenarAlumnos(){
           // this.codigo  //Los alumnos que lista
       
           let n=this.$store.state.citaDatos.alumnos.length;
           
           if(n==1){
               
             this.listAlumnosNom.push(this.$store.state.citaDatos.alumnos[0].nombre +" " +this.$store.state.citaDatos.alumnos[0].apellidos);
             this.listAlumnosCod.push(this.$store.state.citaDatos.alumnos[0].codigo);
            //  this.listAlumnosCond.push(this.$store.state.citaDatos.alumnos[0].condicion_alumno);
             this.listAlumnosId.push(this.$store.state.citaDatos.alumnos[0].id_usuario);

             ///////////////super if de condicion
              if(this.$store.state.citaDatos.alumnos[0].condicion_alumno=="bic")
                 this.listAlumnosCond.push("Bica");
              else if(this.$store.state.citaDatos.alumnos[0].condicion_alumno=="tri")
                 this.listAlumnosCond.push("Trica");
              else if(this.$store.state.citaDatos.alumnos[0].condicion_alumno=="car")
                 this.listAlumnosCond.push("Carta");
              else if(this.$store.state.citaDatos.alumnos[0].condicion_alumno=="reg")
                 this.listAlumnosCond.push("Regular");
              else if(this.$store.state.citaDatos.alumnos[0].condicion_alumno=="pri")
                 this.listAlumnosCond.push("Cachimbo");  
              else if(this.$store.state.citaDatos.alumnos[0].condicion_alumno=="egr")
                 this.listAlumnosCond.push("Egresado"); 
           }
           else if(n>1){
             
                for(let i=0;i<n;i++){
                    this.listAlumnosNom.push(this.$store.state.citaDatos.alumnos[i].nombre+" " +this.$store.state.citaDatos.alumnos[i].apellidos);
                    this.listAlumnosCod.push(this.$store.state.citaDatos.alumnos[i].codigo);
                    // this.listAlumnosCond.push(this.$store.state.citaDatos.alumnos[i].condicion_alumno);
                    this.listAlumnosId.push(this.$store.state.citaDatos.alumnos[i].id_usuario);

             ///////////////super if de condicion
                 if(this.$store.state.citaDatos.alumnos[i].condicion_alumno=="bic")
                    this.listAlumnosCond.push("Bica");
                 else if(this.$store.state.citaDatos.alumnos[i].condicion_alumno=="tri")
                    this.listAlumnosCond.push("Trica");
                 else if(this.$store.state.citaDatos.alumnos[i].condicion_alumno=="car")
                    this.listAlumnosCond.push("Carta");
                 else if(this.$store.state.citaDatos.alumnos[i].condicion_alumno=="reg")
                    this.listAlumnosCond.push("Regular");
                 else if(this.$store.state.citaDatos.alumnos[i].condicion_alumno=="pri")
                     this.listAlumnosCond.push("Cachimbo");                  
                 else if(this.$store.state.citaDatos.alumnos[i].condicion_alumno=="egr")
                     this.listAlumnosCond.push("Egresado");   
                }
           }
        
        },
        getIdCita () {
          axios.post('disponibilidades/mostrarCita2', 
                                {idDisponibilidad:this.$store.state.citaDatos.id_disponibilidad})
          .then((response) => {
            this.idCita = response.data[0].id_cita;
            this.ttselect=response.data[0].tipo_tutoria.id_tipo_tutoria;
          }).catch(e => {
            console.log('catch ',e.response);
          });
        },
        analizarAlumnoEliminado(alumnito,estabaAntes){
               var esta= this.alumnosEli.find(alum => alum.codigo == alumnito.codigo);//Para no duplicar alumnos eliminados               
               
               //si no está es undefined
               if(esta===undefined && estabaAntes==true ){
                   
                   //Si no está, lo agrego
                    this.alumnosEli.push(alumnito);
                 
               }
             
              



        },
        enviarCorreoAlumnosEli(){
            //Ahora sí envio correo a this.alumnosEli  (arreglo de objetos de alumnos)

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

input:focus {
    outline:none;
    box-shadow: none;
}

</style>