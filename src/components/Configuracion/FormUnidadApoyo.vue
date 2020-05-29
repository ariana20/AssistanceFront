<template>
    <div class="FormRoles">
        <div class="container" style="margin-left:300px;margin-top:40px;text-align: left">
            <table>
                <tbody>
                    <td >
                        <tr style="text-align:left">
                            <td style="width:200px;">Nombre:</td>
                            <td>
                                <input v-model="unidad.nombre" class="form-control" type="text" onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 165) )">
                            </td>
                        </tr>
                        <tr style="text-align:left">
                            <td style="width:200px;">Nombre del Contacto:</td>
                            <td>
                                <input v-model="unidad.nombre_contacto" class="form-control" type="text" onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)  )">
                            </td>
                        </tr>
                        <tr style="text-align:left">
                            <td style="width:200px;">Correo del Contacto:</td>
                            <td>
                                <input v-model="unidad.correo_contacto" id="corr" class="form-control"  type="text">
                            </td>
                        </tr>
                        <tr style="text-align:left">
                            <td style="width:200px;">Télefono del Contacto:</td>
                            <td>
                                <input  v-model="unidad.telefono_contacto" type="text" class="form-control" value="" maxlength="9" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)">
                            </td>
                        </tr>
                        <tr style="text-align:left">
                            <td style="width:200px;">Facultad a Asignar:</td>
                            <td style="width:200px;">
                                <select @change="Programas(facultadEl)" class= "form-control" style="color:gray" v-model="facultadEl">
                                    <option selected disabled :value="null">Elige un Programa</option>
                                    <option v-for="options in facultadesT" v-bind:key="options.id_facultad" :value="options">
                                    {{ options.nombre}}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr v-if="idUnidad || prog" style="text-align:left">
                            <td style="width:200px;">Programa a Asignar:</td>
                            <td style="width:200px;">
                                <select class= "form-control" style="color:gray" v-model="programaEl">
                                    <option selected disabled :value="null">Elige un Programa</option>
                                    <option v-for="options in programasT" v-bind:key="options.id_programa" :value="options">
                                    {{ options.nombre}}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    
                    </td> 
                </tbody>
            </table>
            <div  class="botones" style="bottom:25px;margin-top:40px;margin-left:240px">   
                <button type="button" style="margin:5px" class="btn btn-info" id="btnGuardar" v-on:click="Guardar()">Guardar</button>
                <button type="button"  class="btn btn-info" style="border-color:gray;background-color:gray;margin:20px" v-on:click="Regresar()"  >Cancelar</button>  
            </div>
        </div>
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
    axios.post('/facultad/listarTodo')
    .then(response=>{
    this.facultadesT = response.data
    })
    if(this.idUnidad){
        this.axios.post('/unidadesApoyo/listar/'+this.idUnidad).then( response =>{
            this.unidad= response.data;
            let index2;
            for (index2 = 0; index2 < this.facultadesT.length; index2++) {
                if(this.facultadesT[index2].id_facultad == this.unidad.programas[0].id_facultad) break;
            }
            this.facultadEl = this.facultadesT[index2];
            this.Programas(this.facultadEl);
        }).catch(e => {
            e
            Swal.fire({
                title: e,
                text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                icon:"warning",
                confirmButtonText: 'Sí',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
            }); 
            this.$store.state.usuarios=null;
            //this.$router.push('/unidadesApoyo');          
        });

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
        else if(this.facultadEl==null){
            Swal.fire({
                text:"No ha escogido una Facultad",
                icon:"error",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
            })  
        }
        else if(this.programaEl==null){
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
                    title: '¿Dese guardar '+this.unidad.nombre+' como Unidad de Apoyo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0097A7',
                    cancelButtonColor: '#757575',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        let obj = this.unidad;
                        obj.usuario_creacion = this.$store.state.usuario.id_usuario;
                        obj.id_programa = this.programaEl.id_programa;
                        axios.post('/unidadesApoyo/insertar',obj)
                            .then(response=>{
                                response
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
                            .catch(e=>console.log(e));
                    }
                })
            }
            else{
                Swal.fire({
                    title: '¿Dese guardar los cambios para '+this.unidad.nombre+'?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0097A7',
                    cancelButtonColor: '#757575',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        let obj = this.unidad;
                        obj.usuario_creacion = this.$store.state.usuario.id_usuario;
                        obj.id_programa = this.programaEl.id_programa;
                        axios.post('/unidadesApoyo/modificar/'+this.idUnidad,obj)
                            .then(response=>{
                                response
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
      
        
    },
    Regresar(){
        this.$router.push('/unidadesApoyo');
    },
    Programas(facultad){
        this.prog = false;
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
                    this.vez = false;
                }
                this.prog = true;
            })
    }
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