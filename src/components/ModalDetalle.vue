<template>
    <div name="Modal" >
        <a href="#openModal"><b-icon icon="caret-right-square-fill" style="color:#0097A7"/></a>
        <div id="openModal" class="modalbg">
            <div class="dialog" style="width:50%">
                <a href="#close" title="Close" class="close">X</a>
                <h2>Solicitud</h2>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo de Solicitud</th>
                        <th scope="col">Motivo</th>
                        <th scope="col">Usuario Relacionado</th>
                        <th scope="col">Fecha Solicitud</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td scope="row">{{solicitud.usuarioSolicitante.codigo}}</td>
                        <td>{{solicitud.usuarioSolicitante.nombre+" "+solicitud.usuarioSolicitante.apellidos}}</td>
                        <td>{{solicitud.tipo_solicitud}}</td>
                        <td v-if="solicitud.motivo">{{solicitud.motivo}}</td>
                        <td v-else>---</td>
                        <td v-if="solicitud.usuarioRelacionado">{{solicitud.usuarioRelacionado.nombre+" "+solicitud.usuarioRelacionado.apellidos}}</td>
                        <td>{{solicitud.fecha_creacion}}</td>
                    </tr>
                    </tbody>
                </table>
                <a href="#close">
                    <div class="row" style="width:200px;margin-left:40%">
                        <button type="button" class="btn btn-info" v-on:click="$emit('childToParentFacu','Aceptar')"  style="border-color:transparent;background-color:#0097A7;">Aceptar</button>
                        <button type="button" class="btn btn-info" v-on:click="$emit('childToParentFacu','Rechazar')" style="border-color:#757575;background-color:#757575;">Rechazar</button>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['solicitud'],
  mounted(){
  },
  methods:{
  },
}
</script>

<style lang="less" scoped>
    @import '../assets/styles/modal.less';
</style>