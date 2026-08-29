<template>
  <div class="dashboard-container">
    <!-- Navigation Sidebar -->
    <Nav />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Sensor Management Header -->
      <header class="bg-white border-b border-slate-200 shadow-sm">
        <div
          class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
        >
          <div
            class="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start"
          >
            <div
              class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-3 rounded-xl shadow-md flex-shrink-0"
            >
              <i class="fas fa-microchip text-xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-slate-800">
                Device Management
              </h1>
              <p class="text-sm text-slate-500">Manage your devices</p>
            </div>
          </div>
        </div>
      </header>

      <main class="content">
        <div class="grid-row">
          <!-- DHT22 Sensors Card -->
          <div class="card">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h2 class="card-title flex items-center gap-2">
                  <i class="fas fa-thermometer-half text-blue-600"></i>
                  DHT22 Sensors ({{ dht22Sensors.length }})
                </h2>
              </div>
            </div>
            <div class="card-body">
              <div v-if="dht22Sensors.length > 0" class="sensor-list">
                <div
                  v-for="sensor in dht22Sensors"
                  :key="sensor.name"
                  class="sensor-item"
                >
                  <div class="sensor-left">
                    <div class="sensor-icon dht22">
                      <i class="fas fa-thermometer-half"></i>
                    </div>
                    <div class="sensor-info">
                      <p class="sensor-name font-semibold">{{ sensor.name }}</p>
                      <p class="sensor-value text-sm text-gray-500">
                        Temperature: {{ sensor.value }} °C || Humidity:
                        {{ sensor.humidity }} %
                      </p>
                    </div>
                  </div>
                  <div class="sensor-right">
                    <button
                      @click="deleteSensor(sensor.name)"
                      class="delete-btn"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="no-items">
                <i
                  class="fas fa-thermometer-half text-4xl text-gray-300 mb-2"
                ></i>
                <p>No DHT22 sensors configured</p>
              </div>
            </div>
          </div>

          <!-- MQ135 Sensors Card -->
          <div class="card">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h2 class="card-title flex items-center gap-2">
                  <i class="fas fa-wind text-green-600"></i>
                  MQ135 Sensors ({{ mq135Sensors.length }})
                </h2>
              </div>
            </div>
            <div class="card-body">
              <div v-if="mq135Sensors.length > 0" class="sensor-list">
                <div
                  v-for="sensor in mq135Sensors"
                  :key="sensor.name"
                  class="sensor-item"
                >
                  <div class="sensor-left">
                    <div class="sensor-icon mq135">
                      <i class="fas fa-wind"></i>
                    </div>
                    <div class="sensor-info">
                      <p class="sensor-name">{{ sensor.name }}</p>
                      <p class="sensor-location">
                        Raw Value: {{ sensor.value }}
                      </p>
                    </div>
                  </div>
                  <div class="sensor-right">
                    <button
                      @click="deleteSensor(sensor.name)"
                      class="delete-btn"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="no-items">
                <i class="fas fa-wind text-4xl text-gray-300 mb-2"></i>
                <p>No MQ135 sensors configured</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Feed Zones Section -->
        <div class="grid-row">
          <div class="card full-width">
            <div class="card-header">
              <div class="flex items-center justify-between">
                <h2 class="card-title flex items-center gap-2">
                  <i class="fas fa-utensils text-purple-600"></i>
                  Feed Zones ({{ feedZones.length }})
                </h2>
              </div>
            </div>
            <div class="card-body">
              <div v-if="feedZones.length > 0" class="feed-zone-grid">
                <div
                  v-for="zone in feedZones"
                  :key="zone.name"
                  class="feed-zone-item"
                >
                  <div class="feed-zone-header">
                    <div class="feed-zone-icon">
                      <i class="fas fa-utensils"></i>
                    </div>
                    <button
                      @click="deleteFeedZone(zone.name)"
                      class="delete-btn"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                  <div class="feed-zone-info">
                    <h3 class="feed-zone-name">{{ zone.name }}</h3>
                    <div class="feed-zone-details">
                      <div class="detail-item">
                        <span class="detail-label">Current Capacity:</span>
                        <span class="detail-value">{{ zone.value }} %</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="no-items">
                <i class="fas fa-utensils text-4xl text-gray-300 mb-2"></i>
                <p>No feed zones configured</p>
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
import Nav from "@/components/templates/Nav.vue";
import sensorsServices from "@/services/sensorsServices.js";
import feedingServices from "@/services/feedingServices.js";

// Data
const dht22Sensors = ref([]);
const mq135Sensors = ref([]);
const feedZones = ref([]);

