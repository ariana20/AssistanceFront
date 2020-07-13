<template>
  <div class="FormUsuario" style="margin-left:5%">
    <div class="row grid-divider" style="margin-top:3%" >
      <div id="izquierdo" class="col-md-4">
        <table >
            <tbody >
            <td >
              <!-- onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 163) ||( event.charCode== 239) || (event.charCode== 130) || (event.charCod==144 ) || (event.charCod==181) || (event.charCod==214) || (event.charCod==233) || (event.charCod==224))"   -->
              <!-- onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 163) || event.charCode== 130 || event.charCod==144 ||event.charCod==181 || event.charCod==214 || event.charCod==233 || event.charCod==224)" -->
              <tr style="text-align:left"><td style="width:80px;">Codigo:*</td>   <td> <input class="form-control" style="width: 180%;" type="text" maxlength="8"    id="cod" v-on:keyup="verificarUsuariosCod();"   v-model="codigo"></td></tr> 
              <tr style="text-align:left"><td style="width:80px;">Nombre:*</td>   <td> <input class="form-control" style="width: 180%;" type="text"    maxlength="100"   v-model="nombre"></td></tr>
              <tr style="text-align:left"><td style="width:80px;">Apellidos:*</td>   <td> <input class="form-control" style="width: 180%;" type="text"    maxlength="100"   v-model="apellidos"></td></tr>
              <tr style="text-align:left"><td style="width:80px;">Celular:</td>   <td>   <input  type="text" class="form-control" style="width: 180%;"  v-model="telefono"  value="" maxlength="9" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></td></tr>
              <tr style="text-align:left"><td style="width:80px;">Correo:*</td>   <td> <input id="corr" class="form-control" style="width: 180%;"  type="text" v-model="correo" v-on:keyup="verificarUsuariosCorreo();" ></td></tr>
              <tr style="text-align:left"><td style="width:80px;"></td></tr>
               
              <tr class="" style="bottom:0px;margin-left:0px;" > 
                <b-form-checkbox v-model="estado" value="act" unchecked-value="ina" > Activo</b-form-checkbox>
                 </tr>
                <tr>
                  <td ></td>
                  <h5  v-if="this.IsmsgUsuario==false"   style="color:white;text-align:right;margin-left:50px">{{msgUsuario}}</h5>               
                  <h5  v-else  style="color:#009892;text-align:right;margin-left:50px">
                     {{msgUsuario}}
                   
                    </h5>
                  
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

      <div id="derecho" class="col-md-6">
       <tr style="text-align:left;" ><td style="width:150px;">Tipos de usuarios:*</td>   
          <select v-model="tiposUsuariosselect" class="col sm-6 form-control" style="cursor:pointer"  @click="listarTT()" >
            <option value="no" hidden selected  >Selecciona un tipo de usuario</option>
            <option   v-for="(tipoU,index) in tiposUsuarios" :value="tipoU.id_tipo_usuario" v-bind:key="index" style="cursos:pointer;" >
             {{ tipoU.nombre}}
             </option>
          </select>

        </tr>
          <div style="margin-bottom:20px;" >
            <tr style="text-align:left">  
                    <td style="width:150px;"  v-if="this.tiposUsuariosselect === 4" >Tipos de tutorias:*     </td>
                    <select v-if="this.tiposUsuariosselect === 4" class="col-sm-12 form-control"    v-model="tipostutoriasselect" style="cursor:pointer">
                        <option selected disabled value="no">Selecciona un tipo de tutoria</option>
                        <option v-for="(tt, i) in tipostutorias"  :key="i"   :value="tt.id_tipo_tutoria">
                        {{ tt.nombre }}
                        </option>
                    </select>
                  </tr>
                    <!-- <div class="col-sm-6" > -->
                    <button  type="button"  v-if="this.tiposUsuariosselect === 4" class="col-sm-4 btn btn-info"                     
                            style="margin-left:10px;margin:5px;border-radius: 10px;"
                            @click="addMTT(i)">Seleccionar</button>
                    <!-- </div> -->
                <tr>      
                    <td style="width:110px;" v-if="this.tiposUsuariosselect === 5" >Condición del alumno: </td>
                    <select v-if="this.tiposUsuariosselect === 5" class="col-sm-12 form-control" style="margin-top:5px;margin-left:35px"
                     v-model="condiAlumnosselect">  <!--aqui guardo-->
                        <option selected disabled value="no">Selecciona una condición</option>
                        <option v-for="(condi, i) in condiAlumnos"  :key="i" :value="condi.abreviatura"  > <!--falta agregar value, creo que abreviatura le mando-->
                        {{ condi.nombre }} 
                        <!-- podría no ser nombre -->
                        </option>
                    </select>
                   
                </tr>
          
          </div>
                 <div class="left-content" v-if="this.tiposUsuariosselect === 4" >
                    <h6 style="color:black;font-weight:900;text-align:left;" v-if="this.tiposUsuariosselect === 4">Tipos de tutoria seleccionados</h6>
                    <!-- <hr >  -->
                    <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
                        <div v-if="listTT.length == 0">No tiene tipos de tutorias seleccionados</div>
                        <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                            v-for="(newTT,ttIndex) in listTT"  
                            :key="ttIndex">
                            {{newTT}}
                            <span name="remove" class="close" @click="deleteTT(ttIndex)" style="margin-right:20px;float:right;">&times;</span>           
                        </li>
                    </ul>
                    </div>

      </div>
    </div>
    <div  class="botones" style="margin-top:0px;bottom:25px;padding-top:10px">   
        <button type="button" style="margin:5px;border-radius: 10px;" class="btn btn-info" id="btnGuarda" v-on:click="guardarUsuario()">Guardar</button>
        <button type="button"  class="btn btn-info" style="border-radius: 10px;border-color:gray;background-color:gray;margin-left:50px" id="btnCancela" v-on:click="cancelarUsuario()"  >Cancelar</button>  
      
     </div>
    <!-- <div> -->
       <!-- para mostrar la lista de tt que escoge  -->
      <!-- <li         v-for="(newTT,ttIndex) in listTTId" :key="ttIndex" >
      {{newTT}}
     </li>
     </div> -->
     <div style="bottom:5px">
      * Campos obligatorios   
     </div >
     <!-- para mostrar la lista de tt que no escoge  -->
     <!-- <li         v-for="(newTT,ttIndex) in tipostutorias" :key="ttIndex" >
      {{newTT.id_tipo_tutoria}}  {{newTT.nombre}}
     </li> -->
     
      <!-- Modal de cargando -->
      <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
        <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
          <b-spinner style="width: 3rem; height: 3rem;"/>
          <br >Cargando... 
        </div>
      </b-modal>
     
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
      tiposUsuariosselect:"no",
      estado:"act",
      id_usuario_entrante:"",
      //id_usuario_entrante:this.$store.state.usuarioEscogido.id_usuario,
      
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
      condiAlumnos:"",
      condiAlumnosselect:"no",
      banderaTT:false, //Bandera para no llenar el combo box de TT y condialumnos varias veces
      banderaUsuProg:false, //Bandera que me indica que el usuario vino del listar y pertenece a mi programa
      msgUsuario:"",
      IsmsgUsuario:false,
      idTutor:0,
      idAlumno:0,
      idJP:0,
      miUsuario:null,
    }
  },

  mounted(){
    
    if(this.$store.state.usuario==null) this.$router.push('/login');

    this.IsmsgUsuario=false;
    this.msgUsuario="Assistance"
    this.listarTUsuarios();    
    this.listarCA();  
    this.miUsuario=this.$store.state.usuario;
    if(parseInt((this.$route.path).substring(9,11),10) ==0){
      this.id_usuario_entrante=0;
      //no hay usuario entrante, pero puede que aparezca 
      
    }
    else if (parseInt((this.$route.path).substring(9,15),10) !=0) {
       this.showModal();
      this.listarTT();
      
      this.id_usuario_entrante=this.$store.state.usuarioEscogido.id_usuario;
      this.usuario_entrante=this.$store.state.usuarioEscogido;     
      this.tiposUsuariosselect=this.usuario_entrante.pivot.id_tipo_usuario;      
      Axios.create()
       .post('/usuarios/listar/'+this.id_usuario_entrante).then( response =>{
         document.getElementById("corr").disabled = true;
          // document.getElementById("cod").disabled = true;

           this.codigo=response.data.codigo;
           this.nombre= response.data.nombre;
           this.apellidos=response.data.apellidos;
           this.correo=response.data.correo;
           this.telefono=response.data.telefono;
           this.estado=response.data.estado;
           this.banderaUsuProg=true;

           //Si tiene el permiso alumno, lleno sus condiciones...pero todos tienen,igual lo lleno
           this.condiAlumnosselect=response.data.condicion_alumno;

           this.hideModal();
         }).catch(e => {
                 console.log('catch listar usuario entrante',e.response);
                  this.hideModal();
                 Swal.fire({
                    text:"Estamos teniendo problemas al obtener los datos del usuario que desea modificar. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'OK',
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
    
    guardarUsuario() { //Para usuarios nuevecitos más que nada, si no, se van a una función
      
     
      document.getElementById("btnGuarda").disabled = true; //inhabilita
      document.getElementById("btnCancela").disabled = true; //inhabilita

      var   expresion2=/\w+@\w+\.+edu.pe/;
      var   expresion1=/\w+@\w+\.+pe/;
      if(this.nombre=="" ||this.apellidos=="" || this.codigo=="" || this.codigo===null || this.correo=="" || this.estado===null   ){
          // this.hideModal();
      //Cuando está vacio todo
          Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        })  ;    
      }
      else if( !expresion2.test(this.correo) &&  !expresion1.test(this.correo)){ //Verificación de correo
          // this.hideModal();
          Swal.fire({
            
              text:"No ha escrito una dirección de correo válida. Todos los correos deben contener ser dominio @pucp.edu.pe o @pucp.pe",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 
       
      }
      else if(this.telefono<10000000 && this.telefono>0){ //Esto será válido?
          // this.hideModal();
          Swal.fire({
              text:"No ha colocado un número de teléfono válido. Mínimo 7 dígitos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
          })   
      }
      else if(this.tiposUsuariosselect=="no" || this.tiposUsuariosselect.length==0 ){
        // this.hideModal();
           Swal.fire({
              text:"Falta elegir un tipo de usuario",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
          })  
      }
      //Si escogió el tipo de usuario tutor
      else if( this.tiposUsuariosselect==4 &&  this.listTTId.length==0 ){
        // this.hideModal();
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
      
      //primero evaluo si es alumno       
           
          
          if(this.id_usuario_entrante==0){ //Se insertar un usuario nuevecito
            if(this.estado=="ina"){
                  //  this.hideModal();
                Swal.fire({
              text:"No puede crear un nuevo usuario como inactivo.",
              icon:"warning",
              confirmButtonText: 'Sí',
              confirmButtonColor:'#0097A7',              
                  showConfirmButton: true,
                 });
              }
            
            else{
              if(this.tiposUsuariosselect==5){
              const params = {
              //Parametros insertar de usuario
           codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            correo:this.correo.trim().replace(/\s+/g, ' '), //replace o no replace?
            telefono:this.telefono,
            password:"12345",
            estado:this.estado,
            id_programaNuevo:this.miprog.id_programa,
            id_tipo_usuario:this.tiposUsuariosselect,  
            usuario_creacion:this.miUsuario.id_usuario, 
            //como es alumno inserto las condicioes
            condicion_alumno:this.condiAlumnosselect,//le doy el value
             
            };
             this.usuarioNuevo(params);
            }
            else{
        
            const params = {
        //Parametros insertar de usuario
           codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            correo:this.correo.trim().replace(/\s+/g, ' '), //replace o no replace?
            telefono:this.telefono,
            password:"12345",
            estado:this.estado,
            id_programaNuevo:this.miprog.id_programa,
            id_tipo_usuario:this.tiposUsuariosselect,
            usuario_creacion:this.miUsuario.id_usuario, 
            //ahora, si es tipo usuario 4 de tutor debe insertar el tipo de tutoria
            };
         
            this.usuarioNuevo(params);
            }
              
                 
          }

          }
          
          else if (this.id_usuario_entrante!=0){
            // this.hideModal();
            //if pertenece al programa
            if(this.banderaUsuProg==true){
                     
              //primero evaluo si es alumno
              if(this.tiposUsuariosselect==5){
                  const params2 = {
                      codigo:this.codigo.trim().replace(/\s+/g, ' '), 
                      nombre:this.nombre.trim().replace(/\s+/g, ' '),
                      apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
                      estado:this.estado,
                      telefono:this.telefono,    
                      // tengo que pasarle que modifique el tipo de rol, si el tutor id4 se modifica el tipo de tutoria
                      id_tipo_usuario_Nuevo:this.tiposUsuariosselect, 
                      id_programa:this.miprog.id_programa,
            
                //como es alumno inserto las condicioes
                      condicion_alumno:this.condiAlumnosselect,//le doy el value

                      //si debería pasarte, el usuario actualizacion cuando es alumno
                      usuario_actualizacion:this.miUsuario.id_usuario,

                };
                this.modificarUsuario(params2);
              }
              else{
                //aqui verifico
                  



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
                 if(this.telefono== this.usuario_entrante.telefono && 
                    this.nombre == this.usuario_entrante.nombre && 
                    this.apellidos== this.usuario_entrante.apellidos && 
                    this.estado==this.usuario_entrante.estado  && 
                    this.codigo== this.usuario_entrante.codigo)   this.modificarUsuario(params2);
                  else {
                       let params4 = {
                        //Parametros modificados de usuario
                             codigo:this.codigo.trim().replace(/\s+/g, ' '), 
                             nombre:this.nombre.trim().replace(/\s+/g, ' '),
                             apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
                             estado:this.estado,
                             telefono:this.telefono,    
                              // tengo que pasarle que modifique el tipo de rol, si el tutor id4 se modifica el tipo de tutoria
                             id_tipo_usuario_Nuevo:this.tiposUsuariosselect, 
                             id_programa:this.miprog.id_programa,
                             usuario_actualizacion:this.miUsuario.id_usuario,
                      };
                      this.modificarUsuario(params4);
                  }

              }
            } 
            else{
              //usuario existente
              
                 //primero evaluo si es alumno
                  if(this.tiposUsuariosselect==5){
                    const params3 = {
                    //Parametros insertar de usuario
                     id_usuario:this.id_usuario_entrante,
                     id_tipo_usuario:this.tiposUsuariosselect,
                     id_programaNuevo:this.miprog.id_programa,
                    //como es alumno inserto las condicioes
                     condicion_alumno:this.condiAlumnosselect,//le doy el value
                    };
                        this.insertarUsuario(params3); //Insertar un usuario existente en el programa
                 }
                  else{            
                       const params3={
                          id_usuario:this.id_usuario_entrante,
                           id_tipo_usuario:this.tiposUsuariosselect,
                           id_programaNuevo:this.miprog.id_programa,
                      }
                      this.insertarUsuario(params3); //Insertar un usuario existente en el programa

                  }


            
            }
          
      }
      
      }
      document.getElementById("btnGuarda").disabled = false; //habilita
      document.getElementById("btnCancela").disabled = false; //habilita
    },

    listarTUsuarios() {
       if(this.$store.state.tipoActual.nombre == 'Coordinador Facultad'){
        let obj = { id_facultad: this.$store.state.programaActual.id_facultad}
        this.axios.post('/tipoUsuarios/tiposFacultad',obj)
          .then(res=>{
               //Ordenadito
           let par=res.data;
        
           this.tiposUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
            this.hideModal()
          })
          .catch(e=>{
            console.log(e)
            this.hideModal()
          });
      }
      if(this.$store.state.tipoActual.nombre == 'Coordinador Programa'){
        let obj = {
          id_programa: this.$store.state.programaActual.id_programa,
          id_facultad: this.$store.state.programaActual.id_facultad
        }
        this.axios.post('/tipoUsuarios/tiposPrograma',obj)
          .then(res=>{
                //Ordenadito
           let par=res.data;
     
           this.tiposUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
            this.hideModal()
          })
          .catch(e=>{
            console.log(e);
            this.hideModal()
          });
      }


    /*

      //taambién debería ser por programa
      Axios.create().post('/tipoUsuarios/listarTodo')
        .then(res =>{
           //Ordenadito
           let par=res.data;
          //  console.log('TUsu:',res.data);
           this.tiposUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
          // this.tiposUsuarios=res.data;
          //console.log(this.tiposUsuarios); 
          
          //Cuando ya sea tipousuarioxprog, analizo los tipos de usuarios
          //Busco en el nombre, Tutor o  Alumno y guardo ese id para tenerlo como variable
          this.idsTU();
          
        })
        .catch(e => {
          console.log('catchlistart_usu',e.response);
          Swal.fire({
              text:"Estamos teniendo problemas al listar los tipos de usuarios. Vuelve a intentar en unos minutos.",
              icon:"warning",
              confirmButtonText: 'OK',
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
        */
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
              //this.$store.state.usuarios=null;
              this.$store.state.usuarioEscogido=null;//
              this.$router.push('/ListaUsuarios');
            } 
          })
        
    },
    listarTT() {
      if(this.banderaTT==false){
        this.banderaTT=true;
      //listo todos los tipos de tutorias de mi programa
      Axios.post('/TipoTutoria/listarActivos/'+ this.miprog.id_programa)
      // Axios.post('/TipoTutoria/listarActivos/'+ this.miprog.id_programa)  //falta que esté en el servidor
        .then(response=>{
            this.tipostutorias = response.data; //
            if(this.id_usuario_entrante!=0){
            //Despues de llenar los tipos de tutorias veo cuales son del tutor 

              for (var t_usu in this.usuario_entrante.tipo_usuario){ //t_usu es el objeto 
              //aquí verifico si es tutor del programa en el que estoy
     
              if(this.usuario_entrante.tipo_usuario[t_usu].id_tipo_usuario==4 && 
                  this.usuario_entrante.tipo_usuario[t_usu].pivot.id_programa==this.miprog.id_programa ){
          //como sí es tutor en mi programa, cargo los tt
              for(var i in this.usuario_entrante.tipo_tutorias){
            
               this.listTT.push(this.usuario_entrante.tipo_tutorias[i].nombre);
               this.listTTId.push(this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria);
               this.listTTBorrados.push(this.usuario_entrante.tipo_tutorias[i]);
              // this.tipostutorias.splice(i,1);
               this.tipostutoriasselect=this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria;
            
               for(var j in this.tipostutorias){
                if(this.tipostutorias[j].id_tipo_tutoria==this.tipostutoriasselect){
                    this.tipostutorias.splice(j,1);
                  break; //Si ya es uno igual,salgo
                 }
                }
                this.tipostutoriasselect="no";
              }
             }
            }
          }






        })
        .catch(e=>console.log('catch listarTipoT',e));

      }

    },
    addMTT: function () {

            for(var i in this.tipostutorias)
            if(this.tipostutoriasselect ==this.tipostutorias[i].id_tipo_tutoria){
              this.listTT.push(this.tipostutorias[i].nombre);
              this.listTTId.push(this.tipostutorias[i].id_tipo_tutoria);
              this.listTTBorrados.push(this.tipostutorias[i]);
              this.tipostutorias.splice(i,1);
              this.tipostutoriasselect="no";

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
  
    actualizarTT(i){ //verifica si es tutor
      //Si es tutor
      // if (this.tiposUsuariosselect==4 && this.listTTId.length!=0){
        if (this.tiposUsuariosselect==4 && this.listTTId.length!=0){  ///Tipo de usuario de tutor
        //Si escogió por lo menos 1 tipo de tutoria

          const paramsTT={
            id_programa:this.miprog.id_programa,
            tutorias_insertar:this.listTTId,
          }
     
       //actualizo el tipo de tutoria
          Axios.post('/usuarios/updateTipoTutoria/'+i ,paramsTT)
          .then(response=>{
             console.log('tipo de tutoria insertado para modificar',response.data);  
             this.$store.state.usuarioEscogido=null;//
             this.$store.state.usuarios=null;//             
             this.$router.push('/ListaUsuarios');
            
          })
          .catch(e=>{console.log('catch del updateTT modificando usuario:',e)  }
              );
       

      }
    
        
    },
    //Modal de cargando
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    verificarUsuariosCod(){
      //Cuando recién tenga 8 dígitos,analizo
      //Pero si escribe un número más dejo evitar que salga el mensaje
        
        if(this.codigo.length==8 && this.banderaUsuProg==false){
       
          
            const paramsV={
              criterio:this.codigo,
            }
            
            Axios.post('/usuarios/verificarUsuario' ,paramsV)
            .then(response=>{
             //Si es código ya existe
             if(response.data.status=='El codigo ingresado ya existe'){
               
               //Le aviso al usuario y lleno los campos
                //el id tambien llenaría
                document.getElementById("corr").disabled = true;
                document.getElementById("cod").disabled = true; 
                this.id_usuario_entrante=response.data.usuario[0].id_usuario;
                //this.codigo=response.data.codigo;
                this.usuario_entrante= response.data.usuario[0];
                this.correo=response.data.usuario[0].correo;
                this.nombre= response.data.usuario[0].nombre;
                this.apellidos=response.data.usuario[0].apellidos;               
                this.telefono=response.data.usuario[0].telefono;
                this.estado=response.data.usuario[0].estado; 
                //Su tipo de usuario falta llenar
                
                this.msgUsuario="Usuario existente";
                this.IsmsgUsuario=true;
                // this.hideModal();

             }
             else if(response.data.status=='Codigo o correo no encontrado' || response.data.status=='El correo ingresado ya existe'){
              //  debería poder continuar con mi vida sin decirle nada al usuario
              //o pongo un texto debajo del código que diga que el usuario es nuevo...con un v-if y una bandera
              // this.hideModal();
               console.log(response.data.status);
             }
           


            })
            .catch(e=>{console.log('catch del verificarCodigo',e); 
            // this.hideModal();
             }
              );

         

        }
  

    },
    verificarUsuariosCorreo(){
      //Verificación de correo
       var   expresion2=/\w+@\w+\.+edu.pe/;
       var   expresion1=/\w+@\w+\.+pe/;
      if( (expresion2.test(this.correo) || expresion1.test(this.correo) ) && this.banderaUsuProg==false){ 
        
        //es un correo "válido",entonces llamo para verificar si existe o no
   
        const paramsV={
              criterio:this.correo,
        }
        Axios.post('/usuarios/verificarUsuario' ,paramsV)
            .then(response=>{
             //Si es ccorreo ya existe
             if(response.data.status=='El correo ingresado ya existe'){
               //Le aviso al usuario y lleno los campos
                //el id tambien llenaría
                document.getElementById("corr").disabled = true;
                document.getElementById("cod").disabled = true;                
                //No puedo agregar un usuario con código  - o null
                this.id_usuario_entrante=response.data.usuario[0].id_usuario;                
                this.usuario_entrante= response.data.usuario[0];
                this.codigo=response.data.usuario[0].codigo;
                this.nombre= response.data.usuario[0].nombre;
                this.apellidos=response.data.usuario[0].apellidos;               
                this.telefono=response.data.usuario[0].telefono;
                this.estado=response.data.usuario[0].estado; 
                //tipo de usuarip
                 this.msgUsuario="Usuario existente";
                this.IsmsgUsuario=true;
                // this.hideModal();

              }
             else if(response.data.status=='Codigo o correo no encontrado' || response.data.status=='El codigo ingresado ya existe'){
              //  debería poder continuar con mi vida sin decirle nada al usuario
              //o pongo un texto debajo del código que diga que el usuario es nuevo...con un v-if y una bandera
              // this.hideModal();
             }
        })
        .catch(e=>{console.log('catch del verificarCorreo',e); 
        // this.hideModal(); 
        }
         );
        

      }
      else{
        //Correo que no es válido todavía no termina de escribirlo
        // this.hideModal();
      }
    },
    usuarioNuevo(params){
        Axios.create()
              .post('/usuarios/insertar',params)
              .then( response=>{

                if(response.data["Error capturado:"]=="El codigo o correo ingresados ya existen"){

                  // this.hideModal();
                   Swal.fire({
                    text:"Ha ingresado un correo o código que ya existe en la institución. Por favor, corriga los datos.",
                    icon:"warning",
                    confirmButtonText: 'Corregir',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });
                }
                else{
                   
                  let direccion = "https://proyectosoftware20201front.vizcochitos.cloudns.cl/login"
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
                  // this.hideModal();
                  Swal.fire({
                    text:"Se guardaron los datos con éxito",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  }) 
                   //Como se guardaron con éxito ahora agrego el titutoria
                  if(this.tiposUsuariosselect==4){
                        var idusuarionuevo=response.data["user"].id_usuario;
                        this.actualizarTT(idusuarionuevo);//tiene hide?
                  }
                  else{
                    this.$router.push('/ListaUsuarios');
                  }
                  this.$store.state.usuarioEscogido=null;//
                  this.$store.state.usuarios=null;
                  // this.hideModal();
                 
              
             
              // //ahora va a estar en el actualizarTT
              }

            }).catch(e => {
              console.log('catch insertar usuario nuevo',e);
                      // this.hideModal();
                 Swal.fire({
                    text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });  
                  
                  this.$store.state.usuarios=null;
                  //  this.$router.push('/ListaUsuarios');         
                
                
               }
            );
    },
    modificarUsuario(params2){
        //pertenezco al método guardar usuario
        //Ya existe un id del usuario

            Axios.create()
            .post('/usuarios/modificar/'+this.id_usuario_entrante,params2)
            .then( response=>{

              //Saltaba error si quiero modificar algo normal y la respuesta era un objeto
             
              if(response.data.id_usuario!=null){ //Entonces pregunto primero si es un objeto con algún atributo al azar
                  
                  // this.hideModal();
                  Swal.fire({
                  text:"Se modificaron los datos con éxito",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                  }) 
              //Como se guardaron con éxito ahora agrego el titutoria, solo si tiene demonios
                  //Si es tutor actualizo el tt
                if(this.tiposUsuariosselect==4){
                   this.actualizarTT(this.id_usuario_entrante);
                  //  this.hideModal();
                }
                 else{
                  
                 this.$router.push('/ListaUsuarios');
                }
                  this.$store.state.usuarios=null;
                  this.$store.state.usuarioEscogido=null;//
               
                
              //this.$router.push('/ListaUsuarios'); //ahora va a estar en el actualizarTT
              }
              else if(response.data.substring(0,20)=='Excepción capturada:'){ //Luego pregunto si es este tipo de excepcion

                //  this.hideModal();  
                   
                Swal.fire({
                    text:"Ha ingresado un código que ya existe. Corrígalo,por favor.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
              }
              
            })  .catch(e => {
                // this.hideModal();
                 console.log('catch al modif: ',e.response);
                 Swal.fire({
                    text:"Estamos teniendo problemas al modificar al usuario. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
              });

        
    },
    insertarUsuario(params3){//Insertar usuario cuando este existe en la universidad
      
       //////falta crear un params3 para la misma ruta de insertar cuando es un usuario existente
       //id_usuario, id_tipo_usuario, id_programaNuevo  
       
     
     
         Axios.create()
              .post('/usuarios/insertar',params3)
              .then( response=>{
                console.log(response);

                  // this.hideModal();
                  Swal.fire({
                    text:"Se guardaron los datos con éxito",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  }) 
                  
                  this.$store.state.usuarios=null;
                  //Como se guardaron con éxito ahora agrego el titutoria, pero ya tengo el id usuario
                  if(this.tiposUsuariosselect==4){
                  this.actualizarTT(this.id_usuario_entrante);
                  //this.hideModal();
                  }
                  else{
                    this.$router.push('/ListaUsuarios');
                  }
                  
             
              // //ahora va a estar en el actualizarTT
              //Si es tutor
              

            }).catch(e => {
              console.log('catch usuario existente',e);

              // this.hideModal();
                 Swal.fire({
                    text:"Estamos teniendo problemas al insertar este usuario a su programa. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });  
                  
                  this.$store.state.usuarios=null;
                  //  this.$router.push('/ListaUsuarios');         
                
                
               }
            );
        




    },
    listarCA(){
     
        Axios.create()
              .post('/usuarios/condAlumno')
              .then( response=>{
                this.condiAlumnos=response.data;
              

            }).catch(e => {
              console.log('catch condAlumno',e);

                 Swal.fire({
                    text:"Estamos teniendo problemas al listar las condiciones del alumno. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });                  
               }
            );

      
    },
    idsTU(){
      //Como me dan solo los tipos_usuarios de mi programa
      ///////////OOOOOOOOOOOOOOO verifico los permisos?
     for(var i in this.tiposUsuarios){
       //tutor o posible tutor
        if(this.tiposUsuarios[i].nombre.toUpperCase()=="TUTOR"){
          //
          this.idTutor=this.tiposUsuarios[i].id_tipo_usuario;
        }
        else if(this.tiposUsuarios[i].nombre.toUpperCase()=="ALUMNO"){
          //
          this.idAlumno=this.tiposUsuarios[i].id_tipo_usuario;
        }
        else{
          //ya tengo
          var posi=this.tiposUsuarios[i].nombre.toUpperCase().indexOf("TUTOR");//Contenga la palabra tutor
          if (posi!=-1 ){
            //es otro tipo de tutor
            this.idJP=this.tiposUsuarios[i].id_tipo_usuario;
            if(this.idJP==this.idTutor) this.idJP=0;//No encontró a otro tipo de tutor, encontró al mismo de siempre
          }
        }
     }

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
  width: 100%;
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
.top-titulo{
  width: 100%;
}
</style>