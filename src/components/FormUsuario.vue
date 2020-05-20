<template>
  <div class="FormUsuario">
    <div class="container" style="left:10%;text-align: left">
     
      <table>
      <tbody  align="left">
        <td style="width:1662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left" ><td>Codigo</td>  <td > <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="codigo"></td></tr>
          <tr style="text-align:left"><td>Nombre</td>   <td> <input id="nombre"  style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="nombre"></td></tr>
          <tr style="text-align:left"><td>Apellido Paterno</td>   <td> <input id="apP" style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="ap_paterno"></td></tr>
          <tr style="text-align:left"><td>Apellido Materno</td>   <td> <input id="apM"    style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="ap_materno"></td></tr>
          
          <tr style="text-align:left"><td>Teléfono</td>   
          <td> <input  type="number"
          style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" v-model="telefono"></td></tr>
          <tr style="text-align:left"><td>Correo</td>   <td> <input id="corr" style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="correo"></td></tr>
        <!-- Combos box -->        
        <tr style="text-align:left"><td>Tipos de usuarios</td>   
          <select style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" v-model="arrTUsuarios">
            <option v-for="options in arrTUsuarios" v-bind:key="options.id_tipo_usuario">
             {{ options.nombre}}
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
      arrTUsuarios:[],
      arrTU:"",

      
     
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
      
      var   expresion=/\w+@\w+\.+[a-z]/;
      var   expresion2=/\w+@\w+\.+pe/;
      if(this.telefono =="" || this.nombre=="" ||this.ap_paterno=="" || this.ap_materno=="" || this.codigo=="" || this.correo=="" ){
          //Cuando está vacio todo
          Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        })        
      }
      else if( !expresion2.test(this.correo)){ //Verificación de correo
          Swal.fire({
            
              text:"No ha escrito una dirección de correo válida",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 
       if(!expresion.test(this.correo)) {
          Swal.fire({
            
              text:"entra al tonto if",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 
       }
      }
      else if(this.telefono<10000000){ //Esto será válido?
     
          Swal.fire({
              text:"No ha colocado un número de teléfono válido. Mínimo 7 dígitos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
          })   
      }
      else{//está bien y envío
      const params = {
      //yo creo que primero analizo los ids
            //codigo:this.codigo, //todabia no esta
            nombre:this.nombre,
            ap_paterno:this.ap_paterno,
            ap_materno:this.ap_materno,
            correo:this.correo,
            telefono:this.telefono,
            password:"123456",
      // id_tipo_usuario:this.arrayTU.id_tipo_usuario,      
            };
             Swal.fire({
              text:"Se guardaron los datos con éxito",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
          })  
          Axios.create({withCredentials: true })
        .post('/usuarios/insertar',params)
          .then( response=>{
            console.log(response)
          });
      }
      
      
    },

    listarTUsuarios() {
      Axios.create({withCredentials: true }).post('/tipoUsuarios/listarTodo')
        .then(res =>{
          // Ordenadito
          let par=res.data;
          this.arrTUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
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