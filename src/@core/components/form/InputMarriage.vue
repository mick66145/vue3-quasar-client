<template>
  <input-option-group
    v-model="observeValue"
    :label="label"
    type="radio"
    :options="marriageList"
  />
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
import { marriageList } from '@/config/config-marriage'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    label: { type: String, default: '婚姻' },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
      marriageList,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
