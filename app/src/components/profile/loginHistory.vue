<template>
  <div v-if="isVisible" class="login-history-modal">
    <!-- Modal Backdrop with click-away functionality -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
      :class="{ 'opacity-0': !isFullyVisible, 'opacity-100': isFullyVisible }"
      @click="closeModal"
    ></div>

    <!-- Modal Content -->
    <div
      class="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-0"
      @click.stop
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden transition-all duration-300 transform"
        :class="{
          'opacity-0 scale-95': !isFullyVisible,
          'opacity-100 scale-100': isFullyVisible,
        }"
        @click.stop
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-100"
        >
          <div class="flex items-center">
            <div class="bg-indigo-50 p-2 rounded-full mr-3">
              <i class="fas fa-history text-indigo-600 text-lg"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900">Login History</h3>
          </div>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Search and Filter Bar -->
        <div class="p-4 border-b border-gray-100 bg-gray-50">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-grow">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search login history..."
                class="pl-10 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white py-2 px-4 text-sm"
              />
            </div>
            <select
              v-model="filterOption"
              class="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white py-2 px-4 text-sm"
            >
              <option value="all">All Devices</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
        </div>

        <!-- Login History List -->
        <div class="overflow-y-auto" style="max-height: calc(90vh - 180px)">
          <div
            v-if="filteredLoginHistory.length === 0"
            class="p-8 text-center text-gray-500"
          >
            <i class="fas fa-search text-gray-300 text-4xl mb-3"></i>
            <p>No login history found matching your search criteria.</p>
          </div>

          <ul v-else class="divide-y divide-gray-100">
            <li
              v-for="(entry, index) in filteredLoginHistory"
              :key="index"
              class="p-4 hover:bg-indigo-50 transition-colors duration-150"
            >
              <div
                class="flex items-start sm:items-center flex-col sm:flex-row"
              >
                <!-- Device Icon -->
                <div class="mr-4 mb-3 sm:mb-0">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center"
                    :class="{
                      'bg-indigo-100': entry.device.type === 'desktop',
                      'bg-green-100': entry.device.type === 'mobile',
                      'bg-purple-100': entry.device.type === 'tablet',
                    }"
                  >
                    <i
                      class="text-lg"
                      :class="{
                        'fas fa-desktop text-indigo-600':
                          entry.device.type === 'desktop',
                        'fas fa-mobile-alt text-green-600':
                          entry.device.type === 'mobile',
                        'fas fa-tablet-alt text-purple-600':
                          entry.device.type === 'tablet',
                      }"
                    ></i>
                  </div>
                </div>

                <!-- Login Details -->
                <div class="flex-grow">
                  <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between mb-1"
                  >
                    <div class="font-medium text-gray-900">
                      {{ entry.device.browser }} on {{ entry.device.os }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ formatDate(entry.timestamp) }}
                    </div>
                  </div>

                  <div
                    class="flex flex-col sm:flex-row text-sm text-gray-600 gap-2 sm:gap-4"
                  >
                    <div class="flex items-center">
                      <i class="fas fa-map-marker-alt text-gray-400 mr-1"></i>
                      {{ entry.location }}
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-globe text-gray-400 mr-1"></i>
                      {{ entry.ipAddress }}
                    </div>
                    <div
                      v-if="entry.status === 'success'"
                      class="flex items-center text-green-600"
                    >
                      <i class="fas fa-check-circle mr-1"></i>
                      Successful
                    </div>
                    <div v-else class="flex items-center text-red-600">
                      <i class="fas fa-exclamation-circle mr-1"></i>
                      Failed
                    </div>
                  </div>
                </div>

                <!-- Current Session Indicator -->
                <div
                  v-if="entry.isCurrentSession"
                  class="mt-2 sm:mt-0 ml-0 sm:ml-4"
                >
                  <span
                    class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    Current Session
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Modal Footer -->
        <div
          class="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center"
        >
          <button
            @click="clearAllHistory"
            class="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
          >
            <i class="fas fa-trash-alt mr-1"></i>
            Clear All History
          </button>
          <button
            @click="closeModal"
            class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  loginHistory: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emit = defineEmits(["close", "clear-history"]);

// State
const isFullyVisible = ref(false);
const searchQuery = ref("");
const filterOption = ref("all");

// Animation timing
watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      // Small delay to trigger the animation after the modal is in the DOM
      setTimeout(() => {
        isFullyVisible.value = true;
      }, 10);
    } else {
      isFullyVisible.value = false;
    }
  }
);

// Filter login history based on search and filter options
const filteredLoginHistory = computed(() => {
  let result = [...props.loginHistory];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (entry) =>
        entry.device.browser.toLowerCase().includes(query) ||
        entry.device.os.toLowerCase().includes(query) ||
        entry.location.toLowerCase().includes(query) ||
        entry.ipAddress.toLowerCase().includes(query)
    );
  }

  // Apply device type filter
  if (filterOption.value !== "all") {
    result = result.filter((entry) => entry.device.type === filterOption.value);
  }

  return result;
});

// Format date for display
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

// Close modal with animation
const closeModal = () => {
  isFullyVisible.value = false;
  // Wait for animation to complete before emitting close event
  setTimeout(() => {
    emit("close");
  }, 300);
};

// Clear all login history
const clearAllHistory = () => {
  if (
    confirm(
      "Are you sure you want to clear all login history? This action cannot be undone."
    )
  ) {
    emit("clear-history");
  }
};

// Prevent scrolling on the body when modal is open
onMounted(() => {
  if (props.isVisible) {
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.body.style.overflow = "";
  };
});
</script>

<style scoped>
/* Add any additional custom styles here */
.login-history-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
}

/* Custom scrollbar for the login history list */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 8px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
