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

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    const position = {};

    if (to.hash) {
      position.selector = to.hash;
    }

    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
    }

    return position;
  }
};

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/map',
    component: Map
  }, {
    path: '/application',
    component: Application
  }, {
    path: '/group',
    component: Group
  }, {
    path: '/content',
    component: Content
  }, {
    path: '/manage',
    component: Manage
  }, ]
});

new Vue(Vue.util.extend({
  router
}, App)).$mount('#app');
