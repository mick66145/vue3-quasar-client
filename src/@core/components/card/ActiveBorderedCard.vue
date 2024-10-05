<template>
  <q-card class="cursor-pointer" :class="observeClass">
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </q-card>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
export default defineComponent({
  props: {
    active: { type: Boolean, default: false },
  },
  setup (props) {
    // data
    const { active } = toRefs(props)

    // computed
    const observeClass = computed(() => {
      const classObj = {
        'border-primary': active.value,
      }
      return classObj
    })
    return {
      observeClass,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
