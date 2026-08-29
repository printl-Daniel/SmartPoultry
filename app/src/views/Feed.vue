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
                class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl shadow-md"
              >
                <Wheat class="w-6 h-6" />
              </div>
              <div>
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
                  Feed Management System
                </h1>
                <p class="text-sm text-gray-600">
                  Real-time monitoring and automated control
                </p>
              </div>
            </div>
            <div
              class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg shadow-sm border border-emerald-100 flex items-center gap-2"
            >
              <Activity class="w-4 h-4" />
              <span class="font-medium text-sm">Live Data</span>
            </div>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <!-- Section Title -->
          <div class="flex items-center gap-3">
            <Settings class="w-6 h-6 text-emerald-500" />
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
              System Overview
            </h2>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"
            ></div>
          </div>

          <!-- Error State -->
          <div
            v-if="error"
            class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
          >
            <div class="flex items-center gap-2">
              <AlertCircle class="w-5 h-5" />
              <span class="font-medium">Error loading data</span>
            </div>
            <p class="text-sm mt-1">{{ error }}</p>
            <button
              @click="retryLoadData"
              class="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>

          <!-- Feed Containers -->
          <div
            v-if="!loading && !error"
            class="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="(container, index) in feedContainers"
              :key="`container-${index}`"
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div class="flex justify-between items-center mb-6">
                <h3
                  class="text-lg font-semibold text-gray-900 flex items-center gap-2"
                >
                  <Package class="w-5 h-5 text-amber-500" />
                  {{ container.name }}
                </h3>
                <span
                  :class="getFeedStatusClass(container.quantity)"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                >
                  <CheckCircle class="w-3 h-3 mr-1" />
                  {{ getFeedStatus(container.quantity) }}
                </span>
              </div>

              <!-- Container Visualization -->
              <div class="relative w-full h-48 mx-auto mb-6">
                <div
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-44 bg-orange-50 border-2 border-orange-500 rounded-lg overflow-hidden"
                >
                  <div
                    class="feed absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out"
                    :style="{
                      height: Math.max(container.quantity, 0) + '%',
                      backgroundColor: container.color,
                    }"
                  ></div>
                </div>

                <!-- Percentage Display -->
                <div
                  class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border"
                >
                  <span class="font-semibold text-gray-900">
                    {{ Math.round(container.quantity) }}%
                  </span>
                </div>

                <!-- Scale Markers -->
                <div
                  class="absolute top-0 right-8 h-full flex flex-col justify-between py-2 text-xs text-gray-500"
                >
                  <div
                    v-for="mark in [100, 75, 50, 25, 0]"
                    :key="mark"
                    class="flex items-center"
                  >
                    <div class="w-2 h-px bg-gray-400 mr-1"></div>
                    <span class="font-medium">{{ mark }}%</span>
                  </div>
                </div>
              </div>

              <!-- Container Details -->
              <div class="space-y-3 bg-gray-50 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 flex items-center gap-1">
                    <Scale class="w-4 h-4" />
                    Current Amount:
                  </span>
                  <span class="font-semibold text-gray-900">
                    {{ formatNumber(container.currentAmount) }} kg
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 flex items-center gap-1">
                    <Database class="w-4 h-4" />
                    Total Capacity:
                  </span>
                  <span class="font-semibold text-gray-900">
                    {{ formatNumber(container.totalCapacity) }} kg
                  </span>
                </div>
                <div
                  class="flex justify-between items-center pt-2 border-t border-gray-200"
                >
                  <span class="text-sm text-gray-600 flex items-center gap-1">
                    <TrendingUp class="w-4 h-4" />
                    Status:
                  </span>
                  <span
                    class="font-semibold"
                    :class="getStatusTextClass(container.quantity)"
                  >
                    {{ getFeedStatus(container.quantity) }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    Last Updated:
                  </span>
                  <span class="font-medium text-gray-900 text-xs">
                    {{ container.lastUpdated }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feeding Schedule -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
              <h3
                class="text-lg font-semibold text-gray-900 flex items-center gap-2"
              >
                <Calendar class="w-5 h-5 text-purple-500" />
                Feeding Schedule
              </h3>
              <div
                v-if="!isEditingSchedule && feedingSchedule.length > 0"
                class="text-sm text-gray-500"
              >
                {{ feedingSchedule.length }} schedule{{
                  feedingSchedule.length !== 1 ? "s" : ""
                }}
                configured
              </div>
            </div>

            <!-- Schedule View -->
            <div v-if="!isEditingSchedule">
              <div
                v-if="!feedingSchedule.length"
                class="text-center py-12 text-gray-500"
              >
                <CalendarX class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p class="text-lg font-medium">No feeding schedules set</p>
                <p class="text-sm mt-1 mb-6">
                  Click the button below to add your first schedule
                </p>
                <button
                  @click="editSchedule"
                  class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto transition-colors duration-200 font-medium"
                >
                  <Plus class="w-4 h-4 mr-2" />
                  Add First Schedule
                </button>
              </div>

              <div v-else class="space-y-3">
                <div
                  class="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200"
                  v-for="(schedule, index) in sortedSchedules"
                  :key="`schedule-${index}`"
                >
                  <div class="flex items-center gap-4">
                    <div
                      :class="getIconClass(schedule.rawTime)"
                      class="w-12 h-12 rounded-full flex items-center justify-center shadow-sm border border-white"
                    >
                      <component
                        :is="getIcon(schedule.rawTime)"
                        class="w-6 h-6 text-gray-700"
                      />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900 text-lg">
                        {{ getTimeName(schedule.rawTime) }}
                      </p>
                      <div
                        class="flex flex-wrap items-center text-sm text-gray-600 gap-3 mt-1"
                      >
                        <span class="flex items-center gap-1">
                          <Clock class="w-4 h-4" />
                          Duration: {{ schedule.amount }}
                        </span>
                        <span
                          v-if="schedule.container"
                          class="flex items-center gap-1"
                        >
                          <Package class="w-4 h-4" />
                          {{ schedule.container }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-bold text-gray-900 text-xl">
                      {{ schedule.timeSlot }}
                    </span>
                    <div class="text-xs text-gray-500 mt-1">
                      {{ getTimeCategory(schedule.rawTime) }}
                    </div>
                  </div>
                </div>

                <button
                  @click="editSchedule"
                  class="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  <Edit class="w-4 h-4 mr-2" />
                  Edit Schedules
                </button>
              </div>
            </div>

            <!-- Schedule Editing -->
            <div v-if="isEditingSchedule" class="space-y-6">
              <div
                v-if="!feedingSchedule.length"
                class="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
              >
                <Calendar class="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p class="font-medium">No schedules yet</p>
                <p class="text-sm">Add your first feeding schedule below</p>
              </div>

              <div
                v-for="(schedule, index) in feedingSchedule"
                :key="`edit-schedule-${index}`"
                class="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg relative border border-gray-200 shadow-sm"
              >
                <button
                  @click="removeSchedule(index)"
                  class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Remove schedule"
                >
                  <X class="w-5 h-5" />
                </button>

                <div class="flex items-center mb-6 gap-3">
                  <div
                    :class="getIconClass(schedule.rawTime)"
                    class="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-white"
                  >
                    <component
                      :is="getIcon(schedule.rawTime)"
                      class="w-5 h-5 text-gray-700"
                    />
                  </div>
                  <div>
                    <span class="font-semibold text-gray-900 text-lg">
                      {{ getTimeName(schedule.rawTime) }}
                    </span>
                    <div class="text-sm text-gray-500">
                      {{ getTimeCategory(schedule.rawTime) }}
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      class="text-sm font-semibold text-gray-700 block mb-3 flex items-center gap-2"
                    >
                      <Clock class="w-4 h-4" />
                      Feeding Time
                    </label>
                    <input
                      type="time"
                      v-model="schedule.rawTime"
                      @change="updateScheduleTime(index)"
                      class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-medium"
                    />
                  </div>

                  <div>
                    <label
                      class="text-sm font-semibold text-gray-700 block mb-3 flex items-center gap-2"
                    >
                      <Timer class="w-4 h-4" />
                      Feeding Duration
                    </label>
                    <div class="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="999"
                        v-model.number="schedule.amountValue"
                        @input="updateScheduleAmount(index)"
                        class="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-medium"
                        placeholder="Duration"
                      />
                      <select
                        v-model="schedule.amountUnit"
                        @change="updateScheduleAmount(index)"
                        class="w-32 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 font-medium"
                      >
                        <option value="seconds">seconds</option>
                        <option value="minutes">minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button
                @click="addNewSchedule"
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-4 rounded-lg flex items-center justify-center transition-all duration-200 border-2 border-dashed border-gray-300 hover:border-gray-400 font-medium"
              >
                <Plus class="w-5 h-5 mr-2" />
                Add New Feeding Time
              </button>

              <div
                class="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200"
              >
                <button
                  @click="saveSchedule"
                  :disabled="saving"
                  class="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  <Save v-if="!saving" class="w-4 h-4 mr-2" />
                  <div
                    v-else
                    class="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"
                  ></div>
                  {{ saving ? "Saving..." : "Save Changes" }}
                </button>
                <button
                  @click="cancelSchedule"
                  :disabled="saving"
                  class="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  <X class="w-4 h-4 mr-2" />
                  Cancel
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
import { onMounted, ref, computed, onUnmounted } from "vue";
import {
  Wheat,
  Activity,
  Settings,
  Package,
  CheckCircle,
  Scale,
  Database,
  Calendar,
  CalendarX,
  Edit,
  X,
  Clock,
  Plus,
  Save,
  Sun,
  CloudSun,
  Moon,
  Star,
  AlertCircle,
  TrendingUp,
  Timer,
} from "lucide-vue-next";
import Nav from "@/components/templates/Nav.vue";
import feedingServices from "@/services/feedingServices.js";
import sensorsServices from "@/services/sensorsServices";

// Reactive state
const feedContainers = ref([]);
const feedingSchedule = ref([]);
const isEditingSchedule = ref(false);
const loading = ref(true);
const saving = ref(false);
const error = ref(null);
let sensorListener = null;

// Computed properties
const sortedSchedules = computed(() => {
  return [...feedingSchedule.value].sort((a, b) => {
    if (!a.rawTime || !b.rawTime) return 0;
    return a.rawTime.localeCompare(b.rawTime);
  });
});

// Helper functions for feed status
const getFeedStatus = (quantity) => {
  const qty = Number(quantity) || 0;
  if (qty < 20) return "Low";
  if (qty < 40) return "Warning";
  return "Excellent";
};

const getFeedStatusClass = (quantity) => {
  const qty = Number(quantity) || 0;
  if (qty < 20) return "bg-red-100 text-red-700 border-red-200";
  if (qty < 40) return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
};

const getStatusTextClass = (quantity) => {
  const qty = Number(quantity) || 0;
  if (qty < 20) return "text-red-600";
  if (qty < 40) return "text-yellow-600";
  return "text-emerald-600";
};

// Helper functions for schedule display
const getTimeName = (time) => {
  if (!time) return "Unknown Feed";
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) return "Morning Feed";
  if (hour >= 12 && hour < 17) return "Afternoon Feed";
  if (hour >= 17 && hour < 21) return "Evening Feed";
  return "Night Feed";
};

const getTimeCategory = (time) => {
  if (!time) return "";
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
};

const getIcon = (time) => {
  if (!time) return Clock;
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) return Sun;
  if (hour >= 12 && hour < 17) return CloudSun;
  if (hour >= 17 && hour < 21) return Moon;
  return Star;
};

const getIconClass = (time) => {
  if (!time) return "bg-gray-100";
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) return "bg-yellow-100";
  if (hour >= 12 && hour < 17) return "bg-orange-100";
  if (hour >= 17 && hour < 21) return "bg-purple-100";
  return "bg-indigo-100";
};

