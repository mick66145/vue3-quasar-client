
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import useStorage from './useStorage'

export const navigationProps = {
  to: [String, Object],
  replace: Boolean,
  href: String,
  target: String,
  useStore: Boolean,
  storeType: String, // session | local | cookie
}

export default function useNavigation ({
  to,
  replace,
  href,
  target,
  useStore = false,
  storageKey = null,
  storeType = 'session',
}) {
  // data
  const router = useRouter()
  const route = useRoute()

  const { setItem, getItem, removeItem } = useStorage(storeType)

  // methods
  const onNavigation = ({ state }) => {
    if (href) {
      window.open(href, target)
    } else {
      if (useStore && state) {
        const routeKey = storageKey || (typeof to === 'string' ? to : to.name)
        setItem(routeKey, state)
      }
      router[replace ? 'replace' : 'push'](to)
    }
  }

  const getNavigationData = () => {
    return getItem(storageKey || route.name, {})
  }

  const removeNavigationData = () => {
    removeItem(route.name)
  }

  const setupBeforeRouteLeave = () => {
    onBeforeRouteLeave(() => {
      removeNavigationData()
    })
  }

  return {
    onNavigation,
    getNavigationData,
    removeNavigationData,
    setupBeforeRouteLeave,
  }
}
