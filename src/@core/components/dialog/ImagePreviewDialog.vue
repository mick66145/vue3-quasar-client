<template>
  <base-dialog
    v-model="isShowDialog"
    title="預覽圖片"
    :show-confirm="false"
  >
    <base-image class="w-full" :src="preview(data)" :preview="false" />
  </base-dialog>
</template>

<script>
import { defineComponent, ref, computed } from 'vue-demi'
import useDialog from '@/hooks/useDialog'
import useImgStorage from '@/hooks/useImgStorage'

export default defineComponent({
  setup () {
    const data = ref()
    const preview = computed(() => (data) => {
      const { blobURL, url, base64, filename } = data.image || {}
      if (blobURL) return blobURL
      if (url) return url
      if (base64) return base64
      return getImageSrc({ filename, size: '200x' })
    })

    // methods
    const showDialog = async ({ data: imageData }) => {
      data.value = imageData
      isShowDialog.value = !isShowDialog.value
    }

    // use
    const { isShowDialog } = useDialog({
    })
    const { getImageSrc } = useImgStorage()

    return {
      data,
      preview,
      isShowDialog,
      showDialog,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