// Utility functions
const formatNumber = (num) => {
  return new Intl.NumberFormat().format(Math.round(num || 0));
};

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const formatTimeSlot = (rawTime) => {
  if (!rawTime) return "";
  const [hours, minutes] = rawTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatLastUpdated = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Container fetching function
const fetchContainers = async () => {
  try {
    console.log("Fetching feed containers...");

    // Get feed levels from the feeding service
    const feedLevels = await feedingServices.getFeeding();
    console.log("Feed levels received:", feedLevels);

    if (!feedLevels || typeof feedLevels !== "object") {
      throw new Error("Invalid feed levels data received");
    }

    const levelKeys = Object.keys(feedLevels);
    console.log("Container keys:", levelKeys);

    if (levelKeys.length === 0) {
      console.warn("No container data found, using default containers");
      // Create default containers if no data is available
      feedContainers.value = [
        {
          name: "Feed Container A",
          quantity: 0,
          color: "#f97316",
          totalCapacity: 1000,
          currentAmount: 0,
          lastUpdated: formatLastUpdated(),
        },
      ];
      return;
    }

    // Process the container data
    feedContainers.value = levelKeys.map((key, index) => {
      const quantity = Number(feedLevels[key]) || 0;
      const containerLetter = String.fromCharCode(65 + index); // A, B, C, ...
      const clampedQuantity = Math.max(0, Math.min(100, quantity));

      return {
        name: `Feed Container ${containerLetter}`,
        quantity: clampedQuantity,
        color: "#f97316",
        totalCapacity: 1000,
        currentAmount: Math.round((clampedQuantity / 100) * 1000),
        lastUpdated: formatLastUpdated(),
      };
    });

    console.log("Containers processed:", feedContainers.value);
  } catch (err) {
    console.error("Error fetching containers:", err);
    throw err;
  }
};

// Schedule management functions
const addNewSchedule = () => {
  const currentTime = getCurrentTime();
  const defaultValue = 1;
  const defaultUnit = "minutes";

  const newSchedule = {
    timeSlot: formatTimeSlot(currentTime),
    rawTime: currentTime,
    amountValue: defaultValue,
    amountUnit: defaultUnit,
    amount: `${defaultValue} ${defaultUnit}`,
  };

  feedingSchedule.value.push(newSchedule);
};

const removeSchedule = (index) => {
  if (index >= 0 && index < feedingSchedule.value.length) {
    feedingSchedule.value.splice(index, 1);
  }
};

const updateScheduleTime = (index) => {
  const schedule = feedingSchedule.value[index];
  if (schedule && schedule.rawTime) {
    schedule.timeSlot = formatTimeSlot(schedule.rawTime);
  }
};

const updateScheduleAmount = (index) => {
  const schedule = feedingSchedule.value[index];
  if (schedule && schedule.amountValue && schedule.amountUnit) {
    schedule.amount = `${schedule.amountValue} ${schedule.amountUnit}`;
  }
};

const editSchedule = () => {
  isEditingSchedule.value = true;
};

const saveSchedule = async () => {
  if (!feedingSchedule.value || !Array.isArray(feedingSchedule.value)) {
    error.value = "Invalid schedule data";
    return;
  }

  saving.value = true;
  error.value = null;

  try {
    // Validate and clean schedules
    const validSchedules = feedingSchedule.value
      .filter((schedule) => {
        return (
          schedule.rawTime &&
          schedule.amountValue &&
          schedule.amountValue > 0 &&
          schedule.amountUnit
        );
      })
      .map((schedule) => ({
        rawTime: schedule.rawTime,
        timeSlot: formatTimeSlot(schedule.rawTime),
        amount: `${schedule.amountValue} ${schedule.amountUnit}`,
        amountValue: schedule.amountValue,
        amountUnit: schedule.amountUnit,
      }));

    // Sort by time
    validSchedules.sort((a, b) => a.rawTime.localeCompare(b.rawTime));

    // Update local state
    feedingSchedule.value = validSchedules;

    // Save to backend
    await feedingServices.saveSchedules(validSchedules);

    isEditingSchedule.value = false;
  } catch (err) {
    console.error("Failed to save feeding schedule:", err);
    error.value = "Failed to save schedule. Please try again.";
  } finally {
    saving.value = false;
  }
};

const cancelSchedule = async () => {
  try {
    // Reload schedules from backend to discard changes
    const schedules = await feedingServices.getFeedSchedule();
    if (schedules && Array.isArray(schedules)) {
      feedingSchedule.value = schedules.map((schedule) => ({
        ...schedule,
        amountValue: schedule.amount
          ? parseInt(schedule.amount.split(" ")[0]) || 1
          : 1,
        amountUnit: schedule.amount
          ? schedule.amount.split(" ")[1] || "minutes"
          : "minutes",
      }));
    }
  } catch (err) {
    console.error("Failed to reload schedules:", err);
  }

  isEditingSchedule.value = false;
};

// Retry function for error state
const retryLoadData = async () => {
  loading.value = true;
  error.value = null;
  await loadInitialData();
};

// Main data loading function
const loadInitialData = async () => {
  try {
    // Load feed containers
    await fetchContainers();

    // Load feeding schedules
    const schedules = await feedingServices.getFeedSchedule();
    if (schedules && Array.isArray(schedules) && schedules.length > 0) {
      feedingSchedule.value = schedules.map((schedule) => ({
        ...schedule,
        amountValue: schedule.amount
          ? parseInt(schedule.amount.split(" ")[0]) || 1
          : 1,
        amountUnit: schedule.amount
          ? schedule.amount.split(" ")[1] || "minutes"
          : "minutes",
      }));
    }

    // Set up real-time listener for feed quantity updates
    if (
      sensorsServices &&
      typeof sensorsServices.listenForFeedQuantity === "function"
    ) {
      sensorListener = sensorsServices.listenForFeedQuantity((quantity) => {
        if (
          quantity !== undefined &&
          quantity !== null &&
          feedContainers.value.length > 0
        ) {
          const clampedQuantity = Math.max(0, Math.min(100, Number(quantity)));
          feedContainers.value[0].quantity = clampedQuantity;
          feedContainers.value[0].currentAmount = Math.round(
            (clampedQuantity / 100) * feedContainers.value[0].totalCapacity
          );
          feedContainers.value[0].lastUpdated = formatLastUpdated();
        }
      });
    }
  } catch (err) {
    console.error("Error loading initial data:", err);
    error.value = "Failed to load system data. Please refresh the page.";
  } finally {
    loading.value = false;
  }
};

// Initialize data on component mount
onMounted(async () => {
  loading.value = true;
  error.value = null;
  await loadInitialData();
});

// Cleanup on component unmount
onUnmounted(() => {
  if (sensorListener && typeof sensorListener === "function") {
    sensorListener();
  }
});
</script>

<style scoped>
.feed {
  background: linear-gradient(
    to top,
    currentColor 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 0 0 6px 6px;
}

.status-card {
  @apply flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-all duration-200;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
