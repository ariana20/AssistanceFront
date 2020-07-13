import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:null, // Objeto Usuario Actual (this.$store.state.usuario)
    programas:[],
    programaActual:null, // Objeto Programa Actual (this.$store.state.programaActual)
    cantProg:null,
    tipoActual:null, // Objeto Tipo de Usuario Actual (this.$store.state.tipoActual)
    encuesta:null, // Objeto Encuesta (this.$store.state.encuesta)
    facultades:null, 
    facultadEscogida:null,
    coordinadores:null,
    coordinadoresL:null,
    permisos:null,
    permisosUsuario:null,
    cond: '',
    visualizacion:false, //Solo visualizar
    roles:null, //Filtrar Tipos de Usuario
    solicitudes:null, //Filtrar Permisos
    unidades:null, //Filtrar Unidades de Apoyo
    tipostutorias:null,
    usuarios:null,
    usuariosA:null,
    rutas:[],
    usuarioEscogido:null,
    events: [], 
    curEvent: null,
    curSesion: null,
    tutorDisponibilidad:null,
    reg: false,
    idCita: null,
    verPdf:false,
    verCitas:false,
    verPlan:false,
    citaDatos:null,
    filtroProgs:null,
    navLinks: [
      {
        text: 'Institucion',
        path: '/institucion',
        icon: 'ion-ios-globe'
      },
      {
        text: 'Facultad',
        path: '/facultad',
        icon: 'ion-ios-business'
      },
      {
        text: 'Programa',
        path: '/programa',
        icon: 'ion-ios-school'
      },
      {
        text: 'Coordinador',
        path: '/coordinadores',
        icon: 'ion-ios-person'
      },
      {
        text: 'Datos Facultad',
        path: '/datosFacultad',
        icon: 'ion-ios-business'
      },
      {
        text: 'Datos Programa',
        path: '/datosPrograma',
        icon: 'ion-ios-business'
      },
      {
        text: 'Tipos de Tutoria',
        path: '/ListaTiposTutorias',
        icon: 'ion-ios-bookmarks'
      },
      {
        text: 'Usuarios',
        path: '/ListaUsuarios',
        icon: 'ion-ios-people'
      },
      {
        text: 'Unidades de Apoyo',
        path: '/unidadesApoyo',
        icon: 'ion-ios-medkit'
      },
      {
        text: 'Tipos de Usuario',
        path: '/tiposUsuario',
        icon: 'ion-md-people'
      },
      {
        text: 'Sesión de Tutoría',
        path: '/sesiontutoria',
        icon: 'ion-ios-school'
      },
      {
        text: 'Usuarios Admin',
        path: '/AListaUsuarios',
        icon: 'ion-ios-people'
      },
      {
        text: 'Agregar Alumnos',
        path: '/agregarAlumnos',
        icon: 'ion-ios-person-add'
      },
      {
        // text: 'Agregar Documento',
        // path: '/agregardocumentos',
        text: 'Agregar Notas',
        path: '/agregarNotas',
        icon: 'ion-ios-document'
      },
      {
        text: 'Tutores',
        path: '/tutoresDisponibles',
        icon: 'ion-ios-book'
      },
      {
        text: 'Citas',
        path: '/agendarcita',
        icon: 'ion-ios-calendar'
      },
      {
        text: 'Registrar Cita',
        path: '/registrarCita',
        icon: 'ion-ios-calendar'
      },
      {
        text: 'Asignar Tutor',
        path: '/asignartutor',
        icon: 'ion-ios-contacts'
      },
      {
        text: 'Calendario',
        path: '/calendariocitas',
        icon: 'ion-ios-calendar'
      },
      {
        text: 'Solicitudes',
        path: '/solicitudes',
        icon: 'ion-ios-book'
      },
      {
        text: 'Encuestas',
        path: '/encuestas',
        icon: 'ion-ios-document'
      },
      {
        text: 'Reportes',
        path: '/reportes',
        icon: 'ion-ios-stats'
      },
      {
        text: 'Asignar Tipo de Tutoría',
        path: '/asignarTipoTutoria',
        icon: 'ion-ios-bookmarks'
      },
    ],
    filtro:{
      query: '',
      facultad: null,
      programa: null,
    }
  },
  mutations: {
    SET_QUERY (state,query){
      state.filtro.query = query;
    },
    SET_Facu (state,filtro){
      state.filtro.facultad = filtro;
    },
    SET_Prog (state,filtro){
      state.filtro.programa = filtro;
    },
    ADD_EVENT: (state, event) => {
      state.events.push(event)
    },
    DELETE_EVENT: (state,{id}) => {
      let index = state.events.findIndex(_event => _event.id == id)
      state.events.splice(index,1)   
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    filtrarRoles(state){
      if(state.filtro.query.length > 0){
        let roles = state.roles.filter(rol => rol.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return roles;
      }
      return state.roles;
    },
    filtrarFacultades(state){
      if(state.filtro.query.length > 0){
        let facultades = state.facultades.filter(facultad => facultad.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return facultades;
      }
      return state.facultades;
    },
    filtrarCoordinadores(state){
      if(state.filtro.query.length > 0){
        let coordinadores = state.coordinadores.filter(coordinador => coordinador.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return coordinadores;
      }
      return state.coordinadores;
    },
    filtrarTipoTutorias(state){
      if(state.filtro.query.length > 0){
        let tipostutorias = state.tipostutorias.filter(tt => tt.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return tipostutorias;
      }
      return state.tipostutorias;
    },
    filtrarUsuarios(state){
      if(state.filtro.query.length > 0){
        if(isNaN(state.filtro.query)){
          let usuarios = state.usuarios.filter(usu => usu.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()));
          return usuarios;
         
        }
        let usuariocod = state.usuarios.filter(usu => usu.codigo.toLowerCase().includes(state.filtro.query.toLowerCase()));
        return usuariocod;
       
      }
      return state.usuarios;
    },
    filtrarUsuariosAdmin(state){
      if(state.filtro.query.length > 0){
        let usuariosA = state.usuariosA.filter(usu => usu.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return usuariosA;
      }
      return state.usuariosA; //cambie de usuarios a usuariosA cuado ya estaba duplicado el form
    },
    filtrarUsuariosCod(state){
      if(state.filtro.query.length > 0){
        let usuarios = state.usuarios.filter(usu => usu.codigo.toLowerCase().includes(state.filtro.query.toLowerCase()))
        return usuarios;
      }
      return state.usuarios;
    },
    filtrarSolicitudes(state){
      if(state.filtro.query.length > 0){
        let solicitudes = state.solicitudes.filter(sol => (sol.usuarioSolicitante.nombre+" "+sol.usuarioSolicitante.apellidos).toLowerCase().includes(state.filtro.query.toLowerCase()))
        return solicitudes;
      }
      return state.solicitudes;
    },
    filtrarUnidades(state){
      if(state.filtro.query.length > 0){
        let unidades
        if(state.filtro.facultad!=null){
          unidades = state.unidades.filter(unidad => unidad.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
          unidades = unidades.filter(unidad => unidad.programas[0].id_facultad == state.filtro.facultad.id_facultad)
          if(state.filtro.programa!=null){
            unidades = unidades.filter(unidad => unidad.programas[0].id_programa == state.filtro.programa.id_programa)
          }
        }
        else{
          unidades = state.unidades.filter(unidad => unidad.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
          if(state.filtro.programa!=null){
            unidades = unidades.filter(unidad => unidad.programas[0].id_programa == state.filtro.programa.id_programa)
          }
        }
        return unidades;
      }
      else if(state.filtro.facultad!=null){
        let unidades = state.unidades.filter(unidad => unidad.programas[0].id_facultad == state.filtro.facultad.id_facultad)
        if(state.filtro.programa!=null){
          unidades = unidades.filter(unidad => unidad.programas[0].id_programa == state.filtro.programa.id_programa)
        }
        return unidades;
      }
      else if(state.filtro.programa!=null){
        let unidades = state.unidades.filter(unidad => unidad.programas[0].id_programa == state.filtro.programa.id_programa)
        return unidades;
      }
      return state.unidades;
    },
    filtrarCoordinadoresL(state){
      if(state.filtro.query.length > 0){
        let coordinadoresL
        coordinadoresL = state.coordinadoresL.filter(coordinador => coordinador.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        if(state.filtro.facultad!=null){
          if(state.filtro.programa!=null){
            coordinadoresL = coordinadoresL.filter(coordinador => coordinador.lugares.includes(state.filtro.programa.nombre))
          }
          else{
            let coordinadores = [];
            let coordinadoresL1 = coordinadoresL.filter(coordinador => coordinador.lugares.includes(state.filtro.facultad.nombre))
            let coordinadoresL2 = [];
            state.filtroProgs.forEach(element => {
              let aux = coordinadoresL.filter(coordinador => coordinador.lugares.includes(element.nombre))
              aux.forEach(element => {
                coordinadoresL2.push(element);
              });
            });
            coordinadoresL1.forEach(element => {
              coordinadores.push(element)
            });
            coordinadoresL2.forEach(element => {
              coordinadores.push(element)
            });
            coordinadoresL = coordinadores
          }
        }
        else if(state.filtro.programa!=null){
          coordinadoresL = coordinadoresL.filter(coordinador =>coordinador.lugares.includes(state.filtro.programa.nombre))
        }
        return coordinadoresL;
      }
      else if(state.filtro.facultad!=null){
        let coordinadoresL = state.coordinadoresL;
        if(state.filtro.programa!=null){
          coordinadoresL = coordinadoresL.filter(coordinador => coordinador.lugares.includes(state.filtro.programa.nombre))
        }
        else{
          let coordinadores = [];
          let coordinadoresL1 = coordinadoresL.filter(coordinador => coordinador.lugares.includes(state.filtro.facultad.nombre))
          let coordinadoresL2 = [];
          state.filtroProgs.forEach(element => {
            let aux = coordinadoresL.filter(coordinador => coordinador.lugares.includes(element.nombre))
            aux.forEach(element => {
              coordinadoresL2.push(element);
            });
          });
          coordinadoresL1.forEach(element => {
            coordinadores.push(element)
          });
          coordinadoresL2.forEach(element => {
            coordinadores.push(element)
          });
          coordinadoresL = coordinadores
        }
        return coordinadoresL;
      }
      else if(state.filtro.programa!=null){
        let coordinadoresL = state.coordinadoresL.filter(coordinador => coordinador.lugares.includes(state.filtro.programa.nombre))
        return coordinadoresL;
      }
      return state.coordinadoresL;
    },
    filtrarProgramas(state){
      if(state.filtro.query.length > 0){
        let programas = state.programas.filter(programa => programa.programa.nombre.toLowerCase().includes(state.filtro.query.toLowerCase()))
        if(state.filtro.facultad!=null){
          programas = programas.filter(programa => programa.facultad.id_facultad == state.filtro.facultad.id_facultad)
        }
        return programas;
      }
      else if(state.filtro.facultad!=null){
        let programas = state.programas.filter(programa => programa.facultad.id_facultad == state.filtro.facultad.id_facultad)
        return programas;
      }
      return state.programas;
    },
    EVENTS: state => state.events
  }
})
