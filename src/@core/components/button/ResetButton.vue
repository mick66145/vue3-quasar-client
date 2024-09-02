<template>
  <base-button
    :label="buttonLabel"
    :icon="icon"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
export default defineComponent({
  props: {
    label: { type: String },
    icon: { type: String },
  },
  setup (props) {
    // data
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.btn.reset')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>
