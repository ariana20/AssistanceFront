<template>
  <div class="FormTiposTutoria contenedor" style="margin-top:2%">
    <div style="margin-left:1%" >
      <div class="row">
        <div class="col-12 col-md-4 col-lg-1 form-inline">
          Nombre:*
        </div>
        <div class="col-11 col-md-6 col-lg-5">
          <input maxlength="100" style="margin-top:2%;border: 0.5px solid #757575;outline: none;box-shadow: none;  " class=" form-control" type="text" v-model="tipotutoria.nombre">
         
        </div>
      </div>
      <div class="row" style="margin-top:1%">
        <div class="col-12 col-md-4 col-lg-1 form-inline">
          Descripción:
        </div>
        <div class="col-11 col-md-6 col-lg-5">
          <textarea rows=3 cols=40     
              style="   border-radius: 1.25rem;    border: 1px solid #757575;  
             margin-bottom: 10px;     width: 100%;     box-shadow: none;     color: #495057;" 
             type="text" v-model="tipotutoria.descripcion"/>
        </div>
      </div>

      <div class="row" style="margin-top:1%;text-align:left">
        <div class="col-12 col-md-6 col-lg-1">
          Condiciones:*
        </div>
        <!-- <button type="button" class="btn btn-secondary" style="border-radius: 0px" v-on:click="mostrarModalAyuda()">Ayuda</button> -->
     
        <div class="col-sm-12 offset-sm-1" style="margin-top:2%">
          <div class="row">
            <div class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input type="radio" style="font-size: 22px" id="yes" value="1" v-model="tipotutoria.individual">
                </div>
                <div class="col-10" >
                  <label style="text-indent:5px" >{{indgru[0].text}}</label>
                </div>
              </div>
            </div>
            <div class="col-7 col-sm-6 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input  type="radio" id="no" value="0" v-model="tipotutoria.individual">
                </div>
                <div class="col-10" >
                  <label style="text-indent:5px" >{{indgru[1].text}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 offset-sm-1">
          <div class="row">
            <div class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input type="radio" id="yes" value="1" v-model="tipotutoria.obligatorio">
                </div>
                <div class="col-10">
                  <label style="text-indent:5px" >{{oblopc[0].text}}</label>
                </div>
              </div>
            </div>
            <div class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input  type="radio" id="no" value="0" v-model="tipotutoria.obligatorio">
                </div>
                <div class="col-10">
                  <label style="text-indent:5px" >{{oblopc[1].text}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  class="col-sm-12 offset-sm-1">
          <div class="row">
             <!-- aqui iba el tutor asignado -->
          </div>
        </div>
        <div class="col-sm-12 offset-sm-1">
          <div class="row">
            <div class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input type="radio" id="yes" value="1" v-model="tipotutoria.bajorend" >
                </div>
                <div class="col-10">
                  <label style="text-indent:5px" >{{bajorend[0].text}}</label>
                </div>
              </div>
            </div>
            <div class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input  type="radio" id="no" value="0" v-model="tipotutoria.bajorend" >
                </div>
                <div class="col-10">
                  <label style="text-indent:5px" >{{bajorend[1].text}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 offset-sm-1">
          <div class="row">
            <div class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input type="radio" id="yes" value="1" v-model="tipotutoria.tutorfijo">
                </div>
                <div class="col-10">
                  <label style="text-indent:5px" >{{fijvar[0].text}}</label>
                </div>
              </div>
            </div>
            <div class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input  type="radio" id="no" value="0" v-model="tipotutoria.tutorfijo">
                </div>
                <div class="col-10">
                  <label style="text-indent:5px" >{{fijvar[1].text}}</label>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-sm-12 offset-sm-1">
          <div class="row">
          <div  class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input  v-if="tipotutoria.tutorfijo==1" type="radio" id="yes" value="1" v-model="tipotutoria.tutorasignado">
                  <input v-else disabled type="radio" id="yes" value="1" v-model="tipotutoria.tutorasignado">
                </div>
                <div class="col-10">
                  <label style="text-indent:5px" >{{asigsol[0].text}}</label>
                </div>
              </div>
            </div>
            <div   class="col-5 col-md-4 col-lg-3">
              <div class="row">
                <div class="col-1">
                  <input  v-if="tipotutoria.tutorfijo==1" type="radio" id="no" value="0" v-model="tipotutoria.tutorasignado">
                  <input v-else disabled type="radio" id="no" value="0" v-model="tipotutoria.tutorasignado">
                </div>
                <div class="col-10">
                  <label style="text-indent:5px" >{{asigsol[1].text}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        

      </div>


      <br>
      <div class="row col-sm-6 " style="margin-left:80px;" >
      <b-form-checkbox v-model="tipotutoria.estado" value="act" unchecked-value="ina" checked> Activo</b-form-checkbox></div>
    </div>
      <button type="button" class="btn btn-info" style="border-radius: 10px" v-on:click="guardarTipoTutoria()">Guardar</button>
      <button type="button" style="border-radius: 10px;margin-left:50px"  class="btn btn-secondary" v-on:click="Cancelar()">Cancelar</button>
      <div style="margin-left:10px;margin-top:10px;bottom:25px">
      * Campos obligatorios
     </div >
     <div style="overflow: auto;width:100%">
       <h4 class="col-12 col-md-12 col-lg-4 " style="text-align:left;">
          Tutores asignados
        </h4>
       <div v-if="this.banderaTutores==false">Todavía no hay ningún tutor asignado a este tipo de tutoria</div>

     <!-- listado de los tutores -->
        
          <table v-else class="table" style="text-align:left" >
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombres</th>
                <th scope="col">Apellidos</th>
                <th scope="col" style="text-align: center">Acciones</th>
              </tr>
            </thead>

            <tbody>

              <tr v-for="(item, index) in tipotutoria.tutoresTT" :key="index">
                <td>{{item.codigo}}</td>
                <td>{{item.nombre}}</td>
                <td>{{item.apellidos}}</td>

                <td  style="text-align: center">
                      <b-icon v-on:click="eliminarTtutor(item,index)" style="color:#757575;width:20px; height:20px;cursor:pointer;" icon="dash-circle-fill"/>

                </td>

              </tr>
            </tbody>
          </table>
     </div>
       <!-- MODAL CARGANDO  -->
      <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando...
      </div>
      </b-modal>
  </div>

</template>
<!--  LLAMAR AL API: ACTUALIZAR A FORM TITPO TUTORIA-->

<script>
import Axios from 'axios'
import Vue from 'vue'
import {MultiSelectPlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(MultiSelectPlugin);
import Swal from 'sweetalert2'

export default Vue.extend( {

  props: {
      id: String,
  },
  data(){

    return{
      miUsuario:this.$store.state.usuario,
      tipotutoria: {
        nombre:"",
        descripcion:"",

        //condiciones
        obligatorio:"",
        individual:"",
        tutorasignado:"",
        tutorfijo:"",
        bajorend:"",

        //otros atributos
        estado:"act",
        tutoresrelacionados:null,
    
        id_tipo_tutoria_entrante:undefined,
        miprog:this.$store.state.programaActual,
        //id_tipo_tutoria_entrante:this.id,
        tutoresTT:[],

      },
      banderaTutores:false,
      indgru:[
        {value: '1',text: "Individual"}, //guardo el value
        {value: '0',text: "Grupal"},
      ],
      oblopc:[
        {value: '1',text: "Obligatorio"},
        {value: '0',text: "Opcional"},
      ],
      asigsol:[
        {value: '1',text: "Tutor fijo asignado"},
        {value: '0',text: "Tutor fijo solicitado"},
      ],
      fijvar:[
        {value: '1',text: "Tutor fijo"},
        {value: '0',text: "Tutor variable"},
      ],
      bajorend:[
        {value: '1',text: "Bajo rendimiento"},
        {value: '0',text: "No es de bajo rendimiento"},
      ],


    }
  },
  created(){
  },
  mounted(){
    //Aquí lleno mis datos con la api
      if(this.$store.state.usuario==null) this.$router.push('/login')
       this.tipotutoria.id_tipo_tutoria_entrante=parseInt((this.$route.path).substring(16,18),10);
       this.tipotutoria.banderaTutores=false;
        if(this.tipotutoria.id_tipo_tutoria_entrante!=0 && this.tipotutoria.id_tipo_tutoria_entrante!=undefined ){
          this.showModal();
           Axios.create()
            .post('/TipoTutoria/mostrar/'+this.tipotutoria.id_tipo_tutoria_entrante).
            then( response =>{

            this.tipotutoria.nombre= response.data.nombre;
            this.tipotutoria.descripcion=response.data.descripcion;
            this.tipotutoria.individual=response.data.individual;
            this.tipotutoria.obligatorio=response.data.obligatorio;

            if(response.data.tutor_fijo==0) this.tipotutoria.tutorasignado="";
            else if(response.data.tutor_fijo==1) {this.tipotutoria.tutorasignado=response.data.tutor_asignado;}
            
            this.tipotutoria.tutorfijo=response.data.tutor_fijo;
            this.tipotutoria.estado=response.data.estado;
             this.tipotutoria.bajorend=response.data.bajo_rendimiento;
            this.hideModal();
            //mi usuario
            this.miUsuario=this.$store.state.usuario;
            })
          .catch(e=>{
            console.log(e);
            this.hideModal();
           //Swal de problema
             Swal.fire({
                    text:"Estamos teniendo problemas al listar los tipos de tutorias. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
              });
        });
        this.miUsuario=this.$store.state.usuario;
        //Si puso uno debe estar listado
       this.listarTutoresTT();
    }

  },
  methods:{

    guardarTipoTutoria() {
        //aqui inicia
      if( this.tipotutoria.nombre==""   ){
        this.hideModal();
         Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'Corregir',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        })
      }
      else if (this.individual=="" ||  this.tipotutoria.obligatorio=="" || this.tipotutoria.tutorfijo=="" ){
        this.hideModal();

              Swal.fire({
              text:"Debe elegir 1 opción de cada condición.\n",
              icon:'error',
              confirmButtonText: 'Corregir',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              })

      }
      else{
        if(this.tipotutoria.id_tipo_tutoria_entrante==0){
          //tt nuevo
           if(this.tipotutoria.estado=="ina"){
             this.hideModal();
                Swal.fire({
              text:"No puede crear un tipo de tutoría como inactivo.",
              icon:"warning",
              confirmButtonText: 'Sí',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
             });

           }
           else{
             if(this.tipotutoria.tutorfijo==0) this.tipotutoria.tutorasignado=null;
              const params = {
                nombre: this.tipotutoria.nombre,
                descripcion: this.tipotutoria.descripcion,
                estado:this.tipotutoria.estado,
                //condiciones
                obligatorio:this.tipotutoria.obligatorio,
                individual:this.tipotutoria.individual,
                tutor_asignado:this.tipotutoria.tutorasignado,
                tutor_fijo:this.tipotutoria.tutorfijo,
                bajo_rendimiento: this.tipotutoria.bajorend,
                //otros
                
                id_programa:this.tipotutoria.miprog.id_programa,
                usuario_creacion:this.miUsuario.id_usuario,  
              };
              this.showModal();
         Axios.create()
       .post('TipoTutoria/insertar',params)
          .then( response=>{
            console.log(response)
              this.hideModal();
               Swal.fire({
              text:"El nuevo tipo de tutoría fue guardada con éxito",
              icon:'success',
              confirmButtonText: 'Ok',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              });
              //push
              this.$router.push('/ListaTiposTutorias');
               this.$store.state.tipostutorias=null;
          })
           .catch(e => {
                  console.log(e.response);
                  this.hideModal();
                   Swal.fire({
                    text:"Ocurrió un incoveniente. Vuelva a intentar en unos minutos.",
                    icon:'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });

            });
           }
        }
        else{
          if(this.tipotutoria.tutorfijo==0) this.tipotutoria.tutorasignado=null;
          const params = {
              nombre: this.tipotutoria.nombre,
              descripcion: this.tipotutoria.descripcion,
              obligatorio:this.tipotutoria.obligatorio,
              individual:this.tipotutoria.individual,
              tutor_asignado:this.tipotutoria.tutorasignado,
              tutor_fijo:this.tipotutoria.tutorfijo,
              estado:this.tipotutoria.estado,
              id_programa:this.tipotutoria.miprog.id_programa,
              usuario_actualizacion:this.miUsuario.id_usuario,
              bajo_rendimiento: this.tipotutoria.bajorend,
           };
           this.showModal();
          Axios.create()
        .post('TipoTutoria/modificar/'+this.tipotutoria.id_tipo_tutoria_entrante,params)
          .then( response=>{
            console.log(response);
            this.hideModal();
               Swal.fire({
              text:"Las modificaciones se han realizado con éxito",
              icon:'success',
              confirmButtonText: 'Ok',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              });
              this.$router.push('/ListaTiposTutorias');
               this.$store.state.tipostutorias=null;

          })
           .catch(e => {
                  console.log(e.response);
                  this.hideModal();
                   Swal.fire({
                    text:"Ocurrió un incoveniente al modificar. Vuelva a intentar en unos minutos.",
                    icon:'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                   showConfirmButton: true,
              });
              //No lo redirigo porque perdería sus cambios
                });
        }

      }

    },
    Cancelar(){
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
              this.$router.push('/ListaTiposTutorias');

            }
          })
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    eliminarTtutor(item,index){
          //item
          const paramsE={
            id_tipo_tutoria: this.tipotutoria.id_tipo_tutoria_entrante, //El nombre del parámetro está mal,pero funciona bien porque envío el id_tipo_tutoria
            id_tutor:item.id_usuario,
          }

          Axios.post('/TipoTutoria/eliminarTutor',paramsE)
                .then(response=>{

                   if(response.data.status.indexOf("Tutor Eliminado")!=-1){ //Encontró esa frase
                     Swal.fire({
                         text:"Se han guardado los cambios",
                         icon:"success",
                         confirmButtonText: 'Sí',
                         confirmButtonColor:'#0097A7',
                          showConfirmButton: true,
                       });
                     this.tipotutoria.tutoresTT.splice(index, 1); //  
                    this.$router.push('/tiposdeTutoria/'+this.tipotutoria.id_tipo_tutoria_entrante); //
                   }

                  else if(response.data.indexOf("Excepción capturada:")!=-1){
                     Swal.fire({
                    text:"Estamos teniendo problemas al eliminar este tutor. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });
                  }

                })
                .catch(e=>{
                  console.log('catch del eliminar',e);
                   Swal.fire({
                    text:"Estamos teniendo problemas al eliminar este tutor. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });

                });


    },
    listarTutoresTT(){
        this.showModal();
        const params={
          // id_tipo_tutoria: this.tipotutoria.id_tipo_tutoria_entrante,
          id_programa: this.tipotutoria.id_tipo_tutoria_entrante, //El nombre del parámetro está mal,pero funciona bien
        }
         Axios.create()
        .post('TipoTutoria/tutoresAsignados',params)
          .then( response=>{
            this.hideModal();

              if(response.data.indexOf("Excepción capturada:")!=-1){
              // let par=response.data;
              // 
                Swal.fire({
                    text:"Ocurrió un incoveniente al listar los tutores asociados. Vuelva a intentar en unos minutos.",
                    icon:'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                   showConfirmButton: true,
              });

                }
                else{
                   this.tipotutoria.tutoresTT=response.data.sort((a, b) => { return  a.nombre.localeCompare(b.nombre);});
                    // this.tipotutoria.tutoresTT=response.data;
                    this.banderaTutores=true;
                }



          })
           .catch(e => {
                  console.log(e.response);
                  this.hideModal();
                   Swal.fire({
                    text:"Ocurrió un incoveniente al listar los tutores asociados. Vuelva a intentar en unos minutos.",
                    icon:'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                   showConfirmButton: true,
              });
              //No lo redirigo porque perdería sus cambios
                });



    },

    mostrarModalAyuda(){
/*
      Swal.fire({
            text:"Condiciones. \n"+ '\n'+ "Hi",
            icon:'info',
            confirmButtonText: 'Ok',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
            
            html:
              '<b>Bajo rendimiento:</b> '+
              'Este tipo de tutoría es reconocido como bajo rendimiento y tiene un efecto en los reportes.  '+
              '<b>No es de bajo rendimiento:</b> '+
              'No es un tipo de tutoría para alumnos con bajo rendimiento.                 '+
              '<b>Tutor fijo:</b> '+
              'El alumno solo tendrá 1 tutor asignado o solicitado.  '+
              '<b>Tutor variable:</b> '+
              'El alumno tendrá uno o más tutores.  '+
              '<b>Tutor asignado:</b> '+
              'El coordinador con acceso a "Asignar Tutor" .   '+
              '<b>Tutor solicitado:</b> '+
              'El alumno solicita con qué tutor le gustaría tener citas.'+


               '<b>Individual:</b> '+
              'Solo se tendrá un tutor'+
              '<b>Grupal:</b> '+
              'Se pueden tener uno o más tutor'+
              '<b>Obligatorio:</b> '+
              'Para el alumno tener este tip'  ,
      });*/
    } 
  }
})
</script>
<style>
  body{
    background-image: null;
    background-color: #FFFFFF;
  }
  .tutoria-title{
    margin-top: 30px;
    margin-bottom: 20px;
}
.form-control {
    border-radius: 1.25rem;
    border: 1px solid #757575;
    margin-bottom: 10px;
    /* width: 100%; */

}
.form-control2 {
    border-radius: 1.25rem;
    border: 1px solid #757575;
    margin-bottom: 10px;
     width: 100%; 
    box-shadow: none;

}
input[type=radio]:checked ~ .check {
  border: 5px solid #009298;
}

input[type=radio]:checked ~ .check::before{
  background: #009298;
}

.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}

textarea:focus {outline: none;box-shadow: none;}
  @import '../../assets/styles/material.css';






  
</style>
