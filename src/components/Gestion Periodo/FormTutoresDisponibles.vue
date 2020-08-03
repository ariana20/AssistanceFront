<template>
  <div name="FormTutoresDisponibles">
    <div class="contenedor" style="left:60px;text-align: left;">


      <div v-if="tutoresAsignado.length>0">
        <div class="font-weight-bolder"><h4>Tutores Asignados</h4></div>
        <div style="width: 100%; border-bottom: 2px solid rgb(0, 152, 146); height: 1px; padding-top: 15px; margin-bottom: 15px;"></div>
        
        <div class="row">
        <div v-for="(item) in tutoresAsignado" :key="item.id_usuario" class="col-12 col-lg-6">
          
          <datosTutorAsignado 
            :tutor="item"
            :tipoTutoriaAsignado="ttAsignado"/>
          
        </div>
        </div>
        <div style="width: 100%; border-bottom: 2px solid rgb(0, 152, 146); height: 1px; padding-top: 15px; margin-bottom: 15px;"></div>
        
      </div>
      <div class="font-weight-bolder;"><h4 style="margin-bottom: 15px;">Otros tutores</h4></div>
			<div class="row">
        <div class="col-12 col-lg-6">
          <div class="row">
            <div class="col-12 col-lg-2" style="padding-top: 6px;"><h5>Nombre: </h5></div>
            <div class="col-12 col-lg-10" >
              <input maxlength="100" class="form-control" v-model="nomb" v-on:keyup.enter="buscarTutor" placeholder="Ingrese nombre del tutor">
            </div>
          </div>
        </div>
      
        <div class="col-12 col-lg-6">
          <div class="row">
            <div class="col-12 col-lg-2" style="padding-top: 6px;"><h5>Temas: </h5></div>
            <div class="col-12 col-lg-8">
            <select class="form-control"  v-model="selectedTema" v-on:change="buscarTutor">
                <option selected :value="null" focusable="false">Selecciona un tema</option>
                <option 
                    v-for="(tema, index) in temas" 
                    :key="index" 
                    :value="tema">
                    {{ tema.nombre}}
                </option>
            </select>
          
            </div>
          </div>
        </div>
        
      </div>
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
      tutoresAsignado:[],
      
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
            this.tutoresAsignado=res.data;  
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
          this.ttAsignado=res.data.tipoAsignado;
          this.loadMore($state, res); 
          // console.log(this.tutores);          
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
      index 
      tema
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
.btn:focus {outline: none;box-shadow: none;}
select:focus {outline: none;box-shadow: none;}
</style>