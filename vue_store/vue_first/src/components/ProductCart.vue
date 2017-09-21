<template>

  <div class="cart_section">
			<div>{{ name }}</div>
			<div>{{ price }}</div>

			<div class="dropdown">
          <select id="size" v-model="size">
            <option value="">Select your size</option>    
            <option v-for="size in  options.sizes" :key="" :value="size.value">  
              {{size.title}}
            </option>
          </select>
        </div>

			<div v-if="btnAccess == true && size" class="btn-group col-md-2">
        <div class="dropdown">
          <button type="button" class="btn btn-dark" @click="addProduct()">
            <span>Add to bag</span>
          </button>
        </div>
      </div>

			<div v-if="btnAccess == false"class="btn-group col-md-2">
        <div class="dropdown">
					<router-link to="/basket">
						<button type="button" class="btn btn-dark">
							<span>Proceed to checkout</span>
						</button>
					</router-link>
        </div>
      </div>
  </div>
	
</template>

<script>
import requestData from '../js/requestData'
import filterButtonOpt from '../js/filterButtonOpt'

export default {
  name: 'cart_section',
  data () {
    return {
			dataProducts: requestData.data,
			options: filterButtonOpt.options,
			id: '',
			name: '',
			price: '',
			size: '',
			btnAccess: null,
			goods: []
    }
	},
	
	watch: {
    size: function () {
      this.checkBtnAccess()
    }
	},
		
  methods:{
		getProductInfo: function(id) {
			let self = this

			this.dataProducts.filter((el) => {
				if (el.id == id) {
					self.name = el.name
					self.price = el.price
					return
				}
			})
		},

		addProduct: function() {
			if (this.btnAccess && this.size) {
				this.btnAccess = false

				let item = {
					code: this.id,
					count: 1,
					size: this.size
				}

				this.goods.push(item)

				localStorage['goods'] = JSON.stringify(this.goods)
			}
		},

		checkBtnAccess: function() {
			let self = this
			self.btnAccess = true
			if (localStorage['goods'])
			{
				this.goods = JSON.parse(localStorage['goods']);

				this.goods.forEach(function(element) {
					// console.log(element.code)
					// console.log(element.size)
					if ( (element.code == self.id) &&
							 (element.size == self.size) ) {
						self.btnAccess = false
					}
				});
			}
		}

	},
	
	created() {
		this.id = this.$route.params.id
		this.getProductInfo(this.id)
	},
}
</script>

