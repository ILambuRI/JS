<template>
  <div class="single_section">

		<div class="row col-md-12" style="margin-top: 80px;">
			<div class="col-md-6">
				<carousel-3d>
					<slide :index="0">
						<img src="http://vfutbolke.com/wp-content/uploads/2014/03/Futbolka-Vse-hernya-krome-pchel.jpg">
					</slide>
					<slide :index="1">
						<img src="https://dress015.files.wordpress.com/2015/07/11.jpg">
					</slide>
					<slide :index="2">
						<img src="http://suvenirov.com.ua/wp-content/uploads/2013/06/Futbolka-telo-Apple.jpg">
					</slide>
				</carousel-3d>
			</div>
			
			<div class="col-md-6">
				<div class="container text-center" style="margin-top: 50px;">
					<p class="font-weight-bold">{{ name }}</p>
					<p>Some long description of the goods here.</p>
					<p class="font-weight-bold">{{ price }} EUR</p>

					<div class="dropdown">
						<select id="size" v-model="size">
							<option value="">Select your size</option>    
							<option v-for="(size, index) in  options.sizes" :key="index" :value="size.value">  
								{{size.title}}
							</option>
						</select>
					</div>
					<p></p>
					<div v-if="btnAccess && size">
						<button type="button" class="btn btn-dark" @click="addProduct()">
							<span>Add to bag</span>
						</button>
					</div>

					<div v-if="btnAccess == false">
						<router-link to="/cart">
							<button type="button" class="btn btn-dark">
								<span>Proceed to checkout</span>
							</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>

  </div>
</template>

<script>
import requestData from '../js/requestData'
import filterButtonOpt from '../js/filterButtonOpt'
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  name: 'single_section',
    data() {
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
  
  created() {
    this.id = this.$route.params.id
    this.getProductInfo(this.id)
  },

  components: {
    Carousel3d,
    Slide
  },
		
  methods: {
    next() {
      this.$refs.flickity.next()
		},

		previous() {
      this.$refs.flickity.previous()
		},

		getProductInfo(id) {
			this.dataProducts.filter((el) => {
				if (el.id == id) {
					this.name = el.name
					this.price = el.price
					return
				}
			})
		},

		addProduct() {
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

		checkBtnAccess() {
			this.btnAccess = true
			if (localStorage['goods']) {
				this.goods = JSON.parse(localStorage['goods'])

				this.goods.forEach((element) => {
					if ( (element.code == this.id) && (element.size == this.size) ) {
						this.btnAccess = false
					}
				})
			}
		}
	}
}
</script>

<style>

</style>
