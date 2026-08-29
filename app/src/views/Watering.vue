\
<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <Nav />

      <!-- Main Content -->
      <main class="flex-1 overflow-hidden flex flex-col">
        <!-- Dashboard Header -->
        <header class="bg-white border-b border-gray-200 shadow-sm">
          <div
            class="container mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div class="flex items-center gap-4">
              <div
                class="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-3 rounded-xl shadow-md"
              >
                <i class="fas fa-tint text-2xl"></i>
              </div>
              <div>
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
                  Water Management System
                </h1>
                <p class="text-sm text-gray-600">
                  Real-time monitoring and automated control
                </p>
              </div>
            </div>
            <div
              class="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg shadow-sm border border-blue-100 flex items-center gap-2"
            >
              <i class="fas fa-broadcast-tower text-sm"></i>
              <span class="font-medium text-sm">Live Data</span>
            </div>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <!-- Section Title -->
          <div class="flex items-center gap-3">
            <i class="fas fa-cogs text-xl text-blue-500"></i>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
              System Overview
            </h2>
          </div>

          <!-- System Status
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <h3
              class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"
            >
              <i class="fas fa-shield-alt text-blue-500"></i>
              System Status
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                class="status-card"
                v-for="(status, index) in systemStatus"
                :key="index"
              >
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center"
                  :class="status.bgClass"
                >
                  <i :class="[status.icon, status.iconClass]"></i>
                </div>

                <div>
                  <p class="font-medium text-gray-900">{{ status.name }}</p>
                  <p :class="status.statusClass" class="text-sm font-medium">
                    {{ status.status }}
                  </p>
                </div>
              </div>
            </div>
          </div> -->

          <!-- Water Management Row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Water Quantity -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div class="flex justify-between items-center mb-6">
                <h3
                  class="text-lg font-semibold text-gray-900 flex items-center gap-2"
                >
                  <i class="fas fa-water text-blue-500"></i>
                  Main Container Water Quantity
                </h3>
                <span
                  :class="getWaterStatusClass(waterQuantity)"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                >
                  <i class="fas fa-check-circle mr-1"></i>
                  {{ getWaterStatus(waterQuantity) }}
                </span>
              </div>

              <div class="relative w-full h-48 mx-auto mb-6">
                <div
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-44 bg-blue-50 border-2 border-blue-500 rounded-lg overflow-hidden"
                >
                  <div
                    class="water absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out"
                    :style="{ height: waterQuantity + '%' }"
                  ></div>
                </div>

                <!-- Percentage Display -->
                <div
                  class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border"
                >
                  <span class="font-semibold text-gray-900"
                    >{{ waterQuantity }}%</span
                  >
                </div>

                <!-- Scale Markers -->
                <div
                  class="absolute top-0 right-8 h-full flex flex-col justify-between py-2 text-xs text-gray-500"
                >
                  <div class="flex items-center">
                    <div class="w-2 h-px bg-gray-400 mr-1"></div>
                    <span>100%</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-px bg-gray-400 mr-1"></div>
                    <span>75%</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-px bg-gray-400 mr-1"></div>
                    <span>50%</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-px bg-gray-400 mr-1"></div>
                    <span>25%</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-2 h-px bg-gray-400 mr-1"></div>
                    <span>0%</span>
                  </div>
                </div>
              </div>

              <!-- Container Details -->
              <div class="space-y-3 pt-10">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 flex items-center gap-1">
                    <i class="fas fa-tachometer-alt text-sm"></i>
                    Current Capacity:
                  </span>
                  <span class="text-sm text-slate-500">
                    ({{ Math.round((waterQuantity / 100) * 80) }}L / 80L)
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 flex items-center gap-1">
                    <i class="fas fa-database text-sm"></i>
                    Total Capacity:
                  </span>
                  <span class="font-medium text-gray-900"
                    >{{ totalCapacity }} Liters</span
                  >
                </div>
              </div>
            </div>

            <!-- Water Cleaning -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div class="flex justify-between items-center mb-6">
                <h3
                  class="text-lg font-semibold text-gray-900 flex items-center gap-2"
                >
                  <i class="fas fa-broom text-teal-500"></i>
                  Water Tanks Cleaning
                </h3>
                <div class="flex items-center">
                  <i class="fas fa-calendar-alt text-teal-500 mr-2"></i>
                  <span class="text-sm font-medium text-gray-600">{{
                    formatDate(nextCleaningDate)
                  }}</span>
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-medium text-gray-700"
                      >Cleaning Schedule Progress</span
                    >
                    <span class="text-sm font-medium text-gray-600"
                      >{{ daysUntilCleaning }} days remaining</span
                    >
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-teal-500 h-2 rounded-full transition-all duration-500"
                      :style="{ width: cleaningProgress + '%' }"
                    ></div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-4 pt-4">
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-500 mb-1">Last Cleaning</p>
                    <p class="font-medium text-gray-900">
                      {{ formatDate(lastCleaningDate) }}
                    </p>
                  </div>
                </div>

                <!-- Cleaning Schedule Adjuster -->
                <div class="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-700 mb-3">
                    Adjust Cleaning Schedule
                  </h4>

                  <div class="space-y-3">
                    <div>
                      <label
                        class="text-sm text-gray-600 block mb-1 flex items-center gap-1"
                      >
                        <i class="fas fa-calendar text-sm"></i>
                        Next Cleaning Date
                      </label>
                      <input
                        type="date"
                        v-model="nextCleaningDate"
                        class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        class="text-sm text-gray-600 block mb-1 flex items-center gap-1"
                      >
                        <i class="fas fa-clock text-sm"></i>
                        Cleaning Time
                      </label>
                      <input
                        type="time"
                        v-model="cleaningTime"
                        class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    @click="updateCleaningSchedule"
                    class="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mt-4 transition-colors duration-200 font-medium"
                  >
                    <i class="fas fa-save mr-2"></i> Update Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Watering Schedule -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
              <h3
                class="text-lg font-semibold text-gray-900 flex items-center gap-2"
              >
                <i class="fas fa-calendar-alt text-teal-500"></i>
                Watering Schedule
              </h3>
            </div>

            <!-- Schedule View -->
            <div v-if="!isEditingSchedule">
              <div
                v-if="wateringSchedule.length === 0"
                class="text-center py-12 text-gray-500"
              >
                <i class="fas fa-calendar-alt text-4xl text-gray-400 mb-4"></i>
                <p class="text-lg font-medium">No watering schedules set</p>
                <p class="text-sm mt-1">
                  Click the button below to add your first schedule
                </p>
              </div>

              <div v-else class="space-y-3">
                <div
                  class="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  v-for="(schedule, index) in wateringSchedule"
                  :key="index"
                >
                  <div class="flex items-center gap-3">
                    <div
                      :class="getIconClass(schedule.rawTime)"
                      class="w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <i
                        :class="getIcon(schedule.rawTime)"
                        class="text-gray-700"
                      ></i>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {{ getTimeName(schedule.rawTime) }}
                      </p>
                      <div
                        class="flex flex-wrap items-center text-xs text-gray-500 gap-2"
                      >
                        <span class="flex items-center gap-1">
                          <i class="fas fa-cog text-xs"></i>
                          {{ schedule.mode }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span class="font-semibold text-gray-900 text-lg">{{
                    schedule.timeSlot
                  }}</span>
                </div>
              </div>

              <button
                @click="editSchedule"
                class="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors duration-200 font-medium"
              >
                <i class="fas fa-edit mr-2"></i>
                Edit Schedules
              </button>
            </div>

            <!-- Schedule Editing -->
            <div v-if="isEditingSchedule" class="space-y-4">
              <div
                v-if="wateringSchedule.length === 0"
                class="text-center py-8 text-gray-500"
              >
                <p>No schedules yet. Add your first watering schedule below.</p>
              </div>

              <div
                v-for="(schedule, index) in wateringSchedule"
                :key="index"
                class="bg-gray-50 p-4 rounded-lg relative border border-gray-200"
              >
                <button
                  @click="removeSchedule(index)"
                  class="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Remove schedule"
                >
                  <i class="fas fa-times"></i>
                </button>

                <div class="flex items-center mb-4 gap-2">
                  <div
                    :class="getIconClass(schedule.rawTime)"
                    class="w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <i
                      :class="getIcon(schedule.rawTime)"
                      class="text-gray-700"
                    ></i>
                  </div>
                  <span class="font-medium text-gray-900">{{
                    getTimeName(schedule.rawTime)
                  }}</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      class="text-sm font-medium text-gray-700 block mb-2 flex items-center gap-1"
                    >
                      <i class="fas fa-clock text-sm"></i>
                      Time
                    </label>
                    <input
                      type="time"
                      v-model="schedule.rawTime"
                      class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      class="text-sm font-medium text-gray-700 block mb-2 flex items-center gap-1"
                    >
                      <i class="fas fa-cog text-sm"></i>
                      Watering Mode
                    </label>
                    <select
                      v-model="schedule.mode"
                      class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option>Refill mini tanks</option>
                      <option>
                        Refill mini tanks + Mix the water + Water the chickens
                      </option>
                      <option>Refill mini tanks + Mix the water</option>
                      <option>Mix the water + Water the chickens</option>
                      <option>Water the chickens</option>
                      <option>Refill mini tanks</option>
                      <option>Dispense</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                @click="addNewSchedule"
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg flex items-center justify-center transition-colors duration-200 border-2 border-dashed border-gray-300 font-medium"
              >
                <i class="fas fa-plus mr-2"></i> Add New Watering Time
              </button>

              <div class="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  @click="saveSchedule"
                  class="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors duration-200 font-medium"
                >
                  <i class="fas fa-save mr-2"></i> Save Changes
                </button>
                <button
                  @click="cancelSchedule"
                  class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors duration-200 font-medium"
                >
                  <i class="fas fa-times mr-2"></i> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Nav from "@/components/templates/Nav.vue";
import sensorsServices from "@/services/sensorsServices.js";
import wateringServices from "@/services/wateringServices.js";

// System Status
const mainPumpStatus = ref("Error");
const mixerSystemStatus = ref("Error");

// const systemStatus = ref([
//   {
//     name: "Main Pump",
//     status: mainPumpStatus,
//     icon: "fas fa-pump-soap",
//     statusClass: "text-emerald-600",
//     bgClass: "bg-blue-100",
//     iconClass: "text-blue-600",
//   },
//   {
//     name: "Mixer System",
//     status: mixerSystemStatus,
//     icon: "fas fa-filter",
//     statusClass: "text-emerald-600",
//     bgClass: "bg-teal-100",
//     iconClass: "text-teal-600",
//   },
//   {
//     name: "Control System",
//     status: "Online",
//     icon: "fas fa-microchip",
//     statusClass: "text-emerald-600",
//     bgClass: "bg-emerald-100",
//     iconClass: "text-emerald-600",
//   },
// ]);

// Water Quantity
const waterQuantity = ref(0);
const totalCapacity = ref(80); // Total tank capacity in liters

// Water Cleaning
const nextCleaningDate = ref("");
const lastCleaningDate = ref("");
const cleaningType = ref("Clean");
const cleaningProgress = ref(0); // Progress in cleaning schedule
const daysUntilCleaning = ref(0); // Days remaining for next cleaning
const cleaningTime = ref("");

// Watering Schedule

const wateringSchedule = ref([]);
const isEditingSchedule = ref(false);

// Helper functions for water status
const getWaterStatus = (quantity) => {
  if (quantity < 20) return "Low";
  if (quantity < 40) return "Warning";
  return "Normal";
};

const getWaterStatusClass = (quantity) => {
  if (quantity < 20) return "bg-red-100 text-red-700 border-red-200";
  if (quantity < 40) return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
};

// Helper functions for schedule display
const getTimeName = (time) => {
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
};

const getIcon = (time) => {
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) return "fas fa-sun";
  if (hour >= 12 && hour < 17) return "fas fa-cloud-sun";
  if (hour >= 17 && hour < 21) return "fas fa-moon";
  return "fas fa-star";
};

