<template>
    <div class="row" style="text-align:left;">
        
        <div class="col-12 col-md-5">
            <figure v-if="tutor.imagen!='' && tutor.imagen!=null" id="floated" class="image-logo" style="height:100%">
                    <img  :src="tutor.imagen" height="110px" width="110px" />		
            </figure>
            <figure v-if="tutor.imagen=='' || tutor.imagen==null" id="floated" class="image-logo" style="height:100%">	
                    <b-avatar size="7rem" ></b-avatar>		
            </figure>
        </div>
        <div class=" col-12 col-md-5" style="margin-top:3%">
            <div><strong>Código:</strong> {{tutor.codigo}}</div>
            <div><strong>Correo:</strong> {{tutor.correo}}</div>
            <div><strong>Telefono:</strong> {{tutor.telefono}}</div>
            <div v-if="this.$store.state.programaActual"><strong>Programa:</strong> {{this.$store.state.programaActual.nombre}}</div>
            <div><strong>Condicion:</strong> {{tutor.cond}}</div>
        </div>
                          
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    props: {
        text: String,
        tutor: Object,
        tipoTutoria: Array,
        
    },
    data(){
        return{
            habilitado:"",
            mensaje:""
        }
    },
    methods:{
        solicitarTutor(){
            Swal.fire({
                text:"¿Desea solicitar a "+this.tutor.nombre+" como tutor o tutora?",
                icon:"warning",
                confirmButtonText: 'Sí',
                confirmButtonColor:'#0097A7',
                cancelButtonText: 'No',
                cancelButtonColor:'C4C4C4',
                showCancelButton: true,
                showConfirmButton: true,
            }).then((result) => {
                if (result.value) {
                    const params={
                        id_tutor: this.tutor.id_usuario,
                        id_solicitante: this.$store.state.usuario.id_usuario,
                        id_programa: this.$store.state.programaActual.id_programa, 
                        motivo: ""
                    }
                    axios.create()
                    .post('/solicitudes/solicitudTutor', params)
                    .then( response=>{
                        this.habilitado=response.data.habilitado;
                        this.mensaje=response.data.mensaje;
                        if(this.habilitado=="Si"){
                            Swal.fire({
                            text:"Registro Exitoso",
                            icon:"success",
                            confirmButtonText: 'OK',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                            })   
                        }else if(this.habilitado=="No"){
                            Swal.fire({
                            text:this.mensaje,
                            icon:"error",
                            confirmButtonText: 'OK',
                            confirmButtonColor:'#0097A7',
                            showConfirmButton: true,
                            }) 
                        }

                        // console.log(response)
                    })
                    .catch(e => {
                        console.log(e.response);
                    })

                } 
            })


        }
    }
}

</script>

<style scoped>
.descripcion-tutor {
    margin-left: 170px;
}
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