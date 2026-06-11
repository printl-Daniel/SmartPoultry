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
        <div class="container mx-auto px-6 py-4 flex items-center">
          <div class="flex items-center gap-3">
            <div class="bg-slate-700 text-white p-2 rounded-lg">
              <i class="icon-thermometer text-xl"></i>
            </div>
            <div>
              <h1 class="text-lg font-semibold text-slate-800">
                Environmental Monitoring
              </h1>
              <p class="text-sm text-slate-500">
                Real-time monitoring of environmental conditions
              </p>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Dashboard Content -->
      <div class="flex-1 overflow-auto">
        <div class="container mx-auto p-6">
          <!-- Temperature & Humidity Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Temperature Control -->
            <div
              class="bg-white rounded-2xl shadow-sm p-5 border border-slate-200"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"
                  >
                    <i class="icon-thermometer text-red-500 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-slate-800">
                      Temperature
                    </h3>
                    <p class="text-sm text-slate-500">
                      Target: {{ targetTemperature }}°C
                    </p>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                  <div class="text-3xl font-bold text-slate-800">
                    {{ calculateAverage(temperatures) }}°C
                  </div>
                  <div class="text-sm text-slate-500">Average</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-5">
                <div
                  class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-base font-medium text-slate-700"
                      >Sensor 1</span
                    >
                    <span
                      class="text-sm px-2 py-0.5 rounded-full bg-white text-red-600 shadow-sm"
                      >Zone 1</span
                    >
                  </div>
                  <div class="flex items-end gap-1">
                    <p class="text-2xl font-bold text-slate-800">
                      {{ temperatures.temp1 }}
                    </p>
                    <p class="text-sm text-slate-600 mb-1">°C</p>
                  </div>
                </div>

                <div
                  class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-base font-medium text-slate-700"
                      >Sensor 2</span
                    >
                    <span
                      class="text-sm px-2 py-0.5 rounded-full bg-white text-red-600 shadow-sm"
                      >Zone 2</span
                    >
                  </div>
                  <div class="flex items-end gap-1">
                    <p class="text-2xl font-bold text-slate-800">
                      {{ temperatures.temp2 }}
                    </p>
                    <p class="text-sm text-slate-600 mb-1">°C</p>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium text-slate-700">
                    Target Temperature
                  </label>
                  <span class="text-sm font-medium text-red-600">
                    {{ targetTemperature }}°C
                  </span>
                </div>
                <div class="relative">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    v-model="targetTemperature"
                    step="0.5"
                    class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>
                <button
                  @click="applyTemperatureGoal"
                  class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-xl transition-colors duration-200 text-sm font-medium shadow-sm"
                >
                  Apply Temperature Setting
                </button>
              </div>
            </div>

            <!-- Humidity Control -->
            <div
              class="bg-white rounded-2xl shadow-sm p-5 border border-slate-200"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"
                  >
                    <i class="icon-droplet text-blue-500 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-slate-800">
                      Humidity
                    </h3>
                    <p class="text-sm text-slate-500">
                      Target: {{ targetHumidity }}%
                    </p>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                  <div class="text-3xl font-bold text-slate-800">
                    {{ calculateAverage(humidities) }}%
                  </div>
                  <div class="text-sm text-slate-500">Average</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-5">
                <div
                  class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-base font-medium text-slate-700"
                      >Sensor 1</span
                    >
                    <span
                      class="text-sm px-2 py-0.5 rounded-full bg-white text-blue-600 shadow-sm"
                      >Zone 1</span
                    >
                  </div>
                  <div class="flex items-end gap-1">
                    <p class="text-2xl font-bold text-slate-800">
                      {{ humidities.hum1 }}
                    </p>
                    <p class="text-sm text-slate-600 mb-1">%</p>
                  </div>
                </div>

                <div
                  class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-base font-medium text-slate-700"
                      >Sensor 2</span
                    >
                    <span
                      class="text-sm px-2 py-0.5 rounded-full bg-white text-blue-600 shadow-sm"
                      >Zone 2</span
                    >
                  </div>
                  <div class="flex items-end gap-1">
                    <p class="text-2xl font-bold text-slate-800">
                      {{ humidities.hum2 }}
                    </p>
                    <p class="text-sm text-slate-600 mb-1">%</p>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium text-slate-700">
                    Target Humidity
                  </label>
                  <span class="text-sm font-medium text-blue-600">
                    {{ targetHumidity }}%
                  </span>
                </div>
                <div class="relative">
                  <input
                    type="range"
                    min="0"
                    max="70"
                    v-model="targetHumidity"
                    step="1"
                    class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <button
                  @click="applyHumidityGoal"
                  class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 rounded-xl transition-colors duration-200 text-sm font-medium shadow-sm"
                >
                  Apply Humidity Setting
                </button>
              </div>
            </div>
          </div>

          <!-- Air Quality Section -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6"
          >
            <div
              class="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-5 py-4 flex justify-between items-center"
            >
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <i class="icon-wind"></i>
                Air Quality Monitoring
              </h2>
              <div class="flex items-center gap-2">
                <span class="text-sm">Status:</span>
                <span
                  class="px-2.5 py-1 rounded-full bg-white text-sm font-medium"
                  :class="getAirQualityTextColorClass()"
                >
                  {{ getAirQualityStatus() }}
                </span>
              </div>
            </div>

            <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Sensor 1 -->
              <div
                class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-center mb-4">
                  <div class="flex items-center gap-2">
                    <i class="icon-activity text-purple-600 text-xl"></i>
                    <p class="text-lg font-medium text-slate-700">
                      Air Sensor 1
                    </p>
                  </div>
                  <div
                    class="px-2.5 py-1 rounded-full bg-white text-sm font-medium shadow-sm"
                    :class="getAirQualityClass(airQuality.mq135_1)"
                  >
                    {{ getAirQualitySensorStatus(airQuality.mq135_1) }}
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
                    class="h-3 rounded-full"
                    :class="getAirQualityBarClass(airQuality.mq135_1)"
                    :style="{
                      width: getAirQualityPercentage(airQuality.mq135_1) + '%',
                    }"
                  ></div>
                </div>

                <div class="flex justify-between text-sm text-slate-500">
                  <span>0</span>
                  <span>100</span>
                  <span>200</span>
                </div>
              </div>

              <!-- Sensor 2 -->
              <div
                class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div class="flex justify-between items-center mb-4">
                  <div class="flex items-center gap-2">
                    <i class="icon-activity text-purple-600 text-xl"></i>
                    <p class="text-lg font-medium text-slate-700">
                      Air Sensor 2
                    </p>
                  </div>
                  <div
                    class="px-2.5 py-1 rounded-full bg-white text-sm font-medium shadow-sm"
                    :class="getAirQualityClass(airQuality.mq135_2)"
                  >
                    {{ getAirQualitySensorStatus(airQuality.mq135_2) }}
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
                    class="h-3 rounded-full"
                    :class="getAirQualityBarClass(airQuality.mq135_2)"
                    :style="{
                      width: getAirQualityPercentage(airQuality.mq135_2) + '%',
                    }"
                  ></div>
                </div>

                <div class="flex justify-between text-sm text-slate-500">
                  <span>0</span>
                  <span>100</span>
                  <span>200</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Actuator Status Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Heating Lamp Status -->
            <div
              class="bg-white rounded-2xl shadow-sm p-5 border border-slate-200"
            >
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center"
                  >
                    <i class="icon-bulb text-amber-500 text-xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-slate-800">
                    Heating Lamp
                  </h3>
                </div>
                <div
                  class="px-3 py-1.5 rounded-full text-sm font-medium"
                  :class="
                    bulbOn
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-500'
                  "
                >
                  {{ bulbOn ? "ON" : "OFF" }}
                </div>
              </div>

              <div class="flex items-center justify-center mb-2">
                <div
                  class="relative w-32 h-32 flex items-center justify-center"
                >
                  <i
                    class="icon-bulb w-20 h-20"
                    :class="bulbOn ? 'text-amber-500' : 'text-slate-300'"
                  ></i>
                  <div
                    v-if="bulbOn"
                    class="absolute -inset-4 bg-amber-50 rounded-full blur-md opacity-30 -z-10 animate-pulse"
                  ></div>
                </div>
              </div>

              <div class="bg-slate-50 p-2 rounded-xl">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-slate-500"
                    >Current Temperature</span
                  >
                  <span class="text-lg font-semibold text-slate-800">
                    {{ calculateAverage(temperatures) }}°C
                  </span>
                </div>
                <div class="text-sm text-slate-500">
                  The heating lamp helps maintain optimal temperature for your
                  environment.
                </div>
              </div>
            </div>

            <!-- Exhaust Fans Status -->
            <div
              class="bg-white rounded-2xl shadow-sm p-4 border border-slate-200"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center"
                  >
                    <i class="icon-fan text-purple-500 text-xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-slate-800">
                    Exhaust Fans
                  </h3>
                </div>
                <div
                  class="px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium"
                >
                  {{ getActiveFanCount() }}/2 active
                </div>
              </div>

              <div class="grid grid-cols-2 gap-6 mb-7">
                <div class="flex flex-col items-center">
                  <div class="relative mb-2">
                    <i
                      class="icon-fan w-16 h-16 text-purple-500"
                      :class="{ 'animate-spin': ex.ex1 }"
                      style="animation-duration: 2s"
                    ></i>
                    <div
                      v-if="ex.ex1"
                      class="absolute -inset-2 bg-purple-100 rounded-full blur-md opacity-30 -z-10"
                    ></div>
                  </div>
                  <div
                    class="text-sm text-center font-medium mt-2"
                    :class="ex.ex1 ? 'text-purple-700' : 'text-slate-400'"
                  >
                    Exhaust 1
                    <span
                      class="block mt-1 px-2 py-0.5 rounded-full text-xs"
                      :class="
                        ex.ex1
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                      "
                    >
                      {{ ex.ex1 ? "RUNNING" : "STOPPED" }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="relative mb-2">
                    <i
                      class="icon-fan w-16 h-16 text-purple-500"
                      :class="{ 'animate-spin': ex.ex2 }"
                      style="animation-duration: 2s"
                    ></i>
                    <div
                      v-if="ex.ex2"
                      class="absolute -inset-2 bg-purple-100 rounded-full blur-md opacity-30 -z-10"
                    ></div>
                  </div>
                  <div
                    class="text-sm text-center font-medium mt-2"
                    :class="ex.ex2 ? 'text-purple-700' : 'text-slate-400'"
                  >
                    Exhaust 2
                    <span
                      class="block mt-1 px-2 py-0.5 rounded-full text-xs"
                      :class="
                        ex.ex2
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                      "
                    >
                      {{ ex.ex2 ? "RUNNING" : "STOPPED" }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="bg-slate-50 p-4 mt-5 rounded-xl">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-slate-500">Air Quality Status</span>
                  <span
                    class="text-lg font-semibold"
                    :class="getAirQualityTextClass()"
                  >
                    {{ getAirQualityStatus() }}
                  </span>
                </div>
                <div class="text-sm text-slate-500">
                  Exhaust fans help maintain optimal air quality by removing
                  stale air.
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
import { onMounted, ref, computed, onUnmounted } from "vue";
import sensorsServices from "@/services/sensorsServices.js";
import environmentalControl from "@/services/environmentalControl.js";

const temperatures = ref({ temp1: 0, temp2: 0 });
const humidities = ref({ hum1: 0, hum2: 0 });
const airQuality = ref({ mq135_1: 0, mq135_2: 0 });
const lastUpdated = ref(new Date());

const targetTemperature = ref(25);
const targetHumidity = ref(60);

// Bulb status
const bulbOn = ref(false);

// Fan status
const ex = ref({
  ex1: false,
  ex2: false,
});

// Computed property to check if any fan is active
const isAnyFanActive = computed(() => {
  return ex.value.ex1 || ex.value.ex2;
});

function getActiveFanCount() {
  let count = 0;
  if (ex.value.ex1) count++;
  if (ex.value.ex2) count++;
  return count;
}

function calculateAverage(values) {
  if (!values || typeof values !== "object") {
    console.error("Invalid input:", values);
    return 0;
  }

  const nums = Object.values(values).map(function (v) {
    return Number(v) || 0;
  });

  if (nums.length === 0) return 0;

  return (
    nums.reduce(function (a, b) {
      return a + b;
    }, 0) / nums.length
  ).toFixed(1);
}

function calculateOffset(value, max) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  return circumference - (value / max) * circumference;
}

function getAirQualityStatus() {
  const avg = (airQuality.value.mq135_1 + airQuality.value.mq135_2) / 2;
  if (avg < 50) return "Excellent";
  if (avg < 100) return "Good";
  if (avg < 150) return "Fair";
  return "Poor";
}

function getAirQualitySensorStatus(value) {
  if (value < 50) return "Excellent";
  if (value < 100) return "Good";
  if (value < 150) return "Fair";
  return "Poor";
}

function getAirQualityTextClass() {
  const avg = (airQuality.value.mq135_1 + airQuality.value.mq135_2) / 2;
  if (avg < 50) return "text-green-700";
  if (avg < 100) return "text-yellow-700";
  if (avg < 150) return "text-orange-700";
  return "text-red-700";
}

function getAirQualityTextColorClass() {
  const avg = (airQuality.value.mq135_1 + airQuality.value.mq135_2) / 2;
  if (avg < 50) return "text-green-700";
  if (avg < 100) return "text-yellow-700";
  if (avg < 150) return "text-orange-700";
  return "text-red-700";
}

function getAirQualityClass(value) {
  if (value < 50) return "text-green-700";
  if (value < 100) return "text-yellow-700";
  if (value < 150) return "text-orange-700";
  return "text-red-700";
}

function getAirQualityBarClass(value) {
  if (value < 50) return "bg-green-500";
  if (value < 100) return "bg-yellow-500";
  if (value < 150) return "bg-orange-500";
  return "bg-red-500";
}

function getAirQualityPercentage(value) {
  return Math.min((value / 200) * 100, 100);
}

async function applyTemperatureGoal() {
  try {
    await environmentalControl.setTemperatureGoal(targetTemperature.value);
  } catch (error) {
    console.error("Error updating temperature settings:", error);
  }
}

async function applyHumidityGoal() {
  try {
    await environmentalControl.setHumidityGoal(targetHumidity.value);
  } catch (error) {
    console.error("Error updating humidity settings:", error);
  }
}

async function refreshAllData() {
  try {
    await fetchSensorData();
    await fetchActuatorStatus();
    lastUpdated.value = new Date();
  } catch (error) {
    console.error("Error refreshing data:", error);
  }
}

async function fetchSensorData() {
  try {
    // Fetch sensor data in parallel
    const [tempData, humData, airData] = await Promise.all([
      sensorsServices.getTemperatures(),
      sensorsServices.getHumidity(),
      sensorsServices.getAirQuality(),
    ]);

    if (tempData) temperatures.value = tempData;
    if (humData) humidities.value = humData;
    if (airData) airQuality.value = airData;

    lastUpdated.value = new Date();
  } catch (error) {
    console.error("Error fetching sensor data:", error);
  }
}

async function fetchActuatorStatus() {
  try {
    // Fetch actuator statuses in parallel
    const [heatingStatus, exhaustStatus] = await Promise.all([
      environmentalControl.getHeatingSettings(),
      environmentalControl.getExhaustStatus(),
    ]);

    if (heatingStatus !== undefined) bulbOn.value = heatingStatus;
    if (exhaustStatus) ex.value = exhaustStatus;
  } catch (error) {
    console.error("Error refreshing actuator status:", error);
  }
}

onMounted(async function () {
  try {
    // Fetch initial target values
    const [tempGoal, humGoal] = await Promise.all([
      environmentalControl.getTemperatureGoal(),
      environmentalControl.getHumidityGoal(),
    ]);

    if (tempGoal !== undefined && tempGoal !== null)
      targetTemperature.value = tempGoal;
    if (humGoal !== undefined && humGoal !== null)
      targetHumidity.value = humGoal;

    // Fetch initial sensor and actuator data
    await fetchSensorData();
    await fetchActuatorStatus();

    // Set up live updates for sensor data
    sensorsServices.listenForTemperatures(function (newTemperatures) {
      if (newTemperatures) {
        temperatures.value = newTemperatures;
        lastUpdated.value = new Date();
      }
    });

    sensorsServices.listenForHumidity(function (newHumidity) {
      if (newHumidity) {
        humidities.value = newHumidity;
        lastUpdated.value = new Date();
      }
    });

    sensorsServices.listenForAirQuality(function (newAirQuality) {
      if (newAirQuality) {
        airQuality.value = newAirQuality;
        lastUpdated.value = new Date();
      }
    });
  } catch (error) {
    console.error("Error during initialization:", error);
  }

  // Set up a periodic refresh for actuator statuses
  const statusInterval = setInterval(fetchActuatorStatus, 10000);

  // Clean up interval on component unmount
  onUnmounted(() => {
    clearInterval(statusInterval);
  });
});
</script>

<style>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin linear infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

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

/* Custom range input styling */
input[type="range"] {
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #e5e7eb;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"].accent-red-500::-webkit-slider-thumb {
  background: #ef4444;
}

input[type="range"].accent-blue-500::-webkit-slider-thumb {
  background: #3b82f6;
}

input[type="range"].accent-red-500::-moz-range-thumb {
  background: #ef4444;
}

input[type="range"].accent-blue-500::-moz-range-thumb {
  background: #3b82f6;
}
</style>
