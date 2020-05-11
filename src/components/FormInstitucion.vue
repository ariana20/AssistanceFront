<template>
  <div class="FormInstitucion">
    <div class="container" style="left:15%;text-align: left">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left"><td>Nombre</td>   <td> <input type="text" v-model="nombre"></td></tr>
          <tr style="text-align:left"><td>Siglas</td>   <td> <input type="text" v-model="siglas"></td></tr>
          <tr style="text-align:left"><td>Direccion</td>   <td> <input type="text" v-model="direccion"></td></tr>
          <tr style="text-align:left"><td>Telefono</td>   <td> <input type="text" v-model="telefono"></td></tr>
        </td>
        <td style="width:662px">
          <tr style="text-align:left"><h3>Logo</h3></tr>
          <tr style="border-color: red"><img style="border: 2px solid black;margin-left:100px" alt="Vue logo" src="../assets/logo.png" ></tr>
          <tr style="height:40px"></tr>
          <tr >
            <td><button type="button" class="btn btn-info" style="margin-left:50px">Cargar</button></td>
            <td><button type="button" class="btn btn-secondary">Eliminar</button></td>
          </tr>
        </td>
      </tbody>
      </table>
    </div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <button type="button" style="margin-left:210px" class="btn btn-info" v-on:click="guardarInstitucion()">Guardar</button>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data(){
    return{
      nombre:null,
      siglas:null,
      direccion:null,
      telefono:null,
      logo:null,
    }
  },
  methods:{
    guardarInstitucion() {
      const params = {
        nombre: this.nombre,
        siglas: this.siglas,
        direccion: this.direccion,
        telefono: this.telefono,
        logo: this.logo,
      };

      Axios
        .post('http://127.0.0.1:8000/api/institucion',params)
          .then( response=>{
            console.log(response)
          });
    },
  }
}
</script>
