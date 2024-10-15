<template>
  <input-text
    ref="input"
    v-model="observeValue"
    :class="{'no-spinner':!spinner}"
    :label="inputLabel"
    type="number"
    :min="min"
    :max="max"
    :rules="ruleList"
    @clear="clearFn"
    @change="onChange"
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
import { vuelidate } from '@/plugins/vuelidate'
import { i18n } from '@/plugins/i18n'
import useNotify from '@/hooks/useNotify'

export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: [String, Number], default: 0 },
    rules: { type: Array, default () { return [] } },
    required: { type: Boolean, default: true },
    min: { type: [String, Number], default: 0 },
    max: { type: [String, Number] },
    showLabel: { type: Boolean, default: false },
    showMaxNotify: { type: Boolean, default: false },
    spinner: { type: Boolean, default: true },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // ref
    const input = ref()

    // data
    const { label, rules, required, min, max, showLabel, showMaxNotify } = toRefs(props)

    // computed
    const ruleList = computed(() => {
      const rule = []
      required.value && rule.push(vuelidate.required(i18n.global.t('g.validation.required', { attribute: label.value })))
      min.value && rule.push(vuelidate.minValue(i18n.global.t('g.validation.min-value', { attribute: label.value, min: min.value })))
      max.value && rule.push(vuelidate.maxValue(i18n.global.t('g.validation.max-value', { attribute: label.value, max: max.value })))
      return rule.concat(rules.value)
    })
    const observeValue = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        if (value === '' || value === null) {
          emit('update:modelValue', required.value ? 0 : value)
          return
        }
        emit('update:modelValue', +value)
      },
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
      emit('update:modelValue', required.value ? (min.value ? min.value : 0) : null)
    }
    const onChange = (val) => {
      (showMaxNotify.value && max.value && val >= max.value) && customNotify({ message: '已達上限', icon: null, color: 'grey-8' })
    }

    // use
    const { customNotify } = useNotify()

    return {
      input,
      observeValue,
      ruleList,
      inputLabel,
      focus,
      blur,
      select,
      clearFn,
      onChange,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-input {
  @apply py-[10px];
}
.no-spinner {
  :deep(input[type="number"]::-webkit-outer-spin-button),
  :deep(input[type="number"]::-webkit-inner-spin-button) {
    @apply appearance-none m-0;
  }
  :deep(input[type="number"]) {
    @apply appearance-none;
  }
}
</style>