onMounted(async () => {
  // Temperature listener
  sensorsServices.listenForTemperatures((temps) => {
    dht22Sensors.value = Object.entries(temps)
      .map(([key, tempValue]) => {
        const number = key.replace(/\D/g, "");
        const matchingHumidity =
          dht22Sensors.value.find(
            (s) => s.name === `Temperature Sensor ${number}`
          )?.humidity || 0;

        return {
          name: `Temperature Sensor ${number}`,
          value: tempValue,
          humidity: matchingHumidity,
          order: parseInt(number),
        };
      })
      .sort((a, b) => a.order - b.order)
      .map(({ order, ...sensor }) => sensor);
  });

  // Humidity listener
  sensorsServices.listenForHumidity((hums) => {
    dht22Sensors.value = dht22Sensors.value
      .map((sensor) => {
        const number = sensor.name.replace(/\D/g, "");
        const key = `hum${number}`;
        return {
          ...sensor,
          humidity: hums[key] ?? 0,
          order: parseInt(number),
        };
      })
      .sort((a, b) => a.order - b.order)
      .map(({ order, ...sensor }) => sensor);
  });

  // Air quality listener
  sensorsServices.listenForAirQuality((air) => {
    mq135Sensors.value = Object.entries(air)
      .map(([key, value]) => {
        const number = key.replace(/\D/g, "");
        return {
          name: `Air Quality Sensor ${number}`,
          value,
          order: parseInt(number),
        };
      })
      .sort((a, b) => a.order - b.order)
      .map(({ order, ...sensor }) => sensor);
  });

  // Feed zones
  const feed = await feedingServices.getFeeding();
  feedZones.value = Object.entries(feed)
    .map(([key, value]) => {
      const zoneNumber = key.replace(/\D/g, "");
      return {
        name: `Feed Zone ${zoneNumber}`,
        value,
        order: parseInt(zoneNumber),
      };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ order, ...zone }) => zone);
});

const deleteSensor = async (name) => {
  const isTemperature = name.includes("Temperature Sensor");
  const isAirQuality = name.includes("Air Quality Sensor");

  if (!isTemperature && !isAirQuality) {
    errorAlert("Error!", "Unknown sensor type.");
    return;
  }

  const confirmed = await sensorsServices.deleteSensor(name);

  if (!confirmed) return;

  if (isTemperature) {
    dht22Sensors.value = dht22Sensors.value.filter(
      (sensor) => sensor.name !== name
    );
  } else if (isAirQuality) {
    mq135Sensors.value = mq135Sensors.value.filter(
      (sensor) => sensor.name !== name
    );
  }
};

const deleteFeedZone = async (name) => {
  const confirmed = await feedingServices.deleteFeedZone(name);
  if (!confirmed) return;
  feedZones.value = feedZones.value.filter((zone) => zone.name !== name);
};
</script>

<style scoped>
/* Base styles matching the original design */
.dashboard-container {
  display: flex;
  max-height: 100vh;
  background-color: #f5f7fa;
  color: #334155;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 24px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.card.full-width {
  grid-column: 1 / -1;
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

/* Sensor list styles */
.sensor-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sensor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: all 0.2s;
}

.sensor-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.sensor-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sensor-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.sensor-icon.dht22 {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.sensor-icon.mq135 {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.sensor-info {
  display: flex;
  flex-direction: column;
}

.sensor-name {
  font-weight: 500;
  color: #1e293b;
}

.sensor-location {
  font-size: 14px;
  color: #64748b;
}

.sensor-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sensor-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-active {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-inactive {
  background-color: rgba(156, 163, 175, 0.1);
  color: #6b7280;
}

.delete-btn {
  padding: 6px;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.delete-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

/* Feed zone styles */
.feed-zone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.feed-zone-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s;
}

.feed-zone-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.feed-zone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.feed-zone-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(147, 51, 234, 0.1);
  color: #9333ea;
}

.feed-zone-name {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.feed-zone-location {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
}

.feed-zone-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 14px;
  color: #64748b;
}

.detail-value {
  font-weight: 500;
  color: #1e293b;
}

/* No items state */
.no-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: #64748b;
  font-size: 14px;
  background-color: #f8fafc;
  border-radius: 6px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #f1f5f9;
}

.btn-secondary {
  padding: 8px 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #f1f5f9;
}

.btn-primary {
  padding: 8px 16px;
  background-color: #3b82f6;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .grid-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sensor-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .sensor-right {
    width: 100%;
    justify-content: space-between;
  }

  .feed-zone-grid {
    grid-template-columns: 1fr;
  }
}
</style>
