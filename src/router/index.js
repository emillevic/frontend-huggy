import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Contact from "../views/Contact.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/contatos",
    name: "Contact",
    component: Contact,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
