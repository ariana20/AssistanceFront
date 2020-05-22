import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const HelloJs = require('hellojs/dist/hello.all.min.js');
const VueHello = require('vue-hellojs');

HelloJs.init({
  google: "1030578955704-5808ufgrte18i3evradus1eq2jgptrpk.apps.googleusercontent.com",
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

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://18.232.253.212/Back-end-Software/public/api';
//axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// make sure the surge.sh page go to https
if (window.location.href.indexOf('http://localhost') == -1 && window.location.href.indexOf('http://') > -1) 
  window.location.href = window.location.href.replace('http://', 'https://');