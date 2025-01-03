<template>
  <div class="h-[calc(100vh-64px)]">
    <l-map 
      ref="map" 
      v-model:zoom="zoom" 
      :center="center" 
      :options="mapOptions"
      @ready="onMapReady"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        attribution="Harita verileri &copy; OpenStreetMap katkıda bulunanlar"
      ></l-tile-layer>
      <!-- Kampüs sınırları -->
      <l-polygon :lat-lngs="campusBoundary" :options="boundaryOptions" />
      <!-- Maske için dünya sınırları -->
      <l-polygon :lat-lngs="maskBoundary" :options="maskOptions" />
      <!-- Sorun işaretleri -->
      <l-marker
        v-for="issue in issues"
        :key="issue.id"
        :lat-lng="issue.location"
        @click="selectIssue(issue)"
      >
        <l-icon
          :icon-url="getMarkerIcon(issue.priority)"
          :icon-size="[25, 41]"
          :icon-anchor="[12, 41]"
        />
        <l-popup>
          <div class="p-2">
            <h3 class="font-bold">{{ issue.title }}</h3>
            <p class="text-sm">{{ issue.description }}</p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LMap, LTileLayer, LPolygon, LMarker, LPopup, LIcon } from '@vue-leaflet/vue-leaflet'
import "leaflet/dist/leaflet.css"

export default {
  name: 'MapView',
  components: {
    LMap,
    LTileLayer,
    LPolygon,
    LMarker,
    LPopup,
    LIcon
  },
  computed: {
    ...mapGetters({
      issues: 'getIssues',
      selectedIssue: 'getSelectedIssue'
    })
  },
  data() {
    return {
      center: [36.89310, 30.65192],
      zoom: 14,
     campusBoundary: [
  [36.8900926, 30.6392717],
  [36.8884022, 30.6402588],
  [36.8876642, 30.6404412],
  [36.8876041, 30.6417286],
  [36.8882563, 30.6464386],
  [36.8882906, 30.6482625],
  [36.888548, 30.6501615],
  [36.8883249, 30.6545281],
  [36.8881834, 30.6553918],
  [36.8881147, 30.6568456],
  [36.8859008, 30.6613517],
  [36.88645, 30.6626177],
  [36.8969527, 30.6651711],
  [36.8996296, 30.6652999],
  [36.900865, 30.6633687],
  [36.9000757, 30.6559014],
  [36.9012082, 30.6461167],
  [36.8998226, 30.6341863],
  [36.8995995, 30.6339932],
  [36.8943486, 30.6370401],
  [36.8900926, 30.6392717] // Kapatmak için ilk noktaya dönüş
],
      maskBoundary: [
        [[90, -180], [90, 180], [-90, 180], [-90, -180]],
        [
         [36.8900926, 30.6392717],
  [36.8884022, 30.6402588],
  [36.8876642, 30.6404412],
  [36.8876041, 30.6417286],
  [36.8882563, 30.6464386],
  [36.8882906, 30.6482625],
  [36.888548, 30.6501615],
  [36.8883249, 30.6545281],
  [36.8881834, 30.6553918],
  [36.8881147, 30.6568456],
  [36.8859008, 30.6613517],
  [36.88645, 30.6626177],
  [36.8969527, 30.6651711],
  [36.8996296, 30.6652999],
  [36.900865, 30.6633687],
  [36.9000757, 30.6559014],
  [36.9012082, 30.6461167],
  [36.8998226, 30.6341863],
  [36.8995995, 30.6339932],
  [36.8943486, 30.6370401],
  [36.8900926, 30.6392717]
        ]
      ],
      mapOptions: {
        zoomControl: true,
        maxBounds: [
          [36.87, 30.62],
          [36.91, 30.68]
        ],
        maxBoundsViscosity: 1.0,
        minZoom: 13,
        maxZoom: 18
      },
      boundaryOptions: {
        color: "#2563eb",
        weight: 2,
        fillOpacity: 0
      },
      maskOptions: {
        color: 'black',
        fillColor: 'black',
        fillOpacity: 0.5,
        stroke: false
      }
    }
  },
  methods: {
    ...mapActions(['selectIssue']),
    onMapReady(mapObject) {
      mapObject.setMaxBounds(this.mapOptions.maxBounds);
      mapObject.fitBounds(this.campusBoundary);
    },
    getMarkerIcon(priority) {
      // Önceliğe göre farklı renkli marker ikonları
      const colors = {
        'Acil': 'red',
        'Yüksek': 'orange',
        'Orta': 'blue'
      };
      return `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${colors[priority] || 'blue'}.png`;
    }
  }
}
</script>

<style>
.leaflet-container {
  height: 100%;
  width: 100%;
  z-index: 1; /* Haritanın z-index değerini düşük tutuyoruz */
}

.leaflet-control-container {
  z-index: 1; /* Harita kontrollerinin z-index değerini de düşük tutuyoruz */
}
</style>