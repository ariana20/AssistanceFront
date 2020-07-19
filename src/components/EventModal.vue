<template>
  <div style="margin-top:15px;">
    <fieldset v-if="this.event.backgroundColor!='#009892' && !isTutor">
      <legend>Registrar Cita</legend>
      <b>Nombre Alumno:</b>  {{ nombre_usuario }} <br/>
      <b>Fecha:</b>{{event.start | formatDate}} <br/>
      <b>Hora:</b>  {{ event.start  | formatHour }} <br/>
      <!--<div id="motivo"><b style="margin-top: 6px;">Motivo:</b><select class="form-control" style="width:40%" v-model="motivoSel">
        <option disabled selected :value="null" focusable="false">Selecciona un motivo</option>
        <option v-for="(item, index) in tipoTutorias" 
                :key="index" 
                :value="item">
                {{ item.nombre }}
        </option>
        </select>
        </div>-->
      <div id="botones">
        <button type="button" class="btn btn-info" :disabled='isDisabled'  @click="updateEvent">Aceptar</button>
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
      </div>
      <div style="margin-bottom: 20px;"></div>
    </fieldset>

    <fieldset v-if="this.event.backgroundColor=='#009892' && !isTutor">
      <legend>Cita Registrada</legend>
      <b>Nombre Alumno:</b>  {{ nombre_usuario }} <br/>
      <b>Fecha:</b>{{event.start | formatDate}} <br/>
      <b>Hora:</b>  {{ event.start  | formatHour }} <br/>
      <!--<b>Tipo Tutoría:</b>  {{ event.description }} <br/>-->
      <div id="botones">
        <a type="button" class="btn btn-info" 
        :href="'https://www.google.com/calendar/render?action=TEMPLATE&text='+ 
        'Cita Tutoría Registrada' + 
        '&details='+ 'Cita con tutor ' + tutorSel.usuario.nombre + ' ' + tutorSel.usuario.apellidos +'&location=Pontificia+Universidad+Cat%C3%B3lica+del+Per%C3%BA%2C+Av.+Universitaria+1801%2C+San+Miguel+15088%2C+Per%C3%BA&dates=' + 
        ini+'%2F'+ fin" target="_blank"> Agregar a Google calendar
        </a>
        <button type="button" class="btn btn-info" @click="SolCancelar();$emit('close')">Solicitar Cancelacion</button>
        <button type="button" class="btn btn-info" @click="$emit('close')">Cerrar</button>
      </div>
      <div style="margin-bottom: 20px;"></div>
    </fieldset>


    <fieldset v-if="isTutor">
      <div v-if="this.event.backgroundColor!='#B2EBF2'">
        <legend>Cita Agendada</legend>
        <b>Alumno(s) :</b>  {{ nombre_usuario }} <br/>
        <b>Fecha:</b>{{event.start | formatDate}} <br/>
        <b>Hora:</b>  {{ event.start  | formatHour }} <br/>
        <b>Motivo:</b>  {{ event.extendedProps.motivo }} <br/>
        <div id="botones">
          <button id="button" class="btn btn-info" @click="rutaEvent">Detalle</button>
          <button id="button" class="btn btn-info" @click="removeEvent">Cancelar Cita</button>
          <button id="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
        </div>
        <div style="margin-bottom: 20px;"></div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data () { 
        return {
            title: "",
            start: {},
            end: {},
            isDisabled: false,
            idCita: null,
            tipoTutorias: "",
            motivoSel: null,
            ini: null,
            fin: null
        }
    },
    methods: {
        rutaEvent () {
          if(this.event.title == 'Cita Grupal') {
            this.$router.push({name:'Cita Agendada Alumnos'});  
          }
          else {
            this.$router.push({name:'Cita Agendada', params: {event:this.event}});  
          }
        },
        removeEvent() {
          Swal.fire({
          text:'¿Estás seguro que desea cancelar al cita?',
          icon:"warning",
          confirmButtonText: 'Si',
          showCancelButton: true,
          cancelButtonText: 'No',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        }).then((result) => {
          if(result.value) {
            axios.post('citas/cancelarCita',{
              idCita: this.idCita,
              idDisponibilidad:this.event.id,
              usuario_actualizacion:this.$store.state.usuario.id_usuario})
            .then((response) => {
              if(response) {
                this.$store.commit("UPDATE_EVENT", {
                  id: this.event.id,
                  title: 'Disponible',
                  start: this.event.start,
                  color:'#B2EBF2',
                });
                Swal.fire({
                  text:"La cita ha sido cancelada",
                  icon:"success",
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                });
              }
            }).catch(e => {
              console.log(e.response);
            });
            this.$emit('close');
          } 
        })
        },
        updateEvent () {
          this.isDisabled = true;
          if(this.motivoSel){
            console.log('id del motivo seleccionado ',this.motivoSel.id_tipo_tutoria)
            this.$store.commit("UPDATE_EVENT", {
                id: this.event.id,
                title: this.$store.state.usuario.nombre + ' ' + this.$store.state.usuario.apellidos,
                start: this.event.start,
                color:'#009892',
            });
            
            //var fecha_e= moment(this.event.start).format('MM/DD/YYYY')
            //var hora_e=  moment(this.event.start).format('hh:mm a')
            //REGISTRAR LA CITA
            axios.post('citas/registrarCitaAlumno' ,{
              id_tipo_tutoria: this.motivoSel.id_tipo_tutoria,
              id_disponibilidad: this.event.id,
              usuario_creacion: this.event.extendedProps.usuario_creacion,
              usuario_actualizacion: this.$store.state.usuario.id_usuario,
              idUsuario: this.$store.state.usuario.id_usuario,
            }).then(response => {
              if(response) {
                Swal.fire({
                        text:"Registro Exitoso",
                        icon:"success",
                        confirmButtonText: 'Continuar',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                      });
                      this.$emit('close');
              }
            }).catch(e => {
                console.log(e.response);
            });
          }else {
            Swal.fire({
              text:"Debe elegir un motivo",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
            this.isDisabled = false;
          }
            
        },
        getIdCita () {
          axios.post('disponibilidades/mostrarCita2', {idDisponibilidad:this.event.id})
          .then((response) => {
            this.idCita = response.data[0].id_cita;
            this.$store.state.idCita = response.data[0].id_cita;
            this.$store.state.curSesion = response.data
            this.$store.state.cond = response.data[0].cond
          }).catch(e => {
            console.log(e.response);
          });
        },
        SolCancelar(){
          Swal.fire({
                text:"¿Desea solicitar la cancelacion de esta cita?",
                icon:"warning",
                confirmButtonText: 'Sí',
                confirmButtonColor:'#0097A7',
                cancelButtonText: 'No',
                cancelButtonColor:'C4C4C4',
                showCancelButton: true,
                showConfirmButton: true,
            })
              .then((result) => {
                if (result.value) {
                  Swal.fire({
                    title: 'Ingrese el motivo de la cancelación',
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Enviar',
                    confirmButtonColor:'#0097A7',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor:'C4C4C4',
                    showLoaderOnConfirm: true,
                    preConfirm: (login) => {
                      const params={
                        id_remitente: this.id_tutor,
                        id_solicitante: this.$store.state.usuario.id_usuario,
                        tipo_solicitud: 'Cita',
                        descripcion: 'Solicitud para la cancelacion de una cita',
                        id_programa: this.$store.state.programaActual.id_programa, 
                        motivo: login,
                        usuario_creacion: this.$store.state.usuario.id_usuario,
                        usuario_actualizacion: this.$store.state.usuario.id_usuario,
                        id_usuario_relacionado: this.id_tutor,
                        id_cita: this.$store.state.idCita,
                      }
                      return axios.post('/solicitudes/insertar', params)
                      .then( response=>{
                        return response
                      })
                      .catch(e => {
                        console.log(e.response);
                        Swal.showValidationMessage(
                          `Request failed: ${e}`
                        )
                      })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                  }).then((result) => {
                    if(result.value.data.status == 'error'){
                        Swal.fire({
                        text:result.value.data.mensaje,
                        icon:"error",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                        })
                      }
                      else{
                        Swal.fire({
                        text:"Solicitud Enviada Exitosamente",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                        })
                      }
                  })
                  

                } 
            })

        },
    },

  props: {
    text: String,
    event: Object,
    isTutor: Boolean,
    nombre_usuario: String,
    id_tutor: Number,
    tutorSel: Object,
  },mounted() {
    this.ini = this.event.start.getFullYear() + ("0" + (this.event.start.getMonth() + 1)).slice(-2) + ("0" + this.event.start.getDate()).slice(-2) + "T"+ (this.event.start.getHours() + 2)+ (this.event.start.getMinutes()) + (this.event.start.getSeconds()) + "Z"
    this.fin = this.event.end.getFullYear() + ("0" + (this.event.end.getMonth() + 1)).slice(-2) + ("0" + this.event.end.getDate()).slice(-2) + "T"+ (this.event.end.getHours() + 2)+ (this.event.end.getMinutes()) + (this.event.end.getSeconds()) + "Z"
    console.log('hora ini',this.ini)
    console.log('hora fin',this.fin)
    if(this.tutorSel) {
      console.log('tutor ttutoria: ', this.tutorSel.tipo_tutorias)
      this.tipoTutorias = this.tutorSel.usuario.tipo_tutorias
      console.log('tutorias: ', this.tipoTutorias)
    }
    this.$store.state.curEvent = this.event;
    this.getIdCita();

  }
};

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('MM/DD/YYYY')
  }
});
Vue.filter('formatHour', function(value) {
  if (value) {
    return moment(value).format('hh:mm a')
  }
});

</script>

<style scoped>
@import './../assets/styles/main.css';
div {
    color: black !important;
}
fieldset {
    margin-left:20px;
    margin-right:20px;
    margin-bottom: 10px;
    border-radius: 25px;
    padding:0;
    /*border:1px solid #757575;*/
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
    height: 230px;
}

fieldset legend {
    display: block;
    margin-left: 20px;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
    width:auto;
}
b, input {
    margin: 10px;
}
.boton {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  margin: 5px;
}
#botones {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    justify-content: flex-end;
    margin-right: 20px;
}
#motivo {
    display: flex;
    flex-direction: row;
}
</style>
