<template>
    <div style="text-align:left;">
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        
        <figure v-if="tutor.imagen!='' && tutor.imagen!=null" id="floated" class="image-logo">
				<img  :src="tutor.imagen" height="110px" width="110px" />		
		</figure>
        <figure v-if="tutor.imagen=='' || tutor.imagen==null" id="floated" class="image-logo">	
                <b-avatar size="7rem" ></b-avatar>		
		</figure>
        <div class="descripcion-tutor">
            <div class="font-weight-bolder">{{tutor.nombre + " " + tutor.apellidos}}</div>
            <div class="font-weight-bolder">Código: {{tutor.codigo}}</div>
            <div class="font-weight-bolder">Temas: </div>
            <div>
                <label v-for="(item,index) in tipoTutoria" :key="index">
                    {{item.nombre}}<label v-if="index<tipoTutoria.length-1" style="margin-right:5px">, </label>
                </label>
            </div>
            <div style="text-align: right" id="botones" >
                <button type="button"
                class="btn btn-info" v-on:click="verDisponibilidad()">Ver disponibilidad</button>
                <!--button type="button"
                class="btn btn-info">Ver Perfil</button> 
                <button type="button"
                class="btn btn-info btn-enviar-msg">Enviar Mensaje</button-->
                <button type="button" style="align: right"
                class="btn btn-info" v-on:click="solicitarTutor()">Solicitar Tutor</button> 
            </div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
                          
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
        verDisponibilidad(){
            this.$store.state.tutorDisponibilidad=this.tutor;
            this.$router.push('/agendarcita');
        },
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