<template>
  <base-uploader
    ref="uploader"
    :accept="accept"
    :max-file-size="maxFileSize"
    :disable="disable"
    @added="onFile"
    @rejected="onRejected"
  >
    <template #upload-bottom>
      檔案大小 : {{ megabyte }}{{ unit }}。
    </template>
  </base-uploader>
</template>

<script>
import BaseUploader from './BaseUploader.vue'
import { defineComponent, ref, computed } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
import useNotify from '@/hooks/useNotify'

export default defineComponent({
  components: {
    BaseUploader,
  },
  props: {
    accept: { type: String },
    maxFileSize: { type: Number, default: 10240000 },
    disable: { type: Boolean, default: false },
  },
  emits: ['onFile'],
  setup (props, { emit }) {
    const { notify } = useNotify()

    // data
    const uploader = ref()
    const reader = new FileReader()

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
    const onFile = (files) => {
      const file = files[0]
      const fileType = file.type
      console.log('🚀 ~ onFile ~ fileType', fileType)
      if (props.accept && !props.accept.includes(fileType)) return notify({ message: i18n.global.t('g.validation.file-format'), type: 'negative' })
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        emit('onFile', { file: file, base64: event.target.result })
      }
    }
    const onRejected = (rejectedEntries) => {
      const file = rejectedEntries[0].file
      const fileType = file.type
      const size = file.size
      if (props.accept && !props.accept.includes(fileType)) return notify({ message: i18n.global.t('g.validation.file-format'), type: 'negative' })
      if (size > props.maxFileSize) return notify({ message: i18n.global.t('g.validation.max-size'), type: 'negative' })
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
