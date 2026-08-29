<template>
  <div
    class="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100"
  >
    <div>
      <Nav />
    </div>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <div class="p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 md:mb-6 gap-2 sm:gap-3 md:gap-4"
        >
          <div class="w-full sm:w-auto">
            <h1
              class="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
            >
              Account Management
            </h1>
            <p
              class="text-gray-600 mt-0.5 sm:mt-1 text-xs xs:text-sm sm:text-base md:text-lg"
            >
              Manage user accounts and permissions
            </p>
          </div>
          <button
            @click="isModalOpen = true"
            class="bg-blue-600 text-white px-2 xs:px-3 sm:px-4 md:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-md sm:rounded-lg hover:bg-blue-700 active:bg-blue-800 flex items-center transition-all duration-200 w-full sm:w-auto justify-center text-xs xs:text-sm sm:text-base md:text-lg font-medium shadow-sm hover:shadow-md"
          >
            <UserPlus
              class="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 xs:mr-2"
            />
            <span class="hidden xs:inline">Add New Account</span>
            <span class="xs:hidden">Add Account</span>
          </button>
        </div>

        <!-- Account Statistics -->
        <div
          class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-3 sm:mb-4 md:mb-6"
        >
          <div
            class="bg-white p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center justify-between">
              <div class="min-w-0 flex-1">
                <p
                  class="text-gray-500 text-xs xs:text-sm sm:text-base font-medium truncate"
                >
                  Total Accounts
                </p>
                <h3
                  class="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5"
                >
                  {{ totalAccounts }}
                </h3>
              </div>
              <div
                class="p-1.5 xs:p-2 sm:p-2.5 md:p-3 bg-blue-100 rounded-full flex-shrink-0 ml-2"
              >
                <Users
                  class="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600"
                />
              </div>
            </div>
          </div>
          <div
            class="bg-white p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center justify-between">
              <div class="min-w-0 flex-1">
                <p
                  class="text-gray-500 text-xs xs:text-sm sm:text-base font-medium truncate"
                >
                  Active Accounts
                </p>
                <h3
                  class="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5"
                >
                  {{ activeAccounts }}
                </h3>
              </div>
              <div
                class="p-1.5 xs:p-2 sm:p-2.5 md:p-3 bg-green-100 rounded-full flex-shrink-0 ml-2"
              >
                <UserCheck
                  class="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-green-600"
                />
              </div>
            </div>
          </div>
          <div
            class="bg-white p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 xs:col-span-2 lg:col-span-1"
          >
            <div class="flex items-center justify-between">
              <div class="min-w-0 flex-1">
                <p
                  class="text-gray-500 text-xs xs:text-sm sm:text-base font-medium truncate"
                >
                  Inactive Accounts
                </p>
                <h3
                  class="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5"
                >
                  {{ inactiveAccounts }}
                </h3>
              </div>
              <div
                class="p-1.5 xs:p-2 sm:p-2.5 md:p-3 bg-red-100 rounded-full flex-shrink-0 ml-2"
              >
                <UserX
                  class="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-red-600"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Account List -->
        <div class="bg-white rounded-md sm:rounded-lg md:rounded-xl shadow-sm">
          <div class="p-2 xs:p-3 sm:p-4 md:p-5 border-b border-gray-200">
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 md:gap-4"
            >
              <h3
                class="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900"
              >
                Account List
              </h3>
              <div
                class="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3 w-full xs:w-auto"
              >
                <div class="relative flex-1 xs:flex-none">
                  <Search
                    class="absolute left-2 xs:left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4"
                  />
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search accounts..."
                    class="pl-7 xs:pl-8 sm:pl-10 pr-2 xs:pr-3 py-1.5 xs:py-2 sm:py-2.5 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full xs:w-48 sm:w-56 md:w-64 text-xs xs:text-sm sm:text-base transition-all duration-200"
                  />
                </div>
                <select
                  v-model="roleFilter"
                  class="px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-2 sm:py-2.5 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base bg-white transition-all duration-200"
                >
                  <option value="">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Caretaker">Caretaker</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    class="px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    class="px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone Number
                  </th>
                  <th
                    class="px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Login
                  </th>
                  <th
                    class="px-3 lg:px-4 xl:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(account, id) in filteredAccounts"
                  :key="id"
                  class="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td
                    class="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
                        <div
                          class="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gray-300 flex items-center justify-center"
                        >
                          <User class="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
                        </div>
                      </div>
                      <div class="ml-3 lg:ml-4">
                        <div
                          class="text-sm lg:text-base font-medium text-gray-900"
                        >
                          {{ account.name }}
                        </div>
                        <div class="text-xs lg:text-sm text-gray-500">
                          {{ account.email }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap"
                  >
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                    >
                      {{ account.role }}
                    </span>
                  </td>
                  <td
                    class="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap"
                  >
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="
                        account.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ account.status }}
                    </span>
                  </td>
                  <td
                    class="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500"
                  >
                    {{ account.number || "N/A" }}
                  </td>
                  <td
                    class="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500"
                  >
                    {{ account.lastLogin }}
                  </td>
                  <td
                    class="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap text-sm font-medium"
                  >
                    <div class="flex items-center space-x-2">
                      <button
                        class="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-all duration-150"
                        @click="editAccount(id)"
                        title="Edit Account"
                      >
                        <Edit2 class="w-4 h-4 lg:w-5 lg:h-5" />
                      </button>
                      <button
                        class="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-all duration-150"
                        @click="deleteAccount(id)"
                        title="Delete Account"
                      >
                        <Trash2 class="w-4 h-4 lg:w-5 lg:h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Tablet Table View -->
          <div class="hidden md:block lg:hidden overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User & Role
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status & Contact
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(account, id) in filteredAccounts"
                  :key="id"
                  class="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td class="px-4 py-4">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div
                          class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"
                        >
                          <User class="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ account.name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ account.email }}
                        </div>
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1"
                        >
                          {{ account.role }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <div class="space-y-1">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        :class="
                          account.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        "
                      >
                        {{ account.status }}
                      </span>
                      <div class="text-sm text-gray-500">
                        {{ account.number || "No phone" }}
                      </div>
                      <div class="text-xs text-gray-400">
                        Last: {{ account.lastLogin }}
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <div class="flex items-center space-x-2">
                      <button
                        class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50 transition-all duration-150"
                        @click="editAccount(id)"
                        title="Edit Account"
                      >
                        <Edit2 class="w-4 h-4" />
                      </button>
                      <button
                        class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 transition-all duration-150"
                        @click="deleteAccount(id)"
                        title="Delete Account"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Card View -->
          <div class="md:hidden">
            <div
              v-if="Object.keys(filteredAccounts).length === 0"
              class="p-4 xs:p-6 sm:p-8 text-center text-gray-500"
            >
              <Users
                class="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 xs:mb-3 sm:mb-4"
              />
              <p class="text-sm xs:text-base sm:text-lg font-medium">
                No accounts found
              </p>
              <p class="text-xs xs:text-sm mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
            <div v-else class="divide-y divide-gray-200">
              <div
                v-for="(account, id) in filteredAccounts"
                :key="id"
                class="p-2 xs:p-3 sm:p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
              >
                <div class="flex items-start justify-between">
                  <div
                    class="flex items-center space-x-2 xs:space-x-3 flex-1 min-w-0"
                  >
                    <div
                      class="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0"
                    >
                      <User
                        class="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-500"
                      />
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4
                        class="text-xs xs:text-sm sm:text-base font-medium text-gray-900 truncate"
                      >
                        {{ account.name }}
                      </h4>
                      <p class="text-xs sm:text-sm text-gray-500 truncate">
                        {{ account.email }}
                      </p>
                      <div
                        class="flex items-center space-x-1 xs:space-x-2 mt-1"
                      >
                        <span
                          class="px-1.5 xs:px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                        >
                          {{ account.role }}
                        </span>
                        <span
                          class="px-1.5 xs:px-2 py-0.5 text-xs font-semibold rounded-full"
                          :class="
                            account.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          "
                        >
                          {{ account.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-1 flex-shrink-0 ml-2">
                    <button
                      class="text-blue-600 hover:text-blue-900 active:text-blue-700 p-1.5 xs:p-2 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-150"
                      @click="editAccount(id)"
                      title="Edit Account"
                    >
                      <Edit2 class="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      class="text-red-600 hover:text-red-900 active:text-red-700 p-1.5 xs:p-2 rounded-md hover:bg-red-50 active:bg-red-100 transition-all duration-150"
                      @click="deleteAccount(id)"
                      title="Delete Account"
                    >
                      <Trash2 class="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
                <div
                  class="mt-2 xs:mt-3 grid grid-cols-1 xs:grid-cols-2 gap-1 xs:gap-2 sm:gap-4 text-xs sm:text-sm"
                >
                  <div class="flex items-center">
                    <span class="text-gray-500 font-medium">Phone:</span>
                    <span class="ml-1 text-gray-900 truncate">{{
                      account.number || "N/A"
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-gray-500 font-medium">Last Login:</span>
                    <span class="ml-1 text-gray-900 truncate">{{
                      account.lastLogin
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Account Modal -->
      <div
        v-if="isEditModalOpen"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-2 xs:p-3 sm:p-4"
        @click="closeEditModal"
      >
        <div
          class="bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg max-h-[95vh] xs:max-h-[90vh] overflow-y-auto animate-fade-in"
          @click.stop
        >
          <div class="p-3 xs:p-4 sm:p-6">
            <div class="flex justify-between items-center mb-3 xs:mb-4 sm:mb-6">
              <h2
                class="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900"
              >
                Edit Account
              </h2>
              <button
                @click="closeEditModal"
                class="text-gray-400 hover:text-gray-600 active:text-gray-800 p-1 xs:p-1.5 rounded-md hover:bg-gray-100 transition-all duration-150"
              >
                <X class="w-4 h-4 xs:w-5 xs:h-5" />
              </button>
            </div>

            <div class="space-y-3 xs:space-y-4 sm:space-y-5">
              <div>
                <label
                  class="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5"
                  >Full Name</label
                >
                <input
                  v-model="editedAccount.name"
                  type="text"
                  placeholder="Full Name"
                  class="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base transition-all duration-200"
                />
              </div>
              <div>
                <label
                  class="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5"
                  >Email Address</label
                >
                <input
                  v-model="editedAccount.email"
                  type="email"
                  placeholder="Email Address"
                  class="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base transition-all duration-200"
                />
              </div>
              <div>
                <label
                  class="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5"
                  >Phone Number</label
                >
                <input
                  v-model="editedAccount.number"
                  type="tel"
                  placeholder="Phone Number"
                  class="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base transition-all duration-200"
                />
              </div>
              <div>
                <label
                  class="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5"
                  >Role</label
                >
                <select
                  v-model="editedAccount.role"
                  class="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base bg-white transition-all duration-200"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Operator">Operator</option>
                  <option value="Caretaker">Caretaker</option>
                </select>
              </div>
            </div>

            <div
              class="flex flex-col xs:flex-row justify-end space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3 mt-4 xs:mt-5 sm:mt-6"
            >
              <button
                class="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-md sm:rounded-lg transition-all duration-200 text-xs xs:text-sm sm:text-base font-medium"
                @click="closeEditModal"
              >
                Cancel
              </button>
              <button
                class="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md sm:rounded-lg transition-all duration-200 text-xs xs:text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
                @click="saveAccountChanges"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Account Modal -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-2 xs:p-3 sm:p-4"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg max-h-[95vh] xs:max-h-[90vh] overflow-y-auto animate-fade-in"
          @click.stop
        >
          <div class="p-3 xs:p-4 sm:p-6">
            <div class="flex justify-between items-center mb-3 xs:mb-4 sm:mb-6">
              <h2
                class="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900"
              >
                Add New Account
              </h2>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 active:text-gray-800 p-1 xs:p-1.5 rounded-md hover:bg-gray-100 transition-all duration-150"
              >
                <X class="w-4 h-4 xs:w-5 xs:h-5" />
              </button>
            </div>

            <div class="space-y-3 xs:space-y-4 sm:space-y-5">
              <div>
                <label
                  class="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5"
                  >Full Name</label
                >
                <input
                  v-model="newAccount.name"
                  type="text"
                  placeholder="Full Name"
                  class="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base transition-all duration-200"
                />
              </div>
              <div>
                <label
                  class="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5"
                  >Email Address</label
                >
                <input
                  v-model="newAccount.email"
                  type="email"
                  placeholder="Email Address"
                  class="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base transition-all duration-200"
                />
              </div>
              <div>
                <label
                  class="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5"
                  >Phone Number</label
                >
                <input
                  v-model="newAccount.number"
                  type="tel"
                  placeholder="Phone Number"
                  class="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base transition-all duration-200"
                />
              </div>
              <div>
                <label
                  class="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5"
                  >Role</label
                >
                <select
                  v-model="newAccount.role"
                  class="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base bg-white transition-all duration-200"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Caretaker">Caretaker</option>
                </select>
              </div>
            </div>

            <div
              class="flex flex-col xs:flex-row justify-end space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3 mt-4 xs:mt-5 sm:mt-6"
            >
              <button
                class="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-md sm:rounded-lg transition-all duration-200 text-xs xs:text-sm sm:text-base font-medium"
                @click="closeModal"
              >
                Cancel
              </button>
              <button
                class="px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md sm:rounded-lg transition-all duration-200 text-xs xs:text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
                @click="addNewAccount"
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import {
  UserPlus,
  Users,
  UserCheck,
  UserX,
  Search,
  User,
  Edit2,
  Trash2,
  X,
} from "lucide-vue-next";
import Nav from "@/components/templates/Nav.vue";
import accountService from "@/services/accountServices.js";

// Search and filter
const searchQuery = ref("");
const roleFilter = ref("");

// Modal states
const isModalOpen = ref(false);
const isEditModalOpen = ref(false);

// Data
const accounts = reactive({});
const totalAccounts = ref(0);
const activeAccounts = ref(0);
const inactiveAccounts = ref(0);

const newAccount = reactive({
  name: "",
  email: "",
  number: "",
  role: "Caretaker",
  status: "Inactive",
  lastLogin: "00:00",
});

const editedAccount = reactive({
  id: null,
  name: "",
  email: "",
  number: "",
  role: "Caretaker",
  status: "Inactive",
});

let unsubscribe = null;

// Computed filtered accounts
const filteredAccounts = computed(() => {
  let filtered = { ...accounts };

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = Object.fromEntries(
      Object.entries(filtered).filter(
        ([id, account]) =>
          account.name.toLowerCase().includes(query) ||
          account.email.toLowerCase().includes(query) ||
          account.role.toLowerCase().includes(query)
      )
    );
  }

  // Filter by role
  if (roleFilter.value) {
    filtered = Object.fromEntries(
      Object.entries(filtered).filter(
        ([id, account]) => account.role === roleFilter.value
      )
    );
  }

  return filtered;
});

// Fetch accounts and their counts
const fetchAccounts = () => {
  unsubscribe = accountService.getAccounts((data) => {
    // Clear existing accounts first to ensure deleted ones are removed
    for (const key in accounts) {
      if (accounts.hasOwnProperty(key)) {
        delete accounts[key];
      }
    }

    // Add all accounts from the data
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        accounts[key] = value;
      });
    }

    fetchAccountCounts();
  });
};

// Count total, active, and inactive accounts
const fetchAccountCounts = () => {
  let total = 0,
    active = 0,
    inactive = 0;

  for (const id in accounts) {
    if (accounts.hasOwnProperty(id)) {
      total++;
      if (accounts[id].status === "Active") active++;
      else inactive++;
    }
  }

  totalAccounts.value = total;
  activeAccounts.value = active;
  inactiveAccounts.value = inactive;
};

// Component mounted
onMounted(() => {
  fetchAccounts();
});

// Component unmounted
onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

// Add new account
const addNewAccount = async () => {
  try {
    if (!newAccount.name || !newAccount.email) {
      console.error("Name and Email are required.");
      return;
    }
    await accountService.addAccount({ ...newAccount });
    closeModal();
  } catch (error) {
    console.error("Error adding account:", error);
  }
};

// Edit existing account
const editAccount = (id) => {
  const account = accounts[id];
  if (!account) {
    console.error("Account not found.");
    return;
  }

  editedAccount.id = id;
  editedAccount.name = account.name;
  editedAccount.email = account.email;
  editedAccount.number = account.number;
  editedAccount.role = account.role;
  editedAccount.status = account.status;

  isEditModalOpen.value = true;
};

// Save edited account
const saveAccountChanges = async () => {
  try {
    if (!editedAccount.name || !editedAccount.email) {
      console.error("Name and Email are required.");
      return;
    }

    await accountService.updateAccount(editedAccount.id, {
      name: editedAccount.name,
      email: editedAccount.email,
      number: editedAccount.number,
      role: editedAccount.role,
      status: editedAccount.status,
    });

    console.log("Account updated successfully!");
    closeEditModal();
  } catch (error) {
    console.error("Error updating account:", error);
  }
};

// Delete account
const deleteAccount = async (id) => {
  try {
    if (!confirm("Are you sure you want to delete this account?")) return;

    await accountService.deleteAccount(id);
    delete accounts[id];
    fetchAccountCounts();

    console.log("Account deleted successfully!");
  } catch (error) {
    console.error("Error deleting account:", error);
  }
};

// Close modal and reset form
const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};

// Close edit modal
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Reset the form for adding a new account
const resetForm = () => {
  Object.assign(newAccount, {
    name: "",
    email: "",
    number: "",
    role: "Caretaker",
    status: "Inactive",
    lastLogin: "00:00",
  });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom breakpoint for extra small screens */
@media (min-width: 475px) {
  .xs\:p-3 {
    padding: 0.75rem;
  }
  .xs\:px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .xs\:py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .xs\:text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .xs\:text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  .xs\:text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  .xs\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .xs\:w-4 {
    width: 1rem;
  }
  .xs\:h-4 {
    height: 1rem;
  }
  .xs\:w-5 {
    width: 1.25rem;
  }
  .xs\:h-5 {
    height: 1.25rem;
  }
  .xs\:w-10 {
    width: 2.5rem;
  }
  .xs\:h-10 {
    height: 2.5rem;
  }
  .xs\:w-12 {
    width: 3rem;
  }
  .xs\:h-12 {
    height: 3rem;
  }
  .xs\:space-x-2 > :not([hidden]) ~ :not([hidden]) {
    margin-left: 0.5rem;
  }
  .xs\:space-x-3 > :not([hidden]) ~ :not([hidden]) {
    margin-left: 0.75rem;
  }
  .xs\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0;
  }
  .xs\:space-y-4 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1rem;
  }
  .xs\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .xs\:flex-row {
    flex-direction: row;
  }
  .xs\:flex-none {
    flex: none;
  }
  .xs\:w-auto {
    width: auto;
  }
  .xs\:w-48 {
    width: 12rem;
  }
  .xs\:col-span-2 {
    grid-column: span 2 / span 2;
  }
  .xs\:max-w-sm {
    max-width: 24rem;
  }
  .xs\:max-h-90vh {
    max-height: 90vh;
  }
  .xs\:mb-1\.5 {
    margin-bottom: 0.375rem;
  }
  .xs\:mb-3 {
    margin-bottom: 0.75rem;
  }
  .xs\:mb-4 {
    margin-bottom: 1rem;
  }
  .xs\:mt-3 {
    margin-top: 0.75rem;
  }
  .xs\:mt-5 {
    margin-top: 1.25rem;
  }
  .xs\:mr-2 {
    margin-right: 0.5rem;
  }
  .xs\:p-1\.5 {
    padding: 0.375rem;
  }
  .xs\:p-2 {
    padding: 0.5rem;
  }
  .xs\:p-2\.5 {
    padding: 0.625rem;
  }
  .xs\:px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .xs\:px-2\.5 {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }
  .xs\:px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .xs\:py-2\.5 {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
  }
  .xs\:gap-2 {
    gap: 0.5rem;
  }
  .xs\:gap-3 {
    gap: 0.75rem;
  }
  .xs\:inline {
    display: inline;
  }
  .xs\:hidden {
    display: none;
  }
  .xs\:block {
    display: block;
  }
  .xs\:left-2\.5 {
    left: 0.625rem;
  }
  .xs\:pl-8 {
    padding-left: 2rem;
  }
  .xs\:w-3\.5 {
    width: 0.875rem;
  }
  .xs\:h-3\.5 {
    height: 0.875rem;
  }
}
</style>
