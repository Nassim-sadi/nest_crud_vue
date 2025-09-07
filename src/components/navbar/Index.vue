<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '@/router/Index'
import { useAuthStore } from '@/stores/userStore'
import Button from 'primevue/button'
import { Menu } from 'primevue'
import Drawer from 'primevue/drawer'
// Tabler icons
import { IconLogout2, IconUserCircle, IconMenu2, IconX } from '@tabler/icons-vue'
import logo from '@/assets/images/logo.png'
import { item } from '@primeuix/themes/aura/breadcrumb'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Posts', path: '/posts' }, // Added posts for future
]

const authNavItems = [
  { name: 'Login', path: '/login' },
  { name: 'Register', path: '/register' },
]

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const navigateTo = (path: string) => {
  router.push(path)
  // Close mobile menu when navigating
  mobileMenuOpen.value = false
}

// User menu options
const menuOptions = [
  {
    label: authStore.user?.name || 'User',
    items: [
      {
        label: 'Profile',
        icon: 'ti ti-user-circle',
        command: () => navigateTo('/profile'),
      },
      {
        label: 'Logout',
        icon: 'ti ti-logout',
        command: () => authStore.logout(),
      },
    ],
  },
]

// Desktop user menu
const op = ref()
const toggle = (event: any) => {
  op.value.toggle(event)
}

// Mobile menu
const mobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Get current route for active link styling
const currentRoute = computed(() => router.currentRoute.value.path)
const isActiveRoute = (path: string) => currentRoute.value === path
</script>

<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="navbar-brand">
      <img :src="logo" alt="logo" class="logo" @click="navigateTo('/')" />
    </div>

    <!-- Desktop Navigation -->
    <div class="navbar-nav desktop-nav">
      <button
        v-for="(item, index) in navItems"
        :key="index"
        @click="navigateTo(item.path)"
        class="nav-link"
        :class="{ active: isActiveRoute(item.path) }"
      >
        {{ item.name }}
      </button>
    </div>

    <!-- Desktop Auth Section -->
    <div class="navbar-auth desktop-auth">
      <template v-if="!isLoggedIn">
        <button
          v-for="(item, index) in authNavItems"
          :key="index"
          @click="navigateTo(item.path)"
          class="auth-link"
          :class="{
            'btn-primary': item.name === 'Register',
            'btn-secondary': item.name === 'Login',
          }"
        >
          {{ item.name }}
        </button>
      </template>
      <template v-else>
        <div class="user-menu">
          <span class="welcome-text">Welcome, {{ authStore.user?.name }}</span>
          <Button
            type="button"
            @click="toggle"
            icon="ti ti-user-circle"
            text
            class="user-menu-btn"
            severity="secondary"
          />
          <Menu ref="op" :model="menuOptions" :popup="true">
            <template #item="{ item }">
              <button
                @click="(e) => item.command?.({ originalEvent: e, item })"
                class="mobile-action-btn"
                :class="item.label === 'Logout' ? 'logout' : ''"
              >
                <i :class="item.icon"></i>
                {{ item.label }}
              </button>
            </template>
          </Menu>
        </div>
      </template>
    </div>

    <!-- Mobile Menu Button -->
    <div class="mobile-menu-toggle">
      <Button
        @click="toggleMobileMenu"
        icon="ti ti-menu-2"
        text
        severity="secondary"
        class="mobile-toggle-btn"
      />
    </div>

    <!-- Mobile Drawer Menu -->
    <Drawer v-model:visible="mobileMenuOpen" position="right" class="mobile-drawer">
      <template #header>
        <div class="mobile-header">
          <img :src="logo" alt="logo" class="mobile-logo" />
          <span class="mobile-title">Menu</span>
        </div>
      </template>

      <div class="mobile-menu-content">
        <!-- Navigation Links -->
        <div class="mobile-nav-section">
          <h3 class="mobile-section-title">Navigation</h3>
          <button
            v-for="(item, index) in navItems"
            :key="index"
            @click="navigateTo(item.path)"
            class="mobile-nav-link"
            :class="{ active: isActiveRoute(item.path) }"
          >
            {{ item.name }}
          </button>
        </div>

        <!-- Auth Section -->
        <div class="mobile-auth-section">
          <template v-if="!isLoggedIn">
            <h3 class="mobile-section-title">Account</h3>
            <button
              v-for="(item, index) in authNavItems"
              :key="index"
              @click="navigateTo(item.path)"
              class="mobile-auth-link"
              :class="{
                primary: item.name === 'Register',
                secondary: item.name === 'Login',
              }"
            >
              {{ item.name }}
            </button>
          </template>
          <template v-else>
            <div class="mobile-user-info">
              <div class="mobile-user-avatar">
                <IconUserCircle size="48" />
              </div>
              <div class="mobile-user-details">
                <span class="mobile-user-name">{{ authStore.user?.name }}</span>
                <span class="mobile-user-email">{{ authStore.user?.email }}</span>
              </div>
            </div>

            <div class="mobile-user-actions">
              <button @click="navigateTo('/profile')" class="mobile-action-btn">
                <IconUserCircle size="20" />
                Profile
              </button>
              <button
                @click="(authStore.logout(), (mobileMenuOpen = false))"
                class="mobile-action-btn logout"
              >
                <IconLogout2 size="20" />
                Logout
              </button>
            </div>
          </template>
        </div>
      </div>
    </Drawer>
  </nav>
