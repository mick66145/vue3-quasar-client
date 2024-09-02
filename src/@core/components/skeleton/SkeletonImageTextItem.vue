
<template>
  <q-item>
    <div class="col-5">
      <q-item-section>
        <q-skeleton class="w-full" height="100px" />
      </q-item-section>
    </div>
    <div class="row col-7">
      <div class="ml-2 w-full row">
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
      </div>
    </div>
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
