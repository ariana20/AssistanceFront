<template>
    <div name="Modal" >
        <a href="#openModal"><b-icon icon="caret-right-square-fill" style="color:#0097A7"/></a>
        <div id="openModal" class="modalbg">
            <div class="dialog" style="width:50%">
                <a href="#close" title="Close" class="close">X</a>
                <div style="margin-top:3%;margin-bottom:3%;font-size:200%">
                    <strong>CITA REALIZADA</strong>
                </div>
                <hr>
                <div class="container row" style="width:100%;margin-top:3%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Fecha:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{cita.disponibilidad.fecha}}
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Hora Inicio:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{cita.disponibilidad.hora_inicio}}
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:3%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Tipo de Tutoria:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{cita.tipo_tutoria.nombre+" - "+cita.tipo_tutoria.descripcion}} 
                    </div>
                </div>
                <hr>
                <div class="container row" style="width:100%;margin-top:3%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left;font-size:150%">
                        <strong>Resultado</strong>
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Asistencia:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        <div v-if="cita.pivot.asistencia">
                            Asistio
                        </div>
                        <div v-else>
                            No Asistio
                        </div>
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Motivo:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        <div v-if="cita.sesion !=null">
                            <div v-for="item in cita.sesion.motivo_consultas" :key="item">
                                {{item.nombre}}
                            </div>
                        </div>
                        <div v-else>
                            Sesion pendiente
                        </div>
                    </div>
                </div>
                <div v-if="cita.sesion !=null" class="container row" style="width:100%;margin-top:2%;margin-bottom:5%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Descripcion:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{cita.sesion.resultado}}
                    </div>
                </div>
                <div v-else style="margin-top:5%">
                </div>
                <!-- <div class="container row" style="width:100%;margin-top:2%;margin-bottom:3%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Derivacion:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{cita.sesion.derivacion}} 
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['cita','alumno'],
  mounted(){
  },
  methods:{
  },
}
</script>

<style lang="less" scoped>
    @import '../assets/styles/modal.less';
    hr{
        border-top: 0px solid rgba(0, 0, 0, 0.1) !important;
    }
</style>