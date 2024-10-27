
const redirectRouter = {
  path: '/redirect',
  redirect: { name: 'BindRedirect' },
  children: [
    {
      path: '/bind-redirect',
      name: 'BindRedirect',
      component: () => import('@/views/redirect/BindRedirect.vue'),
    },
  ],
}

export default redirectRouter
