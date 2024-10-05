<template>
  <base-tabs v-model="observeValue" :vertical="vertical">
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
  },
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const { deviceType } = useScreen({})

    // computed
    const vertical = computed(() => {
      return deviceType.value !== 'mobile'
    })

    return {
      observeValue,
      vertical,
    }
  },
})

</script>

<style lang="postcss" scoped></style>
