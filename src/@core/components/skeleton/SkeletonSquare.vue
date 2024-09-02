
<template>
  <q-skeleton
    square
    :height="height"
    :width="width"
  />
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    height: { type: String, default: '150px' },
    width: { type: String },
  },
  setup () {
    return {
    }
  },
})
</script>
<style lang="postcss" scoped>
</style>
