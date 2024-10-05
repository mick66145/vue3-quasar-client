<template>
  <q-page class="lt-sm:pb-16">
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
