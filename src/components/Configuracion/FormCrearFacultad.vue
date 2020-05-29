<template>
  <div class="FormCrearFacultad">

    <div class="container" style="text-align: left">
      <!--<div class="top-title title-container" style="text-align:right">
        <button type="button" class="btn btn-info" style="margin-left:30px" v-on:click="guardarFacultad()">Guardar</button>
            
            <router-link to="/facultad">
              <button type="button" class="btn btn-secondary" style="margin-left:30px">Cancelar</button>
            </router-link>
      </div>-->
        <b-container fluid>
        <b-row class="my-1"  style="text-align: right">
            <b-col sm="12">
            
            <button type="button" class="btn btn-info" style="margin-left:20px" v-on:click="guardarFacultad()">Guardar</button>
            
            <router-link to="/facultad">
              <button type="button" class="btn btn-secondary" style="margin-left:20px">Cancelar</button>
            </router-link>
            </b-col>
        </b-row>
        <b-row>
        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label>Nombre de la Facultad:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input v-if="idFacultad" id="nombreF" v-model="facultad.nombre"></b-form-input>
            <b-form-input v-else id="nombreF" v-model="facultad.nombre"></b-form-input>

            </b-col>

        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label>Correo Electrónico:</label>
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

        <!--<div class="top-titulo" style="">
          <h4 class="font-weight-bolder " style="margin-bottom:40px">Programas de la Facultad</h4>
          <button type="submit" class="btn btn-info" style="margin-right:-510px; height:38px" v-on:click="agregarPrograma()">Añadir Programa</button>            
          <router-link to="/facultad"><button type="button" class="btn btn-secondary" style="margin-left:0px">Cancelar</button></router-link>
        </div>-->

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
            <label>Nombre del Programa:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input v-if="nuevoProg==1 || editProg==1" id="nombre" v-model="programa.nombre"></b-form-input>
            <b-form-input v-else readonly id="nombre" v-model="programa.nombre"></b-form-input>
            </b-col>

        </b-row>
        <b-row class="my-1">
            <b-col sm="3">
            <label>Correo Electrónico:</label>
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
        <table class="table">
            <thead>
            <tr>
                <th scope="col">N°</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Coordinador</th>
                <th scope="col" style="text-align: center">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in programas" :key="index">
                <th scope="row">{{index+1}}</th>
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
</template>

<script>
import axios from 'axios'
import modalJ from '@/components/ModalProg.vue'
import modalJ2 from '@/components/Modal.vue'
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
          id_programa:null,
          id_facultad:null,
          nombre:null,
          descripcion:null,
          correo:null,
          coordinador:null
      },
      coordinadorSeleccionado:null,
      tipoCoord:"",

    }
  },
  components:{
    modalJ,
    modalJ2
  },
  mounted(){
    if(this.$store.state.facultadEscogida) {
      this.idFacultad=this.$store.state.facultadEscogida.id_facultad;
      this.obtenerDatos();
    }else{
      this.idFacultad=0;
    }
    console.log(this.$store.state.facultadEscogida);
    console.log('Id facultad='+this.idFacultad);
  },

  methods:{

    obtenerDatos() {
        axios.post('/facultad/listar/'+this.idFacultad)
            .then(response=>{
                console.log(response);
                this.facultad.id_facultad = response.data[0].id_facultad;
                this.facultad.id_programa = response.data[0].id_programa;
                this.facultad.nombre = response.data[0].nombre;
                this.facultad.correo = response.data[0].correo;
                this.facultad.descripcion=response.data[0].descripcion;
                console.log(response);

                axios.post('/programa/listarConCoord/'+ this.facultad.id_facultad)
                    .then(response=>{
                        for (let index = 0; index < response.data.length; index++) {
                          var prog= new Object()
                          prog=response.data[index].programa;
                          prog.coordinador=response.data[index].coordinador;
                          console.log('---------');
                          console.log(response.data[index]);
                          this.programas.push(prog);
                        }
                        
                        console.log(response);

                    })
                    .catch(e=>console.log(e));

                axios.post('/facultad/coordinadorFacultad/'+this.facultad.id_programa)
                    .then(response=>{
                        this.facultad.coordinador=response.data[0];
                        this.facultad.coordinador.nombCompleto=response.data[0].nombre+" "+response.data[0].apellidos;
                        console.log(this.facultad.coordinador);
                        console.log(response);

                    })
                    .catch(e=>console.log(e));
            })
            .catch(e=>console.log(e));

    },

    guardarFacultad() {

      if(this.facultad.nombre =="" || this.facultad.correo==""){
         Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }) 

      }else{
        if(this.$store.state.facultadEscogida){
          //cómo agarro el id? por eso no funciona 
          //modifico la facultad, debo considerar progactualizar, progeliminar, progagregar
          axios.create()
            .post('/facultad/modificar/'+this.facultad.id_facultad,this.facultad)
              .then( response=>{
                console.log(response);
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
                    console.log(response)
                  })
                .catch(e => {
                  console.log(e.response);
                })
            }
            
          axios.create()
            .post('/programa/insertarVariosPro',this.progagregar)
              .then( response=>{
                console.log(response);
              })
            .catch(e => {
              console.log(e.response);
            })
          axios.create()
            .post('/programa/eliminarVariosPro',this.progeliminar)
              .then( response=>{
                console.log(response);
              })
            .catch(e => {
              console.log(e.response);
            })
          axios.create()
            .post('/programa/actualizarVariosPro',this.progactualizar)
              .then( response=>{
                console.log(response);
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
            })


        }else{
          //creo una facultad con la data final construida
          //falta colocarle el insertar coordinador a cada programa
          axios.create()
          .post('/facultad/insertar',this.facultad)
            .then( response=>{
              this.facultad.id_facultad=response.data.id_facultad;
              this.facultad.id_programa=response.data.id_programa;
              console.log(response)

              if(this.facultad.coordinador){
                const params = {
                  id_usuario: this.facultad.coordinador.id_usuario,
                  id_programa: this.facultad.id_programa
                };
                axios.create()
                  .post('/facultad/asignarCoordi',params)
                    .then( response=>{
                      console.log(response)
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
                    console.log(response);
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
                })

            })
          .catch(e => {
            console.log(e.response);
          })
        }
        }

      

    },
    guardarPrograma(){

      console.log(this.programa);
      var prog= new Object();
      prog.id_facultad=this.facultad.id_facultad;
      prog.id_programa=this.programa.id_programa;
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



      this.programa.id_programa=null;
      this.programa.id_facultad=null;
      this.programa.nombre=null;
      this.programa.descripcion=null;
      this.programa.correo=null;
      this.programa.coordinador=null;
      this.nuevoProg=0;
      this.editProg=0;
      console.log(this.programas);
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
          title: '¿Dese eliminar el programa'+item.nombre+'?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.value) {
            this.programas.splice(ind,1 );
            if(this.$store.state.facultadEscogida)
              this.progeliminar.push(item);

          }
        })
      
    },
    Editar(item, index){
      this.editProg=1;
      this.programa.index=index;
      this.programa.nombre=item.nombre;
      this.programa.correo=item.correo;
      this.programa.coordinador=item.coordinador;
      this.programa.id_facultad=item.id_facultad;
      this.programa.id_programa=item.id_programa;

      
    }

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

</style>