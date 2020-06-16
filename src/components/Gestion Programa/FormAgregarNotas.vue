<template>
    <div class= "container">
         <!-- <div class="row grid-divider "> -->
            <div >
                <section class="text-center" style="padding-top:20px">
                    <input type="file" id="archivoInput" ref="file" multiple class="col-md-offset-4 col-md-4" v-on:change="handleFileUpload" />
                    <br><br>
                    <div id="visorArchivo">
                    <!--Aqui se desplegará el fichero-->
                    </div>
                </section>



                
                <div>
                  <hr style="width:105%;border:0px;"  >

                </div>

                <div class="row " >
                    <div class="col-xs-6 col-sm-2" sytle="padding:50px;padding-top:10px;">
                        <div class="col-sm-12" style="text-align:center">
                                <b>Código</b>                            
                        </div>
                        <hr style="width:730%;border:0px;" >
                        <ejs-autocomplete
                            :dataSource='codigos' 
                            :fields='campoCodigo' 
                            placeholder="Código" 
                            :change='onCodigoChange'
                            v-model="sel"
                            class="form-control"
                            style="margin-bottom: 10px;"
                            :showClearButton="false">
                        </ejs-autocomplete>

                        <ul class="col-sm-6" style="text-align:left;margin-left:-8px;">
                            <li class="form-control" style="width:300%;text-align:center;margin-top:8px;"
                                v-for="(newAlumnoCod,alcIndex) in listAlumnosCod"  
                                :key="alcIndex">
                                {{newAlumnoCod}}           
                            </li>
                        </ul>

                    </div>
                    <div class="col-md-4">
                        <div class="col-sm-12" style="text-align:center;padding-bottom:34px">
                            <b>Nombre y Apellidos</b>
                         
                        </div>
                        <div type="text" class="col-sm-12 form-control" placeholder="Nombre" style="margin-left:10px;color: white;background:#BEBEBE;" >
                            {{alSeleccionado}} </div>
                         
                        <div class="col-sm-12 form-control list-group-item" 
                        style="padding: 0.4rem 0.5rem;text-align:center;width:200%;margin-left:10px;padding-right:0px;"
                            v-for="(newAlumno,alIndex) in listAlumnosNom"  
                            :key="alIndex">
                            {{newAlumno}}    
                            <span name="remove" class="close" @click="deleteAl(alIndex)">&times;</span> 
                        </div>  
                    </div>
                    <div class="col-md-6">
                        <div class="col-sm-4" style="text-align:center;padding-bottom:33px;">
                            <b>Archivo</b>
                         
                        </div>
                        <div type="text" class="col-sm-4" placeholder="Nombre" style="top:-5px">
                            <button  :disabled="!this.sel" type="button" class="btn btn-info" 
                                    @click="addAlumno">Agregar
                            </button>          
                        </div>
                         
                        <div class="row" style="margin-left:0px"
                        v-for="(newAlumno,alIndex) in listAlumnosNom"  
                        :key="alIndex">
                            <!-- <input class="col-sm-8 form-control"  style="text-align:center;
                            width:200%;margin-left:10px;padding-right:0px;text-align:center; "> -->
                            <!-- <b-icon  icon="file-earmark-plus" style="color:#757575;width:35px; height:35px;"/> -->
                            <input type="file" id="archivoInput"  ref="file" class="col-md-offset-4 col-md-4" v-on:change="FileUpload" />
                            <!-- v-on:change="handleFileUpload" -->
                    
                            <!-- <b-icon icon="play-fill" style="color:#757575;width:35px; height:35px;"/> -->
                            
                            <!-- <div style="line-height:35px;margin-left:10px">
                                <b>Archivo</b>
                            </div>  -->
                        </div>  
                    </div>
                </div>
                <div style="position:absolute; bottom:30px;">
                </div>
                <hr style="width:105%;border:0px;">
                <div  class="botones" >   
                    <button type="button" style="margin:5px;border-radius: 10px;" class="btn btn-info" id="btnGuardar" v-on:click="guardarNotas()">Guardar</button>
                    <button type="button"  class="btn btn-info" style="border-radius: 10px;border-color:gray;background-color:gray;margin:20px" v-on:click="cancelarNotas()"  >Cancelar</button>  
      
                </div>
            </div>
            <!-- pdf -->
            <!-- <div style="width:100px;text-align:center;margin-top:40px" >
              <img class="imgP" v-if="this.selectedFile!==null" alt="Vue logo" :src="selectedFile" id='LogoInst'>
              <img class="imgP" v-else alt="Vue logo" v-bind:src="logo" id='LogoInst'>        -->
              
               <!-- <object data="/INF238-2020-1.pdf" type="application/pdf" width="500%"  height="600px" /> -->
               <!-- <embed src="http://example.com/doc.pdf#page=5" type="application/pdf" width="500%"  height="600px" /> -->
            
            <!-- </div> -->
            <!--Estos datos del boton deben ir en mi botoncito de examinar-->
            <!-- <div style=";text-align:center">
              <input type="file" v-on:change="onFileSelected" style="margin-top:20px"><br>
              <button @click="onUpload" type="button" class="btn btn-info" style="margin-left: -280px;margin-top:20px">Subir</button>
            </div>  -->
        
        <!-- </div> -->
        <!-- <div style="width:100%; border-bottom:0.5px solid #bababa; height:0.5px;padding-top:15px; margin-bottom:15px;"></div> -->
    </div> 
