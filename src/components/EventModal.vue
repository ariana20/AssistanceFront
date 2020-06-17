<template>
  <div style="margin-top:15px;">
    <fieldset v-if="this.event.backgroundColor!='#009892' && !isTutor">
      <legend>Registrar Cita</legend>
      <b>Nombre Alumno:</b>  {{ nombre_usuario }} <br/>
      <b>Fecha:</b>{{event.start | formatDate}} <br/>
      <b>Hora:</b>  {{ event.start  | formatHour }} <br/>
      <div id="botones">
        <button type="button" class="btn btn-info" @click="updateEvent">Aceptar</button>
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
      </div>
      <div style="margin-bottom: 20px;"></div>
    </fieldset>

    <fieldset v-if="this.event.backgroundColor=='#009892' && !isTutor">
      <legend>Cita Registrada</legend>
      <b>Nombre Alumno:</b>  {{ nombre_usuario }} <br/>
      <b>Fecha:</b>{{event.start | formatDate}} <br/>
      <b>Hora:</b>  {{ event.start  | formatHour }} <br/>
      <b>Tipo Tutoría:</b>  {{ event.description }} <br/>
      <div id="botones">
        <button type="button" class="btn btn-info" @click="$emit('close')">Cerrar</button>
      </div>
      <div style="margin-bottom: 20px;"></div>
    </fieldset>


    <fieldset v-if="isTutor">
      <div v-if="this.event.backgroundColor!='#B2EBF2'">
        <legend>Cancelar Cita</legend>
        <b>Nombre Alumno:</b>  {{ nombre_usuario }} <br/>
        <b>Fecha:</b>{{event.start | formatDate}} <br/>
        <b>Hora:</b>  {{ event.start  | formatHour }} <br/>
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
        }
    },
    methods: {
        rutaEvent () {
          /*this.$router.push({
            name: 'Cita Agendada',
            props: {event:this.event }
          });*/
          this.$router.push({name:'Cita Agendada', params: {event:this.event }});

        },
        removeEvent() {
          console.log('idDisponibilidad: ',this.event.id);
          console.log('usuario actualizando: ', this.$store.state.usuario.id_usuario);
          
          axios.post('citas/cancelarCita',{
            idCita: this.event.extendedProps.id_cita,
            idDisponibilidad:this.event.id,
            usuario_actualizacion:this.$store.state.usuario.id_usuario})
          .then((response) => {
            console.log(response.data);
            this.event.
            this.$store.commit("UPDATE_EVENT", {
              id: this.event.id,
              title: 'Libre',
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
            return response
          }).catch(e => {
            console.log(e.response);
          });
          this.$emit('close');
        },
        updateEvent () {
          //console.log(this.event.extendedProps);
            this.$store.commit("UPDATE_EVENT", {
                id: this.event.id,
                title: this.nombre,
                start: this.event.start,
                color:'#009892',
            });
            //var fecha_e= moment(this.event.start).format('MM/DD/YYYY')
            //var hora_e=  moment(this.event.start).format('hh:mm a')
            //REGISTRAR LA CITA
            axios.post('citas/registrarCitaAlumno' ,{
              id_tipo_tutoria: 4,
              id_disponibilidad: this.event.id,
              usuario_creacion: this.event.extendedProps.usuario_creacion,
              usuario_actualizacion: this.$store.state.usuario.id_usuario,
              idUsuario: this.$store.state.usuario.id_usuario,
            }).then(response => {
              //console.log('registrarCitaAl response: ',response.data);
              this.event.extendedProps.id_cita = response.data.id_cita;
              console.log('event idCita: ',this.event.extendedProp);
              Swal.fire({
                      text:"Registro Exitoso",
                      icon:"success",
                      confirmButtonText: 'Continuar',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                    });
                    this.$emit('close');
                    
            }).catch(e => {
                console.log(e.response);
            });
            
        }
    },

  props: {
    text: String,
    event: Object,
    isTutor: Boolean,
    nombre_usuario: String,
  },mounted() {
    this.$store.state.curEvent = this.event;
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

<style>
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
    border:1px solid #757575;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
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
</style>
