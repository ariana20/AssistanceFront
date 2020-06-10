<template>
  <div class="FormUsuario container">
    <div class="row grid-divider" style="margin-top:40px" >
      <div id="izquierdo" class="col-md-4">
        <table >
            <tbody >
            <td >
              <!-- onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 163) ||( event.charCode== 239) || (event.charCode== 130) || (event.charCod==144 ) || (event.charCod==181) || (event.charCod==214) || (event.charCod==233) || (event.charCod==224))"   -->
              <!-- onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 163) || event.charCode== 130 || event.charCod==144 ||event.charCod==181 || event.charCod==214 || event.charCod==233 || event.charCod==224)" -->
              <tr style="text-align:left"><td style="width:90px;">Codigo:*</td>   <td> <input class="form-control" type="text"   id="cod"    maxlength="8" v-model="codigo"></td></tr> 
              <tr style="text-align:left"><td style="width:90px;">Nombre:*</td>   <td> <input class="form-control" type="text"    maxlength="100"   v-model="nombre"></td></tr>
              <tr style="text-align:left"><td style="width:90px;">Apellidos:*</td>   <td> <input class="form-control" type="text"    maxlength="100"   v-model="apellidos"></td></tr>
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
        <!-- no borrar, no sé por qué no puedo cambiarlo -->
         <!-- <tr style="text-align:right;margin:600px"  ></tr> -->
        <!-- <tr style="text-align:right;margin:600px"  > </tr>   -->
              <!-- <div class="" style="padding:220px; bottom:0px;margin-left:40px;" > 
                <b-form-checkbox v-model="estado" value="act" unchecked-value="ina"> Activo</b-form-checkbox></div> -->
      </div>

      <div id="derecho" class="col-md-4">
       <tr style="text-align:left"><td style="width:150px;">Tipos de usuarios:*</td>   
          <select v-model="tiposUsuariosselect" class="form-control" @click="listarTT()" >
            <option value="no" hidden selected >Selecciona un tipo de usuario</option>
            <option   v-for="(tipoU,index) in tiposUsuarios" :value="tipoU.id_tipo_usuario" v-bind:key="index" >
             {{ tipoU.nombre}}
             </option>
          </select>

        </tr>
          <div class="top-titulo" style="margin-bottom:20px;" >
                    <div class="col-sm-6" v-if="this.tiposUsuariosselect === 4" style="margin-left:-25px;">Tipos de tutorias:*     </div>
                    <select v-if="this.tiposUsuariosselect === 4" class="col-sm-6 form-control"  style="margin-left:8px;top:5px;"
                     v-model="tipostutoriasselect">
                        <option selected disabled value="no">Selecciona un tipo de tutoria</option>
                        <option v-for="(tt, i) in tipostutorias"  :key="i"   :value="tt.id_tipo_tutoria">
                        {{ tt.nombre }}
                        </option>
                    </select>
                    <div class="botones" v-if="this.tiposUsuariosselect === 4">
                    <button type="button"   class="btn btn-info"   
                  
                    style="margin-left:100px"
                            @click="addMTT(i)">Seleccionar</button>
                    </div>
                    <div class="col-sm-6 " v-if="this.tiposUsuariosselect === 5" style="margin-left:-40px;">Condición del alumno:* </div>
                    <select v-if="this.tiposUsuariosselect === 5" class="col-sm-6 form-control"  style="margin-right:20px;margin-left:-10px;top:5px;"
                     v-model="tipostutoriasselect">  <!--cambiar esto-->
                        <option selected disabled value="no">Selecciona una condición</option>
                        <option v-for="(condi, i) in condiAlumnos"  :key="i"   >
                        {{ condi.nombre }} 
                        <!-- podría no ser nombre -->
                        </option>
                    </select>
                   


          </div>
                 <div class="left-content" v-if="this.tiposUsuariosselect === 4" >
                    <h6 style="color:black;font-weight:900;text-align:left;" v-if="this.tiposUsuariosselect === 4">Tipos de tutoria seleccionados</h6>
                    <hr>
                    <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
                        <div v-if="listTT.length == 0">No tiene tipos de tutorias seleccionados</div>
                        <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                            v-for="(newTT,ttIndex) in listTT"  
                            :key="ttIndex">
                            {{newTT}}
                            <span name="remove" class="close" @click="deleteTT(ttIndex)" style="margin-right : 20px;float:right;">&times;</span>           
                        </li>
                    </ul>
                    </div>

      </div>
    </div>
    <div  class="botones" style="position:fixed;margin-top:120px;bottom:25px">   
        <button type="button" style="margin:5px;border-radius: 10px;" class="btn btn-info" id="btnGuardar" v-on:click="guardarUsuario()">Guardar</button>
        <button type="button"  class="btn btn-info" style="border-radius: 10px;border-color:gray;background-color:gray;margin:20px" v-on:click="cancelarUsuario()"  >Cancelar</button>  
      
     </div>
    <!-- <div> -->
       <!-- para mostrar la lista de tt que escoge  -->
      <!-- <li         v-for="(newTT,ttIndex) in listTTId" :key="ttIndex" >
      {{newTT}}
     </li>
     </div> -->
     <div style="position:fixed;margin-top:120px;bottom:25px">
      * Campos obligatorios   
     </div >
     <!-- para mostrar la lista de tt que no escoge  -->
     <!-- <li         v-for="(newTT,ttIndex) in tipostutorias" :key="ttIndex" >
      {{newTT.id_tipo_tutoria}}  {{newTT.nombre}}
     </li> -->

     <!-- <b-modal ref="my-modal" style="margin-left:20%" size="sm" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="color:#0097A7;margin-left:25%" class="sb-1 d-flex">
        Loading... <b-spinner style="margin-left:15px"/>
      </div>
    </b-modal> -->
     
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
      id_usuario_entrante:"",
      //id_usuario_entrante:this.$store.state.usuarioEscogido.id_usuario,
      tiposUsuariosselect:"no",
      tipostutorias:"",
      tipostutoriasselect:"no",
       miprog:this.$store.state.programaActual,
      //usuario_entrante:this.$store.state.usuarioEscogido,
      usuario_entrante:null,
      listTT:[],
      newTT:null,
      listTTId:[],
      listTTnoID:[],
      listTTBorrados:[],
      condiAlumnos:[],
      banderaTT:false,
    }
  },

  mounted(){
    // this.showModal();
    // this.hideModal();
    if(this.$store.state.usuario==null) this.$router.push('/login');
    //  console.log('usuario entrante?: ',this.usuario_entrante);
    
    this.listarTUsuarios();    
    console.log("numero del path",parseInt((this.$route.path).substring(9,11),10));
    if(parseInt((this.$route.path).substring(9,11),10) ==0){
      this.id_usuario_entrante=0;
      //no hay usuario entrante
    }
    else if (parseInt((this.$route.path).substring(9,11),10) !=0) {
      this.listarTT();
      this.id_usuario_entrante=this.$store.state.usuarioEscogido.id_usuario;
      this.usuario_entrante=this.$store.state.usuarioEscogido;
      console.log('Id usuario entrante: ');      
      console.log(this.id_usuario_entrante);
      this.tiposUsuariosselect=this.usuario_entrante.pivot.id_tipo_usuario;
      
      Axios.create()
       .post('/usuarios/listar/'+this.id_usuario_entrante).then( response =>{
         document.getElementById("corr").disabled = true;
          // document.getElementById("cod").disabled = true;
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
                    text:"Estamos teniendo problemas al obtener los datos del usuario que desea modificar. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  }); 
                  this.$store.state.usuarios=null;
                   //this.$router.push('/ListaUsuarios');          
                } );

    }
    //Primero verifico que el usuario pertenece a mi programa
    //Si el tipo de usuario es tutor, cargo sus tipos de tutoras
    
    
  },
  methods:{
    
    guardarUsuario() {
      var   expresion2=/\w+@\w+\.+edu.pe/;
       var   expresion1=/\w+@\w+\.+pe/;
      // console.log('estado: ',this.estado);
      // if(this.estado==null) console.log('entro al if estado: ',this.estado);
      if(this.nombre=="" ||this.apellidos=="" || this.codigo=="" || this.correo=="" || this.estado===null   ){
      
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
      else if(this.telefono<10000000 && this.telefono>0){ //Esto será válido?
     
          Swal.fire({
              text:"No ha colocado un número de teléfono válido. Mínimo 7 dígitos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
          })   
      }
      else if(this.tiposUsuariosselect=="no" || this.tiposUsuariosselect.length==0 ){
           Swal.fire({
              text:"Falta elegir un tipo de usuario",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
          })  
      }
      //Si escogió el tipo de usuario tutor
      else if( this.tiposUsuariosselect==4 && ( this.listTTId.length==0 || this.tipostutoriasselect=="no"   ) ){
         //evito que deje en 0 los tipos de tutoria al que pertenece el tutor
         Swal.fire({
              text:"Falta elegir un tipo de tutoria",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
          })
      }
      else{//está bien y envío
      
      
      const params = {
        //Parametros insertar de usuario
           codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            correo:this.correo.trim(),
            telefono:this.telefono,
            password:"12345",
            estado:this.estado,
            id_programaNuevo:this.miprog.id_programa,
            id_tipo_usuario:this.tiposUsuariosselect,  
            //ahora, si es tipo usuario 4 de tutor debe insertar el tipo de tutoria
            };
      const params2 = {
        //Parametros modificados de usuario
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

                console.log('Usuario insertado: ',response.data);  
                if(response.data["Error capturado:"]=="El codigo o correo ingresados ya existen"){
                  console.log('Entro al if del error');
                  console.log('codigo:', params.codigo);
                  console.log('correo:', params.correo);
                   Swal.fire({
                    text:"Ha ingresado un correo o código que ya existe en la institución. Por favor, corriga los datos.",
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
                  //Como se guardaron con éxito ahora agrego el titutoria
                  var idusuarionuevo=response.data["user"].id_usuario;
                  console.log('id del usuario nuevo: ',response.data["user"].id_usuario);
                  this.actualizarTT(idusuarionuevo);
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
              this.$store.state.usuarioEscogido=null;//
              this.$store.state.usuarios=null;
             
              //this.$router.push('/ListaUsuarios'); //ahora va a estar en el actualizarTT
              }

            }).catch(e => {
              console.log('antes del if',e);
              console.log(e);
                 Swal.fire({
                    text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
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
              
              console.log(response); //si hay error de =igual codigo salta excepcion
              console.log('data: ',response.data);
              // console.log('data: ',response.data.substring(0,20)); //Saltará error?
              //Saltaba error si quiero modificar algo normal y la respuesta era un objeto
              console.log('data.id: ',response.data.id_usuario!=null);
              if(response.data.id_usuario!=null){ //Entonces pregunto primero si es un objeto con algún atributo al azar
                  console.log('entro a data.id pq es true');
                  Swal.fire({
                  text:"Se modificaron los datos con éxito",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                  }) 
              //Como se guardaron con éxito ahora agrego el titutoria, solo si tiene demonios
                  console.log('params2 ',params2.id_tipo_usuario_Nuevo);
                  //Si es tutor actualizo el tt
              if(this.tiposUsuariosselect==4){
                   this.actualizarTT();
              }
              else{

                this.$router.push('/ListaUsuarios');
              }
                  this.$store.state.usuarios=null;
                  this.$store.state.usuarioEscogido=null;//
               
                
              //this.$router.push('/ListaUsuarios'); //ahora va a estar en el actualizarTT
              }
              else if(response.data.substring(0,20)=='Excepción capturada:'){ //Luego pregunto si es este tipo de excepcion
                console.log('no entro a data.id y entro a excepcion');
                   
                   
                Swal.fire({
                    text:"Ha ingresado un código que ya existe. Corrígalo,por favor.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
              }
              
            })  .catch(e => {
              
                 console.log('error al modif: ',e.response);
                 Swal.fire({
                    text:"Estamos teniendo problemas al modificar al usuario. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
              });
            
          }
          
      }
      
      
    },

    listarTUsuarios() {
      //taambién debería ser por programa
      Axios.create().post('/tipoUsuarios/listarTodo')
        .then(res =>{
           //Ordenadito
           let par=res.data;
           this.tiposUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
          // this.tiposUsuarios=res.data;
          //console.log(this.tiposUsuarios);        
          
        })
        .catch(e => {
          console.log(e.response);
          Swal.fire({
              text:"Estamos teniendo problemas al listar los tipos de usuarios. Vuelve a intentar en unos minutos.",
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
              this.$store.state.usuarioEscogido=null;//
              this.$router.push('/ListaUsuarios');
            } 
          })
        
    },
    listarTT() {
      if(this.banderaTT==false){
        this.banderaTT=true;
      //listo todos los tipos de tutorias de mi programa
      Axios.post('/TipoTutoria/listarTodo/'+ this.miprog.id_programa)
        .then(response=>{
            this.tipostutorias = response.data; //
            console.log('Tipos de tutorias: ',this.tipostutorias);
            if(this.id_usuario_entrante!=0){
            //Despues de llenar los tipos de tutorias veo cuales son del tutor 

              for (var t_usu in this.usuario_entrante.tipo_usuario){ //t_usu es el objeto 
              //aquí verifico si es tutor del programa en el que estoy
     
              if(this.usuario_entrante.tipo_usuario[t_usu].id_tipo_usuario==4 && 
                  this.usuario_entrante.tipo_usuario[t_usu].pivot.id_programa==this.miprog.id_programa ){
          //como sí es tutor en mi programa, cargo los tt
              console.log('Es tutor en mi programa y la i es: ', i);       //  this.listTT[0]=4;    
              for(var i in this.usuario_entrante.tipo_tutorias){
               console.log('i: ',i);
               console.log('For nombre: ',' ',this.usuario_entrante.tipo_tutorias[i].nombre); 
               console.log('For: id',' ',this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria); 
               this.listTT.push(this.usuario_entrante.tipo_tutorias[i].nombre);
               this.listTTId.push(this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria);
               this.listTTBorrados.push(this.usuario_entrante.tipo_tutorias[i]);
              // this.tipostutorias.splice(i,1);
               this.tipostutoriasselect=this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria;
                console.log('For:selected',' ',this.tipostutoriasselect); 
                console.log('TT antes del for j :',this.tipostutorias);
               for(var j in this.tipostutorias){
                if(this.tipostutorias[j].id_tipo_tutoria==this.tipostutoriasselect){
                    console.log('For:j',' ',this.tipostutorias[j].id_tipo_tutoria); 
                    this.tipostutorias.splice(j,1);
                  break; //Si ya es uno igual,salgo
                 }
                }

              }
             }
            }
          }






        })
        .catch(e=>console.log(e));

      }

    },
    addMTT: function () {

            for(var i in this.tipostutorias)
            if(this.tipostutoriasselect ==this.tipostutorias[i].id_tipo_tutoria){
              this.listTT.push(this.tipostutorias[i].nombre);
              this.listTTId.push(this.tipostutorias[i].id_tipo_tutoria);
              this.listTTBorrados.push(this.tipostutorias[i]);
              this.tipostutorias.splice(i,1);
              

            }
            
        },
     deleteTT: function (index) {
  
            var i;
            for(i in this.listTTBorrados)
              if(this.listTT[index]==this.listTTBorrados[i].nombre){
                this.tipostutorias.push(this.listTTBorrados[i]);
                break;
              }
              this.listTT.splice(index,1);
              this.listTTId.splice(index,1);
         
        },
  
    actualizarTT(){
      //Si es tutor
      var i=this.id_usuario_entrante;
      // if (this.tiposUsuariosselect==4 && this.listTTId.length!=0){
        if (this.tiposUsuariosselect==4){  ///Tipo de usuario de tutor
        //Si escogió por lo menos 1 tipo de tutoria

      //   const paramsTT={
      //   //Para actualizar 
      //   tutorias_insertar:this.listTTId,//los id tipos de tutorias que sí escoge
      //   tutorias_eliminar:this.tipostutorias,

      //  }
     //  Ahora el tito tutoria será así
        const paramsTT={
          id_programa:this.miprog.id_programa,
          tutorias_insertar:this.listTTId,
        }
       console.log('I de actualizarTT: ',i);
        if(i!=0){
       //actualizo el tipo de tutoria
        Axios.post('/usuarios/updateTipoTutoria/'+i ,paramsTT)
        .then(response=>{
             console.log('tutorias_insertar',this.listTTId );
             console.log('tipo de tutoria insertado para modificar',response.data);  
             this.$store.state.usuarioEscogido=null;//
             this.$store.state.usuarios=null;//
             
             this.$router.push('/ListaUsuarios');

        })
        .catch(e=>console.log('catch del updateTT modificando usuario:',e)  
        );
        }
        else if(i==0){
          //como es nuevo capturo la respuesta del id de usuario
              Axios.post('/usuarios/updateTipoTutoria/'+ this.id_usuario_entrante,paramsTT)
               .then(response=>{
                    console.log('tipo de tutoria insertado con usuario nuevo',response.data);  
                    this.$store.state.usuarioEscogido=null;//
                    this.$store.state.usuarios=null;//
                    
                    this.$router.push('/ListaUsuarios');
              })
             .catch(e=>console.log('catch del updateTT creando usuario:',e));
        }

      }
        
    },
    //Modal de cargando
    showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
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
.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}
</style>