<template>
  <div class="list_section">

    <div class="row justify-content-center text-center" id="filter_row" style="margin-top: 80px; margin-bottom: 50px;">

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <!-- @change="dataFilter" -->
          <select id="category" v-model="category">  
            <option value="">Category</option>
            <option v-for="(category, index) in  options.categories" :key="index" :value="category.value">
              {{category.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="color" v-model="color">
            <option value="">Color</option>    
            <option v-for="(color, index) in  options.colors" :key="index" :value="color.value">
              {{color.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="size" v-model="size">
            <option value="">Size</option>    
            <option v-for="(size, index) in  options.sizes" :key="index" :value="size.value">  
              {{size.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="btn-group col-md-2">
        <div class="dropdown">
          <select id="sort" v-model="sort">
            <option value="">Sort</option>    
            <option v-for="(sort, index) in  options.sorts" :key="index" :value="sort.value">
              {{sort.title}}
            </option>
          </select>
        </div>
      </div>

      <div v-if="btnVisibility" class="btn-group col-md-2">
        <div class="dropdown">
          <button type="button" class="btn btn-dark" @click="clearBtn()">
            <span>Clear Filter &times;</span>
          </button>
        </div>
      </div>

    </div>
    
    <div class="row justify-content-center text-center">
        <one-card v-for="product in filteredProducts" :key="product.id" :product="product" ></one-card>
    </div>

  </div>
</template>

<script>
import requestData from '../js/requestData'
import filterButtonOpt from '../js/filterButtonOpt'
import oneCard from './sections/OneCard'

export default {
  name: 'list_section',
  data () {
    return {
      category: '',
      size: '',
      color: '',
      sort: '',
      options: filterButtonOpt.options,
      dataProducts: requestData.data
    }
  },

  components:{
    'one-card': oneCard
  },

  computed: {
    btnVisibility() {
      if (this.category || this.size || this.color || this.sort) {
        return true
      }
      else {
        return false
      }
    },

    filteredProducts () {
      var checkSize = (el) => {
        if (this.size == "") return true
        if (el.size == this.size) return true
        
        return false
      }

      var checkCategory = (el) => {
        if (this.category == "") return true
        if (el.category == this.category) return true
        
        return false
      }

      var checkColor = (el) => {
        if (this.color == "") return true
        if (el.color == this.color) return true
        
        return false
      }

      let arrRes = this.dataProducts.filter((el) => {
        return checkSize(el) && checkCategory(el) && checkColor(el)
      })

      if (this.sort == 'low') {
        return  arrRes.sort((a, b) => { return a.price - b.price }); 
      }
      else if (this.sort == 'high') {
        return arrRes.sort((a, b) => { return b.price - a.price });
      }
      else {
        return arrRes
      }
    }
  },

  methods: {
    clearBtn: function () {
      this.category = ''
      this.size = ''
      this.color = ''
      this.sort = ''
    }
  }
}
</script>