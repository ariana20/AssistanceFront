<template>
	<div name="UsuarioNuevo">
		<div class="wrapper margen">
			<div class="container contenid">
				<strong>Aún no te encuentras inscrito en un programa o no cuentas con permisos</strong>
			</div>
			
			<ul class="bg-bubbles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		<!-- <ModalC v-on:childToParent="onChildClick"/>
		<div>
			<strong>{{coordinadorSeleccionado}}</strong>
		</div> -->
	</div>
</template>

<script>
//import ModalC from '@/components/Modal.vue'
export default {
  name: 'FormUsuarioNuevo',
  components:{	  
    //ModalC,
  },
  data(){
	return{
		coordinadorSeleccionado: null,
	}
  },
  methods:{
	onChildClick (value) {
      this.coordinadorSeleccionado = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	@import '../../assets/styles/noAsignado.less';
	
	.margen{
		margin-top:-423px;
	}

	.contenid{
		font-size:70px;
		margin-top:5%;
		margin-left:35%;
		height: 80%;
		color: black !important;
	}
    @media only screen and (max-width: 600px) {
		.margen{
			margin-top:-323px;
		}
		
		.contenid{
			font-size:30px;
			margin-top:25%;
			margin-left:15%;
			width: 70%;
		}
	}
</style>