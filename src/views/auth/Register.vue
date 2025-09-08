<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/userStore'

interface RegisterPayload {
  name: string
  email: string
  password: string
}

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const authStore = useAuthStore()
import router from '@/router/Index'

const submit = async (): Promise<void> => {
  loading.value = true
  error.value = null

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }

  // Check password length
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    loading.value = false
    return
  }

  const payload: RegisterPayload = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  try {
    await authStore.register(payload) // Pinia action
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}

const navigateTo = (path: string) => {
  router.replace(path)
}

import { Button } from 'primevue'
</script>

<template>
  <div
    class="min-h-[calc(100vh-65px)] flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p class="text-gray-600">Join us today and get started</p>
      </div>

      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2"> Username </label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            placeholder="Choose a username"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Create a password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
          />
          <p class="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Confirm your password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>

        <!-- <div class="flex items-start text-sm">
          <input
            type="checkbox"
            id="terms"
            required
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
          />
          <label for="terms" class="ml-2 text-gray-600">
            I agree to the
            <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>
            and
            <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
          </label>
        </div> -->

        <Button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </Button>

        <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          {{ error }}
        </div>
      </form>

      <div class="mt-8 text-center">
        <p class="text-gray-600 text-sm">
          Already have an account?
          <Button
            text
            class="text-blue-600 hover:text-blue-700 font-medium"
            @click="navigateTo('/login')"
          >
            Sign in
          </Button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional responsive styling */
@media (max-width: 640px) {
  .bg-white {
    margin: 1rem;
  }
}
</style>
