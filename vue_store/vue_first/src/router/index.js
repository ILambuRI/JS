import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/ProductList'
import ProductSingle from '@/components/ProductSingle'
import ProductCart from '@/components/ProductCart'
import ProductThank from '@/components/ProductThank'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main page',
      component: ProductList
    },

    {
      path: '/product/:id',
      name: 'Page of the current product',
      component: ProductSingle
    },

    {
      path: '/cart',
      name: 'Customer Cart',
      component: ProductCart
    },

    {
      path: '/thx',
      name: 'Thank for the order and history of the last order',
      component: ProductThank
    }
  ]
})
