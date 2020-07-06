<template>
<<<<<<< HEAD
  <div class="FormUsuario contenedor" style="margin-top:2%">
=======
  <div name="FormCoordinador" class="contenedor">
>>>>>>> origin/Ariana
    <div class="row">
      <div class="col-12 col-md-4 col-lg-2 form-inline">
        Codigo: *
      </div>
      <div class="col-12 col-md-6 col-lg-5">
        <input style="margin-top:2%" class=" form-control" type="text" v-model="codigo" onkeypress="return ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 165))">
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-2 form-inline">
        Nombres: *
      </div>
      <div class="col-12 col-md-6 col-lg-5">
        <input style="margin-top:2%" class="form-control" type="text" v-model="nombre" onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 165) )">
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-2 form-inline">
        Apellidos: *
      </div>
      <div class="col-12 col-md-6 col-lg-5">
        <input style="margin-top:2%" class="form-control" type="text" v-model="apellidos" onkeypress="return (( event.charCode == 32 || event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122)    || (event.charCode >= 160 && event.charCode <= 165) )">
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-2 form-inline">
        Celular: *
      </div>
      <div class="col-12 col-md-6 col-lg-5">
        <input style="margin-top:2%" class="form-control" type="text" maxlength="9" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" v-model="telefono">
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-2 form-inline">
        Correo: *
      </div>
      <div class="col-12 col-md-6 col-lg-5">
        <input style="margin-top:2%" class="form-control" type="text" id="corr" v-model="correo">
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-2 form-inline">
        Tipo de Coordinador *
      </div>
      <div class="col-12 col-md-6 col-lg-5">
        <select class= "form-control" style="color:gray;margin-top:2%" v-model="tipoSel">
          <option selected="true" disabled :value="0">Elige un Tipo de Coordinador</option>
          <option :value="2">Coordinador de Facultad</option>
          <option :value="3">Coordinador de Programa</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-12 form-inline">
        <b-form-checkbox v-model="estado" value="act" unchecked-value="ina"> Activo</b-form-checkbox>
      </div>
      <div class="col-12 form-inline" style="margin-top:2%">
        * Campos obligatorios  
      </div>
    </div>  
    <div  class="botones">   
      <button type="button" style="margin:5px" class="btn btn-info"  v-on:click="guardarUsuario()">Guardar</button>
      <button type="button"  class="btn btn-info" style="border-color:gray;background-color:gray;margin:20px" v-on:click="cancelarUsuario()"  >Cancelar</button>
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
import Axios from 'axios'
import Swal from 'sweetalert2'

