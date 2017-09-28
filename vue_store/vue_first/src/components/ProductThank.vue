<template>
  <div class="thx_section">

    <div v-if="userOrder">
      <h5 class="text-center">Thank you for your order dude {{ userOrder[0].userFirstname }}!</h5>
      <h5 class="text-center">Your order:</h5>
    </div>
    <div v-else>
      <h5 class="text-center">History of last order:</h5>
      <h5 v-if="!userLastOrder" class="text-center">You have not made any orders yet ...</h5>
    </div>

    <thank-list v-for="product in userLastOrder[1]" :key="product.code" :product="product">
    </thank-list>

  </div>
</template>

<script>
import requestData from '../js/requestData'

import thankList from './sections/ThankList'

export default {
  name: 'thx_section',
  data () {
    return {
      dataProducts: requestData.data,
      orderNum : Math.random() * (100000 - 100) + 100,
      userCart : '',
      userOrder : '',
      userLastOrder : ''
    }
  },

  components:{
	'thank-list': thankList
  },

	created() {
    if (localStorage['order']) {
      this.order = JSON.parse(localStorage['order'])

      if (this.order[0].userFirstname) {
        localStorage.removeItem("order")
        this.userOrder = this.order
        this.userOrder[0].orderNum = this.orderNum

        if (localStorage['goods']) {
          this.userCart = JSON.parse(localStorage['goods'])
          localStorage.removeItem("goods")
        }
      }
    }

    if (this.userOrder && this.userCart) {
      this.userOrder.push(this.userCart)

      localStorage.removeItem("HistoryOrder")
      localStorage['HistoryOrder'] = JSON.stringify(this.userOrder)
      this.userLastOrder = this.userOrder
      this.makeGoodsArr()
      /* Send to the backend */
      console.log(this.userLastOrder[1])
    }
    else {
      if (localStorage['HistoryOrder']) {
        this.userLastOrder = JSON.parse(localStorage['HistoryOrder'])
        this.makeGoodsArr()
        // console.log(this.userLastOrder)
      }
    }

    this.$emit('addToCart', 'delete')
  },
  
  methods: {
    makeGoodsArr() {
      this.userLastOrder[1].forEach((el) => {
        this.dataProducts.filter((element) => {
          if ( el.code == element.id ) {
            el.name = element.name
            el.color = element.color
            el.imgLabel = element.imgLabel
            el.category = element.category
            el.price = element.price
            return
          }
        })
      })
    }
  }
}
</script>

