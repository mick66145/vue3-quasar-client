<template>
  <base-chip
    v-model:selected="observeValue"
    :color="observeValue ? selectedColor : color"
    :text-color="observeValue ? selectedTextColor : textColor"
    :label="label"
    :clickable="true"
    :square="true"
    @update:selected="onSelected"
  />
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String },
    val: { type: [String, Object, Number] },
    color: { type: String, default: 'white' },
    textColor: { type: String, default: 'primary' },
    selectedColor: { type: String, default: 'primary' },
    selectedTextColor: { type: String, default: 'white' },
  },
  emits: ['update:selected', 'update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)

    const onSelected = (state) => {
      emit('update:selected', { state: state, val: props.val })
    }
    return {
      observeValue,
      onSelected,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
