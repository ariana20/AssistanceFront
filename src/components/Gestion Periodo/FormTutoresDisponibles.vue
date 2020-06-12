<template>
  <div name="FormTutoresDisponibles">
    <div class="container" style="left:60px;text-align: left;">


      <div v-for="(item,index) in tutores" :key="index">
        <datosTutor
        :tutor="item.tutor"
        :tipoTutoria="item.tipoTutoria" />
      </div>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
          No hay mas datos
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
      id:null
    }
  },
  components: {
    datosTutor
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
    infiniteHandler: function($state){
        let limit = this.tutores.length / 40 + 1;
        const params = {
          page: limit,
          id : this.$store.state.programaActual.id_programa
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
        if(res.data.total==this.tutores.length){
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