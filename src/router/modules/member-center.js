/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const memberCenterRouter = {
  path: '/member-center',
  name: 'MemberCenter',
  component: MainLayout,
  meta: {
    title: 'member-center.title',
    slug: 'link',
    auth: true,
  },
  redirect: { name: 'MemberCenterProfile' },
  children: [
    {
      path: 'profile',
      component: () => import('@/views/member-center/member-center-profile/MemberCenterProfile.vue'),
      name: 'MemberCenterProfile',
      meta: { title: '個人資料設定', auth: true },
    },
  ],
}

export default memberCenterRouter
