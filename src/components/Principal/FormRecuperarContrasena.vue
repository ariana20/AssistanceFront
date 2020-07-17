<template>
  <div name='Recuperar Contrasena'>
    <div class="row"></div>
    <div class="container col-10 col-md-4 offset-md-4" style="margin-top:15%;background:#0097A7;box-shadow: rgba(0, 0, 0, 0.1) 26px 26px 26px" >
        <div class="row"/>
        <div v-if="usuario!=null" class="row" style="margin-left:5%;margin-top:5%;text-align:left;color:white">
            <div class="col-12" style="font-size:150%">
                {{usuario.nombre + " " + usuario.apellidos}}
            </div>
            <div v-if="usuario.bloqueado!='2'" class="col-12">
                No se ha solicitado el cambio de contraseña
            </div>
            <div v-if="usuario.token_recuperacion!=token_rec" class="col-12">
                El link de acceso no es válido
            </div>
        </div>
        <div v-if="usuario!=null && usuario.bloqueado=='2' && usuario.token_recuperacion==token_rec" class="row" style="margin-left:5%;margin-top:5%;text-align:left;color:white">
            <div class="col-12 col-md-4">
                Nueva contraseña:
            </div>
            <div class="col-12 col-md-8">
                <input class="borde-textbox inp" type="password" placeholder="Nueva contraseña"  v-model="nuevaContrasena"/>
            </div>
        </div>
        <div v-if="usuario!=null && usuario.bloqueado=='2' && usuario.token_recuperacion==token_rec" class="row" style="margin-left:5%;margin-top:5%;text-align:left;color:white">
            <div class="col-12 col-md-4">
                Confirmar contraseña:
            </div>
            <div class="col-12 col-md-8">
                <input class="borde-textbox inp" type="password" placeholder="Confirmar contraseña"  v-model="nuevaContrasenaConfirmar"/>
            </div>
        </div>
        <div v-if="usuario!=null && usuario.bloqueado=='2' && usuario.token_recuperacion==token_rec" class="row" style="margin-left:5%;margin-top:5%;text-align:center">
            <div class="col-11" style="margin-bottom:15px"> 
                <button type="submit" class="btn btn-info" v-on:click="cambiarContrasena()">Cambiar Contraseña</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: 'RecuperarContrasena',
    props: {
        token_rec: String,
    },
    data() {
        return {
            correo:null,
            usuario:null,
            nuevaContrasenaConfirmar: '',
            nuevaContrasena: '',
        }
    },
    mounted(){
        this.axios.post('/usuarios/recuperarContrasenaVal',{token: this.token_rec})
            .then(response=>{
                if(response.data.nombre != undefined){
                    this.usuario = response.data;
                }
                else{
                    Swal.fire({
                        text:"Link Inválido",
                        icon:"error",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    })
                    this.$router.push('/login')
                }
            }) 
    },
    methods:{
        cambiarContrasena(){
            if(this.nuevaContrasena == this.nuevaContrasenaConfirmar && this.nuevaContrasena!=''){
                Swal.fire({
                    text: '¿Desea modificar su contraseña?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0097A7',
                    cancelButtonColor: '#757575',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    result
                    this.axios.post('/usuarios/modificar/'+this.usuario.id_usuario,{password: this.nuevaContrasena,bloqueado: "0",token_recuperacion:""})
                        .then(response=>{
                            response
                            Swal.fire({
                                text:"Contraseña cambiada correctamente",
                                icon:"success",
                                confirmButtonText: 'OK',
                                confirmButtonColor:'#0097A7',
                                showConfirmButton: true,
                            })
                            this.$router.push('/login')
                        }) 
                })
            }
            else{
                if(this.nuevaContrasena==''){
                    Swal.fire({
                    text:"Los campos estan vacíos",
                    icon:"error",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                    })
                }
                else{
                    Swal.fire({
                    text:"Las contraseñas ingresadas no coinciden",
                    icon:"error",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                    })
                }
            }
        }
  }
}
</script>

<style>

  .inp{
    margin-left:2%;
    width:90%;
    padding-left: 15px;
    padding-right: 15px;
    height: calc(1.5em + 0.75rem + 2px);
    margin-top:-1%;
  }
</style>