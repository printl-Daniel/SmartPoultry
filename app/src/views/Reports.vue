<template>
  <div class="dashboard-container">
    <!-- Navigation Sidebar -->
    <Nav />
    <!-- Main Content -->
    <div class="main-content">
      <main class="content">
        <div class="grid">
          <!-- Water Consumption Card -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Water Consumption</h2>
            </div>
            <div class="card-body">
              <div class="metrics">
                <div class="metric primary">
                  <p class="metric-label">Today</p>
                  <p class="metric-value">
                    {{ waterConsumptionData.today }}
                    {{ waterConsumptionData.unit }}
                  </p>
                </div>
                <div class="metric">
                  <p class="metric-label">Yesterday</p>
                  <p class="metric-value">
                    {{ waterConsumptionData.yesterday }}
                    {{ waterConsumptionData.unit }}
                  </p>
                </div>
                <div class="metric">
                  <p class="metric-label">Week Avg</p>
                  <p class="metric-value">
                    {{ waterConsumptionData.weekAverage }}
                    {{ waterConsumptionData.unit }}
                  </p>
                </div>
              </div>

              <div class="chart-wrapper">
                <h3 class="chart-title">Weekly Consumption</h3>
                <div class="chart">
                  <canvas ref="waterWeeklyChart" height="200"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Feed Consumption Card -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Feed Consumption</h2>
            </div>
            <div class="card-body">
              <div class="metrics">
                <div class="metric primary">
                  <p class="metric-label">Today</p>
                  <p class="metric-value">
                    {{ feedConsumptionData.today }}
                    {{ feedConsumptionData.unit }}
                  </p>
                </div>
                <div class="metric">
                  <p class="metric-label">Yesterday</p>
                  <p class="metric-value">
                    {{ feedConsumptionData.yesterday }}
                    {{ feedConsumptionData.unit }}
                  </p>
                </div>
                <div class="metric">
                  <p class="metric-label">Week Avg</p>
                  <p class="metric-value">
                    {{ feedConsumptionData.weekAverage }}
                    {{ feedConsumptionData.unit }}
                  </p>
                </div>
              </div>

              <div class="chart-wrapper">
                <h3 class="chart-title">Weekly Consumption</h3>
                <div class="chart">
                  <canvas ref="feedWeeklyChart" height="200"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Temperature Alerts Card -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Temperature Alerts</h2>
            </div>
            <div class="card-body">
              <div class="tabs">
                <div class="tabs-header">
                  <button
                    class="tab-btn"
                    :class="{ active: tempActiveTab === 'day' }"
                    @click="tempActiveTab = 'day'"
                  >
                    Today
                  </button>
                  <button
                    class="tab-btn"
                    :class="{ active: tempActiveTab === 'week' }"
                    @click="tempActiveTab = 'week'"
                  >
                    This Week
                  </button>
                </div>
                <div class="tab-content">
                  <div v-if="tempActiveTab === 'day'">
                    <div v-if="temperatureAlerts.day.length > 0" class="alerts">
                      <div
                        v-for="(alert, index) in temperatureAlerts.day"
                        :key="index"
                        class="alert-item"
                      >
                        <div class="alert-left">
                          <div
                            class="alert-icon"
                            :class="
                              alert.type === 'exceed' ? 'exceed' : 'below'
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
                          <div class="alert-info">
                            <p class="alert-title">
                              {{ alert.type === "exceed" ? "Above" : "Below" }}
                              threshold
                            </p>
                            <p class="alert-subtitle">{{ alert.time }}</p>
                          </div>
                        </div>
                        <div class="alert-right">
                          <p class="alert-value">{{ alert.value }}°C</p>
                          <p class="alert-threshold">
                            Threshold: {{ alert.threshold }}°C
                          </p>
                        </div>
                      </div>
                    </div>
                    <div v-else class="no-alerts">No alerts for today</div>
                  </div>
                  <div v-if="tempActiveTab === 'week'">
                    <div
                      v-if="temperatureAlerts.week.length > 0"
                      class="alerts"
                    >
                      <div
                        v-for="(alert, index) in temperatureAlerts.week"
                        :key="index"
                        class="alert-item"
                      >
                        <div class="alert-left">
                          <div
                            class="alert-icon"
                            :class="
                              alert.type === 'exceed' ? 'exceed' : 'below'
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
                          <div class="alert-info">
                            <p class="alert-title">
                              {{ alert.type === "exceed" ? "Above" : "Below" }}
                              threshold
                            </p>
                            <p class="alert-subtitle">{{ alert.day }}</p>
                          </div>
                        </div>
                        <div class="alert-right">
                          <p class="alert-value">{{ alert.value }}°C</p>
                          <p class="alert-threshold">
                            Threshold: {{ alert.threshold }}°C
                          </p>
                        </div>
                      </div>
                    </div>
                    <div v-else class="no-alerts">No alerts for this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Humidity Alerts Card -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Humidity Alerts</h2>
            </div>
            <div class="card-body">
              <div class="tabs">
                <div class="tabs-header">
                  <button
                    class="tab-btn"
                    :class="{ active: humidityActiveTab === 'day' }"
                    @click="humidityActiveTab = 'day'"
                  >
                    Today
                  </button>
                  <button
                    class="tab-btn"
                    :class="{ active: humidityActiveTab === 'week' }"
                    @click="humidityActiveTab = 'week'"
                  >
                    This Week
                  </button>
                </div>
                <div class="tab-content">
                  <div v-if="humidityActiveTab === 'day'">
                    <div v-if="humidityAlerts.day.length > 0" class="alerts">
                      <div
                        v-for="(alert, index) in humidityAlerts.day"
                        :key="index"
                        class="alert-item"
                      >
                        <div class="alert-left">
                          <div
                            class="alert-icon"
                            :class="
                              alert.type === 'exceed' ? 'exceed' : 'below'
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
                          <div class="alert-info">
                            <p class="alert-title">
                              {{ alert.type === "exceed" ? "Above" : "Below" }}
                              threshold
                            </p>
                            <p class="alert-subtitle">{{ alert.time }}</p>
                          </div>
                        </div>
                        <div class="alert-right">
                          <p class="alert-value">{{ alert.value }}%</p>
                          <p class="alert-threshold">
                            Threshold: {{ alert.threshold }}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div v-else class="no-alerts">No alerts for today</div>
                  </div>
                  <div v-if="humidityActiveTab === 'week'">
                    <div v-if="humidityAlerts.week.length > 0" class="alerts">
                      <div
                        v-for="(alert, index) in humidityAlerts.week"
                        :key="index"
                        class="alert-item"
                      >
                        <div class="alert-left">
                          <div
                            class="alert-icon"
                            :class="
                              alert.type === 'exceed' ? 'exceed' : 'below'
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
                          <div class="alert-info">
                            <p class="alert-title">
                              {{ alert.type === "exceed" ? "Above" : "Below" }}
                              threshold
                            </p>
                            <p class="alert-subtitle">{{ alert.day }}</p>
                          </div>
                        </div>
                        <div class="alert-right">
                          <p class="alert-value">{{ alert.value }}%</p>
                          <p class="alert-threshold">
                            Threshold: {{ alert.threshold }}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div v-else class="no-alerts">No alerts for this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import Nav from "@/components/templates/Nav.vue";
