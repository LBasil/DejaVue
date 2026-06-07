import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',             component: () => import('../views/HomeView.vue') },
    { path: '/introduction', component: () => import('../views/IntroductionView.vue') },
    { path: '/setup',        component: () => import('../views/SetupView.vue') },
    { path: '/props',        component: () => import('../views/PropsView.vue') },
    { path: '/emits',        component: () => import('../views/EmitsView.vue') },
    { path: '/slots',        component: () => import('../views/SlotsView.vue') },
  ],
})
