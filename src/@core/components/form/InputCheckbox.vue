<template>
  <q-field v-model="observeValue" :rules="rules" borderless>
    <template #control>
      <q-checkbox
        v-model="observeValue"
        :class="observeClass"
        :label="label"
        :val="val"
        :checked-icon="checkedIcon"
        :unchecked-icon="uncheckedIcon"
        :left-label="leftLabel"
        :dense="dense"
      >
        <template v-if="$slots.default" #default>
          <slot name="default" />
        </template>
      </q-checkbox>
    </template>
  </q-field>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, computed } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: [Boolean, Array], default: false },
    rules: { type: Array },
    label: { type: String },
    val: {},
    checkedIcon: { type: String },
    uncheckedIcon: { type: String },
    leftLabel: { type: Boolean },
    dense: { type: Boolean, default: true },
    labelColor: { type: String },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const observeClass = computed(() => {
      const classObj = {}
      props.labelColor && (classObj[`text-${props.labelColor}`] = true)
      return classObj
    })
    return {
      observeValue,
      observeClass,
      emit,
    }
  },
})
</script>

<style lang="postcss" scoped>
:deep(.q-field__control) {
  @apply !min-h-0;
  .q-field__native {
    @apply min-h-0;
  }
}
</style>
