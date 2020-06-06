<template>
	<nav style="background: '#FFFFFF'">
		<ul :style="{ background: background|| '#333'}" ref="nav">
			<figure v-if="this.$store.state.usuario && this.$store.state.tipoActual.nombre=='Admin'" class="image-logo" @click="toggleNav">
				<img :src="imagePath" height="60px" width="60px" />		
				<nobr>ssistance</nobr>				
			</figure>
			<figure v-else class="image-logo" @click="toggleNav">
				<img v-bind:src="logo" height="40px" width="40px" />		
				<nobre>{{siglas}}</nobre>				
			</figure>
			<li
				v-for="(link,index) in navLinks"	
				:key="index"
				
				@mouseenter="$event.currentTarget.style.background = hoverBackground || '#999'"
				@mouseleave="$event.currentTarget.style.background = background || '#333'"
			>
			<router-link 
				:to="link.path"
				:style="{ color: linkColor || '#DDD' }"
			>
				{{ link.text }}
				<i :class="link.icon"/>
			</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
  data(){
    return{
      siglas:null,
      logo:null,
    }
  },
	props: ['navLinks', 'background','linkColor','hoverBackground','imagePath'],
	methods: {
		toggleNav() {
			var w = window.innerWidth;
			if (w <= 768) {
				const nav = this.$refs.nav.classList
				nav.contains('active') ? nav.remove('active') : nav.add('active')
			}
		}
	},
	mounted(){
		//const nav = this.$refs.nav.classList
		//if(!nav.contains('active')) nav.add('active');
		this.axios
			.post('/institucion/listarTodo')
				.then( response=>{
					this.siglas = response.data[0].siglas;
					this.logo = response.data[0].logo;
				})
				.catch(e => {
					console.log(e.response);
				});
	}
}
</script>

<style lang="scss" scoped>
nav {
	width: 100%;
	padding-left: 20px;
	box-shadow: 2px 2px 2px #CCC;
	z-index: 1000;
	ul {
		position: fixed;
		flex-direction: column;
		display: flex;
		height: 100%;
		transition: 300ms ease all;
		top: 60px;
		width: 251px;
		left:0px;
		margin-block-start: 0;
		margin-block-end: 0;
		padding-inline-start: 0;
		box-shadow: 2px 2px 2px #CCC;
		z-index:9998;
		
		&.active{
			left: -190px;
		}
		figure {
			position: fixed;
			z-index: 1;
			top: 3px;
			left: 10px;
			cursor: pointer;
			margin-right: 10px;

			nobr {
				color: #000;
				font-size: 20px;
				//margin-left:10px;
			}
			
			nobre {
				top:20px;
				color: #000;
				font-size: 30px;
				margin-left:10px;
				line-height: 50px;
			}
		}
		a{
			text-decoration: none;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-right: 13px;
			margin-left: 23px;
		}
		i {
			margin-right: 10px;
			font-size: 22px;
		}
		li {
			list-style-type: none;
			padding-top: 20px;
			width: 100%;
		}
	}
}
@media screen and (max-width: 759px){
	nav {
		width: 100%;
		padding-left: 10px;
		box-shadow: 2px 2px 2px #CCC;
		z-index: 1000;
		ul {
			position: fixed;
			flex-direction: column;
			display: flex;
			height: 100%;
			transition: 300ms ease all;
			top: 60px;
			width: 251px;
			left:-190px;
			margin-block-start: 0;
			margin-block-end: 0;
			padding-inline-start: 0;
			box-shadow: 2px 2px 2px #CCC;
			z-index:9998;
			
			&.active{
				left: 0px;
			}
			figure {
				position: fixed;
				z-index: 1;
				top: 3px;
				left: 10px;
				cursor: pointer;
				margin-right: 10px;

				nobr {
					color: #000;
					font-size: 30px;
					//margin-left:10px;
				}
			}
			a{
				text-decoration: none;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-right: 13px;
				margin-left: 23px;
			}
			i {
				margin-right: 10px;
				font-size: 22px;
			}
			li {
				list-style-type: none;
				padding-top: 20px;
				width: 100%;
			}
		}
	}
}

</style>