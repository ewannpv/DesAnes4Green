import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Admin from '../views/admin.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,

  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
