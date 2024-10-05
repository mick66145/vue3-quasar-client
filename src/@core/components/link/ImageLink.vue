<template>
  <base-link
    :size="size"
    :color="color"
    :label="label(modelValue)"
    :underline="underline"
    :href="preview(modelValue)"
  />
</template>

<script>
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  props: {
    modelValue: { type: [Object, File, String] },
    color: { type: String },
    size: { type: String },
    underline: { type: Boolean, default: true },
    href: { type: String },
  },
  setup (props) {
    // computed
    const preview = computed(() => (data) => {
      const { blobURL, url, base64, filename } = data?.image || data || {}
      if (blobURL) return blobURL
      if (url) return url
      if (base64) return base64
    })
    const label = computed(() => (data) => {
      const { filename, name } = data?.file || data || {}
      if (filename) return filename
      if (name) return name
    })
    return {
      label,
      preview,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
