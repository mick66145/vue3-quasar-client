<template>
  <input-select
    v-model="observeValue"
    option-label="label"
    option-value="value"
    emit-value
    :options="options"
    :required="required"
  />
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  props: {
    modelValue: { type: [String, Object, Boolean] },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const options = ref([{ label: '是', value: true }, { label: '否', value: false }])

    return {
      observeValue,
      options,
    }
  },
})

</script>

<style lang="postcss" scoped></style>