</template>

<style scoped>
@reference "tailwindcss";
/* Main Navbar */
.navbar {
  @apply w-full bg-gray-800 text-white flex items-center justify-between px-4 h-16;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Logo */
.navbar-brand .logo {
  @apply w-12 h-12 cursor-pointer rounded-lg;
  transition: transform 0.2s ease;
}

.navbar-brand .logo:hover {
  transform: scale(1.05);
}

/* Desktop Navigation */
.desktop-nav {
  @apply hidden md:flex items-center gap-2;
}

.nav-link {
  @apply px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link.active {
  @apply text-white bg-gray-700;
}

/* Desktop Auth */
.desktop-auth {
  @apply hidden md:flex items-center gap-0.5;
}

.auth-link {
  @apply px-4 py-2 rounded-md font-medium;
  transition: all 0.2s ease;
}

.auth-link.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.auth-link.btn-secondary {
  @apply text-gray-300 hover:text-white hover:bg-gray-700;
}

.user-menu {
  @apply flex items-center gap-0.5;
}

.welcome-text {
  @apply text-sm text-gray-300 hidden lg:block;
}

:deep(.user-menu-btn .ti) {
  font-size: 1.25rem !important;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  @apply md:hidden;
}

:deep(.mobile-toggle-btn .ti) {
  font-size: 1.25rem !important;
}

/* Mobile Drawer Styles */
.mobile-header {
  @apply flex items-center gap-0.5;
}

.mobile-logo {
  @apply w-8 h-8 rounded;
}

.mobile-title {
  @apply text-lg font-semibold;
}

.mobile-menu-content {
  @apply flex flex-col space-y-6;
}

.mobile-section-title {
  @apply text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3;
}

.mobile-nav-section,
.mobile-auth-section {
  @apply border-b border-gray-200 pb-6;
}

.mobile-nav-link {
  @apply w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100;
  transition: all 0.2s ease;
}

.mobile-nav-link.active {
  @apply bg-blue-50 text-blue-600 font-medium;
}

.mobile-auth-link {
  @apply w-full text-left px-4 py-3 rounded-lg font-medium mb-2;
  transition: all 0.2s ease;
}

.mobile-auth-link.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.mobile-auth-link.secondary {
  @apply text-gray-700 hover:bg-gray-100;
}

/* Mobile User Info */
.mobile-user-info {
  @apply flex items-center gap-1 p-4 bg-gray-50 rounded-lg mb-4;
}

.mobile-user-avatar {
  @apply text-gray-600;
}

.mobile-user-details {
  @apply flex flex-col;
}

.mobile-user-name {
  @apply font-semibold text-gray-900;
}

.mobile-user-email {
  @apply text-sm text-gray-600;
}

.mobile-user-actions {
  @apply space-y-2;
}

.mobile-action-btn {
  @apply w-full flex items-center gap-0.5 px-4 py-3 rounded-lg text-left;
  transition: all 0.2s ease;
}

.mobile-action-btn:not(.logout) {
  @apply text-gray-700 hover:bg-gray-100;
}

.mobile-action-btn.logout {
  @apply text-red-600 hover:bg-red-50;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar {
    @apply px-3;
  }
}

@media (max-width: 640px) {
  /* Make drawer full width on small screens */
  :deep(.p-drawer) {
    width: 100vw !important;
    max-width: 100vw !important;
    left: 0 !important;
  }
}

/* Custom drawer styles */
:deep(.p-drawer) {
  max-width: 300px;
}

:deep(.p-drawer-header) {
  @apply border-b border-gray-200;
}

/* Desktop Menu Styling */
:deep(.p-menu) {
  border: none !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
  border-radius: 12px !important;
  padding: 0 !important;
  min-width: 240px !important;
}

:deep(.p-menu .p-menu-list) {
  padding: 8px !important;
  background: white !important;
  border-radius: 12px !important;
}

:deep(.p-menu .p-menuitem-link) {
  padding: 12px 16px !important;
  border-radius: 8px !important;
  margin: 2px 0 !important;
  color: #374151 !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
}

:deep(.p-menu .p-menuitem-link:hover) {
  background: #f3f4f6 !important;
  color: #111827 !important;
  transform: translateX(4px) !important;
}

:deep(.p-menu .p-menuitem-icon) {
  margin-right: 12px !important;
  font-size: 1.1rem !important;
  color: #6b7280 !important;
}

:deep(.p-menu .p-menuitem-link:hover .p-menuitem-icon) {
  color: #374151 !important;
}

/* User info section in dropdown */
:deep(.p-menu .p-submenu-header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  padding: 16px !important;
  border-radius: 8px 8px 0 0 !important;
  margin: 0 0 8px 0 !important;
  font-weight: 600 !important;
  text-align: center !important;
}

/* Logout button special styling */
:deep(.p-menu .p-menuitem-link[aria-label*='Logout']) {
  color: #dc2626 !important;
  border-top: 1px solid #f3f4f6 !important;
  margin-top: 8px !important;
}

:deep(.p-menu .p-menuitem-link[aria-label*='Logout']:hover) {
  background: #fef2f2 !important;
  color: #dc2626 !important;
}

:deep(.p-menu .p-menuitem-link[aria-label*='Logout'] .p-menuitem-icon) {
  color: #dc2626 !important;
}
</style>
