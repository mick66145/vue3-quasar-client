<template>
  <q-tab-panels
    v-model="observeValue"
    class="bg-grey-1"
    :animated="animated"
    :swipeable="swipeable"
    :vertical="vertical"
    :transition-prev="transitionPrev"
    :transition-next="transitionNext"
  >
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </q-tab-panels>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: { type: String },
    animated: { type: Boolean, default: true },
    swipeable: { type: Boolean, default: true },
    vertical: { type: Boolean, default: false },
    transitionPrev: { type: String, default: 'jump-up' },
    transitionNext: { type: String, default: 'jump-down' },
  },
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
:deep() {
  .q-panel {
    @apply overflow-hidden;
  }
}
</style>
