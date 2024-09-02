import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { useUser } from '@/stores/user'
import { i18n } from '@/plugins/i18n'
import getPageTitle from './utils/get-page-title'
import useLogout from '@/hooks/useLogout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const store = useUser()
  if (to.meta.auth && !store.isLogin) {
    return next({ path: '/entry/login', params: to.params, query: { redirect: to.fullPath } })
  }
  if (store.isLogin) {
    const info = store.info
    if (info) {
      next()
    } else {
      try {
        await store.whoami()
        next({ ...to, replace: true })
      } catch (error) {
        const { resetStore } = useLogout()
        resetStore()
        next(`/entry/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const store = useUser()
  const path = ['/entry/login', '/entry/register']
  if (path.includes(to.path) && store.isLogin) {
    next('/')
  }
  next()
})

router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title ? i18n.global.t(to.meta.title || 'g.system-system-name', to.params.lang) : '')
  NProgress.done()
})
