<template>
  <base-flat-button
    :color="color"
    :label="buttonLabel"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
export default defineComponent({
  props: {
    label: { type: String },
    color: { type: String, default: 'primary' },
  },
  setup (props) {
    // data
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.btn.confirm')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
