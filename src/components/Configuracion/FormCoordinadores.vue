<template>
  <!-- <div class="FormPrograma">
    <div class="container" style="left:60px;text-align: left"> -->
	<div name="FormCoordinador">
		<div style="margin-left:5%;text-align: left;">
			<div class="row" style="width:100%">
				<div class="form-inline col-12 col-md-2 col-lg-1">
					<h5 style="margin-top:5%;margin-bottom:5%">Nombre: </h5>
				</div>
				<div class="form-inline col-12 col-md-4">
					<input class="form-control" style="margin-top:3%" v-model="nombre" placeholder="Ingrese nombre del coordinador">
				</div>
			</div>

      <div style="overflow: auto;width:100%;">
        <table class="table" style="text-align:left;margin-top:2%">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Facultad/Programa</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in coordinadoresFiltrados" :key="index">
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
          text: '¿Desea eliminar a '+item.nombre+'?',
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
    width: 100%;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin:auto;
}
</style>