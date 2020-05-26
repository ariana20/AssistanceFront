import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/ViewHome.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/institucion',
    name: 'Institucion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewInstitucion.vue')
  },
  {
  path: '/facultad',
  name: 'Facultad',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/ViewFacultad.vue')
  },
  {
    path: '/crearFacultad/:id?',
    name: 'CrearFacultad',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewCrearFacultad.vue')
    },
  {
    path: '/programa',
    name: 'Programa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewPrograma.vue')
    },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }, 
  {
    path: '/tiposdeTutoria/:id',
    name: 'TiposTutoria',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewTiposTutorias" */ '../views/ViewTiposTutoria.vue')
  }, 
  {
    path: '/Usuario/:id',
    name: 'GestionarUsuario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewUsuario" */ '../views/ViewUsuario.vue')
  },
  {
    path: '/userNuevo',
    name: 'Usuario Nuevo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewUsuario" */ '../views/ViewUsuarioNuevo.vue')
  },
  {
    path: '/tiposUsuario',
    name: 'Tipos de Usuario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewUsuario" */ '../views/ViewRoles.vue')
  },
  {
    path: '/permisos/:id?',
    name: 'Permisos',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewUsuario" */ '../views/ViewPermisos.vue')
  },
  {
    path: '/seleccion',
    name: 'Seleccion Programas',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewUsuario" */ '../views/ViewSeleccionPrograma.vue')
  },
  { path: "/404",
    name: 'Error 404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "View404" */ '../views/View404.vue')
  },
  { path: "/sesiontutoria",
    name: 'Sesion de Tutoria',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewSesionTutoria" */ '../views/ViewSesionTutoria.vue')
  },
  {
    path: '/ListaUsuarios',
    name: 'Listar Usuarios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewListarUsuarios" */ '../views/ViewListarUsuarios.vue')
  },
  {
    path: '/ListaTiposTutorias',
    name: 'ListaTiposTutorias',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewListarTiposTutoria" */ '../views/ViewListarTiposTutoria.vue')
  },
  {
    path: '/AListaUsuarios',
    name: 'AListar Usuarios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewListarUsuarios" */ '../views/ViewListarUsuariosAdmin.vue')
  },
  {
    path: '/AUsuario/:id',
    name: 'AGestionarUsuario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ViewUsuario" */ '../views/ViewUsuarioAdmin.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
