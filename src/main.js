import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'

import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = process.env.VUE_APP_BASE_URL;

axios.defaults.headers.common = require('/config.json')

Vue.config.productionTip = false;
Vue.set(Vue.prototype, 'axios', axios)
Vue.set(Vue.prototype, 'Swal', Swal)
Vue.set(Vue.prototype, 'BASE_URL', BASE_URL)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
