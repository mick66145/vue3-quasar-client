import { unref } from 'vue-demi'
import { useRouter } from 'vue-router'

export default function useGoBack (options = { autoBack: true, isFallBack: false, fallBack: '/' }) {
  const router = useRouter()

  const { autoBack = true, fallBack = '/', isFallBack = false } = options

  const goBack = () => {
    if (!autoBack) return

    const fallbackValue = unref(fallBack)

    if ((window.history.length === 2 && !window.history.state?.back) || (fallbackValue && isFallBack)) {
      return router.replace(fallbackValue)
    }

    router.go(-1)
  }

  return {
    goBack,
  }
}
