require('./assets/stylesheets/bootstrap.scss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './app.vue';
import Home from './views/home.vue';
import Map from './views/map.vue';
import Application from './views/application.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.debug = true;

let router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  transitionOnLoad: true
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
