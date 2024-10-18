<template>
  <div>
    <div v-if="observeValue.length > 0" class="q-mb-md q-gutter-md">
      <q-list dense bordered padding class="rounded-borders">
        <q-item-label header>Files</q-item-label>
        <q-item
          v-for="(fileItem, fileIndex) in observeValue"
          :key="fileIndex"
          v-ripple
          v-downloadUrl="{url:preview(fileItem), name:fileItem.file_info.name}"
          clickable
        >
          <q-item-section avatar top>
            <q-avatar icon="assignment" color="grey" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">{{ fileItem.file_info.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              color="red"
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click.stop="onDelete(fileIndex)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <file-uploader
      ref="imageUpload"
      class="full-width"
      :accept="accept"
      :max-file-size="maxFileSize"
      :disable="disable"
      @onFile="onFile"
    />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue-demi'
import useMessageDialog from '@/hooks/useMessageDialog'
import useImgStorage from '@/hooks/useImgStorage'

export default defineComponent({
  components: {
  },
  props: {
    modelValue: { type: Array, default () { return [] } },
    accept: { type: String },
    maxFileSize: { type: Number, default: 10240000 },
    disable: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const dialog = ref()
    const imageUpload = ref()

    // computed
    const observeValue = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      },
    })
    const preview = computed(() => (data) => {
      const { blobURL, url, base64, name } = data.file_info || {}
      if (blobURL) return blobURL
      if (url) return url
      if (base64) return base64
      return getImageSrc({ name, size: '200x' })
    })

    // methods
    const onFile = async (fileObj) => {
      const { file, base64 } = fileObj
      const state = {
        alt: '',
        title: '',
        file_info: {
          blobURL: URL.createObjectURL(file),
          raw: file,
          base64: base64,
          name: file.name,
        },
      }
      observeValue.value.push(state)
    }
    const onDelete = async (index) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除？' })
      if (!res) return
      observeValue.value.splice(index, 1)
    }

    // use
    const { messageDelete } = useMessageDialog()
    const { getImageSrc } = useImgStorage()

    return {
      dialog,
      imageUpload,
      observeValue,
      preview,
      onFile,
      onDelete,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