import reportsServices from "@/services/reportServices.js";

// Sidebar state
const sidebarCollapsed = ref(false);
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const temperatureAlerts = ref({ day: [], week: [] });
const humidityAlerts = ref({ day: [], week: [] });

// Tab states for environmental alerts
const tempActiveTab = ref("day");
const humidityActiveTab = ref("day");

// Chart references
const waterWeeklyChart = ref(null);
const feedWeeklyChart = ref(null);

// Chart instances
let waterWeeklyChartInstance = null;
let feedWeeklyChartInstance = null;

// Sample data
const waterConsumptionData = {
  today: 2150,
  yesterday: 2100,
  weekAverage: 2085,
  unit: "Liters",
  weekly: [
    { day: "Mon", value: 2085 * 0.95 },
    { day: "Tue", value: 2085 * 1.02 },
    { day: "Wed", value: 2085 * 0.98 },
    { day: "Thu", value: 2085 * 1.05 },
    { day: "Fri", value: 2085 * 1.01 },
    { day: "Sat", value: 2100 },
    { day: "Sun", value: 2150 },
  ],
};

const feedConsumptionData = {
  today: 450,
  yesterday: 425,
  weekAverage: 430,
  unit: "kg",
  weekly: [
    { day: "Mon", value: 410 },
    { day: "Tue", value: 425 },
    { day: "Wed", value: 420 },
    { day: "Thu", value: 440 },
    { day: "Fri", value: 435 },
    { day: "Sat", value: 425 },
    { day: "Sun", value: 450 },
  ],
};

