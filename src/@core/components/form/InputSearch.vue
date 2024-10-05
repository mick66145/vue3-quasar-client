<template>
  <input-text v-model="observeValue" :label="observeLabel" :placeholder="observePlaceholder" :required="required">
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template #append>
      <q-icon name="search" />
    </template>

    <template v-if="$slots.before" #before>
      <slot name="before" />
    </template>
    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="$slots.counter" #counter>
      <slot name="counter" />
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
  </input-text>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { i18n } from '@/plugins/i18n'

export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    label: { type: String },
    placeholder: { type: String },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { label, placeholder } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.common.keyword')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : i18n.global.t('g.common.input', { field: i18n.global.t('g.common.keyword') })
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      emit,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
