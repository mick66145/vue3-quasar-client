<template>
  <q-btn-dropdown
    no-caps
    class="shadow-1"
    :outline="outline"
    :rounded="rounded"
    :color="color"
    :label="label"
    :icon="icon"
    :size="size"
  >
    <slot name="default">
      <q-list>
        <q-item
          v-for="(option,index) in options"
          :key="index"
          v-close-popup
          :to="option.to"
          :icon="option.icon"
          :active-class="option.activeClass"
          clickable
        >
          <q-item-section>
            <q-item-label>{{ option.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </slot>
  </q-btn-dropdown>
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    label: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    icon: { type: String },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    options: { type: Array, default () { return [] } },
  },
  setup (props) {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>
