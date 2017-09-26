<template>
  <div class="cart_calculator_section">

    <div class="form-group">
      <h5 class="text-left">Voucher code:</h5>
      <input v-model.trim="userInput" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter your voucher here">
    </div>
    <button @click="addVoucher()" type="submit" class="btn btn-dark">Submit</button>
    <p></p>
    <div>
      <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
    </div>
    
    <div class="clearfix">
      <span class="float-left font-weight-bold">In your Cart:</span>
      <span class="float-right font-weight-bold">{{ cartTotal }} EUR</span>
    </div>
    
    <div class="clearfix">
      <span class="float-left font-weight-bold">Voucher reduction:</span>
      <span class="float-right font-weight-bold">{{ voucherReduction }} EUR</span>
    </div>
    
    <div class="clearfix">
      <span class="float-left font-weight-bold">Shipping:</span>
      <span class="float-right font-weight-bold">{{ shipping }} EUR</span>
    </div>
    <p></p>
    <div class="clearfix">
      <h4 class="float-left font-weight-bold">Grand Total:</h4>
      <h4 class="float-right font-weight-bold">{{ grandTotal }} EUR</h4>
    </div>
    <div>
      <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
    </div>

  </div>
</template>

<script>
import сonfig from '../../js/appConfig'

export default {
  name: 'cart_calculator_section',
  data () {
    return {
      shipping: сonfig.appConfig.shipping,
      voucher: сonfig.appConfig.voucher,
      userInput: '',
      userVoucher: '',
      voucherReduction: 0,
      totalCart: 0,
      total: 0
    }
  },

  props: ["userCart"],

  computed: {
    cartTotal() {
      this.totalCart = 0
      this.userCart.forEach((el) => {
      this.totalCart += +el.price * +el.count
      })
      // this.parseLocalTotal()
      return this.totalCart
    },

    grandTotal() {
      this.total = 0
      if (this.totalCart > 0) {
        this.total = this.totalCart + +this.shipping
      }

      return this.total
    }
  },

  created() {
    // this.parseLocalTotal()
    this.userCart.forEach((el) => {
      this.totalCart += +el.price * +el.count
      })

    if (this.totalCart > 0) {
        this.total = this.totalCart + +this.shipping
    }
    this.parseLocalTotal()
    // console.log(сonfig.appConfing.shipping)
    // let goods = []
    // if (localStorage['total']) {
    //   goods = JSON.parse(localStorage['total'])
    //   localStorage.removeItem("total");
    
    //   goods.forEach((element, key) => {
    //     if (element.userVoucher) {
    //       this.userVoucher = element.userVoucher
    //     }
    //   })
    // }

    // goods.push({grandTotal: this.grandTotal,
    //             totalCart: this.totalCart,
    //             voucherReduction: this.voucherReduction,
    //             userVoucher: this.userVoucher,
    //             shipping: this.shipping
    // })
    // localStorage['total'] = JSON.stringify(goods)
  },

  methods: {
    parseLocalTotal() {
      let goods = []
      if (localStorage['total']) {
        goods = JSON.parse(localStorage['total'])
        localStorage.removeItem("total");
      
        goods.forEach((element, key) => {
          if (element.userVoucher) {
            this.userVoucher = element.userVoucher
          }
        })
        goods = []
      }
      // console.log(this.total)
      goods.push({total: this.total,
                  totalCart: this.totalCart,
                  voucherReduction: this.voucherReduction,
                  userVoucher: this.userVoucher,
                  shipping: this.shipping
      })
      localStorage['total'] = JSON.stringify(goods)
    },

    addVoucher() {
      if (this.userInput) {
        // console.log(this.voucher)
        for (var key in this.voucher) {
          if (key == this.userInput) {
            this.userVoucher = key
          }
        }

        this.parseLocalTotal()
      }
    }
  }
}
</script>
