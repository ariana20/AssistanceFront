<template>
    <div style="margin-left:5%">
      <div >
        <section class="text-left" style="padding-top:0px">
            <h5 style="font-weight: bold;">Carga masiva de alumnos</h5>
            <h6 >El formato permitido para el archivo es el siguiente: CSV(delimitado por comas)</h6>
            <h6 >El tamaño máximo permitido para el archivo es el siguiente: 2MB </h6>
            <h6 >El orden de las columnas permitidas para el archivo es el siguiente:</h6>  
            
            <div style="overflow: auto;width:100%;margin-top:2%"> 
                      <td style="text-indent: 25px">Codigo*</td>
                      <td style="text-indent: 25px">Correo*</td>
                      <td style="text-indent: 25px" >Nombres*</td>
                      <!-- <th scope="col">Apellido Materno*</th>
                      <th scope="col">Apellido Paterno*</th> -->
                      <td style="text-indent: 25px" >Apellidos</td>

                      <td style="text-indent: 25px">Celular</td>
                      <td style="text-indent: 25px" >Condicion</td>                            
        
            </div>
            <h6 >Las condiciones de los alumnos válidas son las siguientes:</h6>
            
            <div style="overflow: auto;width:100%;margin-top:2%">
              <tr>
                <td style="text-indent:25px" v-for="(item,id) in condiAlumnos" v-bind:key="id">{{item.nombre}}</td>
              </tr>
            </div>

            <input type="file" id="get-files" ref="file" name="client-file"  class="col-md-offset-4 col-md-4" v-on:change="FileUpload" />
            <button type="button" style="margin:5px;border-radius: 10px;" id="btnsubir" class="btn btn-info" v-on:click="subirPDFs">Subir archivo</button>
            <button type="button"  class="btn btn-info" style="border-radius: 10px;border-color:gray;background-color:gray;margin-left:2%" id="btnCancela" v-on:click="cancelarAlumnos()"  >Cancelar</button>  

            <h6 >* Columnas obligatorios-No incluirlas en la cabecera</h6>



        </section>
        <section class="text-left" v-if="this.banderaReporte==true" style="padding-top:0px">
            <h5 style="font-weight: bold;">Reporte de errores</h5>
            <div style="overflow: auto;width:100%;margin-top:2%">
              <table class="table" style="text-align:left" >
                <thead>
                  <tr>
                    <th scope="col">N°</th>
                      <th scope="col">Codigo</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Descripcion</th>
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
            </div>
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

export default Vue.extend ({
    name: 'formNotas',
    
    data: function () {
        return {        
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
            condiAlumnos:[],
            miprog:this.$store.state.programaActual, //this.miprog.id_programa;
        }
    },
    mounted(){   
    //
    if(this.$store.state.usuario==null) this.$router.push('/login');
    
    this.listarCA();
    document.getElementById("btnsubir").disabled =true; //inhabilita
    },
    methods: {
      listarCA(){
          this.showModal();
        Axios.create()
              .post('/usuarios/condAlumno')
              .then( response=>{
                console.log('condA: ',response.data);
                this.condiAlumnos=response.data;    
                this.hideModal();        

            }).catch(e => {
              console.log('catch condAlumno',e);
              console.log(e);
              // this.hideModal();
                 Swal.fire({
                    text:"Estamos teniendo problemas al listar las condiciones del alumno. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });        
                  this.hideModal();             
               }
            );

      
      },
    
       cancelarAlumnos(){
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
        
        //Para masivo
        this.reporte=null;
        this.banderaReporte=false;
        let files=this.$refs.file.files;
        console.log('archivoS',files);
        //console.log('cods',this.listAlumnosCod);
        this.formData= new FormData();           
        this.formData.append('_hidden','solojohAl');   
        if(files[0].size>=2000000){
            Swal.fire({
                    text:"No puede subir el archivo "+files[0].name+", ya que es mayor de 2 MB.",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
               })
             document.getElementById("btnsubir").disabled = true; //inhabilita
        }   else{
              this.formData.append('file', files[0]);
        // document.getElementById("btnsubir").disabled = true; //inhabilita
         document.getElementById("btnsubir").disabled =false; //habilita
        }
      
        
    },

    
    subirPDFs(){ //Para masivo
        //desahilitar btn subir
        document.getElementById("btnsubir").disabled = true; //inhabilita
        this.showModal();
        
       Axios /////////////ruta
       //this.miprog.id_programa;
              // .post('/usuarios/alumnoMasivo',
              .post('/usuarios/alumnoMasivo/'+this.miprog.id_programa,
              this.formData,  {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
              .then( response=>{
                console.log('rptaM: ',response);//Subida terminada
                if(response.data==[]) {
                  Swal.fire({
                    text:"Estamos teniendo problemas al cargar los datos de los nuevos alumnos. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Ok',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  }); 
                }
                else if(response.data.status.indexOf("Se han encontrado errores")!=-1){
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
                  else if(response.data.status.indexOf("El archivo no tiene formato csv")!=-1){
                     this.hideModal();
                    Swal.fire({
                        text:"No ha subido un archivo con formato .csv o está con delimitado de ','(coma) ",
                        icon:"error",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                   document.getElementById("btnsubir").disabled = true; //inhabilita

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
                    text:"Estamos teniendo problemas al cargar los datos de los nuevos alumnos. Vuelve a intentar en unos minutos.",
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