import configuration from '@/configuration'

const webTitle = configuration('title') || 'ClientFrontend Base'

const prefix =
  import.meta.env.MODE !== 'development'
    ? ''
    : import.meta.env.VITE_IS_LOCAL === 'true'
      ? '[開發] '
      : '[測試] '

export default function getPageTitle (pageTitle, title) {
  if (pageTitle && title) return `${prefix}${pageTitle} - ${title}`
  if (pageTitle) return `${prefix}${pageTitle} - ${webTitle}`
  return `${prefix}${webTitle}`
}
