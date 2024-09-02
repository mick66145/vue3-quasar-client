
<template>
  <q-item
    v-ripple
    :to="to"
    clickable
    @click="clickFn"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" size="2rem" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    to: { type: String, required: true },
    icon: { type: String },
    title: { type: String, default: '' },
    clickFn: { type: Function },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
