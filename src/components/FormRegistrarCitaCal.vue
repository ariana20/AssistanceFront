<template>
    <div class="formagendarcita contenedor">
        <div class="top-titulo " style="text-align:left;">
            <!-- inicia combobox de tutor -->
            <h4 class="col-md-2 col-xs-2 title-container">Tutor: </h4>
            <select class="col-sm-4 form-control" style="left:-160px;top:26px;cursor:pointer" v-model="tutorSel"  @change="showCalendar" >
                <option disabled selected :value="null" focusable="false">Selecciona un tutor</option>
                <option 
                    v-for="(item, index) in tutores" 
                    :key="index" 
                    :value="item">
                    {{ item.usuario.nombre + " " + item.usuario.apellidos }}
                </option>
            </select>
            <!-- leyenda -->
            <ul class="legend">
                <li><span class="ocupado"></span> Ocupado </li>
                <li><span class="disponible"></span> Disponible </li>
                <!-- <li><span class="citareservada"></span> Cita Resevada </li> -->
            </ul>
        </div>
        <div class="top-titulo" style="text-align:left" v-if="bloque!=null">
            <Fullcalendar ref="fullCalendar"
                          :plugins = "calendarPlugins"
                          defaultView = "timeGridWeek"
                          :locales= "locales"
                          locale="es"
                          :header ="{
                              left: 'prev',
                              center: 'title',
                              right: 'next'
                          }"
                          :footer ="{
                              left: 'today',
                              center: '',
                              right: ''
                          }"
                          :slotDuration="'00:'+bloque+':00'"
                          :businessHours="businessHours"
                          :columnHeaderFormat="columnFormat"
                          :titleFormat="titleFormat"
                          :customButtons="customButtons"
                          hiddenDays= [0]
                          :selectable="true"
                          minTime= "08:00:00"
                          maxTime= "22:00:00"
                          :allDaySlot= "false"
                          :editable= "false"
                          :events = "EVENTS"
                          @eventClick= "rutaEvent"
                         
                          
                          />
                           <!-- @eventMouseover= "rutaEvent" -->
                           <!-- @eventClick= "handleClick" -->
            <modals-container/>
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

import Fullcalendar from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import momentPlugin from '@fullcalendar/moment'

