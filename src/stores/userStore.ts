import { defineStore } from 'pinia'
import api, { setupAxiosInterceptors } from '@/utils/axios'
import router from '@/router/Index'

type LoginPayload = { email: string; password: string }
type RegisterPayload = { name: string; email: string; password: string }

export const useAuthStore = defineStore('user', {
  state: () => ({
    user: null as any | null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
  },

  actions: {
    initializeAuth() {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      if (token && userData) {
        this.token = token
        this.user = JSON.parse(userData)
        this.isAuthenticated = true
      }
      setupAxiosInterceptors(this)

      // Start periodic refresh
      this.startAutoRefresh()
    },

    async refreshToken() {
      if (!this.token) return
      try {
        const res = await api.post('/auth/refresh-token')
        console.log(res.data)

        const { accessToken } = res.data
        this.updateToken(accessToken)
        return accessToken
      } catch (err) {
        this.clearAuth()
        throw err
      }
    },

    startAutoRefresh() {
      const refresh = async () => {
        if (this.isAuthenticated && this.token) {
          try {
            await this.refreshToken()
          } catch (err) {
            this.clearAuth()
          }
        }
      }

      // Run immediately once
      refresh()

      // Then schedule every 5 minutes
      setInterval(refresh, 5 * 60 * 1000)
    },

    async login(credentials: LoginPayload) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/auth/login', credentials)

        const { accessToken, user } = res.data
        this.token = accessToken
        this.user = user
        this.isAuthenticated = true
        localStorage.setItem('token', accessToken)
        localStorage.setItem('user', JSON.stringify(user))
        router.push({ name: 'home' })
        return { success: true, user, token: accessToken }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    async register(data: RegisterPayload) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/auth/register', data)
        const { accessToken, user } = res.data
        this.token = accessToken
        this.user = user
        this.isAuthenticated = true
        localStorage.setItem('token', accessToken)
        localStorage.setItem('user', JSON.stringify(user))
        return { success: true, user, token: accessToken }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Registration failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push({ name: 'login' })
    },

    updateToken(newToken: string) {
      this.token = newToken
      localStorage.setItem('token', newToken)
    },

    clearAuth() {
      this.logout()
    },
  },
})
