import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

new Vue({
  router, //prueba de versiones1
  store,
  render: h => h(App)
}).$mount('#app')
