<template>
  <div class="cart_section">

		<div class="col-md-6 text-center">
			<h2 class="text-left">Cart:</h2>
			<cart-list v-for="product in userCart" :key="product.id" :product="product" ></cart-list>
    </div>

  </div>
</template>

<script>
import requestData from '../js/requestData'
import filterButtonOpt from '../js/filterButtonOpt'

import cartList from './sections/CartList'

export default {
  name: 'cart_section',
  data () {
    return {
			dataProducts: requestData.data,
			options: filterButtonOpt.options,
			goodsInfo: [],
			userCart: []
    }
	},
	
	watch: {
	},
		
  methods:{
		checkBtnAccess: function() {
		}

	},
	
	created() {
		let self = this

		if (localStorage['goods']) {
			self.userCart = JSON.parse(localStorage['goods'])
			
			self.userCart.forEach(function(el) {
				self.dataProducts.filter((element) => {
					if ( el.code == element.id ) {
						el.name = element.name
						el.color = element.color
						el.imgLabel = element.imgLabel
						el.category = element.category
						// console.log(el)
						return
					}
				})
			})

			// this.dataProducts.forEach(function(element) {
			// 	storage.forEach(function(el) {
			// 		if ( (el.code == element.id ) 
			// 				 ) {
			// 			let item = element
			// 			item.userSize = el.size
			// 			item.userCount = el.count
			// 			self.goods.push(item) 
			// 		}
			// 	})
			// })

			console.log(this.userCart)
		}

	},

	components:{
	'cart-list': cartList
  },
}
</script>

