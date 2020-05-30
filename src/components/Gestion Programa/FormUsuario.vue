<template>
  <div class="FormUsuario container">
    <div class="row grid-divider" style="margin-top:40px" >
      <div id="izquierdo" class="col-md-4">
        <table >
            <tbody >
            <td >
              <!-- onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 163) ||( event.charCode== 239) || (event.charCode== 130) || (event.charCod==144 ) || (event.charCod==181) || (event.charCod==214) || (event.charCod==233) || (event.charCod==224))"   -->
              <!-- onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 163) || event.charCode== 130 || event.charCod==144 ||event.charCod==181 || event.charCod==214 || event.charCod==233 || event.charCod==224)" -->
              <tr style="text-align:left"><td style="width:90px;">Codigo:*</td>   <td> <input class="form-control" type="text"       maxlength="8" v-model="codigo"></td></tr> 
              <tr style="text-align:left"><td style="width:90px;">Nombre:*</td>   <td> <input class="form-control" type="text"   onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 165) )"     v-model="nombre"></td></tr>
              <tr style="text-align:left"><td style="width:90px;">Apellidos:*</td>   <td> <input class="form-control" type="text"    onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)  )"   v-model="apellidos"></td></tr>
              <tr style="text-align:left"><td style="width:90px;">Celular:</td>   <td>   <input  type="text" class="form-control"  v-model="telefono"  value="" maxlength="9" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></td></tr>
              <tr style="text-align:left"><td style="width:90px;">Correo:*</td>   <td> <input id="corr" class="form-control"  type="text" v-model="correo"></td></tr>
              <tr style="text-align:left"><td style="width:90px;"></td></tr>
               
              <tr class="" style="bottom:0px;margin-left:0px;" > 
                <b-form-checkbox v-model="estado" value="act" unchecked-value="ina" > Activo</b-form-checkbox>
                </tr>
 
            </td> 
          </tbody>
        </table>
      </div>
      <div id="medio" class="col-md-2">
         <!-- <tr style="text-align:right;margin:600px"  ></tr> -->
        <!-- <tr style="text-align:right;margin:600px"  > </tr>   -->
              <!-- <div class="" style="padding:220px; bottom:0px;margin-left:40px;" > 
                <b-form-checkbox v-model="estado" value="act" unchecked-value="ina"> Activo</b-form-checkbox></div> -->
                

         
      </div>

      <div id="derecho" class="col-md-4">
       <tr style="text-align:left"><td style="width:150px;">Tipos de usuarios:</td>   
          <select v-model="tiposUsuariosselect" class="form-control" >
            <option value="no" hidden selected >Selecciona un tipo de usuario</option>
            <option   v-for="(tipoU,index) in tiposUsuarios" :value="tipoU.id_tipo_usuario" v-bind:key="index">
             {{ tipoU.nombre}}
             </option>
          </select>
          <!-- <tr style="text-align:left" v-if="this.tiposUsuariosselect === 4"><td>Tipo de tutoria:</td>  
            <select v-model="tipostutoriasselect" class="col-sm-10 form-control" >
            <option v-for="(tipotuto,index) in tipostutorias" :value="tipotuto.id_tipo_tutoria" v-bind:key="index">
             {{ tipotuto.nombre}}
             </option>             
          </select> -->
         
        </tr>
                 <!-- <div class="top-titulo" style="margin-bottom:20px;">
                    <div class="col-sm-3 motivo-dropdown-title">Motivo: </div>
                    <select class="col-sm-6 form-control" style="left:-40px;top:5px;" v-model="tipostutoriasselect">
                        <option selected disabled value="">Selecciona un motivo</option>
                        <option
                        v-for="(tt, i) in tipostutorias" 
                        :key="i" 
                        :value="tt.id_tipo">
                        {{ tt.nombre }}
                        </option>
                    </select>
                    <div class="botones">
                    <button type="button" 
                            class="btn btn-info" 
                            style="border-color:gray;background-color:gray;"
                            @click="addMotivos(i)">Seleccionar</button>
                    </div>
                </div> -->
      </div>
    </div>
    <div  class="botones" style="position:fixed;margin-top:120px;bottom:25px">   
        <button type="button" style="margin:5px;border-radius: 10px;" class="btn btn-info" id="btnGuardar" v-on:click="guardarUsuario()">Guardar</button>
        <button type="button"  class="btn btn-info" style="border-radius: 10px;border-color:gray;background-color:gray;margin:20px" v-on:click="cancelarUsuario()"  >Cancelar</button>  
      
     </div>
     <div style="position:fixed;margin-top:120px;bottom:25px">
      * Campos obligatorios   
     </div >
    </div>
</template>

