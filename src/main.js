import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import modal from 'vue-js-modal'


const HelloJs = require('hellojs/dist/hello.all.min.js');
const VueHello = require('vue-hellojs');

HelloJs.init({
  google: "1030578955704-vou87cfl4tm97ajnjmmsvcma2l56ib8s.apps.googleusercontent.com",
}, {redirect_uri: 'authcallback/',
scope: ['email','profile']});
//Instal VueHello
Vue.use(VueHello, HelloJs);
// Install Axios
Vue.use(VueAxios, axios)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//Vue.component('infinite-loading', require('vue-infinite-loading').default);
Vue.config.productionTip = false

Vue.use(modal, {dialog:true, dynamic: true});

//axios.defaults.baseURL = 'http://18.232.253.212/Back-end-Software/public/api';
//axios.defaults.baseURL = 'https://vizbackend.assisstance.cloudns.cl/api';
axios.defaults.baseURL = 'http://ec2-34-231-173-107.compute-1.amazonaws.com/api/'
//axios.defaults.baseURL = 'http://127.0.0.1:8001/api';
axios.defaults.withCredentials = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
