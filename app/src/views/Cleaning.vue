<template>
  <div class="flex h-screen">
    <Nav />
    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <h2 class="text-2xl font-semibold mb-6">Cleaning System</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Cleaning Status -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Cleaning Status</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span>Current Status:</span>
              <span class="font-semibold text-green-500">Active</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Last Cleaning Cycle:</span>
              <span class="font-semibold">2 hours ago</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Next Scheduled Cleaning:</span>sss
              <span class="font-semibold">In 4 hours</span>
            </div>
          </div>
          <button
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Manual Cleaning
          </button>
        </div>

        <!-- Cleaning Schedule -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Cleaning Schedule</h3>
          <ul class="space-y-2">
            <li class="flex justify-between items-center">
              <span>02:00</span>
              <span>30 minutes</span>
            </li>
            <li class="flex justify-between items-center">
              <span>10:00</span>
              <span>20 minutes</span>
            </li>
            <li class="flex justify-between items-center">
              <span>18:00</span>
              <span>30 minutes</span>
            </li>
          </ul>
          <button
            class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Edit Schedule
          </button>
        </div>

        <!-- Cleaning System Maintenance -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">System Maintenance</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span>Last Maintenance:</span>
              <span class="font-semibold">7 days ago</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Next Scheduled Maintenance:</span>
              <span class="font-semibold">In 23 days</span>
            </div>
            <div class="flex items-center justify-between">
              <span>System Health:</span>
              <span class="font-semibold text-green-500">Good</span>
            </div>
          </div>
          <button
            class="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Schedule Maintenance
          </button>
        </div>

        <!-- Cleaning Analytics -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Cleaning Analytics</h3>
          <div
            class="h-48 bg-gray-200 rounded flex items-center justify-center"
          >
            [Cleaning Efficiency Chart Placeholder]
          </div>
          <button
            class="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            View Detailed Analytics
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import Nav from "@/components/templates/Nav.vue";
</script>
