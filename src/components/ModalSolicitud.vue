<template>
  <div style="margin-top:15px; margin-left: 15px;">
    <fieldset>
      <legend>Solicitar Tutor</legend>
        <div class="row">
          <div class="col-12 col-lg-2" style="padding-top: 6px;">
            <h5>Nombre: </h5>
          </div>
          <div class="col-12 col-lg-8" style="padding-top: 6px;">
            <h5>{{tutorSel.nombre+" "+tutorSel.apellidos}} </h5>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-2" style="padding-top: 6px;"><h5>Temas: </h5></div>
          <div class="col-12 col-lg-8">
          <select class="form-control"  v-model="selectedTema" style="border: 0.5px solid #757575;">
              <option disabled selected :value="null" focusable="false">Selecciona un tema</option>
              <option 
                  v-for="(tema, index) in tipoTutoria" 
                  :key="index" 
                  :value="tema">
                  {{ tema.nombre}}
              </option>
          </select>
          </div>
        </div>
        
        <div class="row" style="text-align: right" id="botones" >
            <button type="button"
            class="btn btn-info" v-on:click="solicitarTutor()">Enviar Solicitud</button>
        </div>
        
        
    </fieldset>


  </div>
</template>

<script>
//import moment from 'moment'
//import Vue from 'vue'
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
            selectedTema:null
        }
    },
    props: {
      tutorSel: Object,
      tipoTutoria: Array,
    },
    
    mounted() {
      console.log(this.tipoTutoria);
      console.log(this.tutorSel);

    },
    methods: {

      solicitarTutor(){
          const params={
              id_tutor: this.tutorSel.id_usuario,
              id_solicitante: this.$store.state.usuario.id_usuario,
              id_programa: this.$store.state.programaActual.id_programa, 
              usuario_creacion: this.$store.state.usuario.id_usuario,
              motivo: this.selectedTema.nombre
          }
          axios.create()
          .post('/solicitudes/solicitudTutor', params)
          .then( response=>{
              this.habilitado=response.data.habilitado;
              this.mensaje=response.data.mensaje;
              if(this.habilitado=="Si"){
                  Swal.fire({
                  text:"Registro Exitoso",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                  })   
              }else if(this.habilitado=="No"){
                  Swal.fire({
                  text:this.mensaje,
                  icon:"error",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                  }) 
              }

          })
          .catch(e => {
              console.log(e.response);
          })
      }

    },


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
