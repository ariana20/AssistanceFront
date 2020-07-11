<template>
  <div name="FormTutoresDisponibles">
    <div class="contenedor" style="left:60px;text-align: left;">

			<div class="row">
        <div class="col-2">
				<h3 >Nombre: </h3>
				</div>
        <div class="col-4">
        <input class="form-control" v-model="nomb" v-on:keyup.enter="buscarTutor" placeholder="Ingrese nombre del tutor">
        </div>
      </div>

      <div v-for="(item,index) in tutores" :key="index">
        <datosTutor
        :tutor="item"
        :tipoTutoria="item.tipo_tutorias" />
      </div>
      <infinite-loading spinner="spiral" :identifier="infiniteId" @infinite="infiniteHandler">
        <div slot="no-more">No hay más tutores</div>
        <div slot="no-results">No hay tutores con ese nombre</div>
      </infinite-loading>
    </div>

  </div>
</template>

<script>

import axios from 'axios'
import datosTutor from '@/components/Gestion Periodo/DatosTutor.vue'
import InfiniteLoading from 'vue-infinite-loading';


export default {
  data(){
    return{
      page:1,
      tutores:[],
      id:null,
      nomb:"", 
      infiniteId: 1,
    }
  },
  components: {
    datosTutor,
    InfiniteLoading,
  },
  methods:{
    buscarTutor(){
      this.page = 1;
      this.tutores = [];
      this.infiniteId += 1;
    },
    infiniteHandler: function($state){
      //$state.reset();
        let limit = this.tutores.length / 10 + 1;
        const params = {
          page: limit,
          id_programa : this.$store.state.programaActual.id_programa,
          nomFacu:this.$store.state.programaActual.facultad.nombre,
          nombre: this.nomb,
          id_alumno: this.$store.state.usuario.id_usuario
        };
        axios
        .post('/programa/tutoresAlumnoPaginado', params)
          .then(res =>{
            console.log(res);
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