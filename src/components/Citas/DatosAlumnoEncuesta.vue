<template>
    <div class="row" style="text-align:left;">
        
        <div class="col-12 col-md-3">
            <figure v-if="tutor.imagen!='' && tutor.imagen!=null" id="floated" class="image-logo" style="height:100%">
                    <img  :src="tutor.imagen" height="110px" width="110px" />		
            </figure>
            <figure v-if="tutor.imagen=='' || tutor.imagen==null" id="floated" class="image-logo" style="height:100%">	
                    <b-avatar size="7rem" ></b-avatar>		
            </figure>
        </div>
        <div class=" col-12 col-md-5" style="margin-top:1%">
            <div><strong>Código: </strong> {{tutor.codigo}}</div>
            <div><strong>Nombre: </strong> {{tutor.nombre+" "+tutor.apellidos}}</div>
            <div><strong>Correo: </strong>{{tutor.correo}}</div>
            <div><strong>Telefono: </strong>{{tutor.telefono}}</div>
            <div v-if="this.$store.state.programaActual"><strong>Programa: </strong>{{this.$store.state.programaActual.nombre}}</div>
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
    methods:{
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