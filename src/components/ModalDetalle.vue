<template>
    <div name="Modal" >
        <a :href="'#openModal'+solicitud.id_solicitante+solicitud.id_remitente+solicitud.id_programa"><b-icon icon="caret-right-square-fill" style="color:#0097A7"/></a>
        <div :id="'openModal'+solicitud.id_solicitante+solicitud.id_remitente+solicitud.id_programa" class="modalbg">
            <div class="dialog col-11">
                <a href="#close" title="Close" class="close">X</a>
                <div style="margin-top:3%;margin-bottom:3%;font-size:200%">
                    <strong>DETALLE SOLICITUD</strong>
                </div>
                <hr>
                <div class="container row" style="width:100%;margin-top:3%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-4" style="text-align:left">
                        <strong>Fecha Solicitud:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{solicitud.fecha_creacion}}
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:3%;margin-left:5%">
                    <div class="col-12 col-md-4" style="text-align:left">
                        <strong>Código:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{solicitud.usuarioSolicitante.codigo}} 
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:3%;margin-left:5%">
                    <div class="col-12 col-md-4" style="text-align:left">
                        <strong>Nombres y Apellidos:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{solicitud.usuarioSolicitante.nombre+" "+solicitud.usuarioSolicitante.apellidos}} 
                    </div>
                </div>
                <hr>
                <div class="container row" style="width:100%;margin-top:3%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-3" style="text-align:left;font-size:150%">
                        <strong>Solicitud</strong>
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-4" style="text-align:left">
                        <strong>Tipo de Solicitud:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{solicitud.tipo_solicitud}}
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-4" style="text-align:left">
                        <strong>Usuario Relacionado:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        {{solicitud.usuarioRelacionado.nombre+" "+solicitud.usuarioRelacionado.apellidos}}
                    </div>
                </div>
                <div class="container row" style="width:100%;margin-top:2%;margin-bottom:2%;margin-left:5%">
                    <div class="col-12 col-md-4" style="text-align:left">
                        <strong>Motivo:</strong>
                    </div>
                    <div class="col-12 col-md-7" style="text-align:left">
                        <div v-if="solicitud.motivo!=null">
                            {{solicitud.motivo}}
                        </div>
                        <div v-else>
                            No se registró motivo alguno
                        </div>
                    </div>
                </div>
                <div class="row" style="width:100%;margin-top:2%;margin-bottom:2%">
                    <div class="col-6" style="text-align:right">
                        <a href="#close">
                            <button type="button" class="btn btn-info" v-on:click="$emit('childToParentFacu','Aceptar')"  style="border-color:transparent;background-color:#0097A7;">
                                Aceptar
                            </button>
                        </a>
                    </div>
                    <div class="col-6" style="text-align:left">
                        <a href="#close">
                            <button type="button" class="btn btn-info" v-on:click="$emit('childToParentFacu','Rechazar')" style="border-color:#757575;background-color:#757575;">
                                Rechazar
                            </button>
                        </a>
                    </div>
                </div>
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