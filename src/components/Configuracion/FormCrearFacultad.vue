<template>
  <div class="FormCrearFacultad">

    <div style="text-align: left;margin-left:5%">
      <!--<div class="top-title title-container" style="text-align:right">
        <button type="button" class="btn btn-info" style="margin-left:30px" v-on:click="guardarFacultad()">Guardar</button>
            
            <router-link to="/facultad">
              <button type="button" class="btn btn-secondary" style="margin-left:30px">Cancelar</button>
            </router-link>
      </div>-->
        <b-container fluid>
          <b-row class="my-1"  style="text-align: right">
              <b-col class="col-12 col-md-12" style=";margin-top:5%">
                <button type="button" class="btn btn-info"  v-on:click="guardarFacultad()">Guardar</button>
                
                <router-link to="/facultad">
                  <button type="button" class="btn btn-secondary" style="margin-left:20px">Cancelar</button>
                </router-link>
              </b-col>
          </b-row>
          <b-row class="my-1">
              <b-col sm="3">
              <label>Código de la Facultad:*</label>
              </b-col>
              <b-col sm="9">
              <b-form-input v-if="idFacultad" id="codigoF" v-model="codVerifF"></b-form-input>
              <b-form-input v-else id="codigoF" v-model="codVerifF"></b-form-input>

              </b-col>

          </b-row>
          <b-row class="my-1">
              <b-col sm="3">
              <label>Nombre de la Facultad:*</label>
              </b-col>
              <b-col sm="9">
              <b-form-input v-if="idFacultad" id="nombreF" v-model="nombreVerifF"></b-form-input>
              <b-form-input v-else id="nombreF" v-model="nombreVerifF"></b-form-input>

              </b-col>

          </b-row>
          <b-row class="my-1">
              <b-col sm="3">
              <label>Correo Electrónico:*</label>
              </b-col>
              <b-col sm="9">
              <b-form-input id="correoF" v-model="facultad.correo"></b-form-input>
              </b-col>
          </b-row>
          <b-row class="my-1">
              <b-col sm="3">
              <label>Coordinador de Facultad:</label>
              </b-col>
              <b-col sm="8">
              <b-form-input id="idCoordinadorF" readonly v-if="facultad.coordinador!=null" v-model="facultad.coordinador.nombCompleto" ></b-form-input>
              <b-form-input id="idCoordinadorF" readonly v-else></b-form-input>
              </b-col>

              <b-col sm="1">
              <b-col sm="1">
              <modalJ2 v-on:childToParentFacu="onChildClickFacu" tipoF="Facultad"/>            
              </b-col>
              </b-col>
          </b-row>
          <b-row></b-row>


          </b-container>
          <br>

          <b-container fluid>
          <b-row>
              
              <h4 class="font-weight-bold">Programas de la Facultad:</h4>
              <b-col sm="12" style="text-align: right">
              <b-button v-if="nuevoProg==0 && editProg==0" class="btn btn-info" style="margin-left:50px" type="submit" v-on:click="agregarPrograma()">Añadir Programa</b-button>
              <b-button v-if="nuevoProg==1 || editProg==1" class="btn btn-info" style="margin-left:50px" type="submit" v-on:click="guardarPrograma()">Guardar Programa</b-button>
              </b-col>
          </b-row>
          <b-row class="my-1">
              <b-col sm="3">
              <label>Código del Programa:*</label>
              </b-col>
              <b-col sm="9">
              <b-form-input v-if="nuevoProg==1 || editProg==1" id="codigoP" v-model="codVerifP"></b-form-input>
              <b-form-input v-else readonly id="codigoP" v-model="codVerifP"></b-form-input>
              </b-col>

          </b-row>
          <b-row class="my-1">
              <b-col sm="3">
              <label>Nombre del Programa:*</label>
              </b-col>
              <b-col sm="9">
              <b-form-input v-if="nuevoProg==1 || editProg==1" id="nombreP" v-model="nombreVerifP"></b-form-input>
              <b-form-input v-else readonly id="nombreP" v-model="nombreVerifP"></b-form-input>
              </b-col>

          </b-row>
          <b-row class="my-1">
              <b-col sm="3">
              <label>Correo Electrónico:*</label>
              </b-col>
              <b-col sm="9">
              <b-form-input v-if="nuevoProg==1 || editProg==1" id="correo" v-model="programa.correo"></b-form-input>
              <b-form-input v-else readonly id="correo" v-model="programa.correo"></b-form-input>
              </b-col>
          </b-row>
          <b-row class="my-1">
              <b-col sm="3">
              <label>Coordinador de Programa:</label>
              </b-col>
              <b-col sm="8">
              <b-form-input id="idCoordinador" readonly v-if="programa.coordinador!=null" v-model="programa.coordinador.nombCompleto" ></b-form-input>
              <b-form-input id="idCoordinador" readonly v-else></b-form-input>
              </b-col>

              <b-col sm="1">
              <modalJ v-on:childToParentProg="onChildClickProg"/>
              </b-col>
          </b-row>
          <br>


        
        </b-container>
        <div style="overflow: auto;width:100%;">
          <table class="table">
              <thead>
              <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Código</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Coordinador</th>
                  <th scope="col" style="text-align: center">Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in programas" :key="index">
                  <th scope="row">{{index+1}}</th>
                  <td >{{item.codigo}}</td>
                  <td >{{item.nombre}}</td>
                  <td >{{item.correo}}</td>
                  <td v-if="item.coordinador!=undefined">{{item.coordinador.nombre+" "+item.coordinador.apellidos}}</td>
                  <td v-else>Sin coordinador</td>
                  <td style="text-align: center">
                    <button class="btn link" v-on:click="Editar(item, index)"><b-icon icon="pencil"></b-icon></button>
                    <button class="btn link" v-on:click="Eliminar(index, item)"><b-icon icon="dash-circle-fill"></b-icon></button>
                  </td>
              </tr>
              </tbody>
          </table>
        </div>
        
    </div>

    <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando... 
      </div>
      </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import modalJ from '@/components/ModalProg.vue'
