<template>
  <q-tabs
    v-model="observeValue"
    no-caps
    :align="align"
    :active-color="activeColor"
    :outside-arrows="outsideArrows"
    :mobile-arrows="mobileArrows"
    :class="observeClass"
    :style="observeStyle"
    :dense="dense"
    bg="white"
    text="gray-400"
  >
    <slot />
  </q-tabs>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, computed } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: String },
    align: { type: String, default: 'left' },
    activeColor: { type: String, default: 'primary' },
    outsideArrows: { type: Boolean, default: true },
    mobileArrows: { type: Boolean, default: true },
    sticky: { type: Boolean, default: false },
    top: { type: String, default: '49px' },
    dense: { type: Boolean, default: true },
  },
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const observeClass = computed(() => {
      return {
        sticky: props.sticky,
        'z-[2000]': props.sticky,
      }
    })
    const observeStyle = computed(() => {
      return {
        top: props.sticky && props.top,
        'border-radius': props.sticky && '0 0 5px 5px',
      }
    })

    return {
      observeValue,
      observeClass,
      observeStyle,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>
