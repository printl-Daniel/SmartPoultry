import { createRouter, createWebHistory } from "vue-router";

// Define routes
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager", "Caretaker"] },
  },
  {
    path: "/environmental-control",
    name: "EnvironmentalControl",
    component: () => import("@/views/EnvironmentalControl.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager", "Caretaker"] },
  },
  {
    path: "/feed",
    name: "Feed",
    component: () => import("@/views/Feed.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager"] },
  },
  {
    path: "/weight-estimation",
    name: "WeightEstimation",
    component: () => import("@/views/WeightEstimation.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager", "Caretaker"] },
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("@/views/Notifications.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager"] },
  },
  {
    path: "/cleaning",
    name: "Cleaning",
    component: () => import("@/views/Cleaning.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager"] },
  },
  {
    path: "/watering",
    name: "Watering",
    component: () => import("@/views/Watering.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager"] },
  },
  {
    path: "/reports",
    name: "Reports",
    component: () => import("@/views/Reports.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager", "Caretaker"] },
  },
  {
    path: "/device",
    name: "Device",
    component: () => import("@/views/Device.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Manager", "Caretaker"] },
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: () => import("@/views/Accounts.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
  },
  {
    path: "/system-logs",
    name: "/systemLogs",
    component: () => import("@/views/SystemLogs.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: () => import("@/views/Unauthorized.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const userStr = localStorage.getItem("user");
  let user = null;

  try {
    user = JSON.parse(userStr);
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
  }

  if (to.meta.requiresAuth) {
    if (!user || !user.role) {
      return next({ name: "Login" });
    }

    const hasAccess = to.meta.roles.includes(user.role);
    if (!hasAccess) {
      return next({ name: "Unauthorized" });
    }
  }

  return next();
});

export default router;
