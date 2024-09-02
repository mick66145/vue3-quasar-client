
<template>
  <template v-for="n in 5" :key="n">
    <skeleton-text-item class="q-pa-md" />
  </template>
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {},
  setup () {
    return {
    }
  },
})
</script>
<style lang="postcss" scoped>
</style>
