<template>
  <div class="flex h-screen">
    <!-- Nav -->
    <Nav />
    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Current Power Status -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Current Power Status</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span>Main Power:</span>
              <span class="font-semibold text-green-500">Online</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Solar Power:</span>
              <span class="font-semibold text-green-500">Active</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Battery Backup:</span>
              <span class="font-semibold text-yellow-500">Standby</span>
            </div>
          </div>
          <div class="mt-6">
            <h4 class="text-md font-semibold mb-2">Current Power Source</h4>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200"
                  >
                    Solar
                  </span>
                </div>
                <div class="text-right">
                  <span
                    class="text-xs font-semibold inline-block text-green-600"
                  >
                    70%
                  </span>
                </div>
              </div>
              <div
                class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200"
              >
                <div
                  style="width: 70%"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Power Consumption -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Power Consumption</h3>
          <canvas id="powerConsumptionChart" width="400" height="200"></canvas>
          <div class="mt-4 text-center">
            <span class="text-sm font-medium text-gray-500"
              >Total Consumption Today:
            </span>
            <span class="text-lg font-bold text-blue-600">245 kWh</span>
          </div>
        </div>

        <!-- Solar Panel Performance -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Solar Panel Performance</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span>Current Output:</span>
              <span class="font-semibold">5.2 kW</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Peak Output Today:</span>
              <span class="font-semibold">7.8 kW</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Energy Generated Today:</span>
              <span class="font-semibold">42 kWh</span>
            </div>
          </div>
          <div class="mt-6">
            <h4 class="text-md font-semibold mb-2">Panel Efficiency</h4>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200"
                  >
                    Efficiency
                  </span>
                </div>
                <div class="text-right">
                  <span
                    class="text-xs font-semibold inline-block text-blue-600"
                  >
                    85%
                  </span>
                </div>
              </div>
              <div
                class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200"
              >
                <div
                  style="width: 85%"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Battery Status -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Battery Status</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span>Charge Level:</span>
              <span class="font-semibold">78%</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Estimated Backup Time:</span>
              <span class="font-semibold">4.5 hours</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Last Full Charge:</span>
              <span class="font-semibold">2 days ago</span>
            </div>
          </div>
          <div class="mt-6">
            <h4 class="text-md font-semibold mb-2">Battery Health</h4>
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <div>
                  <span
                    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200"
                  >
                    Good
                  </span>
                </div>
                <div class="text-right">
                  <span
                    class="text-xs font-semibold inline-block text-green-600"
                  >
                    92%
                  </span>
                </div>
              </div>
              <div
                class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200"
              >
                <div
                  style="width: 92%"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Nav from "@/components/templates/Nav.vue";
import { onMounted } from "vue";

onMounted(() => {
  const ctx = document.getElementById("powerConsumptionChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      datasets: [
        {
          label: "Power Consumption (kW)",
          data: [5, 4, 6, 8, 10, 7],
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>
