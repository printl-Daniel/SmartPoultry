<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Logo and Title Section -->
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <div class="bg-white p-4 rounded-full shadow-lg">
            <i
              class="fa-solid fa-feather text-blue-600 text-4xl transform hover:scale-110 transition-transform duration-300"
            ></i>
          </div>
        </div>
        <h2 class="text-4xl font-extrabold text-gray-900 tracking-tight">
          Poultry Management
        </h2>
        <p class="mt-3 text-gray-600 text-lg">
          Sign in to access your dashboard
        </p>
      </div>

      <!-- Login Form Card -->
      <div
        class="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100"
      >
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="pl-10 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white py-3 px-4 transition-colors duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div v-if="!showPasswordSetup">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="pl-10 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white py-3 px-4 transition-colors duration-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <!-- Remember Me and Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                for="remember-me"
                class="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a
                href="#"
                @click.prevent="showForgotPasswordModal = true"
                class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <i class="fas fa-sign-in-alt mr-2"></i>
            Sign in
          </button>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <!-- Google Login Button -->
        <button
          @click="handleGoogleLogin"
          type="button"
          class="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            class="h-5 w-5 mr-2"
          />
          <span class="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>

    <!-- Password Setup Modal -->
    <div
      v-if="showPasswordSetup"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-2xl shadow-xl p-8 w-96 max-w-md mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Set Your Password</h3>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <i class="fas fa-key text-gray-400"></i>
          </div>
          <input
            type="password"
            v-model="newPassword"
            placeholder="Enter new password"
            class="pl-10 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white py-3 px-4 mb-4"
          />
        </div>
        <div class="flex space-x-3">
          <button
            @click="savePassword"
            class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Save Password
          </button>
          <button
            @click="showPasswordSetup = false"
            class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div
      v-if="showForgotPasswordModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-2xl shadow-xl p-8 w-96 max-w-md mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Reset Password</h3>
        <p class="text-gray-600 mb-4">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <i class="fas fa-envelope text-gray-400"></i>
          </div>
          <input
            type="email"
            v-model="resetEmail"
            placeholder="Enter your email"
            class="pl-10 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white py-3 px-4 mb-4"
          />
        </div>
        <div class="flex space-x-3">
          <button
            @click="handleForgotPassword"
            :disabled="isResetting"
            class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
          >
            <span v-if="!isResetting">Send Reset Link</span>
            <span v-else>Sending...</span>
          </button>
          <button
            @click="showForgotPasswordModal = false"
            class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import loginService from "@/services/loginServices.js";
import {
  auth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "@/services/firebase.js";

const router = useRouter();

// Reactive state
const email = ref("");
const password = ref("");
const userKey = ref(null);
const rememberMe = ref(false);
const showForgotPasswordModal = ref(false);
const resetEmail = ref("");
const isResetting = ref(false);
const newPassword = ref("");
const showPasswordSetup = ref(false);
const isLoggingIn = ref(false);
const isUpdatingPassword = ref(false);

// Load remembered email if exists
onMounted(() => {
  const storedEmail = localStorage.getItem("rememberedEmail");
  if (storedEmail) {
    email.value = storedEmail;
    rememberMe.value = true;
  }
});

const handleLogin = async () => {
  try {
    isLoggingIn.value = true;

    // Set persistence based on rememberMe checkbox
    const persistenceType = rememberMe.value
      ? browserLocalPersistence
      : browserSessionPersistence;

    await setPersistence(auth, persistenceType);

    const response = await loginService.loginUser(email.value, password.value);

    if (response.success) {
      // Save email if rememberMe is checked
      rememberMe.value
        ? loginService.saveCredentials(email.value)
        : loginService.clearCredentials();

      if (response.requiresSetup) {
        userKey.value = response.userKey;
        showPasswordSetup.value = true;
      } else {
        await router.push("/dashboard");
      }
    }
  } catch (error) {
    alert(error.message || "Login failed. Please check your credentials.");
  } finally {
    isLoggingIn.value = false;
  }
};

const savePassword = async () => {
  if (!newPassword.value || newPassword.value.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  try {
    isUpdatingPassword.value = true;
    await loginService.updatePassword(userKey.value, newPassword.value);
    showPasswordSetup.value = false;
    await router.push("/dashboard");
  } catch (error) {
    alert("Password update failed: " + (error.message || "Please try again"));
  } finally {
    isUpdatingPassword.value = false;
  }
};

const handleGoogleLogin = async () => {
  try {
    const response = await loginService.googleLogin();
    if (response.success) {
      await router.push("/dashboard");
    } else if (response.requiresSetup) {
      userKey.value = response.userKey;
      showPasswordSetup.value = true;
    }
  } catch (error) {
    alert("Google login failed: " + (error.message || "Please try again"));
  }
};

const handleForgotPassword = async () => {
  const email = resetEmail.value.trim();

  if (!email.match(/^\S+@\S+\.\S+$/)) {
    alert("Please enter a valid email address");
    return;
  }

  try {
    await loginService.sendPasswordResetEmail(email); // <-- Corrected method name
    showForgotPasswordModal.value = true;
  } catch (error) {
    alert("Failed to send reset email. Please try again.");
    console.error(error);
  }
};
</script>

<style scoped>
.from-blue-50 {
  --tw-gradient-from: #eff6ff;
  --tw-gradient-stops: var(--tw-gradient-from),
    var(--tw-gradient-to, rgb(239 246 255 / 0));
}

.to-blue-100 {
  --tw-gradient-to: #dbeafe;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.fa-feather {
  animation: float 3s ease-in-out infinite;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
