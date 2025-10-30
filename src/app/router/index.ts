import { createRouter, createWebHistory } from 'vue-router'
// import LandingPageView from '@/views/LandingPageView.vue'
import LandingPage from '@/modules/landing/presentation/pages/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'landing', component: LandingPage }],
})

export default router
