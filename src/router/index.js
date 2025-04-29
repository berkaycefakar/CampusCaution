import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresGuest: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  // Eğer login sayfasına gidiliyorsa ve kullanıcı zaten giriş yapmışsa
  if (to.path === '/login' && isAuthenticated) {
    next('/home')
  }
  // Eğer korumalı bir sayfaya gidiliyorsa ve kullanıcı giriş yapmamışsa
  else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // Eğer misafir sayfasına gidiliyorsa ve kullanıcı giriş yapmışsa
  else if (to.meta.requiresGuest && isAuthenticated) {
    next('/home')
  }
  // Diğer tüm durumlar için
  else {
    next()
  }
})

export default router