import esLocale from '@fullcalendar/core/locales/es'
import axios from 'axios'
//import Vue from 'vue'
import{mapGetters} from 'vuex'
//import EventModal from './EventModalRegistrar'
import Swal from 'sweetalert2'
export default {
    name: 'formRegistrarCitaCal',
    components: {Fullcalendar},
    data () {
        return {
            calendarPlugins: [
                DayGridPlugin,
                TimeGridPlugin,
                InteractionPlugin,
                ListPlugin,
                momentPlugin
            ],
            columnFormat: 'ddd M/D',
            titleFormat: 'MMMM YYYY',
            calendar: null,
            locales: [esLocale],
            dispSemanalVistaAl: null,
            businessHours: {
                daysOfWeek: [ 1, 2, 3, 4, 5, 6],
                startTime: '08:00', 
                endTime: '22:00', 
            },
            customButtons: {
                    prev: {
                        text: 'custom prev !',
                        click: () => {
                            let calendar = this.$refs.fullCalendar.getApi();
                            calendar.prev();
                            this.getReminders();
                        }
                    },
                    next: {
                        text: 'custom next!',
                        click: () => {
                            let calendar = this.$refs.fullCalendar.getApi();
                            calendar.next();
                            this.getReminders();
                        }
                    },
            },
            tutorSel: null,
            tutores: [],
            fechaIni:null,
            miUsuario:this.$store.state.permisosUsuario,
           
            bloque:null,
        }
    },
    computed: {
        ...mapGetters(["EVENTS"])
    },
    mounted() {     
         
        this.listarTutores();
         this.bloque = this.$store.state.programaActual.hora_bloque;
        if (this.tutorSel)
            this.showCalendar();
        else
            this.$store.state.events=[];      
             
    },
    methods: {
        showCalendar() {
            
            if(this.tutorSel!=null) {
                this.getReminders();
            }
        },
        rutaEvent (arg) {
           //Aquí me lleva a la cita agendada 
           if(arg.event.backgroundColor!='gray') {
                // disponible
                
                this.$store.state.citaDatos={
                        props:arg.event.extendedProps,
                        id_disponibilidad:arg.event.id,
                        fechaIni:arg.event.start,
                        fechaFin:arg.event.end,
                        id_tutor: this.tutorSel.id_usuario,
                        tttutorSel: this.tutorSel.usuario.tipo_tutorias,
                        isGray:false,
                        alumnos:arg.event.allow,

                };
             
                // this.$router.push('/registrarCita/registrarCitaAgendada');
            } else { 
                //Gray
               
                this.$store.state.citaDatos={
                        props:arg.event.extendedProps,
                        id_disponibilidad:arg.event.id,
                        fechaIni:arg.event.start,
                        fechaFin:arg.event.end,
                        id_tutor: this.tutorSel.id_usuario,
                        tttutorSel: this.tutorSel.usuario.tipo_tutorias,
                        isGray:true,
                        alumnos:arg.event.allow,

                };
                this.$router.push('/registrarCita/registrarCitaAgendada');
                 }

         

        },
        
        listarTutores() {
            
            this.showModal();
            // this.calendar=null;
            // this.$store.commit=null;
            const params = {
                id_programa : this.$store.state.programaActual.id_programa,
                nomFacu:this.$store.state.programaActual.facultad.nombre,
                nombre: "",
            };
            axios
            .post('/programa/tutoresListar', params)
            .then(res =>{
                //Ordenadito
                this.tutores=res.data.sort((a, b) => { return  a.usuario.nombre.localeCompare(b.usuario.nombre);});
                 // this.tutores=res.data;  
                
                this.hideModal();  
            
                      
            })
            .catch(e => {
                console.log(e);
                this.hideModal();
                Swal.fire({
                    text:"Estamos teniendo problemas al listar los tutores del programa. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                     showConfirmButton: true,
                });
                //  this.$router.push('/registrarCita');
            })
        },

        getReminders: function() {
         
                this.calendar = this.$refs.fullCalendar.getApi();
                this.$store.state.events = [];
                axios.post('disponibilidades/dispSemanalVistaAl',{
                    idUsuario:this.tutorSel.id_usuario,
                    idPrograma:this.$store.state.programaActual.id_programa,
                    fechaIni:this.calendar.view.activeStart,
                    fechaFin:this.calendar.view.activeEnd 
                })
                .then((response) => {
                    
                    var rd = response.data[0];
                   

                    var rd2 = response.data[1];
                    for(var i in rd) {
                        var start_hour = rd[i].hora_inicio;
                        //this.events.push({
                            if(rd2[i]=='o' && rd[i].alumno.length>=1){
                                
                               if(rd[i].alumno.length==1){    
                                   //Muestra al primer alumno
                                   ///Soy arg
                                   
                                    this.$store.commit("ADD_EVENT", {
                                        allow: rd[i].alumno,
                                        id: rd[i].id_disponibilidad,
                                        title:  rd[i].alumno[0].nombre+" "+rd[i].alumno[0].apellidos,
                                        start: rd[i].fecha + " " + rd[i].hora_inicio,
                                        end: rd[i].fecha + " " + addTimes(start_hour, '00:30:00'),
                                        tipo_disponibilidad: rd[i].tipo_disponibilidad,
                                        color: 'gray',
                                        // ya no es usuario creacion
                                        usuario_creacion: rd[i].usuario_creacion,
                                        id_usuario_tutor: rd[i].id_usuario,
                                        usuario_actualizacion: rd[i].usuario_actualizacion,
                                       
                                    });
                               }
                               else if(rd[i].alumno.length>1){
                                    //Muestra como cita grupal
                                    this.$store.commit("ADD_EVENT", {
                                        allow: rd[i].alumno,
                                        id: rd[i].id_disponibilidad,
                                        title:  'Cita grupal',
                                        start: rd[i].fecha + " " + rd[i].hora_inicio,
                                        end: rd[i].fecha + " " + addTimes(start_hour, '00:30:00'),
                                        tipo_disponibilidad: rd[i].tipo_disponibilidad,
                                        color: 'gray',
                                        // ya no es usuario creacion
                                        usuario_creacion: rd[i].usuario_creacion,
                                        id_usuario_tutor: rd[i].id_usuario,
                                        usuario_actualizacion: rd[i].usuario_actualizacion,
                                       
                                    });
                               } 
                               // }
                            } else {
                                this.$store.commit("ADD_EVENT", {
                                    
                                    id: rd[i].id_disponibilidad,
                                    title: 'Disponible',
                                    start: rd[i].fecha + " " + rd[i].hora_inicio,
                                    end: rd[i].fecha + " " + addTimes(start_hour, '00:30:00'),
                                    tipo_disponibilidad: rd[i].tipo_disponibilidad,
                                    usuario_creacion: rd[i].usuario_creacion,
                                    id_usuario_tutor: rd[i].id_usuario,
                                    usuario_actualizacion: rd[i].usuario_actualizacion,
                                    
                                });
                            }

                        //});
                    }
                    
                }).catch(e => {
                    console.log(e);
                    
                    Swal.fire({
                        text:"Estamos teniendo problemas al mostrar la disponibilidad del tutor. Vuelve a intentar en unos minutos.",
                        icon:"warning",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                         showConfirmButton: true,
                    });
                    
                });
                this.calendar.render();
            },
            //Modal de cargando
            showModal() {
              this.$refs['my-modal'].show()
            },
            hideModal() {
              this.$refs['my-modal'].hide()
            },
          
            
            
    },
    watch: {    
        eventFilter() {
            this.$refs.calendar.fireMethod("rerenderEvents");
        }
    },
  
    
}
function addTimes (startTime, endTime) {
  var times = [ 0, 0, 0 ]
  var max = times.length

  var a = (startTime || '').split(':')
  var b = (endTime || '').split(':')

  // normalize time values
  for (var i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
  }

  // store time values
  for (var j = 0; j < max; j++) {
    times[j] = a[j] + b[j]
  }

  var hours = times[0]
  var minutes = times[1]
  var seconds = times[2]

  if (seconds >= 60) {
    var m = (seconds / 60) << 0
    minutes += m
    seconds -= 60 * m
  }

  if (minutes >= 60) {
    var h = (minutes / 60) << 0
    hours += h
    minutes -= 60 * h
  }

  return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
}

