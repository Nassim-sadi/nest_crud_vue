<script setup lang="ts">
import axios from '@/utils/axios'
import { onMounted, ref } from 'vue'

const user = ref<user>({
  id: 0,
  name: '',
  email: '',
  role: {
    id: 0,
    name: '',
  },
  createdAt: '',
  updatedAt: '',
})
const loading = ref(false)

type user = {
  id: number
  name: string
  email: string
  role: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
}

const fetchUser = async () => {
  loading.value = true
  return new Promise((resolve, reject) => {
    axios
      .get('/users/me')
      .then((res) => {
        user.value = res.data
        console.log(res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        loading.value = false
      })
  })
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1 class="profile-title">Profile</h1>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text">Loading your profile...</p>
      </div>

      <!-- User Profile Content -->
      <div v-else-if="user" class="user-info">
        <div class="avatar-section">
          <div class="avatar-placeholder">
            {{ user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U' }}
          </div>
        </div>

        <div class="info-grid">
          <div v-if="user.name" class="info-item">
            <label>Name</label>
            <span>{{ user.name }}</span>
          </div>

          <div v-if="user.email" class="info-item">
            <label>Email</label>
            <span>{{ user.email }}</span>
          </div>

          <div v-if="user.role" class="info-item">
            <label>Role</label>
            <span class="role-badge">{{ user.role.name }}</span>
          </div>

          <div v-if="user.createdAt" class="info-item">
            <label>Member Since</label>
            <span>{{ new Date(user.createdAt).toLocaleDateString() }}</span>
          </div>
        </div>

        <!-- Raw data for debugging (you can remove this) -->
        <details class="debug-section">
          <summary>Raw Data (Debug)</summary>
          <pre>{{ JSON.stringify(user, null, 2) }}</pre>
        </details>
      </div>

      <!-- Error State -->
      <div v-else class="error-state">
        <p>Unable to load profile information</p>
        <button @click="fetchUser" class="retry-button">Retry</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.profile-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  overflow: hidden;
}

.profile-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 30px 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.user-info {
  padding: 30px;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.info-grid {
  display: grid;
  gap: 20px;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.info-item label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item span {
  color: #212529;
  font-size: 1.1rem;
}

.role-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem !important;
  font-weight: 500;
  width: fit-content;
  text-transform: capitalize;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem !important;
  font-weight: 500;
  width: fit-content;
  text-transform: capitalize;
}

.status-badge.active {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white !important;
}

.status-badge.inactive {
  background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
  color: white !important;
}

.user-id {
  font-family: monospace;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  color: #495057 !important;
}

.debug-section {
  margin-top: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.debug-section summary {
  padding: 10px 15px;
  background: #f8f9fa;
  cursor: pointer;
  font-weight: 500;
  color: #495057;
}

.debug-section summary:hover {
  background: #e9ecef;
}

.debug-section pre {
  margin: 0;
  padding: 15px;
  background: #f8f9fa;
  font-size: 0.85rem;
  color: #495057;
  overflow-x: auto;
  white-space: pre-wrap;
}

.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.error-state p {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.retry-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
  }

  .profile-card {
    margin: 0;
  }

  .profile-title {
    font-size: 1.5rem;
    padding: 20px;
  }

  .user-info {
    padding: 20px;
  }

  .avatar-placeholder {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}
</style>
