<template>
  <nav class="bg-blue-600 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3">
          <img src="../assets/akdeniz.png" alt="Akdeniz Üniversitesi Logo" class="h-12 w-auto ">
          <span class="text-white text-xl font-bold">Kampüs Sorun Takip Sistemi</span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button class="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          <div class="relative">
            <button @click="toggleDropdown" class="flex items-center space-x-2 focus:outline-none">
              <div class="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white font-bold">
                {{ userInitials }}
              </div>
              <div class="text-white text-left">
                <p class="text-sm font-medium">{{ userName }}</p>
                <p class="text-xs opacity-80">{{ userRole }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" :class="{ 'transform rotate-180': isDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TopNavbar',
  data() {
    return {
      isDropdownOpen: false
    }
  },
  computed: {
    userName() {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.name || 'Kullanıcı'
    },
    userInitials() {
      return this.userName.split(' ').map(n => n[0]).join('').toUpperCase()
    },
    userRole() {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const roles = {
        'STUDENT': 'Öğrenci',
        'STAFF': 'Personel',
        'ADMIN': 'Yönetici'
      }
      return roles[user.role] || 'Kullanıcı'
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    handleLogout() {
      this.logout()
      this.$router.push('/login')
      this.isDropdownOpen = false
    }
  },
  mounted() {
    // Dropdown dışına tıklandığında kapat
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isDropdownOpen = false
      }
    })
  },
  beforeUnmount() {
    // Event listener'ı temizle
    document.removeEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isDropdownOpen = false
      }
    })
  }
}
</script>
