<template>
  <div class="min-h-screen bg-gray-50">
    <TopNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    TopNavbar
  }
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>