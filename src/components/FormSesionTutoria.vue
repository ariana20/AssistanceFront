<template>
    <div class= "formSesionTutoria container">
        <div class="top-titulo">
            <h4 class="col-sm-4 tutoria-title">Tipo de Tutoría: </h4>
            <select class="col-sm-4 form-control" style="left:-40px;top:26px;" v-model="selectedTipoTutoria">
                <option selected disabled value="">Selecciona Tipo de Tutoría</option>
                <option 
                    v-for="(tipoTutoria, index) in tiposTutoria" 
                    :key="index" 
                    :value="tipoTutoria.id_tipo_tutoria">
                    {{ tipoTutoria.nombre }}
                </option>
            </select>
            <div class="botones">
            <button type="button" class="btn btn-info" @click="guardar()" >Guardar</button>
            <button type="button" class="btn btn-info" @click="cancelar()" style="border-color:gray;background-color:gray;">Cancelar</button>
            </div>
        </div>
        <hr>
        <div class="row grid-divider">
            <div class="izq col-lg-6 col-xm-2 col-md-12">
                <div class="font-weight-bolder text-left">Alumno</div>
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
                            :cssClass="bordes"
                            style="margin-bottom: 10px;"
                            :showClearButton="false">
                        </ejs-autocomplete>

                        <ul class="col-sm-12 col-md-12" style="text-align:left;margin-left:-8px;">
                            <li class="form-control" style="width:120%;text-align:center;"
                                v-for="(newAlumnoCod,alcIndex) in listAlumnosCod"  
                                :key="alcIndex">
                                {{newAlumnoCod}}           
                            </li>
                        </ul>

                    </div>
                    <div class="col">
                        <div class="col" style="text-align:left;padding-bottom:30px;">
                            <label for="formGroupExampleInput" style="margin-right:50px">Nombre y Apellidos</label>
                            <button  :disabled="!this.sel" type="button" class="btn btn-light" style="display:inline;margin:-3px;"
                                    @click="addAlumno">+
                            </button>
                        </div>
                        <div type="text" class="form-control" placeholder="Nombre" style="color: white;background:#BEBEBE;" >{{alSeleccionado}}</div>
                        <ul class="col" style="text-align:center;width:200%;margin-left:-10px;padding-right:0px;">
                            <li class="form-control" 
                                v-for="(newAlumno,alIndex) in listAlumnosNom"  
                                :key="alIndex">
                                {{newAlumno}}           
                            </li>
                        </ul>
                    </div>
                    
                </div>

            </div>
            <div class="der col-lg-6 col-xm col-md-12">
                <div class="font-weight-bolder text-left">Resultado</div>
                 <div class="top-titulo" style="margin-bottom:20px;">
                    <div class="col-sm-3 motivo-dropdown-title">Motivo: </div>
                    <select class="col-sm-6 form-control" style="left:-40px;top:5px;" v-model="selectedMotivo">
                        <option selected disabled value="">Selecciona un motivo</option>
                        <option
                        v-for="(motivo, i) in motivos" 
                        :key="i" 
                        :value="motivo.id_motivo_consulta">
                        {{ motivo.nombre }}
                        </option>
                    </select>
                    <div class="botones">
                    <button type="button" 
                            class="btn btn-info" 
                            style="border-color:gray;background-color:gray;"
                            @click="addMotivos">Seleccionar</button>
                    </div>
                </div>
                <div class="left-content" >
                    <h5 style="color:black;font-weight:900;text-align:left;">Motivos Seleccionados</h5>
                    <hr>
                    <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
                        <div v-if="listMotivos.length == 0">No tiene motivos seleccionados</div>
                        <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                            v-for="(newMotivo,motivoIndex) in listMotivos"  
                            :key="motivoIndex">
                            {{newMotivo}}
                            <span name="remove" class="close" @click="deleteMotivo(motivoIndex)" style="margin-right : 20px;float:right;">&times;</span>           
                        </li>
                    </ul>
                    <hr>
                    <div class="form-group" style="text-align:left;margin-bottom:20px;">
                        <label for="descripcion">Descripción:</label>
                        <textarea class="form-control" id="descripcion-motivo" rows="7" v-model="descripcion"></textarea>
                    </div>
                    <div class="top-titulo" style="text-align:left;">
                    <div class="col-sm-4 derivar-dropdown-title">Derivar: </div>
                    <select class="col-sm form-control" style="left:-40px;">
                        <option selected disabled value="">Seleccionar</option>
                        <option
                        v-for="(unidadApoyo, i) in unidadesApoyo" 
                        :key="i" 
                        :value="unidadApoyo.id_unidad_apoyo">
                        {{ unidadApoyo.nombre }}
                        </option>
                    </select>
                    </div>
                </div>
                
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);
export default Vue.extend ({
    name: 'formSesionTutoria',
    data: function () {
        return {
            descripcion: null,
            motivo: null,
            bordes:'borde-textbox',
            sel: '',
            alSeleccionado: 'Nombre Alumno',
            codigos:[],
            campoCodigo: {value:'codigo'},    
            selectedTipoTutoria: '',
            tiposTutoria: [],
            selectedMotivo: '',
            motivos: [],
            newMotivo: null,
            listMotivos:[],
            motivosBorrados:[],
            listAlumnosNom: [],
            listAlumnosCod: [],
            unidadesApoyo: []
        }
    },
    mounted(){
    axios.post('unidadesApoyo/listarTodo')
        .then(response => {
            this.unidadesApoyo = response.data;
        }).catch(e => {
            console.log(e.response);
        });
    axios.post('sesiones/alumnoProg/'+ this.$store.state.programaActual.id_programa + '/' + this.$store.state.tipoActual.id_tipo_usuario)
        .then( response => {
            for(var i in response.data){ 
                this.codigos.push(response.data[i][0]);
            }
        })
        .catch(e => {
            console.log(e.response);
        });
    axios.post('TipoTutoria/listarTodo/' + this.$store.state.programaActual.id_programa)
        .then( response => {
            this.tiposTutoria = response.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    axios.post('motivosConsulta/listarTodo')
        .then( response => {
            this.motivos = response.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    methods: {
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
        addMotivos: function () {
            var i;
            for(i in this.motivos)
                if(this.selectedMotivo==this.motivos[i].id_motivo_consulta) {
                    this.listMotivos.push(this.motivos[i].nombre);
                    this.motivosBorrados.push(this.motivos[i]);
                    this.motivos.splice(i,1);  
                }
        },
        deleteMotivo: function (index) {
            var i;
            for(i in this.motivosBorrados)
                if(this.listMotivos[index]==this.motivosBorrados[i].nombre)
                    this.motivos.push(this.motivosBorrados[i]);
            this.listMotivos.splice(index,1);
        },
        addAlumno: function () {  
            var estaAl = false;
            for( var i in this.listAlumnosCod ){
                    if(this.sel == this.listAlumnosCod[i]){
                        estaAl = true;
                        break;
                    }
            }
            if(this.alSeleccionado != 'Nombre Alumno' && !estaAl){ 
                this.listAlumnosNom.push(this.alSeleccionado);
                this.listAlumnosCod.push(this.sel);
                this.alSeleccionado='Nombre Alumno';
                this.sel= '';
            }
            
            
        }
    }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/material.css';
.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}
.input.e-input, .e-input-group input.e-input, .e-input-group input, .e-input-group.e-control-wrapper input.e-input, .e-input-group.e-control-wrapper input, .e-float-input input, .e-float-input.e-input-group input, .e-float-input.e-control-wrapper input, .e-float-input.e-control-wrapper.e-input-group input, .e-input-group, .e-input-group.e-control-wrapper, .e-float-input, .e-float-input.e-control-wrapper {
    border-radius: 1.25rem;  
    border: 2px solid #757575;
    z-index: 10000;
    text-align: center;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif;
    font-size: 17px;
    margin-bottom:4px!important;
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
.grid-divider {
  overflow-x: hidden; //quickfix to hide divider on left side
  position: relative;
}
.grid-divider > [class*="col-"]:nth-child(n + 2):after {
  content: "";
  background-color: gray;
  position: absolute;
  top: 0;
  bottom: 0;
  @media (max-width: 767px) {
    width: 100%;
    height: 1px;
    left: 0;
    top: -4px; // quickfix to center line between columns
  }
  @media (min-width: 768px) {
    width: 1px;
    height: auto;
    left: -1px; // quickfix to hide divider on left side
  }
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
    border: 2px solid #757575;
    margin-bottom: 10px;
}
</style>