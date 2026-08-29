<template>
  <div
    class="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100"
  >
    <!-- Nav -->
    <Nav class="shrink-0" />

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden flex flex-col">
      <!-- Dashboard Header -->
      <header class="bg-white border-b border-slate-200 shadow-sm">
        <div
          class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
        >
          <!-- Farm Monitor on the Left -->
          <div
            class="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start"
          >
            <div
              class="bg-emerald-500 text-white p-3 rounded-xl shadow-md flex-shrink-0 relative overflow-hidden"
            >
              <i class="fas fa-chart-line text-xl relative z-10"></i>
              <div
                class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
              ></div>
            </div>
            <div class="text-center sm:text-left">
              <h1 class="text-lg font-semibold text-slate-800">Farm Monitor</h1>
              <p class="text-sm text-slate-500">Real-time system overview</p>
            </div>
          </div>

          <!-- Live Data on the Right -->
          <div
            class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg shadow-sm border border-emerald-100 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end relative overflow-hidden group"
          >
            <div
              class="absolute inset-0 bg-emerald-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            ></div>
            <i class="fas fa-signal relative z-10"></i>
            <span class="font-medium relative z-10">Live Data</span>
            <span class="flex h-2 w-2 relative z-10">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
              ></span>
            </span>
          </div>
        </div>
      </header>

      <!-- Main Dashboard Content -->
      <div class="flex-1 overflow-auto bg-slate-50 bg-pattern">
        <div class="container mx-auto p-4 sm:p-6">
          <!-- Status Overview Row -->
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
              <div class="bg-emerald-100 p-2 rounded-lg mr-3">
                <i class="fas fa-tachometer-alt text-emerald-500 text-xl"></i>
              </div>
              <h2 class="text-xl font-bold text-slate-800">System Status</h2>
            </div>

            <!-- Sensor Count Indicator -->
            <div
              class="text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center"
            >
              <i class="fas fa-wheat-awn text-amber-500 mr-2"></i>
              <span v-if="Object.keys(feedQuantity).length > 0">
                {{ Object.keys(feedQuantity).length }} Feed Sensors
              </span>
              <span v-else>No Feed Sensors</span>
            </div>
          </div>

          <!-- Water and Feed Section - Smart Responsive Grid -->
          <div
            :class="[
              'status-grid mb-10',
              { 'many-sensors': Object.keys(feedQuantity).length > 6 },
            ]"
          >
            <!-- Water Level -->
            <div
              class="status-card bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <div
                class="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              ></div>
              <div class="flex items-center justify-between mb-5 relative z-10">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md relative overflow-hidden"
                  >
                    <i class="fa-solid fa-droplet text-xl"></i>
                    <div
                      class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
                    ></div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-slate-800">
                      Water Level
                    </h3>
                    <p class="text-xs text-slate-500">Main reservoir</p>
                  </div>
                </div>
                <span
                  class="px-3 py-1.5 rounded-full text-sm font-medium shadow-sm flex items-center gap-1.5"
                  :class="getStatusClass(waterQuantity)"
                >
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="getStatusDotClass(waterQuantity)"
                  ></span>
                  {{ getStatusText(waterQuantity) }}
                </span>
              </div>
              <div class="flex items-baseline gap-2 mb-4 relative z-10">
                <span class="text-4xl font-bold text-slate-800"
                  >{{ waterQuantity }}%</span
                >
                <span class="text-sm text-slate-500">
                  ({{ Math.round((waterQuantity / 100) * 60) }}L / 60L)
                </span>
              </div>
              <div
                class="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner relative z-10"
              >
                <div
                  class="h-4 rounded-full transition-all duration-700 relative"
                  :class="getProgressColorClass(waterQuantity)"
                  :style="{ width: `${waterQuantity}%` }"
                >
                  <div
                    class="absolute inset-0 bg-white opacity-30 w-20 h-full transform -skew-x-30 animate-shimmer"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Feed Zones - Dynamic -->
            <div
              v-for="(zone, index) in feedQuantity"
              :key="`feed-${index}`"
              class="status-card bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <div
                class="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              ></div>
              <div class="flex items-center justify-between mb-5 relative z-10">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md relative overflow-hidden"
                  >
                    <i class="fa-solid fa-wheat-awn text-xl"></i>
                    <div
                      class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
                    ></div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-slate-800 truncate">
                      {{ zone.name }}
                    </h3>
                    <p class="text-xs text-slate-500">Feed storage</p>
                  </div>
                </div>

                <span
                  class="px-3 py-1.5 rounded-full text-sm font-medium shadow-sm flex items-center gap-1.5"
                  :class="getStatusClass(zone.quantity)"
                >
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="getStatusDotClass(zone.quantity)"
                  ></span>
                  {{ getStatusText(zone.quantity) }}
                </span>
              </div>

              <div class="flex items-baseline gap-2 mb-4 relative z-10">
                <span class="text-4xl font-bold text-slate-800">
                  {{ zone.quantity }}%
                </span>
                <span class="text-sm text-slate-500">
                  ({{ Math.round(zone.quantity * 5) }}kg / 500kg)
                </span>
              </div>

              <div
                class="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner relative z-10"
              >
                <div
                  class="h-4 rounded-full transition-all duration-700 relative"
                  :class="getProgressColorClass(zone.quantity)"
                  :style="{ width: `${zone.quantity}%` }"
                >
                  <div
                    class="absolute inset-0 bg-white opacity-30 w-20 h-full transform -skew-x-30 animate-shimmer"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Environmental Monitoring -->
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
              <div class="bg-orange-100 p-2 rounded-lg mr-3">
                <i class="fas fa-cloud-sun text-orange-500 text-xl"></i>
              </div>
              <h2 class="text-xl font-bold text-slate-800">
                Environmental Monitoring
              </h2>
            </div>

            <!-- Sensor Count Indicators -->
            <div class="flex gap-2">
              <div
                class="text-sm bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center"
              >
                <i class="fas fa-thermometer-half text-red-500 mr-2"></i>
                <span
                  v-if="Object.keys(temperatures).length > 0"
                  class="text-slate-600"
                >
                  {{ Object.keys(temperatures).length }}
                  <span class="text-slate-500">Temp</span>
                </span>
                <span v-else class="text-slate-500">No Temp</span>
              </div>
              <div
                class="text-sm bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center"
              >
                <i class="fas fa-tint text-blue-500 mr-2"></i>
                <span
                  v-if="Object.keys(humidities).length > 0"
                  class="text-slate-600"
                >
                  {{ Object.keys(humidities).length }}
                  <span class="text-slate-500">Humidity</span>
                </span>
                <span v-else class="text-slate-500">No Humidity</span>
              </div>
            </div>
          </div>

          <!-- Temperature and Humidity Section - Smart Grid with Scrolling for Many Sensors -->
          <div
            :class="[
              'environmental-container mb-10',
              { 'has-many-sensors': environmentalSensorCount > 12 },
            ]"
          >
            <div
              :class="[
                'environmental-grid',
                { 'many-sensors': environmentalSensorCount > 12 },
              ]"
            >
              <!-- Dynamic Temperature Cards -->
              <div
                v-for="(sensor, index) in temperatures"
                :key="`temp-${index}`"
                class="environmental-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 group"
              >
                <div
                  class="bg-gradient-to-r from-red-500 to-orange-400 px-3 sm:px-4 py-2 sm:py-3 text-white relative overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  ></div>
                  <div class="flex items-center gap-2 relative z-10">
                    <i
                      class="fas fa-thermometer-half text-sm sm:text-base lg:text-lg flex-shrink-0"
                    ></i>
                    <h3
                      class="font-semibold text-xs sm:text-sm lg:text-base leading-tight"
                    >
                      <span class="block sm:hidden">Temp {{ index + 1 }}</span>
                      <span class="hidden sm:block lg:hidden"
                        >Temp Sensor {{ index + 1 }}</span
                      >
                      <span class="hidden lg:block">{{ sensor.name }}</span>
                    </h3>
                  </div>
                </div>

                <div
                  class="p-3 sm:p-4 lg:p-5 flex flex-col justify-between h-full"
                >
                  <div class="flex items-end justify-center gap-1 mt-1 sm:mt-2">
                    <p
                      class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800"
                    >
                      {{ sensor.value }}
                    </p>
                    <p
                      class="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-1 lg:mb-2"
                    >
                      °C
                    </p>
                  </div>

                  <div class="mt-3 sm:mt-4 flex justify-center">
                    <div
                      class="px-2 sm:px-3 py-1 sm:py-2 bg-red-50 text-red-700 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1"
                    >
                      <i class="fas fa-fire-alt flex-shrink-0"></i>
                      <span class="hidden sm:inline">Temperature</span>
                      <span class="sm:hidden">Temp</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Dynamic Humidity Cards -->
              <div
                v-for="(sensor, index) in humidities"
                :key="`hum-${index}`"
                class="environmental-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 group"
              >
                <div
                  class="bg-gradient-to-r from-blue-500 to-cyan-400 px-3 sm:px-4 py-2 sm:py-3 text-white relative overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  ></div>
                  <div class="flex items-center gap-2 relative z-10">
                    <i
                      class="fas fa-tint text-sm sm:text-base lg:text-lg flex-shrink-0"
                    ></i>
                    <h3
                      class="font-semibold text-xs sm:text-sm lg:text-base leading-tight"
                    >
                      <span class="block sm:hidden">Hum {{ index + 1 }}</span>
                      <span class="hidden sm:block lg:hidden"
                        >Humidity {{ index + 1 }}</span
                      >
                      <span class="hidden lg:block">{{ sensor.name }}</span>
                    </h3>
                  </div>
                </div>

                <div
                  class="p-3 sm:p-4 lg:p-5 flex flex-col justify-between h-full"
                >
                  <div class="flex items-end justify-center gap-1 mt-1 sm:mt-2">
                    <p
                      class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800"
                    >
                      {{ sensor.value }}
                    </p>
                    <p
                      class="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-1 lg:mb-2"
                    >
                      %
                    </p>
                  </div>

                  <div class="mt-3 sm:mt-4 flex justify-center">
                    <div
                      class="px-2 sm:px-3 py-1 sm:py-2 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1"
                    >
                      <i class="fas fa-smog flex-shrink-0"></i>
                      <span class="hidden sm:inline">Humidity</span>
                      <span class="sm:hidden">Hum</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scroll Indicator for Many Sensors -->
            <div
              v-if="environmentalSensorCount > 12"
              class="scroll-indicator flex justify-center mt-4"
            >
              <div
                class="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 text-sm text-slate-500 flex items-center gap-2"
              >
                <i class="fas fa-arrows-left-right"></i>
                <span
                  >Scroll to see all
                  {{ environmentalSensorCount }} sensors</span
                >
              </div>
            </div>
          </div>

          <!-- Air Quality -->
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
              <div class="bg-green-100 p-2 rounded-lg mr-3">
                <i class="fas fa-wind text-green-500 text-xl"></i>
              </div>
              <h2 class="text-xl font-bold text-slate-800">Air Quality</h2>
            </div>

            <!-- Air Quality Sensor Count -->
            <div
              class="text-sm bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100 flex items-center"
            >
              <i class="fas fa-sensor text-green-500 mr-2"></i>
              <span
                v-if="Object.keys(airQuality).length > 0"
                class="text-slate-600"
              >
                {{ Object.keys(airQuality).length }}
                <span class="text-slate-500">Air Sensors</span>
              </span>
              <span v-else class="text-slate-500">No Air Sensors</span>
            </div>
          </div>

          <!-- Air Quality Section - Smart Grid -->
          <div
            :class="[
              'air-quality-grid mb-8',
              { 'many-sensors': airQuality.length > 6 },
            ]"
          >
            <!-- Dynamic Air Quality Cards -->
            <div
              v-for="(sensor, index) in airQuality"
              :key="`air-${index}`"
              class="air-quality-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 group"
            >
              <div
                class="bg-gradient-to-r from-green-500 to-emerald-400 px-4 py-3 text-white flex justify-between items-center relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                ></div>
                <div class="flex items-center gap-2 relative z-10">
                  <i class="fas fa-sensor text-lg"></i>
                  <h3 class="font-semibold text-sm lg:text-base truncate">
                    {{ sensor.name }}
                  </h3>
                </div>
                <div
                  class="px-2 py-1 rounded-full bg-white text-green-800 text-xs font-medium shadow-sm relative z-10"
                ></div>
              </div>

              <div class="p-5 lg:p-6 flex flex-col h-full">
                <div class="flex items-end justify-center gap-2 mb-6">
                  <p class="text-4xl lg:text-5xl font-bold text-slate-800">
                    {{ sensor.value }}
                  </p>
                  <p
                    class="text-lg lg:text-2xl text-slate-600 mb-1 lg:mb-2"
                  ></p>
                </div>

                <div
                  class="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner mb-3 mt-auto"
                >
                  <div
                    class="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full transition-all duration-700 relative"
                    :style="{
                      width: `${Math.min((sensor.value / 2000) * 100, 100)}%`,
                    }"
                  >
                    <div
                      class="absolute inset-0 bg-white opacity-30 w-20 h-full transform -skew-x-30 animate-shimmer"
                    ></div>
                  </div>
                </div>

                <div
                  class="flex justify-between text-sm text-slate-500 px-1 mt-1"
                >
                  <span>0</span>
                  <span>1000</span>
                  <span>2000</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Empty State for No Sensors -->
          <div
            v-if="!hasAnySensors"
            class="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-100 mt-8"
          >
            <div
              class="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="fas fa-sensor text-5xl text-slate-300"></i>
            </div>
            <h3 class="text-2xl font-semibold text-slate-600 mb-2">
              No Sensors Connected
            </h3>
            <p class="text-slate-500 max-w-md mx-auto">
              Waiting for sensor data. Please check your connection or add
              sensors to your system.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Nav from "@/components/templates/Nav.vue";
