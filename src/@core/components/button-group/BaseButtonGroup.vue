<template>
  <q-btn-group :class="observeClass">
    <slot name="default" />
  </q-btn-group>
</template>

<script>
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  props: {
    outline: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    unelevated: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    square: { type: Boolean, default: false },
    push: { type: Boolean, default: false },
    glossy: { type: Boolean, default: false },
  },
  setup (props) {
    const observeClass = computed(() => {
      return {

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
