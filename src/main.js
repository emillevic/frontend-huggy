import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'

import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;

axios.defaults.headers.common = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYjg0Y2YyY2MyOWVjNDJlYTA4YThjNjQ3OWZmMTkzZjg5MGFhMDQ3MmFhNmQ5M2M5NDVkOTFlOThlZWMyZWI4NDRjZjVhNGJmMmZkOWMxIn0.eyJhdWQiOiJBUFAtYWI1ZDA5NjItMTk0NC00YjgyLWEyOTQtN2E0NTA2NTA5Y2FhIiwianRpIjoiM2RiODRjZjJjYzI5ZWM0MmVhMDhhOGM2NDc5ZmYxOTNmODkwYWEwNDcyYWE2ZDkzYzk0NWQ5MWU5OGVlYzJlYjg0NGNmNWE0YmYyZmQ5YzEiLCJpYXQiOjE2MzAyNzE2MTEsIm5iZiI6MTYzMDI3MTYxMSwiZXhwIjoxNjQ2MTY5MjExLCJzdWIiOiI5MzQ0OSIsInNjb3BlcyI6WyJpbnN0YWxsX2FwcCIsInJlYWRfYWdlbnRfcHJvZmlsZSJdfQ.DkmhM90naAB61NRWKcjGxCCxU2iJT2-uZWQrRgaT75OBrs8gZozzqULNvo1MzMb-S9dIztfa8TcCitDhvG2eYBIQzzuPRK0t_Rp8AJtAn3RCqPdrmeD91IBgNDXjIQrfFIgw5myVPvpGi3U9MOwwf1pwGHEXQ9r_UTRWZkf8O_8"
};


Vue.config.productionTip = false;
Vue.set(Vue.prototype, 'axios', axios)
Vue.set(Vue.prototype, 'BASE_URL', BASE_URL)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
