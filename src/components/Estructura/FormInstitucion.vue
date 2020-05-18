<template>
  <div class="FormInstitucion">
    <div class="container" style="text-align: left;left:-100px">
      <table>
      <tbody>
        <td style="width:662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left"><td>Nombre</td>   <td> <input type="text" v-model="nombre"></td></tr>
          <tr style="text-align:left"><td>Siglas</td>   <td> <input type="text" v-model="siglas"></td></tr>
          <tr style="text-align:left"><td>Direccion</td>   <td> <input type="text" v-model="direccion"></td></tr>
          <tr style="text-align:left"><td>Telefono</td>   <td> <input type="text" v-model="telefono"></td></tr><br>
          <button type="button" style="margin-left:210px" class="btn btn-info" v-on:click="guardarInstitucion()">Guardar</button>
        </td>
        <td style="width:662px">
          <tr style="text-align:left"><h3>Logo</h3></tr>
          <tr style="border-color: red"><img style="border: 2px solid black;margin-left:100px" alt="Vue logo" src="@/assets/images/logo.png" ></tr>
          <tr style="height:40px"></tr>
          <tr >
            <td><button v-on:click="tipo()" type="button" class="btn btn-info" style="margin-left:135px">Cargar</button></td>
            <td><button type="button" class="btn btn-secondary" style="margin-left:-120px">Eliminar</button></td>
          </tr>
        </td>
      </tbody>
      </table>
    </div>


      

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      id:null,
      nombre:null,
      siglas:null,
      direccion:null,
      telefono:null,
      logo:'/',
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
        })
        .catch(e => {
          console.log(e.response);
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
          })
        .catch(e => {
          console.log(e.response);
        })
    },
    tipo(){
      const parame = {
        id_usuario: this.$store.state.usuario.id_usuario
      }
      console.log(this.$store.state.usuario.id_usuario)
      axios.post('/usuarios/tipoUsuario',parame)
      .then(response=>{  
        console.log(response.data);            
      }).catch( e=>console.log(e));
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