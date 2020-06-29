<template>
    <div style="margin-left:5%">
         <!-- <div class="row grid-divider "> -->
            <div >
                <router-link to="reporteRendimiento"> 
                  <button  type="button"  style="text-align:right;border-radius: 10px;" class="btn btn-info">Reporte</button>
                 </router-link> 


                <section class="text-left" style="padding-top:0px">
                    <h5 style="font-weight: bold;">Carga masiva de notas de alumnos</h5>
                    <h6 >El formato permitido para los archivos es el siguiente: PDF</h6>
                    <h6 >El formato de nombre permitido para los archivos es el siguiente: Codigo</h6>
                    <h6 >El tamaño máximo permitido para los archivos es el siguiente: 2MB </h6>
                    <h6 >Ejemplo: 20152354.PDF</h6>

                    <input type="file" id="get-files" ref="file" name="client-file" 
                    multiple class="col-md-offset-4 col-md-4" v-on:change="FileUpload" style="margin-top:5%" />
                    <button style="margin:5px;border-radius: 10px;" class="btn btn-info" id="btnsubir" v-on:click="subirPDFs">Subir archivos</button>
                    <button type="button"  class="btn btn-info" style="border-radius: 10px;border-color:gray;background-color:gray;margin-left:2%" id="btnCancela" v-on:click="cancelarAlumnos()"  >Cancelar</button>  
      
                </section>
                <section class="text-left" v-if="this.banderaReporte==true" style="padding-top:0px">
                    <h5 style="font-weight: bold;">Reporte de errores</h5>
                    <table class="table" style="text-align:left" >
                     <thead>
                       <tr>
                         <th scope="col">N°</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in reporte" :key="index">
                            <th scope="row">{{index+1}}</th>
                            <td>{{item.codigo}}</td>        
                            <td>{{item.file}}</td>     
                            <td>{{item.error}}</td>      
                             
                         </tr>
                       </tbody>
                     </table>
                </section>
            </div> 
              <!-- Modal de cargando -->
      <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
        <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
          <b-spinner style="width: 3rem; height: 3rem;"/>
          <br >Subiendo archivos... 
        </div>
      </b-modal>
      <!-- <input class="col-sm-8 form-control"  style="text-align:center;
                            width:200%;margin-left:10px;padding-right:0px;text-align:center; "> -->
                            <!-- <b-icon  icon="file-earmark-plus" style="color:#757575;width:35px; height:35px;"/> -->
                            <!-- <input type="file" id="archivoInput"  ref="file" class="col-md-offset-4 col-md-4" v-on:change="FileUpload" /> -->
                           
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
            selectedFiles:[],
            formData:null,
            formData2:null,
            file1x1:null,
            banderaReporte:false,
            reporte:[],
            isWrong:false,
            miprog:this.$store.state.programaActual, //this.miprog.id_programa;
        }
    },
    mounted(){
       
    if(this.$store.state.usuario==null) this.$router.push('/login');
    
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

      document.getElementById("btnsubir").disabled =true; //inhabilita
    
   
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
    
   
    FileUpload(){
        document.getElementById("btnsubir").disabled =false; //habilita
        this.isWrong=false;
        //Para masivo
        this.reporte=null;
        this.banderaReporte=false;
        
        let files=this.$refs.file.files;
        console.log('archivoS',files);
        //console.log('cods',this.listAlumnosCod);
        this.formData= new FormData();           
        this.formData.append('_hidden','solojoh');
        //
         for( var i = 0; i < files.length; i++ ){
          let file = files[i];
          if(file.size>=2000000){
              this.formData=null;
              Swal.fire({
                    text:"No puede subir el conjunto de archivos debido al siguiente archivo: "+file.name+", ya que es mayor de 2 MB.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
               })
              this.isWrong=true;
              break;
          }

          this.formData.append('files[' + i + ']', file);
         
        }    
        if(this.isWrong==true) document.getElementById("btnsubir").disabled =true; //inhabilita
    },

    
    subirPDFs(){ //Para masivo
        //desahilitar btn subir
        document.getElementById("btnsubir").disabled = true; //inhabilita
        this.isWrong=false;
        this.showModal();
        
       Axios
              .post('/usuarios/masivo/'+this.miprog.id_programa,this.formData,  {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
              .then( response=>{
                console.log('rptaM: ',response);//Subida terminada
                
                if(response.data.status=="Se han encontrado errores"){
                    this.hideModal();
             
                    Swal.fire({
                        text:"Revise el Reporte de Carga. Se encontraron archivos con problemas ",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                    this.banderaReporte=true;                   
                    this.reporte=response.data.reporte;
                    document.getElementById("btnsubir").disabled = false;
                }
                else if(response.data.status=="Subida terminada"){ 
                    console.log(response);
                     this.hideModal();
                    Swal.fire({
                        text:"Se guardaron los datos con éxito",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                    // this.$router.push('/ListaUsuarios'); 
                    // this.$store.state.usuarioEscogido=null;//
                    // this.$store.state.usuarios=null;
                    document.getElementById("btnsubir").disabled = false;
                }
                else if(response.data.indexOf("Excepción capturada:")!=-1){ 
                   
                    this.hideModal();
                    Swal.fire({
                    text:"Se han ingresado documentos inválidos.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });
                  document.getElementById("btnsubir").disabled = false;
                }
                /*
                else{
                    this.hideModal();
                    Swal.fire({
                    text:"Se guardaron los datos con éxito",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })                  //listar usuairos               
                  
                }*/

            }).catch(e => {
              console.log('catch masivo',e);
              //console.log(e);
               this.hideModal();
               document.getElementById("btnsubir").disabled = false;
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
    //Modal de cargando
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    onFileSelected(e){//para 1 x 1
        
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      for (let index = 0; index < files.length; index++) {
        this.createFile(files[index]);
      }
      console.log(this.selectedFiles);
    },
    createFile(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
          vm.selectedFile = e.target.result;
          vm.selectedFiles.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    guardarNotas(){ //Para 1 x 1
      this.formData2= new FormData();
           
        this.formData2.append('_hidden','solojoh');
        //
         for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];

          this.formData2.append('files[' + i + ']', file);
          this.formData2.append('codigos[' + i + ']', this.listAlumnosCod[i]);
         
        }     
      this.showModal();
       //Le tengo que enviar form data?
      /*let obj = {
            files:this.selectedFiles,
            codigos:this.listAlumnosCod,
          }*/
      Axios.post('/usuarios/subirNotas',this.formData2,  {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
          .then(res =>{
            //this.$store.state.usuarios=res.data;
            //res.data=='Subido'
            this.hideModal();
            Swal.fire({
                    text:"Se guardaron los datos con éxito. Ningún archivo presentó errores",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });
                  console.log('grupal:',res);
                  this.$router.push('/ListaUsuarios'); 
                  this.$store.state.usuarioEscogido=null;//
                  this.$store.state.usuarios=null;
            
          })
          .catch(e => {
              this.hideModal();
            console.log(e.response.data);
            Swal.fire({
              text:"Estamos teniendo problemas al subir las notas de manera grupal. Vuelve a intentar en unos minutos.",
              icon:"warning",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
           })
       
    },
    
    File1by1(){
        console.log('1x1');
        this.file1x1=this.$refs.file.files[0];
        console.log('archivos',this.file1x1);
        //console.log('cods',this.listAlumnosCod);
        this.files[0]=this.file1x1;
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
    margin-bottom: 13px;
    height: 33px;
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
.btn-info{
    height: 33px;
    text-align: center;
}
</style>