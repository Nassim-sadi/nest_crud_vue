<script setup lang="ts">
import { computed, ref } from 'vue'
import logo from '@/assets/images/logo.png'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

const authNavItems = [
  { name: 'Login', path: '/login' },
  { name: 'Register', path: '/register' },
]
import router from '@/router/Index'

const navigateTo = (path: string) => {
  router.push(path)
}

import { useAuthStore } from '@/stores/userStore'
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)
import { IconUserCircle } from '@tabler/icons-vue'
</script>

<template>
  <nav class="w-full bg-gray-800 text-white flex items-center justify-between p-4 h-[60px]">
    <img :src="logo" alt="" class="w-12" @click="navigateTo('/')" />
    <div class="flex space-x-4">
      <template v-for="(item, index) in navItems" :key="index">
        <button @click="navigateTo(item.path)" class="hover:underline cursor-pointer">
          {{ item.name }}
        </button>
      </template>
    </div>

    <div class="flex space-x-4">
      <template v-for="(item, index) in authNavItems" :key="index" v-if="!isLoggedIn">
        <button @click="navigateTo(item.path)" class="hover:underline cursor-pointer">
          {{ item.name }}
        </button>
      </template>
      <template v-else>
        <button @click="navigateTo('/profile')" class="hover:underline cursor-pointer">
          <div class="flex gap-2">
            <IconUserCircle size="36" />
          </div>
        </button>
      </template>
    </div>
  </nav>
</template>

<style scoped>
/* optional extra styles if needed */
</style>
