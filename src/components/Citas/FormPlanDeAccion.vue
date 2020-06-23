<template>
  <div class="container mt-5">
    <div v-if="anadirPlan==false">
      <b-button v-on:click="anadirPlan=true" style="background: #0097A7;border: 0px;width:100%;margin-left:1%">
        Añadir Plan De Accion
      </b-button>
    </div>
    <div v-else>
      <div class="row" style="margin-bottom:5%">
        <div class="col form-inline">
          <b-form-input v-model="newTask" placeholder="Ingresar Compromiso" @keyup.enter="add"/> 
          <b-button v-on:click="add" style="background: #0097A7;border: 0px;width:20%;margin-left:1%">
            Añadir
          </b-button>
        </div>
        <div class="col-md-2 offset-2">
          <b-button v-on:click="Guardar" style="background: #0097A7;border: 0px;width:100%;margin-left:1%">
            Guardar
          </b-button>
        </div>
      </div>

      <div class="row">

        <div class="col-md-3">
          <div class="p-2 redondo" style="background: rgb(0, 152, 146)">
            <h3> Por Hacer</h3>
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

        <div class="col-md-3">
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

        <div class="col-md-3">
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

        <div class="col-md-3">
          <div class="p-2 redondo" style="background: rgb(0, 152, 146)">
            <h3> Hechas</h3>
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
      tiposUsuario: null,
      planAccion:null,
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
        if(this.planAccion!=null) {
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
      if(this.planAccion!=null)
      {
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
</style>