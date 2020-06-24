<template>
	<div name="FormFacultad container">
		<div   class="row top-titulo container" style="left:60px;text-align: left;">
			<!-- <div class="top-titulo">
				<h4 class="col-sm-4 title-container">Nombre: </h4>
				<input class="col-sm-4 form-control" style="left:-230px;top:26px;right:0px;" v-model="nomb" v-on:keyup.enter="buscarFacultades(nomb)" placeholder="Ingrese nombre de la facultad">
						<div class="botones">							
						<button type="button" class="btn btn-info" @click="nuevo()" style="margin-left:190px" >Añadir</button>
						</div>
			</div> -->
			<div class="col-sm-6 top-titulo">
				<h5 class="col-sm-6 " style="top:5px;" >Nombre: </h5>
				<input class="col-sm-6 form-control" style="top:-5px;margin-bottom:20px" 
						v-model="nomb" v-on:keyup.enter="buscarFacultades(nomb)" placeholder="Ingrese nombre de la facultad">
			</div>
			<div class="botones" >
				<button  type="button" style="border-radius: 10px;margin-right:50px;padding-top:5px;margin-top:-25px" @click="nuevo()" class="row btn btn-info">Añadir</button>
			</div> 




			<table responsive class="table" style="text-align: left">
				<thead>
					<tr>
						<th scope="col" style="width:100px">Código</th>
						<th scope="col" style="width:200px">Nombre</th>
						<th scope="col" style="width:200px">Coordinador</th>
						<th scope="col" style="width:250px">Correo</th>
						<th scope="col" style="text-align: center">N° Programas</th>
						<th scope="col" style="text-align: center">Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in facultades" :key="index">
						<td v-if="item!=undefined">{{item.codigo}}</td>
						<td v-if="item!=undefined">{{item.nombre}}</td>
						<td v-if="item.coordinador!=undefined && item.coordinador!=null">{{item.coordinador.nombre+" "+item.coordinador.apellidos}}</td>
						<td v-else>Sin coordinador</td>
						<td>{{item.correo}}</td>
						<td style="text-align: center">{{item.cantidad-1}}</td>
						<td style="text-align: center">
							<button class="btn link" v-on:click="Editar(item)"><b-icon icon="pencil" style="color:#0097A7"></b-icon></button>
							<button class="btn link" v-on:click="Eliminar(item)"><b-icon icon="dash-circle-fill" style="color:#757575"></b-icon></button>
						</td>
					</tr>
				</tbody>
			</table>
			<!--paginacion  v-bind:class="[ page == isActived ? 'active': '']"-->
			<nav aria-label="Page navigation example">
				<ul class="pagination justify-content-center">
					<li class="page-item" v-if="paginate.current_page > 1">
						<a class="page-link" href="#" tabindex="-1" @click.prevent="changePage(paginate.current_page - 1)" style="color:rgb(0, 152, 146)">
							<span>Anterior</span>
						</a>
					</li>
					<li class="page-item" v-for="page in pagesNumber" :key="page">
							<a class="page-link" href="#" @click.prevent="changePage(page)" style="color:rgb(0, 152, 146)">
								<span class="sr-only">(current_page)</span>
								{{ page }}
						</a>
					</li>
					<li class="page-item" v-if="paginate.current_page < paginate.last_page">
						<a class="page-link" href="#" @click.prevent="changePage(paginate.current_page + 1)" style="color:rgb(0, 152, 146)">
							<span>Siguiente</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>

		<b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
			<div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
				<b-spinner style="width: 3rem; height: 3rem;"/>
				<br >Cargando... 
			</div>
		</b-modal>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
	data(){
		return{
			facultades:[],
			coordinadores:[],
			submitting: false,
			nomb: '',
			keeps:[],
			paginate:{
				'total': 0,
				'current_page': 0,
				'per_page': 0,
				'last_page': 0,
				'from': 0,
				'to': 0
			},
			offset: 3,
		}
	},
	mounted(){
		if(this.$store.state.usuario==null) this.$router.push('/login');
		this.showModal();
		this.listarFacultades();
	},
	computed:{
		isActived: function(){
			return this.paginate.current_page;
		},
		pagesNumber: function(){
			if(!this.paginate.to){
				return [];
			}
			var from = this.paginate.current_page - 2;
			if(from<1){//debe ser un numero positivo
				from=1;
			}
			var to=from+(2 * 2);//TO DO
			if(to >= this.paginate.last_page){
				to=this.paginate.last_page;
			}
			//calculo de la numeracion exacta
			var pagesArray=[];
			while(from<=to){
				pagesArray.push(from);
				from++;
			}
			return pagesArray;
		},
		...mapGetters({  
			facultadesFiltradas: 'filtrarFacultades'
		})
	},
	methods:{
		changePage: function(page){
			this.paginate.current_page=page;
			this.showModal();
			this.listarFacultades(page);//trae un nuevo listadp
			event.preventDefault();
		},
		listarFacultades(page) {
			this.showModal()
			var url='/facultad/listFacuConCoordi?page='+page;
			axios
			.post(url)
				.then(res =>{
					console.log(res.data);
					this.facultades=res.data.tasks.data;
					this.$store.state.facultades = res.data.tasks.data;
					this.paginate=res.data.paginate;
					this.coordinadores=res.data.tasks;
					this.$store.state.coordinadores=res.data.tasks;
					for(var i=0; i<this.facultades.length; i++){
						this.facultades[i].coordinador=this.coordinadores[i][0];
					}
					this.hideModal()
				})
				.catch(e => {
					console.log(e.response);
					this.hideModal()
				})
		},
		buscarFacultades(page) {
			this.showModal()
			var url='/facultad/listFacuConCoordi?page='+page;
			const params = {
                nombre: this.nomb,
            };
			axios
			.post(url,params)
				.then(res =>{
					console.log(res.data);
					this.facultades=res.data.tasks.data;
					this.$store.state.facultades = res.data.tasks.data;
					this.paginate=res.data.paginate;
					this.coordinadores=res.data.tasks;
					this.$store.state.coordinadores=res.data.tasks;
					for(var i=0; i<this.facultades.length; i++){
						this.facultades[i].coordinador=this.coordinadores[i][0];
					}
					this.hideModal()
				})
				.catch(e => {
					console.log(e.response);
					this.hideModal()
				})
		},
		Editar(item){
			this.$store.state.facultadEscogida=item;
			this.$router.push('/crearFacultad/'+item.id_facultad);
		},
		nuevo(){
			this.$store.state.facultadEscogida=null;
			this.$router.push('/crearFacultad');
		},
		
		Eliminar(item){
			Swal.fire({
					text: '¿Desea eliminar '+item.nombre+'?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#0097A7',
					cancelButtonColor: '#757575',
					confirmButtonText: 'Confirmar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result.value) {
						this.showModal()
						this.axios.post('/facultad/eliminar/'+item.id_facultad)
							.then(response=>{
								response
								let index = this.$store.state.facultades.indexOf(
									function(element){
										return element.id_facultad === item.id_facultad;
									})
								this.$store.state.facultades.splice(index, 1);
								this.hideModal()
								Swal.fire({
									text:"Eliminación Exitosa",
									icon:"success",
									confirmButtonText: 'OK',
									confirmButtonColor:'#0097A7',
									showConfirmButton: true,
								})
							})
							.catch(e=>{
								console.log(e)
								this.hideModal()
							});
					}
				})			
		},
		showModal() {
			this.$refs['my-modal'].show()
		},
		hideModal() {
			this.$refs['my-modal'].hide()
		},
	}
}
</script>

<style scoped>

.form-control {
		border-radius: 1rem;  
		border: 1px solid #757575;
		text-align-last: left;
		margin-bottom:1.3em;

}
.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}

</style>