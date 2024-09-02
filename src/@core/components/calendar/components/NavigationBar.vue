<template>
  <div class="row justify-center">
    <div class="row q-pa-md q-gutter-sm">
      <base-button
        label="< Prev"
        @click="onPrev"
      />
      <base-button
        label="Today"
        @click="onToday"
      />
      <base-button
        label="Next >"
        @click="onNext"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['prev', 'today', 'next'],
  setup (prop, { emit }) {
    const onPrev = () => {
      emit('prev')
    }
    const onToday = () => {
      emit('today')
    }
    const onNext = () => {
      emit('next')
    }

    return {
      onPrev,
      onToday,
      onNext,
    }
  },
})
</script>
