<template>
  <div>
    <div class="header">
      <nav class="navbar navbar-light navbar-static-top bg-faded">
        <div class="container">
          <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#dlNavbar">
            ☰
          </button>
          <div class="collapse navbar-toggleable-xs" id="dlNavbar">
            <a class="navbar-brand" href="/">{{portalName}}</a>
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">首页</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/map">地图</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/application">应用</router-link>
              </li>
              <!-- <li class="nav-item">
                   <a class="nav-link" v-link="'/group'">群组</a>
                   </li> -->
              <li class="nav-item" v-if="token">
                <router-link class="nav-link" to="/content">我的内容</router-link>
              </li>
            </ul>
            <ul class="nav navbar-nav pull-xs-right">
              <li class="nav-item" v-if="token">
                <router-link class="nav-link" to="/manage">管理</router-link>
              </li>
              <li class="nav-item" v-if="token">
                <router-link class="nav-link" to="/signout">退出</router-link>
              </li>
              <li class="nav-item" v-else>
                <router-link class="nav-link" to="/signin">登录</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <router-view></router-view>

    <div class="footer">
      <div class="container">
        <div style="float: left">Copyright © 2015 da07ng</div>
        <div style="float: right">
          <a href="https://github.com/da07ng/dandelion">源代码</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
</style>

<script>
import {storage, queryString} from './utils';
import * as portal from './api';

export default {
  data() {
    return {
      token: storage.getItem('token'),
      portalName: 'Portal for ArcGIS'
    }
  },
  created() {
    var hash = window.location.hash;
    var self = this;

    if(queryString(hash, 'access_token') && !storage.getItem('token')) {
      storage.setItem('token', queryString(hash, 'access_token')).expires(parseInt(queryString(hash, 'expires_in')));
      storage.setItem('username', queryString(hash, 'username'));

      self.$set('token', queryString(hash, 'access_token'));
    }

    portal.getPortalInfo().then(function(res) {
      storage.setItem('orgid', res.id);
      // self.$set('portalName', res.name);
    }, function(err) {
      console.log(err);
    })
  },
  methods: {
    signin() {
      var path = 'https://fatteru.cloud.com/arcgis/sharing/rest/oauth2/authorize?';
      var queryParams = ['client_id=' + 'KlHwQPA5TWl1omVg',
      'response_type=token',
      'expiration=10080',
      'locale=zh-cn',
      'redirect_uri=' + window.location];
      var query = queryParams.join('&');
      var url = path + query;
      window.location.replace(url);
    },
    signout() {
      storage.removeItem('token');
      this.$set('token', '');
    }
  }
}
</script>
