<template>
  <input-date
    v-model="observeValue"
    :label="label"
    :placeholder="placeholder"
    :max="max"
    :required="required"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { convertDateTime } from '@/utils/data-convert'

export default defineComponent({
  props: {
    modelValue: { type: [String, Number] },
    label: { type: String },
    placeholder: { type: String },
    max: { type: [String], default: convertDateTime() },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)

    return {
      observeValue,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
