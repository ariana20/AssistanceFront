<template>
    <div name="Form Perfil" style="margin-left:5%">
        <div class="font-weight-bolder text-left" style="font-size:180%">{{$store.state.usuario.nombre+" "+$store.state.usuario.apellidos}}</div>
        <div v-if="usuario!=null" class="row" style="text-align:left;">
            <div class="col-12 col-md-3" style="margin-top:3%">
                <div class="row" style="margin-bottom:5%;text-align:center" >
                    <div class="col-10 offset-2" style="text-align:center">
                        <figure v-if="(usuario.imagen!='' && usuario.imagen!=null) || this.selectedFile!=null" id="floated" class="image-logo" style="height:140px;margin:auto" >
                            <img v-if="this.selectedFile!==null" alt="Foto" :src="selectedFile" height="140px" width="100%">
                            <div v-else>
                                <img v-if="usuario.imagen[0]!='u'" :src="usuario.imagen" alt="Foto" height="140px" width="100%" />
                                <img v-else :src="'https://assisstanceproyecto20201.vizcochitos.cloudns.cl/'+usuario.imagen" alt="Foto" height="140px" width="100%" />
                            </div>
                        </figure>
                        <figure v-if="(usuario.imagen=='' || usuario.imagen==null) && this.selectedFile==null" id="floated" class="image-logo">	
                                <b-avatar size="7rem" ></b-avatar>		
                        </figure>
                    </div>
                </div>
                <div class="row" style="margin-bottom:2%;text-align:center" >
                    <div class="col-5">
                        <input type="file" accept="image/*" id="archivo" style="display: none;" v-on:change="onFileSelected" >
                        <button @click="Elegir" type="button" class="btn btn-info" style="background-color:gray;border: 0px;width:100%">Elegir</button>
                    </div>
                    <div class="col-5">
                        <button @click="onUpload" type="button" class="btn btn-info" style="border: 0px;width:100%">Subir</button>
                    </div>
                </div>
            </div>
            <div class=" col-12 col-md-8" style="margin-top:3%">
                <div class="row" style="margin-bottom:2%;font-size:120%;width:100%" >
                    <div class="text-left col-12 col-md-3">Codigo: </div>
                    <div class="col-12 col-md-9">{{usuario.codigo}}</div>
                </div>
                <div class="row" style="margin-bottom:2%;font-size:120%;width:100%" >
                    <div class="text-left col-12 col-md-3">Correo: </div>
                    <div class="col-12 col-md-9">{{usuario.correo}}</div>
                </div>
                <div class="row" style="margin-bottom:2%;font-size:120%;width:100%">
                    <div class="text-left col-12 col-md-3">Telefono: </div>
                    <input class="borde-textbox inp col-11 col-md-5" style="margin-left:5px" type="text" v-model="usuario.telefono" maxlength="9" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)">
                </div>
                <div class="row" style="margin-bottom:2%;font-size:120%;width:100%">
                    <div class="text-left col-12 col-md-3">Programa Actual: </div>
                    <div class="col-12 col-md-9">{{$store.state.programaActual.nombre}}</div>
                </div>
                <div class="row" style="margin-bottom:2%;font-size:120%;width:100%">
                    <div class="text-left col-12 col-md-3">Tipo de Usuario: </div>
                    <div class="col-12 col-md-9">{{$store.state.tipoActual.nombre}}</div>
                </div>
                <div v-if="$store.state.tipoActual.nombre == 'Alumno'" class="row" style="margin-bottom:2%;font-size:120%;width:100%">
                    <div class="text-left col-12 col-md-3">Condicion: </div>
                    <div class="col-12 col-md-9">{{usuario.cond}}</div>
                </div>
                <div class="row" style="margin-bottom:2%;font-size:120%;width:100%">
                    <div class="text-left col-12 col-md-3">Sexo: </div>
                    <div class="col-12 col-md-2">
                        <input type="radio" id="Masculino" value="M" v-model="usuario.sexo">
                        <label for="Masculino" style="margin-left:5px">Masculino</label>
                    </div>
                    <div class="col-12 col-md-2">
                        <input type="radio" id="Femenino" value="F" v-model="usuario.sexo">
                        <label for="Femenino" style="margin-left:5px">Femenino</label>
                    </div>
                </div>
                <div class="row" style="margin-bottom:2%;font-size:120%;width:100%">
                    <div class="text-center col-12">
                        <button class="btn btn-info" v-on:click="Guardar()">Guardar</button>
                    </div>
                </div>
            </div>    
        </div>
        <!-- Modal de cargando -->
        <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
            <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
                <b-spinner style="width: 3rem; height: 3rem;"/>
                <br >Cargando... 
            </div>
        </b-modal>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    data(){
        return{
            usuario: null,
            selectedFile:null,
        }
    },
    mounted(){
        if(this.$store.state.usuario==null) this.$router.push('/login')
        this.showModal()
        this.axios.post('/usuarios/listar/'+this.$store.state.usuario.id_usuario)
            .then(response=>{
                this.usuario = response.data;
                this.hideModal();
            })
    },
    methods:{
        Guardar(){
            Swal.fire({
                text: '¿Desea modificar sus datos?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0097A7',
                cancelButtonColor: '#757575',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
            }).then(result=>{
                if (result.value) {
                    this.showModal()
                    const obj = {
                        //Parametros modificados de usuario
                        telefono:this.usuario.telefono,
                        sexo:this.usuario.sexo
                    };
                    this.axios
                        .post('/usuarios/modificar/'+this.usuario.id_usuario,obj)
                        .then( response=>{
                            response
                            this.hideModal();
                            Swal.fire({
                                text:"Guardado Exitoso",
                                icon:"success",
                                confirmButtonText: 'Ok',
                                confirmButtonColor:'#0097A7',
                                showConfirmButton: true,
                            })
                        })
                        .catch(e => {
                            this.hideModal();
                            console.log('catch al modif: ',e.response);
                            Swal.fire({
                                text:"Estamos teniendo problemas al modificar al usuario. Vuelve a intentar en unos minutos.",
                                icon:"warning",
                                confirmButtonText: 'Ok',
                                confirmButtonColor:'#0097A7',
                                showConfirmButton: true,
                            })
                        });
                }
            })
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        onFileSelected(e){
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.selectedFile = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        onUpload(){
            if(this.selectedFile == null){
                Swal.fire({
                    text:"No ha seleccionado una imagen",
                    icon:"error",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                }) 
            }
            else{
                Swal.fire({
                    text: '¿Desea modificar su foto de perfil?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0097A7',
                    cancelButtonColor: '#757575',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then(result=>{
                    if(result.value){
                        this.showModal()
                        this.axios.post('/usuarios/subirFoto',{
                            image: this.selectedFile,
                            id_usuario:this.usuario.id_usuario,
                            usuario_actualizacion: this.usuario.id_usuario,
                        })
                        .then( response=>{
                            this.hideModal()
                            console.log(response)
                            let imgIns = response.data.path
                            console.log(imgIns)
                            this.usuario.imagen = imgIns;
                        })
                        .catch(e => {
                            console.log(e.response);
                            this.hideModal();
                        })
                    }
                })
            }
        },
        Elegir(){
            document.getElementById('archivo').click();
        }
    }
}
</script>

<style scoped>
#floated{
    float: left;
    width: 150px;
    margin-top:15px;
    text-align:center;
}
#botones {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}
.btn-enviar-msg { 
    margin-left:540px;
    background-color: white;
    color: black;
    border: 2px solid #17a2b8;
}
.btn:focus {
    outline:none;
    box-shadow: none;
    border: 2.3px solid transparent;
}
select:focus {
    outline:none;
    box-shadow: none;
}
img {
  border-radius: 50%;
}
</style>