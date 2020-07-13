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
        }
    },
    mounted(){
        if(this.$store.state.usuario==null) this.$router.push('/login')
        else{
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
        }
    },
    methods:{
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
            this.$router.push('/respuesta/'+item.agrupador);
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
                this.$router.push('/encuestas')
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


.bnt1{
    text-align: right;
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