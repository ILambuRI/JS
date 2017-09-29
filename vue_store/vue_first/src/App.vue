<template>
  <div class="col-md-10 mx-auto" id="app">

    <app-head :cartCnt="cartCnt"></app-head>
    <router-view @addToCart="changeCartCnt"></router-view>

  </div>
</template>

<script>
import appHead from './components/sections/AppHead'

export default {
  name: 'app',

  data () {
    return {
      cartCnt : 0
    }
  },

  components: {
    'app-head': appHead
  },

  created() {
    this.counting()
  },

  methods: {
    counting() {
      this.cartCnt = 0
      
      if (localStorage['goods']) {
        let goods = JSON.parse(localStorage['goods'])
        goods.forEach((el) => {
          this.cartCnt += +el.count
        });
        return goods
      }
    },

    changeCartCnt(operation) {
      switch (operation) {
        case 'plus':
          this.cartCnt++
        break;
      
        case 'minus':
          this.cartCnt--
        break;
      
        case 'delete':
          this.counting()
        break;
      }
    }
  }
}
</script>