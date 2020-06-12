<template>
  <div name="FormTutoresDisponibles">
    <div class="container" style="left:60px;text-align: left;">


      <div v-for="(item,index) in tutores" :key="index">
        <datosTutor
        :tutor="item.tutor"
        :tipoTutoria="item.tipoTutoria" />
      </div>

    </div>

  </div>
</template>

<script>

import axios from 'axios'
//import Swal from 'sweetalert2'
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
          this.tutores=res.data;            
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    /*
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        // Do something, anything!
      }
    };*/
    
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