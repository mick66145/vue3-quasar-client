<template>
  <input-text
    ref="input"
    v-model="observeValue"
    :label="label"
    :rules="ruleList"
    :required="required"
    type="url"
  >
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
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

import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { vuelidate } from '@/plugins/vuelidate'
import { i18n } from '@/plugins/i18n'

export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: [String, Number], default: 0 },
    rules: { type: Array, default () { return [] } },
    required: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // ref
    const input = ref()

    // data
    const { rules } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const ruleList = computed(() => {
      const rule = [
        vuelidate.url(i18n.global.t('g.validation.url')),
      ]
      return rule.concat(rules.value)
    })

    // methods
    const focus = () => {
      input.value.focus()
    }
    const blur = () => {
      input.value.blur()
    }
    const select = () => {
      input.value.select()
    }

    return {
      input,
      observeValue,
      ruleList,
      focus,
      blur,
      select,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
