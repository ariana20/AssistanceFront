<template>
  <div name="FormSolicitudes" style="text-align: left" class="contenedor">
      
    <div class="row" style="width:100%">
      <div class="form-inline col-12 col-md-2 col-lg-1">
        <h5 style="margin-top:5%;margin-bottom:5%">Nombre: </h5>
      </div>
      <div class="form-inline col-12 col-md-4">
        <input class="form-control" style="margin-top:3%" v-model="nombre" placeholder="Busque por nombre" onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)  )">
      </div>
    </div>
          
    <div style="overflow: auto;width:95%">
      <table class="table"  style="text-align:left;margin-top:2%">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Usuario Relacionado</th>
            <th scope="col">Fecha Solicitud</th>
            <th scope="col">Responder</th>
            <th scope="col">Detalle</th>
          </tr>
        </thead>
        <tbody>
          
          <tr v-for="(item, index) in solicitudesFiltrados" :key="index">
            <td scope="row" v-if="item.usuarioSolicitante.codigo">{{item.usuarioSolicitante.codigo}}</td>
            <td scope="row" v-else>Pendiente</td>
            <td>{{item.usuarioSolicitante.nombre+" "+item.usuarioSolicitante.apellidos}}</td>
            <td>{{item.descripcion}}</td>
            <td v-if="item.usuarioRelacionado">{{item.usuarioRelacionado.nombre+" "+item.usuarioRelacionado.apellidos}}</td>
            <td v-else style="text-align:center">Ninguno</td>
            <td>{{item.fecha_actualizacion}}</td>
            <td  v-if="item.tipo_solicitud!='Cita'">
              <button style="padding-left: 5px;padding-right: 5px;width:25px;margin-left:5px" v-on:click="Aceptar(item)" class="btn link">
                  <b-icon icon="check-circle-fill" style="color:#0097A7"/>
              </button>
              <button style="padding-left: 5px;padding-right: 5px;margin-left:5px;width:25px" v-on:click="Rechazar(item)" class="btn link">
                  <b-icon icon="x-circle-fill" style="color:#757575"/>
              </button>
            </td>
            <td  v-else>
              <button style="padding-left: 5px;padding-right: 5px;margin-left:5px;width:25px" v-on:click="Rechazar(item)" class="btn link">
                  <b-icon icon="check-circle-fill" style="color:#0097A7"/>
              </button>
            </td>
            <td >
              <button v-on:click="Elegir(item)" style="padding-left: 5px;padding-right: 5px;width:50px" class="btn link">
                  <modalJ2 v-on:childToParentFacu="Detalle" :solicitud="item"/>      
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="solicitudesFiltrados==null || solicitudesFiltrados.length==0" class="row" style="width:100%">
      <div class="col-12" style="margin-top:1%;margin-bottom:5%;text-align:center;font-size:150%">
        Ninguna Solicitud Pendiente
      </div>
    </div>

    <!-- Modal de cargando.más grande  -->
    <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando... 
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com';
import modalJ2 from '@/components/ModalDetalle.vue'

