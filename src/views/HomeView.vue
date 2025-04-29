<template>
  <div class="flex w-full">
    <!-- Sol taraf - Sorun listesi -->
    <div 
      v-show="!menuOpen" 
      class="w-1/3 bg-white shadow-lg min-h-[calc(100vh-64px)] overflow-y-auto border-r transition-all duration-300 ease-in-out"
    >
      <div class="sticky top-0 bg-white z-10 p-4 border-b">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Sorunlar</h2>
          <button @click="toggleMenu" class="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div class="relative">
          <input 
            type="text" 
            placeholder="Sorun ara..."
            class="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button @click="sortIssues" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg">Acil Duruma Göre Sırala</button>
      </div>
      <div class="divide-y">
        <div
          v-for="issue in sortedIssues"
          :key="issue.id"
          @click="selectIssue(issue)"
          class="p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200"
          :class="{'bg-blue-50 border-l-4 border-blue-500': selectedIssue?.id === issue.id}"
        >
          <div class="flex justify-between items-start">
            <h3 class="font-semibold text-gray-800">{{ issue.title }}</h3>
            <span 
              class="px-2 py-1 text-xs rounded-full font-medium"
              :class="{
                'bg-red-100 text-red-800': issue.priority === 'Acil',
                'bg-yellow-100 text-yellow-800': issue.priority === 'Yüksek',
                'bg-blue-100 text-blue-800': issue.priority === 'Orta'
              }"
            >
              {{ issue.priority }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ issue.description }}</p>
          <div class="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span class="flex items-center space-x-1">
              <span class="w-2 h-2 rounded-full" :class="{
                'bg-green-500': issue.status === 'Açık',
                'bg-yellow-500': issue.status === 'İncelemede',
                'bg-blue-500': issue.status === 'Çözüldü'
              }"></span>
              <span>{{ issue.status }}</span>
            </span>
            <span>{{ issue.createdAt }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sağ taraf - Harita -->
    <div 
      class="transition-all duration-300 ease-in-out relative"
      :class="[menuOpen ? 'w-full' : 'w-2/3']"
      style="min-height: calc(100vh - 64px);"
    >
      <button 
        v-if="menuOpen" 
        @click="toggleMenu" 
        class="absolute top-4 left-4 z-10 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <MapView />
    </div>
  </div>

  <!-- Sorun Detay Modal -->
  <div v-if="selectedIssue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">{{ selectedIssue.title }}</h2>
            <div class="flex items-center space-x-2 mt-2">
              <span class="text-sm text-gray-500">{{ selectedIssue.createdAt }}</span>
              <span class="text-gray-300">•</span>
              <span class="flex items-center space-x-1">
                <span class="w-2 h-2 rounded-full" :class="{
                  'bg-green-500': selectedIssue.status === 'Açık',
                  'bg-yellow-500': selectedIssue.status === 'İncelemede',
                  'bg-blue-500': selectedIssue.status === 'Çözüldü'
                }"></span>
                <span class="text-sm text-gray-600">{{ selectedIssue.status }}</span>
              </span>
              <span class="text-gray-300">•</span>
              <span 
                class="px-2 py-1 text-xs rounded-full font-medium"
                :class="{
                  'bg-red-100 text-red-800': selectedIssue.priority === 'Acil',
                  'bg-yellow-100 text-yellow-800': selectedIssue.priority === 'Yüksek',
                  'bg-blue-100 text-blue-800': selectedIssue.priority === 'Orta'
                }"
              >
                {{ selectedIssue.priority }}
              </span>
            </div>
          </div>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Görsel -->
          <div class="rounded-lg overflow-hidden">
            <img :src="selectedIssue.image" alt="Sorun görüntüsü" class="w-full h-96 object-cover">
          </div>

          <!-- Detaylar -->
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Açıklama</h3>
              <p class="text-gray-700">{{ selectedIssue.description }}</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Konum</h3>
              <p class="text-gray-700">
                Enlem: {{ selectedIssue.location[0] }}<br>
                Boylam: {{ selectedIssue.location[1] }}
              </p>
            </div>

            <div class="flex space-x-4">
              <button @click="updateStatus('Çözüldü')" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Çözüldü Olarak İşaretle
              </button>
              <button @click="deleteIssue" class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200">
                Sorunu Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MapView from '../components/MapView.vue'

export default {
  name: 'HomeView',
  components: {
    MapView
  },
  data() {
    return {
      menuOpen: false
    }
  },
  computed: {
    ...mapGetters({
      issues: 'getIssues',
      selectedIssue: 'getSelectedIssue'
    }),
    sortedIssues() {
      return this.issues.slice().sort((a, b) => {
        const priorityOrder = { 'Acil': 1, 'Yüksek': 2, 'Orta': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }
  },
  methods: {
    ...mapActions(['selectIssue', 'updateIssueStatus', 'deleteIssue']),
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeModal() {
      this.selectIssue(null);
    },
    updateStatus(status) {
      this.updateIssueStatus({ id: this.selectedIssue.id, status });
      this.closeModal();
    },
    deleteIssue() {
      if (confirm('Bu sorunu silmek istediğinizden emin misiniz?')) {
        this.deleteIssue(this.selectedIssue.id);
        this.closeModal();
      }
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
