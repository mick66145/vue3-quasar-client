<template>
  <q-tooltip
    class="shadow-4 q-pa-md"
    :class="observeClass"
    :color="color"
    :text-color="textColor"
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
import { defineComponent, computed, toRefs } from 'vue-demi'
export default defineComponent({
  props: {
    anchor: { type: String, default: 'bottom middle' },
    self: { type: String, default: 'top middle' },
    transitionShow: { type: String, default: 'scale' },
    transitionHide: { type: String, default: 'scale' },
    offset: { type: Array },
    trigger: { type: String, default: 'hover' },
    color: { type: String, default: 'white' },
    textColor: { type: String, default: 'black' },
  },
  setup (props) {
    // data
    const { color, textColor } = toRefs(props)

    // computed
    const observeClass = computed(() => {
      return {
        [`bg-${color.value}`]: true,
        [`text-${textColor.value}`]: true,
      }
    })

    return {
      observeClass,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
