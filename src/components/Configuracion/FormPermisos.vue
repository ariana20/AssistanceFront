<template>
  <div class="FormRoles">
    <div style="text-align: left;margin-left:5%">
      <div class="row">
        <div class="col-11 col-sm-4 col-lg-2">
          <h4 style="margin-top:1%">Tipo Usuario: </h4>
        </div>
        <div class="col-11 col-md-6 col-lg-3">
          <input v-if="idRol" type="text" class="form-control-plaintext" style="font-size:25px;height:40px;width:65%" :value="nombreRol" readonly>
          <input v-else class="form-control" style="top:5%" v-model="nombre" placeholder="Ingrese un nombre">
        </div>
        <div class="col-11 col-sm-12 col-lg-3 offset-lg-4">
          <div class="botones" style="display: inline-flex;">
            <button type="button" class="btn btn-info" @click="Guardar()" >Guardar</button>
            <button type="button" class="btn btn-info" @click="Regresar()" style="border-color:gray;background-color:gray;">Cancelar</button>
          </div>
        </div>
      </div>

      <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
      <div v-for="(item, index) in $store.state.permisos" :key="index" style="width:100%;margin-bottom: 35px;">
        <div class="font-weight-bolder text-left" style="font-size:20px;margin-top:25px;margin-bottom: 25px;">
          {{item.nombre}}
        </div>
        <div class="row text-left" style="margin-left:5%;margin-top:10px;width:90%;text-align:left" v-for="(itemA, indexA) in item.permisos" :key="indexA">
          <input v-on:click="cambio(itemA.nombre,$event)" v-if="permisosActuales.includes(itemA.nombre)" type="checkbox"  :id="'exampleCheck'+indexA" checked>
          <input v-on:click="cambio(itemA.nombre,$event)" v-else type="checkbox" :id="'exampleCheck'+indexA">
          <div class="row font-weight-light" style="margin-left:2%;font-size:20px;width:200px">
            {{itemA.nombre}}
          </div>
          <div class="col-11 font-weight-light" style="margin-left:2%;font-size:20px">
            {{itemA.descripcion}}
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
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  props: {
      idRol: String,
  },
  data(){
    return{
        nombreRol:null,
        cambios:[],
        permisosActuales:[],
        nombre:null,
    }
  },
  created(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    if(this.idRol) {
      this.showModal()
      this.listarPermisosActuales();
    }
    if(this.$store.state.permisos === null) {
      this.showModal()
      this.listarPermisos();
    }
  },
  methods:{
    
    listarPermisosActuales() {
      this.showModal()
      axios.post('tipoUsuarios/listarPermisos/'+this.idRol)
        .then(response=>{
          this.nombreRol = response.data.nombre;
          for (let index = 0; index < response.data.permisos.length; index++) {
            this.permisosActuales.push(response.data.permisos[index].nombre);
          }
          this.hideModal()
        })
        .catch(e=>{
          console.log(e)
          this.showModal()
        });
    },
    
    listarPermisos() {
      this.showModal()
      axios.post('ModuloPermiso/listarTodoPermisos')
        .then(response=>{
          if(this.$store.state.tipoActual.nombre == 'Admin'){
            this.$store.state.permisos = response.data;
          }
          else{
            this.$store.state.permisos = response.data;
            let indexA;
            for (let mod in this.$store.state.permisos) {
              indexA = mod;
              if(this.$store.state.permisos[mod].nombre == "Configuracion") break;              
            }
            delete this.$store.state.permisos[indexA];
          }
          this.hideModal()
        })
        .catch(e=>{
          console.log(e)
          this.hideModal()
        });
    },

    Guardar(){
      let nomVal =this.nombreRol=='' || this.nombreRol == null;
      let cambiosVal = this.cambios.length==0 || this.cambios == null;
      if(nomVal && (this.nombre=="" || this.nombre==null)){
        Swal.fire({
          text:"No ha completado el nombre",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        })   
      }
      else{
        if(cambiosVal){
          Swal.fire({
            text:"No ha realizado cambios",
            icon:"error",
            confirmButtonText: 'OK',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
          }) 
        }    
        else{
          if(this.nombreRol!=null) this.nombre = this.nombreRol;
          Swal.fire({
            title: '¿Desea guardar esta configuración de '+this.nombre+'?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0097A7',
            cancelButtonColor: '#757575',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.value) {
              let prog;
              if(this.$store.state.tipoActual.nombre == 'Admin'){
                prog = 1;
              }
              else{
                prog = this.$store.state.programaActual.id_programa
              }
              this.showModal();
              if(this.idRol=== null || this.idRol === undefined) this.nombreRol = this.nombre;
              axios.post('tipoUsuarios/modPermisos',{nombre: this.nombreRol, cambios: this.cambios,usuario_actualizacion: this.$store.state.usuario.id_usuario, id_programa: prog})
                .then(response=>{
                  response
                  this.hideModal();
                  Swal.fire({
                    text:"Guardado Exitosa",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                  this.$store.state.roles = null;
                  this.$router.push('/tiposUsuario');
                })
                .catch(e=>{
                  console.log(e)
                  this.hideModal();
                  });
            }
          })
        } 
      }
    },
    cambio(value,event) {
        let index = this.cambios.findIndex(element => element.nombre === value)
        if( index !== -1){
            if (event.target.checked) this.cambios[index].estado = 'activo';
            else this.cambios[index].estado = 'inactivo';
        }
        else{
            if (event.target.checked) this.cambios.push({nombre: value, estado: 'activo'});
            else this.cambios.push({nombre: value, estado: 'inactivo'});
        }
    },
    Regresar(){
        this.$router.push('/tiposUsuario');
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
  .inp{
    margin-left:50px;
    width:300px;
    padding-left: 15px;
  }
  
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