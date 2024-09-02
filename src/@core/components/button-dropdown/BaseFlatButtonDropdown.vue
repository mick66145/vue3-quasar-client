<template>
  <q-btn-dropdown
    no-caps
    :flat="flat"
    :color="color"
    :size="size"
    :label="label"
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
    label: { type: String },
    color: { type: String, default: 'primary' },
    flat: { type: Boolean, default: true },
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
