<template>
  <div class="FormUnidadesApoyo">
    <div class="container" style="left:60px;text-align: left;">
      <div class="top-titulo">
            <h4 class="col-sm-4 title-container">Nombre: </h4>
            <input class="col-sm-4 form-control" style="left:-220px;top:26px;right:0px;" v-model="nombre" placeholder="Ingrese nombre del programa">
            <div class="botones">
                <button type="button" class="btn btn-info" @click="nuevo()" style="margin-left:90px" >Añadir</button>
            </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Contacto</th>
            <th scope="col">Correo Contacto</th>
            <th scope="col">Programa</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in unidadesFiltrados" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.nombre_contacto}}</td>
            <td>{{item.correo_contacto}}</td>
            <td>
                <div v-for="(prog,index) in item.programas" :key="index">
                    <a style="font-weight:normal">{{prog.nombre}}</a>
                </div>
            </td>
            <td  style="text-align:left">
                <button v-on:click="Editar(item.id_unidad_apoyo)" class="btn link" style="margin-left:-19px"><b-icon icon="pencil" style="color:#0097A7"/></button>
                <button v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill" style="color:#757575"/></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      unidades:[]
    }
  },
  created(){
    if(this.$store.state.unidades == null) this.listarUnidades();
    else this.unidades = this.$store.state.unidades;
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
            unidadesFiltrados: 'filtrarUnidades'
        })
  },
  methods:{
    listarUnidades() {
      this.axios.post('/unidadesApoyo/unidadesAdmin')
        .then(res =>{
          this.$store.state.unidades = res.data
          this.unidades = res.data
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    Editar(id){
      this.$router.push('/unidad/'+id);
    },
    nuevo(){
      this.$router.push('/unidad');
    },
    Eliminar(item){
      Swal.fire({
          title: '¿Dese eliminar '+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.axios.post('/unidadesApoyo/eliminar/'+item.id_unidad_apoyo)
              .then(response=>{
                response
                let index = this.$store.state.unidades.indexOf(
                  function(element){
                    return element.id_unidad_apoyo === item.id_unidad_apoyo;
                  })
                this.$store.state.unidades.splice(index, 1);
                Swal.fire({
                  text:"Eliminación Exitosa",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                })
              })
              .catch(e=>console.log(e));

          }
        })
      
    }
  }
}
</script>

<style scoped>
.title-container{
    margin-top: 30px;
    margin-bottom: 30px;
}
.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin:auto;
}
</style>