export default {
  data(){
    return{
      roles:[],
      solEl:null,
    }
  },
  components:{
    modalJ2
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
      this.axios.post('/solicitudes/listarSol',{id: this.$store.state.usuario.id_usuario, id_programa: this.$store.state.programaActual.id_programa})
      .then(response=>{
          this.$store.state.solicitudes = response.data;
      })
      .catch(e=>console.log(e))
    },
    Elegir(item){
        this.solEl = item;
    },
    Detalle(value){
        if(value == "Aceptar") this.Aceptar(this.solEl);
        if(value == "Rechazar") this.Rechazar(this.solEl);
    },
    Aceptar(item){
      Swal.fire({
          text: '¿Desea aceptar la solicitud?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.showModal();
            let param = {
                id_solicitante: item.id_solicitante,
                id_remitente: item.id_remitente,
                usuario_actualizacion: this.$store.state.usuario.id_usuario,
            }
            this.axios.post('/solicitudes/eliminar',param)
              .then(response=>{
                response
                let index;
                for (index = 0; index < this.$store.state.solicitudes.length; index++) {
                  if(this.$store.state.solicitudes[index].id_solicitante == item.id_solicitante 
                  && this.$store.state.solicitudes[index].id_solicitante == item.id_solicitante 
                  && this.$store.state.solicitudes[index].tipo_solicitud == item.tipo_solicitud){
                    break;
                  }
                }
                this.$store.state.solicitudes.splice(index,1);
                this.hideModal();
                let mensaje;
                if(item.tipo_solicitud == 'Programa'){
                  mensaje = "Se aceptó tu solicitud para pertenecer al programa de "+this.$store.state.programaActual.nombre
                  let obj ={
                      id_tipo_usuario:5, 
                      id_programa:this.$store.state.programaActual.id_programa,
                  }
                  this.axios.post('/usuarios/nuevoPrograma/'+item.usuarioSolicitante.id_usuario,obj)
                      .then(response=>{
                        response
                        emailjs.send(
                            "gmail",
                            "template_bV7OIjEW",
                            {
                            "nombre":item.usuarioSolicitante.nombre+" "+item.usuarioSolicitante.apellidos,
                            "mensaje":mensaje,
                            "correo": item.usuarioSolicitante.correo
                            }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                        .then((result) => {
                            console.log('SUCCESS!', result.status, result.text);
                        }, (error) => {
                            console.log('FAILED...', error);
                        });
                        this.hideModal();
                        Swal.fire({
                        text:"Aceptado exitosamente",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                        })
                      })
                      .catch(e=>{
                        console.log(e)
                        this.hideModal();
                      })
                }
                else if(item.tipo_solicitud == 'Tutor'){
                  mensaje = "Se te asignó "+item.usuarioRelacionado.nombre+" "+item.usuarioRelacionado.apellidos+" como tutor en el programa "+this.$store.state.programaActual.nombre
                  this.axios.post('/TipoTutoria/tipoTutoriaNombre',{
                      nombre: item.motivo,
                      id_programa:this.$store.state.programaActual.id_programa
                    })
                    .then(response=>{
                      let obj ={
                        id_alumno:item.id_solicitante, 
                        id_tutor:item.usuarioRelacionado.id_usuario,
                        id_programa:this.$store.state.programaActual.id_programa,
                        id_tipo_tutoria: response.data.id_tipo_tutoria,
                        usuario_creacion: this.$store.state.usuario.id_usuario,
                      }
                      this.axios.post('/registros/insertar',obj)
                        .then(response=>{
                          if(response.data.status=="error"){
                            Swal.fire({
                              text:response.data.mensaje+", ¿desea asignar de todos modos?",
                              icon:"warning",
                              confirmButtonText: 'Si',
                              showCancelButton: true,
                              cancelButtonText: 'No',
                              confirmButtonColor:'#0097A7',
                              showConfirmButton: true,
                            }).then((result) => {
                                if (result.value) {
                                  obj.cambiar=true;
                                  this.axios.post('/registros/insertar', obj)
                                  .then(rr =>{
                                    rr
                                    Swal.fire({
                                      text:"Se ha realizado correctamente la asignación",
                                      icon:"success",
                                      confirmButtonText: 'OK',
                                      confirmButtonColor:'#0097A7',
                                      showConfirmButton: true,
                                    }) 
                                    emailjs.send(
                                      "gmail",
                                      "template_bV7OIjEW",
                                      {
                                      "nombre":item.usuarioSolicitante.nombre+" "+item.usuarioSolicitante.apellidos,
                                      "mensaje":mensaje,
                                      "correo": item.usuarioSolicitante.correo
                                      }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                                    .then((result) => {
                                      console.log('SUCCESS!', result.status, result.text);
                                    }, (error) => {
                                      console.log('FAILED...', error);
                                    });
                                  }).catch(e => {
                                    console.log(e.response);
                                  })
                                } 
                              })
                              
                          }
                          else if (response.data.status=="success"){
                            Swal.fire({
                              text:"Se ha realizado correctamente la asignación",
                              icon:"success",
                              confirmButtonText: 'OK',
                              confirmButtonColor:'#0097A7',
                              showConfirmButton: true,
                            })
                          }
                          this.hideModal();
                        })
                        .catch(e=>{
                          console.log(e)
                          this.hideModal();
                        })
                    
                    
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
                else if(item.tipo_solicitud == 'Cita'){
                  mensaje = "Se aceptó tu cancelacion de la cita con el tutor "
                    +item.usuarioRelacionado.nombre+" "
                    +item.usuarioRelacionado.apellidos
                    +" del día "+item.cita.disponibilidad.fecha+ " a las "+item.cita.disponibilidad.hora_inicio+" en el programa "+this.$store.state.programaActual.nombre
                  let obj ={
                    idCita:item.cita.id_cita, 
                    idDisponibilidad:item.cita.id_disponibilidad,
                    usuario_actualizacion: this.$store.state.usuario.id_usuario,
                  }
                  this.axios.post('/citas/cancelarCita',obj)
                    .then(response=>{
                        response
                        emailjs.send(
                            "gmail",
                            "template_bV7OIjEW",
                            {
                            "nombre":item.usuarioSolicitante.nombre+" "+item.usuarioSolicitante.apellidos,
                            "mensaje":mensaje,
                            "correo": item.usuarioSolicitante.correo
                            }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                        .then((result) => {
                            console.log('SUCCESS!', result.status, result.text);
                        }, (error) => {
                            console.log('FAILED...', error);
                        });
                        this.hideModal();
                        Swal.fire({
                          text:"Cancelación de cita aceptada exitosamente",
                          icon:"success",
                          confirmButtonText: 'OK',
                          confirmButtonColor:'#0097A7',
                          showConfirmButton: true,
                        })
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
                this.listarSolicitudes();
              })
              .catch(e=>{
                console.log(e)
                this.hideModal();
              })

          }
        })
      
    },
    Rechazar(item){
      let title = '¿Desea rechazar la solicitud?'
      if(item.tipo_solicitud=='Cita') title = '¿Desea eliminar la notificación?'
      Swal.fire({
          title: title,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.showModal();
            let param = {
                id_solicitante: item.id_solicitante,
                id_remitente: item.id_remitente,
                usuario_actualizacion: this.$store.state.usuario.id_usuario,
            }
            this.axios.post('/solicitudes/eliminar',param)
              .then(response=>{
                response
                let index = this.$store.state.solicitudes.indexOf(
                  function(element){
                    return element.id_solicitante === item.id_solicitante && element.id_remitente === item.id_remitente;
                  })
                this.$store.state.solicitudes.splice(index,1);
                let mensaje;
                if(item.tipo_solicitud == 'Programa') mensaje = "Se rechazó tu solicitud para pertenecer al programa de "+this.$store.state.programaActual.nombre
                if(item.tipo_solicitud == 'Tutor') mensaje = "Se rechazó tu solicitud para asignacion de Tutor en el programa de "+this.$store.state.programaActual.nombre
                if(item.tipo_solicitud == 'Cita') mensaje = "Se rechazó tu solicitud para la cancelación de tu cita con "+this.$store.state.usuario.nombre+" "+this.$store.state.usuario.apellidos
                if (item.tipo_solicitud== 'Programa' || item.tipo_solicitud == 'Tutor'){
                  emailjs.send(
                  "gmail",
                  "template_bV7OIjEW",
                  {
                  "nombre":item.usuarioSolicitante.nombre+" "+item.usuarioSolicitante.apellidos,
                  "mensaje":mensaje,
                  "correo": item.usuarioSolicitante.correo
                  }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                  .then((result) => {
                      console.log('SUCCESS!', result.status, result.text);
                  }, (error) => {
                      console.log('FAILED...', error);
                  });
                
                  this.hideModal();
                  Swal.fire({
                    text:"Rechazado exitosamente",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                }
                else{
                  this.hideModal();
                  Swal.fire({
                    text:"Revisado exitosamente",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                }
              })
              .catch(e=>{
                console.log(e)
                this.hideModal();
              });

          }
        })
      
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  }
}
</script>
<style scoped>

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
    width: 100%;
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