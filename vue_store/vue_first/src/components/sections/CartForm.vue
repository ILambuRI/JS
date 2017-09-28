<template>
  <div class="cart_form_section">

    <div class="form-group">
      <h5 class="text-left">Select payment method:</h5>
      <div class="custom-controls-stacked">
        <label class="custom-control custom-radio">
          <input type="radio" class="custom-control-input" value="card" v-model="payMethod">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description font-weight-bold">Credit card</span>
        </label>
        <label class="custom-control custom-radio">
          <input type="radio" class="custom-control-input" value="paypal" v-model="payMethod">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description font-weight-bold">PayPal</span>
        </label>
      </div>
      <p><input v-model.trim="userFirstname" type="text" class="form-control" aria-describedby="emailHelp" placeholder="First name"></p>
      <p><input v-model.trim="userLastname" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Last name"></p>
      <p><input v-model.trim="userEmail" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Email"></p>
      <!-- <p>{{ validEmail }}</p> -->
      <div class="custom-controls-stacked">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" v-model="spam">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description font-weight-bold">Spam me on the mail advertising</span>
        </label>
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" v-model="terms">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description font-weight-bold">I agree to the Terms and Conditions</span>
        </label>
      </div>
    </div>
    <router-link to="/thx">
      <button v-if="validAccess" @click="saveOrderInfo()" type="submit" class="btn btn-dark">Сheckout</button>
    </router-link>
    <button v-if="!validAccess" type="submit" class="btn btn-dark" disabled>Сheckout</button>

  </div>
</template>

<script>
export default {
  name: 'cart_form_section',
  data () {
    return {
       payMethod : 'card',
       userEmail : '',
       userFirstname : '',
       userLastname : '',
       spam : true,
       terms : false,
    }
  },

  computed: {
    validAccess() {
      if (this.validEmail && this.validFirstname && this.validLastname && this.terms) {
        return true
      }

      return false
    },

    validFirstname() {
      if (this.userFirstname.length > 2) {
        return true
      }

      return false
    },

    validLastname() {
      if (this.userLastname.length > 2) {
        return true
      }

      return false
    },

    validEmail() {
      let x = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.exec(this.userEmail)

      if (x) {
        return true
      }

      return false
    }
  },

  methods: {
    saveOrderInfo() {
      let order = []
      
      if (localStorage['order']) {
        order = JSON.parse(localStorage['order'])
        localStorage.removeItem("order");
      
        order.forEach((element) => {
          element.payMethod = this.payMethod
          element.userEmail = this.userEmail
          element.userFirstname = this.userFirstname.charAt(0).toUpperCase() + this.userFirstname.substr(1).toLowerCase()
          element.userLastname = this.userLastname.charAt(0).toUpperCase() + this.userLastname.substr(1).toLowerCase()
          element.spam = this.spam
        })
      }

      localStorage['order'] = JSON.stringify(order)
    }
  }
}
</script>
