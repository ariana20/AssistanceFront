<template>
  <div class="FormTiposTutoria" style="margin-top:20px">
    <div class="container" >
      <table>
      <tbody  align="left">
        
        <td style="width:1062px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left" ><td>Nombre:*</td>   
            <td> <input class="input col-sm-10 form-control" style="margin-left:13px" type="text" v-model="tipotutoria.nombre"> </td>
          </tr>
       
          <tr style="text-align:left"><td>Descripción:</td> 
          <textarea style="margin-left:13px" rows =3 cols=40 class="col-sm-10 form-control" type="text" v-model="tipotutoria.descripcion"  >    
          </textarea> 
          <!-- Textarea tiene que tener un número menos de largo -->
          </tr>
                 
            <div class="col-sm-6 "  style="margin-right:-14px">
              <label style="margin-left:-13px;margin-right:16px">Condiciones:*</label>
              <input type="radio" style="font-size: 22px;" id="yes" value="1" v-model="tipotutoria.individual">
              <label style="text-indent:5px" >{{indgru[0].text}}</label>
              <label style="text-indent: 37px;color:white;"> -</label>              
              <input  type="radio" id="no" value="0" v-model="tipotutoria.individual">
              <label style="text-indent:5px" >{{indgru[1].text}}</label>
            </div>
            <div class="col-sm-6 " style="margin-left:100px;"> 
              <input type="radio" id="yes" value="1" v-model="tipotutoria.obligatorio">
              <label style="text-indent:5px" >{{oblopc[0].text}}</label>
              <label style="text-indent:22px;color:white;"> -</label>              
              <input  type="radio" id="no" value="0" v-model="tipotutoria.obligatorio">
              <label style="text-indent:5px" >{{oblopc[1].text}}</label>
            </div>
            <div class="col-sm-6 " style="margin-left:100px;"> 
              <input type="radio" id="yes" value="1" v-model="tipotutoria.tutorasignado">
              <label style="text-indent:5px" >{{asigsol[0].text}}</label>
              <label style="text-indent:1px;color:white;"> -</label>              
              <input  type="radio" id="no" value="0" v-model="tipotutoria.tutorasignado">
              <label style="text-indent:5px" >{{asigsol[1].text}}</label>
            </div>
           <div class="col-sm-6 " style="margin-left:100px;"> 
              <input type="radio" id="yes" value="1" v-model="tipotutoria.tutorfijo">
              <label style="text-indent:5px" >{{fijvar[0].text}}</label>
              <label style="text-indent:40px;color:white;"> -</label>              
              <input  type="radio" id="no" value="0" v-model="tipotutoria.tutorfijo">
              <label style="text-indent:5px" >{{fijvar[1].text}}</label>
            </div>


           <br>
            <div class="row col-sm-6 " style="margin-left:80px;" > 
            <b-form-checkbox v-model="tipotutoria.estado" value="act" unchecked-value="ina" checked> Activo</b-form-checkbox></div>          
        </td>        
      </tbody>      
      </table>
    </div>      
      <button type="button" class="btn btn-info" style="border-radius: 10px" v-on:click="guardarTipoTutoria()">Guardar</button>
      <button type="button" style="border-radius: 10px;margin-left:50px"  class="btn btn-secondary" v-on:click="Cancelar()">Cancelar</button>
      <div style="margin-left:10px;margin-top:10px;bottom:25px">
      * Campos obligatorios   
     </div >
       <div v-if="this.banderaTutores==false">No hay ningún tutor asociado a este tipo de tutoria</div> 
   
     <!-- listado de los tutores -->
      <table v-else class="table" style="text-align:left" >
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Nombres</th>
            <th scope="col">Estado</th>
            <th scope="col" style="text-align: center">Acciones</th>
          </tr>
        </thead>
              
        <tbody>
           
          <tr v-for="(item, index) in tipotutoria.tutoresTT" :key="index">
             <td>{{item.codigo}}</td>        
            <td>{{item.nombre}}</td>        
            <td>{{item.apellidos}}</td>        
                
            <td  style="text-align: center">                               
                  <b-icon v-on:click="eliminarTtutor(item)" style="color:#757575;width:20px; height:20px;" icon="dash-circle-fill"/>
              
            </td>
          
          </tr>
        </tbody>
      </table>
     
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
        obligatorio:"",  
        individual:"",         
        tutorasignado:"",
        tutorfijo:"",
        estado:"act",
        tutoresrelacionados:null,
        condiciones:"",
        id_tipo_tutoria_entrante:undefined,
        miprog:this.$store.state.programaActual,
        //id_tipo_tutoria_entrante:this.id,
        tutoresTT:[],

      },
      banderaTutores:false,
      indgru:[
        {value: '1',text: "Individual"+"\t"+" "+" "+" "+" "+" "}, //guardo el value
        {value: '0',text: "Grupal"},
      ],
      oblopc:[
        {value: '1',text: "Obligatorio \t\t"},
        {value: '0',text: "Opcional"},
      ],
      asigsol:[
        {value: '1',text: "Tutor asignado"},
        {value: '0',text: "Tutor solicitado"},
      ],
      fijvar:[
        {value: '1',text: "Tutor fijo \t\t"},
        {value: '0',text: "Tutor variable"},
      ],
    
    }
  },
  created(){
     console.log(this.tipotutoria.id_tipo_tutoria_entrante);
    console.log(parseInt((this.$route.path).substring(16,18),10));
      console.log(this.$store.state.tipostutorias);
      console.log('mi programa ',this.tipotutoria.miprog);
  },
  mounted(){
    //Aquí lleno mis datos con la api
      if(this.$store.state.usuario==null) this.$router.push('/login')
       this.tipotutoria.id_tipo_tutoria_entrante=parseInt((this.$route.path).substring(16,18),10);
       this.tipotutoria.banderaTutores=false;
       console.log('Id entrante en mounted ',this.tipotutoria.id_tipo_tutoria_entrante);
        if(this.tipotutoria.id_tipo_tutoria_entrante!=0 && this.tipotutoria.id_tipo_tutoria_entrante!=undefined ){
          this.showModal();
           Axios.create()
            .post('/TipoTutoria/mostrar/'+this.tipotutoria.id_tipo_tutoria_entrante).
            then( response =>{
             console.log('Id del tipo tutoria ',response.data.id_tipo_tutoria);
            this.tipotutoria.nombre= response.data.nombre;
            this.tipotutoria.descripcion=response.data.descripcion;
            this.tipotutoria.individual=response.data.individual;
            this.tipotutoria.obligatorio=response.data.obligatorio;
            this.tipotutoria.tutorasignado=response.data.tutor_asignado;
            this.tipotutoria.tutorfijo=response.data.tutor_fijo;
            this.tipotutoria.estado=response.data.estado;
            this.hideModal();
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
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        })        
      }   
      else if (this.individual=="" ||  this.tipotutoria.obligatorio=="" || this.tipotutoria.tutorasignado=="" || this.tipotutoria.tutorfijo=="" ){
        this.hideModal();
        console.log('Entro al elseif  de 4 condiciones');
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
           const params = {
              nombre: this.tipotutoria.nombre, 
              descripcion: this.tipotutoria.descripcion,
              obligatorio:this.tipotutoria.obligatorio,  
              individual:this.tipotutoria.individual, 
              planificado:this.tipotutoria.planificado, 
              tutor_asignado:this.tipotutoria.tutorasignado,
              tutor_fijo:this.tipotutoria.tutorfijo,
              estado:this.tipotutoria.estado,   
              id_programa:this.tipotutoria.miprog.id_programa, 
              // id_programa:4,
              };
              this.showModal();
         Axios.create()
         // http://18.232.253.212/Back-end-Software/public/api/      
          .post('TipoTutoria/insertar',params)
          .then( response=>{
            console.log(response);
              this.hideModal();
               Swal.fire({
              text:"El nuevo tipo de tutoria fue guardada con exito",
              icon:'success',
              confirmButtonText: 'ok',
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
                    confirmButtonText: 'ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });
            
            });
           }
        }
        else{
          const params = {
              nombre: this.tipotutoria.nombre, 
              descripcion: this.tipotutoria.descripcion,
              obligatorio:this.tipotutoria.obligatorio,  
              individual:this.tipotutoria.individual, 
              planificado:this.tipotutoria.planificado, 
              tutor_asignado:this.tipotutoria.tutorasignado,
              tutor_fijo:this.tipotutoria.tutorfijo,
              estado:this.tipotutoria.estado,   
              id_programa:this.tipotutoria.miprog.id_programa, 
              // id_programa:4,           
           };
           this.showModal();
          Axios.create()   
        .post('TipoTutoria/modificar/'+this.tipotutoria.id_tipo_tutoria_entrante,params)
          .then( response=>{
            console.log(response);
            this.hideModal();
               Swal.fire({
              text:"El nuevo tipo de tutoria fue guardada con exito",
              icon:'success',
              confirmButtonText: 'ok',
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
                    confirmButtonText: 'ok',
                    confirmButtonColor:'#0097A7',
                   showConfirmButton: true,
              });
              //No lo redirigo porque perdería sus cambios
                });
        }      
      
      }    
      console.log('salio del if');

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
    eliminarTtutor(item){
          //item
          const paramsE={
            id_tipo_tutoria: this.tipotutoria.id_tipo_tutoria_entrante, //El nombre del parámetro está mal,pero funciona bien porque envío el id_tipo_tutoria
            id_tutor:item.id_usuario,
          }
          console.log(item);
          Axios.post('/TipoTutoria/eliminarTutor',paramsE)
                .then(response=>{
                  console.log(response);
                   
                   if(response.data.status.indexOf("Tutor Eliminado")!=-1){ //Encontró esa frase
                     Swal.fire({
                         text:"Se han guardado los cambios",
                         icon:"success",
                         confirmButtonText: 'Sí',
                         confirmButtonColor:'#0097A7',
                          showConfirmButton: true,
                       });
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
            console.log(response);
            this.hideModal();
              
              if(response.data.indexOf("Excepción capturada:")!=-1){ 
              // let par=response.data; 
              // this.tipotutoria.tutoresTT=par.sort((a, b) => { return  a.nombre.localeCompare(b.nombre);});   
                Swal.fire({
                    text:"Ocurrió un incoveniente al listar los tutores asociados. Vuelva a intentar en unos minutos.",
                    icon:'error',
                    confirmButtonText: 'ok',
                    confirmButtonColor:'#0097A7',
                   showConfirmButton: true,
              });
                
                }
                else{ 
                    this.tipotutoria.tutoresTT=response.data;
                    this.banderaTutores=true;
                }
                
                  
              
          })
           .catch(e => {
                  console.log(e.response);
                  this.hideModal();
                   Swal.fire({
                    text:"Ocurrió un incoveniente al listar los tutores asociados. Vuelva a intentar en unos minutos.",
                    icon:'error',
                    confirmButtonText: 'ok',
                    confirmButtonColor:'#0097A7',
                   showConfirmButton: true,
              });
              //No lo redirigo porque perdería sus cambios
                });



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
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}

textarea:focus {outline: none;box-shadow: none;}
  @import '../../assets/styles/material.css';
</style>
