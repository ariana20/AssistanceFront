<template>
    <div name="FormRespuesta" class="contenedor">
        <div class="container" v-if="preguntas">
            <article style="margin-top:15px">
                <header>
                    <div class="progress">
                        <div class="progress-step"
                            :class="{'active': index === activeStep}"
                            v-for="(step, index) in preguntas"
                            :key="'step'+index">
                            {{ index + 1 }}
                        </div>
                    </div>
                </header>
                <section :class="animation">
                    <h2>{{ preguntas[activeStep].pregunta }}</h2>
                    <div class="input-fields">
                        <form style="font-size:150%;width:80%" v-if="preguntas[activeStep].tipo.includes('ESCALA')">
                            <div class="col-7 offset-3">
                                <div class="form-group row" style="margin-left:0px;margin-right:0px">
                                    <div class="form-check form-check-inline col-2" v-for="i in 5" :key="i">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="preguntas[activeStep].respuesta" :value="i">
                                        <label class="form-check-label">{{i}}</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form style="font-size:150%;width:80%" v-if="preguntas[activeStep].tipo.includes('BINARIA')">
                            <div class="col-6 offset-3">
                                <div class="form-group row">
                                    <div class="form-check form-check-inline col-6">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="preguntas[activeStep].respuesta" value="Sí">
                                        <label class="form-check-label">Sí</label>
                                    </div>
                                    <div class="form-check form-check-inline col-6">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="preguntas[activeStep].respuesta" value="No">
                                        <label class="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="actions">
                        <button v-if="activeStep - 1 >= 0 && activeStep!=preguntas.length-1" @click="checkFields(false)">Anterior</button>
                        <button v-if="activeStep + 1 < preguntas.length -1" @click="checkFields(true)">Siguiente</button>
                        <button v-if="activeStep + 1 === preguntas.length -1" @click="checkFields(true)">Finalizar</button>
                        <button v-if="activeStep=== preguntas.length-1" @click="Cancelar()">Regresar a Encuestas</button>
                    </div>
                </section>
            </article>
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
            activeStep: 0,
            animation: 'animate-in',
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
                this.preguntas.push({
                    pregunta: "Gracias por participar!",
                    tipo: "FINAL",
                    respuesta: "Final",
                })
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
        nextStep() {
            this.animation = 'animate-out';
            setTimeout(() => {
                this.animation = 'animate-in';
                this.activeStep += 1;
            }, 600);
        },
        prevStep() {
            this.animation = 'animate-out';
            setTimeout(() => {
                this.animation = 'animate-in';
                this.activeStep -= 1;
            }, 600);
        },
        checkFields(val) {
            if(val) {
                let valid = true;
                
                if(this.preguntas[this.activeStep].respuesta==null) {
                    this.preguntas[this.activeStep].valid = false
                    valid = false
                }
                else this.preguntas[this.activeStep].valid = true

                if(valid) {
                        if(this.activeStep + 1 == this.preguntas.length -1){
                            this.EnviarRespuesta();
                            this.nextStep();
                        }
                        else{
                            this.nextStep();
                        }
                }
                else {
                    this.animation = 'animate-wrong';
                    setTimeout(() => {
                    this.animation = '';
                    }, 400);
                }
            }
            else this.prevStep();
        },
        EnviarRespuesta(){
            let noRespondido = false;
            let preguntas = [];
            let respuestas = [];
            this.preguntas.forEach(element => {
                if(element.respuesta==null) noRespondido = true;
                else{
                    if(element.respuesta!="Final"){
                        preguntas.push(element.id_encuesta)
                        respuestas.push(element.respuesta)
                    }
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
        //     Swal.fire({
        //         text: '¿Desea regresar a Encuestas?',
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#0097A7',
        //         cancelButtonColor: '#757575',
        //         confirmButtonText: 'Confirmar',
        //         cancelButtonText: 'Cancelar',
        //     }).then((result) => {
        //         if (result.value) {
                    this.$router.push('/encuestas')
            //     }
            // });
        }
    }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0; padding: 0;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

@mixin flexbox() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flexbox();
  width: 100%;
}

article {
  display: flex;
  margin: 10px;
  width: calc(100% - 20px);
  min-height: 480px;
  perspective: 1000px;

  header {
    @include flexbox();
    width: 60px;
    height: 480px;
    background-color: #fff;
    border-right: 2px dotted #757575;
    background: radial-gradient(#138496, #2fb4c9);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2),
      0 10px 10px rgba(0,0,0,0.2);
  }
  .progress{
    display: unset;
    height: 1;
    background: transparent;
  }
  .progress-step {
    @include flexbox();
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-bottom: 20px;
    color: #fff;
    font-weight: bold;
    background-color: #116c7a;

    &.active {
      background-color: #757575;

      ~ .progress-step {
        color: #555;
        background-color: #ccc;
      }

      ~ .progress-step::before {
        background-color: #ccc;
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: -20px;
      width: 2px;
      height: 20px;
      z-index: 10;
      background-color: #116c7a;
    }

    &:first-child::before {
      display: none;
    }
  }

  section {
    @include flexbox();
    flex-direction: column;
    width: 100%;
    border:1px solid rgb(0, 152, 146) ;
    box-shadow: 0 15px 30px rgba(0,0,0,0.2),
      0 10px 10px rgba(0,0,0,0.2);

    h2 {
      font-size: 1.6rem;
      color: #757575;
      margin: 0;
      padding: 20px;
    }

    .input-fields {
      @include flexbox();
      flex-direction: column;
      width: 100%;
    }

    .input-container {
      position: relative;
      padding: 30px 20px 20px 20px;
      width: calc(100% - 40px);
      max-width: 400px;

      input {
        position: relative;
        width: 100%;
        font-size: 1.35rem;
        outline: 0;
        background: transparent;
        box-shadow: none;
        border: none;
        border-bottom: 2px dashed #757575;

        &:valid + .input-label {
          top: 10px;
          left: 20px;
          font-size: .7rem;
          font-weight: normal;
          color: #999;
        }

        &.wrong-input + .input-label {
          color: #B92938;
        }
      }
    }

    .input-label {
      position: absolute;
      top: 32px;
      left: 20px;
      font-size: 1.35rem;
      pointer-events: none;
      transition: .2s ease-in-out;
    }

    .actions {
      margin: 30px 0 0 0;

      button {
        outline: none;
        border: none;
        color: #fff;
        background-color: #138496;
        font-size: 1.35rem;
        padding: 5px 20px;
        margin: 0 10px;
        text-transform: uppercase;
        border-radius: 3px;
        cursor: pointer;
      }
    }

  }
}

.animate-out {
  transform-origin: bottom left;
  animation: out .6s ease-in-out;
}

.animate-in {
  transform-origin: left;
  animation: in .6s ease-in-out;
}

.animate-wrong {
  animation: wrong .4s ease-in-out;
}

@keyframes out {
  0% { transform: translateY(0px) rotate(0deg); }
  60% { transform: rotate(10deg); }
  100% { transform: translateY(1000px); }
}

@keyframes in {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}

@keyframes wrong {
  0% { transform: translateX(0); }
  20% { transform: translateX(40px); }
  40% { transform: translateX(20px); }
  60% { transform: translateX(40px); }
  80% { transform: translateX(20px); }
  100% { transform: translateX(0); }
}


</style>