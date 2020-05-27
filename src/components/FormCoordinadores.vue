<template>
  <div class="FormPrograma">
    <div class="container" style="left:60px;text-align: left;margin-top:20px">
        <div class="row" style="margin-top:40px;margin-bottom:40px">
            <div class="font-weight-ligth text-left textF" style="font-size:20px;line-height: 35px;">Buscar:</div>
            <input class="borde-textbox" type="text" style="margin-left:3%;padding:7px" v-model="nombre">
            <b-button v-on:click="nuevo()" style="margin-left:60%;background: #0097A7">Añadir</b-button>
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
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in coordinadoresFiltrados" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.codigo}}</td>
            <td>{{item.nombre}}</td>
            <td>{{item.correo}}</td>
            <td>
                <div v-if="item.programa!=undefined">
                    <a style="font-weight:normal" v-if="item.pivot.id_tipo_usuario == 2">Facultad - {{item.programa.nombre}}</a>
                    <a style="font-weight:normal" v-else>Programa - {{item.programa.nombre}}</a>
                </div>
            </td>
            <td style=";font-size:30px">
                <b-icon v-if="item.estado == 'act'" icon="check" style="color:green"/>
                <b-icon v-else icon="check" style="color:#757575"/>
            </td>
            <td  style="text-align: center">
                <button v-on:click="Editar(item)" class="btn link"><b-icon icon="pencil"/></button>
                <button v-on:click="Eliminar(item,index)" class="btn link"><b-icon icon="dash-circle-fill"/></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

      
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
    if(this.$store.state.coordinadoresL == null) this.listarCoordinadores();
    else this.coordinadores = this.$store.state.coordinadoresL;
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
      this.axios.post('/facultad/coordinadoresPyF')
        .then(res =>{
            let aux = res.data
            aux.forEach(element => {
                this.axios.post('/programa/listar/'+element.pivot.id_programa)
                    .then(response=>{
                        element.programa = response.data
                    })
            });
            this.$store.state.coordinadoresL = aux;
            this.coordinadores = aux;
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    Editar(item){
      this.$store.state.usuarioEscogido=item;
      this.$router.push('/coordinador/'+item.id_usuario);
    },
    Eliminar(item,index){
      Swal.fire({
          title: '¿Dese eliminar a '+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.axios.post('/usuarios/eliminar/'+item.id_usuario)
              .then(response=>{
                response
                this.$store.state.roles.splice(index, 1);
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
      
    },
    nuevo(){
      this.$router.push('/coordinador/'+0);
    }
  }
}
</script>