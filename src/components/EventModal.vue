<template>
  <div style="margin-top:15px;">
    <fieldset>
      <legend>Registrar Cita</legend>
      <b>Nombre Alumno:</b>  {{ nombre }} <br/>
      <!--<b>Fecha:</b>  {{ event.start }} <br/>-->
       <b>Fecha:</b>{{event.start | formatDate}} <br/>
      <b>Hora:</b>  {{ event.start  | formatHour }} <br/>
      <div id="botones">
        <button @click="updateEvent">Aceptar</button>
        <button @click="$emit('close')">Cancelar</button>
      </div>
      <div style="margin-bottom: 20px;"></div>
    </fieldset>

    <!--<fieldset>
        <legend>Edit event</legend>
        <input type="text" v-model="title">
        <input type="date" v-model="start">
        <button @click="updateEvent">Save</button>
        <div style="margin-bottom: 20px;"></div>
    </fieldset>-->
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
export default {
    data () { 
        return {
            title: "",
            start: {},
            end: {},
            nombre: this.$store.state.usuario.nombre + ' ' + this.$store.state.usuario.apellidos,
        }
    },
    methods: {
        updateEvent () {
            console.log(this.event);

            this.$store.commit("UPDATE_EVENT", {
                id: this.event.id,
                title: this.nombre,
                start: this.event.start,
                end: this.event.end,
            });
        },
        /*saveEvent (arg) {
            console.log(arg);
            this.$store.commit("ADD_EVENT", {
                id: (new Date()).getTime(),
                title: this.$store.state.usuario.nombre + ' ' + this.$store.state.usuario.apellidos,
                start: arg.start,
                end: arg.end,
            });
        },*/
    },
  props: {
    text: String,
    event: Object
  },mounted() {
      this.start = formatDate(this.event.start);
      this.end = formatDate(this.event.end);
  }
};
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});
Vue.filter('formatHour', function(value) {
  if (value) {
    return moment(String(value)).format('hh:mm a')
  }
});

function formatDate(date) {
    // YYYY-MM-DD 
    var options = {year: "numeric", month: '2-digit', day: "2-digit"};
    let string = date.toLocaleDateString("ko-KR", options).replace(/\. /g, "-")
    return string.substr(0, string.length - 1)
}
</script>

<style>
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
#botones {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}
</style>
