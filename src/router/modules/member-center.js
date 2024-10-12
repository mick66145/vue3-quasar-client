/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

const memberCenterRouter = {
  path: '/member-center',
  component: MainLayout,
  meta: {
    title: 'member-center.title',
    slug: 'link',
    auth: true,
  },
  redirect: { name: 'MemberCenter' },
  children: [
    {
      path: '',
      component: () => import('@/views/member-center/member-center/MemberCenter.vue'),
      name: 'MemberCenter',
      meta: { title: '個人首頁', auth: true },
    },
    {
      path: 'profile',
      component: () => import('@/views/member-center/member-center-profile/MemberCenterProfile.vue'),
      name: 'MemberCenterProfile',
      meta: { title: '個人資料設定', auth: true },
    },
  ],
}

export default memberCenterRouter
