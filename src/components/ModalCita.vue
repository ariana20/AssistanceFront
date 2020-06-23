<template>
    <div name="Modal" >
        <a href="#openModal"><b-icon icon="caret-right-square-fill" style="color:#0097A7"/></a>
        <div id="openModal" class="modalbg">
            <div class="dialog" style="width:50%">
                <a href="#close" title="Close" class="close">X</a>
                <h2>Cita</h2>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Tutor</th>
                        <th scope="col" >Fecha</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Asistencia</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{cita.disponibilidad.usuario.nombre + " "+ cita.disponibilidad.usuario.apellidos}}</td>
                        <td v-if="cita!=undefined">{{cita.disponibilidad.fecha}}</td>
                        <td v-if="cita!=undefined">{{cita.disponibilidad.hora_inicio}}</td>
                        <td >
                            <div v-if="cita.pivot.asistencia">
                                Asistio
                            </div>
                            <div v-else>
                                No Asistio
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="container row" style="width:100%;text-align:center;margin-top:5%;margin-bottom:5%;margin-left:5%">
                    <strong>Tipo de Tutoria:</strong>
                    <div style="margin-left:2%">
                        {{cita.tipo_tutoria.nombre+" - "+cita.tipo_tutoria.descripcion}} 
                    </div>
                </div>
                <div class="container row" style="width:100%;text-align:center;margin-top:5%;margin-bottom:5%;margin-left:5%">
                    <strong>Motivos de la Cita:</strong>
                    <div v-for="item in cita.sesion.motivo_consultas" :key="item" style="margin-left:2%">
                        {{item.nombre}}
                    </div>
                </div>
                <div style="width:100%;text-align:center;margin-bottom:5%;margin-top:5%">
                    <strong>Resultado</strong>
                </div>
                <div style="width:100%;text-align:center;margin-bottom:5%">
                    {{cita.sesion.resultado}}
                </div>
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
</style>