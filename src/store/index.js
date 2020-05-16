import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:null,
    programas:null,
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
