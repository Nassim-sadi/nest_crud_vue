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
</script>

<template>
  <div class="h-[calc(100vh-65px)] flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p v-if="error" class="text-red-500 mt-2 text-sm">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* optional extra styles */
</style>
