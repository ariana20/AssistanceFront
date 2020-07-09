<template>
  <div name='Recuperar Contrasena'>
    <div class="row"></div>
    <div class="container" style="margin-top:5%;background:#0097A7;box-shadow: rgba(0, 0, 0, 0.1) 26px 26px 26px;height:70vh;width:90%" >
        <div class="row"/>
        <div class="row" style="margin-top:5%;color:white">
            <div class="col-12">
                <h1>Ingrese su Correo</h1>
            </div>
        </div>
        <div class="row" style="margin-top:5%">
            <div class="col-12">
                <input class="borde-textbox inp" type="text" placeholder="Correo Electrónico"  @keyup.enter="Verificar" v-model="correo"/>
            </div>
        </div>
        <div v-if="usuario!=null" class="row" style="margin-left:5%;margin-top:5%;text-align:left;color:white">
            <div class="col-12 col-md-4" style="font-size:150%">
                {{usuario.nombre + " " + usuario.apellidos}}
            </div>
            <div v-if="usuario.bloqueado!='2'" class="col-12 col-md-2">
                No se ha solicitado el cambio de contraseña
            </div>
            <div v-if="usuario.token_recuperacion!=token_rec" class="col-12 col-md-2">
                El link de acceso no es válido
            </div>
        </div>
        <div v-if="usuario!=null && usuario.bloqueado=='2' && usuario.token_recuperacion==token_rec" class="row" style="margin-left:5%;margin-top:5%;text-align:left;color:white">
            <div class="col-12 col-md-2">
                Nueva contraseña:
            </div>
            <div class="col-12 col-md-5">
                <input class="borde-textbox inp" type="password" placeholder="Nueva contraseña"  v-model="nuevaContrasena"/>
            </div>
        </div>
        <div v-if="usuario!=null && usuario.bloqueado=='2' && usuario.token_recuperacion==token_rec" class="row" style="margin-left:5%;margin-top:5%;text-align:left;color:white">
            <div class="col-12 col-md-2">
                Confirmar contraseña:
            </div>
            <div class="col-12 col-md-5">
                <input class="borde-textbox inp" type="password" placeholder="Confirmar contraseña"  v-model="nuevaContrasenaConfirmar"/>
            </div>
        </div>
        <div v-if="usuario!=null && usuario.bloqueado=='2' && usuario.token_recuperacion==token_rec" class="row" style="margin-left:5%;margin-top:5%;text-align:center">
            <div class="col-12 col-md-6"> 
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
    methods:{
        Verificar(){
          this.axios.post('/vueuser',{usuario: {correo:this.correo}})
            .then(response=>{
              if(response.data.user){
                this.usuario = response.data.user
                Swal.fire({
                    text:"Usuario Encontrado",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                })
              }
              else{
                Swal.fire({
                  text:"No existe un usuario con ese correo",
                  icon:"error",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                })
              }
            })          
        },
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