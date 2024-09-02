import { computed } from 'vue-demi'
import { useRoute } from 'vue-router'
import { i18n } from '@/plugins/i18n'
import getPageTitle from '@/utils/get-page-title'

export default function useTitle () {
  const route = useRoute()
  const title = computed(() => getPageTitle(route.meta.title ? i18n.global.t(route.meta.title || 'g.system-system-name', route.params.lang) : ''))
  return { title }
}
