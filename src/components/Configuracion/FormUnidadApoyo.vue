<template>
    <div class="FormRoles contenedor">
        <div class="row" >
            <div class="col-12 col-md-4 col-lg-1 form-inline" style="padding-left:28px">
                {{"     "+"Nombre: *"}}
            </div>
            <div class="col-12 col-md-6 col-lg-5" v-if="$store.state.visualizacion!=true">
                <input style="margin-top:2%" v-model="unidad.nombre" class="form-control" type="text" 
                onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90)
                ||  (event.charCode >= 97 && event.charCode <= 122)
                || (event.charCode >= 160 && event.charCode <= 165)
                || (event.charCode == 225 || event.charCode == 233 || event.charCode == 237 || event.charCode == 243 || event.charCode == 250))">
            </div>
            <div class="col-12 col-md-6 col-lg-5" v-else>
                <input disabled style="margin-top:2%" v-model="unidad.nombre" class="form-control" type="text" 
                onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90)
                ||  (event.charCode >= 97 && event.charCode <= 122)
                || (event.charCode >= 160 && event.charCode <= 165)
                || (event.charCode == 225 || event.charCode == 233 || event.charCode == 237 || event.charCode == 243 || event.charCode == 250))">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 col-lg-1 form-inline">
                Nombre del Contacto: *
            </div>
            <div class="col-12 col-md-6 col-lg-5" v-if="$store.state.visualizacion!=true">
                <input style="margin-top:2%" v-model="unidad.nombre_contacto" class="form-control" type="text" 
                onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90)
                ||  (event.charCode >= 97 && event.charCode <= 122)
                || (event.charCode >= 160 && event.charCode <= 165)
                || (event.charCode == 225 || event.charCode == 233 || event.charCode == 237 || event.charCode == 243 || event.charCode == 250))">
            </div>
            <div class="col-12 col-md-6 col-lg-5" v-else>
                <input disabled style="margin-top:2%" v-model="unidad.nombre_contacto" class="form-control" type="text"
                onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90)
                ||  (event.charCode >= 97 && event.charCode <= 122)
                || (event.charCode >= 160 && event.charCode <= 165)
                || (event.charCode == 225 || event.charCode == 233 || event.charCode == 237 || event.charCode == 243 || event.charCode == 250))">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 col-lg-1 form-inline">
                Correo del Contacto: *
            </div>
            <div class="col-12 col-md-6 col-lg-5" v-if="$store.state.visualizacion!=true">
                <input style="margin-top:2%" v-model="unidad.correo_contacto" id="corr" class="form-control"  type="text">
            </div>
            <div class="col-12 col-md-6 col-lg-5" v-else>
                <input style="margin-top:2%" v-model="unidad.correo_contacto" id="corr" class="form-control"  type="text" disabled>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 col-lg-1 form-inline">
                Télefono del Contacto: *
            </div>
            <div class="col-12 col-md-6 col-lg-5" v-if="$store.state.visualizacion!=true">
                <input style="margin-top:2%" v-model="unidad.telefono_contacto" type="text" class="form-control" value="" maxlength="9" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)">
            </div>
            <div class="col-12 col-md-6 col-lg-5" v-else>
                <input disabled style="margin-top:2%" v-model="unidad.telefono_contacto" type="text" class="form-control" value="" maxlength="9" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)">
            </div>
        </div>
        <div v-if="$store.state.tipoActual.nombre == 'Admin' &&  $store.state.visualizacion!=true" class="row" >
            <div class="col-12 col-md-4 col-lg-1 form-inline">
                Facultad a Asignar: *
            </div>
            <div class="col-12 col-md-6 col-lg-5">
                <select @change="Programas(facultadEl)" class= "form-control" style="color:gray;margin-top:2%" v-model="facultadEl">
                    <option selected disabled hidden :value="null">Elige una Facultad</option>
                    <option v-if="$store.state.tipoActual.nombre == 'Admin'" :value="0">General</option>
                    <option v-for="options in facultadesT" v-bind:key="options.id_facultad" :value="options">
                    {{ options.nombre}}
                    </option>
                </select>
            </div>
        </div>
        <div v-if="(($store.state.tipoActual.nombre == 'Admin' && (prog) )|| $store.state.tipoActual.nombre == 'Coordinador Facultad') &&  $store.state.visualizacion!=true" class="row">
            <div class="col-12 col-md-4 col-lg-1 form-inline">
                Programa a Asignar: *
            </div>
            <div class="col-12 col-md-6 col-lg-5">
                <select class= "form-control" style="color:gray;margin-top:2%" v-model="programaEl">
                    <option selected disabled hidden :value="null">Elige un Programa</option>
                    <option v-if="$store.state.tipoActual.nombre == 'Admin' || $store.state.tipoActual.nombre == 'Coordinador Facultad'" :value="0">General Facultad</option>
                    <option v-for="options in programasT" v-bind:key="options.id_programa" :value="options">
                    {{ options.nombre}}
                    </option>
                </select>
            </div>
        </div>
        <div class="row" style="margin-top:2%">
            <div class="col-12 form-inline">
                * Campos obligatorios 
            </div>
        </div>
        <div  class="col-12 botones" style="text-align:center" v-if="$store.state.visualizacion!=true">   
            <button type="button" style="margin:5px" class="btn btn-info" id="btnGuardar" v-on:click="Guardar()">Guardar</button>
            <button type="button"  class="btn btn-info" style="border-color:gray;background-color:gray;margin:20px" v-on:click="Regresar()">Cancelar</button>  
        </div>
        <div  class="col-12 botones" style="text-align:center" v-else>
            <button type="button"  class="btn btn-info" style="border-color:gray;background-color:gray;margin:20px" v-on:click="Regresar()">Regresar</button>  
        </div>
        <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
            <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
                <b-spinner style="width: 3rem; height: 3rem;"/>
                <br >Cargando... 
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  props: {
      idUnidad: String,
  },
  data(){
    return{
        unidad:{
            id_unidad_apoyo:null,
            nombre:null,
            nombre_contacto:null,
            correo_contacto:null,
            estado:null,
            telefono_contacto:null,
        },
        general:false,
        general2:false,
        vez:true,
        prog:false,
        programaEl:null,
        facultadEl:null,
        programasT:null,
        facultadesT:null,
        telefono:null,
        cambios:[],
        permisosActuales:[]
    }
  },
  created(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    if(this.$store.state.tipoActual.nombre == 'Admin' || this.$store.state.tipoActual.nombre == 'Coordinador Facultad'){
        this.showModal()
        axios.post('/facultad/listarFacultades',{id_institucion: 1})
            .then(response=>{
                this.facultadesT = response.data
                if(this.idUnidad){
                    this.axios.post('/unidadesApoyo/listar/'+this.idUnidad)
                        .then( response =>{
                            this.unidad= response.data;
                            let index2;
                            for (index2 = 0; index2 < this.facultadesT.length; index2++) {
                                if(this.facultadesT[index2].id_facultad == this.unidad.programas[0].id_facultad) break;
                            }
                            this.facultadEl = this.facultadesT[index2];
                            if(index2>=this.facultadesT.length) this.facultadEl = 0;
                            this.Programas(this.facultadEl);
                        })
                        .catch(e => {
                            e
                            this.hideModal()
                            Swal.fire({
                                title: e,
                                text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                                icon:"warning",
                                confirmButtonText: 'Sí',
                                confirmButtonColor:'#0097A7',
                                showConfirmButton: true,
                            }); 
                            this.$store.state.usuarios=null;
                            this.$router.push('/unidadesApoyo');          
                    });

                }
                else if(this.$store.state.tipoActual.nombre == 'Coordinador Facultad'){
                    let index2;
                    for (index2 = 0; index2 < this.facultadesT.length; index2++) {
                        if(this.facultadesT[index2].id_facultad == this.$store.state.programaActual.id_facultad) break;
                    }
                    this.facultadEl = this.facultadesT[index2];
                    this.Programas(this.facultadEl);
                }
            })
            .catch(e => {
                e
                this.hideModal()
                Swal.fire({
                    title: e,
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                }); 
                this.$store.state.usuarios=null;
                this.$router.push('/unidadesApoyo');        
            })
    }
    if(this.$store.state.tipoActual.nombre == 'Coordinador Programa'){
        if(this.idUnidad){
            this.showModal();
            this.axios.post('/unidadesApoyo/listar/'+this.idUnidad)
                .then( response =>{
                    this.unidad= response.data;
                    this.hideModal()
                })
                .catch(e => {
                    e
                    this.hideModal()
                    Swal.fire({
                        title: e,
                        text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                        icon:"warning",
                        confirmButtonText: 'Sí',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    }); 
                    this.$store.state.usuarios=null;
                    this.$router.push('/unidadesApoyo');          
                });
        }
    }
  },
  methods:{

    Guardar(){
        var regex = /^([A-Z]|[a-z]|.|[0-9])+(@)([A-Z]|[a-z])+((.)([a-z])+)+$/
        let todoLleno = (this.unidad.nombre=='' || this.unidad.nombre == null)
         || (this.unidad.nombre_contacto=='' || this.unidad.nombre_contacto == null)
         || (this.unidad.correo_contacto=='' || this.unidad.correo_contacto == null)
         || (this.unidad.telefono_contacto=='' || this.unidad.telefono_contacto == null);
        if(todoLleno){
            Swal.fire({
            text:"No ha completado todos los campos",
            icon:"error",
            confirmButtonText: 'OK',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
            })   
        } 
        else if(!(regex.test(this.unidad.correo_contacto))){
            Swal.fire({
            text:"No es un correo válido",
            icon:"error",
            confirmButtonText: 'OK',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
            })   
        }
        else if(this.$store.state.tipoActual.nombre == 'Admin'){
            if(this.facultadEl==null){
                Swal.fire({
                    text:"No ha escogido una Facultad",
                    icon:"error",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                })  
            }
            else if(this.programaEl==null  && this.facultadEl!=0){
                Swal.fire({
                    text:"No ha escogido un Programa",
                    icon:"error",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                }) 
            }
            else{
                if(this.idUnidad==null){
                    Swal.fire({
                        title: '¿Desea guardar '+this.unidad.nombre+' como Unidad de Apoyo?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#0097A7',
                        cancelButtonColor: '#757575',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            this.showModal();
                            let obj = this.unidad;
                            obj.usuario_creacion = this.$store.state.usuario.id_usuario;
                            if(this.facultadEl == 0) this.general2 = true;
                            if(this.programaEl == 0) this.general = true; 
                            if (this.facultadEl!=0) obj.id_facultad = this.facultadEl.id_facultad;
                            if (this.programaEl!=0 && this.facultadEl!=0) obj.id_programa = this.programaEl.id_programa;
                            obj.general = this.general;
                            obj.general2 = this.general2;
                            obj.tipo = this.$store.state.tipoActual.nombre;
                            axios.post('/unidadesApoyo/insertar',obj)
                                .then(response=>{
                                    response
                                    this.hideModal();   
                                    Swal.fire({
                                        text:"Guardado Exitoso",
                                        icon:"success",
                                        confirmButtonText: 'OK',
                                        confirmButtonColor:'#0097A7',
                                        showConfirmButton: true,
                                    })
                                    this.$store.state.unidades = null;
                                    this.$router.push('/unidadesApoyo');
                                })
                                .catch(e=>{
                                    console.log(e)
                                    this.hideModal();
                                });
                        }
                    })
                }
                else{
                    Swal.fire({
                        title: '¿Desea guardar los cambios para '+this.unidad.nombre+'?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#0097A7',
                        cancelButtonColor: '#757575',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            this.showModal();
                            if(this.facultadEl == 0) this.general2 = true;
                            if(this.programaEl == 0) this.general = true; 
                            let obj = this.unidad;
                            obj.usuario_creacion = this.$store.state.usuario.id_usuario;
                            obj.id_programa = this.programaEl.id_programa;
                            obj.general = this.general;
                            obj.general2 = this.general2;
                            obj.tipo = this.$store.state.tipoActual.nombre;
                            obj.id_facultad = this.facultadEl.id_facultad; 
                            axios.post('/unidadesApoyo/modificar/'+this.idUnidad,obj)
                                .then(response=>{
                                    response
                                    this.hideModal();
                                    Swal.fire({
                                        text:"Modificación Exitosa",
                                        icon:"success",
                                        confirmButtonText: 'OK',
                                        confirmButtonColor:'#0097A7',
                                        showConfirmButton: true,
                                    })
                                    this.$store.state.unidades = null;
                                    this.$router.push('/unidadesApoyo');
                                })
                                .catch(e=>{
                                    console.log('error',e)
                                    this.showModal();
                                    Swal.fire({
                                        text:"El programa ya cuenta con dicha unidad",
                                        icon:"warning",
                                        confirmButtonText: 'OK',
                                        confirmButtonColor:'#0097A7',
                                        showConfirmButton: true,
                                    }).then((result)=>{
                                        result
                                        this.$store.state.unidades = null;
                                        this.$router.push('/unidadesApoyo');
                                    }
                                    )
                                });
                        }
                    })
                }
            } 
        }
        else if(this.$store.state.tipoActual.nombre == 'Coordinador Programa'){
            if(this.idUnidad==null){
                Swal.fire({
                    title: '¿Desea guardar '+this.unidad.nombre+' como Unidad de Apoyo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0097A7',
                    cancelButtonColor: '#757575',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        this.showModal();
                        let obj = this.unidad;
                        obj.usuario_creacion = this.$store.state.usuario.id_usuario;
                        obj.id_programa = this.$store.state.programaActual.id_programa;
                        obj.tipo = this.$store.state.tipoActual.nombre;
                        axios.post('/unidadesApoyo/insertar',obj)
                            .then(response=>{
                                response
                                this.hideModal();
                                Swal.fire({
                                    text:"Guardado Exitoso",
                                    icon:"success",
                                    confirmButtonText: 'OK',
                                    confirmButtonColor:'#0097A7',
                                    showConfirmButton: true,
                                })
                                this.$store.state.unidades = null;
                                this.$router.push('/unidadesApoyo');
                            })
                            .catch(e=>{
                                console.log(e)
                                this.hideModal();
                            });
                    }
                })
            }
            else{
                Swal.fire({
                    title: '¿Desea guardar los cambios para '+this.unidad.nombre+'?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0097A7',
                    cancelButtonColor: '#757575',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        this.showModal();
                        let obj = this.unidad;
                        obj.usuario_creacion = this.$store.state.usuario.id_usuario;
                        axios.post('/unidadesApoyo/modificar/'+this.idUnidad,obj)
                            .then(response=>{
                                response
                                this.hideModal();
                                Swal.fire({
                                    text:"Modifiación Exitosa",
                                    icon:"success",
                                    confirmButtonText: 'OK',
                                    confirmButtonColor:'#0097A7',
                                    showConfirmButton: true,
                                })
                                this.$store.state.unidades = null;
                                this.$router.push('/unidadesApoyo');
                            })
                            .catch(e=>{
                                console.log('error',e)
                                this.hideModal();
                                Swal.fire({
                                    text:"El programa ya cuenta con dicha unidad",
                                    icon:"warning",
                                    confirmButtonText: 'OK',
                                    confirmButtonColor:'#0097A7',
                                    showConfirmButton: true,
                                }).then((result)=>{
                                    result
                                    this.$store.state.unidades = null;
                                    this.$router.push('/unidadesApoyo');
                                }
                                )
                            });
                    }
                })
            }
        }
        else if(this.$store.state.tipoActual.nombre == 'Coordinador Facultad'){
            if(this.programaEl==null){
                Swal.fire({
                    text:"No ha escogido un Programa",
                    icon:"error",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                }) 
            }
            else{
                if(this.idUnidad==null){
                    Swal.fire({
                        title: '¿Desea guardar '+this.unidad.nombre+' como Unidad de Apoyo?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#0097A7',
                        cancelButtonColor: '#757575',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            this.showModal();
                            if(this.programaEl == 0) this.general = true; 
                            let obj = this.unidad;
                            obj.usuario_creacion = this.$store.state.usuario.id_usuario;
                            obj.id_programa = this.programaEl.id_programa;
                            obj.id_facultad = this.$store.state.programaActual.id_facultad;
                            obj.tipo = this.$store.state.tipoActual.nombre;
                            obj.general = this.general;
                            axios.post('/unidadesApoyo/insertar',obj)
                                .then(response=>{
                                    response
                                    this.hideModal();
                                    Swal.fire({
                                        text:"Guardado Exitoso",
                                        icon:"success",
                                        confirmButtonText: 'OK',
                                        confirmButtonColor:'#0097A7',
                                        showConfirmButton: true,
                                    })
                                    this.$store.state.unidades = null;
                                    this.$router.push('/unidadesApoyo');
                                })
                                .catch(e=>{
                                    console.log(e)
                                    this.hideModal();
                                });
                        }
                    })
                }
                else{
                    Swal.fire({
                        title: '¿Desea guardar los cambios para '+this.unidad.nombre+'?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#0097A7',
                        cancelButtonColor: '#757575',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            this.showModal();
                            if(this.programaEl == 0) this.general = true; 
                            let obj = this.unidad;
                            obj.usuario_creacion = this.$store.state.usuario.id_usuario;
                            obj.id_programa = this.programaEl.id_programa;
                            obj.id_facultad = this.$store.state.programaActual.id_facultad;
                            obj.tipo = this.$store.state.tipoActual.nombre;
                            obj.general = this.general;
                            axios.post('/unidadesApoyo/modificar/'+this.idUnidad,obj)
                                .then(response=>{
                                    response
                                    this.hideModal();
                                    Swal.fire({
                                        text:"Modifiación Exitosa",
                                        icon:"success",
                                        confirmButtonText: 'OK',
                                        confirmButtonColor:'#0097A7',
                                        showConfirmButton: true,
                                    })
                                    this.$store.state.unidades = null;
                                    this.$router.push('/unidadesApoyo');
                                })
                                .catch(e=>{
                                    console.log('error',e)
                                    this.hideModal();
                                    Swal.fire({
                                        text:"El programa ya cuenta con dicha unidad",
                                        icon:"warning",
                                        confirmButtonText: 'OK',
                                        confirmButtonColor:'#0097A7',
                                        showConfirmButton: true,
                                    }).then((result)=>{
                                        result
                                        this.$store.state.unidades = null;
                                        this.$router.push('/unidadesApoyo');
                                    }
                                    )
                                });
                        }
                    })
                }
            } 
        }
        
    },
    Regresar(){
        this.$router.push('/unidadesApoyo');
    },
    Programas(facultad){
        this.prog = false;
        if(facultad != "0"){
            this.showModal()
            axios.post('/programa/listarConCoord/'+facultad.id_facultad)
                .then(response=>{
                    let aux=[];
                    for (let index = 0; index < response.data.length; index++) {
                        aux.push(response.data[index].programa);
                    }
                    this.programaEl = null;
                    this.programasT = aux
                    if(this.idUnidad && this.vez){
                        let index;
                        for (index = 0; index < this.programasT.length; index++) {
                            if(this.programasT[index].nombre == this.unidad.programas[0].nombre) break;
                        }
                        this.programaEl = this.programasT[index];
                        if(index>=this.programasT.length) this.programaEl = 0;
                        this.vez = false;
                    }
                    this.prog = true;
                    this.hideModal()
                })
                .catch(e => {
                    e
                    this.hideModal()
                    Swal.fire({
                        title: e,
                        text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                        icon:"warning",
                        confirmButtonText: 'Sí',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    }); 
                    this.$store.state.usuarios=null;
                    this.$router.push('/unidadesApoyo');          
                });
        }
    },
    showModal() {
      //this.$refs['my-modal'].show()
    },
    hideModal() {
      //this.$refs['my-modal'].hide()
    },
  }
}
</script>

<style scoped>
  .inp{
    margin-left:50px;
    width:300px;
    padding-left: 15px;
  }
  
.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
    width: 100%;
}
.motivo-dropdown-title {
    top: 10px;
    text-align: left;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0%;
    padding: 12px 16px;
    transform: translate(0%, -50%);
}
.title-container{
    margin-top: 30px;
    margin-bottom: 30px;
}

.top-titulo {
    display: flex;
    justify-content: space-between;
}
.botones {
    margin:auto;
}
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}
</style>