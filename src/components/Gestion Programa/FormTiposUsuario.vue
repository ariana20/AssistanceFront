<template>
	<div class="formUsuario container" style="margin-top:2em;">
    <div class="row">
      <div class="col-md-4 col-sm-4" style="text-align: left">
        <div class="title-field">Codigo</div>
        <div class="title-field">Nombre</div>
        <div class="title-field">Apellidos</div>
        <div class="title-field">Teléfono</div>
        <div class="title-field">Correo</div>
        <div class="title-field">Tipos de usuarios</div>
        <div class="title-field"><input type="checkbox" class="form-check-input" height="20px" v-on:change="cambio($event)" checked>
          <span style="display:inline-block;margin-left:40px;">ACTIVO</span>
        </div>
      </div>
      <div class="col-md-4 col-sm-6">
        <input id="codigo" class="row form-control" type="text" v-model="codigo">
        <input id="nombre" class="row form-control" type="text" v-model="nombre">
        <input id="apellidos" class="row form-control" type="text" v-model="apellidos">
        <input id="telefono" class="row form-control" type="number" v-model="telefono">
        <input id="correo" class="row form-control" type="text" v-model="correo">
        <select v-model="arrTUsuarios" class="row form-control">
          <option v-for="options in arrTUsuarios" v-bind:key="options.id_tipo_usuario">
            {{ options.nombre}}
          </option>
        </select>
      </div>
      <div class="col-md-4 col-sm-12" style="text-align:rigth">
      <div>FOTO</div>
      <span @mouseover="hover = true"
           @mouseleave="hover = false">gaaa
           <img v-if="hover" class="foto-side item" src='http://es.web.img3.acsta.net/c_215_290/pictures/18/01/18/16/02/1109391.jpg' 
           heigth="200px" width="200px" style="border-radius:4em"/>
      </span>
    </div>
    </div>
    <button class="btn btn-info" @click="guardarUsuario()">Guardar</button>
			<button class="btn btn-secondary" @click="cancelarUsuario()">Cancelar</button> 
	</div>
</template>

<script>
import Axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'formUsuario',
  data(){
 
    return{
      hover:false,
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
    
    this.listarTUsuarios();
  
  },
  mounted(){
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
            Axios.create({withCredentials: true })
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
              location.href="/ListaUsuarios";
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
.item {
  background: blue;
}
.active {
  background: green;
}
.item:hover {
  z-index: 10000;
}
.formUsuario { 
  font-size: 20px;
}
.form-control {
    border-radius: 1rem;  
    border: 2px solid #757575;
    text-align-last: right;
    margin-bottom:1.3em;

}
.col-md-4{ 
  overflow:hidden; 
}
.title-field {
  padding: 6px 12px;
  margin: 0px 15px;
  display:flex;
  margin-bottom:1em;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
    font-size: 20px;
}
</style>