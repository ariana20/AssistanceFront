<template>
    <div name="FormRespuesta" class="contenedor">
        <div class="row" v-for="pregunta in preguntas" :key="pregunta.orden">
            <div class="col-12 text-left">
                <h2>Pregunta {{pregunta.orden}}</h2>
            </div>

            <div class="col-12 text-left" style="margin-bottom:15px">
                <h3>{{pregunta.pregunta}}</h3>
            </div>
            
            <div class="col-11 offset-1 text-left" style="margin-bottom:15px">
                <form style="font-size:150%" v-if="pregunta.tipo.includes('ESCALA')">
                    <div class="form-group row">
                        <div class="form-check form-check-inline col-2" v-for="i in 5" :key="i">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="pregunta.respuesta" :value="i">
                            <label class="form-check-label">{{i}}</label>
                        </div>
                    </div>
                </form>
                <form style="font-size:150%" v-if="pregunta.tipo.includes('BINARIA')">
                    <div class="form-group row">
                        <div class="form-check form-check-inline col-2">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="pregunta.respuesta" value="Sí">
                            <label class="form-check-label">Sí</label>
                        </div>
                        <div class="form-check form-check-inline col-2">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="pregunta.respuesta" value="No">
                            <label class="form-check-label">No</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row" style="margin-bottom:15px">
            <div class="col-6 text-right">
                <button type="button" class="btn btn-info"  @click="EnviarRespuesta()" >Enviar Respuesta</button>
            </div>
            <div class="col-6 text-left">
                <button type="button" class="btn btn-info" style="background:#757575;border-color: #757575" @click="Cancelar()" >Cancelar</button>
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
import Swal from 'sweetalert2'
export default {
    name: 'FormRespuesta',
    props: {
        agrupador: String,
    },
    data(){
        return{
            preguntas:null,
        }
    },
    mounted(){
        if(this.$store.state.usuario==null) this.$router.push('/login')
        else{
            this.showModal()
            this.axios.post('/encuesta/mostrarPreguntas')
            .then(response=>{
                this.preguntas = response.data
                this.preguntas.sort((a,b)=> a.orden - b.orden)
                this.hideModal()
            })
            .catch(e => {
                console.log('Catch Listar Encuestas: ',e);
                this.hideModal()
                Swal.fire({
                text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                icon:"warning",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
                });  
            });
        }
    },
    methods:{
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        EnviarRespuesta(){
            let noRespondido = false;
            let preguntas = [];
            let respuestas = [];
            this.preguntas.forEach(element => {
                if(element.respuesta==null) noRespondido = true;
                else{
                    preguntas.push(element.id_encuesta)
                    respuestas.push(element.respuesta)
                }
            });
            if(noRespondido){
                Swal.fire({
                text:"No ha respondido todas las preguntas",
                icon:"error",
                confirmButtonText: 'OK',
                confirmButtonColor:'#0097A7',
                showConfirmButton: true,
                });
            }
            else{
                this.showModal()
                this.axios.post('/encuesta/guardarRespuestas',{
                    idTutor: this.$store.state.encuesta.id_usuario,
                    idAlumno: this.$store.state.usuario.id_usuario,
                    agrupador: this.agrupador,
                    preg: preguntas,
                    rpta: respuestas
                })
                .then(response=>{
                    response
                    this.hideModal()
                    Swal.fire({
                        text:"Respuesta enviada exitosamente",
                        icon:"success",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    });
                    this.$router.push('/encuestas')
                })
                .catch(e => {
                    console.log('Catch Responder Encuesta: ',e);
                    this.hideModal()
                    Swal.fire({
                        text:"Estamos teniendo problemas al crear un nuevo usuario. Vuelve a intentar en unos minutos.",
                        icon:"warning",
                        confirmButtonText: 'OK',
                        confirmButtonColor:'#0097A7',
                        showConfirmButton: true,
                    });  
                });
            }
        },
        Cancelar(){
            Swal.fire({
                text: '¿Desea regresar a Encuestas?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0097A7',
                cancelButtonColor: '#757575',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.value) {
                    this.$router.push('/encuestas')
                }
            });
        }
    }
}
</script>

<style>

</style>