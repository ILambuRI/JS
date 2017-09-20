<template>
  <div class="main_section">
    <div class="row justify-content-center text-center" id="filter_row" style="margin-top: 80px; margin-bottom: 50px;">
      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="category" v-model="category" @change="dataFilter">
            <option value="">Category</option>
            <option v-for="category in  options.categories" :key="" :value="category.value">
              {{category.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="color" v-model="color" @change="dataFilter">
            <option value="">Color</option>    
            <option v-for="color in  options.colors" :key="" :value="color.value">
              {{color.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="size" v-model="size" @change="dataFilter">
            <option value="">Size</option>    
            <option v-for="size in  options.sizes" :key="" :value="size.value">  
              {{size.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="sort" v-model="sort" @change="dataFilter">
            <option value="">Sort</option>    
            <option v-for="sort in  options.sorts" :key="" :value="sort.value">
              {{sort.title}}
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <div v-if="arrRes" class="row justify-content-center text-center" id="goods">
        <one-product v-for="product in arrRes" :key="product.id" :product="product" ></one-product>
    </div>
    <div v-else class="row justify-content-center text-center" id="goods">
        <one-product v-for="product in dataProducts" :key="product.id" :product="product" ></one-product>
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
      var self = this

      let res = self.dataProducts.filter(function (element){
          // console.log(element);
          let cat = self.getByCategory(element, self.category)
          let size = self.getBySize(element, self.size)
          let color = self.getByColor(element, self.color)
          if (cat && size && color) return true
          
          return false;
      });

      if (self.sort == 'low') {
        self.arrRes = res.sort(function(a, b) { return a.price - b.price; }); 
      }
      else if (self.sort == 'high') {
        self.arrRes = res.sort(function(a, b) { return b.price - a.price; });
      }
      else {
        self.arrRes = res;
      }
      // console.log(self.arrRes)
    }
  },

  components:{
    'one-product': Product
  },

  created() {
    this.products = Product
  },

  computed: {
    filteredProducts () {
      var self = this

      var checkSize = (el) => {
        if (self.size == "") return true
        if (el.size == self.size) return true
        
        return false
      }

      var checkCategory = (el) => {
        if (self.category == "") return true
        if (el.category == self.category) return true
        
        return false
      }

      return this.dataProducts.filter((el) => {
          // if (self.category == "") return true
          // if (el.category == self.category) return true
        
      return checkSize(el) && checkCategory(el)
      })
    }
  }
}
// console.log(dataProducts)
</script>
