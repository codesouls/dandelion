<template>
<div class="main">
  <div class="container">
    <div class="">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-on:click="switchTab(0)">
          <a v-bind:class="{'nav-link': true, 'active': activeIndex==0}">常规</a>
        </li>
        <li class="nav-item" v-on:click="switchTab(1)">
          <a v-bind:class="{'nav-link': true, 'active': activeIndex==1}">图库</a>
        </li>
        <li class="nav-item" v-on:click="switchTab(2)">
          <a v-bind:class="{'nav-link': true, 'active': activeIndex==2}">地图</a>
        </li>
        <li class="nav-item" v-on:click="switchTab(3)">
          <a v-bind:class="{'nav-link': true, 'active': activeIndex==3}">服务器</a>
        </li>
        <li class="nav-item" v-on:click="switchTab(4)">
          <a v-bind:class="{'nav-link': true, 'active': activeIndex==4}">用户管理</a>
        </li>
      </ul>

      <div class="tab-content">
        <div v-bind:class="{'tab-pane': true, 'active': activeIndex==0}" role="tabpanel">
          <h3>常规管理</h3>
        </div>
        <div v-bind:class="{'tab-pane': true, 'active': activeIndex==1}" role="tabpanel">
          <h3>图库管理</h3>
        </div>
        <div v-bind:class="{'tab-pane': true, 'active': activeIndex==2}" role="tabpanel">
          <h3>地图管理</h3>
        </div>
        <div v-bind:class="{'tab-pane': true, 'active': activeIndex==3}" role="tabpanel">
          <h3>服务器管理</h3>
        </div>
        <div v-bind:class="{'tab-pane': true, 'active': activeIndex==4}" role="tabpanel">
          <h3>用户管理</h3>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
.nav-link {
  cursor: pointer;
}

.tab-content {
  h3 {
    margin: 20px 0;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      disabledList: []
    }
  },
  methods: {
    switchTab(activeIndex) {
      let self = this;
      self.$set('activeIndex', activeIndex);
    }
  }
}
</script>
