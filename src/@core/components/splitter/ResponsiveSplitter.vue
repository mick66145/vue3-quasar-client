<template>
  <base-splitter :horizontal="horizontal">
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
    <template v-if="$slots.before" #before>
      <slot name="before" />
    </template>
    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
  </base-splitter>
</template>

<script>
import { defineComponent, computed } from 'vue-demi'
import useScreen from '@/hooks/useScreen'

export default defineComponent({
  setup () {
    // data
    const { deviceType } = useScreen({})

    // computed
    const horizontal = computed(() => {
      return deviceType.value === 'mobile'
    })

    return {
      horizontal,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
