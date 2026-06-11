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
          class="container mx-auto px-6 py-4 flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <div class="bg-blue-500 text-white p-2 rounded-lg">
              <i class="fas fa-feather-alt text-xl"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">Real-time system overview</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Dashboard Content -->
      <div class="flex-1 overflow-auto">
        <div class="container mx-auto p-6">
          <!-- Status Overview Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Water Level -->
            <div
              class="bg-white rounded-2xl shadow-sm p-5 border border-slate-200 flex items-center"
            >
              <div
                class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4"
              >
                <i class="fa-solid fa-droplet text-blue-500 text-2xl"></i>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                  <h3 class="text-lg font-semibold text-slate-800">
                    Water Level
                  </h3>
                  <span
                    class="px-2.5 py-1 rounded-full text-sm font-medium"
                    :class="getStatusClass(waterQuantity)"
                  >
                    {{ getStatusText(waterQuantity) }}
                  </span>
                </div>
                <div class="flex items-baseline gap-1 mb-2">
                  <span class="text-3xl font-bold text-slate-800"
                    >{{ waterQuantity }}%</span
                  >
                  <span class="text-sm text-slate-500"
                    >({{ Math.round(waterQuantity * 10) }}L / 1000L)</span
                  >
                </div>
                <div
                  class="w-full bg-slate-100 rounded-full h-3 overflow-hidden"
                >
                  <div
                    class="h-3 rounded-full transition-all duration-700 relative"
                    :class="getProgressColorClass(waterQuantity)"
                    :style="{ width: `${waterQuantity}%` }"
                  >
                    <div
                      class="absolute inset-0 bg-white opacity-30 w-20 h-full transform -skew-x-30 animate-shimmer"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Feed Level -->
            <div
              class="bg-white rounded-2xl shadow-sm p-5 border border-slate-200 flex items-center"
            >
              <div
                class="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mr-4"
              >
                <i class="fa-solid fa-wheat-awn text-amber-500 text-2xl"></i>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                  <h3 class="text-lg font-semibold text-slate-800">
                    Feed Level
                  </h3>
                  <span
                    class="px-2.5 py-1 rounded-full text-sm font-medium"
                    :class="getStatusClass(feedQuantity)"
                  >
                    {{ getStatusText(feedQuantity) }}
                  </span>
                </div>
                <div class="flex items-baseline gap-1 mb-2">
                  <span class="text-3xl font-bold text-slate-800"
                    >{{ feedQuantity }}%</span
                  >
                  <span class="text-sm text-slate-500"
                    >({{ Math.round(feedQuantity * 5) }}kg / 500kg)</span
                  >
                </div>
                <div
                  class="w-full bg-slate-100 rounded-full h-3 overflow-hidden"
                >
                  <div
                    class="h-3 rounded-full transition-all duration-700 relative"
                    :class="getProgressColorClass(feedQuantity)"
                    :style="{ width: `${feedQuantity}%` }"
                  >
                    <div
                      class="absolute inset-0 bg-white opacity-30 w-20 h-full transform -skew-x-30 animate-shimmer"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stress Level
            <div
              class="bg-white rounded-2xl shadow-sm p-5 border border-slate-200 flex items-center"
            >
              <div
                class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4"
              >
                <i class="fas fa-heartbeat text-green-500 text-2xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-slate-800 mb-1">
                  Stress Level
                </h3>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-3xl font-bold text-slate-800">Normal</p>
                    <p class="text-sm text-green-600 flex items-center mt-1">
                      <i class="fas fa-check-circle mr-1"></i>
                      <span>All systems optimal</span>
                    </p>
                  </div>
                  <div
                    class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <span class="text-green-600 font-bold text-lg">OK</span>
                  </div>
                </div>
              </div>
            </div> -->
          </div>

          <!-- Environmental Monitoring -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6"
          >
            <div
              class="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-5 py-4 flex justify-between items-center"
            >
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <i class="fas fa-cloud-sun"></i>
                Environmental Monitoring
              </h2>
              <div class="flex gap-2">
                <button
                  class="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  class="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Week
                </button>
                <button
                  class="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Month
                </button>
              </div>
            </div>

            <div class="p-5 grid grid-cols-2 md:grid-cols-4 gap-5">
              <!-- Temperature Cards -->
              <div
                class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-thermometer-half text-red-500 text-xl"></i>
                    <span class="text-base font-medium text-slate-700"
                      >Temperature</span
                    >
                  </div>
                  <span
                    class="text-sm px-2.5 py-1 rounded-full bg-white text-red-600 shadow-sm"
                    >Zone 1</span
                  >
                </div>
                <div class="flex items-end gap-1 mt-2">
                  <p class="text-4xl font-bold text-slate-800">
                    {{ temperatures.temp1 }}
                  </p>
                  <p class="text-lg text-slate-600 mb-1">°C</p>
                </div>
                <div class="mt-3 flex items-center text-sm text-green-600">
                  <i class="fas fa-arrow-up mr-1"></i>
                  <span>0.5°C from yesterday</span>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-thermometer-half text-red-500 text-xl"></i>
                    <span class="text-base font-medium text-slate-700"
                      >Temperature</span
                    >
                  </div>
                  <span
                    class="text-sm px-2.5 py-1 rounded-full bg-white text-red-600 shadow-sm"
                    >Zone 2</span
                  >
                </div>
                <div class="flex items-end gap-1 mt-2">
                  <p class="text-4xl font-bold text-slate-800">
                    {{ temperatures.temp2 }}
                  </p>
                  <p class="text-lg text-slate-600 mb-1">°C</p>
                </div>
                <div class="mt-3 flex items-center text-sm text-red-600">
                  <i class="fas fa-arrow-down mr-1"></i>
                  <span>0.2°C from yesterday</span>
                </div>
              </div>

              <!-- Humidity Cards -->
              <div
                class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-tint text-blue-500 text-xl"></i>
                    <span class="text-base font-medium text-slate-700"
                      >Humidity</span
                    >
                  </div>
                  <span
                    class="text-sm px-2.5 py-1 rounded-full bg-white text-blue-600 shadow-sm"
                    >Zone 1</span
                  >
                </div>
                <div class="flex items-end gap-1 mt-2">
                  <p class="text-4xl font-bold text-slate-800">
                    {{ humidities.hum1 }}
                  </p>
                  <p class="text-lg text-slate-600 mb-1">%</p>
                </div>
                <div class="mt-3 flex items-center text-sm text-green-600">
                  <i class="fas fa-check mr-1"></i>
                  <span>Optimal range</span>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-center mb-3">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-tint text-blue-500 text-xl"></i>
                    <span class="text-base font-medium text-slate-700"
                      >Humidity</span
                    >
                  </div>
                  <span
                    class="text-sm px-2.5 py-1 rounded-full bg-white text-blue-600 shadow-sm"
                    >Zone 2</span
                  >
                </div>
                <div class="flex items-end gap-1 mt-2">
                  <p class="text-4xl font-bold text-slate-800">
                    {{ humidities.hum2 }}
                  </p>
                  <p class="text-lg text-slate-600 mb-1">%</p>
                </div>
                <div class="mt-3 flex items-center text-sm text-green-600">
                  <i class="fas fa-check mr-1"></i>
                  <span>Optimal range</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Air Quality -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div
              class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-4 flex justify-between items-center"
            >
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <i class="fas fa-wind"></i>
                Air Quality
              </h2>
              <div class="flex items-center gap-2">
                <span class="text-sm">Status:</span>
                <span
                  class="px-2.5 py-1 rounded-full bg-white text-green-800 text-sm font-medium"
                >
                  Excellent
                </span>
              </div>
            </div>

            <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Sensor 1 -->
              <div
                class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-center mb-4">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-sensor text-green-600 text-xl"></i>
                    <p class="text-lg font-medium text-slate-700">
                      Air Sensor 1
                    </p>
                  </div>
                  <div
                    class="px-2.5 py-1 rounded-full bg-white text-green-800 text-sm font-medium shadow-sm"
                  >
                    Normal
                  </div>
                </div>

                <div class="flex items-end gap-2 mb-4">
                  <p class="text-4xl font-bold text-slate-800">
                    {{ airQuality.mq135_1 }}
                  </p>
                  <p class="text-lg text-slate-500 mb-1">ppm</p>
                </div>

                <div
                  class="w-full bg-white bg-opacity-50 rounded-full h-3 mb-2"
                >
                  <div
                    class="bg-green-500 h-3 rounded-full"
                    style="width: 25%"
                  ></div>
                </div>

                <div class="flex justify-between text-sm text-slate-500">
                  <span>0</span>
                  <span>1000</span>
                  <span>2000</span>
                </div>
              </div>

              <!-- Sensor 2 -->
              <div
                class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-center mb-4">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-sensor text-green-600 text-xl"></i>
                    <p class="text-lg font-medium text-slate-700">
                      Air Sensor 2
                    </p>
                  </div>
                  <div
                    class="px-2.5 py-1 rounded-full bg-white text-green-800 text-sm font-medium shadow-sm"
                  >
                    Normal
                  </div>
                </div>

                <div class="flex items-end gap-2 mb-4">
                  <p class="text-4xl font-bold text-slate-800">
                    {{ airQuality.mq135_2 }}
                  </p>
                  <p class="text-lg text-slate-500 mb-1">ppm</p>
                </div>

                <div
                  class="w-full bg-white bg-opacity-50 rounded-full h-3 mb-2"
                >
                  <div
                    class="bg-green-500 h-3 rounded-full"
                    style="width: 25%"
                  ></div>
                </div>

                <div class="flex justify-between text-sm text-slate-500">
                  <span>0</span>
                  <span>1000</span>
                  <span>2000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import Nav from "@/components/templates/Nav.vue";
