<template>
    <div class="formagendarcita container">
        <div class="top-titulo" style="text-align:left;">
            <Fullcalendar ref="fullCalendar"
                          :plugins ="calendarPlugins"
                          defaultView ="timeGridWeek"
                          :locales="locales"
                          locale="es"
                          :header ="{
                              left: 'title',
                              center: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
                              right: 'prev today next'
                          }"
                          :businessHours="businessHours"
                          :columnHeaderFormat="columnFormat"
                          hiddenDays= [0]
                          :selectable="true"
                          minTime="08:00:00"
                          maxTime="22:00:00"
                          :allDaySlot="false"
                          :events ="EVENTS"
                          @eventClick="handleClick"
                          :customButtons="customButtons"
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
import EventModal from './EventModal'

export default {
    name: 'formAgendarCita',
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
            columnFormat: 'dddd',
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
                        text: 'custom ext!',
                        click: () => {
                            let calendar = this.$refs.fullCalendar.getApi();
                            calendar.next();
                            this.getReminders();
                        }
                    },
            }
        }

    },
    computed: {
        ...mapGetters(["EVENTS"])
    },
    methods: {
        /*handleSelect (arg) {
            console.log(arg);
            this.$store.commit("ADD_EVENT", {
                id: (new Date()).getTime(),
                title: this.$store.state.usuario.nombre + ' ' + this.$store.state.usuario.apellidos,
                start: arg.start,
                end: arg.end,
            });
        },*/
        handleClick (arg) {
            this.$modal.show(EventModal,{
                text: "This is from the component",
                event: arg.event
            });
            
        },
        getReminders: function() {
                this.calendar = this.$refs.fullCalendar.getApi();
                this.$store.state.events = [];
                axios.post('disponibilidades/dispSemanalVistaAl',{idUsuario:54,fechaIni:this.calendar.view.activeStart,fechaFin:this.calendar.view.activeEnd })
                .then((response) => {
                    //console.log('disp: ',response.data[0]);
                    var rd = response.data[0];
                    var rd2 = response.data[1];
                    console.log(rd);
                    console.log(rd2);
                    for(var i in rd) {
                        //this.events.push({
                            if(rd2[i]=='o'){
                                this.$store.commit("ADD_EVENT", {
                                    id: rd[i].id_disponibildad,
                                    title: 'Ocupado',
                                    start: rd[i].fecha + " " + rd[i].hora_inicio,
                                    type: rd[i].tipo_disponibilidad,
                                    color: 'gray',
                                });
                            } else {
                                this.$store.commit("ADD_EVENT", {
                                    id: rd[i].id_disponibildad,
                                    title: 'Libre',
                                    start: rd[i].fecha + " " + rd[i].hora_inicio,
                                    type: rd[i].tipo_disponibilidad,
                                });
                            }

                        //});
                    }
                });
                this.calendar.render();
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

        /*axios.post('disponibilidades/dispSemanalVistaAl',{idUsuario:54,fechaIni:this.calendar.view.activeStart,fechaFin:this.calendar.view.activeEnd })
        .then(response => {
            this.dispSemanalVistaAl = response.data;
            console.log(response.data);
        }).catch(e => {
            console.log(e.response);
        });*/
    }
    
}

</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

.top-titulo {
    display: flex;
    justify-content: space-between;
}
.fc-header-toolbar {
    margin-top: 30px;
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
}
</style>