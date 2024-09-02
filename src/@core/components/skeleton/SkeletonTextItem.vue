
<template>
  <q-item>
    <q-item-section>
      <q-item-label>
        <q-skeleton type="text" />
      </q-item-label>
      <q-item-label>
        <q-skeleton type="text" :width="`${random()}%`" />
      </q-item-label>
      <q-item-label>
        <q-skeleton type="text" :width="`${random()}%`" />
      </q-item-label>
      <q-item-label>
        <q-skeleton type="text" :width="`${random()}%`" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {},
  setup () {
    const random = () => {
      return Math.floor(Math.random() * (100 - 30 + 1)) + 30
    }
    return {
      random,
    }
  },
})
</script>
<style lang="postcss" scoped>
</style>
