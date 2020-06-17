<template>
    <div name="Tabs" class="tabs">
        <button v-on:click="infoTutores()" class="btn tama" type="button" :class="{active: activeBtn === 'btn1' }">Tutores</button>
        <button v-on:click="infoUnidadesApoyo()" class="btn tama" type="button" :class="{active: activeBtn === 'btn2' }">Unidades de Apoyo</button>
        <button v-on:click="infoBeneficios()" class="btn tama" type="button" :class="{active: activeBtn === 'btn3' }">Beneficios</button>
        <button v-on:click="login()" class="btn tama" type="button" :class="{active: activeBtn === 'btn4' }">Registrarse</button>
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
            this.$store.state.reg = true;
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
    .tabs{
        margin-top:0px;
        width:90%;
    }
    .active{
    background-color:#7EC2C9;
    }
    .tama{
        margin-left:5%;
        width:15%
    }

    @media screen and (max-height: 600px) {
        .tabs{
            margin-left:-7%;
            width:90%;
        }
        .tama{
            margin-left:3%;
            width:20%;
            font-size: 2vw
        }
    }
</style>

