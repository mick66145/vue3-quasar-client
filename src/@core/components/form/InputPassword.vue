<template>
  <input-text
    v-model="observeValue"
    :type="isPwd ? 'password' : 'text'"
    :required="required"
  >
    <template #append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
  </input-text>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, ref } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number] },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    const isPwd = ref(true)
    return {
      observeValue,
      isPwd,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
