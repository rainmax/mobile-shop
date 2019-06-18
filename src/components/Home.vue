<template>
    <div>
        <div class="mui-content">
          <swiper :picList="lunbotuList" :isWidthFull="true"/>
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news">
                    <img src="../../static/img/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/PhoShare">
                    <img src="../../static/img/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/goods">
                    <img src="../../static/img/menu3.png" alt="">
                    <div class="mui-media-body">商品分类</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../static/img/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../static/img/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../static/img/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import swiper from '@/components/commonComponents/Swiper'
export default {
  data: function () {
    return {
      lunbotuList: []
    }
  },
  components: {
    swiper
  },
  created: function () {
    this.getLunbotu()
  },
  methods: {
    getLunbotu: function () {
      var that = this
      this.axios.get('http://localhost:8888/api/getlunbotu').then(function (res) {
        that.lunbotuList = res.data.imgs
      })
    }
  }
}
</script>

<style scope>
.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
}

.mui-table-view-cell img{
    width: 60px;
    height: 60px;
}

</style>
