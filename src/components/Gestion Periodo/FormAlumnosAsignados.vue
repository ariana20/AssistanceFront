<template>
  <div name="FormAlumnosAsignados" class="contenedor">
    <div style="text-align: center;">

        <div class="row" style="text-align:left;">
          <div class="col-12 col-md-2" style="text-align:left;"><h5>Tipo de Tutoría: </h5></div>
          <div class="col-12 col-md-5" style="padding-left: 0px; padding-right: 0px;">
            <select class="form-control" v-model="tutoriaSeleccionada"  v-on:change="listarAlumnos()" >
                <option disabled selected :value="null" focusable="false">Selecciona un Tipo de Tutoria</option>
                <option 
                    v-for="(item, index) in tipoTutoria" 
                    :key="index" 
                    :value="item">
                    {{ item.nombre}}
                </option>
            </select>
          </div>
        </div>

        <div class="row" style="margin-top:2%">
            <div class="font-weight-bolder col-12 col-md-3" style="text-align:left;">Alumnos Asignados</div>
            <div class="font-weight-bolder col-sm-6" style="text-align:right;">
            </div>
        </div>
        <table class="table" style="text-align: left; margin-top:15px">
            <thead>
                <tr>
                    <th scope="col" style="width:150px">Código</th>
                    <th scope="col" style="width:600px">Nombre y Apellidos</th>
                    <th scope="col" style="width:150px">Tipo de Tutoría</th>
                    <th scope="col" style="width:200px">Acciones
                    </th>
                </tr>
            </thead>
   
            <tbody>
                <tr v-for="(item,index) in alumnosAsig" :key="index">
                    <td v-if="item!=undefined">{{item.codigo}}</td>
                    <td v-if="item!=undefined">{{item.nombre+" "+item.apellidos}}</td>
                    <td v-if="item!=undefined">{{item.tipotutoria}}</td>
                    <td v-if="item!=undefined"><button type="button" class="btn btn-info" style="
                       
                        border-top-width: 0px;
                        border-bottom-width: 0px;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        " @click="verPerfil(item)">Ver Perfil</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="mensaje!=''">{{mensaje}}</div>
        <div v-if="tutoriaSeleccionada==null" >No ha seleccionado un tipo de tutoría</div>

    </div>

  </div>
</template>

<script>

import axios from 'axios'

export default {
  data(){
    return{
        tutores:[],
        tutoriaAlumno:null,
        tutorSeleccionado:null,
        tutoriaSeleccionada:null,
        tipoTutoria:[],
        alumnosAsig:[],
        mensaje: ''

    }
  },
  components: {

  },
  mounted(){
    this.listarTipoTutoria();
    this.$store.state.citaDatos={
        pantalla:'alumnosAsignados',
    };   

  },
  computed:{

  },
  methods:{

    listarTipoTutoria() {
        const params = {
            idTutor: this.$store.state.usuario.id_usuario,
            id_programa: this.$store.state.programaActual.id_programa,
        }
        axios.post('usuarios/tutoriaTutor', params)
        .then((response) => {
            this.tipoTutoria=response.data; 
            for(var i=0; i<this.tipoTutoria.length; i++){
                if(this.tipoTutoria[i].tutor_fijo=='0'){
                    this.tipoTutoria.splice(i,1);
                    i--;
                }
            }
            var tipo= new Object();
            tipo.nombre="Todos";
            tipo.id_tipo_tutoria=0;
            this.tipoTutoria.push(tipo);  
        }).catch(e => {
            console.log(e.response);
        });
    },
    listarAlumnos(){
        const params = {
        id_tutor: this.$store.state.usuario.id_usuario,
        id_programa: this.$store.state.programaActual.id_programa,
        id_tipo_tutoria: this.tutoriaSeleccionada.id_tipo_tutoria
        };
        
        //si te doy tipo de tutoría 0, me listas a todos los alumnos con sus tipos de tutorías
        axios
        .post('/registros/listarAlumnos', params)
        .then(res =>{
        this.alumnosAsig=res.data;   
        if(this.alumnosAsig.length==0) this.mensaje='No hay alumnos asignados';
        else this.mensaje='';    
        })
        .catch(e => {
        console.log(e.response);
        })

    },
    
    verPerfil( item){
        this.$router.push('/perfil/'+item.id_usuario)
    }
  
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