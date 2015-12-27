<template>
<div class="">
  Map
<h2 class="red"></h2>
</div>
</template>

<script>
export default {
  data () {
    this.$http.get('/rest/portals/self?f=pjson').then(function (response) {
      response.status;
      response.headers();
      response.headers('expires');

      this.$set('someData', response.data);
    }, function (response) {

      // handle error
    });
  }
}
</script>
