<template>
  <div style="margin-top:15px;">
    <fieldset>
      <legend>Registrar Cita</legend>

    </fieldset>


  </div>
</template>

<script>
//import moment from 'moment'
//import Vue from 'vue'
//import axios from 'axios'
//import Swal from 'sweetalert2'

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
        }
    },
    methods: {


    },

  props: {
    text: String,
    isTutor: Boolean,
    nombre_usuario: String,
    id_tutor: Number,
    tutorSel: Object,
  },
  
  mounted() {


  }
};


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
