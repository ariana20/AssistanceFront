<template>
  <div name="FormTutoresDisponibles">
    <div class="container" style="left:60px;text-align: left;">

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
        :tutor="item.tutor"
        :tipoTutoria="item.tipoTutoria" />
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
      arreglo:[1,2,3,4,5,6],
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
        let limit = this.tutores.length / 40 + 1;
        const params = {
          page: limit,
          id : this.$store.state.programaActual.id_programa,
          nombre: this.nomb,
        };
        axios
        .post('/programa/tutores', params)
          .then(res =>{
            console.log(res.data);
            this.loadMore($state, res);           
          })
          .catch(e => {
            console.log(e.response);
          })
    },
    loadMore: function($state, res){
      if(res.data.tasks.length){
        this.tutores=this.tutores.concat(res.data.tasks);
        $state.loaded();
        console.log(this.tutores.length)
        if(res.data.paginate.total==this.tutores.length){
          console.log(this.tutores.length)
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

</style>