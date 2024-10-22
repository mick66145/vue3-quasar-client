<template>
  <base-uploader
    ref="uploader"
    multiple
    :accept="accept"
    :max-file-size="maxFileSize"
    :img-src="imgSrc"
    :disable="disable"
    @added="onFile"
    @rejected="onRejected"
  >
    <template #upload-bottom>
      請上傳 JPG 或 PNG 格式圖片，檔案大小 : {{ megabyte }}{{ unit }}。
    </template>
  </base-uploader>
</template>

<script>
import BaseUploader from './BaseUploader.vue'
import { defineComponent, ref, computed } from 'vue-demi'
import { readFileAsDataUrl } from '@/utils/blob'
import { i18n } from '@/plugins/i18n'
import useNotify from '@/hooks/useNotify'
export default defineComponent({
  components: {
    BaseUploader,
  },
  props: {
    accept: { type: String, default: 'image/png, image/jpeg, image/jpg' },
    imgSrc: { type: String },
    maxFileSize: { type: Number, default: 10240000 },
    disable: { type: Boolean, default: false },
  },
  emits: ['onFile'],
  setup (props, { emit }) {
    const { notifyError } = useNotify()

    // data
    const uploader = ref()

    // computed
    const megabyte = computed(() => {
      return props.maxFileSize >= 1048576000 ? props.maxFileSize / 1048576000 : props.maxFileSize / 1024000
    })
    const unit = computed(() => {
      return props.maxFileSize >= 1048576000 ? 'GB' : 'MB'
    })

    const removeQueuedFiles = () => {
      uploader.value.removeQueuedFiles()
    }
    const onFile = async (files) => {
      const tmpFiles = []
      for (const [imageItemIndex, fileItem] of files.entries()) {
        const fileType = fileItem.type
        console.log('🚀 ~ onFile ~ fileType', fileType)
        const readObj = {
          dataUrl: () => { return readFileAsDataUrl(fileItem) },
        }
        const data = await readObj.dataUrl()
        tmpFiles.push({ file: fileItem, base64: data })
      }
      emit('onFile', tmpFiles)
    }
    const onRejected = (rejectedEntries) => {
      for (const [rejectedItemIndex, rejectedItem] of rejectedEntries.entries()) {
        const file = rejectedItem.file
        const fileType = file.type
        const size = file.size
        if (!props.accept.includes(fileType)) notifyError({ message: `${file.name}格式錯誤` })
        if (size > props.maxFileSize) notifyError({ message: `${file.name}${i18n.global.t('g.validation.max-size')}` })
      }
    }

    return {
      uploader,
      megabyte,
      unit,
      removeQueuedFiles,
      onFile,
      onRejected,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
