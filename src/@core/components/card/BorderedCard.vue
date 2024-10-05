<template>
  <q-card class="shadow-0" bordered>
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </q-card>
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

<style lang="postcss" scoped></style>
