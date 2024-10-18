<template>
  <q-btn
    flat
    no-caps
    padding="0"
    :align="align"
    :size="size"
    :color="color"
    :label="label"
    :class="observeClass"
    :to="to"
    :href="href"
    :target="target"
    @click.stop
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'

export default defineComponent({
  props: {
    label: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    size: { type: String },
    align: { type: String, default: 'left' },
    underline: { type: Boolean, default: true },
    to: { type: String },
    href: { type: String },
    target: { type: String, default: '_blank' },
  },
  setup (props) {
    const { underline } = toRefs(props)
    // computed
    const observeClass = computed(() => {
      return {
        underline: underline.value,
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