<script>
import Axios from 'axios'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com';
export default {
  name: 'FormUsuario',
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
      estado:"act",
      id_usuario_entrante:parseInt((this.$route.path).substring(9,11),10),
      tiposUsuariosselect:"no",
      tipostutorias:"",
      tipostutoriasselect:null,
       miprog:this.$store.state.programaActual,
      usuario_entrante:this.$store.state.usuarioEscogido,
    }
  },

  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
     console.log('usuario entrante?: ',this.usuario_entrante);
    this.listarTUsuarios();
    this.listarTT();
    if(this.id_usuario_entrante!=0){
      console.log('Id usuario entrante: ');      
      console.log(this.id_usuario_entrante);
      this.tiposUsuariosselect=this.usuario_entrante.pivot.id_tipo_usuario;
     Axios.create()
       .post('/usuarios/listar/'+this.id_usuario_entrante).then( response =>{
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
                  this.$store.state.usuarios=null;
                   this.$router.push('/ListaUsuarios');          
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
            
              text:"No ha escrito una dirección de correo válida. Todos los correos deben contener ser dominio @pucp.edu.pe o @pucp.pe",
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
      else if(this.tiposUsuariosselect=="no"){
           Swal.fire({
              text:"Falta elegir un tipo de usuario",
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
            id_programaNuevo:this.miprog.id_programa,
            id_tipo_usuario:this.tiposUsuariosselect,  
            //ahora, si es tipo usuario 4 de tutor debe insertar el tipo de tutoria
            };
      const params2 = {
             codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            estado:this.estado,
            telefono:this.telefono,    
            // tengo que pasarle que modifique el tipo de rol, si el tutor id4 se modifica el tipo de tutoria
            id_tipo_usuario_Nuevo:this.tiposUsuariosselect, 
            id_programa:this.miprog.id_programa,
            };
             
          
          if(this.id_usuario_entrante==0){
            if(this.estado=="ina"){
                   
                Swal.fire({
              text:"No puede crear un nuevo usuario como inactivo.",
              icon:"warning",
              confirmButtonText: 'Sí',
              confirmButtonColor:'#0097A7',              
                  showConfirmButton: true,
                 });
              }
            
            else{
            Axios.create()
            .post('/usuarios/insertar',params)
            .then( response=>{

              console.log('Usuario insertado',response.data);  
              
              if(response.data["Error capturado:"]=="El codigo o correo ingresados ya existen"){
                console.log('Entro al if del error');

                 Swal.fire({
                    text:"Ha ingresado un correo que ya existe en la institución. Por favor, corriga los datos.",
                    icon:"warning",
                    confirmButtonText: 'Corregir',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });
              }
              else{
                  Swal.fire({
                    text:"Se guardaron los datos con éxito",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  }) 
                  //Enviar un correo
                  let direccion = "localhost:8000/login"
                emailjs.send(
                  "gmail",
                  "template_bV7OIjEW",
                  {
                  "nombre":response.data.user.nombre,
                  "mensaje":"Se te creó un nuevo usuario en el programa de tutoría Assistance. Ingresa con la contraseña: '12345' <br><br>Entra a este <a href="+direccion+">link</a> "+direccion,
                  "correo": response.data.user.correo
                  }, 'user_ySzIMrq3LRmXhtVkmpXAA')
                  .then((result) => {
                      console.log('SUCCESS!', result.status, result.text);
                  }, (error) => {
                      console.log('FAILED...', error);
                  });

              this.$store.state.usuarios=null;
              this.$router.push('/ListaUsuarios'); 
              }

            }).catch(e => {
              console.log('antes del if',e);
              console.log(e);
                 Swal.fire({
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Corregir',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });  
                  
                  this.$store.state.usuarios=null;
                  //  this.$router.push('/ListaUsuarios');         
                
                
               }
            );
          }

          }
          else if (this.id_usuario_entrante!=0){
            Axios.create()
            .post('/usuarios/modificar/'+this.id_usuario_entrante,params2)
            .then( response=>{
              console.log(response)
              Swal.fire({
              text:"Se modificaron los datos con éxito",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              }) 
              this.$store.state.usuarios=null;
              this.$router.push('/ListaUsuarios');
            })  .catch(e => {
                 console.log(e.response);
                 Swal.fire({
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                  // this.$store.state.usuarios=null;
                  // this.$router.push('/ListaUsuarios');
              });
            
          }
          
      }
      
      
    },

    listarTUsuarios() {
      //taambién debería ser por programa
      Axios.create().post('/tipoUsuarios/listarTodo')
        .then(res =>{
          // Ordenadito
          // let par=res.data;
          // this.tiposUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
          this.tiposUsuarios=res.data;
          //console.log(this.tiposUsuarios);        
          
        })
        .catch(e => {
          console.log(e.response);
          Swal.fire({
              text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
              icon:"warning",
              confirmButtonText: 'Sí',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }).then((result) => {
            if (result.value) {
              this.$store.state.usuarios=null;
              //lo redirigo
              this.$router.push('/ListaUsuarios');
            } 
          })

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
              this.$store.state.usuarios=null;
              this.$router.push('/ListaUsuarios');
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

body{
  background-image: null;
  background-color: #B2EBF2;
}
.form-control {
  border-radius: 1.25rem;  
  border: 0.5px solid #757575;
  margin-bottom: 10px;
  width: 200%;
}
td { 
  margin-bottom:10px;
}
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}

</style>