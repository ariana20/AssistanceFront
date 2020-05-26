<template>
  <div class="FormTiposTutoria">
    <div class="container" style="left:10%;text-align: left">
      <table>
      <tbody  align="left">
        <p style="white-space: pre-line;"></p>
        <br>
        <td style="width:1062px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left" ><td>Nombre</td>   
            <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="tipotutoria.nombre"> </td>
          </tr>
       
          <tr style="text-align:left" ><td>Descripcion</td> 
          <textarea rows =3 cols=49  style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="tipotutoria.descripcion">    
          </textarea> 
          <!-- Textarea tiene que tener un número menos de largo -->
          </tr>
          
          <!-- <tr>

        <tr style="text-align:left"><td>Condiciones  </td> 
          <div >
            <br>
            <ejs-multiselect style='margin-left:100px' id='multiselect' :dataSource='condiciones' :fields='camposcondi' v-model="tipotutoria.condiciones" >
            </ejs-multiselect>
            
              
          </div>
        </tr> -->
        <!-- lista de condiciones -->
          <!-- <tr>
            <li v-for="item in tipotutoria.condiciones " v-bind:key="item.value" >{{ item }}</li>
          </tr> -->
          <tr> 
          <td >
          </td>
          </tr>
          <div class="row col-sm-6 tutoria-title"  > 
            <div>Condiciones: </div>
            <b-form-radio-group style="margin-left:25px" v-model="tipotutoria.individual" :options="indgru">    </b-form-radio-group></div>
          <div class="row col-sm-6 " style="margin-left:100px;" > 
            <b-form-radio-group v-model="tipotutoria.obligatorio" :options="oblopc">    </b-form-radio-group></div>
        
          
          <div class="row col-sm-6 " style="margin-left:100px;"> 
            <b-form-radio-group v-model="tipotutoria.tutorasignado" :options="asigsol">    </b-form-radio-group></div>
            
        
          <div class="row col-sm-6 " style="margin-left:100px;"> 
            <b-form-radio-group v-model="tipotutoria.tutorfijo" :options="fijvar">    </b-form-radio-group></div>

           <br>
          <div class="row col-sm-6 " style="margin-left:80px;" > 
            <b-form-checkbox v-model="tipotutoria.estado" value="act" unchecked-value="ina"> Activo</b-form-checkbox></div>
            

          
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
        estado:null,
        tutoresrelacionados:null,
        condiciones:"",
         id_tipo_tutoria_entrante:undefined,
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
     console.log(this.id_tipo_tutoria_entrante);
    console.log(parseInt((this.$route.path).substring(16,18),10));
      console.log(this.$store.state.tipostutorias);
  },
  mounted(){
    //Aquí lleno mis datos con la api
   
       this.id_tipo_tutoria_entrante=parseInt((this.$route.path).charAt(16),10);
       console.log('Id entrante en mounted ',this.id_tipo_tutoria_entrante);
        if(this.id_tipo_tutoria_entrante!=0 && this.id_tipo_tutoria_entrante!=undefined ){
           Axios.create()
          .post('/TipoTutoria/mostrar/'+this.id_tipo_tutoria_entrante).
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
      var cond1,cond2, cond3,cond4,cond5;
      var entro1=false,entro2=false,entro3=false,entro4=false,entro5=false;
      var entro6=false,entro7=false,entro8=false,entro9=false,entro10=false;
       var aviso="";
      //  aviso1=false,aviso2=false,aviso3=false,aviso4=false,aviso5=false;      
      //manejo del estado
      // if(document.checkeestado.click()==true){
      //       this.tipotutoria.estado="act";
      //     }
      //     else this.tipotutoria.estado="ina";

      ////manejo de condiciones
      var verifLongi=1;
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
      else if(verifLongi==5 ){
          console.log('Entro a verificar que las 5 condiciones');
        for (let i = 0; i <5; i++) {            
                //Si no pongo uno de los 5 se loquea
                if (this.tipotutoria.condiciones[i]=='Individual' ){             cond1='1';entro1=true; continue;
                }else if (this.tipotutoria.condiciones[i]=='Grupal' ){        cond1='0';   entro2=true; continue;  }
                
                else if (this.tipotutoria.condiciones[i]=='Obligatoria' ){           cond2='1';entro3=true;continue;
                }else if (this.tipotutoria.condiciones[i]=='Opcional' ){        cond2='0';  entro4=true;   continue; }
                
                else if (this.tipotutoria.condiciones[i]=='Con tutor fijo' ){          cond3='1';  entro5=true  ; continue; }
                else if (this.tipotutoria.condiciones[i]=='Con tutor variable' ){        cond3='0';   entro6=true;  continue; }
                
                else if (this.tipotutoria.condiciones[i]=='Con tutor asignado' ){  cond4='1';      entro7=true;continue;
                }else if (this.tipotutoria.condiciones[i]=='Con tutor solicitado' ){        cond4='0'; entro8=true;   continue;  }
                
                else if (this.tipotutoria.condiciones[i]=='Planificado' ){           cond5='1';entro9=true;continue;
                }else if (this.tipotutoria.condiciones[i]=='No Planificado' ){        cond5='0';  entro10=true; continue;   }
                
    
           }
          //Cuando hay 5 pero agrupó mal
              if( entro1==true && entro2==true ) aviso=aviso+" Individual y Grupal a la vez,";
              if( entro3==true && entro4==true ) aviso=aviso+" Opcional y Obligatoria a la vez,";
              if( entro5==true && entro6==true ) aviso=aviso+" Tutor fijo y variable a la vez,";
              if( entro7==true && entro8==true ) aviso=aviso+" Tutor solicitado y asignado a la vez,";              
              if( entro9==true && entro10==true ) aviso=aviso+" Planificado o No planificado a la vez,";
              if(aviso!=""){
              Swal.fire({
              text:"Verifique la agrupación de condiciones: Individual o Grupal, Opcional u obligatoria, Tutor fijo o varibale, Tutor solicitado o asignado, Planificado o No planificado. No puede ingresar la condición\n"+aviso+".",
              icon:'error',
              confirmButtonText: 'Corregir',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              })
              }
              else{
                 console.log('Entro porque no saltó aviso');
      const params = {
        nombre: this.tipotutoria.nombre, 
        descripcion: this.tipotutoria.descripcion,
        obligatorio:cond2,  
        individual:cond1, 
        planificado:cond5, 
        tutor_asignado:cond4,
        tutor_fijo:cond3,
        estado:"act",   
        id_programa:4,
          
      };
      console.log('condi1: ',cond1,'condi2: ',cond2,'condi3: ',cond3,'condi4: ',cond4,'condi5: ',cond5);
      Axios.create({withCredentials: true })
      // http://18.232.253.212/Back-end-Software/public/api/      
        .post('TipoTutoria/insertar',params)
          .then( response=>{
            console.log(response)
          })
           .catch(e => {
                  console.log(e.response);
                });

          Swal.fire({
              text:"Tipo de tutoria guardada con exito",
              icon:'success',
              confirmButtonText: 'ok',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              })
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
  @import '../assets/styles/material.css';
</style>
