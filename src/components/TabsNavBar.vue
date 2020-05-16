<template>
    <div name="Tabs" style="margin-top:0px">
        <button v-on:click="infoTutores()" style="margin-left:100px;width:250px" class="btn" type="button" :class="{active: activeBtn === 'btn1' }">Tutores</button>
        <button v-on:click="infoUnidadesApoyo()" style="margin-left:100px;width:250px" class="btn" type="button" :class="{active: activeBtn === 'btn2' }">Unidades de Apoyo</button>
        <button v-on:click="infoBeneficios()" style="margin-left:100px;width:250px" class="btn" type="button" :class="{active: activeBtn === 'btn3' }">Beneficios</button>
        <button v-on:click="login()" style="margin-left:100px;width:250px" class="btn" type="button" :class="{active: activeBtn === 'btn4' }">Ingresar/Registrarse</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeBtn:'btn4',
        }
    },
    methods:{
        login(){
            this.activeBtn = 'btn4'
            this.$router.push('/login');  
        },
        infoTutores(){
            this.activeBtn = 'btn1';
            this.$router.push('/');
        },
        infoUnidadesApoyo(){
            this.activeBtn = 'btn2';
            this.$router.push('/');
        },
        infoBeneficios(){
            this.activeBtn = 'btn3';
            this.$router.push('/');
        },
    },
}
</script>

<style scoped>
.active{
  background-color:#7EC2C9;
}

</style>

