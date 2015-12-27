<template>
  <div class="header">
    <nav class="navbar navbar-light navbar-static-top bg-faded">
      <div class="container">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2">
          ☰
        </button>
        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
          <a class="navbar-brand" href="#">Dandelion</a>
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
        </div>
      </div>
    </nav>
  </div>

  <div class="main">
    <div class="container">
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
</script>
