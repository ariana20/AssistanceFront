<template>
  <div name="FormEncuesta" class="contenedor">
    <div name="Tutor" v-if="tutor == true">
        <div class="row" style="text-align:left;">
            <div class="col-12 col-md-5">
                <div class="row">
                    <h5 class="col-12 col-md-3">Fechas:</h5>
                    <date-picker class="wide-date-example col-12 col-md-8"
                        v-model="periodo" 
                        width="20" :lang="lang" range
                        placeholder="Selecciona Rango de Fechas"
                        format="DD/MMM/YYYY"
                        :disabled-date="disabledAfterToday"
                        @input="handlePeriodChange"
                        input-class="form-control" style="left:10px">
                    </date-picker>
                </div>
            </div>
            <div class="col-3 col-md-2 offset-md-2 bnt1" style="margin-bottom:10pxmargin-right: 0px;margin-top: 0px;">
                <button type="button" class="btn btn-info"  @click="Enviar()" >Enviar</button>
            </div>
            <div v-if="todo" class="col-9 col-md-3" style="margin-bottom:10px;text-align: up;margin-right: 0px;margin-top: 0px;">
                <button type="button" class="btn btn-info"  @click="SeleccionarTodos()" >Seleccionar Todos</button>
            </div>
            <div v-else class="col-9 col-md-3" style="margin-bottom:10px;text-align: up;margin-right: 0px;margin-top: 0px;">
                <button type="button" class="btn btn-info"  @click="DeseleccionarTodos()" >Deseleccionar Todos</button>
            </div>
        </div>
        <div class="row" v-for="alumno in alumnos" :key="alumno.id_usuario">
            <div class="col-12 col-md-10">
                <datosAlumno
                    :tutor="alumno"
                    :tipoTutoria="null"/>
            </div>
            <div class="col-12 col-md-2 custom-control form-control-lg custom-checkbox">
                <div class="centrado">
                    <input v-model="alumno.seleccionado" type="checkbox" class="custom-control-input largerCheckbox" :id="'customCheck'+alumno.id_usuario"> 
                    <label class="custom-control-label" :for="'customCheck'+alumno.id_usuario"></label>  
                </div>
            </div>
        </div>
        
        <div v-if="alumnos==null || alumnos.length==0" class="row" style="width:100%">
            <div class="col-12" style="margin-top:1%;margin-bottom:5%;text-align:center;font-size:150%">
                Ningún Alumno Pendiente
            </div>
        </div>
    </div>
    <div v-else>
        <div class="row" v-for="encuesta in encuestas" :key="encuesta.id_usuario">
            <div class="col-12 col-md-8" style="margin-bottom:15px">
                <datosTutor
                    :tutor="encuesta"
                    :tipoTutoria="null"/>
            </div>
            <div class="col-6 col-md-2 bnt1" style="margin-bottom:15px">
                <div class="centrado">
                    <button type="button" class="btn btn-info"  @click="Responder(encuesta)" >Responder</button>
                </div>
            </div>
            <div class="col-6 col-md-2" style="text-align:left;margin-bottom:15px">
                <div class="centrado">
                    <button type="button" class="btn btn-info"  @click="Ignorar(encuesta)" >Ignorar</button>
                </div>
            </div>
        </div>
        
        <div v-if="encuestas==null || encuestas.length==0" class="row" style="width:100%">
            <div class="col-12" style="margin-top:1%;margin-bottom:5%;text-align:center;font-size:150%">
                Ninguna Encuesta Pendiente
            </div>
        </div>
    </div>

    <b-modal ref="encuesta" style="margin-left:20%;background-color:transparent" size="lg" centered hide-header hide-footer>
        <article v-if="preguntas">
            <header>
                <div class="progress">
                    <div class="progress-step"
                        :class="{'active': index === activeStep}"
                        v-for="(step, index) in preguntas"
                        :key="'step'+index">
                        {{ index + 1 }}
                    </div>
                </div>
            </header>
            <section :class="animation">
                <h2>{{ preguntas[activeStep].pregunta }}</h2>
                <div class="input-fields">
                    <form style="font-size:150%;width:100%" v-if="preguntas[activeStep].tipo.includes('ESCALA')">
                        <div class="col-12 col-md-8 offset-md-3">
                            <div class="form-group row" style="margin-left:0px;margin-right:0px">
                                <div class="form-check form-check-inline col-2" style="margin-left:0px;margin-right:0px" v-for="i in 5" :key="i">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="preguntas[activeStep].respuesta" :value="i">
                                    <label class="form-check-label">{{i}}</label>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form style="font-size:150%;width:100%" v-if="preguntas[activeStep].tipo.includes('BINARIA')">
                        <div class="col-9 offset-3 col-md-8 offset-md-4">
                            <div class="form-group row" style="margin-left:0px;margin-right:0px">
                                <div class="form-check form-check-inline col-3">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="preguntas[activeStep].respuesta" value="Sí">
                                    <label class="form-check-label">Sí</label>
                                </div>
                                <div class="form-check form-check-inline col-3">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="preguntas[activeStep].respuesta" value="No">
                                    <label class="form-check-label">No</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="actions">
                    <button class="col-5" style="font-size:80%" v-if="activeStep - 1 >= 0 && activeStep!=preguntas.length-1" @click="checkFields(false)">Anterior</button>
                    <button class="col-12" style="font-size:80%" v-if="activeStep + 1 < preguntas.length -1 && activeStep==0" @click="checkFields(true)">Siguiente</button>
                    <button class="col-5" style="font-size:80%" v-if="activeStep + 1 < preguntas.length -1 && activeStep!=0" @click="checkFields(true)">Siguiente</button>
                    <button class="col-5" style="font-size:80%" v-if="activeStep + 1 === preguntas.length -1" @click="checkFields(true)">Finalizar</button>
                    <button class="col-12" style="font-size:80%" v-if="activeStep=== preguntas.length-1" @click="Cancelar()">Regresar a Encuestas</button>
                </div>
            </section>
        </article>
    </b-modal>

    <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando... 
      </div>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment';
