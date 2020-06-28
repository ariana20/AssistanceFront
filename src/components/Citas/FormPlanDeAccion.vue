<template>
  <div class="container mt-5">
    <div v-if="anadirPlan==false">
      <b-button v-on:click="anadirPlan=true;nuevo=true" style="background: #0097A7;border: 0px;width:100%;margin-left:1%">
        Añadir Plan De Acción
      </b-button>
    </div>
    <div v-else>
      <div class="row" style="margin-top:5%;text-align:left">
        <div class="col-12" style="font-size:150%">
          <strong>Plan de Acción</strong>
        </div>
      </div>
      <div class="row" style="margin-top:3%;text-align:left">
        <div class="col-12 col-md-2" style="margin-bottom:3%">
          <strong>Titulo:</strong>
        </div>
        <div class="col-12 col-md-3">
          <div v-if="planAccion!=undefined && planAccion.compromisos!=undefined && this.nuevo==false">
            <select v-on:change="Elegir()" class= "form-control" style="color:gray;margin-top:-1%" v-model="planAccion">
              <option selected disabled :value="null">Elige un Plan de Acción</option>
              <option v-for="(options,index) in planes" v-bind:key="index" :value="options">
                {{ options.nombre}}
              </option>
            </select>
          </div>
          <div v-else>
            <input class="borde-textbox inp" type="text" v-model="nombre" style="width:100%;margin-left:0px">
          </div>
        </div>
        <div class="col-12 col-md-3">
          <b-button v-if="this.nuevo==false" v-on:click="Nuevo()" style="background: #0097A7;border: 0px;margin-top:-0.9%">
            Añadir Nuevo
          </b-button>
          <div v-else>
            <b-button v-if="planAccion!=undefined" v-on:click="Elegir()" style="background: #0097A7;border: 0px;margin-top:-0.9%">
              Cancelar
            </b-button>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:3%;text-align:left">
        <div class="col-12 col-md-2" style="margin-bottom:3%">
          <strong>Descripción:</strong>
        </div>
        <div class="col-12 col-md-7">
          <div v-if="nuevo!=true" style="margin-left:2%">
            {{this.planAccion.descripcion}}
          </div>
          <div v-else>
            <textarea  v-model="descripcion" class="perso inp" id="subject" name="subject" placeholder="Esriba la descripción del plan.." style="resize: none;padding-top:2%;height:100px;width:100%"/>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:3%;margin-bottom:1%;text-align:left">
        <div class="col-12 col-md-3">
          <strong>Añadir Compromisos</strong>
        </div>
      </div>
      <div class="row" style="margin-bottom:1%">
        <div class="col-12 col-md-3 form-inline">
          <textarea  v-model="newTask" class="perso inp" id="subject" @keyup.enter="add" name="subject" placeholder="Ingresar Compromiso" style="resize: none;padding-top:2%;height:50px;width:100%"/>
        </div>
        <div class="col-12 col-md-1 form-inline">
          <b-button v-on:click="add" style="background: #0097A7;border: 0px">
            Añadir
          </b-button>
        </div>
        <div class="col-md-2 offset-md-6 form-inline">
          <b-button v-on:click="Guardar" style="background: #0097A7;border: 0px;width:100%;margin-left:1%">
            Guardar
          </b-button>
        </div>
      </div>
      <div v-if="planAccion!=undefined" class="row" style="margin-top:2%">
        <div class="col-md-3 form-inline" style="font-size:150%;text-align:right">
          <b-button v-on:click="TodoHecho" style="background: #0097A7;border: 0px;width:100%;margin-left:1%">
            Todo Hecho >
          </b-button>
        </div>
      </div>

      <div class="row">

        <div class="col-md-3" style="margin-top:5%">
          <div class="p-2 redondo">
            <h3> Pendiente</h3>
            <draggable class="list-group kanban-column" :list="arrBacklog" group="tasks">
              <div style="cursor: context-menu;" class="list-group-item" v-for="(element,index) in arrBacklog" :key="element.name">
                <div class="row">
                  <div class="col-8" style="color: #757575 !important;">
                    {{element.name}} 
                  </div>
                  <div class="col-1">
                    <a class="btn" v-on:click="Eliminar(index,1)" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;margin-left:1%">X</a>
                  </div>
                </div>
              </div>
            </draggable>
          </div>
        </div>

        <div class="col-md-3" style="margin-top:5%">
          <div class="p-2 redondo">
            <h3> En Proceso</h3>
            <draggable class="list-group kanban-column" :list="arrInProgress" group="tasks">
              <div style="cursor: context-menu;" class="list-group-item" v-for="(element,index) in arrInProgress" :key="element.name">
                <div class="row">
                  <div class="col-8" style="color: #757575 !important;">
                    {{element.name}} 
                  </div>
                  <div class="col-1">
                    <a class="btn" v-on:click="Eliminar(index,2)" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;margin-left:1%">X</a>
                  </div>
                </div>
              </div>
            </draggable>
          </div>
        </div>

        <div class="col-md-3" style="margin-top:5%">
          <div class="p-2 redondo">
            <h3> Por Revisar</h3>
            <draggable class="list-group kanban-column" :list="arrTested" group="tasks">
              <div style="cursor: context-menu;" class="list-group-item" v-for="(element,index) in arrTested" :key="element.name">
                <div class="row">
                  <div class="col-8" style="color: #757575 !important;">
                    {{element.name}} 
                  </div>
                  <div class="col-1">
                    <a class="btn" v-on:click="Eliminar(index,3)" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;margin-left:1%">X</a>
                  </div>
                </div>
              </div>
            </draggable>
          </div>
        </div>

        <div class="col-md-3" style="margin-top:5%">
          <div class="p-2 redondo">
            <h3> Hecho</h3>
            <draggable class="list-group kanban-column" :list="arrDone" group="tasks">
              <div style="cursor: context-menu;" class="list-group-item" v-for="(element,index) in arrDone" :key="element.name">
                <div class="row">
                  <div class="col-8" style="color: #757575 !important;">
                    {{element.name}} 
                  </div>
                  <div class="col-1">
                    <a class="btn" v-on:click="Eliminar(index,4)" style="padding-top:0px;padding-bottom:0px;margin-top:0px;margin-bottom:0px;margin-left:1%">X</a>
                  </div>
                </div>
              </div>
            </draggable>
          </div>
        </div>

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
import draggable from 'vuedraggable'
import Swal from 'sweetalert2'
export default {
  data(){
    return{
      anadirPlan:false,
      nuevo:false,
      tiposUsuario: null,
      planAccion:null,
      planes:null,
      completado:false,
      nombre:'',
      descripcion:'',
      eliminados:[],
      compromisos: [],
      cambios:[],
      newTask: "",
      arrBacklog: [],
      arrInProgress: [],
      arrTested: [],
      arrDone: [],

    }
  },
  props: ['usr'],
  components:{
    draggable,
  },
  mounted(){
    this.listarPlan()
  },
  methods:{
    listarPlan(){
      this.showModal();
      let obj = {
        id_alumno: this.usr.id_usuario,
        id_tutor: this.$store.state.usuario.id_usuario

      }
      this.axios.post('/planAccion/planAlumno',obj)
        .then(response=>{
          this.planes = response.data
          this.planAccion = response.data[0]
          if(this.planAccion!=null && this.planAccion.compromisos!=undefined) {
            this.anadirPlan = true;
            this.planAccion.compromisos.forEach(element => {
              if(element.estado == 'hac') this.arrBacklog.push({name: element.nombre})
              if(element.estado == 'pro') this.arrInProgress.push({name: element.nombre})
              if(element.estado == 'rev') this.arrTested.push({name: element.nombre})
              if(element.estado == 'hec') this.arrDone.push({name: element.nombre})
            });
          }
          this.hideModal();
        })
        .catch(e=>{
          console.log(e)
          this.hideModal();
        })
    },
    add(){
      if(this.newTask){
        this.arrBacklog.push({name: this.newTask})
        this.newTask=""
      }
    },
    Guardar(){
      Swal.fire({
        text: '¿Desea guardar sus cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0097A7',
        cancelButtonColor: '#757575',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.arrBacklog.forEach(element => {
            this.compromisos.push({nombre: element.name, estado: 'hac'})
          });
          this.arrInProgress.forEach(element => {
            this.compromisos.push({nombre: element.name, estado: 'pro'})
          });
          this.arrTested.forEach(element => {
            this.compromisos.push({nombre: element.name, estado: 'rev'})
          });
          this.arrDone.forEach(element => {
            this.compromisos.push({nombre: element.name, estado: 'hec'})
          });
          if(this.nuevo!=true){
            this.planAccion.compromisos.forEach(element => {
              let i;
              for (i = 0; i < this.compromisos.length; i++) {
                if(this.compromisos[i].nombre == element.nombre){
                  if(this.compromisos[i].estado != element.estado){
                    this.cambios.push(this.compromisos[i])
                  }
                  this.compromisos.splice(i,1)
                }
              }
            });
            if(this.cambios.length != 0){
              if(this.compromisos.length != 0){
                if(this.eliminados.length!=0){
                  this.showModal()
                  let obj ={
                    id_tutor: this.$store.state.usuario.id_usuario,
                    compromisos: this.compromisos,
                    cambios: this.cambios,
                    eliminados: this.eliminados,
                  }
                  this.axios.post('/planAccion/modificar/'+this.planAccion.id_plan_accion,obj)
                    .then(response=>{
                      response
                      this.hideModal();
                      Swal.fire({
                      text:"Actualizacion de Plan de Accion exitosa",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                      })
                      this.cambios = [];
                      this.eliminados = [];
                      this.compromisos = [];
                      this.arrBacklog = [];
                      this.arrInProgress = [];
                      this.arrTested = [];
                      this.arrDone = [];
                      this.nuevo = false;
                      this.listarPlan();
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
                else{
                  this.showModal()
                  let obj ={
                    id_tutor: this.$store.state.usuario.id_usuario,
                    compromisos: this.compromisos,
                    cambios: this.cambios,
                  }
                  this.axios.post('/planAccion/modificar/'+this.planAccion.id_plan_accion,obj)
                    .then(response=>{
                      response
                      this.hideModal();
                      Swal.fire({
                      text:"Actualizacion de Plan de Accion exitosa",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                      })
                      this.cambios = [];
                      this.eliminados = [];
                      this.compromisos = [];
                      this.arrBacklog = [];
                      this.arrInProgress = [];
                      this.arrTested = [];
                      this.arrDone = [];
                      this.nuevo = false;
                      this.listarPlan();
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
              }
              else{
                if(this.eliminados.length!=0){
                  this.showModal()
                  let obj ={
                    id_tutor: this.$store.state.usuario.id_usuario,
                    cambios: this.cambios,
                    eliminados: this.eliminados,
                  }
                  this.axios.post('/planAccion/modificar/'+this.planAccion.id_plan_accion,obj)
                    .then(response=>{
                      response
                      this.hideModal();
                      Swal.fire({
                      text:"Actualizacion de Plan de Accion exitosa",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                      })
                      this.cambios = [];
                      this.eliminados = [];
                      this.compromisos = [];
                      this.arrBacklog = [];
                      this.arrInProgress = [];
                      this.arrTested = [];
                      this.arrDone = [];
                      this.nuevo = false;
                      this.listarPlan();
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
                else{
                  this.showModal()
                  let obj ={
                    id_tutor: this.$store.state.usuario.id_usuario,
                    cambios: this.cambios,
                  }
                  this.axios.post('/planAccion/modificar/'+this.planAccion.id_plan_accion,obj)
                    .then(response=>{
                      response
                      this.hideModal();
                      Swal.fire({
                      text:"Actualizacion de Plan de Accion exitosa",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                      })
                      this.cambios = [];
                      this.eliminados = [];
                      this.compromisos = [];
                      this.arrBacklog = [];
                      this.arrInProgress = [];
                      this.arrTested = [];
                      this.arrDone = [];
                      this.nuevo = false;
                      this.listarPlan();
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
              }
            }
            else{
              if(this.compromisos.length != 0){
                if(this.eliminados.length!=0){
                  this.showModal()
                  let obj ={
                    id_tutor: this.$store.state.usuario.id_usuario,
                    compromisos: this.compromisos,
                    eliminados: this.eliminados,
                  }
                  this.axios.post('/planAccion/modificar/'+this.planAccion.id_plan_accion,obj)
                    .then(response=>{
                      response
                      this.hideModal();
                      Swal.fire({
                      text:"Actualizacion de Plan de Accion exitosa",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                      })
                      this.cambios = [];
                      this.eliminados = [];
                      this.compromisos = [];
                      this.arrBacklog = [];
                      this.arrInProgress = [];
                      this.arrTested = [];
                      this.arrDone = [];
                      this.nuevo = false;
                      this.listarPlan();
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
                else{
                  this.showModal()
                  let obj ={
                    id_tutor: this.$store.state.usuario.id_usuario,
                    compromisos: this.compromisos,
                  }
                  this.axios.post('/planAccion/modificar/'+this.planAccion.id_plan_accion,obj)
                    .then(response=>{
                      response
                      this.hideModal();
                      Swal.fire({
                      text:"Actualizacion de Plan de Accion exitosa",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                      })
                      this.cambios = [];
                      this.eliminados = [];
                      this.compromisos = [];
                      this.arrBacklog = [];
                      this.arrInProgress = [];
                      this.arrTested = [];
                      this.arrDone = [];
                      this.nuevo = false;
                      this.listarPlan();
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
              }
              else{
                if(this.eliminados.length!=0){
                  this.showModal()
                  let obj ={
                    id_tutor: this.$store.state.usuario.id_usuario,
                    eliminados: this.eliminados,
                  }
                  this.axios.post('/planAccion/modificar/'+this.planAccion.id_plan_accion,obj)
                    .then(response=>{
                      response
                      this.hideModal();
                      Swal.fire({
                      text:"Actualizacion de Plan de Accion exitosa",
                      icon:"success",
                      confirmButtonText: 'OK',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
                      })
                      this.cambios = [];
                      this.eliminados = [];
                      this.compromisos = [];
                      this.arrBacklog = [];
                      this.arrInProgress = [];
                      this.arrTested = [];
                      this.arrDone = [];
                      this.nuevo = false;
                      this.listarPlan();
                    })
                    .catch(e=>{
                      console.log(e)
                      this.hideModal();
                    })
                }
                else{
                  Swal.fire({
                    text:"No ha realizado cambio alguno",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                }
              }
            }      
          }
          else{
            if(this.compromisos.length!=0){
              let obj ={
                id_tutor: this.$store.state.usuario.id_usuario,
                id_alumno: this.usr.id_usuario,
                nombre: this.nombre,
                descripcion: this.descripcion,
                compromisos: this.compromisos,
                cambios: this.cambios,
              }
              this.axios.post('/planAccion/insertar',obj)
                .then(response=>{
                  response
                  this.hideModal();
                  Swal.fire({
                  text:"Registro de Plan de Accion exitoso",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                  })
                  this.cambios = [];
                  this.eliminados = [];
                  this.compromisos = [];
                  this.arrBacklog = [];
                  this.arrInProgress = [];
                  this.arrTested = [];
                  this.arrDone = [];
                  this.nuevo = false;
                  this.listarPlan();
                })
                .catch(e=>{
                  console.log(e)
                  this.hideModal();
                })
            }
            else{
              Swal.fire({
                text:"No ha realizado cambio alguno",
                icon:"warning",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
              })
            }
            
          }
        }
      })
    },
    Eliminar(index,array){
      if(array == 1){
        this.planAccion.compromisos.forEach(element => {
          if(this.arrBacklog[index].name == element.nombre) this.eliminados.push({nombre: this.arrBacklog[index].name, estado: 'hac'})
        });
        this.arrBacklog.splice(index,1);
      }
      if(array == 2){
        this.planAccion.compromisos.forEach(element => {
          if(this.arrInProgress[index].name == element.nombre) this.eliminados.push({nombre: this.arrInProgress[index].name, estado: 'hac'})
        });
        this.arrInProgress.splice(index,1);
      }
      if(array == 3){
        this.planAccion.compromisos.forEach(element => {
          if(this.arrTested[index].name == element.nombre) this.eliminados.push({nombre: this.arrTested[index].name, estado: 'hac'})
        });
        this.arrTested.splice(index,1);
      }
      if(array == 4){
        this.planAccion.compromisos.forEach(element => {
          if(this.arrDone[index].name == element.nombre) this.eliminados.push({nombre: this.arrDone[index].name, estado: 'hac'})
        });
        this.arrDone.splice(index,1);
      }
    },
    Nuevo(){
      this.nuevo=true;
      this.arrBacklog = [];
      this.arrInProgress = []
      this.arrTested = []
      this.arrDone = []
      this.descripcion = ''
      this.nombre = ''
    },
    Elegir(){
      this.cambios = [];
      this.eliminados = [];
      this.compromisos = [];
      this.arrBacklog = [];
      this.arrInProgress = [];
      this.arrTested = [];
      this.arrDone = [];
      this.nuevo=false
      this.planAccion.compromisos.forEach(element => {
        if(element.estado == 'hac') this.arrBacklog.push({name: element.nombre})
        if(element.estado == 'pro') this.arrInProgress.push({name: element.nombre})
        if(element.estado == 'rev') this.arrTested.push({name: element.nombre})
        if(element.estado == 'hec') this.arrDone.push({name: element.nombre})
      });
    },
    TodoHecho(){
      Swal.fire({
        text: '¿Desea mover todo a Hecho?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0097A7',
        cancelButtonColor: '#757575',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result)=>{
        if(result.value){
          let arr = []
          this.arrBacklog.forEach(element => {
            arr.push({nombre: element.name})
          });
          this.arrInProgress.forEach(element => {
            arr.push({nombre: element.name})
          });
          this.arrTested.forEach(element => {
            arr.push({nombre: element.name})
          });
          this.arrBacklog = [];
          this.arrInProgress = [];
          this.arrTested = [];
          arr.forEach(element => {
            this.arrDone.push({name: element.nombre})
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

<style>
  .kanban-column{
    min-height: 300px;
    margin-top: 10%;
  }

  h3{
    color: rgb(0, 152, 146);
  }

  .list-group-item{
    border-top: 0.5px solid rgb(0, 152, 146);
    border-bottom: 0.5px solid rgb(0, 152, 146);
    border-left: 0.5px solid white;
    border-right: 0.5px solid white;
  }

  .redondo{
    border-radius: 10px;
    border:0.5px solid rgb(0, 152, 146)
  }

  .inp{
    padding-left: 15px;
    height: calc(1.5em + 0.75rem + 2px);
    margin-top:-1%;
  }

  .perso{
    border-radius: 1.25rem;
    border: 0.5px solid #757575;
  }
</style>