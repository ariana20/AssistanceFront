<template>
  <div class="FormRoles" style="margin-top:20px">
    <div class="container" style="left:60px;text-align: left">
      <table style="width:100%">
            <tr style="text-align:left">
                <td style="min-width:100px">Tipo Usuario:</td>
                <td> 
                    <input v-if="idRol" type="text" class="form-control-plaintext" style="margin-left:40px" :value="nombreRol" readonly>
                    <input v-else type="text" v-model="nombre" style="margin-left:40px">
                </td>
                <td> <b-button v-on:click="Guardar()" style="margin-left:600px;background: #0097A7">Guardar</b-button></td>
                <td> <b-button v-on:click="Regresar()" style="margin-left:20px;background: #CDCDCD">Cancelar</b-button></td>
            </tr>
            <tr style="text-align:left">
                <td style="width:100px">Buscar:</td>
                <td> <input type="text" style="margin-left:40px"></td>
            </tr>
      </table>
      <table class="table" v-for="(item, index) in $store.state.permisos" :key="index">
        <thead>
          <tr>
            <th scope="col"><strong>{{item.nombre}}</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(itemA, indexA) in item.permisos" :key="indexA">
            <td style="width:10px"><input v-on:click="cambio(itemA,$event)" v-if="permisosActuales.includes(itemA)" type="checkbox" class="form-check-input" :id="'exampleCheck'+indexA" checked>
            <input v-on:click="cambio(itemA,$event)" v-else type="checkbox" class="form-check-input" :id="'exampleCheck'+indexA"></td>
            <td >{{itemA}}</td>
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
