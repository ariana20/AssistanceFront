<template>
  <div class="FormUsuario contenedor" style="margin-top:5px;">
    <div class="row grid-divider" style="margin-top:3%" >
      <div id="izquierdo" class="col-md-5">
        <div class="row" style="text-align:left">
          <div class="col-12 col-md-3" style=";margin-bottom:10px">
            Codigo:*
          </div>
          <div class=" col-12 col-md-9" style=";margin-bottom:10px">
            <input class="form-control col-12" style="width: 180%;" type="text" maxlength="8"    id="cod" v-on:keyup="verificarUsuariosCod();"   v-model="codigo">
          </div>
        </div> 
        <div class="row" style="text-align:left">
          <div class="col-12 col-md-3" style=";margin-bottom:10px">
            Nombre:*
          </div>
          <div class=" col-12 col-md-9" style=";margin-bottom:10px">
            <input class="form-control col-12" style="width: 180%;" type="text"  id="nomb" maxlength="100"   v-model="nombre">
          </div>
        </div> 
        <div class="row" style="text-align:left">
          <div class="col-12 col-md-3" style=";margin-bottom:10px">
            Apellidos:*
          </div>
          <div class=" col-12 col-md-9" style=";margin-bottom:10px">
            <input class="form-control col-12" style="width: 180%;" type="text" id="apel" maxlength="100"   v-model="apellidos">
          </div>
        </div> 
        <div class="row" style="text-align:left">
          <div class="col-12 col-md-3" style=";margin-bottom:10px">
            Celular:
          </div>
          <div class=" col-12 col-md-9" style=";margin-bottom:10px">
            <input  type="text" class="form-control col-12" style="width: 180%;"  v-model="telefono"  value="" maxlength="9" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)">
          </div>
        </div> 
        <div class="row" style="text-align:left">
          <div class="col-12 col-md-3" style=";margin-bottom:10px">
            Correo:*
          </div>
          <div class=" col-12 col-md-9" style=";margin-bottom:10px">
            <input id="corr" class="form-control col-12" style="width: 180%;"  type="text" v-model="correo" v-on:keyup="verificarUsuariosCorreo();" >
          </div>
        </div> 
        <div class="row" style="text-align:left">
          <div class="col-12" style=";margin-bottom:10px">
            <b-form-checkbox v-model="estado" value="act" unchecked-value="ina" > Activo</b-form-checkbox>
          </div>
        </div> 

        <div v-if="this.IsmsgUsuario==true" class="row" style="text-align:left">            
          <h5 style="color:#009892;text-align:right;margin-left:50px">
            {{msgUsuario}}
          </h5>
        </div>
      </div>

      <div id="medio" class="col-md-1">
      </div>

      <div id="derecho" class="col-md-6" v-if="(usuario_entrante!=null && usuario_entrante.usuario_x_programas != undefined && usuario_entrante.usuario_x_programas.length==0)||id_usuario_entrante==0">
        <tr style="text-align:left;" ><td style="width:150px;">Tipos de usuarios:*</td>   
            <select v-on:change="TipoUs" v-model="tiposUsuariosselect" class="col sm-6 form-control" style="cursor:pointer"  @click="listarTT()" >
              <option value="no" hidden selected  >Selecciona un tipo de usuario</option>
              <option   v-for="(tipoU,index) in tiposUsuarios" :value="tipoU.id_tipo_usuario" v-bind:key="index" style="cursos:pointer;" >
                <div v-if="tipoU.programa.nombre == 'Administrador'">{{ tipoU.nombre + " (General)"}}</div>
                <div v-else>{{ tipoU.nombre + " ("+ tipoU.programa.nombre+")"}}</div>
              </option>
            </select>
          </tr>
        <div style="margin-bottom:20px;" >
          <tr>      
            <td style="width:35%;text-align:left" v-if="this.tiposUsuariosSel!=null && this.tiposUsuariosSel.id_programa == 1 && this.tiposUsuariosSel.id_tipo_usuario!=2" >Programa: </td>
            <select v-on:change="ProgramaSel" v-if="this.tiposUsuariosSel!=null && this.tiposUsuariosSel.id_programa == 1 && this.tiposUsuariosSel.id_tipo_usuario!=2" class="col-sm-12 form-control" style="margin-top:5px"
              v-model="progSeleccionadoInd">  <!--aqui guardo-->
              <option selected :value="null">Selecciona un programa</option>
              <option v-for="(prog, i) in programas"  :key="i" :value="prog.id_programa"  > <!--falta agregar value, creo que abreviatura le mando-->
              {{ prog.nombre }} 
              </option>
            </select>
          </tr>
          <tr>      
            <td style="width:35%;text-align:left" v-if="this.tiposUsuariosSel!=null && this.tiposUsuariosSel.id_programa == 1 && this.tiposUsuariosSel.id_tipo_usuario==2" >Facultad: </td>
            <select v-if="this.tiposUsuariosSel!=null && this.tiposUsuariosSel.id_programa == 1 && this.tiposUsuariosSel.id_tipo_usuario==2" v-on:change="ProgramaSel" class="col-sm-11 form-control" style="margin-top:5px;margin-left:-25px"
              v-model="progSeleccionadoInd">  <!--aqui guardo-->
              <option selected :value="null">Selecciona una facultad</option>
              <option v-for="(prog, i) in facultades"  :key="i" :value="prog.id_programa"  > <!--falta agregar value, creo que abreviatura le mando-->
              {{ prog.nombre }} 
              </option>
            </select>
          </tr>
          <tr style="text-align:left">  
            <td style="width:150px;"  v-if="this.tiposUsuariosselect === 4" >Tipos de tutorias:*     </td>
            <select v-if="this.tiposUsuariosselect === 4" class="col-sm-12 form-control"    v-model="tipostutoriasselect" style="cursor:pointer">
              <option selected disabled hidden value="no">Selecciona un tipo de tutoria</option>
              <option v-for="(tt, i) in tipostutorias"  :key="i"   :value="tt.id_tipo_tutoria">
              {{ tt.nombre}}
              </option>
            </select>
          </tr>
            <button  type="button"  v-if="this.tiposUsuariosselect === 4" class="col-sm-4 btn btn-info"                     
              style="margin-left:10px;margin:5px;border-radius: 10px;"
              @click="addMTT(i)">
              Seleccionar
            </button>
          <tr>      
            <td style="width:35%;text-align:left" v-if="this.tiposUsuariosselect === 5" >Condición del alumno: </td>
            <select v-if="this.tiposUsuariosselect === 5" class="col-sm-12 form-control" style="margin-top:5px"
              v-model="condiAlumnosselect">  <!--aqui guardo-->
              <option selected disabled hidden :value="null">Selecciona una condición</option>
              <option v-for="(condi, i) in condiAlumnos"  :key="i" :value="condi.abreviatura"  > <!--falta agregar value, creo que abreviatura le mando-->
              {{ condi.nombre }} 
              </option>
            </select>
          </tr>
        </div>
        <div class="left-content" v-if="this.tiposUsuariosselect === 4" >
          <h6 style="color:black;font-weight:900;text-align:left;" v-if="this.tiposUsuariosselect === 4">Tipos de tutoria seleccionados</h6>
          <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
            <div v-if="listTT.length == 0">No tiene tipos de tutorias seleccionados</div>
            <li class="motivos-seleccionados list-group-item" style="text-align:left;"
              v-for="(newTT,ttIndex) in listTT"  
              :key="ttIndex">
              {{newTT}}
              <span name="remove" class="close" @click="deleteTT(ttIndex)" style="margin-right:20px;float:right;">
                &times;
              </span>           
            </li>
          </ul>
        </div>
      </div>
      
      <div id="derecho" class="col-md-6" style="text-align:left" v-else>
        <div class="row">
          <div class="col-12 col-md-2">
            Tipos de Usuario:
          </div>
          <div class="col-12 col-md-6"  v-if="usuario_entrante!=null"> 
            <select v-if="anadirNuevo==true" v-on:change="TipoUs" v-model="tiposUsuariosselect" class="col sm-6 form-control" style="cursor:pointer;margin-bottom:0px;margin-top:1.5%"  @click="listarTT()" >
              <option value="no" disabled hidden selected  >Selecciona un tipo de usuario</option>
              <option   v-for="(tipoU,index) in tiposUsuarios" :value="tipoU.id_tipo_usuario" v-bind:key="index" style="cursos:pointer;" >
                <div v-if="tipoU.programa.nombre == 'Administrador'">{{ tipoU.nombre + " (General)"}}</div>
                <div v-else>{{ tipoU.nombre + " ("+ tipoU.programa.nombre+")"}}</div>
              </option>
            </select>
            <select v-else v-on:change="TipoUsEl" v-model="tiposUsuariosselect" class="col sm-6 form-control" style="cursor:pointer;margin-bottom:0px;margin-top:1.5%">
              <option value="no" disabled hidden selected  >Selecciona un tipo de usuario</option>
              <option   v-for="(tipoU,index) in usuario_entrante.usuario_x_programas" :value="tipoU.id_usuario_x_programa" v-bind:key="index" style="cursos:pointer;" >
                <div v-if="tipoU.programa && tipoU.programa.nombre == 'Administrador'">{{ tipoU.tipo_usuario.nombre + " (General)"}}</div>
                <div v-else-if="tipoU.programa">{{ tipoU.tipo_usuario.nombre + " ("+ tipoU.programa.nombre+")"}}</div>
                <div v-else>{{ tipoU.tipo_usuario.nombre + " (Sin Asignar)"}}</div>
              </option>
            </select>
          </div>
          <div class="col-6 col-md-2">
            <button v-if="anadirNuevo==false"  type="button" style="border-radius: 10px" @click="anadirNuevo=true;tiposUsuariosselect='no';tiposUsuariosSel=null" class="btn btn-info">Añadir</button>
            <button v-else  type="button" style="border-radius: 10px;border-color:gray;background-color:gray" @click="anadirNuevo=false;tiposUsuariosselect='no';tiposUsuariosSel=null" class="btn btn-info">Cancelar</button>
          </div>
          <div v-if="anadirNuevo==false && tiposUsuariosSel!=null" class="col-6 col-md-2">
            <button type="button" style="border-radius: 10px;border-color:gray;background-color:gray" @click="eliminarTipo" class="btn btn-info">Eliminar</button>
          </div>
        </div>
        <div v-if="this.anadirNuevo==true && this.tiposUsuariosSel!=null && this.tiposUsuariosSel.id_programa == 1 && this.tiposUsuariosSel.id_tipo_usuario!=2" class="row" style="margin-top:2%">
          <div class="col-12 col-md-2" style="margin-top:0.8%">
            Programa:
          </div>
          <div class="col-12 col-md-8">
            <select v-on:change="ProgramaSel" class="form-control"
              v-model="progSeleccionadoInd">  <!--aqui guardo-->
              <option selected :value="null">Selecciona un programa</option>
              <option v-for="(prog, i) in programas"  :key="i" :value="prog.id_programa"  > <!--falta agregar value, creo que abreviatura le mando-->
              {{ prog.nombre }} 
              </option>
            </select>
          </div>
        </div>
        <div v-else style="margin-top:2%">
          <div v-if="this.anadirNuevo==true && this.tiposUsuariosSel!=null && this.tiposUsuariosSel.id_programa == 1" class="row">
            <div class="col-12 col-md-2" style="margin-top:0.8%">
              Facultad:
            </div>
            <div class="col-12 col-md-8">
              <select v-on:change="ProgramaSel" class="form-control"
                v-model="progSeleccionadoInd">  <!--aqui guardo-->
                <option selected :value="null">Selecciona una facultad</option>
                <option v-for="(prog, i) in facultades"  :key="i" :value="prog.id_programa"  > <!--falta agregar value, creo que abreviatura le mando-->
                {{ prog.nombre }} 
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="this.tiposUsuariosSel!=null && this.tiposUsuariosSel.alumno==true" class="row">
          <div class="col-12 col-md-2" style="margin-top:0.8%">
            Condición del alumno:
          </div>
          <div class="col-12 col-md-8">
            <select class="form-control"
              v-model="condiAlumnosselect">  <!--aqui guardo-->
              <option selected disabled hidden :value="null">Selecciona una condición</option>
              <option v-for="(condi, i) in condiAlumnos"  :key="i" :value="condi.abreviatura"  > <!--falta agregar value, creo que abreviatura le mando-->
              {{ condi.nombre }} 
              </option>
            </select>
          </div>
        </div>
        <div v-if="this.tiposUsuariosSel!=null && this.tiposUsuariosSel.tutor==true" class="row"> 
          <div class="col-12 col-md-2" style="margin-top:0.8%">
            Tipos de tutorias:*
          </div>
          <div class="col-12 col-md-4">
            <select class="form-control" v-model="tipostutoriasselect" style="cursor:pointer">
              <option selected disabled hidden value="no">Selecciona un tipo de tutoria</option>
              <option v-for="(tt, i) in tipostutorias"  :key="i"   :value="tt.id_tipo_tutoria">
              {{ tt.nombre}}
              </option>
            </select>
          </div>
          <div class="col-12 col-md-4">
            <button  type="button" class="btn btn-info"                     
              style="margin-left:10px;margin:5px;border-radius: 10px;"
              @click="addMTT(i)">
              Seleccionar
            </button>
          </div>
        </div>
        <div v-if="this.tiposUsuariosSel!=null && this.tiposUsuariosSel.tutor==true" class="row">
          <div class="col-12 col-md-2" style="margin-top:0.8%">
            Tipos de tutoria seleccionados:
          </div>
          <div class="col-12 col-md-8">
            <ul class="overflow-wrap list-group list-group-flush" style="text-align:left;">
              <div v-if="listTT.length == 0">No tiene tipos de tutorias seleccionados</div>
              <li class="motivos-seleccionados list-group-item" style="text-align:left;"
                v-for="(newTT,ttIndex) in listTT"  
                :key="ttIndex">
                {{newTT}}
                <span name="remove" class="close" @click="deleteTT(ttIndex)" style="margin-right:20px;float:right;">
                  &times;
                </span>           
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div  class="botones" style="margin-top:0px;bottom:25px;padding-top:10px">   
      <button type="button" style="margin:5px;border-radius: 10px;" class="btn btn-info" id="btnGuarda" v-on:click="guardarUsuario()">Guardar</button>
      <button type="button"  class="btn btn-info" style="border-radius: 10px;border-color:gray;background-color:gray;margin-left:50px" id="btnCancela" v-on:click="cancelarUsuario()"  >Cancelar</button>  
    </div>
    <div style="bottom:5px">
      * Campos obligatorios   
    </div >
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
      facultades:null,
      facuSeleccionado:null,
      facuSeleccionadoInd:null,
      programas:null,
      progSeleccionado:null,
      progSeleccionadoInd:null,
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
      condiAlumnosselect:null,
      banderaTT:false, //Bandera para no llenar el combo box de TT y condialumnos varias veces
      banderaUsuProg:false, //Bandera que me indica que el usuario vino del listar y pertenece a mi programa
      msgUsuario:"",
      IsmsgUsuario:false,
      tiposUsuariosSel:null,
      idTutor:0,
      idAlumno:0,
      idJP:0,
      anadirNuevo:false,
    }
  },

  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
    //  console.log('usuario entrante?: ',this.usuario_entrante);
    this.IsmsgUsuario=false;
    this.msgUsuario="Assistance"
    this.listarTUsuarios();    
    this.listarCA();
    this.listarProgramas();
    this.listarFacultades();
     //console.log("numero del path",parseInt((this.$route.path).substring(10,12),10));
    if(parseInt((this.$route.path).substring(10,12),10) ==0){
      this.id_usuario_entrante=0;
      //no hay usuario entrante, pero puede que aparezca
    }
    else if (parseInt((this.$route.path).substring(10,16),10) !=0) {
      this.id_usuario_entrante=this.$store.state.usuarioEscogido.id_usuario;
      this.usuario_entrante=this.$store.state.usuarioEscogido;
      if(this.usuario_entrante.usuario_x_programas[0]){
        this.tiposUsuariosselect=this.usuario_entrante.usuario_x_programas[0].id_usuario_x_programa;  
        this.tiposUsuariosSel=this.usuario_entrante.usuario_x_programas[0].tipo_usuario;    
        if(this.usuario_entrante.usuario_x_programas[0].programa)this.progSeleccionadoInd=this.usuario_entrante.usuario_x_programas[0].programa.id_programa;   
        this.progSeleccionado=this.usuario_entrante.usuario_x_programas[0].programa;   
        for (let i = 0; i < this.usuario_entrante.usuario_x_programas.length; i++) {
            this.usuario_entrante.usuario_x_programas[i].tipo_usuario.alumno = false;
            this.usuario_entrante.usuario_x_programas[i].tipo_usuario.tutor = false;
          for (let index = 0; index < this.usuario_entrante.usuario_x_programas[i].tipo_usuario.permisos.length; index++) {
            if(this.usuario_entrante.usuario_x_programas[i].tipo_usuario.permisos[index].nombre == "Tutores"){
              this.usuario_entrante.usuario_x_programas[i].tipo_usuario.alumno = true;
            }
            if(this.usuario_entrante.usuario_x_programas[i].tipo_usuario.permisos[index].nombre == "Sesión de Tutoría"){
              this.usuario_entrante.usuario_x_programas[i].tipo_usuario.tutor = true;
              this.llenarTT();
            }
          }
        }
        if(this.usuario_entrante.usuario_x_programas[0].programa) this.listarTT(this.usuario_entrante.usuario_x_programas[0].programa.id_programa);
      }
      Axios.create()
        .post('/usuarios/listar/'+this.id_usuario_entrante).then( response =>{
          // document.getElementById("corr").disabled = true;
          // document.getElementById("cod").disabled = true;
          //  console.log('usuario listado para modificar',response);
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
        })
        .catch(e => {
          console.log('catch listar usuario entrante',e.response);
          this.hideModal();
          Swal.fire({
            text:"Estamos teniendo problemas al obtener los datos del usuario que desea modificar. Vuelve a intentar en unos minutos.",
            icon:"warning",
            confirmButtonText: 'OK',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
          }); 
          this.$store.state.usuariosA=null;
          //this.$router.push('/ListaUsuarios');          
        });

    }
    //Primero verifico que el usuario pertenece a mi programa
    //Si el tipo de usuario es tutor, cargo sus tipos de tutoras
    
    
  },
  methods:{
    listarProgramas(){
      this.axios.post('/programa/listarTodo')
        .then(response=>{
          this.programas = response.data
        })
        .catch(e=>{
          console.log(e)
        })
    },
    listarFacultades(){
      this.axios.post('/programa/facultadesProg')
        .then(response=>{
          this.facultades = response.data
        })
        .catch(e=>{
          console.log(e)
        })
    },
    ProgramaSel(){
      this.programas.forEach(element => {
        if(element.id_programa == this.progSeleccionadoInd){
          this.progSeleccionado = element;
        }
      });
      this.tipostutoriasselect="no";
      Axios.post('/TipoTutoria/listarActivos/'+ this.progSeleccionadoInd)
        // Axios.post('/TipoTutoria/listarActivos/'+ this.miprog.id_programa)  //falta que esté en el servidor
        .then(response=>{
            this.tipostutorias = response.data; //
            // console.log('Tipos de tutorias: ',this.tipostutorias);
            if(this.id_usuario_entrante!=0){
            //Despues de llenar los tipos de tutorias veo cuales son del tutor 

              for (var t_usu in this.usuario_entrante.tipo_usuario){ //t_usu es el objeto 
              //aquí verifico si es tutor del programa en el que estoy
     
              if(this.usuario_entrante.tipo_usuario[t_usu].id_tipo_usuario==4 && 
                  this.usuario_entrante.tipo_usuario[t_usu].usuario_x_programas[0].id_programa==this.miprog.id_programa ){
          //como sí es tutor en mi programa, cargo los tt
              for(var i in this.usuario_entrante.tipo_tutorias){
            
               this.listTT.push(this.usuario_entrante.tipo_tutorias[i].nombre);
               this.listTTId.push(this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria);
               this.listTTBorrados.push(this.usuario_entrante.tipo_tutorias[i]);
              // this.tipostutorias.splice(i,1);
               this.tipostutoriasselect=this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria;
            
               for(var j in this.tipostutorias){
                if(this.tipostutorias[j].id_tipo_tutoria==this.tipostutoriasselect){
                    // console.log('For:j',' ',this.tipostutorias[j].id_tipo_tutoria); 
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
    },
    TipoUs(){
      this.listTT = [];
      this.tiposUsuarios.forEach(element => {
        if(element.id_tipo_usuario == this.tiposUsuariosselect){
          this.tiposUsuariosSel = element;
        }
      });
      if(this.tiposUsuariosSel.id_programa==1)this.progSeleccionadoInd = null;
      else this.progSeleccionadoInd = this.tiposUsuariosSel.id_programa
    },
    TipoUsEl(){
      for (let index = 0; index < this.usuario_entrante.usuario_x_programas.length; index++) {
        if(this.usuario_entrante.usuario_x_programas[index].id_usuario_x_programa == this.tiposUsuariosselect){
          this.tiposUsuariosSel = this.usuario_entrante.usuario_x_programas[index].tipo_usuario
          this.progSeleccionado = this.usuario_entrante.usuario_x_programas[index].programa
          this.progSeleccionadoInd = this.usuario_entrante.usuario_x_programas[index].id_programa
        }
      }
    },
    guardarUsuario() { //Para usuarios nuevecitos más que nada, si no, se van a una función
      // this.showModal();console.log('show1');
      document.getElementById("btnGuarda").disabled = true; //inhabilita
      document.getElementById("btnCancela").disabled = true; //inhabilita

      var   expresion2=/\w+@pucp.edu.pe/;
      var   expresion1=/\w+@pucp.pe/;

      if(this.nombre=="" ||this.apellidos=="" || this.codigo=="" || this.codigo===null || this.correo=="" || this.estado===null   ){
        //Cuando está vacio todo
        Swal.fire({
          text:"No ha completado todos los campos",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        })
      }
      else if( !expresion2.test(this.correo) &&  !expresion1.test(this.correo)){
        //Verificación de correo
        Swal.fire({
          text:"No ha escrito una dirección de correo válida. Todos los correos deben contener ser dominio @pucp.edu.pe o @pucp.pe",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        }) 
       
      }
      else if(this.telefono<10000000 && this.telefono>0){
        //Esto será válido?
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
      else if( this.tiposUsuariosselect==4 &&  this.listTTId.length==0 && (this.tiposUsuariosSel!=null && this.tiposUsuariosSel.id_tipo_usuario!=5)){
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
      else if(this.progSeleccionadoInd==null && this.tiposUsuariosselect!=3 && this.tiposUsuariosselect!=2){
        Swal.fire({
          text:"Falta elegir un programa",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        })
      }
      else{
        //está bien y envío
        //primero evaluo si es alumno
        if(this.id_usuario_entrante==0){
          //Se insertar un usuario nuevecito
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
            let id_prog;
            if(this.tiposUsuariosSel.id_programa != 1){
              id_prog = this.tiposUsuariosSel.id_programa
            }
            else{
              id_prog = this.progSeleccionadoInd
            }
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
                id_programaNuevo:id_prog,
                id_tipo_usuario:this.tiposUsuariosselect, 
                usuario_creacion:this.$store.state.usuario.id_usuario,
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
                id_programaNuevo:id_prog,
                id_tipo_usuario:this.tiposUsuariosselect,
                usuario_creacion:this.$store.state.usuario.id_usuario,
                //ahora, si es tipo usuario 4 de tutor debe insertar el tipo de tutoria
              };
              this.usuarioNuevo(params);
            }   
          }
        }
        else{
          // this.hideModal();
          //if pertenece al programa
          if(this.banderaUsuProg==true){
            let id_prog;
            if(this.tiposUsuariosSel.id_programa != 1){
              id_prog = this.tiposUsuariosSel.id_programa
            }
            else{
              id_prog = this.progSeleccionadoInd
            }
            if(this.anadirNuevo!=true && this.usuario_entrante.usuario_x_programas!=null && this.usuario_entrante.usuario_x_programas[0]!=null){
              //primero evaluo si es alumno
              if(this.tiposUsuariosSel.id_tipo_usuario==5){
                const params2 = {
                  codigo:this.codigo.trim().replace(/\s+/g, ' '), 
                  nombre:this.nombre.trim().replace(/\s+/g, ' '),
                  apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
                  correo:this.correo,
                  estado:this.estado,
                  telefono:this.telefono,
                  //como es alumno inserto las condicioes
                  condicion_alumno:this.condiAlumnosselect,//le doy el value
                  id_programa:id_prog,
                  usuario_actualizacion:this.$store.state.usuario.id_usuario
                };
                this.modificarUsuario(params2);
              }
              else{
                const params2 = {
                  //Parametros modificados de usuario
                  codigo:this.codigo.trim().replace(/\s+/g, ' '), 
                  nombre:this.nombre.trim().replace(/\s+/g, ' '),
                  apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
                  correo:this.correo,
                  estado:this.estado,
                  telefono:this.telefono,
                };
                this.modificarUsuario(params2);
              }
            }
            else{
              //primero evaluo si es alumno
              if(this.tiposUsuariosselect==5){
                const params2 = {
                  codigo:this.codigo.trim().replace(/\s+/g, ' '), 
                  nombre:this.nombre.trim().replace(/\s+/g, ' '),
                  apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
                  correo:this.correo,
                  estado:this.estado,
                  telefono:this.telefono,    
                  // tengo que pasarle que modifique el tipo de rol, si el tutor id4 se modifica el tipo de tutoria
                  id_tipo_usuario_Nuevo:this.tiposUsuariosselect, 
                  id_programa:id_prog,
                  //como es alumno inserto las condicioes
                  condicion_alumno:this.condiAlumnosselect,//le doy el value
                  usuario_actualizacion:this.$store.state.usuario.id_usuario
                };
                this.modificarUsuario(params2);
              }
              else{
                const params2 = {
                  //Parametros modificados de usuario
                  codigo:this.codigo.trim().replace(/\s+/g, ' '), 
                  nombre:this.nombre.trim().replace(/\s+/g, ' '),
                  apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
                  correo:this.correo,
                  estado:this.estado,
                  telefono:this.telefono,    
                  // tengo que pasarle que modifique el tipo de rol, si el tutor id4 se modifica el tipo de tutoria
                  id_tipo_usuario_Nuevo:this.tiposUsuariosselect, 
                  id_programa:id_prog,
                  usuario_actualizacion:this.$store.state.usuario.id_usuario
                };
                this.modificarUsuario(params2);
              }
            }
            
          }
          
      }
      // this.hideModal();console.log('Hide1');
      }
      document.getElementById("btnGuarda").disabled = false; //habilita
      document.getElementById("btnCancela").disabled = false; //habilita
    },
    llenarTT(){
      this.axios.post('/usuarios/tutoriaTutor',{idTutor: this.usuario_entrante.id_usuario, id_programa:this.progSeleccionadoInd})
        .then(response=>{
          response.data.forEach(element => {
            this.listTT.push(element.nombre)
          });
        })
        .catch(e=>{
          console.log(e)
        })
      
    },
    listarTUsuarios() {
      this.axios.post('/tipoUsuarios/listarTodo')
        .then(res=>{
          //Ordenadito
          let par=res.data;
          //  console.log('TUsu:',res.data);
          this.tiposUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
          this.tiposUsuarios.forEach(element => {
            element.alumno = false;
            element.tutor = false;
            for (let index = 0; index < element.permisos.length; index++) {
              if(element.permisos[index].nombre == "Tutores"){
                element.alumno = true;
              }
              if(element.permisos[index].nombre == "Sesión de Tutoría"){
                element.tutor = true;
              }
            }
          });
          this.hideModal()
        })
        .catch(e=>{
          console.log(e)
          this.hideModal()
        });

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
        })
        .then((result) => {
          if (result.value) {
            //lo redirigo
            //this.$store.state.usuarios=null;
            this.$store.state.usuarioEscogido=null;
            this.$store.state.usuariosA = null;
            this.$router.push('/AListaUsuarios');
          } 
        })
        
    },
    listarTT(id) {
      if(this.banderaTT==false){
        this.banderaTT=true;
      //listo todos los tipos de tutorias de mi programa
      Axios.post('/TipoTutoria/listarActivos/'+ id)
      // Axios.post('/TipoTutoria/listarActivos/'+ this.miprog.id_programa)  //falta que esté en el servidor
        .then(response=>{
            this.tipostutorias = response.data; //
            // console.log('Tipos de tutorias: ',this.tipostutorias);
            if(this.id_usuario_entrante!=0){
            //Despues de llenar los tipos de tutorias veo cuales son del tutor 

              for (var t_usu in this.usuario_entrante.tipo_usuario){ //t_usu es el objeto 
              //aquí verifico si es tutor del programa en el que estoy
     
              if(this.usuario_entrante.tipo_usuario[t_usu].id_tipo_usuario==4 && 
                  this.usuario_entrante.tipo_usuario[t_usu].usuario_x_programas[0].id_programa==this.miprog.id_programa ){
          //como sí es tutor en mi programa, cargo los tt
              for(var i in this.usuario_entrante.tipo_tutorias){
            
               this.listTT.push(this.usuario_entrante.tipo_tutorias[i].nombre);
               this.listTTId.push(this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria);
               this.listTTBorrados.push(this.usuario_entrante.tipo_tutorias[i]);
              // this.tipostutorias.splice(i,1);
               this.tipostutoriasselect=this.usuario_entrante.tipo_tutorias[i].id_tipo_tutoria;
            
               for(var j in this.tipostutorias){
                if(this.tipostutorias[j].id_tipo_tutoria==this.tipostutoriasselect){
                    // console.log('For:j',' ',this.tipostutorias[j].id_tipo_tutoria); 
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
        let id_prog;
        if(this.tiposUsuariosSel.id_programa != 1){
          id_prog = this.tiposUsuariosSel.id_programa
        }
        else{
          id_prog = this.progSeleccionadoInd
        }

        const paramsTT={
          id_programa:id_prog,
          tutorias_insertar:this.listTTId,
        }
        //actualizo el tipo de tutoria
        Axios.post('/usuarios/updateTipoTutoria/'+i ,paramsTT)
        .then(response=>{
          response
          this.$store.state.usuarioEscogido=null;
          this.$store.state.usuariosA = null;        
          this.$router.push('/AListaUsuarios');
        })
        .catch(e=>{
          console.log('catch del updateTT modificando usuario:',e)
        });
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
          // this.showModal();console.log('show2');
          
            const paramsV={
              criterio:this.codigo,
            }
            
            Axios.post('/usuarios/verificarUsuario' ,paramsV)
            .then(response=>{
             //Si es código ya existe
              // console.log('respuesta verif cod: ',response);
             if(response.data.status=='El codigo ingresado ya existe'){
               
               //Le aviso al usuario y lleno los campos
                //el id tambien llenaría
                document.getElementById("nomb").disabled = true; 
                document.getElementById("apel").disabled = true; 
                this.id_usuario_entrante=response.data.usuario[0].id_usuario;
                //this.codigo=response.data.codigo;
                this.usuario_entrante= response.data.usuario[0];
                this.correo=response.data.usuario[0].correo;
                this.nombre= response.data.usuario[0].nombre;
                this.apellidos=response.data.usuario[0].apellidos;               
                this.telefono=response.data.usuario[0].telefono;
                this.estado=response.data.usuario[0].estado; 
                // console.log('existente: ',this.usuario_entrante);
                //Su tipo de usuario falta llenar
                
                this.msgUsuario="Usuario existente";
                this.IsmsgUsuario=true;
                this.tiposUsuariosselect="no";
                // this.hideModal();

             }
             else if(response.data.status=='Codigo o correo no encontrado' || response.data.status=='El correo ingresado ya existe'){
              //  debería poder continuar con mi vida sin decirle nada al usuario
              //o pongo un texto debajo del código que diga que el usuario es nuevo...con un v-if y una bandera
              // this.hideModal();
                if (this.IsmsgUsuario==true){
                  this.nombre = ''
                  this.apellidos = ''
                  this.telefono = ''
                  this.correo = ''
                  this.id_usuario_entrante = 0
                }
                document.getElementById("corr").disabled = false;
                document.getElementById("apel").disabled = false; 
                document.getElementById("nomb").disabled = false;  
                this.IsmsgUsuario=false;
             }
           


            })
            .catch(e=>{console.log('catch del verificarCodigo',e); 
            // this.hideModal();
             }
              );

         

        }
        else{
          // console.log('Menos o más 8 digitos');
          if (this.IsmsgUsuario==true){
            this.nombre = ''
            this.apellidos = ''
            this.telefono = ''
            this.correo = ''
            this.IsmsgUsuario=false
            this.id_usuario_entrante = 0
          }
        }

    },
    verificarUsuariosCorreo(){
      //Verificación de correo
       var   expresion2=/\w+@\w+\.+edu.pe/;
       var   expresion1=/\w+@\w+\.+pe/;
      if( (expresion2.test(this.correo) || expresion1.test(this.correo) ) && this.banderaUsuProg==false){ 
        
        // this.showModal();console.log('show3');
        //es un correo "válido",entonces llamo para verificar si existe o no
        // console.log('Verif correo');
        const paramsV={
              criterio:this.correo,
        }
        Axios.post('/usuarios/verificarUsuario' ,paramsV)
          .then(response=>{
            //Si es ccorreo ya existe
            if(response.data.status=='El correo ingresado ya existe'){
              //Le aviso al usuario y lleno los campos
              //el id tambien llenaría
              // console.log(response.data.usuario[0].codigo);//sí sale el codigo
              // console.log('entre a if de verf correo');
              //console.log(this.usuario_entrante.codigo); //No existe,ni idea
              document.getElementById("apel").disabled = true; 
              document.getElementById("nomb").disabled = true;                 
              //No puedo agregar un usuario con código  - o null
              this.id_usuario_entrante=response.data.usuario[0].id_usuario;                
              this.usuario_entrante= response.data.usuario[0];
              this.codigo=response.data.usuario[0].codigo;
              this.nombre= response.data.usuario[0].nombre;
              this.apellidos=response.data.usuario[0].apellidos;               
              this.telefono=response.data.usuario[0].telefono;
              this.estado=response.data.usuario[0].estado; 
              // console.log('existente: ',this.usuario_entrante);
              //tipo de usuarip
              this.msgUsuario="Usuario existente";
              this.IsmsgUsuario=true;
              this.tiposUsuariosselect="no";
              // this.hideModal();

            }
            else if(response.data.status=='Codigo o correo no encontrado' || response.data.status=='El codigo ingresado ya existe'){
            //  debería poder continuar con mi vida sin decirle nada al usuario
            //o pongo un texto debajo del código que diga que el usuario es nuevo...con un v-if y una bandera
              if (this.IsmsgUsuario==true){
                this.nombre = ''
                this.apellidos = ''
                this.telefono = ''
                this.codigo = ''
                this.id_usuario_entrante = 0
              }
              document.getElementById("corr").disabled = false;
              document.getElementById("apel").disabled = false; 
              document.getElementById("nomb").disabled = false;  
              this.IsmsgUsuario=false;
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
        if (this.IsmsgUsuario==true){
          this.nombre = ''
          this.apellidos = ''
          this.telefono = ''
          this.codigo = ''
          this.IsmsgUsuario = false
          this.id_usuario_entrante = 0
        }
      }
    },
    usuarioNuevo(params){
      Axios.post('/usuarios/insertar',params)
        .then( response=>{
          if(response.data["Error capturado:"]=="El codigo o correo ingresados ya existen"){
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
            "nombre": response.data.user.nombre,
            "mensaje": "Se te creó un nuevo usuario en el programa de tutoría Assistance. Ingresa con la contraseña: '12345' <br><br>Entra a este <a href="+direccion+">link</a> "+direccion,
            "correo": response.data.user.correo
            }, 'user_ySzIMrq3LRmXhtVkmpXAA')
            .then((result) => {
                console.log('SUCCESS!', result.status, result.text);
            }, (error) => {
                console.log('FAILED...', error);
            });
            Swal.fire({
              text:"Se guardaron los datos con éxito",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
            if(this.tiposUsuariosselect==2 || this.tiposUsuariosselect==3){
              this.axios.post('/usuarios/veificarCoordinador',{
                id_programa:params.id_programaNuevo,
                tipo_usuario:this.tiposUsuariosselect,
                id_usuario: response.data.user.id_usuario,
                nuevo: 1})
                .then(response=>{
                  response
                })
                .catch(e=>{
                  console.log(e)
                })
            }
            //Como se guardaron con éxito ahora agrego el titutoria
            if(this.tiposUsuariosSel!=null && this.tiposUsuariosSel.tutor==true){
              var idusuarionuevo=response.data["user"].id_usuario;
              // console.log('id del usuario nuevo: ',response.data["user"].id_usuario);
              this.actualizarTT(idusuarionuevo);//tiene hide?
            }
            this.$store.state.usuarioEscogido=null;//
            this.$store.state.usuariosA = null;
            this.$router.push('/AListaUsuarios');
            // this.hideModal();
            // //ahora va a estar en el actualizarTT
          }
        })
        .catch(e => {
          console.log('catch insertar usuario nuevo',e);
          Swal.fire({
            text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
            icon:"warning",
            confirmButtonText: 'OK',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
          });
          this.$store.state.usuariosA=null;
        });
    },
    modificarUsuario(params2){
      //pertenezco al método guardar usuario
      //Ya existe un id del usuario
      this.showModal();
      Axios.post('/usuarios/modificar/'+this.id_usuario_entrante,params2)
        .then( response=>{
          console.log('data Modificar: ',response.data);
          if(response.data.id_usuario!=null){ //Entonces pregunto primero si es un objeto con algún atributo al azar
            // console.log('entro a data.id pq es true');
            // this.hideModal();
            Swal.fire({
              text:"Se modificaron los datos con éxito",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            }) 
            //Como se guardaron con éxito ahora agrego el titutoria, solo si tiene demonios
            // console.log('params2 ',params2.id_tipo_usuario_Nuevo);
            //Si es tutor actualizo el tt
            if(this.usuario_entrante.usuario_x_programas[0]){
              if(params2.id_programa || this.tiposUsuariosselect==2 || this.tiposUsuariosselect==3 ){
                let existe = false;
                if(params2.id_programa){
                  for (let index = 0; index < this.usuario_entrante.usuario_x_programas.length; index++) {
                    if(this.usuario_entrante.usuario_x_programas[index].id_programa == this.progSeleccionadoInd){
                      existe = true;
                      break;
                    }
                  }
                  if(!existe){
                    let obj ={
                      id_tipo_usuario:this.tiposUsuariosselect, 
                      id_programa:params2.id_programa,
                    }
                    if(this.tiposUsuariosselect==2 || this.tiposUsuariosselect==3){
                      this.axios.post('/usuarios/veificarCoordinador',{
                        id_programa:params2.id_programa,
                        tipo_usuario:this.tiposUsuariosselect,
                        id_usuario:this.id_usuario_entrante,
                        nuevo: 0})
                        .then(response=>{
                          response
                            this.axios.post('/usuarios/nuevoPrograma/'+this.usuario_entrante.id_usuario,obj)
                              .then(response=>{
                                response
                                
                              })
                              .catch(e=>{
                                console.log(e)
                              })
                        })
                        .catch(e=>{
                          console.log(e)
                        })
                    }
                    else{
                      this.axios.post('/usuarios/nuevoPrograma/'+this.usuario_entrante.id_usuario,obj)
                        .then(response=>{
                          response
                        })
                        .catch(e=>{
                          console.log(e)
                        })
                    }
                  }
                }
                else{
                  let obj ={
                    id_tipo_usuario:this.tiposUsuariosselect, 
                    id_programa:null,
                  }
                  this.axios.post('/usuarios/nuevoPrograma/'+this.usuario_entrante.id_usuario,obj)
                    .then(response=>{
                      response
                    })
                    .catch(e=>{
                      console.log(e)
                    })
                }
              }
            }
            else{
              if(params2.id_programa || this.tiposUsuariosselect==2 || this.tiposUsuariosselect==3 ){
                let obj ={
                  id_tipo_usuario:this.tiposUsuariosselect, 
                  id_programa:params2.id_programa,
                }
                if(this.tiposUsuariosselect==2 || this.tiposUsuariosselect==3){
                  this.axios.post('/usuarios/veificarCoordinador',{
                    id_programa:params2.id_programa,
                    tipo_usuario:this.tiposUsuariosselect,
                    id_usuario:this.id_usuario_entrante,
                    nuevo: 0
                  })
                  .then(response=>{
                    response
                    this.axios.post('/usuarios/nuevoPrograma/'+this.usuario_entrante.id_usuario,obj)
                    .then(response=>{
                      response
                      
                    })
                    .catch(e=>{
                      console.log(e)
                    })
                  })
                  .catch(e=>{
                    console.log(e)
                  })
                }
                else{
                  this.axios.post('/usuarios/nuevoPrograma/'+this.usuario_entrante.id_usuario,obj)
                  .then(response=>{
                    response
                  })
                  .catch(e=>{
                    console.log(e)
                  })
                }
              }
            }
            if(this.tiposUsuariosSel!=null && this.tiposUsuariosSel.tutor!=false){
              this.actualizarTT(this.id_usuario_entrante);
              //  this.hideModal();
            }
            else{
              this.$store.state.usuariosA = null;
              this.$router.push('/AListaUsuarios');
            }
            this.$store.state.usuarioEscogido=null;
          }
          else if(response.data.substring(0,20)=='Excepción capturada:'){ //Luego pregunto si es este tipo de excepcion
            // console.log('no entro a data.id y entro a excepcion');
            this.hideModal()
            Swal.fire({
              text:"Ha ingresado un código o correo que ya existe. Corrígalo,por favor.",
              icon:"warning",
              confirmButtonText: 'Sí',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
          }
          
        })
        .catch(e => {
          this.hideModal();
          console.log(e);
          Swal.fire({
            text:"Estamos teniendo problemas al modificar al usuario. Vuelve a intentar en unos minutos.",
            icon:"warning",
            confirmButtonText: 'Ok',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
          })
        });

        
    },
    eliminarTipo(){
      Swal.fire({
        text: '¿Desea eliminar el tipo de usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0097A7',
        cancelButtonColor: '#757575',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.showModal();
      let obj = {
        id_usuario: this.id_usuario_entrante,
        tipo_usuario: this.tiposUsuariosSel.id_tipo_usuario,
        id_programa: this.progSeleccionadoInd
      }
      Axios.post('/usuarios/eliUsuarioPrograma',obj)
        .then( response=>{
          response
          this.hideModal();
          Swal.fire({
            text:"Eliminación Exitosa",
            icon:"success",
            confirmButtonText: 'Ok',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
          });
          this.$store.state.usuariosA=null;
          this.$router.push('/AListaUsuarios');
        })
        .catch(e => {
          console.log('catch eliminar',e);
          this.hideModal();
          Swal.fire({
            text:"Estamos teniendo problemas al insertar este usuario a su programa. Vuelve a intentar en unos minutos.",
            icon:"warning",
            confirmButtonText: 'Ok',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
          });
          this.$store.state.usuariosA=null;
          this.$router.push('/AListaUsuarios');
        });
        }
      })
    },
    listarCA(){
      Axios.create()
        .post('/usuarios/condAlumno')
        .then( response=>{
          this.condiAlumnos=response.data;
        })
        .catch(e => {
          console.log(e);
          Swal.fire({
            text:"Estamos teniendo problemas al listar las condiciones del alumno. Vuelve a intentar en unos minutos.",
            icon:"warning",
            confirmButtonText: 'Ok',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
          });                  
        });
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