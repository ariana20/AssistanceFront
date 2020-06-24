<template>
  <div class="FormUsuario container" style="margin-top:5px">
    <div style="margin-right:50px"></div>  
      <table>
      <tbody>
        <td >
        <tr style="text-align:left"><td>Codigo:</td>   <td> <input class=" form-control" type="text"       v-model="codigo"></td></tr>
        <tr style="text-align:left"><td>Nombre:</td>   <td> <input class="form-control" type="text"       v-model="nombre"></td></tr>
        <tr style="text-align:left"><td>Apellidos:</td>   <td> <input class="form-control" type="text"    v-model="apellidos"></td></tr>
        <tr style="text-align:left"><td>Celular:</td>   <td> <input class="form-control"  type="number"  v-model="telefono"></td></tr>
          <tr style="text-align:left"><td>Correo:</td>   <td> <input id="corr" class="form-control"  type="text" v-model="correo"></td></tr>
        <!-- Combos box -->        
        <tr style="text-align:left"><td>Tipos de usuarios:</td>   
          <select  v-model="tiposUsuariosselect" class="form-control" >
            <option   v-for="(tipoU,index) in tiposUsuarios" :value="tipoU.id_tipo_usuario" v-bind:key="index">
             {{ tipoU.nombre}}
             </option>
          </select>
         
        </tr>

       
        <tr style="margin-left:100px"  >
          <div class="row col-sm-6 " style="margin-left:80px;" > 
            <b-form-checkbox v-model="estado" value="act" unchecked-value="ina"> Activo</b-form-checkbox></div>

          </tr>    
       </td> 
      </tbody>
      </table>
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
      estado:null,
      id_usuario_entrante:parseInt((this.$route.path).substring(9,11),10),
      tiposUsuariosselect:null,
      tipostutorias:"",
      tipostutoriasselect:null,
       miprog:this.$store.state.programaActual,
      usuario_entrante:this.$store.state.usuarioEscogido,
    }
  },

  mounted(){
    if(this.$store.state.usuario==null) this.$router.push('/login');
    this.listarTUsuarios();
    this.listarTT();
    if(this.id_usuario_entrante!=0){
      console.log('Id usuario entrante: ');      
      console.log(this.id_usuario_entrante);
      this.tiposUsuariosselect=this.usuario_entrante.pivot.id_tipo_usuario;
     Axios.create()
       .post('/usuarios/listar/'+this.id_usuario_entrante).then( response =>{
         document.getElementById("corr").disabled = true;
         console.log('usuario listado para modificar',response);
          this.codigo=response.data.codigo;
           this.nombre= response.data.nombre;
           this.apellidos=response.data.apellidos;
           this.correo=response.data.correo;
           this.telefono=response.data.telefono;
           this.estado=response.data.estado;
         }).catch(e => {
                 console.log(e.response);
                 Swal.fire({
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  }); 
                   this.$router.push('/ListaUsuarios');          
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
            
              text:"No ha escrito una dirección de correo válida. Todos los correos deben contener @pucp.edu.pe",
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
      
      else{//está bien y envío
      const params = {
           codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            correo:this.correo.trim(),
            telefono:this.telefono,
            password:"1234",
            estado:this.estado,
            id_programaNuevo:this.miprog.id_programa,
            id_tipo_usuario:this.tiposUsuariosselect,  

            };
      const params2 = {
      
            codigo:this.codigo.trim().replace(/\s+/g, ' '), 
            nombre:this.nombre.trim().replace(/\s+/g, ' '),
            apellidos:this.apellidos.trim().replace(/\s+/g, ' '),
            estado:this.estado,
            telefono:this.telefono,    
            };
             
          
          if(this.id_usuario_entrante==0){
            Axios.create()
            .post('/usuarios/insertar',params)
            .then( response=>{
                  console.log(response);
                  Swal.fire({
                    text:"Se guardaron los datos con éxito",
                    icon:"success",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
              }) 
              this.$router.href('/ListaUsuarios'); 

            }).catch(e => {
                 console.log(e.response);
                 Swal.fire({
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  });  
                   this.$router.href('/ListaUsuarios');         
                } );
          }
          else if (this.id_usuario_entrante!=0){
            Axios.create()
            .post('/usuarios/modificar/'+this.id_usuario_entrante,params2)
            .then( response=>{
              console.log(response)
              Swal.fire({
              text:"Se modificaron los datos con éxito",
              icon:"success",
              confirmButtonText: 'OK',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
              }) 
            })  .catch(e => {
                 console.log(e.response);
                 Swal.fire({
                    text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                  })
                  this.$router.href('/ListaUsuarios');
              });
            
          }
          
      }
      
      
    },

    listarTUsuarios() {
      //taambién debería ser por programa
      Axios.create().post('/tipoUsuarios/listarTodo')
        .then(res =>{
          // Ordenadito
          // let par=res.data;
          // this.tiposUsuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});
          this.tiposUsuarios=res.data;
          //console.log(this.tiposUsuarios);        
          
        })
        .catch(e => {
          console.log(e.response);
          Swal.fire({
              text:"Estamos teniendo problemas. Vuelve a intentar en unos minutos.",
              icon:"warning",
              confirmButtonText: 'Sí',
              confirmButtonColor:'#0097A7',
              showConfirmButton: true,
        }).then((result) => {
            if (result.value) {
              //lo redirigo
              this.$router.push('/ListaUsuarios');
            } 
          })

        })
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
        }).then((result) => {
            if (result.value) {
              //lo redirigo
              this.$router.push('/ListaUsuarios');
            } 
          })
        
    },
    listarTT() {
      Axios.post('/TipoTutoria/listarTodo/'+ this.miprog.id_programa)
        .then(response=>{
            this.tipostutorias = response.data; //
            console.log('Tipos de tutorias: ',this.tipostutorias);
        })
        .catch(e=>console.log(e));
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
    border: 2px solid #757575;
    text-align-last: right;
    margin-bottom:1.3em;
}
  body{
    background-image: null;
    background-color: #B2EBF2;
  }
  .form-control {
    border-radius: 1.25rem;  
    border: 2px solid #757575;
    margin-bottom: 10px;
    width: 200%;
    
}


</style>