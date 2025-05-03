<template>
  <div class="flex items-center">
    <input-radio-option-group
      v-model="observeValue"
      :options="options"
      :color="color"
      :label="label"
      :disable="disable"
      @update:modelValue="other = ''"
    >
      <template v-if="$slots.label" #label="{ opt }">
        <slot name="label" :opt="opt" />
      </template>
    </input-radio-option-group>
    <div class="other-option">
      <input-radio
        v-model="other"
        val="other"
        label="其他"
        @update:modelValue="observeValue = ''"
      />
      <input-text
        v-if="other"
        v-model="observeValue"
        class="ml-[8px]"
        :outlined="false"
      />
    </div>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, computed, toRefs } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number, null, Object, Boolean] },
    options: { type: Array, default () { return [] } },
    label: { type: String },
    color: { type: String, default: 'primary' },
    disable: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { options } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const other = computed({
      get () { return options.value.map(item => item.value).includes(observeValue.value) ? '' : 'other' },
      set () {},
    })
    return {
      observeValue,
      other,
    }
  },
})
</script>

<style lang="postcss" scoped>
.other-option {
  @apply flex items-center;
  @apply md:ml-[8px];
}
</style>
