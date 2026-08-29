<template>
  <div
    class="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100"
  >
    <!-- Sidebar -->
    <div>
      <Nav />
    </div>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-3 sm:p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <!-- Page Header -->
          <div class="mb-4 sm:mb-6 lg:mb-8 lg:ml-0">
            <div class="flex items-center gap-2 sm:gap-3 mb-2">
              <div class="h-4 sm:h-6 lg:h-8 w-1 bg-blue-600 rounded-full"></div>
              <h1
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800"
              >
                System Modification Logs
              </h1>
            </div>
            <p
              class="text-xs sm:text-sm md:text-base text-slate-500 ml-5 sm:ml-7 lg:ml-11"
            >
              Track who made changes to the system
            </p>

            <!-- Monthly Deletion Reminder -->
            <div
              class="mt-3 sm:mt-4 p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg ml-5 sm:ml-7 lg:ml-11"
            >
              <div class="flex items-start gap-2">
                <AlertTriangle
                  class="h-3 w-3 sm:h-4 sm:w-4 text-amber-600 flex-shrink-0 mt-0.5"
                />
                <p class="text-xs sm:text-sm text-amber-800">
                  <strong>Important:</strong> System logs are automatically
                  deleted every month for storage optimization. Export important
                  logs for long-term retention.
                </p>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div
            class="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8"
          >
            <div
              class="space-y-3 sm:space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4 xl:gap-6"
            >
              <!-- User Filter -->
              <div class="space-y-1 sm:space-y-2">
                <label
                  class="block text-xs sm:text-sm font-medium text-slate-700"
                  >Filter by User</label
                >
                <select
                  v-model="filters.user"
                  class="block w-full rounded-md sm:rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-8 sm:h-10 lg:h-12 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm lg:text-base text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                >
                  <option value="">All Users</option>
                  <option v-for="user in uniqueUsers" :key="user" :value="user">
                    {{ user }}
                  </option>
                </select>
              </div>

              <!-- Role Filter -->
              <div class="space-y-1 sm:space-y-2">
                <label
                  class="block text-xs sm:text-sm font-medium text-slate-700"
                  >Filter by Role</label
                >
                <select
                  v-model="filters.role"
                  class="block w-full rounded-md sm:rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-8 sm:h-10 lg:h-12 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm lg:text-base text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                >
                  <option value="">All Roles</option>
                  <option v-for="role in uniqueRoles" :key="role" :value="role">
                    {{ role }}
                  </option>
                </select>
              </div>

              <!-- Action Filter -->
              <div class="space-y-1 sm:space-y-2">
                <label
                  class="block text-xs sm:text-sm font-medium text-slate-700"
                  >Filter by Action</label
                >
                <select
                  v-model="filters.action"
                  class="block w-full rounded-md sm:rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-8 sm:h-10 lg:h-12 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm lg:text-base text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                >
                  <option value="">All Actions</option>
                  <option
                    v-for="action in uniqueActions"
                    :key="action"
                    :value="action"
                  >
                    {{ action }}
                  </option>
                </select>
              </div>

              <!-- Search -->
              <div class="space-y-1 sm:space-y-2">
                <label
                  class="block text-xs sm:text-sm font-medium text-slate-700"
                  >Search</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-2 sm:pl-3 lg:pl-4 flex items-center pointer-events-none"
                  >
                    <Search
                      class="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-slate-400"
                    />
                  </div>
                  <input
                    type="text"
                    v-model="filters.search"
                    placeholder="Search descriptions, users, or actions..."
                    class="pl-8 sm:pl-10 lg:pl-12 block w-full rounded-md sm:rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm h-8 sm:h-10 lg:h-12 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm lg:text-base text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  />
                  <button
                    v-if="filters.search"
                    @click="clearSearch"
                    class="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
                  >
                    <X
                      class="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 hover:text-slate-600"
                    />
                  </button>
                </div>
              </div>
            </div>

            <!-- Filter Controls -->
            <div
              class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-3 sm:mt-4 lg:mt-6 gap-2 sm:gap-3"
            >
              <div class="text-xs sm:text-sm text-slate-600 order-2 sm:order-1">
                <span class="font-medium">{{ filteredLogs.length }}</span>
                of {{ logs.length }} modifications
                <span v-if="hasActiveFilters" class="text-blue-600">
                  (filtered)</span
                >
              </div>
              <div class="flex flex-col xs:flex-row gap-2 order-1 sm:order-2">
                <!-- Export Button -->
                <button
                  @click="exportToCSV"
                  :disabled="isExporting || filteredLogs.length === 0"
                  class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-md sm:rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 sm:gap-2"
                >
                  <Download class="h-3 w-3 sm:h-4 sm:w-4" />
                  {{ isExporting ? "Exporting..." : "Export CSV" }}
                </button>
                <button
                  @click="resetFilters"
                  :disabled="!hasActiveFilters"
                  class="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-slate-300 text-slate-700 rounded-md sm:rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <!-- Active Filters Display -->
            <div
              v-if="hasActiveFilters"
              class="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2"
            >
              <span class="text-xs text-slate-500 font-medium"
                >Active filters:</span
              >
              <span
                v-if="filters.user"
                class="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                User: {{ filters.user }}
                <button @click="clearUserFilter" class="hover:text-blue-900">
                  <X class="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </span>
              <span
                v-if="filters.role"
                class="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
              >
                Role: {{ filters.role }}
                <button @click="clearRoleFilter" class="hover:text-purple-900">
                  <X class="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </span>
              <span
                v-if="filters.action"
                class="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
              >
                Action: {{ filters.action }}
                <button @click="clearActionFilter" class="hover:text-amber-900">
                  <X class="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </span>
              <span
                v-if="filters.search"
                class="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                Search: "{{ filters.search }}"
                <button @click="clearSearch" class="hover:text-green-900">
                  <X class="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              </span>
            </div>
          </div>

          <!-- Logs Table/Cards -->
          <div
            class="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <!-- Header -->
            <div class="border-b border-slate-100">
              <div
                class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 lg:gap-4"
              >
                <h3 class="text-base sm:text-lg font-bold text-slate-800">
                  Modification History
                </h3>
                <div
                  class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end"
                >
                  <span
                    class="text-xs text-slate-500 bg-slate-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap"
                  >
                    {{ filteredLogs.length }} modifications
                  </span>
                  <button
                    @click="refreshLogs"
                    class="p-1.5 sm:p-2 text-slate-500 hover:text-blue-600 transition-colors rounded-full hover:bg-slate-100"
                    :class="{ 'animate-spin': isRefreshing }"
                  >
                    <RotateCcw class="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Desktop Table View (xl and up) -->
            <div class="hidden xl:block overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-100">
                <thead class="bg-slate-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-100">
                  <tr v-if="isLoading" class="animate-pulse">
                    <td
                      colspan="6"
                      class="px-6 py-12 text-center text-slate-500"
                    >
                      Loading logs...
                    </td>
                  </tr>
                  <tr v-else-if="paginatedLogs.length === 0">
                    <td
                      colspan="6"
                      class="px-6 py-12 text-center text-slate-500"
                    >
                      <FileText class="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p class="text-lg font-medium">
                        No modification logs found
                      </p>
                      <p class="text-sm mt-1">
                        Try adjusting your search or filter criteria
                      </p>
                    </td>
                  </tr>
                  <tr
                    v-for="log in paginatedLogs"
                    :key="log.id"
                    class="hover:bg-slate-50 transition-colors cursor-pointer"
                    @click="selectLog(log)"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-slate-700"
                    >
                      {{ formatDate(log.timestamp, true) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8">
                          <div
                            class="h-8 w-8 rounded-full flex items-center justify-center"
                            :class="getRoleAvatarColor(log.role)"
                          >
                            <span
                              class="text-xs font-medium"
                              :class="getRoleTextColor(log.role)"
                            >
                              {{ getUserInitial(log.user) }}
                            </span>
                          </div>
                        </div>
                        <div class="ml-3">
                          <div class="text-sm font-medium text-slate-900">
                            {{ log.user }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getRoleBadgeColor(log.role)"
                      >
                        {{ log.role }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getActionBadgeColor(log.action)"
                      >
                        {{ log.action }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-700">
                      <div class="max-w-xs xl:max-w-md truncate">
                        {{ log.description }}
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-slate-500"
                    >
                      <button
                        @click.stop="selectLog(log)"
                        class="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Tablet Table View (lg to xl) -->
            <div class="hidden lg:block xl:hidden overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-100">
                <thead class="bg-slate-50">
                  <tr>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      User & Role
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      class="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-100">
                  <tr v-if="isLoading" class="animate-pulse">
                    <td
                      colspan="4"
                      class="px-4 py-8 text-center text-slate-500"
                    >
                      Loading logs...
                    </td>
                  </tr>
                  <tr v-else-if="paginatedLogs.length === 0">
                    <td
                      colspan="4"
                      class="px-4 py-8 text-center text-slate-500"
                    >
                      <FileText class="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p class="font-medium">No logs found</p>
                    </td>
                  </tr>
                  <tr
                    v-for="log in paginatedLogs"
                    :key="log.id"
                    class="hover:bg-slate-50 transition-colors cursor-pointer"
                    @click="selectLog(log)"
                  >
                    <td class="px-4 py-4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8">
                          <div
                            class="h-8 w-8 rounded-full flex items-center justify-center"
                            :class="getRoleAvatarColor(log.role)"
                          >
                            <span
                              class="text-xs font-medium"
                              :class="getRoleTextColor(log.role)"
                            >
                              {{ getUserInitial(log.user) }}
                            </span>
                          </div>
                        </div>
                        <div class="ml-3">
                          <div class="text-sm font-medium text-slate-900">
                            {{ log.user }}
                          </div>
                          <div class="text-xs">
                            <span
                              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                              :class="getRoleBadgeColor(log.role)"
                            >
                              {{ log.role }}
                            </span>
                          </div>
                          <div class="text-xs text-slate-500 mt-1">
                            {{ formatDate(log.timestamp, true) }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="getActionBadgeColor(log.action)"
                      >
                        {{ log.action }}
                      </span>
                    </td>
                    <td class="px-4 py-4 text-sm text-slate-700">
                      <div class="max-w-xs truncate">{{ log.description }}</div>
                    </td>
                    <td class="px-4 py-4 text-sm">
                      <button
                        @click.stop="selectLog(log)"
                        class="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Card View (below lg) -->
            <div class="lg:hidden">
              <div
                v-if="isLoading"
                class="p-4 sm:p-6 text-center text-slate-500"
              >
                <div class="animate-pulse">Loading logs...</div>
              </div>
              <div
                v-else-if="paginatedLogs.length === 0"
                class="p-4 sm:p-6 lg:p-8 text-center text-slate-500"
              >
                <FileText
                  class="w-8 h-8 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4"
                />
                <p class="text-base sm:text-lg font-medium">
                  No modification logs found
                </p>
                <p class="text-xs sm:text-sm mt-1">
                  Try adjusting your search or filter criteria
                </p>
              </div>
              <div v-else class="divide-y divide-slate-100">
                <div
                  v-for="log in paginatedLogs"
                  :key="log.id"
                  class="p-3 sm:p-4 hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
                  @click="selectLog(log)"
                >
                  <!-- Header Row -->
                  <div class="flex items-start justify-between mb-2 sm:mb-3">
                    <div
                      class="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0"
                    >
                      <div
                        class="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center flex-shrink-0"
                        :class="getRoleAvatarColor(log.role)"
                      >
                        <span
                          class="text-xs sm:text-sm font-medium"
                          :class="getRoleTextColor(log.role)"
                        >
                          {{ getUserInitial(log.user) }}
                        </span>
                      </div>
                      <div class="min-w-0 flex-1">
                        <h4
                          class="text-xs sm:text-sm font-medium text-slate-900 truncate"
                        >
                          {{ log.user }}
                        </h4>
                        <p class="text-xs mt-0.5 sm:mt-1">
                          <span
                            class="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium"
                            :class="getRoleBadgeColor(log.role)"
                          >
                            {{ log.role }}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      class="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2"
                      :class="getActionBadgeColor(log.action)"
                    >
                      {{ log.action }}
                    </span>
                  </div>

                  <!-- Description -->
                  <div class="mb-2 sm:mb-3">
                    <p class="text-xs sm:text-sm text-slate-700 line-clamp-2">
                      {{ log.description }}
                    </p>
                  </div>

                  <!-- Footer Row -->
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-500">{{
                      formatDate(log.timestamp, true)
                    }}</span>
                    <button
                      @click.stop="selectLog(log)"
                      class="text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div
              v-if="totalPages > 1"
              class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between border-t border-slate-100"
            >
              <!-- Mobile Pagination -->
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 text-xs sm:text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft class="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Previous
                </button>
                <span
                  class="text-xs sm:text-sm text-slate-700 flex items-center"
                >
                  {{ currentPage }} / {{ totalPages }}
                </span>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 text-xs sm:text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight class="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                </button>
              </div>

              <!-- Desktop Pagination -->
              <div
                class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
              >
                <div>
                  <p class="text-xs sm:text-sm text-slate-700">
                    Showing <span class="font-medium">{{ startItem }}</span> to
                    <span class="font-medium">{{ endItem }}</span> of
                    <span class="font-medium">{{ filteredLogs.length }}</span>
                    results
                  </p>
                </div>
                <div>
                  <nav
                    class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  >
                    <button
                      @click="prevPage"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-l-md border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft class="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      v-for="page in displayedPages"
                      :key="page"
                      @click="goToPage(page)"
                      :class="[
                        currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50',
                        'relative inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2 border text-xs sm:text-sm font-medium transition-colors',
                      ]"
                    >
                      {{ page }}
                    </button>
                    <button
                      @click="nextPage"
                      :disabled="currentPage === totalPages"
                      class="relative inline-flex items-center px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-r-md border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight class="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Log Detail Modal -->
    <div
      v-if="selectedLog"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 p-2 sm:p-4"
      @click="closeLogDetail"
    >
      <div
        class="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl w-full max-w-xs sm:max-w-lg lg:max-w-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-3 sm:p-4 lg:p-6">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <div class="flex items-center gap-2 sm:gap-3">
              <span
                class="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-full"
                :class="getActionModalColor(selectedLog.action)"
              >
                <Shield
                  class="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5"
                  :class="getActionIconColor(selectedLog.action)"
                />
              </span>
              <div>
                <h3
                  class="text-base sm:text-lg lg:text-xl font-bold text-slate-900"
                >
                  Modification Details
                </h3>
                <p class="text-slate-500 text-xs sm:text-sm">
                  ID: {{ selectedLog.id }}
                </p>
              </div>
            </div>
            <button
              @click="closeLogDetail"
              class="text-slate-400 hover:text-slate-500 transition-colors duration-200 flex-shrink-0 bg-slate-100 rounded-full p-1.5 sm:p-2"
            >
              <X class="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            </button>
          </div>

          <!-- Modal Content -->
          <div class="space-y-3 sm:space-y-4 lg:space-y-6">
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
            >
              <div>
                <p class="text-xs sm:text-sm text-slate-500 mb-1">
                  Date & Time
                </p>
                <p class="font-medium text-xs sm:text-sm lg:text-base">
                  {{ formatDate(selectedLog.timestamp, true) }}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm text-slate-500 mb-1">User</p>
                <p class="font-medium text-xs sm:text-sm lg:text-base">
                  {{ selectedLog.user }}
                </p>
              </div>
              <div>
                <p class="text-xs sm:text-sm text-slate-500 mb-1">Role</p>
                <span
                  class="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getRoleBadgeColor(selectedLog.role)"
                >
                  {{ selectedLog.role }}
                </span>
              </div>
              <div>
                <p class="text-xs sm:text-sm text-slate-500 mb-1">Action</p>
                <span
                  class="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getActionBadgeColor(selectedLog.action)"
                >
                  {{ selectedLog.action }}
                </span>
              </div>
            </div>

            <div>
              <p class="text-xs sm:text-sm text-slate-500 mb-1">Description</p>
              <p
                class="font-medium text-slate-800 text-xs sm:text-sm lg:text-base"
              >
                {{ selectedLog.description }}
              </p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button
              @click="closeLogDetail"
              class="px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-300 text-slate-700 rounded-md sm:rounded-lg hover:bg-slate-50 transition-colors text-xs sm:text-sm lg:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  Search,
  RotateCcw,
  FileText,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
  Download,
  AlertTriangle,
} from "lucide-vue-next";
import Nav from "@/components/templates/Nav.vue";
import logsService from "../services/logsServices.js";

// State
const logs = ref([]);
const selectedLog = ref(null);
const isLoading = ref(true);
const isRefreshing = ref(false);
const isExporting = ref(false);

// Filters
const filters = ref({
  user: "",
  role: "",
  action: "",
  search: "",
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Helper functions
function getUserInitial(user) {
  return user.charAt(0).toUpperCase();
}

function formatDate(timestamp, includeTime = false) {
  if (!timestamp) return "N/A";

  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "N/A";

    const options = { year: "numeric", month: "short", day: "numeric" };
    if (includeTime) {
      return new Intl.DateTimeFormat("en-US", {
        ...options,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date);
    }
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
}

function getRoleAvatarColor(role) {
  switch (role) {
    case "Admin":
      return "bg-red-100";
    case "Manager":
      return "bg-blue-100";
    case "Caretaker":
      return "bg-green-100";
    default:
      return "bg-slate-200";
  }
}

function getRoleTextColor(role) {
  switch (role) {
    case "Admin":
      return "text-red-700";
    case "Manager":
      return "text-blue-700";
    case "Caretaker":
      return "text-green-700";
    default:
      return "text-slate-600";
  }
}

function getRoleBadgeColor(role) {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-800";
    case "Manager":
      return "bg-blue-100 text-blue-800";
    case "Caretaker":
      return "bg-green-100 text-green-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

function getActionBadgeColor(action) {
  switch (action) {
    case "CREATE":
      return "bg-green-100 text-green-800";
    case "UPDATE":
      return "bg-blue-100 text-blue-800";
    case "DELETE":
      return "bg-red-100 text-red-800";
    case "CONFIG":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

function getActionModalColor(action) {
  switch (action) {
    case "CREATE":
      return "bg-green-100";
    case "UPDATE":
      return "bg-blue-100";
    case "DELETE":
      return "bg-red-100";
    case "CONFIG":
      return "bg-purple-100";
    default:
      return "bg-slate-100";
  }
}

function getActionIconColor(action) {
  switch (action) {
    case "CREATE":
      return "text-green-600";
    case "UPDATE":
      return "text-blue-600";
    case "DELETE":
      return "text-red-600";
    case "CONFIG":
      return "text-purple-600";
    default:
      return "text-slate-600";
  }
}

// CSV Export function
async function exportToCSV() {
  if (filteredLogs.value.length === 0) return;

  isExporting.value = true;
  try {
    const csvContent = generateCSVContent();
    downloadFile(
      csvContent,
      `system-logs-${formatDateForFilename(new Date())}.csv`,
      "text/csv"
    );
  } catch (error) {
    console.error("Error exporting CSV:", error);
    alert("Failed to export CSV. Please try again.");
  } finally {
    isExporting.value = false;
  }
}

function generateCSVContent() {
  const BOM = "\uFEFF";
  const headers = ["Date & Time", "User", "Role", "Action", "Description"];
  const csvRows = [headers.join(",")];

  filteredLogs.value.forEach((log) => {
    const row = [
      `"${formatDate(log.timestamp, true)}"`,
      `"${log.user}"`,
      `"${log.role}"`,
      `"${log.action}"`,
      `"${log.description.replace(/"/g, '""')}"`,
    ];
    csvRows.push(row.join(","));
  });

  return BOM + csvRows.join("\n");
}

function formatDateForFilename(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}${month}${day}-${hours}${minutes}`;
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// Computed Properties
const uniqueUsers = computed(() => {
  const users = [...new Set(logs.value.map((log) => log.user))];
  return users.sort();
});

const uniqueRoles = computed(() => {
  const roles = [...new Set(logs.value.map((log) => log.role))];
  return roles.sort();
});

const uniqueActions = computed(() => {
  const actions = [...new Set(logs.value.map((log) => log.action))];
  return actions.sort();
});

const hasActiveFilters = computed(() => {
  return (
    filters.value.user !== "" ||
    filters.value.role !== "" ||
    filters.value.action !== "" ||
    filters.value.search !== ""
  );
});

const filteredLogs = computed(() => {
  let result = [...logs.value];

  // Filter by user
  if (filters.value.user) {
    result = result.filter((log) => log.user === filters.value.user);
  }

  // Filter by role
  if (filters.value.role) {
    result = result.filter((log) => log.role === filters.value.role);
  }

  // Filter by action
  if (filters.value.action) {
    result = result.filter((log) => log.action === filters.value.action);
  }

  // Filter by search term
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase().trim();
    result = result.filter(
      (log) =>
        log.description.toLowerCase().includes(searchTerm) ||
        log.user.toLowerCase().includes(searchTerm) ||
        log.action.toLowerCase().includes(searchTerm) ||
        log.role.toLowerCase().includes(searchTerm)
    );
  }

  return result;
});

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredLogs.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredLogs.value.length / itemsPerPage)
);

const startItem = computed(() =>
  filteredLogs.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage + 1
);

const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage, filteredLogs.value.length)
);

const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;

  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i);
  } else {
    pages.push(1);
    let start = Math.max(2, currentPage.value - 1);
    let end = Math.min(totalPages.value - 1, currentPage.value + 1);

    if (currentPage.value <= 3) {
      end = Math.min(totalPages.value - 1, maxPagesToShow - 1);
    }
    if (currentPage.value >= totalPages.value - 2) {
      start = Math.max(2, totalPages.value - maxPagesToShow + 2);
    }

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages.value - 1) pages.push("...");
    if (totalPages.value > 1) pages.push(totalPages.value);
  }

  return pages;
});

// Methods
function selectLog(log) {
  selectedLog.value = log;
}

function closeLogDetail() {
  selectedLog.value = null;
}

function resetFilters() {
  filters.value = { user: "", role: "", action: "", search: "" };
  currentPage.value = 1;
}

function clearUserFilter() {
  filters.value.user = "";
}

function clearRoleFilter() {
  filters.value.role = "";
}

function clearActionFilter() {
  filters.value.action = "";
}

function clearSearch() {
  filters.value.search = "";
}

async function refreshLogs() {
  isRefreshing.value = true;
  try {
    const fetchedLogs = await logsService.getAllLogs();

    // Process the logs to ensure proper format
    logs.value = fetchedLogs.map((log, index) => ({
      id: log.id || `log-${index}-${Date.now()}`,
      timestamp: log.timestamp,
      user: log.user,
      role: log.role,
      action: log.action,
      description: log.description,
      datetime: log.datetime, // Keep original datetime if needed
    }));
  } catch (err) {
    console.error("Failed to refresh logs:", err);
    // Don't show error to user, just log it
  } finally {
    isRefreshing.value = false;
  }
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function goToPage(page) {
  if (typeof page === "number") currentPage.value = page;
}

// Watch for filter changes to reset pagination
watch(
  () => [
    filters.value.user,
    filters.value.role,
    filters.value.action,
    filters.value.search,
  ],
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);

// On mount: fetch logs
onMounted(async () => {
  try {
    const fetchedLogs = await logsService.getAllLogs();

    // Process the logs to ensure proper format
    logs.value = fetchedLogs.map((log, index) => ({
      id: log.id || `log-${index}-${Date.now()}`,
      timestamp: log.timestamp,
      user: log.user,
      role: log.role,
      action: log.action,
      description: log.description,
      datetime: log.datetime, // Keep original datetime if needed
    }));
  } catch (error) {
    console.error("Failed to load logs:", error);
    // Set empty array if service fails
    logs.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom breakpoint for extra small screens */
@media (min-width: 475px) {
  .xs\:flex-row {
    flex-direction: row;
  }
}
</style>
