<template>

  <div>
  <!-- <div :value="getProduct($route.params.id)"> -->
			<!-- <div>{{ dataProducts[$route.params.id] }}</div> -->
			<!-- <div>{{ getProduct($route.params.id) }}</div> -->
			<div>{{ name }}</div>
			<div>{{ price }}</div>
			<div>{{ size }}</div>

			<div class="btn-group col-md-2">
        <div class="dropdown">
          <button type="button" class="btn btn-dark" @click="addProduct()">
            <span>Add to bag</span>
          </button>
        </div>
      </div>
  </div>
	
</template>

<script>
import requestData from '../js/requestData'

export default {
  name: 'product',
  data () {
    return {
			dataProducts: requestData.data,
			id: '',
			name: '',
			price: '',
			size: ''
    }
  },
  methods:{
		getProduct: function(id) {
			let self = this
			let arrRes = this.dataProducts.filter((el) => {
				// console.log(id) 
				if (el.id == id) return true
			})
			
			if (arrRes){
				this.name = arrRes[0].name
				this.price = arrRes[0].price
				this.size = arrRes[0].size
			} 
		},

		addProduct: function() {
			
		}
	},
	
	created(){
		this.id = this.$route.params.id
    this.getProduct(this.id)
  }
}
</script>