const getIconClass = (time) => {
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) return "bg-yellow-100";
  if (hour >= 12 && hour < 17) return "bg-orange-100";
  if (hour >= 17 && hour < 21) return "bg-purple-100";
  return "bg-indigo-100";
};

// Methods
const formatDate = (dateString) => {
  if (!dateString) return "Not set";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const calculateDaysUntilCleaning = () => {
  if (!nextCleaningDate.value) {
    daysUntilCleaning.value = 0;
    cleaningProgress.value = 0;
    return;
  }

  const today = new Date();
  const nextDate = new Date(nextCleaningDate.value);
  const timeDifference = nextDate - today;

  const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
  daysUntilCleaning.value = daysLeft > 0 ? daysLeft : 0;

  // Assuming a fixed interval of 7 days for full cleaning
  const totalInterval = 7;
  const progress = Math.min(
    100,
    Math.max(0, Math.round(((totalInterval - daysLeft) / totalInterval) * 100))
  );
  cleaningProgress.value = progress;
};

const updateCleaningSchedule = async () => {
  const now = new Date();

  // Format next cleaning date (from user input or model)
  const formattedDate = new Date(nextCleaningDate.value).toLocaleDateString(
    "en-CA"
  );

  // Set formatted last cleaning date
  lastCleaningDate.value = now.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  // Use the cleaned 'cleaningTime' directly as HH:mm (from the v-model input)
  const formattedCleaningTime = cleaningTime.value; // This will be in "HH:mm" format

  // Calculate remaining days until next cleaning
  calculateDaysUntilCleaning();

  // Save to Firestore with the same format for cleaningTime
  try {
    await wateringServices.saveCleaningSchedule({
      nextCleaningDate: formattedDate,
      cleaningType: cleaningType.value,
      lastCleaningDate: lastCleaningDate.value,
      cleaningTime: formattedCleaningTime, // Use directly from input
    });
  } catch (error) {
    console.error("Failed to update cleaning schedule:", error);
  }
};

// Schedule management
const addNewSchedule = () => {
  // Get current time rounded to nearest hour
  const now = new Date();
  now.setMinutes(0);
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  wateringSchedule.value.push({
    timeSlot: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    rawTime: `${hours}:${minutes}`,
    mode: "Refill mini tanks",
    location: "All Locations",
  });
};

const removeSchedule = (index) => {
  wateringSchedule.value.splice(index, 1);
};

const editSchedule = () => {
  isEditingSchedule.value = true;
};

const saveSchedule = async () => {
  // Sort schedules by time
  wateringSchedule.value.sort((a, b) => {
    return a.rawTime.localeCompare(b.rawTime);
  });

  // Update timeSlot based on rawTime
  wateringSchedule.value.forEach((schedule) => {
    const time = schedule.rawTime;
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));

    schedule.timeSlot = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  try {
    await wateringServices.saveSchedules(wateringSchedule.value);
  } catch (error) {
    console.error("Failed to save watering schedule:", error);
  }

  isEditingSchedule.value = false;
};

const cancelSchedule = () => {
  isEditingSchedule.value = false;
};

onMounted(async () => {
  try {
    // Initial data fetch
    waterQuantity.value = await sensorsServices.getWaterQuantity();
    wateringSchedule.value = await wateringServices.getWaterSchedule();
    const schedule = await wateringServices.getCleaningSchedule();
    mainPumpStatus.value = await wateringServices.getMainPumpStatus();
    mixerSystemStatus.value = await wateringServices.getMixerStatus();

    // Add location to existing schedules if not present
    wateringSchedule.value.forEach((schedule) => {
      if (!schedule.location) {
        schedule.location = "All Locations";
      }
    });

    // Set cleaning schedule data
    nextCleaningDate.value = schedule.nextCleaningDate || "";
    lastCleaningDate.value = schedule.lastCleaningDate || "";
    cleaningTime.value = schedule.cleaningTime || "";

    // Live updates
    sensorsServices.listenForWaterQuantity((quantity) => {
      waterQuantity.value = quantity;
    });

    wateringServices.listenForMixer((status) => {
      mixerSystemStatus.value = status;
    });

    wateringServices.listenForMainPump((status) => {
      mainPumpStatus.value = status;
    });

    calculateDaysUntilCleaning();
  } catch (error) {
    console.error("Error initializing water management system:", error);
  }
});
</script>

<style scoped>
.status-card {
  @apply flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-all duration-200;
}

.water {
  background: linear-gradient(
    to top,
    rgba(59, 130, 246, 0.7) 0%,
    rgba(59, 130, 246, 0.9) 100%
  );
  border-radius: 0 0 6px 6px;
}
</style>
