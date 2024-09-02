<template>
  <q-infinite-scroll ref="infiniteScroll" @load="onLoad">
    <slot />
    <template #loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  props: {
  },
  emits: ['load'],
  setup (props, { emit }) {
    // data
    const infiniteScroll = ref()

    // methods
    const onLoad = (index, done) => {
      emit('load', index, done)
    }
    const stop = () => {
      infiniteScroll.value.stop()
    }
    const resume = () => {
      infiniteScroll.value.resume()
    }
    return {
      infiniteScroll,
      onLoad,
      stop,
      resume,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
