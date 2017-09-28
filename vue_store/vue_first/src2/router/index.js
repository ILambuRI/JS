import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/ProductList'
import ProductSingle from '@/components/ProductSingle'
import ProductCart from '@/components/ProductCart'


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
    }
  ]
})
