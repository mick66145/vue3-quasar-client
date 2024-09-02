<template>
  <q-select
    v-model="observeValue"
    :label="inputLabel"
    :options="filterOptions"
    :clearable="clearable"
    :outlined="outlined"
    :use-input="useInput"
    :map-options="mapOptions"
    :emit-value="emitValue"
    :hide-selected="hideSelected"
    :fill-input="fillInput"
    :input-debounce="inputDebounce"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :option-label="optionLabelFn"
    :option-value="optionValueFn"
    :dense="dense"
    :lazy-rules="lazyRules"
    :rules="ruleList"
    @filter="filterFn"
    @clear="clearFn"
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

    <template v-if="$slots.selected" #selected>
      <slot name="selected" />
    </template>

    <template v-if="$slots.beforeOptions" #before-options>
      <slot name="before-options" />
    </template>

    <template v-if="$slots.afterOptions" #after-options>
      <slot name="after-options" />
    </template>

    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          無此結果
        </q-item-section>
      </q-item>
    </template>

    <template v-if="$slots.selectedItem" #selected-item>
      <slot name="selected-item" />
    </template>

    <template v-if="$slots.option" #option="scope">
      <slot name="option" :scope="scope" />
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { selectMatchItem } from '@/utils/filter'
import { vuelidate } from '@/plugins/vuelidate'
import { i18n } from '@/plugins/i18n'

export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: [String, Number, null, Object, Boolean] },
    rules: { type: Array, default () { return [] } },
    options: { type: Array, default () { return [] } },
    clearable: { type: Boolean, default: true },
    outlined: { type: Boolean, default: true },
    useInput: { type: Boolean, default: true },
    mapOptions: { type: Boolean, default: true },
    emitValue: { type: Boolean, default: false },
    fillInput: { type: Boolean, default: true },
    inputDebounce: { type: Number, default: 0 },
    transitionShow: { type: String, default: 'scale' },
    transitionHide: { type: String, default: 'scale' },
    optionLabel: { type: String, default: 'name' },
    optionValue: { type: String, default: 'id' },
    dense: { type: Boolean, default: true },
    lazyRules: { type: Boolean, default: true },
    showLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const { label, rules, showLabel, required } = toRefs(props)
    const filterOptions = ref(props.options)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const hideSelected = computed(() => {
      return props.useInput
    })
    const ruleList = computed(() => {
      const rule = []
      required.value && rule.push(vuelidate.required(i18n.global.t('g.validation.required', { attribute: label.value })))
      return rule.concat(rules.value)
    })
    const inputLabel = computed(() => {
      return showLabel.value ? label.value : undefined
    })

    // methods
    const filterFn = (val, update, abort) => {
      update(() => {
        const needle = val.toLowerCase()
        const needleOptions = selectMatchItem(props.options.map(item => item[props.optionLabel]), needle)
        filterOptions.value = props.options.filter(item => needleOptions.includes(item[props.optionLabel]))
      })
    }
    const clearFn = (val) => {
      observeValue.value = null
    }
    const optionValueFn = (item) => {
      return (item[props.optionValue] !== undefined || null) ? item[props.optionValue] : item
    }
    const optionLabelFn = (item) => {
      return (item[props.optionLabel] !== undefined || null) ? item[props.optionLabel] : item
    }
    return {
      inputLabel,
      observeValue,
      filterOptions,
      hideSelected,
      ruleList,
      filterFn,
      clearFn,
      optionValueFn,
      optionLabelFn,
      emit,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-select {
  @apply py-[10px];
}
</style>
