<template>
  <div class="FormInstitucion contenedor">
    <div v-if="programa!=null"  style="width:95%;text-align: left">
    <div class="row">
        <div class="col-12" style="text-align:center;margin-top:20px;margin-bottom:5%">
            <h4 class="font-weight-bolder text-left institucion-title">Información del Programa</h4>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2" style="margin-bottom:2%">
            Código: *
        </div>
        <div class="col-12 col-md-6" style="margin-bottom:2%">
            <input class="borde-textbox inp" type="text" v-model="programa.codigo" style="border: 0px" disabled>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2" style="margin-bottom:2%">
            Nombre: *
        </div>
        <div class="col-12 col-md-6" style="margin-bottom:2%">
            <input class="borde-textbox inp" type="text" v-model="programa.nombre"
            onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90)
            ||  (event.charCode >= 97 && event.charCode <= 122)
            || (event.charCode >= 128 && event.charCode <= 165)
            || (event.charCode == 225 || event.charCode == 233 || event.charCode == 237 || event.charCode == 243 || event.charCode == 250) )">
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2" style="margin-bottom:2%">
            Descripción: *
        </div>
        <div class="col-12 col-md-6" style="margin-bottom:2%">
            <input class="borde-textbox inp" type="text" v-model="programa.descripcion" required
            onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90)
                ||  (event.charCode >= 97 && event.charCode <= 122)
                || (event.charCode >= 160 && event.charCode <= 165)
                || (event.charCode == 225 || event.charCode == 233 || event.charCode == 237 || event.charCode == 243 || event.charCode == 250))">
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2" style="margin-bottom:2%">
            Correo: 
        </div>
        <div class="col-12 col-md-6" style="margin-bottom:2%">
            <input class="borde-textbox inp" type="text" v-model="programa.correo">
        </div>
    </div>
    <div class="row">
        <div class="col-12" style="text-align:left;margin-top:20px;margin-bottom:5%">
            * Campos obligatorios 
        </div>
        <div class="col-12" style="text-align:center;margin-top:20px;margin-bottom:5%">
            <button type="submit" class="btn btn-info" @click="guardar">Guardar</button>
        </div>
    </div>
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
  data(){
    return{
        programa:null,
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    this.showModal()
    if(this.$store.state.programaActual){
        axios
        .post('/programa/listar/'+this.$store.state.programaActual.id_programa)
            .then( response=>{
                this.programa = response.data
                this.hideModal()
            })
            .catch(e => {
                console.log(e.response);
                this.hideModal()
            });
    }
  },
  methods:{
    guardar() {
        let nomVal =this.programa.nombre=='' || this.programa.nombre == null;
        let descVal = this.programa.descripcion=='' || this.programa.descripcion == null;
        let dirVal = this.programa.correo=='' || this.programa.correo == null;
        
        var   expresion2=/\w+@pucp.edu.pe/;
        var   expresion1=/\w+@pucp.pe/;
        if( nomVal || descVal || dirVal || (!expresion2.test(this.programa.correo) &&  !expresion1.test(this.programa.correo))){
          if(!expresion2.test(this.programa.correo) &&  !expresion1.test(this.programa.correo)){
            Swal.fire({
              text:"No es un correo válido",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
          }
          else{
            Swal.fire({
              text:"No ha completado todos los campos",
              icon:"error",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            })
          }
        }
        else{
          Swal.fire({
            text: '¿Desea modificar su Facultad?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0097A7',
            cancelButtonColor: '#757575',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.value) {
                this.showModal();

                let obj ={
                    nombre: this.programa.nombre,
                    descripcion: this.programa.descripcion,
                    codigo: this.programa.codigo,
                    correo: this.programa.correo,
                    usuario_actualizacion : this.$store.state.usuario.id_usuario,
                }
                axios.post('/facultad/modificar/'+this.programa.id_facultad,obj)
                    .then( response=>{
                        response
                        this.hideModal();
                        Swal.fire({
                            text: 'Tus facultad ha sido actualizado',
                            icon: 'success',
                            confirmButtonColor: '#0097A7',
                            confirmButtonText: 'Ok',
                        })
                    })
                    .catch(e => {
                        console.log(e.response);
                        this.hideModal();
                    })
            }
          })
        }
    },
    showModal() {
        if(this.$refs['my-modal']) this.$refs['my-modal'].show()
    },
    hideModal() {
        if(this.$refs['my-modal']) this.$refs['my-modal'].hide()
    },
  }
}
</script>

<style scoped>
  .imgP{
    border: 2px solid black;
    margin-left:100px;
    height: 150px;
    width:150px;
  }

  .inp{
    width:100%;
    padding-left: 15px;
    padding-right: 15px;
    height: calc(1.5em + 0.75rem + 2px);
  }

  .text-left{
    margin-bottom:5%;
  }

  .rowmar{
    margin-left:10px;
    margin-top:20px;
  }
  
  .institucion-title{
    margin-top: 30px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 600px) {
    
    .imgP{
      margin-left:35%;
    }

  }
</style>