<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <Nav />
    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-8 overflow-y-auto">
      <div class="max-w-6xl mx-auto">
        <!-- Page Header -->
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <div class="h-8 w-1 bg-[#3b82f6] rounded-full"></div>

            <h1 class="text-3xl font-bold text-slate-800">My Profile</h1>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Personal Information -->
          <div class="lg:col-span-2">
            <!-- Personal Information Card -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md h-full"
            >
              <div class="border-b border-slate-100">
                <div
                  class="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <h3 class="text-xl font-bold text-slate-800">
                      Personal Information
                    </h3>
                    <p class="text-slate-500 text-sm mt-1">
                      Update your personal details
                    </p>
                  </div>
                  <span
                    class="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full whitespace-nowrap"
                  >
                    Last updated: {{ formatDate(user.updatedAt) }}
                  </span>
                </div>
              </div>

              <form @submit.prevent="saveChanges" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <!-- Name -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2"
                      >Full Name</label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                          ></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <input
                        type="text"
                        v-model="user.name"
                        class="pl-12 block w-full rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-12 px-4 text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2"
                      >Email Address</label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          ></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <input
                        type="email"
                        v-model="user.email"
                        class="pl-12 block w-full rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-12 px-4 text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <!-- Phone -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-slate-700 mb-2"
                    >Phone Number</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="tel"
                      v-model="user.number"
                      class="pl-12 block w-full rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-12 px-4 text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <!-- Role -->
                <div class="mb-8">
                  <label class="block text-sm font-medium text-slate-700 mb-2"
                    >Role</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      v-model="user.role"
                      class="pl-12 block w-full rounded-xl border border-slate-200 bg-slate-100 shadow-sm h-12 px-4 text-slate-700"
                      readonly
                    />
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end border-t border-slate-100 pt-6">
                  <button
                    type="submit"
                    class="bg-[#3b82f6] text-white h-12 px-8 rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
                    :disabled="isSaving"
                  >
                    <svg
                      v-if="isSaving"
                      class="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                      ></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    <span v-if="isSaving">Saving...</span>
                    <span v-else>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Right Column - Account Summary -->
          <div>
            <!-- Account Summary Card -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md h-full"
            >
              <div class="border-b border-slate-100">
                <div class="px-6 py-5 flex items-center justify-between">
                  <h3 class="text-lg font-bold text-slate-800 mt-5">
                    Account Summary
                  </h3>
                  <span
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"
                  >
                    {{ user.status || "Active" }}
                  </span>
                </div>
              </div>

              <div class="p-6">
                <div class="space-y-5">
                  <div class="flex items-center gap-4">
                    <div
                      class="bg-gradient-to-br from-slate-100 to-slate-200 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-slate-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm text-slate-500 mb-1">Name</p>
                      <p class="font-medium truncate">
                        {{ user.name || "John Doe" }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <div
                      class="bg-gradient-to-br from-slate-100 to-slate-200 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-slate-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        ></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm text-slate-500 mb-1">Email</p>
                      <p class="font-medium truncate">
                        {{ user.email || "john.doe@example.com" }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <div
                      class="bg-gradient-to-br from-slate-100 to-slate-200 p-3 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-slate-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm text-slate-500 mb-1">Role</p>
                      <p class="font-medium truncate">
                        {{ user.role || "Farm Admin" }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="border-t border-slate-100 mt-10 pt-8">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-sm text-slate-600">Member Since</span>
                    <span
                      class="text-sm font-medium bg-slate-100 px-3 py-1 rounded-lg"
                      >{{ formatDate(user.createdAt) }}</span
                    >
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-slate-600">Last Login</span>
                    <span
                      class="text-sm font-medium bg-slate-100 px-3 py-1 rounded-lg"
                      >{{ formatDate(user.lastLogin, true) }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings - Full Width Row -->
        <!-- Security Settings - Full Width Row -->
        <div class="mt-8">
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div class="border-b border-slate-100">
              <div class="px-6 py-5">
                <h3 class="text-lg font-bold text-slate-800">
                  Security Settings
                </h3>
              </div>
            </div>

            <div class="p-6">
              <!-- Change Password button -->
              <button
                @click="openChangePasswordModal"
                class="w-full flex items-center justify-between px-5 py-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200 group"
              >
                <div class="flex items-center">
                  <div
                    class="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl mr-4 flex-shrink-0 w-12 h-12 flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-[#3b82f6]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div class="text-left">
                    <span class="text-sm font-medium text-slate-800"
                      >Change Password</span
                    >
                    <p class="text-xs text-slate-500 mt-1">
                      Update your account password
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-slate-400 group-hover:text-[#3b82f6] transition-colors duration-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Change Password Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      @click="closeChangePasswordModal"
    >
      <div
        class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4 transform transition-all duration-300"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-slate-900">Change Password</h3>
            <p class="text-slate-500 text-sm mt-1">
              Update your account password
            </p>
          </div>
          <button
            @click="closeChangePasswordModal"
            class="text-slate-400 hover:text-slate-500 transition-colors duration-200 flex-shrink-0 bg-slate-100 rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form @submit.prevent="updatePassword" class="space-y-5">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-700"
              >Current Password</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                v-model="password.current"
                class="pl-12 block w-full rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-12 px-4 text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                placeholder="Enter current password"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-700"
              >New Password</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                type="password"
                v-model="password.new"
                class="pl-12 block w-full rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-12 px-4 text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-700"
              >Confirm New Password</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <input
                type="password"
                v-model="password.confirm"
                class="pl-12 block w-full rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-12 px-4 text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                placeholder="Confirm new password"
              />
            </div>
            <p v-if="passwordError" class="text-red-500 text-sm mt-1">
              {{ passwordError }}
            </p>
          </div>

          <div class="pt-4 border-t border-slate-100">
            <div class="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                @click="closeChangePasswordModal"
                class="px-5 h-12 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                :disabled="isUpdatingPassword"
              >
                <svg
                  v-if="isUpdatingPassword"
                  class="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span v-if="isUpdatingPassword">Updating...</span>
                <span v-else>Update Password</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Nav from "@/components/templates/Nav.vue";
import profileServices from "@/services/profileServices"; // ← Import your service

// User data with default values
const user = ref({
  name: "John Doe",
  email: "john.doe@example.com",
  number: "+1 (555) 123-4567",
  role: "Farm Admin",
  status: "Active",
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
  lastLogin: new Date(),
  updatedAt: new Date(),
});

// UI state
const isModalOpen = ref(false);
const password = ref({ current: "", new: "", confirm: "" });
const passwordError = ref("");
const isSaving = ref(false);
const isUpdatingPassword = ref(false);

// Format date helper
function formatDate(date, includeTime = false) {
  if (!date) return "N/A";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "N/A";

  const options = { year: "numeric", month: "short", day: "numeric" };
  if (includeTime) {
    return new Intl.DateTimeFormat("en-US", {
      ...options,
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  }
  return new Intl.DateTimeFormat("en-US", options).format(d);
}

// Password modal handlers
function openChangePasswordModal() {
  password.value = { current: "", new: "", confirm: "" };
  passwordError.value = "";
  isModalOpen.value = true;
}

function closeChangePasswordModal() {
  isModalOpen.value = false;
}

async function updatePassword() {
  if (password.value.new !== password.value.confirm) {
    passwordError.value = "Passwords do not match";
    return;
  }

  if (password.value.new.length < 6) {
    passwordError.value = "Password must be at least 6 characters";
    return;
  }

  isUpdatingPassword.value = true;
  passwordError.value = "";

  try {
    // Call real API: pass current and new passwords
    await profileServices.updatePassword(
      password.value.current,
      password.value.new
    );

    alert("✅ Password updated successfully");
    closeChangePasswordModal();
  } catch (error) {
    passwordError.value = error?.message || "Failed to update password";
  } finally {
    isUpdatingPassword.value = false;
  }
}

// Save changes function
async function saveChanges() {
  isSaving.value = true;
  try {
    const updatedData = {
      name: user.value.name,
      email: user.value.email,
      number: user.value.number,
      updatedAt: new Date(),
    };
    await profileServices.saveUserProfile(updatedData);
    user.value.updatedAt = new Date();
    alert("✅ Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("❌ Failed to update profile");
  } finally {
    isSaving.value = false;
  }
}

// Initialize component
onMounted(async () => {
  try {
    const userData = await profileServices.getUser();
    user.value = {
      ...user.value,
      ...userData,
      createdAt: userData.createdAt ? new Date(userData.createdAt) : null,
      lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : null,
      updatedAt: userData.updatedAt ? new Date(userData.updatedAt) : null,
    };
  } catch (error) {
    console.error("Failed to load user data:", error);
  }
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
