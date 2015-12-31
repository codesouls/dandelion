<template>
<div class="main">
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="list-group">
          <a class="nav-link list-group-item" href="#" v-on:click="getMapContent('appall')">所有</a>
          <a class="nav-link list-group-item" href="#" v-on:click="getMapContent('webmap')">web</a>
          <a class="nav-link list-group-item" href="#" v-on:click="getMapContent('weblayer')">移动</a>
          <a class="nav-link list-group-item" href="#" v-on:click="getMapContent('scene')">桌面</a>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row resource-list">
          <div class="col-md-4 application" v-for="item in appList.results">
            <a href="/item/{{item.id}}" title="{{item.title}}">
              <div class="card">
                <img class="card-img-top" v-bind:src="item.thumbnail | thumbnail item.id" alt="{{item.title}}">
                <div class="card-block">
                  <h3 class="card-title">{{item.title}}</h3>
                  <p>作者：{{item.owner}}</p>
                  <p>创建于：{{item.created | datetime}}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <nav v-bind:style="{ display: isPaginationDisplay}">
          <ul class="pager">
            <li v-bind:class="{'pager-prev': true, 'disabled': isPrevDisabled}"><span v-on:click="getAppContent(appList.start - 12, isPrevDisabled)">Previous</span></li>
            <li v-bind:class="{'pager-next': true, 'disabled': isNextDisabled}"><span v-on:click="getAppContent(appList.nextStart, isNextDisabled)" >Next</span></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import * as portal from '../api';

export default {
  data() {
    return {
      appList: {},
      isPaginationDisplay: 'none',
      isPrevDisabled: false,
      isNextDisabled: false
    }
  },
  route: {
    data(transition) {
      this.getAppContent();
    }
  },
  methods:{
    getAppContent(start = 1, isDisabled = false) {
      if(isDisabled) {return;}

      var self = this;

      portal.queryItem({type: 'application', num: 12, start: start, sortField: 'created'}).then(function(res) {
        self.$set('appList', res);

        if(res.total > 12) {
          self.$set('isPaginationDisplay', 'block');
        } else {
          self.$set('isPaginationDisplay', 'none');
        }

        if(res.nextStart === -1) {
          self.$set('isNextDisabled', true);
        } else {
          self.$set('isNextDisabled', false);
        }

        if(res.start === 1) {
          self.$set('isPrevDisabled', true);
        } else {
          self.$set('isPrevDisabled', false);
        }
      }, function(err) {
        console.log(err);
      });
    }
  },
  filters: {
    thumbnail(value, itemId) {
      if (value)
      {
        return '/rest/content/items/' + itemId + '/info/' + value;
      } else {
        return 'http://fatteru.cloud.com/arcgis/portalimages/desktopapp.png';
      }
    },
    datetime (value) {
      var createdTime = new Date(value);

      return createdTime.getFullYear() + '年' + createdTime.getMonth() + '月' + createdTime.getDate() + '日';
    }
  }
}
</script>
