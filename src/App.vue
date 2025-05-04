<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-if="isAuthenticated" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['initializeStore'])
  },
  created() {
    // Uygulama başlatıldığında store'u initialize et
    this.initializeStore();
  }
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>