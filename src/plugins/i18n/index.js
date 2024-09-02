import { createI18n } from 'vue-i18n'
import VxeUI from 'vxe-pc-ui'
import Cookies from 'js-cookie'
import messages from '@intlify/unplugin-vue-i18n/messages'
import quasarEnLocale from 'quasar/lang/en-US'
import quasarZhTwLocale from 'quasar/lang/zh-TW'

// locale value 要 kebab case
export const locales = {
  en: 'en',
  tw: 'zh-TW',
}

messages.en = { ...messages.en, ...quasarEnLocale }
messages['zh-TW'] = { ...messages['zh-TW'], ...quasarZhTwLocale }

export function getLanguage () {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) {
    VxeUI.setLanguage(chooseLanguage)
    return chooseLanguage
  }
  VxeUI.setLanguage('zh-TW')
  return 'zh-TW'
}

export const i18n = createI18n({
  allowComposition: true,
  locale: getLanguage(),
  fallbackLocale: locales.tw,
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
})

export default function (app) {
  app.use(i18n)
  app.config.globalProperties.$isLocale = (locale) => locale === i18n.global.locale
}
