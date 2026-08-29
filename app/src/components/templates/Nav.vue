<template>
  <!-- Modern Mobile Menu Button (Right Bottom) -->
  <button
    class="fixed bottom-6 right-6 z-[100] lg:hidden p-4 bg-white shadow-lg rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out flex items-center justify-center ring-1 ring-gray-300 hover:ring-blue-500"
    @click="toggleSidebar"
    aria-label="Toggle menu"
  >
    <i class="fa-solid fa-bars text-2xl"></i>
  </button>

  <!-- Mobile Blur Background -->
  <div
    v-if="isSidebarOpen"
    class="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 lg:hidden"
    @click="toggleSidebar"
  ></div>

  <!-- Mobile Radial Menu -->
  <div
    v-if="isSidebarOpen"
    class="fixed inset-0 flex items-center justify-center z-50 lg:hidden"
  >
    <sidebarItem
      v-for="(item, i) in pizzaItems"
      :key="item.to || item.label + i"
      v-bind="item"
      :isActive="route.path === item.to"
      :index="i"
      :total="pizzaItems.length"
      :isExpanded="true"
    />
  </div>

  <!-- Desktop Sidebar (DIV-based version) -->
  <div
    class="hidden lg:flex lg:flex-col lg:items-start lg:py-8 lg:px-6 lg:w-64 lg:h-screen lg:left-0 lg:top-0 bg-white/80 backdrop-blur-md shadow-lg border-r border-gray-300 z-50"
  >
    <div class="p-6 flex items-center gap-3">
      <img src="/images/logo.png" alt="Logo" class="w-11 h-11 rounded-full" />
      <h1 class="text-xl font-bold text-gray-700 select-none">ManoTech</h1>
    </div>

    <nav class="mt-4 w-full space-y-2">
      <sidebarItem
        v-for="item in sidebarItems"
        :key="item.to || item.label"
        v-bind="item"
        :isActive="route.path === item.to"
        :isExpanded="false"
      />
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import sidebarItem from "@/components/templates/sidebarItem.vue";
import loginService from "@/services/loginServices.js";

const route = useRoute();
const router = useRouter();
const isSidebarOpen = ref(false);

// Get user from either localStorage or sessionStorage based on rememberMe
const user = ref(null);
try {
  const local = localStorage.getItem("user");
  const session = sessionStorage.getItem("user");
  user.value = local ? JSON.parse(local) : session ? JSON.parse(session) : null;
} catch (e) {
  console.error("User data error:", e);
}

const hasAccess = (roles) => user.value && roles.includes(user.value.role);

const sidebarItems = computed(() =>
  [
    {
      to: "/dashboard",
      icon: "fa-solid fa-home",
      label: "Dashboard",
      show: hasAccess(["Admin", "Manager", "Caretaker"]),
    },
    {
      to: "/environmental-control",
      icon: "fa-solid fa-temperature-high",
      label: "Environmental Control",
      show: hasAccess(["Admin", "Manager", "Caretaker"]),
    },
    {
      to: "/feed",
      icon: "fa-solid fa-bowl-food",
      label: "Feeding Control",
      show: hasAccess(["Admin", "Manager"]),
    },
    {
      to: "/watering",
      icon: "fa-solid fa-droplet",
      label: "Watering Control",
      show: hasAccess(["Admin", "Manager"]),
    },
    {
      to: "/reports",
      icon: "fa-solid fa-chart-bar",
      label: "Reports",
      show: hasAccess(["Admin", "Manager", "Caretaker"]),
    },
    {
      to: "/weight-estimation",
      icon: "fa-solid fa-weight-scale",
      label: "Weight Estimation",
      show: hasAccess(["Admin", "Manager", "Caretaker"]),
    },
    {
      to: "/device",
      icon: "fa-solid fa-microchip", // ✅ Updated icon
      label: "Device",
      show: hasAccess(["Admin", "Manager", "Caretaker"]),
    },
    {
      to: "/profile",
      icon: "fa-regular fa-circle-user",
      label: "Profile",
      show: hasAccess(["Admin", "Manager", "Caretaker"]),
    },
    {
      to: "/accounts",
      icon: "fa-solid fa-shield-halved",
      label: "Accounts",
      show: hasAccess(["Admin"]),
    },
    {
      to: "/system-logs",
      icon: "fa-solid fa-file-lines", // represents logs or documents
      label: "System Modification Logs",
      show: hasAccess(["Admin"]),
    },

    {
      label: "Logout",
      icon: "fa-solid fa-right-from-bracket",
      show: true,
      onClick: async () => {
        try {
          const result = await loginService.logoutUser();
          if (result.success) {
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            router.push("/login");
          } else {
            console.log("❎ Logout aborted.");
          }
        } catch (err) {
          console.error("Logout error:", err);
        }
      },
    },
  ].filter((item) => item.show)
);

const pizzaItems = sidebarItems.value;

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Optional: if positioning is still needed dynamically
const getCoords = (index) => {
  const angle = (index / pizzaItems.length) * 2 * Math.PI - Math.PI / 2;
  const radius = 90; // ✅ Adjusted for tighter spacing
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
};
</script>
