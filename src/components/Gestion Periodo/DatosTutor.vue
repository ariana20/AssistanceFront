<template>
    <div style="text-align:left;">
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
        
        <figure id="floated" class="image-logo">
				<img :src="require('@/assets/images/logo.png')" height="110px" width="110px" />		
		</figure>
        <div class="descripcion-tutor">
            <div>NOMBRE TUTOR</div>
            <div>Código: </div>
            <div>Temas: </div>
            <div id="botones">
                <!--button type="button"
                class="btn btn-info">Ver disponibilidad</button>
                <button type="button"
                class="btn btn-info">Ver Perfil</button> 
                <button type="button"
                class="btn btn-info btn-enviar-msg">Enviar Mensaje</button-->
                <button type="button" style="text-align: right"
                class="btn btn-info btn-enviar-msg">Enviar Mensaje</button> 
            </div>
        </div>
        <div style="width:100%; border-bottom:1px solid #bababa; height:1px;padding-top:15px; margin-bottom:15px;"></div>
                          
    </div>
</template>

<script>

export default {
    props: {
        text: String,
        event: Object
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