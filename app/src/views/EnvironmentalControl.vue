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
          <div
            class="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start"
          >
            <div
              class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl shadow-md flex-shrink-0 relative overflow-hidden"
            >
              <i class="fas fa-thermometer-half text-xl relative z-10"></i>
              <div
                class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
              ></div>
            </div>
            <div class="text-center sm:text-left">
              <h1 class="text-xl font-bold text-slate-800">
                Environmental Monitoring
              </h1>
              <p class="text-sm text-slate-500">
                Real-time monitoring of environmental conditions
              </p>
            </div>
          </div>
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
          <!-- Temperature & Humidity Row -->
          <div class="flex items-center mb-6">
            <div class="bg-emerald-100 p-2 rounded-lg mr-3">
              <i class="fas fa-sliders-h text-emerald-500 text-xl"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-800">
              Environmental Controls
            </h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Temperature Control -->
            <div
              class="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div
                class="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
              ></div>
              <div class="flex justify-between items-center mb-5 relative z-10">
                <div class="flex items-center gap-3">
                  <div
                    class="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center shadow-md relative overflow-hidden"
                  >
                    <i class="fas fa-thermometer-half text-2xl"></i>
                    <div
                      class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
                    ></div>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-800">
                      Temperature
                    </h3>
                    <p class="text-sm text-slate-500">
                      Target: {{ targetTemperature }}°C
                    </p>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                  <div
                    class="text-3xl font-bold text-slate-800 flex items-baseline gap-1"
                  >
                    {{ calculateAverage(temperatures) }}
                    <span class="text-lg text-slate-600">°C</span>
                  </div>
                  <div class="text-sm text-slate-500">Average</div>
                </div>
              </div>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative z-10"
              >
                <div
                  v-for="(value, key, index) in temperatures"
                  :key="key"
                  class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-red-100"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-base font-medium text-slate-700">
                      Sensor {{ index + 1 }}
                    </span>
                    <span
                      class="text-sm px-3 py-1 rounded-full bg-white text-red-600 shadow-sm font-medium"
                    >
                      Zone {{ index + 1 }}
                    </span>
                  </div>
                  <div class="flex items-end gap-1">
                    <p class="text-3xl font-bold text-slate-800">
                      {{ value }}
                    </p>
                    <p class="text-sm text-slate-600 mb-1">°C</p>
                  </div>
                </div>
              </div>

              <div class="space-y-4 relative z-10">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium text-slate-700">
                    Target Temperature
                  </label>
                  <span
                    class="text-sm font-medium px-3 py-1 bg-red-50 text-red-600 rounded-lg"
                  >
                    {{ targetTemperature }}°C
                  </span>
                </div>
                <div class="relative px-1">
                  <div
                    class="absolute -top-1 left-0 right-0 flex justify-between text-xs text-slate-400"
                  >
                    <span>0°C</span>
                    <span>25°C</span>
                    <span>50°C</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    v-model="targetTemperature"
                    step="0.5"
                    class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500 mt-4"
                  />
                </div>
                <button
                  @click="applyTemperatureGoal"
                  class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl transition-colors duration-200 text-sm font-medium shadow-md flex items-center justify-center gap-2"
                >
                  <i class="fas fa-check"></i>
                  Apply Temperature Setting
                </button>
              </div>
            </div>

            <!-- Humidity Control -->
            <div
              class="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 relative group"
            >
              <div
                class="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
              ></div>
              <div class="flex justify-between items-center mb-5 relative z-10">
                <div class="flex items-center gap-3">
                  <div
                    class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-md relative overflow-hidden"
                  >
                    <i class="fas fa-tint text-2xl"></i>
                    <div
                      class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
                    ></div>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-800">Humidity</h3>
                    <p class="text-sm text-slate-500">
                      Target: {{ targetHumidity }}%
                    </p>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                  <div
                    class="text-3xl font-bold text-slate-800 flex items-baseline gap-1"
                  >
                    {{ calculateAverage(humidities) }}
                    <span class="text-lg text-slate-600">%</span>
                  </div>
                  <div class="text-sm text-slate-500">Average</div>
                </div>
              </div>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative z-10"
              >
                <div
                  v-for="(value, key, index) in humidities"
                  :key="key"
                  class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-base font-medium text-slate-700">
                      Sensor {{ index + 1 }}
                    </span>
                    <span
                      class="text-sm px-3 py-1 rounded-full bg-white text-blue-600 shadow-sm font-medium"
                    >
                      Zone {{ index + 1 }}
                    </span>
                  </div>
                  <div class="flex items-end gap-1">
                    <p class="text-3xl font-bold text-slate-800">
                      {{ value }}
                    </p>
                    <p class="text-sm text-slate-600 mb-1">%</p>
                  </div>
                </div>
              </div>

              <div class="space-y-4 relative z-10">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium text-slate-700">
                    Target Humidity
                  </label>
                  <span
                    class="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-lg"
                  >
                    {{ targetHumidity }}%
                  </span>
                </div>
                <div class="relative px-1">
                  <div
                    class="absolute -top-1 left-0 right-0 flex justify-between text-xs text-slate-400"
                  >
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    v-model="targetHumidity"
                    step="1"
                    class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-4"
                  />
                </div>
                <button
                  @click="applyHumidityGoal"
                  class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl transition-colors duration-200 text-sm font-medium shadow-md flex items-center justify-center gap-2"
                >
                  <i class="fas fa-check"></i>
                  Apply Humidity Setting
                </button>
              </div>
            </div>
          </div>

          <!-- Air Quality Section -->
          <div class="flex items-center mb-6 mt-8">
            <div class="bg-purple-100 p-2 rounded-lg mr-3">
              <i class="fas fa-wind text-purple-500 text-xl"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-800">
              Air Quality Monitoring
            </h2>
          </div>

          <!-- Air Quality Goal Control -->
          <div
            class="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 mb-6 relative group"
          >
            <div
              class="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
            ></div>
            <div class="flex justify-between items-center mb-5 relative z-10">
              <div class="flex items-center gap-3">
                <div
                  class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 text-white flex items-center justify-center shadow-md relative overflow-hidden"
                >
                  <i class="fas fa-wind text-2xl"></i>
                  <div
                    class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
                  ></div>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-800">Air Quality</h3>
                  <p class="text-sm text-slate-500">
                    Target: {{ targetAirQuality }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <div
                  class="text-3xl font-bold text-slate-800 flex items-baseline gap-1"
                >
                  {{ calculateAirQualityAverage() }}
                  <span class="text-lg text-slate-600"></span>
                </div>
                <div
                  class="text-sm px-2 py-0.5 rounded-full mt-1"
                  :class="getAirQualityTextClass()"
                >
                  {{ getAirQualityStatus() }}
                </div>
              </div>
            </div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative z-10"
            >
              <div
                v-for="(value, key, index) in airQuality"
                :key="key"
                class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-base font-medium text-slate-700">
                    Sensor {{ index + 1 }}
                  </span>
                  <span
                    class="text-sm px-3 py-1 rounded-full bg-white shadow-sm font-medium"
                    :class="getAirQualityClass(value)"
                  >
                    {{ getAirQualitySensorStatus(value) }}
                  </span>
                </div>
                <div class="flex items-end gap-1">
                  <p class="text-3xl font-bold text-slate-800">
                    {{ value }}
                  </p>
                  <p class="text-sm text-slate-600 mb-1"></p>
                </div>
              </div>
            </div>

            <div class="space-y-4 relative z-10">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-slate-700">
                  Target Air Quality
                </label>
                <span
                  class="text-sm font-medium px-3 py-1 bg-purple-50 text-purple-600 rounded-lg"
                >
                  {{ targetAirQuality }}
                </span>
              </div>
              <div class="relative px-1">
                <div
                  class="absolute -top-1 left-0 right-0 flex justify-between text-xs text-slate-400"
                >
                  <span>0</span>
                  <span>100</span>
                  <span>200</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  v-model="targetAirQuality"
                  step="5"
                  class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500 mt-4"
                />
              </div>
              <button
                @click="applyAirQualityGoal"
                class="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white py-3 rounded-xl transition-colors duration-200 text-sm font-medium shadow-md flex items-center justify-center gap-2"
              >
                <i class="fas fa-check"></i>
                Apply Air Quality Setting
              </button>
            </div>
          </div>

          <!-- Actuator Status Section -->
          <div class="flex items-center mb-6 mt-8">
            <div class="bg-slate-100 p-2 rounded-lg mr-3">
              <i class="fas fa-cogs text-slate-700 text-xl"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-800">System Actuators</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Heating Lamp Status -->
            <div
              class="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 relative group"
            >
              <div
                class="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
              ></div>
              <div class="flex justify-between items-center mb-4 relative z-10">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md relative overflow-hidden"
                  >
                    <i class="fas fa-lightbulb text-xl"></i>
                    <div
                      class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
                    ></div>
                  </div>
                  <h3 class="text-lg font-bold text-slate-800">Heating Lamp</h3>
                </div>
                <div
                  class="px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2"
                  :class="
                    bulbOn
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-500'
                  "
                >
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="bulbOn ? 'bg-amber-500' : 'bg-slate-400'"
                  ></span>
                  {{ bulbOn ? "ACTIVE" : "INACTIVE" }}
                </div>
              </div>

              <div class="flex items-center justify-center my-6 relative z-10">
                <div
                  class="relative w-36 h-36 flex items-center justify-center bg-gradient-to-br rounded-full"
                  :class="
                    bulbOn
                      ? 'from-amber-50 to-amber-100'
                      : 'from-slate-50 to-slate-100'
                  "
                >
                  <i
                    class="fas fa-lightbulb text-6xl"
                    :class="bulbOn ? 'text-amber-500' : 'text-slate-300'"
                  ></i>

                  <div
                    v-if="bulbOn"
                    class="absolute -inset-4 bg-amber-50 rounded-full blur-xl opacity-60 -z-10 animate-pulse"
                  ></div>
                </div>
              </div>

              <div
                class="bg-slate-50 p-4 rounded-xl shadow-inner relative z-10"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-slate-700"
                    >Current Temperature</span
                  >
                  <span
                    class="text-lg font-semibold text-slate-800 flex items-baseline gap-1"
                  >
                    {{ calculateAverage(temperatures) }}
                    <span class="text-sm text-slate-600">°C</span>
                  </span>
                </div>
                <div
                  class="text-sm text-slate-500 mt-2 bg-white p-3 rounded-lg border border-slate-100"
                >
                  <div class="flex items-start gap-2">
                    <i class="fas fa-info-circle text-amber-500 mt-0.5"></i>
                    <p>
                      The heating lamp helps maintain optimal temperature for
                      your environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Exhaust Fans Status -->
            <div
              class="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 relative group"
            >
              <div
                class="absolute inset-0 bg-purple-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
              ></div>
              <div class="flex justify-between items-center mb-6 relative z-10">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md relative overflow-hidden"
                  >
                    <i class="fas fa-fan text-xl"></i>
                    <div
                      class="absolute inset-0 bg-white opacity-20 rounded-lg blur-sm"
                    ></div>
                  </div>
                  <h3 class="text-lg font-bold text-slate-800">Exhaust Fans</h3>
                </div>
                <div
                  class="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium shadow-sm flex items-center gap-2"
                >
                  <span class="h-2 w-2 rounded-full bg-purple-500"></span>
                  {{ activeFans }}/{{ totalFans }} active
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 my-6 relative z-10">
                <div
                  v-for="(isRunning, key, index) in ex"
                  :key="key"
                  class="flex flex-col items-center bg-gradient-to-br from-slate-50 to-purple-50 p-4 rounded-xl shadow-sm border border-purple-100"
                >
                  <div class="relative mb-3">
                    <i
                      class="fas fa-fan text-3xl transition-all duration-300"
                      :class="
                        isRunning
                          ? 'text-purple-600 animate-spin'
                          : 'text-slate-300'
                      "
                      :style="isRunning ? 'animation-duration: 0.5s' : ''"
                    ></i>
                    <div
                      v-if="isRunning"
                      class="absolute -inset-2 bg-purple-100 rounded-full blur-md opacity-30 -z-10"
                    ></div>
                  </div>
                  <div
                    class="text-base text-center font-medium mt-2"
                    :class="isRunning ? 'text-purple-700' : 'text-slate-400'"
                  >
                    Exhaust {{ index + 1 }}
                    <span
                      class="block mt-2 px-3 py-1 rounded-full text-xs font-medium"
                      :class="
                        isRunning
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                      "
                    >
                      {{ isRunning ? "RUNNING" : "STOPPED" }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                class="bg-slate-50 p-4 rounded-xl shadow-inner relative z-10"
              >
                <div
                  class="text-sm text-slate-500 mt-2 bg-white p-3 rounded-lg border border-slate-100"
                >
                  <div class="flex items-start gap-2">
                    <i class="fas fa-info-circle text-purple-500 mt-0.5"></i>
                    <p>
                      Exhaust fans help maintain optimal air quality by removing
                      stale air and improving ventilation.
                    </p>
                  </div>
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

const temperatures = ref({});
const humidities = ref({});
const airQuality = ref({});
const lastUpdated = ref(new Date());

const targetTemperature = ref(25);
const targetHumidity = ref(60);
const targetAirQuality = ref(50);

// Bulb status
const bulbOn = ref(false);

// Fan status
const ex = ref({
  ex1: false,
  ex2: false,
});

// Computed properties for fan status
const activeFans = computed(() => {
  return Object.values(ex.value).filter(Boolean).length;
});

const totalFans = computed(() => {
  return Object.keys(ex.value).length;
});

// Computed property to check if any fan is active
const isAnyFanActive = computed(() => {
  return Object.values(ex.value).some(Boolean);
});

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

function calculateAirQualityAverage() {
  if (!airQuality.value.air1 || !airQuality.value.air2) return 0;
  return (
    (Number(airQuality.value.air1) + Number(airQuality.value.air2)) /
    2
  ).toFixed(0);
}

function getAirQualityStatus() {
  if (!airQuality.value.air1 || !airQuality.value.air2) return "No Data";
  const avg =
    (Number(airQuality.value.air1) + Number(airQuality.value.air2)) / 2;
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
  if (!airQuality.value.air1 || !airQuality.value.air2)
    return "text-slate-500 bg-slate-50";
  const avg =
    (Number(airQuality.value.air1) + Number(airQuality.value.air2)) / 2;
  if (avg < 50) return "text-green-700 bg-green-50";
  if (avg < 100) return "text-yellow-700 bg-yellow-50";
  if (avg < 150) return "text-orange-700 bg-orange-50";
  return "text-red-700 bg-red-50";
}

function getAirQualityClass(value) {
  if (value < 50) return "text-green-700";
  if (value < 100) return "text-yellow-700";
  if (value < 150) return "text-orange-700";
  return "text-red-700";
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

async function applyAirQualityGoal() {
  try {
    await environmentalControl.setAirQualityGoal(targetAirQuality.value);
    // Automatically adjust fans based on air quality goal
    const currentAvg = calculateAirQualityAverage();
    if (currentAvg > targetAirQuality.value) {
      // If current air quality is worse than target, turn on fans
      if (!ex.value.ex1) await environmentalControl.toggleExhaust(1, true);
      if (currentAvg > targetAirQuality.value + 50 && !ex.value.ex2) {
        await environmentalControl.toggleExhaust(2, true);
      }
    } else {
      // If air quality is better than target, we can turn off fans to save energy
      if (ex.value.ex2) await environmentalControl.toggleExhaust(2, false);
      if (currentAvg < targetAirQuality.value - 20 && ex.value.ex1) {
        await environmentalControl.toggleExhaust(1, false);
      }
    }
  } catch (error) {
    console.error("Error updating air quality settings:", error);
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
    const [heatingStatus, exhaustStatus, airQualityGoal] = await Promise.all([
      environmentalControl.getHeatingSettings(),
      environmentalControl.getExhaustStatus(),
      environmentalControl.getAirQualityGoal(),
    ]);

    if (heatingStatus !== undefined) bulbOn.value = heatingStatus;
    if (exhaustStatus) ex.value = exhaustStatus;
    if (airQualityGoal !== undefined && airQualityGoal !== null) {
      targetAirQuality.value = airQualityGoal;
    }
  } catch (error) {
    console.error("Error refreshing actuator status:", error);
  }
}

onMounted(async function () {
  try {
    // Fetch initial target values
    const [tempGoal, humGoal, airGoal] = await Promise.all([
      environmentalControl.getTemperatureGoal(),
      environmentalControl.getHumidityGoal(),
      environmentalControl.getAirQualityGoal(),
    ]);

    if (tempGoal !== undefined && tempGoal !== null)
      targetTemperature.value = tempGoal;
    if (humGoal !== undefined && humGoal !== null)
      targetHumidity.value = humGoal;
    if (airGoal !== undefined && airGoal !== null)
      targetAirQuality.value = airGoal;

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

<style scoped>
/* Background pattern */
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

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

/* Custom range input styling */
input[type="range"] {
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #e5e7eb;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border: none;
}

input[type="range"].accent-red-500::-webkit-slider-thumb {
  background: linear-gradient(to bottom, #ef4444, #dc2626);
}

input[type="range"].accent-blue-500::-webkit-slider-thumb {
  background: linear-gradient(to bottom, #3b82f6, #2563eb);
}

input[type="range"].accent-purple-500::-webkit-slider-thumb {
  background: linear-gradient(to bottom, #a855f7, #9333ea);
}

input[type="range"].accent-red-500::-moz-range-thumb {
  background: linear-gradient(to bottom, #ef4444, #dc2626);
}

input[type="range"].accent-blue-500::-moz-range-thumb {
  background: linear-gradient(to bottom, #3b82f6, #2563eb);
}

input[type="range"].accent-purple-500::-moz-range-thumb {
  background: linear-gradient(to bottom, #a855f7, #9333ea);
}

/* Hover effects */
.bg-white {
  transition: all 0.3s ease;
}

/* Responsive grid improvements */
@media (max-width: 640px) {
  .grid.grid-cols-1.sm\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 640px) {
  .grid.grid-cols-1.sm\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid.grid-cols-1.lg\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
