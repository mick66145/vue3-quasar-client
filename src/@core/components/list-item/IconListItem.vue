<template>
  <q-card class="border-primary cursor-pointer" :class="active && 'active'" flat bordered>
    <q-item class="px-7 q-my-lg">
      <q-item-section avatar>
        <q-icon
          :name="icon"
          :color="active ? 'white' : 'primary'"
          size="1.7rem"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label v-if="title" class="text-base">{{ title }}</q-item-label>
        <q-item-label v-if="subtitle" caption lines="1">{{ subtitle }}</q-item-label>
      </q-item-section>

      <q-item-section v-if="$slots.side" side>
        <slot name="side" />
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    icon: { type: String },
    title: { type: String },
    subtitle: { type: String },
    active: { type: Boolean, default: false },
  },
  setup () {
    return {}
  },
})
</script>

<style lang="postcss" scoped>
.q-card {
  &.active {
    @apply bg-primary;
    .q-item__label {
      @apply text-white;
    }
    .q-btn {
      background: white !important;
    }
  }
}
</style>
