<template>
  <div
    class="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100"
  >
    <div>
      <Nav />
    </div>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden flex flex-col">
      <!-- Reports Header -->
      <header class="bg-white border-b border-slate-200 shadow-sm">
        <div
          class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
        >
          <div
            class="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start"
          >
            <div
              class="bg-gradient-to-r from-purple-600 to-violet-700 text-white p-3 rounded-xl shadow-md flex-shrink-0"
            >
              <i class="fas fa-file-alt text-xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-slate-800">Reports</h1>
              <p class="text-sm text-slate-500">
                Comprehensive insights and data summaries
              </p>
            </div>
          </div>
          <div
            class="bg-violet-50 text-violet-700 px-4 py-2 rounded-lg shadow-sm border border-violet-100 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end"
          >
            <i class="fas fa-chart-pie"></i>
            <span class="font-medium">Analytics Dashboard</span>
          </div>
        </div>
      </header>

      <!-- Main Dashboard Content -->
      <div class="flex-1 overflow-auto bg-slate-50">
        <div class="container mx-auto p-4 sm:p-6">
          <!-- Water & Feed Consumption Row -->
          <h2
            class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"
          >
            <i class="fas fa-tint text-blue-500"></i>
            Consumption Monitoring
          </h2>

          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            <!-- Water Consumption Card -->
            <div
              class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3 sm:gap-0"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-md"
                  >
                    <i class="fas fa-tint text-xl sm:text-2xl"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-800">
                      Water Consumption
                    </h3>
                    <p class="text-sm text-slate-500">Today's usage</p>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                  <div
                    class="text-2xl sm:text-3xl font-bold text-slate-800 flex items-baseline gap-1"
                  >
                    {{ calculateAverage(waterConsumptionData) }}
                    <span class="text-base sm:text-lg text-slate-600">{{
                      waterConsumptionData.unit
                    }}</span>
                  </div>
                  <div class="text-sm text-slate-500">Average</div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div
                  class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
                >
                  <div class="text-center">
                    <span class="text-sm font-medium text-slate-700"
                      >Today</span
                    >
                    <p
                      class="text-xl sm:text-2xl font-bold text-slate-800 mt-1"
                    >
                      {{ waterConsumptionData.today }}
                    </p>
                    <p class="text-xs text-slate-600">
                      {{ waterConsumptionData.unit }}
                    </p>
                  </div>
                </div>
                <div
                  class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
                >
                  <div class="text-center">
                    <span class="text-sm font-medium text-slate-700"
                      >Yesterday</span
                    >
                    <p
                      class="text-xl sm:text-2xl font-bold text-slate-800 mt-1"
                    >
                      {{ waterConsumptionData.yesterday }}
                    </p>
                    <p class="text-xs text-slate-600">
                      {{ waterConsumptionData.unit }}
                    </p>
                  </div>
                </div>
                <div
                  class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
                >
                  <div class="text-center">
                    <span class="text-sm font-medium text-slate-700"
                      >Week Avg</span
                    >
                    <p
                      class="text-xl sm:text-2xl font-bold text-slate-800 mt-1"
                    >
                      {{ waterConsumptionData.weekAverage }}
                    </p>
                    <p class="text-xs text-slate-600">
                      {{ waterConsumptionData.unit }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="chart-wrapper">
                <h3 class="text-sm font-medium text-slate-700 mb-3">
                  Weekly Consumption
                </h3>
                <div class="h-32 sm:h-40 bg-slate-50 rounded-lg">
                  <canvas ref="waterWeeklyChart" class="w-full h-full"></canvas>
                </div>
              </div>
            </div>

            <!-- Feed Consumption Card -->
            <div
              class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3 sm:gap-0"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center shadow-md"
                  >
                    <i class="fas fa-seedling text-xl sm:text-2xl"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-800">
                      Feed Consumption
                    </h3>
                    <p class="text-sm text-slate-500">Container monitoring</p>
                  </div>
                </div>
              </div>

              <!-- Container Tabs -->
              <div class="flex gap-2 mb-4 overflow-x-auto pb-2">
                <button
                  v-for="container in feedContainers"
                  :key="container.id"
                  class="flex-shrink-0 px-3 py-2 text-sm border rounded-lg flex items-center gap-2 transition-colors"
                  :class="{
                    'bg-slate-100 border-slate-300 font-medium':
                      activeContainer === container.id,
                    'border-slate-200 hover:bg-slate-50':
                      activeContainer !== container.id,
                  }"
                  @click="activeContainer = container.id"
                >
                  {{ container.name }}
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="getStatusClass(container.status)"
                  ></span>
                </button>
              </div>

              <!-- Container Content -->
              <div
                v-for="container in feedContainers"
                :key="container.id"
                v-show="activeContainer === container.id"
              >
                <div
                  class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6"
                >
                  <div
                    class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-green-100"
                  >
                    <div class="text-center">
                      <span class="text-sm font-medium text-slate-700"
                        >Today</span
                      >
                      <div class="flex items-center justify-center gap-1 mt-1">
                        <p class="text-xl sm:text-2xl font-bold text-slate-800">
                          {{ container.today }}
                        </p>
                        <div
                          class="text-green-500"
                          v-if="container.today > container.yesterday"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m5 12 7-7 7 7"></path>
                            <path d="M12 19V5"></path>
                          </svg>
                        </div>
                        <div class="text-red-500" v-else>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      <p class="text-xs text-slate-600">{{ container.unit }}</p>
                    </div>
                  </div>
                  <div
                    class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-green-100"
                  >
                    <div class="text-center">
                      <span class="text-sm font-medium text-slate-700"
                        >Yesterday</span
                      >
                      <p
                        class="text-xl sm:text-2xl font-bold text-slate-800 mt-1"
                      >
                        {{ container.yesterday }}
                      </p>
                      <p class="text-xs text-slate-600">{{ container.unit }}</p>
                    </div>
                  </div>
                  <div
                    class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-green-100"
                  >
                    <div class="text-center">
                      <span class="text-sm font-medium text-slate-700"
                        >Week Avg</span
                      >
                      <p
                        class="text-xl sm:text-2xl font-bold text-slate-800 mt-1"
                      >
                        {{ container.weekAverage }}
                      </p>
                      <p class="text-xs text-slate-600">{{ container.unit }}</p>
                    </div>
                  </div>
                </div>

                <div class="chart-wrapper">
                  <h3 class="text-sm font-medium text-slate-700 mb-3">
                    Weekly Consumption
                  </h3>
                  <div class="h-32 sm:h-40 bg-slate-50 rounded-lg">
                    <canvas
                      :ref="
                        (el) => {
                          if (el) containerCharts[container.id] = el;
                        }
                      "
                      class="w-full h-full"
                    ></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Environmental Alerts Section -->
          <h2
            class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 mt-6 sm:mt-8"
          >
            <i class="fas fa-exclamation-triangle text-amber-500"></i>
            Environmental Alerts
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <!-- Temperature Alerts -->
            <div
              class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center shadow-md"
                  >
                    <i class="fas fa-thermometer-half text-xl sm:text-2xl"></i>
                  </div>
                  <h3 class="text-lg font-bold text-slate-800">
                    Temperature Alerts
                  </h3>
                </div>
              </div>

              <!-- Tabs -->
              <div class="flex gap-2 mb-4">
                <button
                  class="px-3 py-2 text-sm rounded-lg transition-colors"
                  :class="{
                    'bg-slate-100 font-medium': tempActiveTab === 'day',
                    'hover:bg-slate-50': tempActiveTab !== 'day',
                  }"
                  @click="tempActiveTab = 'day'"
                >
                  Today
                </button>
                <button
                  class="px-3 py-2 text-sm rounded-lg transition-colors"
                  :class="{
                    'bg-slate-100 font-medium': tempActiveTab === 'week',
                    'hover:bg-slate-50': tempActiveTab !== 'week',
                  }"
                  @click="tempActiveTab = 'week'"
                >
                  This Week
                </button>
              </div>

              <!-- Alert Content -->
              <div class="min-h-[200px]">
                <div v-if="tempActiveTab === 'day'">
                  <div
                    v-if="temperatureAlerts.day.length > 0"
                    class="space-y-3"
                  >
                    <div
                      v-for="(alert, index) in temperatureAlerts.day"
                      :key="index"
                      class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg hover:shadow-sm transition-shadow gap-3 sm:gap-0"
                    >
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 rounded-full flex items-center justify-center"
                          :class="
                            alert.type === 'exceed'
                              ? 'bg-red-100 text-red-500'
                              : 'bg-blue-100 text-blue-500'
                          "
                        >
                          <svg
                            v-if="alert.type === 'exceed'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m5 12 7-7 7 7"></path>
                            <path d="M12 19V5"></path>
                          </svg>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="font-medium">
                            {{ alert.type === "exceed" ? "Above" : "Below" }}
                            threshold
                          </p>
                          <p class="text-sm text-slate-500">{{ alert.time }}</p>
                        </div>
                      </div>
                      <div
                        class="flex justify-between w-full sm:w-auto sm:text-right"
                      >
                        <p class="font-medium">{{ alert.value }}°C</p>
                        <p class="text-sm text-slate-500 ml-4">
                          Threshold: {{ alert.threshold }}°C
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-center h-32 bg-slate-50 rounded-lg text-slate-500 text-sm"
                  >
                    No alerts for today
                  </div>
                </div>
                <div v-if="tempActiveTab === 'week'">
                  <div
                    v-if="temperatureAlerts.week.length > 0"
                    class="space-y-3"
                  >
                    <div
                      v-for="(alert, index) in temperatureAlerts.week"
                      :key="index"
                      class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg hover:shadow-sm transition-shadow gap-3 sm:gap-0"
                    >
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 rounded-full flex items-center justify-center"
                          :class="
                            alert.type === 'exceed'
                              ? 'bg-red-100 text-red-500'
                              : 'bg-blue-100 text-blue-500'
                          "
                        >
                          <svg
                            v-if="alert.type === 'exceed'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m5 12 7-7 7 7"></path>
                            <path d="M12 19V5"></path>
                          </svg>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="font-medium">
                            {{ alert.type === "exceed" ? "Above" : "Below" }}
                            threshold
                          </p>
                          <p class="text-sm text-slate-500">{{ alert.day }}</p>
                        </div>
                      </div>
                      <div
                        class="flex justify-between w-full sm:w-auto sm:text-right"
                      >
                        <p class="font-medium">{{ alert.value }}°C</p>
                        <p class="text-sm text-slate-500 ml-4">
                          Threshold: {{ alert.threshold }}°C
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-center h-32 bg-slate-50 rounded-lg text-slate-500 text-sm"
                  >
                    No alerts for this week
                  </div>
                </div>
              </div>
            </div>

            <!-- Humidity Alerts -->
            <div
              class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-md"
                  >
                    <i class="fas fa-tint text-xl sm:text-2xl"></i>
                  </div>
                  <h3 class="text-lg font-bold text-slate-800">
                    Humidity Alerts
                  </h3>
                </div>
              </div>

              <!-- Tabs -->
              <div class="flex gap-2 mb-4">
                <button
                  class="px-3 py-2 text-sm rounded-lg transition-colors"
                  :class="{
                    'bg-slate-100 font-medium': humidityActiveTab === 'day',
                    'hover:bg-slate-50': humidityActiveTab !== 'day',
                  }"
                  @click="humidityActiveTab = 'day'"
                >
                  Today
                </button>
                <button
                  class="px-3 py-2 text-sm rounded-lg transition-colors"
                  :class="{
                    'bg-slate-100 font-medium': humidityActiveTab === 'week',
                    'hover:bg-slate-50': humidityActiveTab !== 'week',
                  }"
                  @click="humidityActiveTab = 'week'"
                >
                  This Week
                </button>
              </div>

              <!-- Alert Content -->
              <div class="min-h-[200px]">
                <div v-if="humidityActiveTab === 'day'">
                  <div v-if="humidityAlerts.day.length > 0" class="space-y-3">
                    <div
                      v-for="(alert, index) in humidityAlerts.day"
                      :key="index"
                      class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg hover:shadow-sm transition-shadow gap-3 sm:gap-0"
                    >
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 rounded-full flex items-center justify-center"
                          :class="
                            alert.type === 'exceed'
                              ? 'bg-red-100 text-red-500'
                              : 'bg-blue-100 text-blue-500'
                          "
                        >
                          <svg
                            v-if="alert.type === 'exceed'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m5 12 7-7 7 7"></path>
                            <path d="M12 19V5"></path>
                          </svg>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="font-medium">
                            {{ alert.type === "exceed" ? "Above" : "Below" }}
                            threshold
                          </p>
                          <p class="text-sm text-slate-500">{{ alert.time }}</p>
                        </div>
                      </div>
                      <div
                        class="flex justify-between w-full sm:w-auto sm:text-right"
                      >
                        <p class="font-medium">{{ alert.value }}%</p>
                        <p class="text-sm text-slate-500 ml-4">
                          Threshold: {{ alert.threshold }}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-center h-32 bg-slate-50 rounded-lg text-slate-500 text-sm"
                  >
                    No alerts for today
                  </div>
                </div>
                <div v-if="humidityActiveTab === 'week'">
                  <div v-if="humidityAlerts.week.length > 0" class="space-y-3">
                    <div
                      v-for="(alert, index) in humidityAlerts.week"
                      :key="index"
                      class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg hover:shadow-sm transition-shadow gap-3 sm:gap-0"
                    >
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 rounded-full flex items-center justify-center"
                          :class="
                            alert.type === 'exceed'
                              ? 'bg-red-100 text-red-500'
                              : 'bg-blue-100 text-blue-500'
                          "
                        >
                          <svg
                            v-if="alert.type === 'exceed'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m5 12 7-7 7 7"></path>
                            <path d="M12 19V5"></path>
                          </svg>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="font-medium">
                            {{ alert.type === "exceed" ? "Above" : "Below" }}
                            threshold
                          </p>
                          <p class="text-sm text-slate-500">{{ alert.day }}</p>
                        </div>
                      </div>
                      <div
                        class="flex justify-between w-full sm:w-auto sm:text-right"
                      >
                        <p class="font-medium">{{ alert.value }}%</p>
                        <p class="text-sm text-slate-500 ml-4">
                          Threshold: {{ alert.threshold }}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-center h-32 bg-slate-50 rounded-lg text-slate-500 text-sm"
                  >
                    No alerts for this week
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
import { ref, onMounted, watch, onUnmounted } from "vue";
import Chart from "chart.js/auto";
import Nav from "@/components/templates/Nav.vue";
import reportsServices from "@/services/reportServices.js";

