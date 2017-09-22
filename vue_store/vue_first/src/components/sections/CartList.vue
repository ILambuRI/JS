<template>
  <div class="cart_list_section">

    <div>
      <span class="d-block bg-secondary col-md-12" style="height: 2px; margin-bottom: 10px; margin-top: 10px;"></span>
    </div>
    <div class="row">
      <div class="col-md-8">
        <div class="clearfix">
          <h4 class="float-left">{{ product.name }}</h4>
          <button class="btn btn-dark float-right">&times;</button>
        </div>

        <div class="row">
          <div class="col-md-1">
            <span class="text-secondary">Size</span><br>
            <span class="font-weight-bold">{{ product.size }}</span>
          </div>
          <div class="col-md-11">
            <span class="font-weight-bold">{{ product.price }} EUR</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-1">
            <span class="text-secondary">Color</span><br>
            <span class="font-weight-bold">{{ product.color }}</span>
          </div>
          <div class="col-md-11">
            <button class="btn btn-dark">-</button>
            <span class="font-weight-bold">{{ product.count }}</span>
            <button class="btn btn-dark">+</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <router-link :to="'/product/' + product.id">
          <img class="card-img-top"  :src="product.imgLabel" :alt="product.category + ' ' + product.name" />
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'cart_list_section',
  data () {
    return {
       
    }
  },
  props: ["product"],
}
</script>
