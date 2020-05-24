import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:null, // Objeto Usuario Actual (this.$store.state.usuario)
    programas:null,
    programaActual:null, // Objeto Programa Actual (this.$store.state.programa)
    cantProg:null,
    tipoActual:null, // Objeto Tipo de Usuario Actual (this.$store.state.tipoActual)
    facultades:null, 
    coordinadores:null,
    permisos:null,
    roles:null, //Filtrar Tipos de Usuario
    rutas:[],
    navLinks: [
      {
        text: 'Institucion',
		path: '/institucion',
		icon: 'ion-ios-business'
      },
      {
        text: 'Facultad',
		path: '/facultad',
		icon: 'ion-ios-school'
      },
      {
        text: 'Programa',
		path: '/programa',
		icon: 'ion-ios-home'
      },
      {
        text: 'Coordinador',
		path: '/institucion',
		icon: 'ion-ios-person'
      },
      {
        text: 'Unidades de Apoyo',
		path: '/about',
		icon: 'ion-ios-people'
      },
      {
        text: 'Tipos de Tutoria',
		path: '/ListaTiposTutorias',
		icon: 'ion-ios-book'
      },
       {
        text: 'Gestionar Usuario',
		path: '/ListaUsuarios',
		icon: 'ion-ios-book'
      },
      {
       text: 'Tipos de Usuario',
       path: '/tiposUsuario',
       icon: 'ion-ios-people'
     },
     {
      text: 'Sesión de Tutoría',
      path: '/sesiontutoria',
      icon: 'ion-ios-school'
    },
    ],
    filtro:{
      query: '',
    }
  },
  mutations: {
    SET_QUERY (state,query){
      state.filtro.query = query;
    },
  },
  actions: {
  },
  modules: {
  },
  getters:{
    filtrarProgramas(state){
      if(state.filtro.query.length > 1){
        let programas = state.programas.filter(programa => programa.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return programas;
      }
      return state.programas;
    },
    filtrarRoles(state){
      if(state.filtro.query.length > 1){
        let roles = state.roles.filter(rol => rol.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return roles;
      }
      return state.roles;
    },
    filtrarFacultades(state){
      if(state.filtro.query.length > 1){
        let facultades = state.facultades.filter(facultad => facultad.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return facultades;
      }
      return state.facultades;
    },
    filtrarCoordinadores(state){
      if(state.filtro.query.length > 1){
        let coordinadores = state.coordinadores.filter(coordinador => coordinador.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return coordinadores;
      }
      return state.coordinadores;
    }
  }
})