// Mobile navigation state
const isMobile = ref(false);
const isMobileNavOpen = ref(false);

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
  if (isMobileNavOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

// Check if mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) {
    isMobileNavOpen.value = false;
    document.body.style.overflow = "";
  }
};

const temperatureAlerts = ref({ day: [], week: [] });
const humidityAlerts = ref({ day: [], week: [] });

// Tab states for environmental alerts
const tempActiveTab = ref("day");
const humidityActiveTab = ref("day");

// Chart references
const waterWeeklyChart = ref(null);
const containerCharts = ref({});

// Chart instances
let waterWeeklyChartInstance = null;
let containerChartInstances = {};

// Feed container active state
const activeContainer = ref(1);

// Sample data
const waterConsumptionData = ref({
  today: 0,
  yesterday: 0,
  weekAverage: 0,
  unit: "Liters",
  weekly: [], // ✅ make sure this is an array, not undefined
});

const feedContainers = ref([
  {
    id: 1,
    name: "Container A",
    today: 0,
    yesterday: 0,
    weekAverage: 0,
    unit: "%",
    status: "normal",
    weekly: [
      { day: "Mon", value: 0 },
      { day: "Tue", value: 0 },
      { day: "Wed", value: 0 },
      { day: "Thu", value: 0 },
      { day: "Fri", value: 0 },
      { day: "Sat", value: 0 },
      { day: "Sun", value: 0 },
    ],
    color: "#8b5cf6",
  },
  {
    id: 2,
    name: "Container B",
    today: 0,
    yesterday: 0,
    weekAverage: 0,
    unit: "kg",
    status: "normal",
    weekly: [
      { day: "Mon", value: 0 },
      { day: "Tue", value: 0 },
      { day: "Wed", value: 0 },
      { day: "Thu", value: 0 },
      { day: "Fri", value: 0 },
      { day: "Sat", value: 0 },
      { day: "Sun", value: 0 },
    ],
    color: "#ef4444",
  },
  {
    id: 3,
    name: "Container C",
    today: 0,
    yesterday: 0,
    weekAverage: 0,
    unit: "kg",
    status: "normal",
    weekly: [
      { day: "Mon", value: 0 },
      { day: "Tue", value: 0 },
      { day: "Wed", value: 0 },
      { day: "Thu", value: 0 },
      { day: "Fri", value: 0 },
      { day: "Sat", value: 0 },
      { day: "Sun", value: 0 },
    ],
    color: "#3b82f6",
  },
]);

