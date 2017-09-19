import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/ProductList'
import ProductSingle from '@/components/ProductSingle'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/singleProduct',
      name: 'singleProduct',
      component: ProductSingle
    }
  ]
})
