<template>
  <nav class="bg-blue-600 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Başlık -->
        <div class="flex items-center space-x-3">
          <img src="@/assets/akdeniz.png" alt="Akdeniz Üniversitesi Logo" class="h-12 w-auto" />
          <span class="text-white text-xl font-bold">{{ $t('appTitle') }}</span>
        </div>

        <!-- Sağ kısım -->
        <div class="flex items-center space-x-4">

          <!-- Dil Seçici -->
          <div class="relative">
            <button
              @click="toggleLangDropdown"
              class="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none border-2 border-transparent hover:border-blue-300 hover:shadow-lg hover:scale-110 bg-white bg-opacity-30"
            >
              <!-- CDN'den dinamik bayrak -->
              <img
                :src="flags[currentLocale]"
                alt="Dil Bayrağı"
                class="w-7 h-7 rounded-full object-cover"
              />
            </button>
            <transition name="fade">
              <div
                v-if="isLangDropdownOpen"
                class="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-2xl py-2 flex flex-col border border-gray-200 z-50"
              >
                <button
                  @click="setLang('tr')"
                  class="flex items-center px-3 py-2 hover:bg-gray-100 transition-all"
                >
                  <img
                    :src="flags.tr"
                    alt="Türkçe"
                    class="w-6 h-6 rounded-full mr-2"
                  />
                  <span :class="{ 'font-bold text-blue-600': currentLocale === 'tr' }">
                    Türkçe
                  </span>
                </button>
                <button
                  @click="setLang('en')"
                  class="flex items-center px-3 py-2 hover:bg-gray-100 transition-all"
                >
                  <img
                    :src="flags.en"
                    alt="English"
                    class="w-6 h-6 rounded-full mr-2"
                  />
                  <span :class="{ 'font-bold text-blue-600': currentLocale === 'en' }">
                    English
                  </span>
                </button>
              </div>
            </transition>
          </div>

          
          <!-- Bildirim İkonu -->
          <div class="relative">
            <button @click="toggleNotifDropdown" class="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <transition name="fade">
              <div v-if="isNotifDropdownOpen" class="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl py-2 flex flex-col border border-gray-200 z-50">
                <div v-if="latestIssues.length === 0" class="px-4 py-3 text-gray-500 text-sm text-center">Hiç sorun yok.</div>
                <button v-for="issue in latestIssues" :key="issue.id" @click="goToIssue(issue)" class="flex flex-col items-start px-4 py-2 hover:bg-blue-50 transition-all text-left border-b last:border-b-0">
                  <span class="font-semibold text-gray-800 truncate w-full">{{ issue.title }}</span>
                  <span class="text-xs mt-1" :class="{
                    'text-green-600': issue.status === 'Çözüldü',
                    'text-yellow-600': issue.status === 'İncelemede',
                    'text-red-600': issue.status === 'Açık'
                  }">{{ issue.status }}</span>
                  <span class="text-xs text-gray-400 mt-0.5">{{ issue.createdAt }}</span>
                </button>
              </div>
            </transition>
          </div>

          <!-- Kullanıcı Menüsü -->
          <div class="relative">
            <button @click="toggleUserDropdown" class="flex items-center space-x-2 focus:outline-none">
              <div class="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white font-bold">
                {{ userInitials }}
              </div>
              <div class="text-white text-left">
                <p class="text-sm font-medium">{{ user.name }}</p>
                <p class="text-xs opacity-80">{{ user.department }}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                :class="{ 'transform rotate-180': isUserDropdownOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition name="fade">
              <div v-if="isUserDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <!-- Logout ikonu aynı kalabilir -->
                  {{ $t('logout') }}
                </button>
              </div>
            </transition>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TopNavbar',
  data() {
    return {
      isLangDropdownOpen: false,
      isUserDropdownOpen: false,
      isNotifDropdownOpen: false,
      flags: {
        tr: 'https://flagcdn.com/tr.svg',
        en: 'https://flagcdn.com/gb.svg'
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      issues: state => state.issues
    }),
    userInitials() {
      return this.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    },
    currentLocale() {
      return this.$i18n.locale
    },
    latestIssues() {
      return this.issues.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleLangDropdown() {
      this.isLangDropdownOpen = !this.isLangDropdownOpen
      this.isNotifDropdownOpen = false
      this.isUserDropdownOpen = false
    },
    setLang(lang) {
      this.$i18n.locale = lang
      this.isLangDropdownOpen = false
    },
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen
      this.isLangDropdownOpen = false
      this.isNotifDropdownOpen = false
    },
    handleLogout() {
      this.logout()
      this.$router.push('/login')
      this.isUserDropdownOpen = false
    },
    toggleNotifDropdown() {
      this.isNotifDropdownOpen = !this.isNotifDropdownOpen
      this.isLangDropdownOpen = false
      this.isUserDropdownOpen = false
    },
    goToIssue(issue) {
      this.$store.dispatch('selectIssue', issue)
      this.$router.push('/home')
      this.isNotifDropdownOpen = false
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isLangDropdownOpen = false
        this.isUserDropdownOpen = false
        this.isNotifDropdownOpen = false
      }
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isLangDropdownOpen = false
        this.isUserDropdownOpen = false
        this.isNotifDropdownOpen = false
      }
    })
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
