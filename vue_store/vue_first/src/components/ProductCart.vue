<template>
  <div class="cart_section">

		<div class="row">
      <div class="col-md-8 text-center">
        <h2 class="text-left">Cart:</h2>
        <cart-list v-for="product in userCart" :key="product.code" :product="product"
        v-on:deleteItem="delItemUserCart" @addToCart="changeCartCnt">
        </cart-list>
      </div>
      <div class="col-md-4">
        <cart-calculator  :userCart="userCart"></cart-calculator>
        <cart-form v-if="userCart.length"></cart-form>
      </div>
    </div>

  </div>
</template>

<script>
import requestData from '../js/requestData'
import filterButtonOpt from '../js/filterButtonOpt'

import cartList from './sections/CartList'
import cartСalculator from './sections/CartСalculator'
import cartForm from './sections/CartForm'

export default {
  name: 'cart_section',
  data () {
    return {
			dataProducts: requestData.data,
			options: filterButtonOpt.options,
			userCart: []
    }
	},

	components:{
	'cart-list': cartList,
	'cart-calculator': cartСalculator,
	'cart-form': cartForm
  },

	created() {
    if (localStorage['goods']) {
      this.userCart = JSON.parse(localStorage['goods'])
      
      this.userCart.forEach((el) => {
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
	},

  methods: {
    delItemUserCart(item) {
      this.userCart.forEach((el, key) => {
        if ( (el.code == item.code) && (el.size == item.size) ) {
          this.userCart.splice(key, 1)
        }
      })

      this.$emit('addToCart', 'delete')
    },

    changeCartCnt(operation) {
      this.$emit('addToCart', operation)
    }
	}
}
</script>

