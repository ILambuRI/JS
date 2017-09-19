<template>
  <div class="main_section">
    <div class="row justify-content-center text-center" id="filter_row" style="margin-top: 80px; margin-bottom: 50px;">
      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="category" v-model="category" @change="dataFilter(category)">
            <option value="">Category</option>
            <option v-for="category in  options.categories" :key="" :value="category.value">
              {{category.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="color" v-model="color">
            <option value="">Color</option>    
            <option v-for="color in  options.colors" :key="" :value="color.value">
              {{color.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="size" v-model="size">
            <option value="">Size</option>    
            <option v-for="size in  options.sizes" :key="" :value="size.value">  
              {{size.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="sort" v-model="sort">
            <option value="">Sort</option>    
            <option v-for="sort in  options.sorts" :key="" :value="sort.value">
              {{sort.title}}
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="row justify-content-center text-center" id="goods">
      <one-product v-for="product in arrRes" :key="product.id" :product="product" ></one-product>
    </div>

  </div>
</template>

<script>
import requestData from '../js/requestData'
import filterButtonOpt from '../js/filterButtonOpt'

import Product from './ProductPart'

export default {
  name: 'main_section',
  data () {
    return {
      category: '',
      size: '',
      color: '',
      sort: '',
      arrRes: '',
      options: filterButtonOpt.options,
      dataProducts: requestData.data
    }
  },

  methods: {
    getByCategory: function(element, category) {
      if (category == '') return true
      if (element.category == category) return true
      console.log(element);
      return false
    },
    getBySize: function(element, size) {
      if (size == '') return true;
      if (element.size == size) return true;

      return false;
    },
    getByColor: function(element, color) {
      if (color == '') return true;
      if (element.color == color) return true;

      return false;
    },

    dataFilter: function(category) {
      // console.log(this.getByCategory(this.dataProducts[0], 't-shirt'))
      // console.log(category)
      //   console.log(cat);
      // var cat = this.category
      var getByCategory = function(element, cat) {
        console.log(element.size);
        if (cat == '') return true
        if (element.category == cat) return true
        // console.log(element)
        return false
      }

      let res = this.dataProducts.filter(function (element){
      // console.log(this.category)
          // console.log(element);
          let cat = getByCategory(element, category)
          let size = this.getBySize(element, this.size)
          let color = this.getByColor(element, this.color)
          if (cat && size && color) return true
          
          return false;
      });

      if (this.sort == 'low') {
        this.arrRes = res.sort(function(a, b) { return a.price - b.price; }); 
      }
      else if (this.sort == 'high') {
        this.arrRes = res.sort(function(a, b) { return b.price - a.price; });
      }
      else {
        this.arrRes = res;
      }
    }
  },

  components:{
    'one-product': Product
  } 
}
// console.log(dataProducts)
</script>
