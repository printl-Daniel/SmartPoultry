<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Nav />

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <div class="flex justify-between items-center mb-6">
        <button
          @click="isModalOpen = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <i class="icon-user-plus w-5 h-5 mr-2"></i>
          Add New Account
        </button>
      </div>

      <!-- Account Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500">Total Accounts</p>
              <h3 class="text-2xl font-bold">{{ totalAccounts }}</h3>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <i class="icon-users w-6 h-6 text-blue-600"></i>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500">Active Accounts</p>
              <h3 class="text-2xl font-bold">{{ activeAccounts }}</h3>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <i class="icon-user-check w-6 h-6 text-green-600"></i>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500">Inactive Accounts</p>
              <h3 class="text-2xl font-bold">{{ inactiveAccounts }}</h3>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <i class="icon-user-x w-6 h-6 text-red-600"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Account List -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="p-4 border-b">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Account List</h3>
            <div class="flex space-x-2">
              <input
                type="text"
                placeholder="Search accounts..."
                class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Operator">Operator</option>
              </select>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  User
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                >
                  Role
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                >
                  Phone Number
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                >
                  Last Login
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(account, id) in accounts" :key="id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"
                      >
                        <i class="icon-user w-6 h-6 text-gray-500"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ account.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ account.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ account.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
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
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ account.number }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ account.lastLogin }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    class="text-blue-600 hover:text-blue-900 mr-3"
                    @click="editAccount(id)"
                  >
                    <i class="icon-edit-2 w-5 h-5"></i>
                  </button>
                  <button
                    class="text-red-600 hover:text-red-900"
                    @click="deleteAccount(id)"
                  >
                    <i class="icon-trash-2 w-5 h-5"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Edit Account Modal -->
      <div
        v-if="isEditModalOpen"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 animate-fade-in">
          <h2 class="text-lg font-semibold mb-4">Edit Account</h2>

          <input
            v-model="editedAccount.name"
            type="text"
            placeholder="Full Name"
            class="w-full p-2 border rounded mb-3"
          />
          <input
            v-model="editedAccount.email"
            type="email"
            placeholder="Email Address"
            class="w-full p-2 border rounded mb-3"
          />
          <input
            v-model="editedAccount.number"
            type="tel"
            placeholder="Phone Number"
            class="w-full p-2 border rounded mb-3"
          />
          <select
            v-model="editedAccount.role"
            class="w-full p-2 border rounded mb-3"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Operator">Operator</option>
          </select>

          <div class="flex justify-end space-x-2">
            <button
              class="px-4 py-2 bg-gray-300 rounded"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded"
              @click="saveAccountChanges"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Add Account Modal -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-lg font-semibold mb-4">Add New Account</h2>
          <input
            v-model="newAccount.name"
            type="text"
            placeholder="Full Name"
            class="w-full p-2 border rounded mb-3"
          />
          <input
            v-model="newAccount.email"
            type="email"
            placeholder="Email Address"
            class="w-full p-2 border rounded mb-3"
          />
          <input
            v-model="newAccount.number"
            type="number"
            placeholder="Phone Number"
            class="w-full p-2 border rounded mb-3"
          />
          <select
            v-model="newAccount.role"
            class="w-full p-2 border rounded mb-3"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Caretaker">Caretaker</option>
          </select>
          <div class="flex justify-end space-x-2">
            <button
              class="px-4 py-2 bg-gray-300 rounded"
              @click="isModalOpen = false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded"
              @click="addNewAccount"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import Nav from "@/components/templates/Nav.vue";
import accountService from "@/services/accountServices.js"; // Ensure correct import

const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const accounts = reactive({}); // Keep as reactive
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

// Fetch accounts and their counts
const fetchAccounts = () => {
  unsubscribe = accountService.getAccounts((data) => {
    Object.assign(accounts, data || {}); // Directly update reactive object
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
  if (unsubscribe) unsubscribe(); // Ensure proper unsubscription
});

// Add new account
const addNewAccount = async () => {
  try {
    // Validate input fields
    if (!newAccount.name || !newAccount.email) {
      console.error("Name and Email are required.");
      return;
    }

    await accountService.addAccount(newAccount);
    console.log("Account added successfully!");
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

  // Populate the edit form
  editedAccount.id = id;
  editedAccount.name = account.name;
  editedAccount.email = account.email;
  editedAccount.number = account.number;
  editedAccount.role = account.role;

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
