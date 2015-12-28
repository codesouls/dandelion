<template>
  <div class="header">
    <nav class="navbar navbar-light navbar-static-top bg-faded">
      <div class="container">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#dlNavbar">
          ☰
        </button>
        <div class="collapse navbar-toggleable-xs" id="dlNavbar">
          <a class="navbar-brand" href="/">Dandelion</a>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <a class="nav-link" v-link="'/'">首页</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-link="'/map'">地图</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-link="'/application'">应用</a>
            </li>
          </ul>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <a class="nav-link" href="#" v-on:click="login">登录</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>

  <div class="main">
    <div class="container">
      <!-- <iframe src="https://fatteru.cloud.com/arcgis/sharing/rest/oauth2/authorize?client_id=arcgisonline&redirect_uri=https://fatteru.cloud.com/arcgis/home/postsignin.html&display=iframe&response_type=token&parent=https://fatteru.cloud.com&expiration=20160&locale=zh-cn" width="100%" height="100%">

      </iframe> -->
      <router-view></router-view>
    </div>
  </div>

  <div class="footer">
    <div class="container">
      <div style="float: left">Copyright © 2015 Codesouls</div>
      <div style="float: right">
        <a href="https://github.com/codesouls/dandelion">源代码</a>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
}
</style>

<script>
import {storage} from './utils';

function queryString(uri, val) {
  var re = new RegExp("" +val+ "=([^&?]*)", "ig");
  return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
};

export default {
  created() {
    var hash = window.location.hash;
    var timeNow = new Date();

    storage.setItem('token', queryString(hash, 'access_token')).expires(parseInt(queryString(hash, 'expires_in')));
    storage.setItem('username', queryString(hash, 'username'));

    // localStorage['portal.token'] = queryString(hash, 'access_token');
    // localStorage['portal.expires_in'] = timeNow.getTime() + parseInt(queryString(hash, 'expires_in')) * 1000;
    // localStorage['portal.username'] = queryString(hash, 'username');
  },
  methods: {
    login() {
      var path = 'https://fatteru.cloud.com/arcgis/sharing/rest/oauth2/authorize?';
      var queryParams = ['client_id=' + 'KlHwQPA5TWl1omVg',
      'response_type=token',
      'redirect_uri=' + window.location];
      var query = queryParams.join('&');
      var url = path + query;
      window.location.replace(url);
    }
  }
}
</script>