// Initialize charts
const initializeCharts = () => {
  // Destroy existing chart instances to prevent memory leaks
  if (waterWeeklyChartInstance) waterWeeklyChartInstance.destroy();
  if (feedWeeklyChartInstance) feedWeeklyChartInstance.destroy();

  // Initialize water weekly chart
  if (waterWeeklyChart.value) {
    const ctx = waterWeeklyChart.value.getContext("2d");
    waterWeeklyChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: waterConsumptionData.weekly.map((item) => item.day),
        datasets: [
          {
            label: "Water Consumption (Liters)",
            data: waterConsumptionData.weekly.map((item) => item.value),
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
  }

  // Initialize feed weekly chart
  if (feedWeeklyChart.value) {
    const ctx = feedWeeklyChart.value.getContext("2d");
    feedWeeklyChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: feedConsumptionData.weekly.map((item) => item.day),
        datasets: [
          {
            label: "Feed Consumption (kg)",
            data: feedConsumptionData.weekly.map((item) => item.value),
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#8b5cf6",
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
                return `${context.raw} kg`;
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
  }
};

onMounted(() => {
  initializeCharts();
  reportsServices.fetchAlerts().then((result) => {
    temperatureAlerts.value.day = result.temperatureAlerts.day;
    temperatureAlerts.value.week = result.temperatureAlerts.week;
    humidityAlerts.value.day = result.humidityAlerts.day;
    humidityAlerts.value.week = result.humidityAlerts.week;
  });
});
</script>

<style scoped>
/* Base styles */

.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  color: #334155;
}

/* Main content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
}

.content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 500px), 1fr));
  gap: 24px;
}

/* Card styles */
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.card-body {
  padding: 20px;
}

/* Metrics */
.metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.metric {
  text-align: left;
}

.metric-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 18px;
  font-weight: 500;
  color: #1e293b;
}

.metric.primary .metric-value {
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
}

/* Chart styles */
.chart-wrapper {
  width: 100%;
}

.chart-title {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 12px;
}

.chart {
  position: relative;
  height: 200px;
}

/* Tabs */
.tabs {
  width: 100%;
}

.tabs-header {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 8px;
}

.tab-btn {
  padding: 8px 16px;
  background: none;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  background-color: #f1f5f9;
  color: #334155;
}

.tab-btn.active {
  background-color: #f1f5f9;
  color: #0f172a;
  font-weight: 500;
}

.tab-content {
  position: relative;
  min-height: 200px;
}

/* Alerts */
.alerts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.alert-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.alert-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.alert-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.alert-icon.exceed {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.alert-icon.below {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.alert-info {
  display: flex;
  flex-direction: column;
}

.alert-title {
  font-weight: 500;
  color: #1e293b;
}

.alert-subtitle {
  font-size: 14px;
  color: #64748b;
}

.alert-right {
  text-align: right;
}

.alert-value {
  font-weight: 500;
  color: #1e293b;
}

.alert-threshold {
  font-size: 14px;
  color: #64748b;
}

.no-alerts {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: #64748b;
  font-size: 14px;
  background-color: #f8fafc;
  border-radius: 6px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }

  .metrics {
    flex-direction: column;
    gap: 16px;
  }

  .metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .alert-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .alert-right {
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
}
</style>
