import { computed } from 'vue-demi'
import { useRoute } from 'vue-router'
import { i18n } from '@/plugins/i18n'

export const modeTypes = {
  create: 'create',
  edit: 'edit',
  view: 'view',
}

const prefixNames = {
  [modeTypes.create]: i18n.global.t('g.prefix.add'),
  [modeTypes.edit]: i18n.global.t('g.prefix.edit'),
  [modeTypes.view]: i18n.global.t('g.prefix.view'),
}

export default function useEditTitle (mode) {
  const route = useRoute()
  const pageTitle = computed(() => {
    const metaTitle = route.meta.title
    return `${prefixNames[mode.value]}${metaTitle}`
  })
  const prefix = computed(() => {
    return `${prefixNames[mode.value]}`
  })
  return {
    pageTitle,
    prefix,
  }
}
