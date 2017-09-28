<template>

  <div class="head_section">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">STORE</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
      </div>
      <div v-if="btnCheck">
      <router-link to="/cart">
        <button type="button" class="btn btn-dark">CART x {{ count }}</button>
      </router-link>
      </div>
    </nav>
  </div>
  
</template>

<script>
export default {
  name: 'head_section',
  data () {
    return {
       btnCheck : ''
    }
  },
  computed: {
    count() {
      let cnt = 0
      this.btnCheck = false
      if (localStorage['goods']) {
        let goods = JSON.parse(localStorage['goods'])
        goods.forEach((el) => {
          cnt += +el.count
        });
      }
      if (cnt > 0) this.btnCheck = true
      return cnt
    }
  }
}
</script>
