import { useHead } from '@vueuse/head'
import useTitle from '@/hooks/useTitle'

export default function useMetaInfo (
  options = { title: '', description: '', image: '', titleTemplate: undefined },
) {
  // og:type
  // og:url
  // og:description
  // og:title
  // og:image

  // url
  // description
  // title
  // image
  // keywords
  // article:published_time
  // article:modified_time
  // article:author
  // article:tag
  const { title: defaultTitle } = useTitle()
  const defaultDescription = ''
  const meta = [
    {
      property: 'type',
      content: 'website',
    },
    {
      property: 'keywords',
      content: 'website',
    },
    {
      property: 'og:title',
      content: () => options.title ? options.title : defaultTitle.value,
    },
    {
      name: 'description',
      content: () => options.description ? options.description : defaultDescription,
    },
    {
      property: 'og:description',
      content: () => options.description ? options.description : defaultDescription,
    },
  ]

  if (options.image) {
    meta.push({
      property: 'image',
      content: () => options.image,
    })
    meta.push({
      property: 'og:image',
      content: () => options.image,
    })
  }

  useHead({
    titleTemplate: options.titleTemplate,
    title: () => options.title || defaultTitle,
    meta,
  })
}