import datosTutor from '@/components/Citas/DatosTutor.vue'
import datosAlumno from '@/components/Citas/DatosAlumno.vue'

export default {
    components:{
        DatePicker,
        datosTutor,
        datosAlumno,
    },
    data(){
        return{
            periodo:null,
            tutor:false,
            alumnos:null,
            encuestas:null,
            permisos:null,
            todo:true,
            //datepicker
            inicio: new Date(new Date().getTime() - 30 * 24 * 3600 * 1000),
            fin: new Date(),
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
            preguntas:null,
            activeStep: 0,
            animation: 'animate-in',
        }
    },
    mounted(){
        if(this.$store.state.usuario==null) this.$router.push('/login')
        else this.ListarElementos(); 
    },
    methods:{
        ListarElementos(){
            this.showModal()
            this.periodo = [this.inicio,this.fin];
            if(this.$store.state.programaActual!=null){
                this.axios.post('/usuarios/permisos',{
                    usuario: this.$store.state.usuario,
                    programa: this.$store.state.programaActual.nombre
                })
                .then(response=>{
                    this.permisos = response.data;
                    if(this.permisos!=null && this.permisos.includes('Sesión de Tutoría')){
                        this.axios.post('/encuesta/alumnosSesionXTutorXRangoFecha',{
                            idPrograma: this.$store.state.programaActual.id_programa,
                            idTutor: this.$store.state.usuario.id_usuario,
                            fechaIni: moment(this.periodo[0]).format('YYYY-MM-DD'),
                            fechaFin: moment(this.periodo[1]).format('YYYY-MM-DD'),
                        })
                        .then(response=>{
                            this.alumnos = response.data
                            this.tutor = true
                            this.hideModal()
                        })
                        .catch(e => {
                            console.log('Catch Listar Alumnos: ',e);
                            this.hideModal()
                            Swal.fire({
                            text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                            icon:"warning",
                            confirmButtonText: 'OK',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                            });  
                        });
                    }
                    else{
                        this.axios.post('/encuesta/mostrarListaEncuestasAlAlumno',{
                            idPrograma: this.$store.state.programaActual.id_programa,
                            idAlumno: this.$store.state.usuario.id_usuario
                        })
                        .then(response=>{
                            this.encuestas = response.data
                            this.hideModal()
                        })
                        .catch(e => {
                            console.log('Catch Listar Encuestas: ',e);
                            this.hideModal()
                            Swal.fire({
                            text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                            icon:"warning",
                            confirmButtonText: 'OK',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                            });  
                        });
                    }
                })
                .catch(e => {
                    console.log('Catch Listar Permisos: ',e);
                    this.hideModal()
                    Swal.fire({
                    text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                    });  
                });
            }
        },
        handlePeriodChange(periodo) {
            this.periodo = periodo;
        },
        disabledAfterToday(date){
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
        },
        SeleccionarTodos(){
            this.alumnos.forEach(element => {
                element.seleccionado = true;
            });
            this.todo = false;
        },
        DeseleccionarTodos(){
            this.alumnos.forEach(element => {
                element.seleccionado = false;
            });
            this.todo = true;
        },
        Enviar(){
            Swal.fire({
                text: '¿Desea enviar las encuestas?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0097A7',
                cancelButtonColor: '#757575',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
            })
            .then((result) => {
                if (result.value) {
                    let enviados = []
                    this.alumnos.forEach(element => {
                        if(element.seleccionado == true){
                            enviados.push(element.id_usuario)
                        }
                    });
                    if(enviados.length>0){
                        this.showModal()
                        this.axios.post('/encuesta/registrarEnvioEncuesta',{
                            id_alumnos: enviados,
                            id_tutor: this.$store.state.usuario.id_usuario,
                            idPrograma: this.$store.state.programaActual.id_programa,
                            fecha_creacion: moment(this.periodo[1]).format('YYYY-MM-DD'),
                            fecha_actualizacion: moment(this.periodo[1]).format('YYYY-MM-DD'),
                        })
                        .then(response=>{
                            response
                            this.hideModal()
                            this.ListarElementos();
                        })
                        .catch(e => {
                            console.log('Catch Enviar Encuestas: ',e);
                            this.hideModal()
                            Swal.fire({
                                text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                                icon:"warning",
                                confirmButtonText: 'OK',
                                confirmButtonColor:'#0097A7',
                                showConfirmButton: true,
                            });  
                        });
                    }
                    else{
                        Swal.fire({
                            text: 'No ha seleccionado ningún alumno',
                            icon: 'error',
                            showCancelButton: true,
                            confirmButtonColor: '#0097A7',
                            confirmButtonText: 'Ok',
                        })
                    }
                }
            });
        },
        Responder(item){
            this.$store.state.encuesta = item;
            this.showModal()
            this.axios.post('/encuesta/mostrarPreguntas')
            .then(response=>{
                this.preguntas = response.data
                this.preguntas.sort((a,b)=> a.orden - b.orden)
                this.preguntas.push({
                    pregunta: "Gracias por participar!",
                    tipo: "FINAL",
                    respuesta: "Final",
                })
                this.hideModal()
                this.activeStep =0
                this.$refs['encuesta'].show()
            })
            .catch(e => {
                console.log('Catch Listar Encuestas: ',e);
                this.hideModal()
                Swal.fire({
                    text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                });  
            });
        },
        Ignorar(item){
            this.showModal()
            this.axios.post('/encuesta/encuestaOmitida',{
                idTutor: item.id_usuario,
                idAlumno: this.$store.state.usuario.id_usuario,
                agrupador: item.agrupador,
                preg: [1,2,3,4,5],
            })
            .then(response=>{
                response
                this.hideModal()
                Swal.fire({
                    text:"Respuesta omitida exitosamente",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                });
                this.ListarElementos();
            })
            .catch(e => {
                console.log('Catch Omitir Encuesta: ',e);
                this.hideModal()
                Swal.fire({
                    text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                });
            });
        },
        nextStep() {
            this.animation = 'animate-out';
            setTimeout(() => {
                this.animation = 'animate-in';
                this.activeStep += 1;
            }, 600);
        },
        prevStep() {
            this.animation = 'animate-out';
            setTimeout(() => {
                this.animation = 'animate-in';
                this.activeStep -= 1;
            }, 600);
        },
        checkFields(val) {
            if(val) {
                let valid = true;
                
                if(this.preguntas[this.activeStep].respuesta==null) {
                    this.preguntas[this.activeStep].valid = false
                    valid = false
                }
                else this.preguntas[this.activeStep].valid = true

                if(valid) {
                        if(this.activeStep + 1 == this.preguntas.length -1){
                            this.EnviarRespuesta();
                            this.nextStep();
                        }
                        else{
                            this.nextStep();
                        }
                }
                else {
                    this.animation = 'animate-wrong';
                    setTimeout(() => {
                    this.animation = '';
                    }, 400);
                }
            }
            else this.prevStep();
        },
        EnviarRespuesta(){
            let noRespondido = false;
            let preguntas = [];
            let respuestas = [];
            this.preguntas.forEach(element => {
                if(element.respuesta==null) noRespondido = true;
                else{
                    if(element.respuesta!="Final"){
                        preguntas.push(element.id_encuesta)
                        respuestas.push(element.respuesta)
                    }
                }
            });
            if(noRespondido){
                Swal.fire({
                text:"No ha respondido todas las preguntas",
                icon:"error",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
                });
            }
            else{
                this.showModal()
                this.axios.post('/encuesta/guardarRespuestas',{
                    idTutor: this.$store.state.encuesta.id_usuario,
                    idAlumno: this.$store.state.usuario.id_usuario,
                    agrupador: this.$store.state.encuesta.agrupador,
                    preg: preguntas,
                    rpta: respuestas
                })
                .then(response=>{
                    response
                    this.hideModal()
                    Swal.fire({
                        text:"Respuesta enviada exitosamente",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    });
                    this.$router.push('/encuestas')
                })
                .catch(e => {
                    console.log('Catch Responder Encuesta: ',e);
                    this.hideModal()
                    Swal.fire({
                        text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                        icon:"warning",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    });  
                });
            }
        },
        Cancelar(){
            this.$refs['encuesta'].hide()
            this.ListarElementos();
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
    }
}
</script>

<style>
.centrado{
    padding-top: 25%;
}

.custom-control-label:before{
    background-color:#138496;
}
.custom-checkbox .custom-control-input:checked~.custom-control-label::before{
    background-color:#138496;
}

.progress{
    display: unset;
    height: auto;
    background: transparent;
}

.bnt1{
    text-align: right;
}

.modal-body{
    padding: 0px;
}

@media screen and (max-width: 800px) {
    .bnt1{
        text-align: left;
    }
    .centrado{
        padding-top: 0%;
    }

}
</style>

<style lang="scss" scoped>
body {
  margin: 0; padding: 0;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

@mixin flexbox() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flexbox();
  width: 100%;
}

article {
  display: flex;
  margin: 0px;
  width: 100%;
  min-height: 480px;
  perspective: 1000px;

  header {
    @include flexbox();
    width: 60px;
    height: 480px;
    background-color: #fff;
    border-right: 2px dotted #757575;
    background: radial-gradient(#138496, #2fb4c9);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2),
      0 10px 10px rgba(0,0,0,0.2);
  }

  .progress-step {
    @include flexbox();
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-bottom: 20px;
    color: #fff;
    font-weight: bold;
    background-color: #116c7a;

    &.active {
      background-color: #757575;

      ~ .progress-step {
        color: #555;
        background-color: #ccc;
      }

      ~ .progress-step::before {
        background-color: #ccc;
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: -20px;
      width: 2px;
      height: 20px;
      z-index: 10;
      background-color: #116c7a;
    }

    &:first-child::before {
      display: none;
    }
  }

  section {
    @include flexbox();
    flex-direction: column;
    width: 100%;
    border:1px solid rgb(0, 152, 146) ;
    box-shadow: 0 15px 30px rgba(0,0,0,0.2),
      0 10px 10px rgba(0,0,0,0.2);

    h2 {
      font-size: 1.6rem;
      color: #757575;
      margin: 0;
      padding: 20px;
    }

    .input-fields {
      @include flexbox();
      flex-direction: column;
      width: 100%;
    }

    .input-container {
      position: relative;
      padding: 30px 20px 20px 20px;
      width: calc(100% - 40px);
      max-width: 400px;

      input {
        position: relative;
        width: 100%;
        font-size: 1.35rem;
        outline: 0;
        background: transparent;
        box-shadow: none;
        border: none;
        border-bottom: 2px dashed #757575;

        &:valid + .input-label {
          top: 10px;
          left: 20px;
          font-size: .7rem;
          font-weight: normal;
          color: #999;
        }

        &.wrong-input + .input-label {
          color: #B92938;
        }
      }
    }

    .input-label {
      position: absolute;
      top: 32px;
      left: 20px;
      font-size: 1.35rem;
      pointer-events: none;
      transition: .2s ease-in-out;
    }

    .actions {
      margin: 30px 0 0 0;

      button {
        outline: none;
        border: none;
        color: #fff;
        background-color: #138496;
        font-size: 1.35rem;
        padding: 5px 20px;
        margin: 0 10px;
        text-transform: uppercase;
        border-radius: 3px;
        cursor: pointer;
      }
    }

  }
}

.animate-out {
  transform-origin: bottom left;
  animation: out .6s ease-in-out;
}

.animate-in {
  transform-origin: left;
  animation: in .6s ease-in-out;
}

.animate-wrong {
  animation: wrong .4s ease-in-out;
}

@keyframes out {
  0% { transform: translateY(0px) rotate(0deg); }
  60% { transform: rotate(10deg); }
  100% { transform: translateY(1000px); }
}

@keyframes in {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}

@keyframes wrong {
  0% { transform: translateX(0); }
  20% { transform: translateX(40px); }
  40% { transform: translateX(20px); }
  60% { transform: translateX(40px); }
  80% { transform: translateX(20px); }
  100% { transform: translateX(0); }
}


</style>