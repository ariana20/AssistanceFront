<template>
    <div class="row" style="text-align:left;">
        
        <div class="col-12 col-md-3 centrado" style="text-align:center;">
            <div class="col-4 offset-1">
                <figure v-if="tutor.imagen!='' && tutor.imagen!=null" id="floated" class="image-logo" style="height:100%">
                        <img  :src="tutor.imagen" height="110px" width="110px" />		
                </figure>
                <figure v-if="tutor.imagen=='' || tutor.imagen==null" id="floated" class="image-logo" style="height:100%">	
                        <b-avatar size="7rem" ></b-avatar>		
                </figure>
            </div>
        </div>
        <div class=" col-12 col-md-9" style="margin-top:3%">
            <div class="font-weight-bolder">Nombre: {{tutor.nombre+" "+tutor.apellidos}}</div>
            <div class="font-weight-bolder">Código: {{tutor.codigo}}</div>
            <div class="font-weight-bolder">Correo: {{tutor.correo}}</div>
            <div class="font-weight-bolder">Telefono: {{tutor.telefono}}</div>
            <div class="font-weight-bolder" v-if="this.$store.state.programaActual">Programa: {{this.$store.state.programaActual.nombre}}</div>
        </div>
                          
    </div>
</template>

<script>
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

.centrado{
    padding-top: 2%;
}


@media screen and (max-width: 800px) {
    .centrado{
        padding-top: 0%;
    }

}
</style>