import { ref, onMounted, computed } from "vue";
import sensorsServices from "@/services/sensorsServices";
import feedingServices from "@/services/feedingServices.js";

const waterQuantity = ref(0);
const feedQuantity = ref({});
const temperatures = ref({});
const humidities = ref({});
const airQuality = ref({});

// Computed property to check if any sensors are available
const hasAnySensors = computed(() => {
  return (
    waterQuantity.value > 0 ||
    Object.keys(feedQuantity.value).length > 0 ||
    Object.keys(temperatures.value).length > 0 ||
    Object.keys(humidities.value).length > 0 ||
    Object.keys(airQuality.value).length > 0
  );
});

// Computed property to count total environmental sensors
const environmentalSensorCount = computed(() => {
  return (
    Object.keys(temperatures.value).length +
    Object.keys(humidities.value).length
  );
});

// Status logic
const getStatusText = (value) => {
  if (value >= 60) return "Good";
  if (value >= 30) return "Warning";
  return "Low";
};

const getStatusClass = (value) => {
  if (value >= 60) return "bg-green-100 text-green-800";
  if (value >= 30) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const getStatusDotClass = (value) => {
  if (value >= 60) return "bg-green-500";
  if (value >= 30) return "bg-yellow-500";
  return "bg-red-500";
};

const getProgressColorClass = (value) => {
  if (value >= 60) return "bg-gradient-to-r from-green-400 to-emerald-500";
  if (value >= 30) return "bg-gradient-to-r from-yellow-400 to-amber-500";
  return "bg-gradient-to-r from-red-400 to-rose-500";
};

onMounted(async () => {
  try {
    // Initial fetch
    waterQuantity.value = await sensorsServices.getWaterQuantity();

    // Feeding
    const feedRaw = await feedingServices.getFeeding();
    feedQuantity.value = Object.entries(feedRaw)
      .map(([key, value]) => {
        const zoneNum = key.replace(/\D/g, "");
        return {
          name: `Feed Zone ${zoneNum}`,
          quantity: value,
          order: parseInt(zoneNum),
        };
      })
      .sort((a, b) => a.order - b.order)
      .map(({ order, ...zone }) => zone);

    // Temperature
    const tempRaw = await sensorsServices.getTemperatures();
    temperatures.value = Object.entries(tempRaw)
      .map(([key, value]) => {
        const num = key.replace(/\D/g, "");
        return {
          name: `Temperature Sensor ${num}`,
          value,
          order: parseInt(num),
        };
      })
      .sort((a, b) => a.order - b.order)
      .map(({ order, ...item }) => item);

    // Humidity
    const humRaw = await sensorsServices.getHumidity();
    humidities.value = Object.entries(humRaw)
      .map(([key, value]) => {
        const num = key.replace(/\D/g, "");
        return {
          name: `Humidity Sensor ${num}`,
          value,
          order: parseInt(num),
        };
      })
      .sort((a, b) => a.order - b.order)
      .map(({ order, ...item }) => item);

    // Air Quality
    const airRaw = await sensorsServices.getAirQuality();
    airQuality.value = Object.entries(airRaw)
      .map(([key, value]) => {
        const num = key.replace(/\D/g, "");
        return {
          name: `Air Quality Sensor ${num}`,
          value,
          order: parseInt(num),
        };
      })
      .sort((a, b) => a.order - b.order)
      .map(({ order, ...item }) => item);

    sensorsServices.listenForWaterQuantity((newVal) => {
      if (newVal !== undefined && newVal !== null) {
        waterQuantity.value = newVal;
      }
    });

    sensorsServices.listenForTemperatures((newVal) => {
      if (newVal) {
        temperatures.value = Object.entries(newVal)
          .map(([key, value]) => {
            const num = key.replace(/\D/g, "");
            return {
              name: `Sensor ${num}`,
              value,
              order: parseInt(num),
            };
          })
          .sort((a, b) => a.order - b.order)
          .map(({ order, ...item }) => item);
      }
    });

    sensorsServices.listenForHumidity((newVal) => {
      if (newVal) {
        humidities.value = Object.entries(newVal)
          .map(([key, value]) => {
            const num = key.replace(/\D/g, "");
            return {
              name: `Sensor ${num}`,
              value,
              order: parseInt(num),
            };
          })
          .sort((a, b) => a.order - b.order)
          .map(({ order, ...item }) => item);
      }
    });

    sensorsServices.listenForAirQuality((newVal) => {
      if (newVal && typeof newVal === "object") {
        airQuality.value = Object.entries(newVal)
          .map(([key, value]) => {
            const num = key.replace(/\D/g, "");
            return {
              name: `Air Quality Sensor ${num}`,
              value,
              order: parseInt(num),
            };
          })
          .sort((a, b) => a.order - b.order)
          .map(({ order, ...item }) => item);
      }
    });
  } catch (error) {
    console.error("Error initializing dashboard:", error);
    // Prevent rendering issues
    feedQuantity.value = [];
    temperatures.value = [];
    humidities.value = [];
    airQuality.value = [];
  }
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-30deg);
  }
  100% {
    transform: translateX(200%) skewX(-30deg);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Background pattern */
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Smart Responsive Grid for Status Cards (Water + Feed) */
.status-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Adjust grid for many feed sensors */
.status-grid.many-sensors {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

@media (min-width: 640px) {
  .status-grid {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .status-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

@media (min-width: 1024px) {
  .status-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .status-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (min-width: 1280px) {
  .status-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .status-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

@media (min-width: 1536px) {
  .status-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

/* Environmental Container for Horizontal Scrolling with Many Sensors */
.environmental-container {
  width: 100%;
}

.environmental-container.has-many-sensors {
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.5) transparent;
}

.environmental-container.has-many-sensors::-webkit-scrollbar {
  height: 6px;
}

.environmental-container.has-many-sensors::-webkit-scrollbar-track {
  background: transparent;
}

.environmental-container.has-many-sensors::-webkit-scrollbar-thumb {
  background-color: rgba(203, 213, 225, 0.5);
  border-radius: 20px;
}

/* Smart Responsive Grid for Environmental Cards */
.environmental-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

/* For many sensors, use fixed width cards with horizontal scrolling */
.environmental-grid.many-sensors {
  display: grid;
  grid-template-columns: repeat(12, minmax(160px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: minmax(160px, 1fr);
  width: max-content;
}

@media (min-width: 640px) {
  .environmental-grid {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .environmental-grid.many-sensors {
    gap: 1.5rem;
    grid-template-columns: repeat(12, minmax(180px, 1fr));
    grid-auto-columns: minmax(180px, 1fr);
  }
}

@media (min-width: 768px) {
  .environmental-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

@media (min-width: 1024px) {
  .environmental-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (min-width: 1280px) {
  .environmental-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (min-width: 1536px) {
  .environmental-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}

/* Smart Responsive Grid for Air Quality Cards */
.air-quality-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Adjust grid for many air quality sensors */
.air-quality-grid.many-sensors {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

@media (min-width: 640px) {
  .air-quality-grid {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .air-quality-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

@media (min-width: 1024px) {
  .air-quality-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .air-quality-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (min-width: 1280px) {
  .air-quality-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .air-quality-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

/* Card height consistency */
.status-card,
.environmental-card,
.air-quality-card {
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.environmental-card {
  min-height: 180px;
}

/* Truncate long text */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* Scroll indicator styling */
.scroll-indicator {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Responsive text scaling */
@media (max-width: 640px) {
  .status-card h3,
  .environmental-card h3,
  .air-quality-card h3 {
    font-size: 0.875rem;
  }
}

/* Better spacing for mobile */
@media (max-width: 640px) {
  .status-grid,
  .environmental-grid,
  .air-quality-grid {
    gap: 0.75rem;
  }
}

/* Ensure cards maintain good proportions */
.bg-white {
  transition: all 0.3s ease;
}

/* Progress bar improvements */
.rounded-full {
  transition: width 1s ease-in-out;
}

/* Handle very large numbers of sensors */
@media (min-width: 1920px) {
  .status-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .air-quality-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

/* Ultra-wide screen support */
@media (min-width: 2560px) {
  .status-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  .air-quality-grid.many-sensors {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

/* Improved responsive text for environmental cards */
.environmental-grid.many-sensors .environmental-card h3 {
  font-size: 0.75rem;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .environmental-grid.many-sensors .environmental-card h3 {
    font-size: 0.875rem;
  }
}

@media (min-width: 1024px) {
  .environmental-grid.many-sensors .environmental-card h3 {
    font-size: 0.875rem;
  }
}

/* Ensure icons don't shrink */
.environmental-card i {
  flex-shrink: 0;
}

/* Better text wrapping for small cards */
.environmental-card h3 {
  word-break: break-word;
  hyphens: auto;
}
</style>
