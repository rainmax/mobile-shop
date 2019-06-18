import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member'
import Setting from '@/components/Setting'
import ShopCar from '@/components/shopCarComponents/ShopCar'
import News from '@/components/News'
import NewDetail from '@/components/NewDetail'
import PhoShare from '@/components/phoShareComponents/PhoShare'
import PhoDetail from '@/components/phoShareComponents/PhoDetail'
import Goods from '@/components/GoodsComponents/Goods'
import GoodDetail from '@/components/GoodsComponents/GoodDetail'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'mui-active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/home/news',
      name: 'news',
      component: News
    },
    {
      path: '/newDetail/:id',
      name: 'newDetail',
      component: NewDetail
    },
    {
      path: '/phoShare',
      name: 'phoShare',
      component: PhoShare
    },
    {
      path: '/phoDetail/:phoId',
      name: 'phoDetail',
      component: PhoDetail
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/gooddetail/:id',
      name: 'goodDetail',
      component: GoodDetail
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/shopCar',
      name: 'ShopCar',
      component: ShopCar
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
