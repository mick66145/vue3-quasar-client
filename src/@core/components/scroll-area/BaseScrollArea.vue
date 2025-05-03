<template>
  <q-scroll-area>
    <slot name="default" />
  </q-scroll-area>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
