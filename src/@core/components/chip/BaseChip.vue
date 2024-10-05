<template>
  <q-chip
    :color="color"
    :text-color="textColor"
    :label="label"
    :clickable="clickable"
    :square="square"
    :size="size"
    :icon="icon"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    label: { type: String },
    color: { type: String, default: 'primary' },
    textColor: { type: String, default: 'white' },
    icon: { type: String },
    size: { type: String, default: 'md' },
    clickable: { type: Boolean, default: false },
    square: { type: Boolean, default: false },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
