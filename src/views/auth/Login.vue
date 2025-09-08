<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/userStore'

interface LoginPayload {
  email: string
  password: string
}

const email = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const authStore = useAuthStore()
import router from '@/router/Index'
const submit = async (): Promise<void> => {
  loading.value = true
  error.value = null

  const payload: LoginPayload = {
    email: email.value,
    password: password.value,
  }

  try {
    await authStore.login(payload) // Pinia action
    // e.g., router.push('/') after login
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed'
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
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p class="text-gray-600">Please sign in to continue</p>
      </div>

      <form @submit.prevent="submit" class="space-y-6">
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
            placeholder="Enter your password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center">
            <input
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span class="ml-2 text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-blue-600 hover:text-blue-700 font-medium"> Forgot password? </a>
        </div>

        <Button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
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
          Don't have an account?
          <Button
            text
            class="text-blue-600 hover:text-blue-700 font-medium"
            @click="navigateTo('/register')"
          >
            Sign up
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
