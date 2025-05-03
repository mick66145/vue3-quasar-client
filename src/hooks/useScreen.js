import { useQuasar } from 'quasar'
import { ref, computed, onMounted } from 'vue-demi'

export default function useScreen () {
  // data
  const $q = useQuasar()
  const screenHeight = ref($q.screen.height)
  const screenWidth = ref($q.screen.width)

  // computed
  const isScreenLargerSm = computed(() => {
    return $q.screen.gt.sm
  })
  const isScreenLargerMd = computed(() => {
    return $q.screen.gt.md
  })
  const isScreenLargerLg = computed(() => {
    return $q.screen.gt.lg
  })
  const isScreenLargerXl = computed(() => {
    return $q.screen.gt.xl
  })
  const isScreenLarger2xl = computed(() => {
    return $q.screen.gt['2xl']
  })
  const deviceType = computed(() => $q.screen.lt.sm ? 'mobile' : ($q.screen.lt.xl ? 'tablet' : 'desktop'))

  onMounted(() => {
    window.addEventListener('resize', () => { setScreenHeight(); setScreenWidth() })
  })

  // methods
  const setScreenHeight = () => {
    screenHeight.value = $q.screen.height
  }
  const setScreenWidth = () => {
    screenWidth.value = $q.screen.width
  }

  return {
    screenHeight,
    screenWidth,
    isScreenLargerSm,
    isScreenLargerMd,
    isScreenLargerLg,
    isScreenLargerXl,
    isScreenLarger2xl,
    deviceType,
  }
}
