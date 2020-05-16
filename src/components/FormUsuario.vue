<template>
  <div class="FormInstitucion">
    <div class="container" style="text-align: left;left:-100px">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left"><td>Codigo</td>  <td > <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="codigo"></td></tr>
          <tr style="text-align:left"><div style="margin-top:20px"/></tr>
          <tr style="text-align:left"><td>Nombre</td>   <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="nombre"></td></tr>
          <tr style="text-align:left"><div style="margin-top:20px"/></tr>
          <tr style="text-align:left"><td>Apellido Paterno</td>   <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="ap_paterno"></td></tr>
          <tr style="text-align:left"><div style="margin-top:20px"/></tr>
          <tr style="text-align:left"><td>Apellido Materno</td>   <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="ap_materno"></td></tr>
          
          <tr style="text-align:left"><div style="margin-top:20px"/></tr>
          <tr style="text-align:left"><td>Telefono</td>   <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="telefono"></td></tr>
          <tr style="text-align:left"><div style="margin-top:20px"/></tr>
          <tr style="text-align:left"><td>Correo</td>   <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="correo"></td></tr>
        <!-- Combo box -->
        </td>       
       
      </tbody>
      </table>
    </div>
       <br>
      <br>
       <td><button type="button" style="margin-left:-50px" class="btn btn-info" 
            v-on:click="guardarUsuario()">Guardar</button>
       <td><button type="button" class="btn btn-secondary" style="margin-left:-120px">Eliminar</button></td>

      
     
      <br>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      id_usuario:null,
      nombre:"",
      ap_paterno:"",
      ap_materno:"",
      correo:"",
      telefono:"",
      


    }
  },
  mounted(){
    axios.create({withCredentials: true })
      .post('/institucion/listarTodo')
        .then( response=>{
          this.id = response.data[0].id_institucion;
          this.nombre = response.data[0].nombre;
          this.direccion = response.data[0].direccion;
          this.telefono = response.data[0].telefono;
          this.siglas = response.data[0].siglas;
          this.logo = response.data[0].logo;
        });
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

      axios.create({withCredentials: true })
        .post('/institucion/modificar/'+this.id,params)
          .then( response=>{
            console.log(response)
          });
    },
  }
}
</script>
<style scoped>

  body{
    background-image: null;
    background-color: #B2EBF2;
  }
</style>