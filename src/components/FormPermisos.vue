<template>
  <div class="FormRoles" style="margin-top:20px">
    <div class="container" style="left:60px;text-align: left">
      <table style="width:100%">
            <tr style="text-align:left;height:70px">
                <th style="min-width:190px;font-size:25px">Tipo Usuario:</th>
                <th> 
                    <input v-if="idRol" type="text" class="form-control-plaintext" style="margin-left:40px;font-size:25px" :value="nombreRol" readonly>
                    <input v-else type="text" v-model="nombre" style="margin-left:40px">
                </th>
                <td> <b-button v-on:click="Guardar()" style="margin-left:500px;background: #0097A7">Guardar</b-button></td>
                <td> <b-button v-on:click="Regresar()" style="margin-left:20px;background: #CDCDCD">Cancelar</b-button></td>
            </tr>
      </table>
      <div class="col-md-12" style="border-bottom:3px solid #0097A7; "></div>
      <table class="table" v-for="(item, index) in $store.state.permisos" :key="index">
        <thead>
          <tr>
            <th scope="col"><strong>{{item.nombre}}</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(itemA, indexA) in item.permisos" :key="indexA">
            <td style="width:10px"><input v-on:click="cambio(itemA.nombre,$event)" v-if="permisosActuales.includes(itemA.nombre)" type="checkbox" class="form-check-input" :id="'exampleCheck'+indexA" checked>
            <input v-on:click="cambio(itemA.nombre,$event)" v-else type="checkbox" class="form-check-input" :id="'exampleCheck'+indexA">{{itemA.nombre}}</td>
            <td>{{itemA.descripcion}}</td>
          </tr>
        </tbody>
      </table>
    </div>

      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
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
  computed:{
        nombre:{
            get(){
                return this.$store.state.programasFilter.query;
            },
            set(val){
                this.$store.commit('SET_QUERY',val);
            }
        },
        ...mapGetters({
            programasFiltrados: 'filtrarProgramas'
        })
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
                this.$store.state.permisos = response.data;
            })
            .catch(e=>console.log(e));
    },

    Guardar(){
        if(this.idRol=== null || this.idRol === undefined) this.nombreRol = this.nombre;
        axios.post('tipoUsuarios/modPermisos',{nombre: this.nombreRol, cambios: this.cambios})
            .then(response=>{
                alert(response.data)
            })
            .catch(e=>console.log(e));
        this.$router.push('/tiposUsuario');
    },
    cambio(value,event) {
        console.log(event.target.checked);
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
