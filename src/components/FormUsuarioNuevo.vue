<template>
	<div name="UsuarioNuevo" style="height:100%">
		<div class="wrapper">
			<div class="container" style="font-size:70px;margin-top:50px;margin-left:600px">
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
    @import '../assets/styles/noAsignado.less';
</style>