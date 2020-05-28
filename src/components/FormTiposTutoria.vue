<template>
  <div class="FormTiposTutoria" style="margin-top:20px">
    <div class="container" >
      <table>
      <tbody  align="left">
        <p style="white-space: pre-line;"></p>
        <br>
        <td style="width:1062px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left" ><td>Nombre:</td>   
            <td> <input class="input col-sm-10 form-control" type="text" v-model="tipotutoria.nombre" onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)  )"> </td>
          </tr>
       
          <tr style="text-align:left" ><td>Descripcion:</td> 
          <textarea rows =3 cols=49  class="col-sm-10 form-control" type="text" v-model="tipotutoria.descripcion" onkeypress="return ((event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)  )" >    
          </textarea> 
          <!-- Textarea tiene que tener un número menos de largo -->
          </tr>
          

          <tr> 
          <td >
          </td>
          </tr>
          <div class="row col-sm-6 tutoria-title"  > <div>Condiciones:</div>
            <b-form-radio-group style="margin-left:25px" v-model="tipotutoria.individual" :options="indgru"></b-form-radio-group></div>
            <div class="row col-sm-6 " style="margin-left:100px;" > 
            <b-form-radio-group v-model="tipotutoria.obligatorio" :options="oblopc">    </b-form-radio-group></div>            
            <div class="row col-sm-6 " style="margin-left:100px;"> 
            <b-form-radio-group v-model="tipotutoria.tutorasignado" :options="asigsol">    </b-form-radio-group></div>
            <div class="row col-sm-6 " style="margin-left:100px;"> 
            <b-form-radio-group v-model="tipotutoria.tutorfijo" :options="fijvar">    </b-form-radio-group></div>

           <br>
            <div class="row col-sm-6 " style="margin-left:80px;" > 
            <b-form-checkbox v-model="tipotutoria.estado" value="act" unchecked-value="ina" checked> Activo</b-form-checkbox></div>
            

          
        </td>        
      </tbody>
      
      </table>
    </div>
      
      <button type="button" style="margin-left:70px" class="btn btn-info" v-on:click="guardarTipoTutoria()">Guardar</button>
      <button type="button" style="margin-left:50px"  class="btn btn-secondary" v-on:click="Cancelar()">Cancelar</button>
      
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

      },
      indgru:[
        {value: '1',text: 'Individual'}, //guardo el value
        {value: '0',text: 'Grupal'},
      ],
      oblopc:[
        {value: '1',text: 'Obligatorio'},
        {value: '0',text: 'Opcional'},
      ],
      asigsol:[
        {value: '1',text: 'Con tutor asignado'},
        {value: '0',text: 'Con tutor solicitado'},
      ],
      fijvar:[
        {value: '1',text: 'Con tutor fijo'},
        {value: '0',text: 'Con tutor variable'},
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
       console.log('Id entrante en mounted ',this.tipotutoria.id_tipo_tutoria_entrante);
        if(this.tipotutoria.id_tipo_tutoria_entrante!=0 && this.tipotutoria.id_tipo_tutoria_entrante!=undefined ){
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
         
         });
    }

  },
  methods:{
    
    guardarTipoTutoria() {
    
      if(this.tipotutoria.descripcion =="" || this.tipotutoria.nombre==""   ){
         Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        })        
      }   
      else if (this.individual=="" ||  this.tipotutoria.obligatorio=="" || this.tipotutoria.tutorasignado=="" || this.tipotutoria.tutorfijo=="" ){
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
         Axios.create()
      // http://18.232.253.212/Back-end-Software/public/api/      
        .post('TipoTutoria/insertar',params)
          .then( response=>{
            console.log(response);
               Swal.fire({
              text:"El nuevo tipo de tutoria fue guardada con exito",
              icon:'success',
              confirmButtonText: 'ok',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              });
              //push
              this.$router.push('/ListaTiposTutorias');
          })
           .catch(e => {
                  console.log(e.response);
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
          Axios.create()   
        .post('TipoTutoria/modificar/'+this.tipotutoria.id_tipo_tutoria_entrante,params)
          .then( response=>{
            console.log(response);
               Swal.fire({
              text:"El nuevo tipo de tutoria fue guardada con exito",
              icon:'success',
              confirmButtonText: 'ok',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              });
              this.$router.push('/ListaTiposTutorias');
          })
           .catch(e => {
                  console.log(e.response);
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
  @import '../assets/styles/material.css';
</style>