export default {
  props:{
    id:String,
  },
  data(){
 
    return{
      id_usuario:null,
      codigo:"",
      nombre:"",
      // ap_paterno:"",
      // ap_materno:"",
      apellidos:"",
      correo:"",
      telefono:"",
      tiposUsuarios:"",
      tipoSel:0,
      estado:null,
      miprog:this.$store.state.programaActual,
      usuario_entrante:this.$store.state.usuarioEscogido,
      tipos:["Facultad","Coordinador"]
    }
  },

  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
    if(parseInt((this.id),10)!=0){
      this.showModal()
      Axios.create()
        .post('/usuarios/listar/'+parseInt((this.id),10))
          .then( response =>{
            document.getElementById("corr").disabled = true;
            this.codigo=response.data.codigo;
            this.nombre= response.data.nombre;
            this.apellidos=response.data.apellidos;
            this.correo=response.data.correo;
            this.telefono=response.data.telefono;
            this.estado=response.data.estado;
            this.hideModal()
          })
          .catch(e => {
            console.log(e.response);
            this.hideModal()
            Swal.fire({
              text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
              icon:"warning",
              confirmButtonText: 'Sí',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
            }); 
            this.$router.push('/coordinadores');          
          } );
    }
  },
  methods:{
    guardarUsuario() {
      var   expresion2=/\w+@\w+\.+edu.pe/;
      var   expresion1=/\w+@\w+\.+pe/;
      // console.log('estado: ',this.estado);
      // if(this.estado==null) console.log('entro al if estado: ',this.estado);
      if(this.telefono =="" || this.nombre=="" ||this.apellidos=="" || this.codigo=="" || this.correo=="" || this.estado===null   ){
      
      //Cuando está vacio todo
        Swal.fire({
          text:"No ha completado todos los campos",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        })        
      }
      else if( !expresion2.test(this.correo) &&  !expresion1.test(this.correo)){ //Verificación de correo
        Swal.fire({
          text:"No ha escrito una dirección de correo válida. Todos los correos deben contener @pucp.edu.pe o @pucp.pe",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        })
      }
      else if(this.telefono<10000000){ //Esto será válido?
        Swal.fire({
          text:"No ha colocado un número de teléfono válido. Mínimo 7 dígitos",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        })   
      }
      else if(this.tipoSel==0){
        Swal.fire({
          text:"No ha seleccionado un Tipo de Coordinador",
          icon:"error",
          confirmButtonText: 'OK',
          confirmButtonColor:'#0097A7',
          showConfirmButton: true,
        }) 
      }
      else{//está bien y envío
        this.showModal();
        const params = {
          codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            correo:this.correo.trim(),
            telefono:this.telefono,
            password:"1234",
            estado:this.estado,
            id_tipo_usuario:this.tipoSel,  
            //ahora, si es tipo usuario 4 de tutor debe insertar el tipo de tutoria
          };
        const params2 = {
          codigo:this.codigo.trim().replace(/\s+/g, ' '), 
          nombre:this.nombre.trim().replace(/\s+/g, ' '),
          apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
          estado:this.estado,
          telefono:this.telefono,  
          id_tipo_usuario:this.tipoSel,  
          // tengo que pasarle que modifique el tipo de rol, si el tutor id4 se modifica el tipo de tutoria
        };
              
            
        if(parseInt((this.id),10)==0){
          Axios.create()
            .post('/usuarios/insertar',params)
              .then( response=>{
                response
                this.hideModal();
                Swal.fire({
                  text:"Se guardaron los datos con éxito",
                  icon:"success",
                  confirmButtonText: 'OK',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                }) 
                this.$store.state.coordinadoresL = null;
                this.$router.push('/coordinadores'); 
              })
              .catch(e => {
                console.log(e)
                this.hideModal();
                Swal.fire({
                  text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                  icon:"warning",
                  confirmButtonText: 'Sí',
                  confirmButtonColor:'#0097A7',
                  showConfirmButton: true,
                });  
                this.$router.push('/coordinadores');         
              });
        }
        else if (parseInt((this.id),10)!=0){
          Axios.create()
          .post('/usuarios/modificar/'+parseInt((this.id),10),params2)
            .then( response=>{
              response
              this.hideModal();
              Swal.fire({
                text:"Se modificaron los datos con éxito",
                icon:"success",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
              }) 
              this.$store.state.coordinadoresL = null;
              this.$router.push('/coordinadores');
            }) 
            .catch(e => {
              console.log(e)
              this.hideModal();
              this.$router.push('/coordinadores');
            });
        }
      }
    },
    cancelarUsuario(){
      Swal.fire({
        text:"¿Está seguro que desea cancelar?",
        icon:"warning",
        confirmButtonText: 'Sí',
        confirmButtonColor:'#0097A7',
        cancelButtonText: 'No',
        cancelButtonColor:'C4C4C4',
        showCancelButton: true,
        showConfirmButton: true,
      })
      .then((result) => {
        if (result.value) {
          //lo redirigo
          this.$router.push('/coordinadores');
        } 
      })
        
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
.formUsuario { 
  font-size: 20px;
}
.form-control {
    border-radius: 1rem;  
    border: 0.5px solid #757575;
    text-align-last: left;
    margin-bottom:1.3em;
    width: 100%;
}
body{
  background-image: null;
  background-color: #B2EBF2;
}


</style>