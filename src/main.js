// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import VuePreview from 'vue-preview'
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch} from 'mint-ui'
import '../static/mui.min.css'
import '../static/icons-extra.css'
import mui from '../static/js/mui.min'
import Vuex from 'vuex'

/*********Vuex相关**********/
Vue.use(Vuex);

//从本地取出购物车数据
// localStorage.removeItem('shopCar');
var car = JSON.parse(localStorage.getItem('shopCar') || '[]')
var store = new Vuex.Store({
  state: {
    //购物车商品的数据，每项是一个对象，对象里面：
    //{godId商品的id,count 商品的购买数量,price 商品的价格, selected 商品是否被选中, thumPic:商品略缩图地址}
    car: car, 
  },
  mutations: {
    //购物车商品数据添加方法
    addToCar (state, goodsinfo) {
      //如果之前已存在该商品，则只需要更新某项数据即可
      var flag = false;
      flag = state.car.some(item => {
        if (item.godId === goodsinfo.godId) {
          item.count = parseInt(goodsinfo.count);
          return true; 
        }
      })
      //如果不存在该商品，则添加进去
      if (!flag)  state.car.push(goodsinfo)

      //将购物车数据存储在本地
      localStorage.setItem('shopCar', JSON.stringify(state.car));
    },
    //根据godId删除某个商品
    removeGood (state, godId) {
      state.car.some((item, i) => {
        if (item.godId == godId) {
          state.car.splice(i, 1);
          localStorage.setItem('shopCar', JSON.stringify(state.car));
        }
      })
    },
    updateSelected (state, selectedInfo) {
      state.car.some(item => {
        if (item.godId == selectedInfo.godId) {
          item.selected = selectedInfo.selected;
          localStorage.setItem('shopCar',JSON.stringify(state.car));
        }
      })
    }

  },
  getters: {
    //获取购物车里面商品的数量
    getAllCount (state) {
      return state.car.reduce((pre, cur) => pre + cur.count, 0);
    },

    //获取购物车里面某个商品的数量
    getCountByGodId: (state) => (godId) => {
      var result = state.car.find(item => item.godId == godId);
      if (result) {
        return result.count
      } else {
        return 1
      }
    },

    //获取选中的商品数量和总价
    getSelGodCount: (state) => {
      var o = {selCount: 0, selSum: 0};
      state.car.forEach(item => {
        if (item.selected) {
          o.selCount += item.count;
          o.selSum += item.count * item.price;
        }
      })
      return o;
    }
  },
})


Vue.config.productionTip = false
/*********** mui相关配置************/
// mui('body').on('click', 'a', function () {
//   document.location.href = this.href
// })
Vue.prototype.mui = mui
/*********** axios相关配置***********/
axios.defaults.baseURL = 'http://localhost:8888/api/'
Vue.prototype.axios = axios
/************ vue-preview相关配置*************/
// defalut install
// Vue.use(VuePreview)

// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})
/************* mint-ui相关配置*****************/
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
Vue.use(Lazyload)
/********************************************/

Vue.filter('dataFormat', function (data) {
  return moment(data).format('YYYY-MM-DD h:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
