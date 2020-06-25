<template>
  <div class="FormInstitucion ">
    <div class="container" style="text-align: left;left:-100px;">
      <form v-on:submit.prevent="guardarInstitucion" >
        <div class="row grid-divider" style="">
          <div class="izq col-lg-6 col-xm-2 col-md-12">
            <h4 class="font-weight-bolder text-left institucion-title">Datos</h4><br>
            <div class="row rowmar">
              <div class="font-weight-ligth text-left textF">Nombre * </div>
              <input class="borde-textbox inp" type="text" v-model="nombre">
            </div>
            <div class="row rowmar">
              <div class="font-weight-ligth text-left textF">Siglas * </div>
              <input class="borde-textbox inp" type="text" v-model="siglas" required>
            </div>
            <div class="row rowmar">
              <div class="font-weight-ligth text-left textF">Direccion * </div>
              <input class="borde-textbox inp" type="text" v-model="direccion" required>
            </div>
            <div class="row rowmar">
              <div class="font-weight-ligth text-left textF">Telefono * </div>
              <input class="borde-textbox inp" v-model="telefono" required>
            </div>
            <br>  * Campos obligatorios 
          </div>
          <div class="der col-lg-6 col-xm col-md-12">
            <h4 class="font-weight-bolder text-left institucion-title">Logo</h4>
            <div style="width:100px;text-align:center;margin-left:12%;margin-top:40px" >
              <img class="imgP" v-if="this.selectedFile!==null" alt="Vue logo" :src="selectedFile" id='LogoInst'>
              <img class="imgP" v-else alt="Vue logo" v-bind:src="logo" id='LogoInst'>        
            </div>
            <div style=";text-align:center">
              <input type="file" v-on:change="onFileSelected" style="margin-top:20px"><br>
              <button @click="onUpload" type="button" class="btn btn-info" style="margin-left: -10%;margin-top:20px">Subir</button>
            </div>
          </div>
        </div>
        <div style="margin-left:13%;margin-top:20px">
          <button type="submit" style="margin-left:80px" class="btn btn-info" v-on:click="guardarInstitucion()">Guardar</button>
        </div>
      </form>
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
      id:null,
      nombre:null,
      siglas:null,
      direccion:null,
      telefono:null,
      logo:null,
      selectedFile:null,
    }
  },
  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login')
    this.showModal()
    axios
      .post('/institucion/listarTodo')
        .then( response=>{
          this.id = response.data[0].id_institucion;
          this.nombre = response.data[0].nombre;
          this.direccion = response.data[0].direccion;
          this.telefono = response.data[0].telefono;
          this.siglas = response.data[0].siglas;
          this.logo = response.data[0].logo;
          this.hideModal()
        })
        .catch(e => {
          console.log(e.response);
          this.hideModal()
        });
  },
  methods:{
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
          text: '¿Desea modificar su Logo?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0097A7',
          cancelButtonColor: '#757575',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            this.showModal()
            axios.post('/institucion/subirLogo',{image: this.selectedFile})
              .then( response=>{
                console.log(response)
                let imgIns = response.data.path
                console.log(imgIns)
                this.logo = imgIns;
                let params = {
                  logo: this.logo,
                  usuario_actualizacion : this.$store.state.usuario.id_usuario,
                }
                axios.post('/institucion/modificar/'+this.id,params)
                .then( response=>{
                  response;
                  this.hideModal();
                  Swal.fire({
                    text:"Subida Exitosa",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                })
                .catch(e => {
                  console.log(e.response);
                  this.hideModal();
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
    guardarInstitucion() {
      let nomVal =this.nombre=='' || this.nombre == null;
      let siglasVal = this.siglas=='' || this.siglas == null;
      let dirVal = this.direccion=='' || this.direccion == null;
      var regex = /^(\(\+[0-9][0-9]\)[0-9]{9})$/
      let telVal = this.telefono=='' || this.telefono == null ;
      if(!(regex.test(this.telefono))){
        Swal.fire({
          title:"No es un número válido",
          text:"Formato (+11)111111111",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        })   
      } else{
        if( nomVal || siglasVal || dirVal || telVal){
          Swal.fire({
            text:"No ha completado todos los campos",
            icon:"error",
            confirmButtonText: 'OK',
            confirmButtonColor:'#0097A7',
            showConfirmButton: true,
          })        
        }else{
          Swal.fire({
            text: '¿Desea modificar su Institución?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0097A7',
            cancelButtonColor: '#757575',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.value) {
              this.showModal();
              const params = {
                nombre: this.nombre,
                siglas: this.siglas,
                direccion: this.direccion,
                telefono: this.telefono,
                usuario_actualizacion : this.$store.state.usuario.id_usuario,
              };

              axios.post('/institucion/modificar/'+this.id,params)
                .then( response=>{
                  response
                  this.hideModal();
                  Swal.fire(
                    'Modificacion Exitosa!',
                    'Tus institución ha sido actualizada.',
                    'success'
                  )
                })
                .catch(e => {
                  console.log(e.response);
                  this.hideModal();
                })
            }
          })
        }
      }
      
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
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
    margin-left:2%;
    width:300px;
    padding-left: 15px;
    height: calc(1.5em + 0.75rem + 2px);
    margin-top:-1%;
  }

  .textF{
    width: 20%;
  }

  .rowmar{
    margin-left:10px;
    margin-top:20px;
  }
  
  .institucion-title{
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>