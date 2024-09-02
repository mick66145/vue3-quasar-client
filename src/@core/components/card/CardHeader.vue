<template>
  <q-card-section>
    <slot name="header">
      <div class="row items-center justify-between">
        <div class="flex items-center">
          <div class="text-h6">
            <slot />
          </div>
        </div>
        <div v-if="$slots.action">
          <slot name="action" />
        </div>
      </div>
    </slot>
  </q-card-section>
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
