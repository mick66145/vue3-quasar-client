<template>
  <q-icon
    :name="name"
    :tag="tag"
    :color="color"
    :size="size"
    :left="left"
    :right="right"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    color: { type: String },
    size: { type: String, default: 'md' },
    name: { type: String },
    tag: { type: String },
    left: { type: Boolean },
    right: { type: Boolean },
  },
  setup (props) {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
