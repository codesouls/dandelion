<template>
  <nav class="navbar navbar-light bg-faded">
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
    <form class="form-inline navbar-form pull-right">
      <input class="form-control" type="text" placeholder="Search...">
      <button class="btn btn-success-outline" type="submit">查询</button>
    </form>
  </nav>

  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
</script>
