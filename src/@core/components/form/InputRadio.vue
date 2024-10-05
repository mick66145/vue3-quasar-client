<template>
  <q-radio
    v-model="observeValue"
    :label="label"
    :val="val"
    :dense="dense"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number], default: false },
    label: { type: String },
    val: {},
    dense: { type: Boolean, default: true },
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
.q-radio {
  @apply py-[10px];
}
</style>
