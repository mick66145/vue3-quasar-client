<template>
  <div class="py-10px q-gutter-x-sm">
    <selected-chip
      v-for="(option, optionIndex) in observeOptions"
      :key="optionIndex"
      :model-value="option.is_selected"
      :val="option"
      :label="option[optionLabel]"
      @update:selected="onSelected"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    modelValue: { type: [Object, String, null], default () { return '' } },
    options: { type: Array, default () { return [] } },
    optionLabel: { type: String, default: 'name' },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const observeOptions = ref(props.options.map((item) => { return { ...item, is_selected: item.is_selected || false } }))

    const onSelected = ({ state, val }) => {
      observeOptions.value = observeOptions.value.map((item) => { return { ...item, is_selected: item === val } })
      observeValue.value = observeValue.value === val ? observeValue.value : val
    }

    return {
      observeValue,
      observeOptions,
      onSelected,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
