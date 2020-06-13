<template>
  <div name="FormAsignarTutor">
    <div class="container" style="text-align: center;margin-top:20px">

        <div class="row" style="text-align:center;">
            <h4 class="font-weight-bolder col-sm-2">Tutor: </h4>
            <select class="col-sm-5 form-control" v-model="tutorSeleccionado"  @click="listarTT()" >
                <option disabled selected :value="null" focusable="false">Selecciona un tutor</option>
                <option 
                    v-for="(item, index) in tutores" 
                    :key="index" 
                    :value="item">
                    {{ item.tutor.nombre + " " + item.tutor.apellidos }}
                </option>
            </select>
        </div>
        <div class="row" >
          <div class="font-weight-bolder col-sm-2" style="text-align:center;">Temas: </div>
          <div>
              <label v-for="(item,index) in tipoTutoria" :key="index">
                  {{item.nombre}}<label v-if="index<tipoTutoria.length-1" style="margin-right:5px">, </label>
              </label>
          </div>
        </div>

        <div class="font-weight-bolder text-left">Alumnos</div>
        <div class="row">
            <div class="col-md-4 col-sm-4">
                <div class="col-sm-6"><label for="formGroupExampleInput">Código</label></div>
                <hr style="width:335%;">
                <ejs-autocomplete
                    :dataSource='codigos' 
                    :fields='campoCodigo' 
                    placeholder="Código" 
                    :change='onCodigoChange'
                    v-model="sel"
                    class="form-control"
                    style="margin-bottom: 10px;"
                    :showClearButton="false">
                </ejs-autocomplete>

                <ul class="col-sm-12 col-md-12" style="text-align:left;margin-left:-8px;">
                    <li class="form-control" style="width:120%;text-align:center;margin-top:8px;"
                        v-for="(newAlumnoCod,alcIndex) in listAlumnosCod"  
                        :key="alcIndex">
                        {{newAlumnoCod}}           
                    </li>
                </ul>

            </div>
            <div class="col">
                <div class="col" style="text-align:left;padding-bottom:30px;">
                    <label for="formGroupExampleInput" style="margin-right:50px">Nombre y Apellidos</label>
                    <button  :disabled="!this.sel" type="button" class="btn btn-info" style="display:inline;margin:-3px;"
                            @click="addAlumno">Agregar
                    </button>
                </div>
                <div type="text" class="form-control" placeholder="Nombre" style="color: white;background:#BEBEBE;" >{{alSeleccionado}}</div>
                <ul class="col" style="text-align:center;width:200%;margin-left:-10px;padding-right:0px;">
                    <li class="form-control list-group-item" style="padding: 0.4rem 0.5rem;"
                        v-for="(newAlumno,alIndex) in listAlumnosNom"  
                        :key="alIndex">
                        {{newAlumno}}    
                        <span name="remove" class="close" @click="deleteAl(alIndex)">&times;</span> 
                    </li>
                </ul>
            </div>
            
        </div>


    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);
import axios from 'axios'

export default {
  data(){
    return{
      tutores:[],
      tutorSeleccionado:null,
      tipoTutoria:[],
      alumnos:[],
      sel:'',
      alSeleccionado: 'Nombre Alumno',
      codigos:[],
      campoCodigo: {value:'codigo'},  
      listAlumnosCod: [],
      listAlumnosNom:[],
      listAlumnosId: [],
    }
  },
  components: {

  },
  mounted(){
    this.listarTutores();
    this.obtenerAlumnos();
  },
  computed:{

  },
  methods:{
    obtenerAlumnos(){
      axios.post('sesiones/alumnoProg', {idTipoU:5,idProg: this.$store.state.programaActual.id_programa})
      .then( response => {
          console.log("listado alumnos: ",response.data)
          for(var i in response.data){ 
              this.codigos.push(response.data[i][0]);
          }
      })
      .catch(e => {
          console.log(e.response);
      });
    },
    onCodigoChange: function () {
        var i;
        for(i in this.codigos){
            if(this.sel==this.codigos[i].codigo){
                this.alSeleccionado = this.codigos[i].nombre + ' ' + this.codigos[i].apellidos;                
            }
            console.log(this.alSeleccionado);
            //break;   
        }
    },
    listarTutores() {
      const params = {
        id : this.$store.state.programaActual.id_programa
      };
      axios
      .post('/programa/tutores', params)
        .then(res =>{
          console.log(res.data);
          this.tutores=res.data.tasks;            
        })
        .catch(e => {
          console.log(e.response);
        })
    },

    listarTT(){
      if(this.tutorSeleccionado){
        this.tipoTutoria=this.tutorSeleccionado.tipoTutoria;

        const params = {
          id_tutor: this.$store.state.usuario.id_usuario,
          id_programa: this.$store.state.programaActual.id_programa
        };
        axios
        .post('/registros/listarAlumnos', params)
        .then(res =>{
          console.log(res);
          this.alumnos=res.data;            
        })
        .catch(e => {
          console.log(e.response);
        })
      }

    },

    addAlumno: function () {  
        var estaAl = false;
        for( var i in this.listAlumnosCod ){
                if(this.sel == this.listAlumnosCod[i]){
                    estaAl = true;
                    break;
                }
        }
        if(this.alSeleccionado != 'Nombre Alumno' && !estaAl && this.sel.length == 8){ 
            this.listAlumnosNom.push(this.alSeleccionado);
            this.listAlumnosCod.push(this.sel);
            for(var j in this.codigos){
                if(this.sel == this.codigos[j].codigo)
                    this.listAlumnosId.push(this.codigos[j].id_usuario);
            }
            this.alSeleccionado='Nombre Alumno';
            this.sel= '';
        }
        console.log(this.listAlumnosId);  
        
    },

    deleteAl: function(index) {
      //corregir
      this.listAlumnos.splice(index,1);
      //eliminar asignación de BD
    },
    
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/material.css';

.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}

input.e-input, .e-input-group input.e-input, .e-input-group.e-control-wrapper input.e-input, textarea.e-input, .e-input-group textarea.e-input, .e-input-group.e-control-wrapper textarea.e-input{
    border-width: 1px !important;
}
.input.e-input, .e-input-group input.e-input, .e-input-group input, .e-input-group.e-control-wrapper input.e-input, .e-input-group.e-control-wrapper input, .e-float-input input, .e-float-input.e-input-group input, .e-float-input.e-control-wrapper input, .e-float-input.e-control-wrapper.e-input-group input, .e-input-group, .e-input-group.e-control-wrapper, .e-float-input, .e-float-input.e-control-wrapper {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    text-align: center;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif;
    font-size: 17px;
    margin-bottom:0px!important;
}
.e-control .e-autocomplete .e-lib .e-input .e-keyboard {
    z-index: -100;
}
.borde-textbox {
    border-radius: 1.25rem;  
    border: 2px solid #757575;
}
.izq {
    //background-color: cornflowerblue;
    padding: 20px;
}
.der {
    //background-color: darkgreen;
    padding: 20px;
}
.tutoria-title{
    margin-top: 30px;
    margin-bottom: 20px;
}

.font-weight-bolder {
    color: black;
    font-size: 24px;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
}
.botones {
    margin:auto;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.text-left {
    margin-bottom: 20px;
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.btn:focus {
    outline:none;
    box-shadow: none;
    border: 2.3px solid transparent;
}
select:focus {
    outline:none;
    box-shadow: none;
}

</style>