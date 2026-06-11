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

        <!-- Feed Containers -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <!-- Feed Container 1 -->
          <div
            class="bg-white rounded-xl shadow-md p-6 transform hover:translate-y-[-5px] transition-all duration-300"
          >
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-800">
                Feed Container 1
              </h2>
              <span
                :class="getFeedStatusClass(feedContainers[0].quantity)"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                <i class="fas fa-check-circle mr-1"></i>
                {{ getFeedStatus(feedContainers[0].quantity) }}
              </span>
            </div>

            <div class="relative w-full h-48 mx-auto">
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-44 bg-amber-50 border-2 border-amber-500 rounded-lg overflow-hidden"
              >
                <div
                  class="feed"
                  :style="{
                    height: feedContainers[0].quantity + '%',
                    backgroundColor: feedContainers[0].color,
                  }"
                ></div>
              </div>
              <div
                class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm"
              >
                <span class="font-semibold"
                  >{{ feedContainers[0].quantity }}%</span
                >
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
                <span class="text-sm text-gray-600">Current Amount:</span>
                <span class="font-medium text-gray-800"
                  >{{ feedContainers[0].currentAmount }} kg</span
                >
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Total Capacity:</span>
                <span class="font-medium text-gray-800"
                  >{{ feedContainers[0].totalCapacity }} kg</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Feed Type:</span>
                <span class="font-medium text-gray-800">{{
                  feedContainers[0].feedType
                }}</span>
              </div>
            </div>
          </div>

          <!-- Feed Container 2 -->
          <div
            class="bg-white rounded-xl shadow-md p-6 transform hover:translate-y-[-5px] transition-all duration-300"
          >
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-800">
                Feed Container 2
              </h2>
              <span
                :class="getFeedStatusClass(feedContainers[1].quantity)"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                <i class="fas fa-check-circle mr-1"></i>
                {{ getFeedStatus(feedContainers[1].quantity) }}
              </span>
            </div>

            <div class="relative w-full h-48 mx-auto">
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-44 bg-amber-50 border-2 border-amber-500 rounded-lg overflow-hidden"
              >
                <div
                  class="feed"
                  :style="{
                    height: feedContainers[1].quantity + '%',
                    backgroundColor: feedContainers[1].color,
                  }"
                ></div>
              </div>
              <div
                class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm"
              >
                <span class="font-semibold"
                  >{{ feedContainers[1].quantity }}%</span
                >
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
                <span class="text-sm text-gray-600">Current Amount:</span>
                <span class="font-medium text-gray-800"
                  >{{ feedContainers[1].currentAmount }} kg</span
                >
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Total Capacity:</span>
                <span class="font-medium text-gray-800"
                  >{{ feedContainers[1].totalCapacity }} kg</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Feed Type:</span>
                <span class="font-medium text-gray-800">{{
                  feedContainers[1].feedType
                }}</span>
              </div>
            </div>
          </div>

          <!-- Feed Container 3 -->
          <div
            class="bg-white rounded-xl shadow-md p-6 transform hover:translate-y-[-5px] transition-all duration-300"
          >
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-800">
                Feed Container 3
              </h2>
              <span
                :class="getFeedStatusClass(feedContainers[2].quantity)"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                <i class="fas fa-check-circle mr-1"></i>
                {{ getFeedStatus(feedContainers[2].quantity) }}
              </span>
            </div>

            <div class="relative w-full h-48 mx-auto">
              <div
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-44 bg-amber-50 border-2 border-amber-500 rounded-lg overflow-hidden"
              >
                <div
                  class="feed"
                  :style="{
                    height: feedContainers[2].quantity + '%',
                    backgroundColor: feedContainers[2].color,
                  }"
                ></div>
              </div>
              <div
                class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm"
              >
                <span class="font-semibold"
                  >{{ feedContainers[2].quantity }}%</span
                >
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
                <span class="text-sm text-gray-600">Current Amount:</span>
                <span class="font-medium text-gray-800"
                  >{{ feedContainers[2].currentAmount }} kg</span
                >
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Total Capacity:</span>
                <span class="font-medium text-gray-800"
                  >{{ feedContainers[2].totalCapacity }} kg</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Feed Type:</span>
                <span class="font-medium text-gray-800">{{
                  feedContainers[2].feedType
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Feeding Schedule -->
        <div
          class="bg-white rounded-xl shadow-md p-6 transform hover:translate-y-[-5px] transition-all duration-300"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-800">
              Feeding Schedule
            </h2>
            <div class="flex items-center space-x-2">
              <span
                :class="
                  feedingStatus === 'Active'
                    ? 'text-amber-600'
                    : 'text-gray-500'
                "
                class="text-sm font-medium"
                >{{ feedingStatus }}</span
              >
              <label class="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  :checked="feedingStatus === 'Active'"
                  @change="toggleFeedingStatus"
                  class="opacity-0 w-0 h-0"
                />
                <span
                  class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition-all duration-300 rounded-full before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300"
                  :class="
                    feedingStatus === 'Active'
                      ? 'bg-amber-600 before:translate-x-6'
                      : ''
                  "
                ></span>
              </label>
            </div>
          </div>

          <div id="schedule-view" v-if="!isEditingSchedule">
            <div
              v-if="!feedingSchedule.length"
              class="text-center py-8 text-gray-500"
            >
              <i class="fas fa-calendar-alt text-amber-400 text-4xl mb-3"></i>
              <p>No feeding schedules set</p>
              <p class="text-sm mt-1">
                Click the button below to add your first schedule
              </p>
            </div>

            <ul v-else class="space-y-3">
              <li
                class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                v-for="(schedule, index) in feedingSchedule"
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
                      <span>Amount: {{ schedule.amount }}</span>
                      <span v-if="schedule.container">|</span>
                      <span v-if="schedule.container"
                        >Container: {{ schedule.container }}</span
                      >
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
                class="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <i class="fas fa-edit mr-2"></i> Edit Schedules
              </button>
            </div>
          </div>

          <!-- Schedule Editing -->
          <div v-if="isEditingSchedule" id="schedule-edit" class="space-y-4">
            <div
              v-if="!feedingSchedule.length"
              class="text-center py-4 text-gray-500"
            >
              <p>No schedules yet. Add your first feeding schedule below.</p>
            </div>

            <div
              v-for="(schedule, index) in feedingSchedule"
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
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="text-sm text-gray-600 block mb-1">Amount</label>
                  <select
                    v-model="schedule.amount"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option>5 kg</option>
                    <option>10 kg</option>
                    <option>15 kg</option>
                    <option>20 kg</option>
                    <option>25 kg</option>
                    <option>30 kg</option>
                  </select>
                </div>

                <div>
                  <label class="text-sm text-gray-600 block mb-1"
                    >Container</label
                  >
                  <select
                    v-model="schedule.container"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option>Container 1</option>
                    <option>Container 2</option>
                    <option>Container 3</option>
                    <option>All Containers</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              @click="addNewSchedule"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg flex items-center justify-center transition-colors duration-200 border-2 border-dashed border-gray-300"
            >
              <i class="fas fa-plus mr-2"></i> Add New Feeding Time
            </button>

            <div class="flex space-x-3 mt-6">
              <button
                @click="saveSchedule"
                class="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200"
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
import feedingServices from "@/services/feedingServices.js";
import sensorsServices from "@/services/sensorsServices";

// System Status
const systemStatus = ref([
  {
    name: "Feed Dispenser",
    status: "Operational",
    icon: "fas fa-box",
    statusClass: "text-green-600",
    bgClass: "bg-amber-100",
    iconClass: "text-amber-500",
  },
  {
    name: "Feed Mixer",
    status: "Active",
    icon: "fas fa-blender",
    statusClass: "text-green-600",
    bgClass: "bg-amber-100",
    iconClass: "text-amber-500",
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

// Feed Containers
const feedContainers = ref([
  {
    name: "Container 1",
    quantity: 0, // Current feed level percentage
    currentAmount: 650, // Current amount of feed in kg
    totalCapacity: 1000, // Total container capacity in kg
    feedType: "Standard Mix",
    color: "#f59e0b", // Amber color
  },
  {
    name: "Container 2",
    quantity: 0, // Current feed level percentage
    currentAmount: 420, // Current amount of feed in kg
    totalCapacity: 1000, // Total container capacity in kg
    feedType: "Standard Mix",
    color: "#84cc16", // Lime color
  },
  {
    name: "Container 3",
    quantity: 0, // Current feed level percentage
    currentAmount: 180, // Current amount of feed in kg
    totalCapacity: 1000, // Total container capacity in kg1
    feedType: "Vitamin Mix",
    color: "#06b6d4", // Cyan color
  },
]);

// For backward compatibility with the original code
const feedQuantity = ref(65); // Current feed level percentage
const currentAmount = ref(650); // Current amount of feed in kg
const totalCapacity = ref(1000); // Total silo capacity in kg
const feedStatus = ref("Normal");
const feedStatusClass = ref("bg-green-100 text-green-800");

// Feeding Schedule
const feedingStatus = ref("Active");
const feedingSchedule = ref([
  // Adding some default schedules for testing
  {
    timeSlot: "08:00 AM",
    rawTime: "08:00",
    amount: "15 kg",
    container: "Container 1",
  },
  {
    timeSlot: "12:00 PM",
    rawTime: "12:00",
    amount: "10 kg",
    container: "Container 2",
  },
  {
    timeSlot: "06:00 PM",
    rawTime: "18:00",
    amount: "20 kg",
    container: "All Containers",
  },
]);
const isEditingSchedule = ref(false);

// Helper functions for feed status
const getFeedStatus = (quantity) => {
  if (quantity < 20) return "Low";
  if (quantity < 40) return "Warning";
  return "Normal";
};

const getFeedStatusClass = (quantity) => {
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
  if (hour >= 5 && hour < 12) return "bg-amber-200";
  if (hour >= 12 && hour < 17) return "bg-amber-300";
  if (hour >= 17 && hour < 21) return "bg-amber-100";
  return "bg-indigo-100";
};

const updateFeedStatus = () => {
  if (feedQuantity.value < 20) {
    feedStatus.value = "Low";
    feedStatusClass.value = "bg-red-100 text-red-800";
  } else if (feedQuantity.value < 40) {
    feedStatus.value = "Warning";
    feedStatusClass.value = "bg-yellow-100 text-yellow-800";
  } else {
    feedStatus.value = "Normal";
    feedStatusClass.value = "bg-green-100 text-green-800";
  }
};

// Schedule management
const addNewSchedule = () => {
  // Get current time rounded to nearest hour
  const now = new Date();
  now.setMinutes(0);
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  feedingSchedule.value.push({
    timeSlot: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    rawTime: `${hours}:${minutes}`,
    amount: "10 kg",
    container: "Container 1",
  });
};

const removeSchedule = (index) => {
  feedingSchedule.value.splice(index, 1);
};

const editSchedule = () => {
  // Create a backup of the current schedule
  isEditingSchedule.value = true;
};

const saveSchedule = async () => {
  if (!feedingSchedule.value || !Array.isArray(feedingSchedule.value)) return;

  // Sort schedules by raw time
  feedingSchedule.value.sort((a, b) => a.rawTime.localeCompare(b.rawTime));

  // Format each schedule's timeSlot
  feedingSchedule.value.forEach((schedule) => {
    const [hours, minutes] = schedule.rawTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // hour, minute, sec, ms

    schedule.timeSlot = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  try {
    await feedingServices.saveSchedules(feedingSchedule.value);
    alert("Feeding schedule updated!");
  } catch (error) {
    console.error("Failed to save feeding schedule:", error);
    alert("Error saving feeding schedule.");
  }

  isEditingSchedule.value = false;
};

const cancelSchedule = () => {
  isEditingSchedule.value = false;
};

const toggleFeedingStatus = () => {
  feedingStatus.value =
    feedingStatus.value === "Active" ? "Inactive" : "Active";
};

onMounted(async () => {
  try {
    // 🔁 Feed Level Fallback from feedingServices
    const feedLevels = await feedingServices.getFeeding();
    if (feedLevels) {
      const levels = [
        feedLevels.feed_level_1,
        feedLevels.feed_level_2,
        feedLevels.feed_level_3,
      ];

      feedContainers.value = feedContainers.value.map((container, index) => {
        const quantity = levels[index] ?? 0;
        return {
          ...container,
          quantity,
          currentAmount: (quantity / 100) * container.totalCapacity,
        };
      });

      // For backward compatibility with original logic
      feedQuantity.value = levels[0] ?? 0;
      updateFeedStatus();
    }

    // Get feeding schedule
    const schedules = await feedingServices.getFeedSchedule();
    if (schedules && Array.isArray(schedules) && schedules.length > 0) {
      feedingSchedule.value = schedules;

      // Add container property to existing schedules if not present
      feedingSchedule.value.forEach((schedule) => {
        if (!schedule.container) {
          schedule.container = "Container 1";
        }
      });
    }

    // Set up real-time listeners
    sensorsServices.listenForFeedQuantity((quantity) => {
      if (quantity !== undefined && quantity !== null) {
        feedQuantity.value = quantity;
        updateFeedStatus();
      }
    });

    // Listen for container updates if available
    if (typeof sensorsServices.listenForFeedContainers === "function") {
      sensorsServices.listenForFeedContainers((containers) => {
        if (containers && Array.isArray(containers)) {
          feedContainers.value = containers;
        }
      });
    }
  } catch (error) {
    console.error("Error fetching initial data:", error);
    // Keep using the default data if there's an error
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

/* Only keeping minimal custom CSS that can't be easily done with Tailwind */
.feed {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: height 1s ease;
  background-image: linear-gradient(
    to bottom,
    rgba(245, 158, 11, 0.7),
    rgba(245, 158, 11, 0.9)
  );
}
</style>
