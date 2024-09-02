<template>
  <base-button
    :outline="outline"
    :rounded="rounded"
    :label="observeLabel"
    :color="color"
    :icon="icon"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    icon: { type: String },
  },
  setup (props) {
    // data
    const { label } = toRefs(props)

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.btn.save')
    })

    return {
      observeLabel,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
