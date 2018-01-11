import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import Goods from '../components/Goods/Goods'
import Ratings from '../components/Ratings/Ratings'
import Seller from '../components/Seller/Seller'

export default new Router({
  mode: 'history',
  // 指定選中後的類名（默認值是 router-link-active)
  linkActiveClass: 'active',
  routes: [

    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
  ]
})
