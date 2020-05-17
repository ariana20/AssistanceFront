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
            <td> <input style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="nombre"> </td>
          </tr>
       
          <tr style="text-align:left" ><td>Descripcion</td> 
          <textarea rows =3 cols=49  style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" type="text" v-model="descripcion">    
          </textarea> 
          <!-- Textarea tiene que tener un número menos de largo -->
          </tr>
          <tr style="text-align:left"><td>Condiciones</td>    
              <div>
                <b-form-select id="condi" v-model="tipotutoria.condiciones" :options="condiciones" multiple :select-size="4"  style="margin-left:50px;border-radius: 15px;border: 2px solid #757575;width:350px;padding: 12px 20px;" ></b-form-select>
                
              </div>
          </tr>
          <tr>
          <div class="mt-3">Condiciones elegidas
                   <div v-for="cond in tipotutoria.condiciones" v-bind:key="cond.id">- {{cond}}</div>
         </div>
          </tr>
         <tr style="text-align:left"><td>Condiciones</td> 
          <div id='container' >
            <br>
            <ejs-multiselect id='multiselect' :dataSource='condiciones' :fields='camposcondi' v-model="tipotutoria.condiciones">
            </ejs-multiselect>
              
          </div>
        </tr>
          <tr> <br> 
          </tr>
          <!-- <div  v-for="cond in tutoria.planificado" v-bind:key="cond.id">{{cond}} </div> -->
          <input type="checkbox"   id="checkbox" v-model="estado" true-value="ina" false-value ="act">
          <label for="checkbox"> Activo</label>
        </td>        
      </tbody>
      
      </table>
    </div>
      <br>
      <button type="button" class="btn btn-secondary">Eliminar</button>
      <button type="button" style="margin-left:210px" class="btn btn-info" v-on:click="guardarTipoTutoria()">Guardar</button>
  </div>

</template>
<!--  LLAMAR AL API: ACTUALIZAR A FORM TITPO TUTORIA-->

<script>
import Axios from 'axios'
import Vue from 'vue'
import {MultiSelectPlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(MultiSelectPlugin);

export default Vue.extend( {
  data(){
    return{
      game:null,
      tipotutoria: { 
        nombre:null,
        descripcion:null,
        obligatorio:"",  
        individual:"", 
        planificado:"",
        tutorasignado:"",
        tutorfijo:"",
        estado:null,
        tutoresrelacionados:null,
        condiciones:"",
      },
      campocondi:{value:'value',text:'text',groupBy:'Condic'},      
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
          if (aux=="1" ){            this.obligatorio='Obligatorio';
          }else if (aux=="0" ){            this.obligatorio='Opcional';          }
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
      if (this.tutorfijo=='Con tutor fijo' ){          cond3="1";      }
      else{        cond3='0';      }
      if (this.individual=='Individual' ){             cond1="1";
      }else{        cond1='0';      }
      if (this.obligatorio=='Obligatorio' ){           cond2="1";
      }else{        cond2='0';      }
      if (this.tutorasignado=='Con tutor asignado' ){  cond4="1";      
      }else{        cond4='0';      }
      if (this.planificado=='Planificado' ){           cond5="1";
      }else{        cond5='0';      }
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
    },
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