</script>

<style lang='scss'>
    @import './../assets/styles/main.css';
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
    .btn:focus {
        outline:none;
        box-shadow: none;
        border: 2.3px solid transparent;
    }
    select:focus {
        outline:none !important ;
        box-shadow: none !important ; 
    }

    input:focus {
        outline:none !important ;
        box-shadow: none !important ;
    }
    .top-titulo {
        display: flex;
        justify-content: space-between;
    }
    .fc-header-toolbar {
        margin-top: 10px;
    }
    .fc-button {
        background-color: #17a2b8;
        border-color: #17a2b8;
    }
    .fc-button-primary:not(:disabled).fc-button-active {
        background-color: #757575;
        border-color: #757575;
    }
    .fc-button:hover {
        background:#00BCD4;border-color: #00BCD4;
    }
    .fc-button:focus {
        background:#00BCD4 !important;
        border-color: #00BCD4 !important;
        outline:none !important;
        box-shadow: none !important;
        border: 2.3px solid transparent !important;
    }
    .fc-view-container {
        font-family: "Brandon Bold" !important;
    }
    .fc-event { 
        background-color: #B2EBF2;
        border-color: #B2EBF2;
        cursor: pointer;
    }
    .vm--modal {
        border-radius: 25px;
        margin: 30px;
        height: 260px !important;
    }
    @media screen and (max-width: 759px) {
        .form-control { 
            left: -100px;
        }
    }
    @media screen and (max-width: 1024px) {
        .form-control { 
            left: 0px;
        }
    }
    .fc-time-grid .fc-slats td {
        height: 2.5em;
    }
</style>