<template>
  <div name="FormTutoresDisponibles">
    <div class="contenedor" style="left:60px;text-align: left;">

			<div class="row">
        <div class="col-12 col-lg-6">
          <div class="row">
            <div class="col-12 col-lg-2" style="padding-top: 6px;"><h5>Nombre: </h5></div>
            <div class="col-12 col-lg-10" >
              <input class="form-control" v-model="nomb" v-on:keyup.enter="buscarTutor" placeholder="Ingrese nombre del tutor">
            </div>
          </div>
        </div>
      
        <div class="col-12 col-lg-6">
          <div class="row">
            <div class="col-12 col-lg-2" style="padding-top: 6px;"><h5>Temas: </h5></div>
            <div class="col-12 col-lg-8">
            <select class="form-control"  v-model="selectedTema" v-on:change="buscarTutor">
                <option disabled selected :value="null" focusable="false">Selecciona un tema</option>
                <option 
                    v-for="(tema, index) in temas" 
                    :key="index" 
                    :value="tema">
                    {{ tema.nombre}}
                </option>
            </select>
            
            <!--ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
                <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                    v-for="(tema,index) in temaSelect"  
                    :key="index">
                    {{ tema.nombre }}
                    <span name="remove" class="close" @click="deleteTema(index, tema)" style="float:right;">&times;</span>           
                </li>
            </ul-->
            </div>
            <!--div class="col-12 col-lg-2" style="text-align: right; top: 50%;padding-top: 6px;"><h6 style="top:50%;cursor:pointer;color:#17a2b8;" 
                :disabled="!this.selectedTema"
                @click="addTema" 
                >Seleccionar</h6>
            </div-->
          </div>
        </div>
        
      </div>
      <datosTutorAsignado v-if="tutorAsignado"
        :tutor="tutorAsignado"
        :tipoTutoriaAsignado="ttAsignado"/>

      <div v-for="(item,index) in tutores" :key="index">
        <datosTutor
        :tutor="item"
        :tipoTutoria="item.tipoTutoriasPrograma" 
        :tipoTutoriaAsignado="ttAsignado"/>
      </div>
      <infinite-loading spinner="spiral" :identifier="infiniteId" @infinite="infiniteHandler">
        <div slot="no-more">No hay más tutores</div>
        <div slot="no-results">No hay tutores con esas condiciones</div>
      </infinite-loading>
    </div>

  </div>
</template>

<script>

import axios from 'axios'
import datosTutor from '@/components/Gestion Periodo/DatosTutor.vue'
import datosTutorAsignado from '@/components/Gestion Periodo/DatosTutorAsignado.vue'
import InfiniteLoading from 'vue-infinite-loading';
import { FormCheckboxPlugin } from 'bootstrap-vue'
import Vue from 'vue'
Vue.use(FormCheckboxPlugin)

export default {
  data(){
    return{
      page:1,
      tutores:[],
      id:null,
      nomb:"", 
      infiniteId: 1,

      selectedTema:null,
      temas:[],
      temaSelect:[],
      idTemas:[],
      ttAsignado: null,
      tutorAsignado:null,
      
      
    }
  },
  components: {
    datosTutor,
    InfiniteLoading,
    datosTutorAsignado
  },
  mounted(){
    this.listarTipoTutoria();
    this.listarTutoresAsignados();
    
  },
  methods:{
    listarTutoresAsignados(){
        const params = {
          id_programa : this.$store.state.programaActual.id_programa,
          id_alumno: this.$store.state.usuario.id_usuario
        };
        axios
        .post('/programa/tutoresAsignados', params)
          .then(res =>{
            
            console.log(res);         
          })
          .catch(e => {
            console.log(e.response);
          })
    },
    listarTipoTutoria(){

        const params = {
          id_programa : this.$store.state.programaActual.id_programa,
          id_alumno: this.$store.state.usuario.id_usuario
        };
        axios
        .post('/programa/tiposTutoriaAlumno', params)
          .then(res =>{
            this.temas=res.data;
            var tema= new Object();
            tema.id_tipo_tutoria=0;
            tema.nombre="Todos";
            this.temas.push(tema);
            console.log(res);         
          })
          .catch(e => {
            console.log(e.response);
          })

    },
    buscarTutor(){
      //reinicio variables y activo la búsqueda
      this.page = 1;
      this.tutores = [];
      this.infiniteId += 1;
    },
    infiniteHandler: function($state){
      //$state.reset();
      var idT=null;
      if(this.selectedTema && this.selectedTema.id_tipo_tutoria!=0) idT=this.selectedTema.id_tipo_tutoria;
      
      let limit = this.tutores.length / 10 + 1;
      const params = {
        page: limit,
        id_programa : this.$store.state.programaActual.id_programa,
        nomFacu:this.$store.state.programaActual.facultad.nombre,
        nombre: this.nomb,
        id_alumno: this.$store.state.usuario.id_usuario,
        id_tipo_tutoria: idT
      };
      axios
      .post('/programa/tutoresAlumnoPaginado', params)
        .then(res =>{
          console.log(res);
          this.ttAsignado=res.data.tipoAsignado;
          this.tutorAsignado=res.data.tutor;
          this.loadMore($state, res); 
          console.log(this.tutores);          
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    loadMore: function($state, res){
      if(res.data.paginado.data.length){
        this.tutores=this.tutores.concat(res.data.paginado.data);
        $state.loaded();

        if(res.data.paginado.total==this.tutores.length){
          
          $state.complete();
        }
      }else{
        this.id=1;
        $state.complete();
      }

    },
    addTema(){

    },
    deleteTema(index, tema){
      console.log(index + " " + tema);
    }

    
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
input:focus {outline: none;box-shadow: none;}
</style>