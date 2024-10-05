<template>
  <q-card class="border-primary cursor-pointer" :class="active && 'active'" flat bordered>
    <q-item class="px-7 q-my-lg">
      <q-item-section avatar>
        <q-item-section thumbnail>
          <base-image :ratio="16/9" width="100px" fit="contain" :src="preview(image)" />
        </q-item-section>
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
import { defineComponent, computed } from 'vue-demi'
import useImgStorage from '@/hooks/useImgStorage'

export default defineComponent({
  props: {
    image: { type: [String, Object] },
    title: { type: String },
    subtitle: { type: String },
    active: { type: Boolean, default: false },
  },
  setup () {
    // computed
    const preview = computed(() => (image) => {
      const { blobURL, url, base64, filename } = image || {}
      if (blobURL) return blobURL
      if (url) return url
      if (base64) return base64
      return getImageSrc({ filename, size: '200x' })
    })

    // use
    const { getImageSrc } = useImgStorage()

    return {
      preview,
    }
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
