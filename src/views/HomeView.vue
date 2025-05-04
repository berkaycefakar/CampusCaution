<template>
  <div class="flex w-full">
    <!-- Sol taraf - Sorun listesi -->
    <div 
      v-show="!menuOpen" 
      class="w-1/3 bg-white shadow-lg min-h-[calc(100vh-64px)] overflow-y-auto border-r transition-all duration-300 ease-in-out"
    >
      <div class="sticky top-0 bg-white z-10 p-4 border-b">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">{{$t('issues')}}</h2>
          <button @click="toggleMenu" class="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery"
            :placeholder="$t('searchPlaceholder')"
            class="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button @click="sortIssues" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg">{{$t('sortByUrgency')}}</button>
      </div>
      <div class="divide-y">
        <div
          v-for="issue in sortedIssues"
          :key="issue.id"
          @click="selectIssue(issue)"
          class="p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 relative"
          :class="{
            'bg-blue-50 border-l-4 border-blue-500': selectedIssue?.id === issue.id,
            'bg-green-50 opacity-75': issue.status === 'Çözüldü'
          }"
        >
          <!-- Çözüldü İşareti -->
          <div v-if="issue.status === 'Çözüldü'" class="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div class="flex justify-between items-start">
            <h3 class="font-semibold text-gray-800" :class="{'line-through': issue.status === 'Çözüldü'}">{{ issue.title }}</h3>
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
          <p class="text-sm text-gray-600 mt-1 line-clamp-2" :class="{'line-through': issue.status === 'Çözüldü'}">{{ issue.description }}</p>
          <div class="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span class="flex items-center space-x-1">
              <span class="w-2 h-2 rounded-full" :class="{
                'bg-red-500': issue.status === 'Açık',
                'bg-yellow-500': issue.status === 'İncelemede',
                'bg-green-500': issue.status === 'Çözüldü'
              }"></span>
              <span :class="{'text-green-600 font-medium': issue.status === 'Çözüldü'}">{{ issue.status }}</span>
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
      :style="menuOpen ? 'min-height: calc(100vh - 64px); width: 100vw; left: 0; right: 0; position: fixed; z-index: 40;' : 'min-height: calc(100vh - 64px);'"
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
      <MapView ref="mapView" />
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
                  'bg-red-500': selectedIssue.status === 'Açık',
                  'bg-yellow-500': selectedIssue.status === 'İncelemede',
                  'bg-green-500': selectedIssue.status === 'Çözüldü'
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
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{$t('description')}}</h3>
              <p class="text-gray-700">{{ selectedIssue.description }}</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{$t('location')}}</h3>
              <p class="text-gray-700">
                {{$t('latitude')}}: {{ selectedIssue.location[0] }}<br>
                {{$t('longitude')}}: {{ selectedIssue.location[1] }}
              </p>
            </div>

            <div class="flex space-x-4">
              <button @click="updateStatus('Çözüldü')" class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                {{$t('markResolved')}}
              </button>
              <button @click="updateStatus('İncelemede')" class="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-200">
                {{$t('markInProgress')}}
              </button>
              <button @click="deleteIssue" class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200">
                {{$t('deleteIssue')}}
              </button>
            </div>
          </div>

          <!-- Durum Aşamaları -->
          <div class="mt-4 flex items-center justify-between w-full bg-gray-100 rounded-lg p-4">
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="{
                'bg-red-500 text-white': selectedIssue.status === 'Açık',
                'bg-gray-300 text-gray-600': selectedIssue.status !== 'Açık'
              }">
                <span class="text-sm">1</span>
              </div>
              <span class="text-xs mt-1">{{$t('open')}}</span>
            </div>
            <!-- Açık -> İncelemede arası -->
            <div class="h-1 flex-1 mx-2 bg-gray-300 relative overflow-hidden">
              <div
                v-if="selectedIssue.status === 'İncelemede' || selectedIssue.status === 'Çözüldü'"
                class="h-full bg-blue-500 absolute left-0 top-0"
                style="width: 100%;"
              ></div>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="{
                'bg-yellow-500 text-white': selectedIssue.status === 'İncelemede',
                'bg-gray-300 text-gray-600': selectedIssue.status !== 'İncelemede'
              }">
                <span class="text-sm">2</span>
              </div>
              <span class="text-xs mt-1">{{$t('inProgress')}}</span>
            </div>
            <!-- İncelemede -> Çözüldü arası -->
            <div class="h-1 flex-1 mx-2 bg-gray-300 relative overflow-hidden">
              <div
                v-if="selectedIssue.status === 'Çözüldü'"
                class="h-full bg-blue-500 absolute left-0 top-0"
                style="width: 100%;"
              ></div>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="{
                'bg-green-500 text-white': selectedIssue.status === 'Çözüldü',
                'bg-gray-300 text-gray-600': selectedIssue.status !== 'Çözüldü'
              }">
                <span class="text-sm">3</span>
              </div>
              <span class="text-xs mt-1">{{$t('resolved')}}</span>
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
      menuOpen: false,
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      issues: 'getIssues',
      selectedIssue: 'getSelectedIssue'
    }),
    filteredIssues() {
      if (!this.searchQuery) return this.issues;
      const q = this.searchQuery.toLowerCase();
      return this.issues.filter(issue =>
        issue.title.toLowerCase().includes(q) ||
        issue.description.toLowerCase().includes(q)
      );
    },
    sortedIssues() {
      // Çözüldü olanlar en sonda
      const unresolved = this.filteredIssues.filter(i => i.status !== 'Çözüldü');
      const resolved = this.filteredIssues.filter(i => i.status === 'Çözüldü');
      const priorityOrder = { 'Acil': 1, 'Yüksek': 2, 'Orta': 3 };
      unresolved.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      return [...unresolved, ...resolved];
    },
    statusProgress() {
      const statusMap = {
        'Açık': 0,
        'İncelemede': 50,
        'Çözüldü': 100
      }
      return statusMap[this.selectedIssue?.status] || 0
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
      if (confirm(`Bu sorunu "${status}" durumuna güncellemek istediğinizden emin misiniz?`)) {
        this.updateIssueStatus({ id: this.selectedIssue.id, status });
        this.closeModal();
      }
    },
    deleteIssue() {
      if (confirm('Bu sorunu silmek istediğinizden emin misiniz?')) {
        this.deleteIssue(this.selectedIssue.id);
        this.closeModal();
      }
    }
  },
  watch: {
    menuOpen() {
      this.$nextTick(() => {
        if (this.$refs.mapView && this.$refs.mapView.$refs.map && this.$refs.mapView.$refs.map.leafletObject) {
          this.$refs.mapView.$refs.map.leafletObject.invalidateSize();
        }
      });
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
