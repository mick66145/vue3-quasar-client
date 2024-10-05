<template>
  <input-option-group
    v-model="observeValue"
    :options="options"
    :color="color"
    :label="label"
    :disable="disable"
    type="radio"
  />
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null, Object, Boolean] },
    options: { type: Array, default () { return [] } },
    label: { type: String },
    color: { type: String, default: 'primary' },
    disable: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
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
