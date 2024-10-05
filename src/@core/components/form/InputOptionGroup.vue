<template>
  <div class="py-[10px]">
    <label v-if="showLabel">{{ label }}</label>
    <q-option-group
      v-model="observeValue"
      :options="options"
      :color="color"
      :inline="inline"
      :type="type"
      :disable="disable"
      :dense="dense"
    />
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null, Object, Boolean] },
    options: { type: Array, default () { return [] } },
    label: { type: String },
    inline: { type: Boolean, default: true },
    color: { type: String, default: 'primary' },
    type: { type: String },
    disable: { type: Boolean, default: false },
    showLabel: { type: Boolean, default: false },
    dense: { type: Boolean, default: true },
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
