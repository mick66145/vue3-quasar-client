<template>
  <q-btn
    flat
    padding="0"
    :size="size"
    :color="color"
    :label="label"
    :class="observeClass"
    @click.stop
  />
</template>

<script>
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  props: {
    label: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    size: { type: String },
    underline: { type: Boolean, default: true },
  },
  setup (props) {
    const observeClass = computed(() => {
      return {
        underline: props.underline,
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
