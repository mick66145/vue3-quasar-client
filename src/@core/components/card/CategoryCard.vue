<template>
  <q-card class="card-block" @click="go(data)">
    <q-card-section class="card-section">
      <span class="text-1rem">{{ data.meta.title }}</span>
      <svg-icon icon="arrow-right" size="15" />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    data: { type: Object },
  },
  setup () {
    const router = useRouter()
    const go = (data) => {
      router.push({ name: data.name || data.redirect.name })
    }
    return {
      go,
    }
  },
})
</script>

<style lang="postcss" scoped>
.card-block {
  @apply border-solid border-gray-300 border-[1px];
  @apply p-8 ;
  .card-section {
    @apply p-0;
    @apply flex justify-between items-center;
  }
}
</style>
