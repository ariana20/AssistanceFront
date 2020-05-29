<template>
  <div class="FormRoles">
    <div class="container" style="margin-left:100px;text-align: left">
      <div class="top-titulo">
            <h4 class="col-sm-4 title-container">Tipo Usuario: </h4>
            <input v-if="idRol" type="text" class="col-sm-6 form-control-plaintext" style="margin-top:25px;margin-left:-10%;font-size:25px;height:40px;width:65%" :value="nombreRol" readonly>
            <input v-else class="col-sm-6 form-control" style="top:26px;right:150px;" v-model="nombre" placeholder="Ingrese tipo de usuario">
            <div class="botones" style="display: inline-flex;margin-left: -30px;">
            <button type="button" class="btn btn-info" @click="Guardar()" >Guardar</button>
            <button type="button" class="btn btn-info" @click="Regresar()" style="border-color:gray;background-color:gray;">Cancelar</button>
            </div>
      </div>




      <!--<div style="width:100%">
            <div class="row" style="text-align:left;height:100px;margin-top:40px">
              <div class="row" style="text-align:left;height:40px;width:100%">
                <div class="row" style="margin-left:5%;width:50%">
                  <div class="font-weight-bolder text-left" style="font-size:30px">Tipo Usuario:</div> 
                  <input v-if="idRol" type="text" class="borde-textbox form-control-plaintext" style="margin-top:5px;margin-left:5%;font-size:25px;height:40px;width:65%" :value="nombreRol" readonly>
                  <input v-else type="text" class="inp borde-textbox" v-model="nombre" style="margin-left:10%">
                </div>
                <div class="row" style="margin-left:25%;width:20%">
                  <b-button v-on:click="Guardar()" style="height:40px;border-color:transparent;background: #0097A7">Guardar</b-button>
                  <b-button v-on:click="Regresar()" style="margin-left:4%;background: #CDCDCDs">Cancelar</b-button>
                </div>
              </div>
            </div>
      </div>-->



      <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
      <div v-for="(item, index) in $store.state.permisos" :key="index" style="width:100%;margin-bottom: 35px;">
        <div class="font-weight-bolder text-left" style="font-size:20px;margin-top:25px;margin-bottom: 25px;">
          {{item.nombre}}
        </div>
        <div class="row text-left" style="margin-left:5%;margin-top:10px;width:100%;text-align:left" v-for="(itemA, indexA) in item.permisos" :key="indexA">
          <input v-on:click="cambio(itemA.nombre,$event)" v-if="permisosActuales.includes(itemA.nombre)" type="checkbox" class="form-check-input" :id="'exampleCheck'+indexA" checked>
          <input v-on:click="cambio(itemA.nombre,$event)" v-else type="checkbox" class="form-check-input" :id="'exampleCheck'+indexA">
          <div class="row font-weight-light" style="margin-left:2%;font-size:20px;width:200px">
            {{itemA.nombre}}
          </div>
          <div class="row font-weight-light" style="margin-left:2%;font-size:20px">
            {{itemA.descripcion}}
          </div>
        </div>
      </div>
    </div>

      
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
        permisosActuales:[]
    }
  },
  created(){
    if(this.idRol) this.listarPermisosActuales();
    if(this.$store.state.permisos === null) this.listarPermisos();
  },
  methods:{
    
    listarPermisosActuales() {
        axios.post('tipoUsuarios/listarPermisos/'+this.idRol)
            .then(response=>{
                this.nombreRol = response.data.nombre;
                for (let index = 0; index < response.data.permisos.length; index++) {
                    this.permisosActuales.push(response.data.permisos[index].nombre);
                }
            })
            .catch(e=>console.log(e));
    },
    
    listarPermisos() {
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
                  if(mod.nombre == "Configuracion") break;              
                }
                delete this.$store.state.permisos[indexA];
                console.log(this.$store.state.permisos)
              }
            })
            .catch(e=>console.log(e));
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
            title: '¿Dese guardar esta configuración de '+this.nombre+'?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0097A7',
            cancelButtonColor: '#757575',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.value) {
              if(this.idRol=== null || this.idRol === undefined) this.nombreRol = this.nombre;
              axios.post('tipoUsuarios/modPermisos',{nombre: this.nombreRol, cambios: this.cambios,usuario_actualizacion: this.$store.state.usuario.id_usuario})
                  .then(response=>{
                    console.log(response)
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
                  .catch(e=>console.log(e));
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
    }
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