</template>


<script   >


import Swal from 'sweetalert2'
import Axios from 'axios';
import Vue from 'vue'
import {AutoCompletePlugin} from '@syncfusion/ej2-vue-dropdowns'
Vue.use(AutoCompletePlugin);
export default Vue.extend ({
    name: 'formNotas',
    
    data: function () {
        return {
        
            bordes:'borde-textbox',
            sel: '',
            alSeleccionado: 'Nombre de alumno',
            codigos:[],
            campoCodigo: {value:'codigo'},    
            selectedTipoTutoria: null,
            tiposTutoria: [],
            selectedMotivo: '',
            motivos: [],
            newMotivo: null,
            listMotivos:[],
            listMotivosId: [],
            motivosBorrados:[],
            listAlumnosNom: [],
            listAlumnosCod: [],
            listAlumnosId: [],
            unidadesApoyo: [],
            selectedUnidadApoyo: null,
            selectedFile:null,
        }
    },
    mounted(){
       
    
    Axios.post('sesiones/alumnoProg', {idTipoU:5,idProg: this.$store.state.programaActual.id_programa})
        .then( response => {
            //console.log("listado alumnos: ",response.data)
            for(var i in response.data){ 
                this.codigos.push(response.data[i][0]);
                
            }
        })
        .catch(e => {
            console.log(e.response);
        });

    //PArte del pdf
    
   
    },
    methods: {
    
        onCodigoChange: function () {
            var i;
            for(i in this.codigos){
                if(this.sel==this.codigos[i].codigo){
                    this.alSeleccionado = this.codigos[i].nombre + ' ' + this.codigos[i].apellidos;                
                }
                //console.log(this.alSeleccionado);
                //break;   
            }
        },
        addMotivos: function () {
            for(var i in this.motivos)
                if(this.selectedMotivo==this.motivos[i].id_motivo_consulta) {
                    this.listMotivos.push(this.motivos[i].nombre);
                    this.listMotivosId.push(this.motivos[i].id_motivo_consulta);
                    this.motivosBorrados.push(this.motivos[i]);
                    this.motivos.splice(i,1);  
                }
        },
        deleteMotivo: function (index) {
            var i;
            for(i in this.motivosBorrados)
                if(this.listMotivos[index]==this.motivosBorrados[i].nombre) {
                    this.motivos.push(this.motivosBorrados[i]);
                    break;
                }
            this.listMotivos.splice(index,1);
            this.listMotivosId.splice(index,1);
        },
        deleteAl: function(index) {
            this.listAlumnosCod.splice(index,1);
            this.listAlumnosNom.splice(index,1);
        },
        addAlumno: function () {  
            var estaAl = false;
            for( var i in this.listAlumnosCod ){
                    if(this.sel == this.listAlumnosCod[i]){
                        estaAl = true;
                        break;
                    }
            }
            if(this.alSeleccionado != 'Nombre del alumno' && !estaAl && this.sel.length == 8){ 
                this.listAlumnosNom.push(this.alSeleccionado);
                this.listAlumnosCod.push(this.sel);
                for(var j in this.codigos){
                    if(this.sel == this.codigos[j].codigo)
                        this.listAlumnosId.push(this.codigos[j].id_usuario);
                }
                this.alSeleccionado='Nombre del alumno';
                this.sel= '';
            }
            console.log(this.listAlumnosCod);
            
            
        },
        cancelarNotas(){
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
                 this.$store.state.usuarios=null;
                     this.$router.push('/ListaUsuarios');
                } 
          })
        },
    
    handleFileUpload(){
        let files=[];
        files=this.$refs.file.files;
        console.log(files);   
        //console.log('cods',this.listAlumnosCod);
        let formData= new FormData();
        let headers={'Content-Type':'multipart/form-data'};
        for(let i=0;i<files.length;i++){
            
            formData.append('file['+i+']',files[i]);
        }
        formData.append('_hidden','solojoh');
         const params={
            files:formData,
            headers:headers,
        }
        console.log('fD',formData);
        
             Axios
              .post('/usuarios/masivo',params)
              .then( response=>{
                console.log('masivo: ',response);
                if(response.status=='Subida terminada'){
                Swal.fire({
                    text:"Se guardaron los datos con éxito",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                }
                else{
                    Swal.fire({
                    text:"Algo pasó",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                }

            }).catch(e => {
              console.log('catch masivo',e);
              console.log(e);
              // this.hideModal();
                 Swal.fire({
                    text:"Estamos teniendo problemas al cargar las notas de los alumnos. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });                  
               }
            );
    },
    FileUpload(){
        let file=this.$refs.file.files[0];
        console.log('archivo',file);
        //console.log('cods',this.listAlumnosCod);
        let formData= new FormData();
        let headers={'Content-Type':'multipart/form-data'};
        formData.append('file',file);       
        formData.append('_hidden','solojoh');
        //
        const params={
            codigos:this.listAlumnosCod,
            files:formData,
            headers:headers,
        }
        Axios
              .post('/usuarios/masivo',params)
              .then( response=>{
                console.log('masivo: ',response);
                if(response.status=='Subida terminada'){
                Swal.fire({
                    text:"Se guardaron los datos con éxito",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                }
                else{
                    Swal.fire({
                    text:"Algo pasó",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                }

            }).catch(e => {
              console.log('catch grupal',e);
              console.log(e);
              // this.hideModal();
                 Swal.fire({
                    text:"Estamos teniendo problemas al cargar las notas de los alumnos. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });                  
               }
            );
    },


    }
})
</script>


<style lang="scss" scoped>
@import '../../assets/styles/intento.css';

.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}
.e-input-group:not(.e-float-icon-left),
.e-input-group.e-success:not(.e-float-icon-left),
.e-input-group.e-warning:not(.e-float-icon-left),
.e-input-group.e-error:not(.e-float-icon-left),
.e-input-group.e-control-wrapper:not(.e-float-icon-left),
.e-input-group.e-control-wrapper.e-success:not(.e-float-icon-left),
.e-input-group.e-control-wrapper.e-warning:not(.e-float-icon-left),
.e-input-group.e-control-wrapper.e-error:not(.e-float-icon-left) {
  border: transparent;
  border-width: 0 0 1px 0;
}
input.e-input, .e-input-group input.e-input, .e-input-group.e-control-wrapper input.e-input, textarea.e-input, .e-input-group textarea.e-input, .e-input-group.e-control-wrapper textarea.e-input{
    border-width: 1px !important;
}
.input.e-input, .e-input-group input.e-input, .e-input-group input, .e-input-group.e-control-wrapper input.e-input, .e-input-group.e-control-wrapper input, .e-float-input input, .e-float-input.e-input-group input, .e-float-input.e-control-wrapper input, .e-float-input.e-control-wrapper.e-input-group input, .e-input-group, .e-input-group.e-control-wrapper, .e-float-input, .e-float-input.e-control-wrapper {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    text-align: center;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif;
    font-size: 17px;
    margin-bottom:0px!important;
}

.e-control .e-autocomplete .e-lib .e-input .e-keyboard {
    z-index: -100;
}
.borde-textbox {
    border-radius: 1.25rem;  
    border: 2px solid #757575;
}
.izq {
    //background-color: cornflowerblue;
    padding: 20px;
}
.der {
    //background-color: darkgreen;
    padding: 20px;
}
.tutoria-title{
    margin-top: 30px;
    margin-bottom: 20px;
}
.grid-divider {
  overflow-x: hidden; //quickfix to hide divider on left side
  position: relative;
}

.font-weight-bolder {
    color: black;
    font-size: 24px;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
}
.botones {
    margin:auto;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.text-left {
    margin-bottom: 20px;
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
}
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}
hr {
    height: 0px !important;
    border-width: 0;
    color: blue;
    background-color: #e5e5e5;
    border-top: 0.4px solid rgba(0, 0, 0, 0.1) !important;
}
</style>