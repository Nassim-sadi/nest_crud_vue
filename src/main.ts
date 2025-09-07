import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/Index'
import '@/assets/styles/Index.css'
import { useAuthStore } from '@/stores/userStore'
import PrimeVue from 'primevue/config'

import Aura from '@primeuix/themes/aura'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})
// Initialize auth from localStorage
const authStore = useAuthStore()

authStore.initializeAuth() // automatically set token and interceptors

app.mount('#app')
