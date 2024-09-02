
import { useRouter } from 'vue-router'

export const navigationProps = {
  to: [String, Object],
  replace: Boolean,
  href: String,
  target: String,
}

export default function useNavigation ({
  to,
  replace,
  href,
  target,
}) {
  // data
  const router = useRouter()

  const onNavigation = () => {
    if (href) { window.open(href, target) } else { router[replace ? 'replace' : 'push'](to) }
  }

  return {
    onNavigation,
  }
}
