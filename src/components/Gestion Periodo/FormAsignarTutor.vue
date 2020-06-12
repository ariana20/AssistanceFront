<template>
  <div name="FormAsignarTutor">
    <div class="container" style="left:60px;text-align: left;">

        <div class="top-titulo" style="text-align:left;">
            <h4 class="col-sm-4 tutoria-title">Tutor: </h4>
            <select class="col-sm-4 form-control" v-model="tutorSeleccionado"  @click="listarTT()" >
                <option disabled selected :value="null" focusable="false">Selecciona un tutor</option>
                <option 
                    v-for="(item, index) in tutores" 
                    :key="index" 
                    :value="item.tutor.id_usuario">
                    {{ item.tutor.nombre + " " + item.tutor.apellido }}
                </option>
            </select>

            <div>Temas: 
                <label v-for="(item,index) in tipoTutoria" :key="index">
                    {{item.nombre}}<label v-if="index<tipoTutoria.length-1" style="margin-right:5px">, </label>
                </label>
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

  </div>
</template>

<script>

import axios from 'axios'

export default {
  data(){
    return{
      tutores:[],
      tutorSeleccionado:null,
      tipoTutoria:[],
      alumnos:[],
    }
  },
  components: {

  },
  mounted(){
    this.listarTutores();
  },
  computed:{

  },
  methods:{
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
      this.tipoTutoria=this.tutorSeleccionado.tipoTutoria;
      //falta la lista de los alumnos que están asignados a ese tutor
    },

    addAlumno(){

    },
    deleteAl: function(index) {
      //corregir
      this.listAlumnos.splice(index,1);
      //eliminar asignación de BD
    },
    
  }
}
</script>

<style scoped>

.form-control {
    border-radius: 1rem;  
    border: 1px solid #757575;
    text-align-last: left;
    margin-bottom:1.3em;

}

</style>