<template>
  <div class="container mt-5">
    <div v-if="anadirPlan==false">
      <b-button v-on:click="anadirPlan=true" style="background: #0097A7;border: 0px;width:100%;margin-left:1%">
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
          <div v-if="planAccion.compromisos!=undefined && this.nuevo==false">
            <select class= "form-control" style="color:gray;margin-top:-1%">
              <option selected disabled :value="null">Elige un Plan de Acción</option>
            </select>
          </div>
          <div v-else>
            <input class="borde-textbox inp" type="text" v-model="nombre" style="width:100%;margin-left:0px">
          </div>
        </div>
        <div class="col-12 col-md-3">
          <b-button v-if="this.nuevo==false" v-on:click="nuevo=true" style="background: #0097A7;border: 0px;margin-top:-0.9%">
            Añadir Nuevo
          </b-button>
          <b-button v-else v-on:click="nuevo=false" style="background: #0097A7;border: 0px;margin-top:-0.9%">
            Cancelar
          </b-button>
        </div>
      </div>
      <div class="row" style="margin-top:3%;text-align:left">
        <div class="col-12 col-md-2" style="margin-bottom:3%">
          <strong>Descripción:</strong>
        </div>
        <div class="col-12 col-md-7">
          <div v-if="planAccion.compromisos==undefined" style="margin-left:2%">
            {{this.planAccion.descripcion}}
          </div>
          <div v-else>
            <textarea  v-model="descripcion" class="perso inp" id="subject" name="subject" placeholder="Esriba la descripción del plan.." style="resize: none;padding-top:2%;height:100px;width:100%"/>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:3%;margin-bottom:1%;text-align:left">
        <div class="col-12 col-md-2">
          <strong>Añadir Compromisos</strong>
        </div>
      </div>
      <div class="row" style="margin-bottom:1%">
        <div class="col-12 col-md-3 form-inline">
          <b-form-input v-model="newTask" placeholder="Ingresar Compromiso" @keyup.enter="add" style="margin-left:0px"/>
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
      <div class="row" style="margin-top:2%">
        <div class="col-md-3 form-inline" style="font-size:150%;text-align:right">
          Completado
          <input type="checkbox" style="height:20px;width:30px;" v-model="completado" />
        </div>
      </div>

      <div class="row">

        <div class="col-md-3" style="margin-top:5%">
          <div class="p-2 redondo" style="background: rgb(0, 152, 146)">
            <h3> Pendiente</h3>
            <draggable class="list-group kanban-column" :list="arrBacklog" group="tasks">
              <div class="list-group-item" v-for="(element,index) in arrBacklog" :key="element.name">
                <div class="row">
                  <div class="col-8">
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
          <div class="p-2 redondo" style="background: rgb(0, 152, 146)">
            <h3> En Proceso</h3>
            <draggable class="list-group kanban-column" :list="arrInProgress" group="tasks">
              <div class="list-group-item" v-for="(element,index) in arrInProgress" :key="element.name">
                <div class="row">
                  <div class="col-8">
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
          <div class="p-2 redondo" style="background: rgb(0, 152, 146)">
            <h3> Por Revisar</h3>
            <draggable class="list-group kanban-column" :list="arrTested" group="tasks">
              <div class="list-group-item" v-for="(element,index) in arrTested" :key="element.name">
                <div class="row">
                  <div class="col-8">
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
          <div class="p-2 redondo" style="background: rgb(0, 152, 146)">
            <h3> Hecho</h3>
            <draggable class="list-group kanban-column" :list="arrDone" group="tasks">
              <div class="list-group-item" v-for="(element,index) in arrDone" :key="element.name">
                <div class="row">
                  <div class="col-8">
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
    this.showModal();
    let obj = {
      id_alumno: this.usr.id_usuario,
      id_tutor: this.$store.state.usuario.id_usuario

    }
    this.axios.post('/planAccion/planAlumno',obj)
      .then(response=>{
        this.planAccion = response.data
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
  methods:{
    add(){
      if(this.newTask){
        this.arrBacklog.push({name: this.newTask})
        this.newTask=""
      }
    },
    Guardar(){
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
      if(this.planAccion.compromisos!=null){
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
          this.showModal();
          if(this.compromisos.length != 0){
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
              })
              .catch(e=>{
                console.log(e)
                this.hideModal();
              })
          }
          else{
            let obj ={
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
              })
              .catch(e=>{
                console.log(e)
                this.hideModal();
              })
          }
          this.cambios = [];
        }
        else{
          if(this.compromisos.length != 0){
            this.showModal();
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
              })
              .catch(e=>{
                this.hideModal();
                console.log(e)
              })
          }
          else{
            if(this.eliminados.length != 0){
              this.showModal();
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
                })
                .catch(e=>{
                  this.hideModal();
                  console.log(e)
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
            nombre: this.$store.state.usuario.nombre + " " + this.$store.state.usuario.apellidos + " - " + this.usr.nombre + " " + this.usr.apellidos,
            descripcion: "Plan de Accion",
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
  }

  h3{
    color: white;
  }

  .list-group-item{
    background: skyblue;
    color: #757575 !important;
  }

  .redondo{
    border-radius: 10px;
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