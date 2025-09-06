import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/Index'
import '@/assets/styles/Index.css'
import { useAuthStore } from '@/stores/userStore'
const app = createApp(App)

app.use(createPinia())
app.use(router)
// Initialize auth from localStorage
const authStore = useAuthStore()

authStore.initializeAuth() // automatically set token and interceptors

app.mount('#app')
