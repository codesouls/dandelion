require('./assets/stylesheets/style.scss');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './app.vue';
import Home from './views/home.vue';
import Map from './views/map.vue';
import Application from './views/application.vue';
import Group from './views/group.vue';
import Content from './views/content.vue';
import Manage from './views/manage.vue';

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
  },
  '/group': {
    name: 'group',
    component: Group
  },
  '/content': {
    name: 'content',
    component: Content
  },
  '/manage': {
    name: 'manage',
    component: Manage
  }
});

router.start(App, '#app');
