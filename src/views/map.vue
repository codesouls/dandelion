<template>
<div class="main">
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="list-group">
          <ul>
            <li>
              <a href="#" v-on:click="getMapContent('maps')">地图</a>
              <ul>
                <li>
                  <a href="#" v-on:click="getMapContent('maps-webmaps')">Web地图</a>
                </li>
                <li>
                  <a href="#" v-on:click="getMapContent('maps-mapfiles')">地图文件</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" v-on:click="getMapContent('layers')">图层</a>
              <ul>
                <li>
                  <a href="#" v-on:click="getMapContent('layers-weblayers-features')">要素图层</a>
                </li>
                <li>
                  <a href="#" v-on:click="getMapContent('layers-weblayers-tiles')">切片图层</a>
                </li>
                <li>
                  <a href="#" v-on:click="getMapContent('layers-weblayers-mapimage')">地图图像图层</a>
                </li>
                <li>
                  <a href="#" v-on:click="getMapContent('layers-weblayers-imagery')">影像</a>
                </li>
                <li>
                  <a href="#" v-on:click="getMapContent('layers-weblayers-tables')">表</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" v-on:click="getMapContent('scenes')">场景</a>
            </li>
            <li>
              <a href="#" v-on:click="getMapContent('tools')">工具</a>
              <ul>
                <li>
                  <a href="#" v-on:click="getMapContent('tools-geometric')">几何运算</a>
                </li>
                <li>
                  <a href="#" v-on:click="getMapContent('tools-geoprocessing')">地理处理任务</a>
                </li>
                <li>
                  <a href="#" v-on:click="getMapContent('tools-network')">网络分析</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row resource-list">
          <div class="col-md-4 map" v-for="item in mapList.results">
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
            <li v-bind:class="{'pager-prev': true, 'disabled': isPrevDisabled}"><span v-on:click="getMapContent(itemType, mapList.start - 12, isPrevDisabled)">Previous</span></li>
            <li v-bind:class="{'pager-next': true, 'disabled': isNextDisabled}"><span v-on:click="getMapContent(itemType, mapList.nextStart, isNextDisabled)" >Next</span></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass" scoped>
.list-group ul li {
  cursor: pointer;
}
</style>

<script>
import * as portal from '../api';

export default {
  data() {
    return {
      itemType: 'maps',
      mapList: {},
      isPaginationDisplay: 'none',
      isPrevDisabled: false,
      isNextDisabled: false
    }
  },
  route: {
    data(transition) {
      this.getMapContent();
    }
  },
  methods:{
    getMapContent(itemType = 'maps', start = 1, isDisabled = false) {
      if(isDisabled) {return;}

      var self = this;
      self.$set('itemType', itemType);

      portal.queryItem({type: itemType, num: 12, start: start, sortField: 'created'}).then(function(res) {
        self.$set('mapList', res);

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
      if (value) {
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
