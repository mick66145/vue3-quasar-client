<template>
  <div class="row">
    <label class="col-12" v-if="showLabel">{{ inputLabel }}</label>
    <div class="col-12">
      <div class="row">
        <div class="col-5" v-if="showMinValue">
          <input-number v-model="observeValue.min_value" />
        </div>
        <div class="col-2">
          <div class="flex-center row q-field__marginal">
            <span class="text-20px">
              <span v-show="showMinValue">{{ minSymbol }}</span>
              <span v-show="showMidValue">{{ median }}</span>
              <span v-show="showMaxValue">{{ maxSymbol }}</span>
            </span>
          </div>
        </div>
        <div class="col-5">
          <input-number class="col-5" v-if="showMaxValue" v-model="observeValue.max_value">
            <template #after>
              <slot name="max-value-after"></slot>
            </template>
          </input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: Object, default: {min_value:0,max_value:0} },
    minSymbol: { type: String, default: '≤' },
    maxSymbol: { type: String, default: '≤' },
    median: { type: String, default: 'X' },
    showLabel: { type: Boolean, default: false },
    showMinValue: { type: Boolean, default: true },
    showMidValue: { type: Boolean, default: true },
    showMaxValue: { type: Boolean, default: true },
  },
  emits: [
    'update:modelValue',
  ],
  setup(props, { emit }) {
    // data
    const { label, showLabel } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const inputLabel = computed(() => {
      return showLabel.value ? label.value : undefined
    })

    return {
      observeValue,
      inputLabel,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
