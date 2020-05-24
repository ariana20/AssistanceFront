<template>
  <div class="FormUsuario container">
    
    <div class="row top-titulo">
      <div class="row col-sm-4 tutoria-title" style="margin:20px">Código: 
        <input placeholder="Ingrese el código del usuario" class="col-sm-10 form-control" type="text" v-model="codigo">  </div>
      
      <!-- <h5 class="col-sm-4 tutoria-title">Tipo de usuario: </h5>
      <select class="col-sm-4 form-control"  style="left:40px;top:0px;" 
        v-model="arrTUsuarios"  >
               <option v-for="options in arrTUsuarios" 
                       v-bind:key="options.id_tipo_usuario">
                  {{ options.nombre }}
                </option>
      </select> -->
      <div  class="botones">
        
            <button type="button" style="margin:20px" class="btn btn-info"  v-on:click="guardarUsuario()">Guardar</button>
            <button type="button"  class="btn btn-info" style="border-color:gray;background-color:gray;margin:20px" v-on:click="cancelarUsuario()"  >Cancelar</button>
      </div>
    </div>

  <div>
      <table>
      <tbody  >
        <td style="width:1662px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left" ><td>Codigo:</td>  <td > <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="codigo"></td> 
          </tr>
          <tr style="text-align:left"><td>Nombre:</td>   <td> <input id="nombre"  style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="nombre"></td></tr>
           <tr style="text-align:left"><td>Apellidos:</td>   <td> <input id="ap" style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="apellidos"></td></tr>
          
          <tr style="text-align:left"><td>Teléfono:</td>   
          <td> <input  type="number"
          style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" v-model="telefono"></td></tr>
          <tr style="text-align:left"><td>Correo:</td>   <td> <input id="corr" style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="correo"></td></tr>
        <!-- Combos box -->        
        <tr style="text-align:left"><td>Tipos de usuarios:</td>   
          <select style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" v-model="arrTUsuarios">
            <option v-for="options in arrTUsuarios" v-bind:key="options.id_tipo_usuario">
             {{ options.nombre}}
             </option>
          </select>
        </tr>   
         
        <tr style="margin-left:100px">
          <td></td>
          <input type="checkbox" class="form-check-input" v-on:change="cambio($event)" checked>
          Activo
          </tr>    
       </td> 
      </tbody>
            </table>
            

    </div>
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
      // ap_paterno:"",
      // ap_materno:"",
      apellidos:"",
      correo:"",
      telefono:"",
      arrTUsuarios:null, //aqui estoy guardando los tipos de usuarios
      arrTU:null, 
      estado:"",
      id_usuario_entrante:parseInt((this.$route.path).substring(9,11),10),
     
    }
  },
  created(){
    
    
  
  },
  mounted(){
    this.listarTUsuarios();
    if(this.id_usuario_entrante!=0){
      console.log('Id usuario entrante: ');
      
      console.log(this.id_usuario_entrante);
     Axios.create({withCredentials: true })
       .post('/usuarios/listar/'+this.id_usuario_entrante).then( response =>{
          this.codigo=response.data.codigo;
           this.nombre= response.data.nombre;
          //  this.ap_paterno=response.data.ap_paterno;
          //  this.ap_materno=response.data.ap_materno;
           this.apellidos=response.data.apellidos;
           this.correo=response.data.correo;
           this.telefono=response.data.telefono;
         });
    }
  },
  methods:{
    
    guardarUsuario() {
      //console.log(this.codigo.trim().replace(/\s+/g, ' ')); //verificacion q borra todos los espacios
      //var   expresion=/\w+@\w+\.+[a-z]/;
      var   expresion2=/\w+@\w+\.+edu.pe/;
      // if(this.telefono =="" || this.nombre=="" ||this.ap_paterno=="" || this.ap_materno=="" || this.codigo=="" || this.correo=="" ){
      if(this.telefono =="" || this.nombre=="" ||this.apellidos=="" || this.codigo=="" || this.correo=="" ){
      
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
            
              text:"No ha escrito una dirección de correo válida. Todos los correos deben contener @pucp.edu.pe",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 
       
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
            codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            // ap_paterno:this.ap_paterno.trim().replace(/\s+/g, ' '),
            // ap_materno:this.ap_materno.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            correo:this.correo.trim(),
            telefono:this.telefono,
            password:"1234",
            estado:this.estado,
            //
      // id_tipo_usuario:this.arrayTU[id_tipo_usuario],      
            };
      const params2 = {
      
            codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            // ap_paterno:this.ap_paterno.trim().replace(/\s+/g, ' '),
            // ap_materno:this.ap_materno.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            estado:this.estado,
            telefono:this.telefono,
            
      // id_tipo_usuario:this.arrayTU.id_tipo_usuario,      
            };
             
          
          if(this.id_usuario_entrante==0){
            Axios.create()
            .post('/usuarios/insertar',params)
            .then( response=>{
            console.log(response)
            });
            Swal.fire({
              text:"Se guardaron los datos con éxito",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              }) 
          } 
          else if (this.id_usuario_entrante!=0){
            Axios.create({withCredentials: true })
            .post('/usuarios/modificar/'+this.id_usuario_entrante,params2)
            .then( response=>{
              console.log(response)
            })  .catch(e => {
                 console.log(e.response);
                 //
              });
            Swal.fire({
              text:"Se modificaron los datos con éxito",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              }) 
          }
          
      }
      
      
    },

    listarTUsuarios() {
      //taambién debería ser por programa
      Axios.create({withCredentials: true }).post('/tipoUsuarios/listarTodo')
        .then(res =>{
          // Ordenadito
          let par=res.data;
          this.arrTUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
          console.log(this.arrTUsuarios);        
          
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
              this.$router.push('/ListaUsuarios');
            } 
          })
        
    },
    cambio(event){
      console.log(event.target.checked);
      if (event.target.checked) this.estado = "act";
            else this.estado = "ina";

    },
    
    

    
  }

}


</script>

<style scoped>
.formUsuario { 
  font-size: 20px;
}
.form-control {
    border-radius: 1rem;  
    border: 2px solid #757575;
    text-align-last: right;
    margin-bottom:1.3em;
}
  body{
    background-image: null;
    background-color: #B2EBF2;
  }
  .form-control {
    border-radius: 1.25rem;  
    border: 2px solid #757575;
    margin-bottom: 10px;
    width: 100%;
    
}


</style>