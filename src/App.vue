<template>
  <message-dialog />
  <router-view class="max-w-none" />
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from 'vue-demi'
import { RouterView } from 'vue-router'
import useMetaInfo from '@/hooks/useMetaInfo'
import useWatermark from '@/hooks/useWatermark'
import useScreen from '@/hooks/useScreen'

export default defineComponent({
  setup () {
    // mounted
    onMounted(() => {
      useMetaInfo()
      show()
    })

    onBeforeUnmount(() => { hide() })

    // use
    const { screenWidth } = useScreen({})
    const { show, hide } = useWatermark({
      text: '',
      fontColor: 'red',
      rotate: 0,
      translateX: -35,
      translateY: 20,
      width: 150,
      height: 50,
      fontSize: 50,
      offsetBottom: '0',
      offsetLeft: `${screenWidth.value < 1440 ? (30 + screenWidth.value / 100) : 50}%`,
      watermarkWidth: '150px',
      watermarkHeight: '50px',
    })

    return {
      RouterView,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
