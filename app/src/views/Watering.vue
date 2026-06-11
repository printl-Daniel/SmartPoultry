<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <Nav />
      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-6 md:p-8 pt-20 md:pt-8">
        <!-- System Status -->
        <div
          class="bg-white rounded-xl shadow-md p-6 mb-8 transform hover:translate-y-[-5px] transition-all duration-300"
        >
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
                <p class="font-medium text-gray-800">{{ status.name }}</p>
                <p :class="status.statusClass" class="text-sm font-medium">
                  {{ status.status }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Water Management Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Water Quantity -->
          <div
            class="bg-white rounded-xl shadow-md p-6 transform hover:translate-y-[-5px] transition-all duration-300"
          >
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-800">
                Main Container Water Quantity
              </h2>
              <span
                :class="getWaterStatusClass(waterQuantity)"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                <i class="fas fa-check-circle mr-1"></i>
                {{ getWaterStatus(waterQuantity) }}
              </span>
            </div>

            <div class="relative w-full h-48 mx-auto">
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-44 bg-blue-50 border-2 border-blue-500 rounded-lg overflow-hidden"
              >
                <div
                  class="water"
                  :style="{ height: waterQuantity + '%' }"
                ></div>
              </div>
              <div
                class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm"
              >
                <span class="font-semibold">{{ waterQuantity }}%</span>
              </div>
              <div
                class="absolute top-0 right-10 h-full flex flex-col justify-between py-2"
              >
                <div class="flex items-center">
                  <div class="w-2 h-px bg-gray-400 mr-1"></div>
                  <div class="text-xs text-gray-500">100%</div>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-px bg-gray-400 mr-1"></div>
                  <div class="text-xs text-gray-500">75%</div>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-px bg-gray-400 mr-1"></div>
                  <div class="text-xs text-gray-500">50%</div>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-px bg-gray-400 mr-1"></div>
                  <div class="text-xs text-gray-500">25%</div>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-px bg-gray-400 mr-1"></div>
                  <div class="text-xs text-gray-500">0%</div>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Current Capacity:</span>
                <span class="font-medium text-gray-800"
                  >{{ currentVolume }} Liters</span
                >
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Total Capacity:</span>
                <span class="font-medium text-gray-800"
                  >{{ totalCapacity }} Liters</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Water Quality:</span>
                <span class="font-medium text-gray-800">{{
                  waterQuality
                }}</span>
              </div>
            </div>
          </div>

          <!-- Water Cleaning -->
          <div
            class="bg-white rounded-xl shadow-md p-6 transform hover:translate-y-[-5px] transition-all duration-300"
          >
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-800">
                Water Tanks Cleaning
              </h2>
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
                  <p class="font-medium text-gray-800">
                    {{ formatDate(lastCleaningDate) }}
                  </p>
                </div>
              </div>

              <!-- New Cleaning Schedule Adjuster -->
              <div class="mt-4 bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-700 mb-3">
                  Adjust Cleaning Schedule
                </h3>

                <div class="space-y-3">
                  <div>
                    <label class="text-sm text-gray-600 block mb-1"
                      >Next Cleaning Date</label
                    >
                    <input
                      type="date"
                      v-model="nextCleaningDate"
                      class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label class="text-sm text-gray-600 block mb-1"
                      >Cleaning Time</label
                    >
                    <input
                      type="time"
                      v-model="cleaningTime"
                      class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  @click="updateCleaningSchedule"
                  class="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mt-4 transition-colors duration-200 mb-5"
                >
                  <i class="fas fa-save mr-2"></i> Update Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Watering Schedule -->
        <div
          class="bg-white rounded-xl shadow-md p-6 transform hover:translate-y-[-5px] transition-all duration-300"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-800">
              Watering Schedule
            </h2>
            <div class="flex items-center space-x-2">
              <span
                :class="
                  wateringStatus === 'Active'
                    ? 'text-teal-600'
                    : 'text-gray-500'
                "
                class="text-sm font-medium"
                >{{ wateringStatus }}</span
              >
              <label class="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  :checked="wateringStatus === 'Active'"
                  @change="toggleWateringStatus"
                  class="opacity-0 w-0 h-0"
                />
                <span
                  class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition-all duration-300 rounded-full before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300"
                  :class="
                    wateringStatus === 'Active'
                      ? 'bg-teal-600 before:translate-x-6'
                      : ''
                  "
                ></span>
              </label>
            </div>
          </div>

          <div id="schedule-view" v-if="!isEditingSchedule">
            <div
              v-if="wateringSchedule.length === 0"
              class="text-center py-8 text-gray-500"
            >
              <i class="fas fa-calendar-alt text-teal-400 text-4xl mb-3"></i>
              <p>No watering schedules set</p>
              <p class="text-sm mt-1">
                Click the button below to add your first schedule
              </p>
            </div>

            <ul v-else class="space-y-3">
              <li
                class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                v-for="(schedule, index) in wateringSchedule"
                :key="index"
              >
                <div class="flex items-center">
                  <div
                    :class="getIconClass(schedule.rawTime)"
                    class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  >
                    <i
                      :class="getIcon(schedule.rawTime)"
                      class="text-gray-700"
                    ></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">
                      {{ getTimeName(schedule.rawTime) }}
                    </p>
                    <div
                      class="flex items-center text-xs text-gray-500 space-x-2"
                    >
                      <span>Mode: {{ schedule.mode }}</span>
                      <span>|</span>
                      <span>Location: {{ schedule.location }}</span>
                    </div>
                  </div>
                </div>
                <span class="font-semibold text-gray-800">{{
                  schedule.timeSlot
                }}</span>
              </li>
            </ul>

            <div class="mt-6 space-y-3">
              <button
                @click="editSchedule"
                class="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <i class="fas fa-edit mr-2"></i> Edit Schedules
              </button>
            </div>
          </div>

          <!-- Schedule Editing -->
          <div v-if="isEditingSchedule" id="schedule-edit" class="space-y-4">
            <div
              v-if="wateringSchedule.length === 0"
              class="text-center py-4 text-gray-500"
            >
              <p>No schedules yet. Add your first watering schedule below.</p>
            </div>

            <div
              v-for="(schedule, index) in wateringSchedule"
              :key="index"
              class="bg-gray-50 p-4 rounded-lg relative"
            >
              <button
                @click="removeSchedule(index)"
                class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove schedule"
              >
                <i class="fas fa-times"></i>
              </button>

              <div class="flex items-center mb-3">
                <div
                  :class="getIconClass(schedule.rawTime)"
                  class="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                >
                  <i
                    :class="getIcon(schedule.rawTime)"
                    class="text-gray-700"
                  ></i>
                </div>
                <span class="font-medium text-gray-800">{{
                  getTimeName(schedule.rawTime)
                }}</span>
              </div>

              <div class="space-y-3">
                <div>
                  <label class="text-sm text-gray-600 block mb-1">Time</label>
                  <input
                    type="time"
                    v-model="schedule.rawTime"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="text-sm text-gray-600 block mb-1"
                    >Watering Mode</label
                  >
                  <select
                    v-model="schedule.mode"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option>Refill mini tanks</option>
                    <option>
                      Refill mini tanks + Mix the water + Water the chicken
                    </option>
                    <option>Refill mini tanks + Mix the water</option>
                    <option>Mix the water + Water the chickens</option>
                  </select>
                </div>

                <div>
                  <label class="text-sm text-gray-600 block mb-1"
                    >Location</label
                  >
                  <select
                    v-model="schedule.location"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option>All Locations</option>
                    <option>Coop 1</option>
                    <option>Coop 2</option>
                    <option>Coop 3</option>
                    <option>Outdoor Area</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              @click="addNewSchedule"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg flex items-center justify-center transition-colors duration-200 border-2 border-dashed border-gray-300"
            >
              <i class="fas fa-plus mr-2"></i> Add New Watering Time
            </button>

            <div class="flex space-x-3 mt-6">
              <button
                @click="saveSchedule"
                class="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <i class="fas fa-save mr-2"></i> Save
              </button>
              <button
                @click="cancelSchedule"
                class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <i class="fas fa-times mr-2"></i> Cancel
              </button>
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

const systemStatus = ref([
  {
    name: "Main Pump",
    status: mainPumpStatus,
    icon: "fas fa-pump-soap",
    statusClass: "text-green-600",
    bgClass: "bg-green-100",
    iconClass: "text-green-500",
  },
  {
    name: "Mixer System",
    status: mixerSystemStatus,
    icon: "fas fa-filter",
    statusClass: "text-green-600",
    bgClass: "bg-green-100",
    iconClass: "text-green-500",
  },
  {
    name: "Control System",
    status: "Online",
    icon: "fas fa-microchip",
    statusClass: "text-green-600",
    bgClass: "bg-green-100",
    iconClass: "text-green-500",
  },
]);

// Water Quantity
const waterQuantity = ref(0);
const currentVolume = ref(700); // Current volume of water in liters
const totalCapacity = ref(1000); // Total tank capacity in liters
const waterQuality = ref("Good"); // Water quality status

// Water Cleaning
const nextCleaningDate = ref("");
const lastCleaningDate = ref("");
const cleaningType = ref("Clean");
const cleaningProgress = ref(0); // Progress in cleaning schedule
const daysUntilCleaning = ref(0); // Days remaining for next cleaning
const cleaningTime = ref("");

// Watering Schedule
const wateringStatus = ref("Active");
const wateringSchedule = ref([]);
const isEditingSchedule = ref(false);

// Helper functions for water status
const getWaterStatus = (quantity) => {
  if (quantity < 20) return "Low";
  if (quantity < 40) return "Warning";
  return "Normal";
};

const getWaterStatusClass = (quantity) => {
  if (quantity < 20) return "bg-red-100 text-red-800";
  if (quantity < 40) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
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
  if (hour >= 5 && hour < 12) return "bg-green-200";
  if (hour >= 12 && hour < 17) return "bg-yellow-200";
  if (hour >= 17 && hour < 21) return "bg-blue-200";
  return "bg-indigo-200";
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
    alert("Cleaning schedule updated successfully!");
  } catch (error) {
    console.error("Failed to update cleaning schedule:", error);
    alert("Error updating cleaning schedule.");
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
    alert("Watering schedule updated successfully!");
  } catch (error) {
    console.error("Failed to save watering schedule:", error);
    alert("Error saving watering schedule.");
  }

  isEditingSchedule.value = false;
};

const cancelSchedule = () => {
  isEditingSchedule.value = false;
};

const toggleWateringStatus = () => {
  wateringStatus.value =
    wateringStatus.value === "Active" ? "Inactive" : "Active";
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
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.water {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: height 1s ease;
  background-image: linear-gradient(
    to bottom,
    rgba(59, 130, 246, 0.7),
    rgba(59, 130, 246, 0.9)
  );
}
</style>
