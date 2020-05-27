<template>
  <div class="FormUsuario container" style="margin-top:5px">
    <div style="margin-right:50px"></div>  
    <!-- </div>
    <div> -->
      <table>
      <tbody>
        <td >
        <tr style="text-align:left"><td>Codigo:</td>   <td> <input class=" form-control" type="text"       v-model="codigo"></td></tr>
        <tr style="text-align:left"><td>Nombre:</td>   <td> <input class="form-control" type="text"       v-model="nombre"></td></tr>
        <tr style="text-align:left"><td>Apellidos:</td>   <td> <input class="form-control" type="text"    v-model="apellidos"></td></tr>
        <tr style="text-align:left"><td>Celular:</td>   <td> <input class="form-control"  type="number"  v-model="telefono"></td></tr>
          <tr style="text-align:left"><td>Correo:</td>   <td> <input id="corr" class="form-control"  type="text" v-model="correo"></td></tr>

       
        <tr style="margin-left:100px"  >
          <div class="row col-sm-6 " style="margin-left:80px;" > 
            <b-form-checkbox v-model="estado" value="act" unchecked-value="ina"> Activo</b-form-checkbox></div>
            <!-- <div>{{estado}}</div> -->

          </tr>    
       </td> 
      </tbody>
      </table>
       <div  class="botones">   
            <button type="button" style="margin:5px" class="btn btn-info"  v-on:click="guardarUsuario()">Guardar</button>
            <button type="button"  class="btn btn-info" style="border-color:gray;background-color:gray;margin:20px" v-on:click="cancelarUsuario()"  >Cancelar</button>
         

    </div>
    </div>
  

</template>

<script>
import Axios from 'axios'
import Swal from 'sweetalert2'

export default {
  props:{
    id:String,
  },
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
      tiposUsuarios:"",
      estado:null,
      miprog:this.$store.state.programaActual,
      usuario_entrante:this.$store.state.usuarioEscogido,
    }
  },

  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
     console.log('usuario entrante?: ',this.usuario_entrante);
    this.listarTT();
    if(parseInt((this.id),10)!=0){
      console.log('Id usuario entrante: ');      
      console.log(parseInt((this.id),10));
     Axios.create()
       .post('/usuarios/listar/'+parseInt((this.id),10)).then( response =>{
         document.getElementById("corr").disabled = true;
         console.log('usuario listado para modificar',response);
          this.codigo=response.data.codigo;
           this.nombre= response.data.nombre;
           this.apellidos=response.data.apellidos;
           this.correo=response.data.correo;
           this.telefono=response.data.telefono;
           this.estado=response.data.estado;
         }).catch(e => {
                 console.log(e.response);
                 Swal.fire({
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  }); 
                   this.$router.push('/coordinadores');          
                } );

    }
  },
  methods:{
    
    guardarUsuario() {
      var   expresion2=/\w+@\w+\.+edu.pe/;
       var   expresion1=/\w+@\w+\.+pe/;
      // console.log('estado: ',this.estado);
      // if(this.estado==null) console.log('entro al if estado: ',this.estado);
      if(this.telefono =="" || this.nombre=="" ||this.apellidos=="" || this.codigo=="" || this.correo=="" || this.estado===null   ){
      
      //Cuando está vacio todo
          Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        })        
      }
      else if( !expresion2.test(this.correo) &&  !expresion1.test(this.correo)){ //Verificación de correo
          Swal.fire({
            
              text:"No ha escrito una dirección de correo válida. Todos los correos deben contener @pucp.edu.pe o @pucp.pe",
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
           codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            correo:this.correo.trim(),
            telefono:this.telefono,
            password:"1234",
            estado:this.estado,
            id_tipo_usuario:3,  
            //ahora, si es tipo usuario 4 de tutor debe insertar el tipo de tutoria

            };
      const params2 = {
      
            codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            estado:this.estado,
            telefono:this.telefono,  
            id_tipo_usuario:3,  
            // tengo que pasarle que modifique el tipo de rol, si el tutor id4 se modifica el tipo de tutoria
            };
             
          
          if(parseInt((this.id),10)==0){
            Axios.create()
            .post('/usuarios/insertar',params)
            .then( response=>{
                  console.log(response);
                  Swal.fire({
                    text:"Se guardaron los datos con éxito",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
              }) 
              this.$store.state.coordinadoresL = null;
              this.$router.push('/coordinadores'); 

            }).catch(e => {
                 console.log(e.response);
                 Swal.fire({
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });  
                   this.$router.push('/coordinadores');         
                } );
          }
          else if (parseInt((this.id),10)!=0){
            Axios.create()
            .post('/usuarios/modificar/'+parseInt((this.id),10),params2)
            .then( response=>{
              console.log(response)
              Swal.fire({
              text:"Se modificaron los datos con éxito",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              }) 
              this.$store.state.coordinadoresL = null;
              this.$router.push('/coordinadores');
            }) .catch(e => {
                console.log(e.response);
                this.$router.push('/coordinadores');
              });
            
          }
          
      }
      
      
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
              this.$router.push('/coordinadores');
            } 
          })
        
    },
    listarTT() {
      Axios.post('/TipoTutoria/listarTodo/'+ this.miprog.id_programa)
        .then(response=>{
            this.tipostutorias = response.data; //
            console.log('Tipos de tutorias: ',this.tipostutorias);
        })
        .catch(e=>console.log(e));
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
    width: 200%;
    
}


</style>