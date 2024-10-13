
<template>
  <q-input
    ref="input"
    v-model="observeValue"
    :label="inputLabel"
    :clearable="clearable"
    :outlined="outlined"
    :placeholder="observePlaceholder"
    :rules="ruleList"
    :dense="dense"
    :lazy-rules="lazyRules"
    :maxlength="maxlength"
    :minlength="minlength"
    @clear="clearFn"
    @change="changeFn"
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
  </q-input>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { vuelidate } from '@/plugins/vuelidate'
import { i18n } from '@/plugins/i18n'

export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: [String, Number, Object, null] },
    rules: { type: Array, default () { return [] } },
    clearable: { type: Boolean, default: true },
    outlined: { type: Boolean, default: true },
    placeholder: { type: String },
    maxlength: { type: Number, default: 255 },
    minlength: { type: Number },
    required: { type: Boolean, default: false },
    showLabel: { type: Boolean, default: false },
    dense: { type: Boolean, default: true },
    lazyRules: { type: Boolean, default: true },
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    // data
    const input = ref()
    const { label, placeholder, rules, showLabel, maxlength, minlength, required } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const observePlaceholder = computed(() => {
      return placeholder.value !== undefined ? placeholder.value : i18n.global.t('g.common.input', { field: '' })
    })
    const ruleList = computed(() => {
      const rule = []
      required.value && rule.push(vuelidate.required(i18n.global.t('g.validation.required', { attribute: label.value })))
      maxlength.value && rule.push(vuelidate.maxLength(maxlength.value, i18n.global.t('g.validation.max-length', { max: maxlength.value })))
      minlength.value && rule.push(vuelidate.minLength(minlength.value, i18n.global.t('g.validation.min-length', { min: minlength.value })))
      return rule.concat(rules.value)
    })
    const inputLabel = computed(() => {
      return showLabel.value ? label.value : undefined
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
    const clearFn = (val) => {
      emit('change')
    }
    const changeFn = (val) => {
      emit('change', val)
    }
    return {
      input,
      observeValue,
      observePlaceholder,
      ruleList,
      inputLabel,
      focus,
      blur,
      select,
      clearFn,
      changeFn,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-input {
  @apply py-[10px];
}
</style>
