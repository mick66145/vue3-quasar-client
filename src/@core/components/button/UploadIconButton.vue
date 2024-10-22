<template>
  <q-uploader
    ref="uploader"
    :accept="accept"
    :max-file-size="maxFileSize"
    @added="onFile"
    @rejected="onRejected"
  >
    <template #header="scope">
      <base-icon-button
        :label="buttonLabel"
        type="a"
        :icon="icon"
        :outline="outline"
        :rounded="rounded"
        @click="scope.pickFiles"
      >
        <q-uploader-add-trigger />
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
      </base-icon-button>
    </template>
  </q-uploader>
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
import useNotify from '@/hooks/useNotify'

export default defineComponent({
  props: {
    label: { type: String },
    icon: { type: String, default: 'cloud_upload' },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: true },
    accept: { type: String },
    maxFileSize: { type: Number, default: 10240000 },
  },
  emits: ['on-file'],
  setup (props, { emit }) {
    const { notify } = useNotify()

    // data
    const { label } = toRefs(props)
    const uploader = ref()
    const reader = new FileReader()

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.btn.upload')
    })

    // methods
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
        emit('on-file', { file: file, base64: event.target.result })
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
      buttonLabel,
      uploader,
      removeQueuedFiles,
      onFile,
      onRejected,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-uploader {
  width: inherit;
  box-shadow: none;
  &:deep(.q-uploader__header) {
    width: initial;

    @apply bg-transparent;
  }
  &:deep(.q-uploader__list) {
    display: none;
  }
}
</style>
