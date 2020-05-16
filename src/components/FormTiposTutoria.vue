<template>
  <div class="FormTiposTutoria">
    <div class="container" style="left:10%;text-align: left">
      <table>
      <tbody  align="left">
        <p style="white-space: pre-line;"></p>
        <br>
        <td style="width:1062px">
          <tr style="text-align:left"></tr>
          <tr style="text-align:left"><td>Nombre</td>   
            <td> <input type="text" size="50" v-model="nombre"></td>
          </tr>
          <!-- <b-form-input type="text" v-model="nombre"></b-form-input> -->
          <!-- barra más bonita la de arriba -->
          <tr style="text-align:left" ><td>Descripcion</td>     
            <textarea rows =3 cols=49 v-model="descripcion">
            </textarea>
          <!-- Textarea tiene que tener un número menos de largo -->
          </tr>
          <tr style="text-align:left"><td>Condiciones</td>    
            <select style="text-align:left" v-model="tipotutoria.individual">
              <option v-for="cond in condicionespar1" v-bind:key="cond.id">{{cond}}</option>
            </select>
          </tr>   
            <tr style="cols:100"><td></td>    
            <select v-model="tipotutoria.obligatorio">
              <option v-for="cond in condicionespar2" v-bind:key="cond.id">{{cond}}</option>
            </select>
          </tr>   
           <tr ><td></td>    
            <select v-model="tipotutoria.tutorfijo">
              <option v-for="cond in condicionespar3" v-bind:key="cond.id">{{cond}}</option>
            </select>
          </tr>   
           <tr style="text-align:left"><td></td>    
            <select v-model="tipotutoria.tutorasignado">
              <option v-for="cond in condicionespar4" v-bind:key="cond.id">{{cond}}</option>
            </select>
          </tr>  
           <tr style="text-align:left"><td></td>    
            <select v-model="tipotutoria.planificado">
              <option v-for="cond in condicionespar5" v-bind:key="cond.id">{{cond}}</option>
            </select>
          </tr>
          <input type="checkbox" id="checkbox" v-model="activo">
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
export default {
  data(){
    return{
      tipotutoria: { 
        nombre:null,
        descripcion:null,
        obligatorio:"",  
        individual:"", 
        planificado:"",
        tutorasignado:"",
        tutorfijo:"",
        estado:null,
        tutoresrelacionados:[],
      },
      condicionespar1:['Individual','Grupal'],  
      condicionespar2:['Obligatoria','Opcional'], 
      condicionespar3:['Con tutor fijo','Con tutor variable'],
      condicionespar4:['Con tutor asignado','Con tutor solicitado'], 
      condicionespar5:['Planificado','No planificado'],   
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
          //this.activo="act";
          var control = document.getElementById("checkbox");
          control.checked=true;
          var aux=response.data.obligatorio;
          if (aux=="1" ){            this.obligatorio='Obligatorio';
          }else{            this.obligatorio='Opcional';          }
          aux=response.data.individual;
          if (aux=="1" ){            this.individual='Individual';
          }else{            this.individual='Grupal';          }
          aux=response.data.planificado;
          if (aux=="1" ){            this.planificado='Planificado';
          }else{            this.planificado='No planificado';          }
          aux=response.data.tutorasignado;
          if (aux=="1" ){            this.tutorasignado='Con tutor asignado';
          }else{            this.tutorasignado='Con tutor solicitado';          }
          aux=response.data.tutorfijo;
          if (aux=="1" ){            this.tutorfijo='Con tutor fijo';
          }else{            this.tutorfijo='Con tutor variable';          }
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
}
</script>
<style>
  body{
    background-image: null;
    background-color: #FFFFFF;
  }
</style>