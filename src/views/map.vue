<template>
<div class="">
  Map
</div>

<div class="">
  {{someData.id}}
  {{$route.params | json}}
</div>

<!-- <ul class="posts-list">
  <li v-for="item in topics" v-link="{name:'topic',params:{id:item.id}}">
    <h3 v-text="item.title">
    </h3>
  </li>
</ul> -->
</template>

<script>
export default {
  data() {
    return {
      someData: {
        customBaseUrl: 'test'
      }
    }
  },
  route: {
    data(transition) {
      this.getPortalSelf();
    }
  },
  methods:{
    getPortalSelf() {
      this.$http.get('/rest/portals/self?f=json').then(function (response) {
        response.status;
        response.headers();
        response.headers('expires');

        this.$set('someData', response.data);
      }, function (response) {
        console.log('can not connect to portal');
      });
    }
  }
}
</script>
