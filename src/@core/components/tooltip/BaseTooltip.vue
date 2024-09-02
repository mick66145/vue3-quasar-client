<template>
  <q-tooltip
    :anchor="anchor"
    :self="self"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :offset="offset"
  >
    <slot />
  </q-tooltip>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    anchor: { type: String, default: 'bottom middle' },
    self: { type: String, default: 'top middle' },
    transitionShow: { type: String, default: 'scale' },
    transitionHide: { type: String, default: 'scale' },
    offset: { type: Array },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
