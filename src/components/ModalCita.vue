<template>
    <div name="Modal" >
        <a :href="'#openModal'+id"><b-icon icon="caret-right-square-fill" style="color:#0097A7"/></a>
        <div :id="'openModal'+id" class="modalbg">
            <div class="dialog col-11">
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
                        {{cita.tipo_tutoria.nombre}} 
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
                        <div v-if="cita.pivot.asistencia == 'asi'">
                            Asistió
                        </div>
                        <div v-else-if="cita.pivot.asistencia == 'noa'">
                            No Asistió
                        </div>
                        <div v-else>
                            Pendiente
                        </div>
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Motivo:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        <div v-if="cita.sesion">
                            <div v-for="(item,index) in cita.sesion.motivo_consultas" :key="index">
                                {{item.nombre}}
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="cita.pivot.asistencia == 'noa'">
                                No Asistió a la sesión
                            </div>
                            <div v-else>
                                Sesión Pendiente
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="cita.sesion !=null" class="container row" style="width:100%;margin-top:2%;margin-bottom:5%;margin-left:5%">
                    <div class="col-12 col-md-2" style="text-align:left">
                        <strong>Descripcion:</strong>
                    </div>
                    <div class="col-12 col-md-8" style="text-align:left;height:100px;overflow:auto">
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
    props: ['cita','alumno','id'],
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