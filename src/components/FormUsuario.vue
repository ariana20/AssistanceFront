<template>
  <div class="FormUsuario">
    <div class="container" style="left:10%;text-align: left">
      <table>
      <tbody  align="left">
        <td style="width:1662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left" ><td>Codigo</td>  <td > <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="codigo"></td></tr>
          <tr style="text-align:left"><td>Nombre</td>   <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="nombre"></td></tr>
          <tr style="text-align:left"><td>Apellido Paterno</td>   <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="ap_paterno"></td></tr>
          <tr style="text-align:left"><td>Apellido Materno</td>   <td> <input   style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="ap_materno"></td></tr>
          
          <tr style="text-align:left"><td>Teléfono</td>   
          <td> <input  type="number"
          style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" v-model="telefono"></td></tr>
          <tr style="text-align:left"><td>Correo</td>   <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="correo"></td></tr>
        <!-- Combos box -->        
        <tr style="text-align:left"><td>Tipos de usuarios</td>   
          <select style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" v-model="tiposusuarios">
            <option v-for="options in arrayTU" v-bind:key="options.id_tipo_usuario">
             {{ options.nombre }}
             </option>
          </select>
        </tr>   
        </td>      
       
      </tbody>
      </table>
    </div>
    <br>
       <br>
        <br>
         <br>
       <td><button  type="button" style="margin-left:400px" class="btn btn-info" 
            v-on:click="guardarUsuario()">Guardar</button>
       <td><button type="button" class="btn btn-secondary" style="margin-left:20px"
            v-on:click="cancelarUsuario()" >Cancelar</button>
        </td>


  </div>
</template>

<script>
import Axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data(){
 
    return{
      id_usuario:null,
      codigo:"",
      nombre:"",
      ap_paterno:"",
      ap_materno:"",
      correo:"",
      telefono:"",
      arrayTU:[]

      
     
    }
  },
  created(){

    this.listarTUsuarios();
  },
  mounted(){
    // Axios.create({withCredentials: true })
    //   .post('/usuarios/listar').then( response =>{

    //       this.nombre= response.data.nombre;
    //       this.ap_paterno=response.data.ap_paterno;
    //       this.ap_materno=response.data.ap_materno;
    //       this.correo=response.data.correo;
    //       this.telefono=response.data.telefono;
    //     });
    
  },
  methods:{
    guardarUsuario() {
      const params = {
      //yo creo que primero analizo los ids
      nombre:this.nombre,
      ap_paterno:this.ap_paterno,
      ap_materno:this.ap_materno,
      correo:this.correo,
      telefono:this.telefono,
      password:"123456",
      // id_tipo_usuario:this.arrayTU.id_tipo_usuario,
      };

      Axios.create({withCredentials: true })
        .post('/usuarios/insertar',params)
          .then( response=>{
            console.log(response)
          });
    },
    listarTUsuarios() {
      Axios.create({withCredentials: true }).post('/tipoUsuarios/listarTodo')
        .then(res =>{
          // Ordenadito
          let par=res.data;
          this.arrayTU=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});

          console.log(res.data);
          
        })
        .catch(e => {
          console.log(e.response);
        })
    },
    cancelarUsuario(){
        Swal.fire({
              text:"¿Está seguro que desea cancelar?",
              icon:"warning",
              confirmButtonText: 'Sí',
              confirmButtonColor:'#0097A7',
              cancelButtonText: 'No',
              cancelButtonColor:'C4C4C4',
              showCancelButton: true,
              showConfirmButton: true,
        }).then((result) => {
            if (result.value) {
              //lo redirigo
              location.href="/ListaUsuarios";
            } 
          })
        
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