// Helper function to get status class
const getStatusClass = (status) => {
  switch (status) {
    case "high":
      return "bg-red-500";
    case "low":
      return "bg-blue-500";
    default:
      return "bg-green-500";
  }
};

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

// Initialize charts
const initializeCharts = () => {
  // ✅ FIXED: .value.weekly instead of .weekly
  if (
    !waterWeeklyChart.value ||
    !Array.isArray(waterConsumptionData.value.weekly)
  )
    return;

  const ctx = waterWeeklyChart.value.getContext("2d");

  if (waterWeeklyChartInstance) waterWeeklyChartInstance.destroy();

  waterWeeklyChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: waterConsumptionData.value.weekly.map((item) => item.day),
      datasets: [
        {
          label: "Water Consumption (Liters)",
          data: waterConsumptionData.value.weekly.map((item) => item.value),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: "#3b82f6",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${Math.round(context.raw)} Liters`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
  // Initialize container charts
  feedContainers.value.forEach((container) => {
    const chartElement = containerCharts.value[container.id];

    if (!chartElement) return;

    const ctx = chartElement.getContext("2d");

    // Destroy previous instance if it exists
    if (containerChartInstances[container.id]) {
      containerChartInstances[container.id].destroy();
    }

    // Create new chart instance
    containerChartInstances[container.id] = new Chart(ctx, {
      type: "line",
      data: {
        labels: container.weekly.map((item) => item.day),
        datasets: [
          {
            label: `${container.name} Feed Consumption (${container.unit})`,
            data: container.weekly.map((item) => item.value),
            borderColor: container.color,
            backgroundColor: `${container.color}1a`, // ~10% opacity
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: container.color,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw} ${container.unit}`;
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  });
};

