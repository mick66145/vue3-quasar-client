<template>
  <base-tabs v-model="observeValue" :vertical="observeVertical">
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </base-tabs>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import useScreen from '@/hooks/useScreen'

export default defineComponent({
  props: {
    modelValue: { type: String },
    vertical: { type: Boolean, default: true },
    responsive: { type: Boolean, default: true },
  },
  setup (props, { emit }) {
    // data
    const { vertical, responsive } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const { deviceType } = useScreen({})

    // computed
    const observeVertical = computed(() => {
      return responsive.value ? (deviceType.value !== 'mobile') : vertical.value
    })

    return {
      observeValue,
      observeVertical,
    }
  },
})

</script>

<style lang="postcss" scoped></style>
