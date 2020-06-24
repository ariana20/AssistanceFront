<template>
  <!-- <div class="FormPrograma">
    <div class="container" style="left:60px;text-align: left"> -->
	<div name="FormCoordinador container">
		<div   class="row top-titulo container" style="left:60px;text-align: left;">
      <!-- <div class="top-titulo">
            <h4 class="col-sm-4 title-container">Nombre: </h4>
            <input class="col-sm-4 form-control" style="left:-230px;top:26px;right:0px;" v-model="nombre" placeholder="Ingrese nombre del coordinador">
            <div class="botones">
            <button type="button" class="btn btn-info" @click="nuevo()" style="margin-left:190px" >Añadir</button>
            </div>
      </div> -->
        <!--<div class="row" style="margin-top:40px;margin-bottom:40px">
            <div class="font-weight-ligth text-left textF" style="font-size:20px;line-height: 35px;">Buscar:</div>
            <input class="borde-textbox" type="text" style="margin-left:3%;padding:7px" v-model="nombre">
            <b-button v-on:click="nuevo()" style="margin-left:60%;background: #0097A7">Añadir</b-button>
        </div>-->
        <div class="col-sm-6 top-titulo">
           <h5 class="col-sm-6 " style="top:5px;" >Nombre: </h5>
          <input class="col-sm-6 form-control" type="text" style="top:-5px;margin-bottom:20px" 
           v-model="nombre" placeholder="Ingrese nombre del coordinador">
        </div>
        <div class="botones" >
           <button  type="button" style="border-radius: 10px;margin-right:50px;padding-top:5px;margin-top:-25px"
              @click="nuevo()" class="row btn btn-info">Añadir</button>
        </div> 


      <table class="table" style="text-align:center">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Facultad/Programa</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in coordinadoresFiltrados" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.codigo}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.correo}}</td>
            <td>
                <div v-for="(lugar,ind) in item.lugares" :key="ind">
                    <a style="font-weight:normal">{{lugar}}</a>
                </div>
            </td>
            <td style=";font-size:30px">
                <b-icon v-if="item.estado == 'act'" icon="check" style="color:green"/>
                <b-icon v-else icon="check" style="color:#757575"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando... 
      </div>
    </b-modal>
      
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      coordinadores:[]
    }
  },
  created(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    if(this.$store.state.coordinadoresL == null) {
      
      this.listarCoordinadores();
    }
    else this.coordinadores = this.$store.state.coordinadoresL;
    console.log('a',this.$refs)
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
      coordinadoresFiltrados: 'filtrarCoordinadoresL'
    })
  },
  methods:{
    listarCoordinadores() {
      this.showModal();
      this.axios.post('/facultad/coordinadoresPyF')
        .then(res =>{
          this.$store.state.coordinadoresL = res.data;
          this.coordinadores = res.data;
          this.hideModal();
        })
        .catch(e => {
          console.log(e.response);
          this.hideModal();
        })
    },
    Editar(item){
      this.$store.state.usuarioEscogido=item;
      this.$router.push('/coordinador/'+item.id_usuario);
    },
    Eliminar(item,index){
      Swal.fire({
          text: '¿Dese eliminar a '+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.value) {
            this.showModal();
            this.axios.post('/usuarios/eliminar/'+item.id_usuario)
              .then(response=>{
                response
                this.$store.state.roles.splice(index, 1);
                this.hideModal();
                Swal.fire({
                  text:"Eliminación Exitosa",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                })
              })
              .catch(e=>{
                console.log(e)
                this.hideModal();
              });

          }
        })
    },
    nuevo(){
      this.$router.push('/coordinador/'+0);
    },
    showModal() {
      //this.$refs['my-modal'].show()
    },
    hideModal() {
      //this.$refs['my-modal'].hide()
    },
  }
}
</script>

<style scoped>
.title-container{
    margin-top: 30px;
    margin-bottom: 30px;
    color:black !important;
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