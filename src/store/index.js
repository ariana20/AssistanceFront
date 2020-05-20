import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:null,
    programas:null,
    facultades:null,
    coordionadores:null,
    permisos:null,
    roles:null,
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
		path: '/',
		icon: 'ion-ios-person'
      },
      {
        text: 'Unidades de Apoyo',
		path: '/about',
		icon: 'ion-ios-people'
      },
      {
        text: 'Tipos de Tutoria',
		path: '/tiposdeTutoria',
		icon: 'ion-ios-book'
      },
       {
        text: 'Gestionar Usuario',
		path: '/Usuario',
		icon: 'ion-ios-book'
      },
    ],
    programasFilter:{
      query: '',
    }
  },
  mutations: {
    SET_QUERY (state,query){
      state.programasFilter.query = query;
    },
  },
  actions: {
  },
  modules: {
  },
  getters:{
    filtrarProgramas(state){
      if(state.programasFilter.query.length > 2){
        let programas = state.programas.filter(programa => programa.nombre.toLowerCase().includes(state.programasFilter.query.toLowerCase()))
        return programas;
      }
      return state.programas;
    }
  }
})
