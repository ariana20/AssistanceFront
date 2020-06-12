<template>
  <div name="FormTutoresDisponibles">
    <div class="container" style="left:60px;text-align: left;">

			<div class="top-titulo">
				<h4 class="col-sm-4 title-container">Nombre: </h4>
				<input class="col-sm-4 form-control" style="left:-230px;top:26px;right:0px;" v-model="nomb" placeholder="Ingrese nombre de la facultad">
			</div>

      <div v-for="(item,index) in tutores" :key="index">
        <datosTutor
        :tutor="item.tutor"
        :tipoTutoria="item.tipoTutoria" />
      </div>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
          No hay más tutores
        </span>
      </infinite-loading>

    </div>

  </div>
</template>

<script>

import axios from 'axios'
//import Swal from 'sweetalert2'
//import InfiniteLoading from 'vue-infinite-loading'
import datosTutor from '@/components/Gestion Periodo/DatosTutor.vue'

export default {
  data(){
    return{
      tutores:[],
      arreglo:[1,2,3,4,5,6],
      id:null,
      nomb:""
    }
  },
  components: {
    datosTutor
  },
  mounted(){
    //this.listarTutores();
  },
  computed:{

  },
  methods:{

    infiniteHandler: function($state){
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