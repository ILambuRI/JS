<template>

    <div class="col-md-3 card product_section" style="width: 20rem; margin-bottom: 30px; margin-left: 20px;">
      <img class="card-img-top"  :src="product.imgLabel" :alt="product.category + ' ' + product.name" />
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
