<template>
  <div name="FormSolicitudes" class="container" >
    <div class="row top-titulo" style="text-align: left" >
      <div class="top-titulo">
            <h5 class="col-sm-4 title-container">Nombre: </h5>
            <input class="col-sm-6 form-control" style="top:26px;right:40px;width:250px" v-model="nombre" placeholder="Busque por nombre" onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)  )" >
      </div>
        <!--<div class="row col-sm-4 tutoria-title"  style="margin:10px;font-size:25px;font-weight:bold">Buscar:  
        <input placeholder="Busque por nombre" class="row col-sm-8 form-control" style="left:25px;" type="text" v-model="nombre">  
        </div>
        <div style="margin-right:100px"></div>                   
                 <button  type="button"  style="text-align:right" class="btn btn-info">Añadir</button> 
                  <b-button v-on:click="nuevo()" style="height:40px;border-color:transparent;margin-left:25%;background: #0097A7">Añadir</b-button>-->
           
      </div>
      <table class="table"  style="text-align:left">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo de Solicitud</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha Solicitud</th>
            <th scope="col">Estado</th>
            <th scope="col" style="text-align: center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          
          <tr v-for="(item, index) in solicitudesFiltrados" :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.usuarioSolicitante.nombre+" "+item.usuarioSolicitante.apellidos}}</td>
            <td>{{item.tipo_solicitud}}</td>
            <td>{{item.descripcion}}</td>
            <td>{{item.fecha_creacion}}</td>
            <td style=";font-size:30px">
                <b-icon v-if="item.estado == 'act'" icon="check" style="color:green"/>
                <b-icon v-else icon="cross" style="color:red"/>
            </td>
            <td  style="text-align: center"><button v-on:click="Editar(item.id_tipo_usuario)" class="btn link"><b-icon icon="pencil"/></button>
            <button v-on:click="Eliminar(item)" class="btn link"><b-icon icon="dash-circle-fill"/></button></td>
          </tr>
        </tbody>
      </table>
  

      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      roles:[]
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    if(this.$store.state.solicitudes === null) this.listarSolicitudes();
    else this.solicitudes = this.$store.state.solicitudes;
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
          solicitudesFiltrados: 'filtrarSolicitudes'
        })
  },
  methods:{
    listarSolicitudes() {
        this.axios.post('/solicitudes/listarSol',{id: this.$store.state.usuario.id_usuario})
        .then(response=>{
            this.$store.state.solicitudes = response.data;
        })
        .catch(e=>console.log(e));
      
    },
    Editar(id){
      this.$router.push('/permisos/'+id);
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
            let param = {
                id_solicitante: item.id_solicitante,
                id_remitente: item.id_remitente
            }
            this.axios.post('/solicitudes/eliminar',param)
              .then(response=>{
                response
                let index = this.$store.state.solicitudes.indexOf(
                  function(element){
                    return element.id_solicitante === item.id_solicitante && element.id_remitente === item.id_remitente;
                  })
                this.$store.state.solicitudes[index].estado='eli';
                Swal.fire({
                  text:"Estado cambiado exitosamente",
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

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}
.title-container{
    margin-top: 30px;
    margin-bottom: 30px;
}

.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin:auto;
}
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}
</style>