// Watch for container changes to reinitialize charts
watch(activeContainer, () => {
  setTimeout(() => {
    initializeCharts();
  }, 50);
});

// Watch for window resize to handle responsive charts
const handleResize = () => {
  checkMobile();
  setTimeout(() => {
    initializeCharts();
  }, 100);
};

onMounted(async () => {
  checkMobile();
  window.addEventListener("resize", handleResize);

  waterConsumptionData.value = await reportsServices.fetchWaterLevelLogs();
  feedContainers.value = await reportsServices.fetchFeedLevelLogs();
  console.log(feedContainers);
  initializeCharts();

  await reportsServices.fetchAlerts().then((result) => {
    temperatureAlerts.value.day = result.temperatureAlerts.day;
    temperatureAlerts.value.week = result.temperatureAlerts.week;
    humidityAlerts.value.day = result.humidityAlerts.day;
    humidityAlerts.value.week = result.humidityAlerts.week;
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  document.body.style.overflow = "";
});
</script>

<style scoped>
/* Custom scrollbar for mobile nav */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Chart container styling */
canvas {
  border-radius: 0.5rem;
}

/* Container tabs scrolling */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Ensure proper spacing on very small screens */
@media (max-width: 480px) {
  .text-2xl {
    font-size: 1.25rem;
  }

  .text-3xl {
    font-size: 1.5rem;
  }
}
</style>
