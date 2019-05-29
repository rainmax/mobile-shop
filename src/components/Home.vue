<template>
    <div>
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url"><img :src="item.url"></mt-swipe-item>
        </mt-swipe>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../static/img/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../static/img/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../static/img/menu3.png" alt="">
                    <div class="mui-media-body">商品分类</div></a></li>
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
export default {
  data: function () {
    return {
      lunbotuList: []
    }
  },
  created: function () {
    this.getLunbotu()
  },
  methods: {
    getLunbotu: function () {
      var that = this
      this.axios.get('http://localhost:8888/getLunbotu').then(function (res) {
        that.lunbotuList = res.data
      })
    }
  }
}
</script>

<style scope>
.mint-swipe {
  height: 240px;
}

.mint-swipe-item img{
    width: 100%;
    height: 100%;
}

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