import { ref, onMounted, onUnmounted } from "vue";
import sensorsServices from "@/services/sensorsServices";
import loginService from "@/services/loginServices.js";

const waterQuantity = ref(0);
const feedQuantity = ref(0);
const temperatures = ref({ temp1: 0, temp2: 0 });
const humidities = ref({ hum1: 0, hum2: 0 });
const airQuality = ref({ mq135_1: 0, mq135_2: 0 });

// Function to get status text based on the value
const getStatusText = (value) => {
  if (value >= 60) return "Good";
  if (value >= 30) return "Warning";
  return "Low";
};

// Function to get status class based on the value
const getStatusClass = (value) => {
  if (value >= 60) return "bg-green-100 text-green-800";
  if (value >= 30) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

// Function to get progress color class based on the value
const getProgressColorClass = (value) => {
  if (value >= 60) return "bg-gradient-to-r from-green-400 to-emerald-500";
  if (value >= 30) return "bg-gradient-to-r from-yellow-400 to-amber-500";
  return "bg-gradient-to-r from-red-400 to-rose-500";
};

// Handle real-time data updates
onMounted(async () => {
  try {
    // Initial fetch for dashboard data
    waterQuantity.value = await sensorsServices.getWaterQuantity();
    feedQuantity.value = await sensorsServices.getFeedQuantity();
    temperatures.value = await sensorsServices.getTemperatures();
    humidities.value = await sensorsServices.getHumidity();
    airQuality.value = await sensorsServices.getAirQuality();

    // Set up real-time listeners for updates
    sensorsServices.listenForWaterQuantity((newVal) => {
      if (newVal !== undefined && newVal !== null) {
        waterQuantity.value = newVal;
      }
    });

    sensorsServices.listenForFeedQuantity((newVal) => {
      if (newVal !== undefined && newVal !== null) {
        feedQuantity.value = newVal;
      }
    });

    sensorsServices.listenForTemperatures((newVal) => {
      if (Array.isArray(newVal)) {
        temperatures.value = newVal;
      }
    });

    sensorsServices.listenForHumidity((newVal) => {
      if (newVal !== undefined && newVal !== null) {
        humidities.value = newVal;
      }
    });

    sensorsServices.listenForAirQuality((newVal) => {
      if (
        newVal &&
        typeof newVal === "object" &&
        "mq135_1" in newVal &&
        "mq135_2" in newVal
      ) {
        airQuality.value = newVal;
      }
    });
  } catch (error) {
    console.error("Error initializing dashboard:", error);
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
</style>
