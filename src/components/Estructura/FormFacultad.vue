<template>
  <div name="FormFacultad">
    <div class="container">

      <div class="float-right">
        
        <router-link to="/crearFacultad">
          <button type="button"  class="btn btn-info">Añadir</button>
        </router-link>
      </div><br>

      <div class="form-group row">
        <div class="col-sm-3" style="text-align: left"><label for="inputNombre" class="col-sm-1 col-form-label">Nombre</label></div>
        <div class="col-sm-6">
          <!--input type="text" class="form-control" v-model="nombre"-->
          <input id="nombre" class="row form-control" type="text" v-model="nombre">
        </div>
        <button type="button" class="btn btn-outline-secondary"><b-icon icon="search"></b-icon></button>
      </div>

            
      <table class="table" style="text-align: left">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Coordinador</th>
            <th scope="col">Correo</th>
            <th scope="col" style="text-align: center">N° Programas</th>
            <th scope="col" style="text-align: center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in facultadesFiltradas" :key="index">
            <th scope="row">{{index+1}}</th>
            <td v-if="item!=undefined">{{item.nombre}}</td>
            <td v-if="coordinadores[index]!=undefined">{{coordinadores[index].nombre}}</td>
            <td>{{item.correo}}</td>
            <td style="text-align: center">{{item.cantidad-1}}</td>
            <td style="text-align: center">
              <button class="btn link" v-on:click="Editar(item.id_facultad)"><b-icon icon="pencil"></b-icon></button>
              <button class="btn link" v-on:click="Eliminar(item)"><b-icon icon="dash-circle-fill"></b-icon></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      facultades:[],
      coordinadores:[]
    }
  },
  mounted(){
    this.listarFacultades();

  },
  computed:{
    nombre:{
      get(){
          return this.$store.state.filtro.query;
      },
      set(val){
          this.$store.commit('SET_QUERY',val);
      }
    },
    ...mapGetters({
      facultadesFiltradas: 'filtrarFacultades'
    })
  },
  methods:{
    
    listarFacultades() {
      axios
      .post('/facultad/listFacuConCant')
        .then(res =>{
          console.log(res.data);
          this.facultades=res.data
          this.$store.state.facultades = res.data;


        })
        .catch(e => {
          console.log(e.response);
        })
      axios
      .post('/facultad/listFacuConCoordi')
        .then(res =>{
          console.log(res.data);
          this.coordinadores=res.data

        })
        .catch(e => {
          console.log(e.response);
        })
    },
    Editar(id){
      this.$router.push('/crearFacultad/'+id);
    },
    nuevo(){
      this.$router.push('/crearFacultad');
    },
    Eliminar(item){
      Swal.fire({
          title: '¿Dese eliminar '+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.axios.post('/facultad/eliminar/'+item.id_facultad)
              .then(response=>{
                console.log(response)
                let index = this.$store.state.facultades.indexOf(
                  function(element){
                    return element.id_facultad === item.id_facultad;
                  })
                this.$store.state.facultades.splice(index, 1);
              })
              .catch(e=>console.log(e));
            Swal.fire({
              text:"Eliminación Exitosa",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
          }
        })
      
    }
  }
}
</script>

<style scoped>

.form-control {
    border-radius: 1rem;  
    border: 2px solid #757575;
    text-align-last: left;
    margin-bottom:1.3em;

}

</style>