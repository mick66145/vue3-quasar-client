<template>
  <input-select
    v-model="observeValue"
    emit-value
    option-label="label"
    option-value="value"
    :label="label"
    :options="frequencyList"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { frequencyList } from '@/config/config-frequency'
export default defineComponent({
  props: {
    modelValue: { type: [String, null] },
    label: { type: String, default: '頻率' },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
      frequencyList,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
