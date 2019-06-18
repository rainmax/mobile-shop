<template>
  <div id="app">
    <div id="app-container">
      <!-- 顶栏 -->
      <mt-header fixed title="固定在顶部">
        <router-link v-show="isHome" to slot="left">
            <mt-button icon="back" @click="prevWeb">返回</mt-button>
        </router-link>
      </mt-header>
      <!-- 内容区 -->
      <transition name="router">
        <router-view/>
      </transition>
      <!-- 底部导航栏 -->
      <nav class="mui-bar mui-bar-tab">
        <router-link class="my-mui-tab-item" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
      </router-link>
        <router-link class="my-mui-tab-item" to="/member">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="my-mui-tab-item" to="/shopcar">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllCount || 0 }}</span></span>
          <span class="mui-tab-label ">购物车</span>
        </router-link>
        <router-link class="my-mui-tab-item" to="/setting">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">设置</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  methods: {
    prevWeb () {
      this.$router.go(-1)
    }
  },
  computed: {
    isHome () {
      // console.log(this.$route.path === '/home');
      return this.$route.path != '/home';
    }
  }
}
</script>

<style scope>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.mint-header.is-fixed {
  z-index: 99;
}

#app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

/* #app-container>div {
  width: 100%;
} */

.router-enter,
.router-leave-to{
  opacity: 0;
}

.router-enter {
  transform: translateX(100%);
}

.router-leave-to {
  transform: translateX(-100%);
}

.router-leave-active {
  position: absolute;
}

.router-enter-active,
.router-leave-active {
  transition: all 1s ease;
}

/* 解决 mui scroll 会造成底部无法滚动的问题 */
.mui-bar-tab .my-mui-tab-item.mui-active {
    color: #007aff;
}

.mui-bar-tab .my-mui-tab-item {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .my-mui-tab-item .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .my-mui-tab-item .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
