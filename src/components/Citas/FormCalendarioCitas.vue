<template>
    <div class="formagendarcita container">
        <div class="top-titulo " style="text-align:left;display: table;margin-bottom:20px">
            <ul class="legend">
                <li><span class="ocupado"></span> Ocupado </li>
                <li><span class="disponible"></span> Disponible </li>
            </ul>
        </div>
        <div style="text-align:left;">
            <Fullcalendar ref="fullCalendar"
                          :plugins ="calendarPlugins"
                          defaultView ="timeGridWeek"
                          :locales="locales"
                          locale="es"
                          :header ="{
                              left: 'prev',
                              center: 'title',
                              right: 'next'
                          }"
                          :footer ="{
                              left: 'timeGridWeek, timeGridDay, listWeek',
                              center: '',
                              right: ''
                          }"
                          :businessHours="businessHours"
                          :columnHeaderFormat="columnFormat"
                          :titleFormat="titleFormat"
                          hiddenDays= [0]
                          :selectable="false"
                          minTime="08:00:00"
                          maxTime="22:00:00"
                          :allDaySlot="false"
                          :events ="EVENTS"
                          @eventClick="handleClick"
                          :customButtons="customButtons"
                          :eventOverlap="false"
                          :displayEventTime="false"
                          />
            <modals-container/>
        
        </div>
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
import EventModal from './../EventModal'

export default {
    name: 'formCalendarioCitas',
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
            isTutor: true,
            nombre: '',
            response: null,
        }

    },
    computed: {
        ...mapGetters(["EVENTS"])
    },
    methods: {
        handleClick (arg) {
            if(arg.event.backgroundColor!='#B2EBF2') {
                this.$modal.show(EventModal,{
                    text: "This is from the component",
                    event: arg.event,
                    isTutor: true,
                    nombre_usuario: arg.event.title
                });
            } else { 
                return false
            }
        },
        getReminders: function() {
                this.calendar = this.$refs.fullCalendar.getApi();
                this.$store.state.events = [];
                axios.post('disponibilidades/dispSemanalVistaTu',{idUsuario:this.$store.state.usuario.id_usuario,fechaIni:this.calendar.view.activeStart,fechaFin:this.calendar.view.activeEnd })
                .then((response) => {
                    console.log('disp: ',response.data);
                    var rd = response.data[0];
                    var rd2 = response.data[1];
                    var rd3 = response.data[2];
                    var rd4 = response.data[3];
                    for(var i in rd) {
                        var start_hour = rd[i].hora_inicio;
                        //this.events.push({
                            console.log(rd3[i].nombre);
                            if(rd2[i]=='o'){
                                this.$store.commit("ADD_EVENT", {
                                    id: rd[i].id_disponibilidad,
                                    title: rd4[i][0].nombre + ' ' + rd4[i][0].apellidos,
                                    description: rd3[i].nombre,
                                    alumno: rd4[i][0],
                                    start: rd[i].fecha + " " + rd[i].hora_inicio,
                                    fecha: rd[i].fecha,
                                    horaIni: rd[i].hora_inicio, 
                                    end: rd[i].fecha + " " + addTimes(start_hour, '00:30:00'),
                                    tipo_disponibilidad: rd[i].tipo_disponibilidad,
                                    color: 'gray',
                                    usuario_creacion: rd[i].usuario_creacion,
                                    id_usuario_tutor: rd[i].id_usuario,
                                    usuario_actualizacion: rd[i].usuario_actualizacion,


                                });                              
                            } else {
                                this.$store.commit("ADD_EVENT", {
                                    id: rd[i].id_disponibilidad,
                                    title: 'Libre',
                                    description:'',
                                    start: rd[i].fecha + " " + rd[i].hora_inicio,
                                    end: rd[i].fecha + " " + addTimes(start_hour, '00:30:00'),
                                    tipo_disponibilidad: rd[i].tipo_disponibilidad,
                                    color: '#B2EBF2',
                                    editable:false,
                                    usuario_creacion: rd[i].usuario_creacion,
                                    id_usuario_tutor: rd[i].id_usuario,
                                    usuario_actualizacion: rd[i].usuario_actualizacion
                                });
                            }
                        //});
                    }
                }).catch(e => {
                    console.log(e.response);
                });
                //this.calendar.render();
            },
    },
    watch: {    
        eventFilter() {
        this.$refs.calendar.fireMethod("rerenderEvents");
        }
    },
    mounted() {
        this.getReminders();
        //this.calendar = this.$refs.fullCalendar.getApi();
        //idUsuario: this.$store.state.usuario.id_usuario
        //this.calendar.render();
    }
    
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
@import './../../assets/styles/main.css';

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

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
}
.vm--modal {
    border-radius: 25px;
    margin: 30px;
    height: 227px !important;
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