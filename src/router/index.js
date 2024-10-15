import { createRouter, createWebHistory } from 'vue-router'
import { setupGuards } from './guard'

/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

/* Router Modules */
import entryRouter from './modules/entry'
import memberCenterRouter from './modules/member-center'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          component: () => import('@/views/front/Front.vue'),
          name: 'Front',
          meta: { title: '首頁' },
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/views/error-page/404.vue'),
    },
    {
      path: '/provider-redirect',
      component: () => import('@/views/provider/ProviderRedirect.vue'),
    },
    entryRouter,
    memberCenterRouter,
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
})
setupGuards(router)
export default router
