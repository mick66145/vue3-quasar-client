<template>
  <input-option-group
    v-model="observeValue"
    :label="label"
    type="radio"
    :options="genderList"
  />
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
import { genderList } from '@/config/config-gender'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null] },
    label: { type: String, default: '性別' },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
      genderList,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
