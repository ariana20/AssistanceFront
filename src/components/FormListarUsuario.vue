<template>
  <div class="FormListarUsuario">
    <div class="container">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <!-- <tr style="text-align:left"><td>Buscar</td>   <td> <input type="text" v-model="busqnombre"></td> -->
          
          <!-- <td >  -->
            <tr style="text-align:left" >
                <router-link to="/Usuario">
                  <button  type="button" class="btn btn-info">Añadir</button>
                </router-link></tr>
          
          <!-- </td> -->
          <!-- </tr> -->
        </td>
      </tbody>
      </table>
      <table class="table" style="text-align: left">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Codigo</th>
            <th scope="col">Tipo de Usuario </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usuarios"  :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.nombre}}</td>
            <td>{{item.correo}}</td>   
            <td v-for="e in TodosarrayTU" :key="e.id">
                    <span v-if="e.id_tipo_usuario == item.pivot.id_tipo_usuario">{{e.nombre}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data(){
    return{
      busqnombre:null,
      usuarios:[],
      //id_tipoXUsuario:[],
      cantU:null,
      TodosarrayTU:[],
      tipoXUsuario:[],
      
    }
  },
  created(){
    this.listarTUsuarios();
    this.listarUsuarios();
    
  },
  methods:{
    //4 es el id del programa de admin
    //1 es el id tipo usuario de admin
    //2 es el id de usuairo admin
     listarTUsuarios() {
      Axios.create({withCredentials: true }).post('/tipoUsuarios/listarTodo')
        .then(res =>{
          // Ordenadito
          let par=res.data;
          this.TodosarrayTU=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
          console.log(res.data);
          
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    listarUsuarios() {
      Axios.create({withCredentials: true }).post('/programa/usuarioPrograma/4') //Por ahora dsp será x program
        .then(res =>{
          console.log(res.data);
          
          this.usuarios=res.data;
          console.log(this.usuarios[1].pivot.id_tipo_usuario);
          console.log(this.TodosarrayTU[this.usuarios[1].pivot.id_tipo_usuario].nombre);
          
        })
        .catch(e => {
          console.log(e.response);
        })
    },
   
  }
}
</script>
