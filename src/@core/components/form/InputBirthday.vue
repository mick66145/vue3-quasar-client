<template>
  <input-date
    v-model="observeValue"
    :placeholder="observePlaceholder"
    :label="observeLabel"
    :max="max"
    :required="required"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { i18n } from '@/plugins/i18n'
import { convertDateTime } from '@/utils/data-convert'

export default defineComponent({
  props: {
    modelValue: { type: [String, Number] },
    label: { type: String },
    placeholder: { type: String },
    max: { type: [String], default: convertDateTime() },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { label, placeholder } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.common.birthday')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.select', { field: i18n.global.t('g.common.birthday') })
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
