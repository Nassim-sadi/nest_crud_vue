import { useAuthStore } from '@/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from '@/router/utils.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
    },
  ],
})

// Global guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Redirect logged-in users away from login/register
  if ((to.path === '/login' || to.path === '/register') && isUserLoggedIn(authStore)) {
    return next('/') // or redirect to dashboard
  }

  next() // continue normally
})

// router.beforeEach((to, from, next) => {
//   const auth = authStore()
//   ability.update(auth.permissions)
//   if (to.meta.requiresAuth && !isUserLoggedIn(auth)) {
//     return next({ name: 'login' })
//   }
//   if (to.meta.isAdmin && !canNavigate(to.name)) {
//     return next({ name: 'accessDenied' })
//   }
//   const publicPages = ['login', 'forgot-password', 'reset-password']
//   if (publicPages.includes(to.name)) {
//     if (isUserLoggedIn(auth)) {
//       return next({ name: 'dashboard' })
//     }
//     return next()
//   }
//   next()
// })

export default router
