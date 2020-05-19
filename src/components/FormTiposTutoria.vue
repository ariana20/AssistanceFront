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
          
          <tr>

         <tr style="text-align:left"><td>Condiciones  </td> 
          <div >
            <br>
            <ejs-multiselect style='margin-left:100px' id='multiselect' :dataSource='condiciones' :fields='camposcondi' v-model="tipotutoria.condiciones" >
            </ejs-multiselect>
            
              
          </div>
        </tr>
        <!-- lista de condiciones -->
          <tr>
            <li v-for="item in tipotutoria.condiciones " v-bind:key="item.value" >{{ item }}</li>
          </tr>
          <tr> <br>
          <td >
          </td>
          </tr>
          <input type="checkbox"   id="checkeestado">
          <label for="checkbox"> Activo</label>
          
        </td>        
      </tbody>
      
      </table>
    </div>
      
      <button type="button" style="margin-left:70px" class="btn btn-info" v-on:click="guardarTipoTutoria()">Guardar</button>
      <button type="button" style="margin-left:50px"  class="btn btn-secondary" v-on:click="eliminarTtutoria()">Cancelar</button>
      
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

  data(){
    return{
      miUsuario:this.$store.state.usuario,
      tipotutoria: { 
        nombre:"",
        descripcion:"",
        obligatorio:"",  
        individual:"", 
        planificado:"",
        tutorasignado:"",
        tutorfijo:"",
        estado:null,
        tutoresrelacionados:null,
        condiciones:"",
      },
      campocondi:{value:'value',text:'text'},      
      condiciones:[
        {value:'Individual',text:'Individual',Condic:'Individual o Grupal'},            
        {value:'Grupal',text:'Grupal',Condic:'Individual o Grupal'},
        {value:'Obligatoria',text:'Obligatoria',Condic:'Obligatoria u Opcional'},      
        {value:'Opcional',text:'Opcional',Condicion:'Obligatoria u Opcional'},
        {value:'Con tutor fijo',text:'Con tutor fijo',Condic:'Con tutor fijo o variable'},      
        {value:'Con tutor variable',text:'Con tutor variable',Condic:'Con tutor fijo o variable'},
        {value:'Con tutor asignado',text:'Con tutor asignado',Condic:'Con tutor asignado o solicitado'},      
        {value:'Con tutor solicitado',text:'Con tutor solicitado',Condic:'Con tutor asignado o solicitado'}, 
        {value:'Planificado',text:'Planificado',Condic:'Planificado o no planificado'},      
        {value:'No Planificado',text:'No Planificado',Condic:'Planificado o no planificado'},
      ],  
    }
  },
  mounted(){
    //Aquí lleno mis datos con la api
    Axios.create({withCredentials: true })
      .post('/TipoTutoria/mostrar/')
        .then( response=>{
          this.id= response.data.id_tipo_tutoria;
          this.nombre = response.data.nombre;
          this.descripcion = response.data.descripcion;
          this.estado=response.data.estado;
          var aux=response.data.obligatorio;
          if (aux=="1" ){            this.condiciones[0]='Obligatorio';
          }else if (aux=="0" ){            this.condiciones[0]='Opcional';          }
          aux=response.data.individual;
          if (aux=="1" ){            this.individual='Individual';
          }else if (aux=="0" ){            this.individual='Grupal';          }
          aux=response.data.planificado;
          if (aux=="1" ){            this.planificado='Planificado';
          }else if (aux=="0" ){            this.planificado='No planificado';          }
          aux=response.data.tutorasignado;
          if (aux=="1" ){            this.tutorasignado='Con tutor asignado';
          }else if (aux=="0" ){            this.tutorasignado='Con tutor solicitado';          }
          aux=response.data.tutorfijo;
          if (aux=="1" ){            this.tutorfijo='Con tutor fijo';
          }else if (aux=="0" ){            this.tutorfijo='Con tutor variable';          }
          
          

          //checkbox activo
          //tutores
          
        });
  },
  methods:{
    
    guardarTipoTutoria() {
      var cond1,cond2, cond3,cond4,cond5;
      var entro1=false,entro2=false,entro3=false,entro4=false,entro5=false;
      var aviso="",aviso1=false,aviso2=false,aviso3=false,aviso4=false,aviso5=false;      
      //manejo del estado
      // if(document.checkeestado.click()==true){
      //       this.tipotutoria.estado="act";
      //     }
      //     else this.tipotutoria.estado="ina";

      ////manejo de condiciones
      var verifLongi=this.tipotutoria.condiciones.length;
      console.log(this.tipotutoria.nombre);
      if(this.tipotutoria.descripcion =="" || this.tipotutoria.nombre=="" || verifLongi<4){
         Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        })        
      }
      
      else if(verifLongi==5 ){

        for (let i = 0; i <5; i++) {            
                
                if (this.tipotutoria.condiciones[i]=='Individual'  && entro1==false){             cond1="1";entro1=true;
                }else if (this.tipotutoria.condiciones[i]=='Grupal' && entro1==false ){        cond1='0';   entro1=true;   }
                else if(entro1==true && aviso1==false){      aviso=aviso+" Individual y Grupal a la vez\n,";    aviso1=true;
                }
                else if (this.tipotutoria.condiciones[i]=='Obligatorio'&& entro2==false ){           cond2="1";entro2=true;
                }else if (this.tipotutoria.condiciones[i]=='Opcional' && entro2==false ){        cond2='0';  entro2=true;    }
                else if (entro2==true && aviso2==false) { aviso=aviso+" Opcional y Obligatoria a la vez\n,";aviso2=true;
                }
                else if (this.tipotutoria.condiciones[i]=='Con tutor fijo' && entro3==false ){          cond3="1";  entro3=true  ;  }
                else if (this.tipotutoria.condiciones[i]=='Con tutor variable' && entro3==false ){        cond3='0';   entro3=true;   }
                else if (entro3==true && aviso3==false){                 aviso=aviso+" Tutor fijo y variable a la vez\n,"; aviso3=true;
                }
                else if (this.tipotutoria.condiciones[i]=='Con tutor asignado' && entro4==false ){  cond4="1";      entro4=true;
                }else if (this.tipotutoria.condiciones[i]=='Con tutor solicitado' && entro4==false ){        cond4='0'; entro4=true;     }
                else if( entro4==true && aviso4==false ){ aviso=aviso+" Tutor solicitado y asignado a la vez\n,";aviso4=true;
                }
                else if (this.tipotutoria.condiciones[i]=='Planificado'&& entro5==false  ){           cond5="1";entro5=true;
                }else if (this.tipotutoria.condiciones[i]=='No Planificado'&& entro5==false  ){        cond5='0';  entro5=true;    }
                else if(entro5==true  && aviso5==false) { aviso=aviso+" Planificado y no planificado a la vez\n,";aviso5=true;
                }
           }
          if(aviso!=""){ //Cuando hay 5 pero agrupó mal
              Swal.fire({
              text:"Verifique la agrupación de condiciones. No puede ingresar la condición\n"+aviso+".",
              })
          }
      
      }
      else if (verifLongi>5 ){
              Swal.fire({
              text:"Debe colocar solo 5 condiciones.\n",
              icon:'error',
              confirmButtonText: 'Corregir',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              })
        
      }
      else {
      const params = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        obligatorio:cond2,  
        individual:cond1, 
        planificado:cond5, 
        tutor_asignado:cond4,
        tutor_fijo:cond3,
        estado:"act",   
        id_programa:5,
          
      };
      
      Axios.create({withCredentials: true })
        .post('http://18.232.253.212/Back-end-Software/public/api/TipoTutoria/insertar',params)
          .then( response=>{
            console.log(response)
          });
      }
    },
    eliminarTtutoria(){
      Swal.fire({
            text:'¿Desea eliminar?',
            icon:'warning',
            confirmButtonText: 'Eliminar',
             confirmButtonColor:'#0097A7',
            cancelButtonText: 'Cancelar',
            cancelButtonColor:'C4C4C4',
            showCancelButton: true,
            showConfirmButton: true,
            //html:' <div >Hello</div>',

        }).then((result) => {
            if (result.value) {
              Swal.fire({
                icon:'Deleted!',
                text:'El usuario ha sido eliminado',
                confirmButtonText:'Confirmo' ,
                confirmButtonColor:'#0097A7'
                }
              )
              //aqui iriía el eliminar
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              Swal.fire({
                text:'Se ha cancelado la eliminación',
                confirmButtonColor:'#0097A7',}
              )
            }
          })
   } // eliminart
  }
})
</script>
<style>
  body{
    background-image: null;
    background-color: #FFFFFF;
  }
  @import '../assets/styles/material.css';
</style>
