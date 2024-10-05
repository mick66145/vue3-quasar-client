<template>
  <input-text
    v-model="observeValue"
    :label="label"
    :placeholder="placeholder"
    :maxlength="65536"
    :required="required"
    type="textarea"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: [String, Number, null] },
    placeholder: { type: String },
    required: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)

    return {
      observeValue,
      emit,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-textarea {
  @apply py-[10px];
}
</style>
