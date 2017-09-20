<template>

    <div class="col-md-3 card product_section" style="width: 20rem; margin-bottom: 30px; margin-left: 20px;">
      <router-link :to="'/product/' + product.id">
        <img class="card-img-top"  :src="product.imgLabel" :alt="product.category + ' ' + product.name" />
      </router-link>
      <div class="card-body">
        <p class="card-text">{{ product.name }} - <strong>{{ product.price }}</strong></p>
      </div>
    </div>
  
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
       
    }
  },
  props: ["product"],
}
</script>
