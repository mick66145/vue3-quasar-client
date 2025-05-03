<template>
  <div class="q-form-item" :class="{'block':false, 'is-required':required}">
    <label class="q-form-item__label" :style="labelStyle">{{ label }}</label>
    <div class="w-full q-form-item__content break-words">
      <template v-if="$slots.default">
        <slot name="default" />
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs, inject } from 'vue-demi'

export default defineComponent({
  props: {
    label: { type: String },
    labelWidth: { type: String },
    labelPosition: { type: String },
    required: { type: Boolean, default: false },
  },
  setup (props) {
    // data
    const { labelWidth } = toRefs(props)

    // computed
    const form = computed(() => inject('formProps', null))
    const labelStyle = computed(() => {
      if (!form.value) return
      const ret = {}
      const _labelWidth = labelWidth.value || form.value.labelWidth
      if (form.value.labelPosition === 'top') return ret
      if (_labelWidth) { ret.width = _labelWidth }
      return ret
    })
    return {
      labelStyle,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-form-item {
  @apply flex flex-nowrap items-center;
  .q-form-item__label {
    @apply pr-2;
  }
  &.is-required {
    .q-form-item__label {
      @apply before:mr-[0.25rem] before:text-red-500 before:content-['*'];
    }
  }
}

</style>
