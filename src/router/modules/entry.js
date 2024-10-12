/* Layout */
import LoginLayout from '@/layouts/LoginLayout.vue'

const entryRouter = {
  path: '/entry',
  component: LoginLayout,
  redirect: { name: 'Login' },
  children: [
    {
      path: 'login',
      component: () => import('@/views/entry/login/Login.vue'),
      name: 'Login',
      meta: { title: '登入' },
    },
  ],
}

export default entryRouter
