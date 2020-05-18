<template>
  <div class="FormListarUsuario">
    <div class="container">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left"><td>Buscar</td>   <td> <input type="text" v-model="busqnombre"></td>
          <td >  <router-link to="/Usuario">
                  <button  type="button" style="margin-left:800px" class="btn btn-info">Añadir</button>
                </router-link>
          
          </td>
          </tr>
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
            <td>{{item.nom_tipoUsuario}}</td>
            <!-- <td>{{this.tipoXUsuario[index]}}</td> -->
            <!-- <tr v-for="(item, ind) in tipoXUsuario"  :key="ind">
                <td>{{item}}</td> -->
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
      tipoXUsuario:[]
      
    }
  },
  created(){
    this.listarTUsuarios();
    this.listarUsuarios();
    
  },
  methods:{
    
    listarUsuarios() {
      Axios.create({withCredentials: true }).post('/usuarios/listarTodo') //Por ahora dsp será x program
        .then(res =>{
          console.log(res.data);
          this.usuarios=res.data;
          // (this.usuarios).prototype.nom_tipoUsuario;
          // var cantU=this.usuarios.length;
          // var id_tipoXUsuario="";
          // for (let i = 0; i <cantU; i++) {    
          //  id_tipoXUsuario=this.usuarios[i].id_tipo_usuario;

          //  this.usuarios[i].nom_tipoUsuario=this.TodosarrayTU[id_tipoXUsuario].nombre;

          //   }
        })
        .catch(e => {
          console.log(e.response);
        })
    },
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
  }
}
</script>
