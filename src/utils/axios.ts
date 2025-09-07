import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'

interface AuthStore {
  token: string | null
  updateToken: (token: string) => void
  clearAuth: () => void
}

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
})

// Interceptors setup
export const setupAxiosInterceptors = (store: AuthStore) => {
  // Attach token dynamically on each request
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Handle 401 -> refresh token
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

      // Skip if request is to refresh-token endpoint
      if (originalRequest?.url?.includes('/auth/refresh-token')) {
        return Promise.reject(error)
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          // Call refresh endpoint directly without triggering interceptor again
          const res = await axios.post(
            `${api.defaults.baseURL}/auth/refresh-token`,
            {},
            { headers: { Authorization: `Bearer ${store.token}` } },
          )

          const { accessToken } = res.data
          store.updateToken(accessToken)

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
          }

          return api(originalRequest)
        } catch (refreshError) {
          store.clearAuth()
          if (typeof window !== 'undefined') window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    },
  )
}

export default api
