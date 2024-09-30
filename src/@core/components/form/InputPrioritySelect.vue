<template>
  <input-select
    v-model="observeValue"
    emit-value
    option-label="label"
    option-value="value"
    :label="label"
    :options="priorityList"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { priorityList } from '@/config/config-priority'
export default defineComponent({
  props: {
    modelValue: { type: [String, null] },
    label: { type: String, default: '優先順序' },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
      priorityList,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
