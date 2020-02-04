import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import { store } from './store/store';

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