import modalJ2 from '@/components/Modal.vue'
import lodash from 'lodash'
import Vue from 'vue'
import {MultiSelectPlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(MultiSelectPlugin);
import Swal from 'sweetalert2'

export default {

  data(){
    return{
      nuevoProg:0,
      editProg:0,
      idFacultad: 0,
      facultad:{
          id_facultad:null,
          id_programa:null,
          id_institucion:1,
          codigo:"",
          usuario_actualizacion:this.$store.state.usuario.id_usuario,
          usuario_creacion:this.$store.state.usuario.id_usuario,
          nombre:"",
          descripcion:"",
          correo:"",
          coordinador:null
      },
      //para crear facultad
      programas:[],
      //para editar facultad
      progeliminar:[],
      progactualizar:[],
      progagregar:[],
      //////
      programa:{
          index:0,
          id_programa:0,
          id_facultad:null,
          nombre:null,
          codigo:null,
          usuario_actualizacion:this.$store.state.usuario.id_usuario,
          usuario_creacion:this.$store.state.usuario.id_usuario,
          descripcion:null,
          correo:null,
          coordinador:null
      },
      coordinadorSeleccionado:null,
      tipoCoord:"",

      //verificar Codigo y nombre de Facultad
      codVerifF: "",
      existeCodF:false,
      nombreVerifF: "",
      existeNomF:false,

      //verificar Codigo y nombre de Programa
      codVerifP: "",
      existeCodP:false,
      nombreVerifP: "",
      existeNomP:false,
      

    }
  },
  components:{
    modalJ,
    modalJ2
  },
  
  watch:{
      codVerifF: function (){
        this.debouncedGetAnswerCF()
      },
      nombreVerifF: function (){
        this.debouncedGetAnswerNF()
      },
      codVerifP: function (){
        this.debouncedGetAnswerCP()
      },
      nombreVerifP: function (){
        this.debouncedGetAnswerNP()
      },

  },
  
  created: function(){
    this.debouncedGetAnswerCF = lodash.debounce(this.getExisteCodF, 500)
    this.debouncedGetAnswerNF = lodash.debounce(this.getExisteNomF, 500)
    this.debouncedGetAnswerCP = lodash.debounce(this.getExisteCodP, 500)
    this.debouncedGetAnswerNP = lodash.debounce(this.getExisteNomP, 500)
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    if(this.$store.state.facultadEscogida) {
      this.showModal()
      this.idFacultad=this.$store.state.facultadEscogida.id_facultad;
      this.obtenerDatos();
    }else{
      this.idFacultad=0;
    }
  },

  methods:{
    getExisteCodF: function(){
      axios.create()
        .post('/facultad/verificarCod/'+this.idFacultad,this.codVerifF)
          .then( response=>{
            this.existeCodF = response.data.success;
            this.hideModal();
          })
          .catch(e => {
            console.log(e.response);
          })
    },

    getExisteNomF: function(){
      axios.create()
        .post('/facultad/verificarNom/'+this.idFacultad,this.nombreVerifF)
          .then( response=>{
            this.existeNomF = response.data.success;
          })
          .catch(e => {
            console.log(e.response);
          })
    },
    getExisteCodP: function(){
      axios.create()
        .post('/programa/verificarCod/'+this.programa.id_programa,this.codVerifP)
          .then( response=>{
            this.existeCodP = response.data.success;
            this.hideModal();
          })
        .catch(e => {
          console.log(e.response);
        })
    },

    getExisteNomP: function(){
      axios.create()
        .post('/programa/verificarNom/'+this.programa.id_programa,this.nombreVerifP)
          .then( response=>{
            this.existeNomP = response.data.success;
            this.hideModal();
          })
        .catch(e => {
          console.log(e.response);
        })
    },

    obtenerDatos() {
      this.showModal()
      axios.post('/facultad/listar/'+this.idFacultad)
        .then(response=>{
          this.facultad.id_facultad = response.data[0].id_facultad;
          this.facultad.id_programa = response.data[0].id_programa;
          this.codVerifF=response.data[0].codigo;
          this.nombreVerifF=response.data[0].nombre;
          this.facultad.correo = response.data[0].correo;
          this.facultad.descripcion=response.data[0].descripcion;

          axios.post('/programa/listarConCoord/'+ this.facultad.id_facultad)
            .then(response=>{
              for (let index = 0; index < response.data.length; index++) {
                var prog= new Object()
                prog=response.data[index].programa;
                prog.coordinador=response.data[index].coordinador;
                this.programas.push(prog);
              }
            })
            .catch(e=>console.log(e));

          axios.post('/facultad/coordinadorFacultad/'+this.facultad.id_programa)
            .then(response=>{
              if(response.data[0]){
                this.facultad.coordinador=response.data[0];
                this.facultad.coordinador.nombCompleto=response.data[0].nombre+" "+response.data[0].apellidos;
              }
              this.hideModal();
            })
            .catch(e=>{
              console.log(e)
              this.hideModal();
            });
        })
        .catch(e=>{
          console.log(e)
          this.hideModal();
        });

    },

    guardarFacultad() {
      this.facultad.codigo=this.codVerifF;
      this.facultad.nombre=this.nombreVerifF;
      var   expresion2=/\w+@\w+\.+edu.pe/;
      var   expresion1=/\w+@\w+\.+pe/;
      if(this.facultad.nombre =="" || this.facultad.codigo =="" || this.facultad.correo==""){
        Swal.fire({
          text:"No ha completado todos los campos obligatorios",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        }) 
      }else if(this.existeCodF==true){
        Swal.fire({
          text:"El código de facultad "+ this.codVerifF+" ya existe",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        }) 
      }else if(this.existeNomF==true){
        Swal.fire({
          text:"El nombre de facultad "+ this.nombreVerifF+" ya existe",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        }) 

      }else if( !expresion2.test(this.facultad.correo) &&  !expresion1.test(this.facultad.correo)){ //Verificación de correo
        Swal.fire({
          text:"No ha escrito una dirección de correo válida. Todos los correos deben contener ser dominio @pucp.edu.pe o @pucp.pe",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        }) 
      }else{

        if(this.$store.state.facultadEscogida){
          this.showModal();
          //modifico la facultad, debo considerar progactualizar, progeliminar, progagregar
          this.facultad.usuario_actualizacion=this.$store.state.usuario.id_usuario;
          axios.create()
            .post('/facultad/modificar/'+this.facultad.id_facultad,this.facultad)
              .then( response=>{
                response
              })
              .catch(e => {
                console.log(e.response);
              })
            if(this.facultad.coordinador){
              const params = {
                id_usuario: this.facultad.coordinador.id_usuario,
                id_programa: this.facultad.id_programa
              };
              axios.create()
                .post('/facultad/asignarCoordi',params)
                  .then( response=>{
                    response
                  })
                .catch(e => {
                  console.log(e.response);
                })
            }
            
          axios.create()
            .post('/programa/insertarVariosPro',this.progagregar)
              .then( response=>{
                response
              })
            .catch(e => {
              console.log(e.response);
            })
          axios.create()
            .post('/programa/eliminarVariosPro',this.progeliminar)
              .then( response=>{
                response
              })
            .catch(e => {
              console.log(e.response);
            })
          axios.create()
            .post('/programa/actualizarVariosPro',this.progactualizar)
              .then( response=>{
                response
                this.hideModal();
                Swal.fire({
                  text:"Guardado Exitosa",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                })
                this.$router.push('/facultad');
              })
              
            .catch(e => {
              console.log(e.response);
                this.hideModal();
            })


        }
        else{
          this.showModal();
          //creo una facultad con la data final construida
          //falta colocarle el insertar coordinador a cada programa
          axios.create()
            .post('/facultad/insertar',this.facultad)
              .then( response=>{
                this.facultad.id_facultad=response.data.id_facultad;
                this.facultad.id_programa=response.data.id_programa;

                if(this.facultad.coordinador){
                  const params = {
                    id_usuario: this.facultad.coordinador.id_usuario,
                    id_programa: this.facultad.id_programa
                  };
                  axios.create()
                    .post('/facultad/asignarCoordi',params)
                      .then( response=>{
                        response
                      })
                    .catch(e => {
                      console.log(e.response);
                    })
                }
                
                for(var i=0; i<this.programas.length; i++){
                  this.programas[i].id_facultad=this.facultad.id_facultad;
                }
                axios.create()
                  .post('/programa/insertarVariosPro',this.programas)
                    .then( response=>{
                      response
                      this.hideModal();
                      Swal.fire({
                        text:"Guardado Exitosa",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                      })
                    
                      this.$router.push('/facultad');

                    })
                    .catch(e => {
                      console.log(e.response);
                      this.hideModal();
                    })
              })
              .catch(e => {
                console.log(e.response);
                this.hideModal();
              })
        }
        }

      

    },
    guardarPrograma(){
      this.programa.codigo=this.codVerifP;
      this.programa.nombre=this.nombreVerifP;
      var  expresion2=/\w+@\w+\.+edu.pe/;
      var  expresion1=/\w+@\w+\.+pe/;

      if(this.programa.nombre ==null || this.programa.codigo ==null || this.programa.correo==null){
         Swal.fire({
              text:"No ha completado todos los campos obligatorios de un programa",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 
      }else if(this.existeCodP==true){
         Swal.fire({
              text:"El código de programa "+ this.codVerifP+" ya existe",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 
      }else if(this.existeNomP==true){
         Swal.fire({
              text:"El nombre de programa "+ this.nombreVerifP+" ya existe",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 

      }else if( !expresion2.test(this.programa.correo) &&  !expresion1.test(this.programa.correo)){ //Verificación de correo
          Swal.fire({
      
              text:"No ha escrito una dirección de correo válida. Todos los correos deben contener ser dominio @pucp.edu.pe o @pucp.pe",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 
      }else{
        var prog= new Object();
        prog.id_facultad=this.facultad.id_facultad;
        prog.id_programa=this.programa.id_programa;
        prog.codigo=this.programa.codigo;
        prog.usuario_actualizacion=this.programa.usuario_actualizacion,
        prog.usuario_creacion=this.programa.usuario_creacion,
        prog.nombre=this.programa.nombre;
        prog.correo=this.programa.correo;
        prog.coordinador=this.programa.coordinador;

        if(this.idFacultad){
          //si estoy modificando una facultad ya existente
          if(this.nuevoProg==1){
            this.progagregar.push(prog);
            this.programas.push(prog);
            
          }else if(this.editProg==1){
            this.progactualizar.push(prog);
            this.programas[this.programa.index]=prog;
          }
        }else{
          //modifico los programas mientras creo la facultad
          if(this.nuevoProg==1){
            this.programas.push(prog);
          }else if(this.editProg==1){
            this.programas[this.programa.index]=prog;
          }
        }

        this.programa.id_programa=0;
        this.programa.id_facultad=null;
        this.programa.nombre=null;
        this.programa.descripcion=null;
        this.programa.correo=null;
        this.programa.codigo=null;
        this.programa.coordinador=null;
        this.nombreVerifP="";
        this.codVerifP="";
        this.nuevoProg=0;
        this.editProg=0;
      }
    },
    agregarPrograma(){
      this.nuevoProg=1;
    },
    onChildClickProg (value) {
      this.programa.coordinador=value;
      this.programa.coordinador.nombCompleto=value.nombre+" "+value.apellidos;

    },
    onChildClickFacu (value) {
      this.facultad.coordinador=value;  
      this.facultad.coordinador.nombCompleto=value.nombre+" "+value.apellidos;

    },
    Eliminar(ind, item){
      Swal.fire({
          title: '¿Desea eliminar el programa'+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.programas.splice(ind,1 );
            if(this.$store.state.facultadEscogida){
              item.usuario_actualizacion=this.$store.state.usuario.id_usuario;
              this.progeliminar.push(item);
            }

          }
        })
      
    },
    Editar(item, index){
      this.editProg=1;
      this.programa.index=index;
      this.programa.nombre=item.nombre;
      this.programa.correo=item.correo;
      this.programa.codigo=item.codigo;

      this.nombreVerifP=this.programa.nombre;
      this.codVerifP=this.programa.codigo;

      if(item.coordinador!=null){
        this.programa.coordinador=item.coordinador;
        this.programa.coordinador.nombCompleto=item.coordinador.nombre+" "+item.coordinador.apellidos;  
      }
      this.programa.id_facultad=item.id_facultad;
      this.programa.id_programa=item.id_programa;
    },
		showModal() {
			this.$refs['my-modal'].show()
		},
		hideModal() {
			this.$refs['my-modal'].hide()
		},
  }
}
</script>

<style scoped>

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    text-align-last: left;
    margin-bottom:1.3em;

}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}

</style>