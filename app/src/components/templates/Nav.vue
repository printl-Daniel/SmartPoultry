<template>
  <!-- Hamburger Button for Mobile -->
  <button
    class="fixed top-4 left-4 z-50 lg:hidden p-4 text-gray-700 hover:bg-gray-100 rounded-full transition"
    :class="{ 'left-56': isSidebarOpen }"
    @click="toggleSidebar"
  >
    <i class="fa-solid fa-bars text-2xl"></i>
  </button>

  <!-- Sidebar with Glassmorphism Effect -->
  <aside
    :class="{
      'translate-x-0': isSidebarOpen || isHovered,
      '-translate-x-full': !isSidebarOpen && !isHovered,
    }"
    class="fixed top-0 left-0 bottom-0 lg:relative lg:w-64 bg-white/80 backdrop-blur-md shadow-lg border-r border-gray-300 transition-transform duration-300 z-50 sm:w-56 lg:transform-none lg:block lg:hover:translate-x-0"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="p-6 flex items-center gap-3">
      <img src="/images/logo.png" alt="Logo" class="w-11 h-11 rounded-full" />
      <h1 class="text-xl font-bold text-gray-700">Smart Poultry</h1>
    </div>

    <nav class="mt-4 space-y-3">
      <sidebarItem
        v-if="hasAccess(['Admin', 'Manager', 'Caretaker'])"
        to="/dashboard"
        icon="fa-solid fa-home"
        label="Dashboard"
        :isActive="route.path === '/dashboard'"
      />
      <sidebarItem
        v-if="hasAccess(['Admin', 'Manager', 'Caretaker'])"
        to="/environmental-control"
        icon="fa-solid fa-temperature-high"
        label="Environmental Control"
        :isActive="route.path === '/environmental-control'"
      />
      <sidebarItem
        v-if="hasAccess(['Admin', 'Manager'])"
        to="/feed"
        icon="fa-solid fa-bowl-food"
        label="Feeding Control"
        :isActive="route.path === '/feed'"
      />
      <sidebarItem
        v-if="hasAccess(['Admin', 'Manager'])"
        to="/watering"
        icon="fa-solid fa-droplet"
        label="Watering Control"
        :isActive="route.path === '/watering'"
      />
      <sidebarItem
        v-if="hasAccess(['Admin', 'Manager', 'Caretaker'])"
        to="/reports"
        icon="fa-solid fa-chart-bar"
        label="Reports"
        :isActive="route.path === '/reports'"
      />
      <sidebarItem
        v-if="hasAccess(['Admin', 'Manager', 'Caretaker'])"
        to="/weight-estimation"
        icon="fa-solid fa-chart-bar"
        label="Weight Estimation"
        :isActive="route.path === '/weight-estimation'"
      />
      <sidebarItem
        v-if="hasAccess(['Admin', 'Manager', 'Caretaker'])"
        to="/profile"
        icon="fa-regular fa-circle-user"
        label="Profile"
        :isActive="route.path === '/profile'"
      />
      <sidebarItem
        v-if="hasAccess(['Admin'])"
        to="/accounts"
        icon="fa-solid fa-shield-halved"
        label="Accounts"
        :isActive="route.path === '/accounts'"
      />
      <sidebarItem
        icon="fa-solid fa-right-from-bracket"
        label="Logout"
        :isActive="route.path === '/login'"
        @click="handleLogout"
      />
    </nav>
  </aside>

  <!-- Overlay for Mobile Sidebar -->
  <div
    v-if="isSidebarOpen"
    class="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
    @click="toggleSidebar"
  ></div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import sidebarItem from "@/components/templates/sidebarItem.vue";
import loginService from "@/services/loginServices.js";

const route = useRoute();
const router = useRouter();
const isSidebarOpen = ref(false);
const isHovered = ref(false);

const user = ref(null);

try {
  user.value = JSON.parse(localStorage.getItem("user"));
} catch (e) {
  console.error("❌ Error parsing user from localStorage:", e);
}

const hasAccess = (roles) => {
  return user.value && roles.includes(user.value.role);
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLogout = async () => {
  try {
    await loginService.logoutUser();
    router.push("/login");
  } catch (error) {
    console.error("🚨 Logout handler error:", error.message);
  }
};
</script>
