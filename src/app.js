import Vue from 'vue';
import App from './app.vue';
import Home from './views/home.vue';
import Map from './views/map.vue';
import Application from './views/application.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

let router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true
});

router.map({
  '/': {
    name: 'home',
    component: Home
  },
  '/map': {
    name: 'map',
    component: Map
  },
  '/application': {
    name: 'application',
    component: Application
  }
});

router.start(App, '#app');
