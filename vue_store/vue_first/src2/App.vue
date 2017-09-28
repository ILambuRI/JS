<template>
  <div class="col-md-10 mx-auto" id="app">
    <app-head></app-head>
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
import appHead from './components/sections/appHead'

export default {
  name: 'app',

  components:{
    'app-head': appHead
  }
}

</script>

