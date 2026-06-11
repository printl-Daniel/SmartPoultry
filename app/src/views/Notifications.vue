<template>
  <div class="flex h-screen">
    <!-- Nav -->
    <Nav />
    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <div class="grid grid-cols-1 gap-6">
        <!-- Notification Settings -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Notification Settings</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span>Email Notifications</span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked />
                <div
                  class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <span>SMS Notifications</span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" />
                <div
                  class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <span>Push Notifications</span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" checked />
                <div
                  class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 class="text-lg font-semibold mb-4">Recent Notifications</h3>
          <ul class="space-y-4">
            <li
              class="flex flex-col items-center space-y-2 p-4 bg-yellow-50 rounded-lg"
            >
              <div class="flex-shrink-0">
                <i class="icon-alert-triangle text-yellow-500 w-6 h-6"></i>
              </div>
              <div>
                <p class="font-medium text-yellow-800">Temperature Alert</p>
                <p class="text-sm text-yellow-700">
                  Temperature in Coop 2 is above normal range.
                </p>
                <p class="text-xs text-yellow-600 mt-1">2 hours ago</p>
              </div>
            </li>
            <li
              class="flex flex-col items-center space-y-2 p-4 bg-green-50 rounded-lg"
            >
              <div class="flex-shrink-0">
                <i class="icon-check-circle text-green-500 w-6 h-6"></i>
              </div>
              <div>
                <p class="font-medium text-green-800">Feeding Completed</p>
                <p class="text-sm text-green-700">
                  Scheduled feeding for all coops completed successfully.
                </p>
                <p class="text-xs text-green-600 mt-1">4 hours ago</p>
              </div>
            </li>
            <li
              class="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-lg"
            >
              <div class="flex-shrink-0">
                <i class="icon-info text-blue-500 w-6 h-6"></i>
              </div>
              <div>
                <p class="font-medium text-blue-800">System Update</p>
                <p class="text-sm text-blue-700">
                  New system update available. Please schedule installation.
                </p>
                <p class="text-xs text-blue-600 mt-1">1 day ago</p>
              </div>
            </li>
          </ul>
          <button
            class="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
          >
            View All Notifications
          </button>
        </div>

        <!-- Notification Preferences -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Notification Preferences</h3>
          <form>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Temperature Alerts</label
                >
                <select
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Feeding Alerts</label
                >
                <select
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Water Level Alerts</label
                >
                <select
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >System Updates</label
                >
                <select
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
            <div class="mt-6">
              <button
                type="submit"
                class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import Nav from "@/components/templates/Nav.vue";
</script>
