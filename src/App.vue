<template>
  <div id="app">
    <sku/>
  </div>
</template>

<script>
import sku from './components/sku.vue'

export default {
  name: 'App',
  components: {
    sku
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
