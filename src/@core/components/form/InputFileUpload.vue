<template>
  <q-field
    v-model="observeValue"
    :outlined="outlined"
    class="h-full full-width"
  >
    <template #control>
      <div v-if="state.file" class="q-mb-md full-width">
        <q-list dense bordered padding class="rounded-borders">
          <q-item-label header>Files</q-item-label>
          <q-item
            v-downloadUrl="{url:preview(state), name:state.file.name}"
            clickable
          >
            <q-item-section avatar top>
              <q-avatar icon="assignment" color="grey" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">{{ state.file.name }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                color="red"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click.stop="onDelete"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <file-uploader
        v-else
        ref="fileUpload"
        class="full-width"
        :accept="accept"
        :max-file-size="maxFileSize"
        :disable="disable"
        @onFile="onFile"
      />
    </template>
  </q-field>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue-demi'
import useMessageDialog from '@/hooks/useMessageDialog'
import useImgStorage from '@/hooks/useImgStorage'

export default defineComponent({
  props: {
    modelValue: { type: [Object, File, String] },
    error: { type: String, default: '' },
    accept: { type: String },
    maxFileSize: { type: Number, default: 10240000 },
    disable: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const fileUpload = ref()
    const state = reactive({
      file: '',
    })
    // computed
    const observeValue = computed({
      get () {
        state.file = props.modelValue
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      },
    })
    const preview = computed(() => (data) => {
      const { blobURL, url, base64, name } = data.file || {}
      if (blobURL) return blobURL
      if (url) return url
      if (base64) return base64
      return getImageSrc({ name, size: '200x' })
    })

    // methods
    const onFile = async (fileObj) => {
      const { file, base64 } = fileObj
      const state = {
        blobURL: URL.createObjectURL(file),
        raw: file,
        base64: base64,
        name: file.name,
      }
      observeValue.value = state
    }
    const onDelete = async () => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除？' })
      if (!res) return
      observeValue.value = ''
    }

    // use
    const { messageDelete } = useMessageDialog()
    const { getImageSrc } = useImgStorage()

    return {
      fileUpload,
      observeValue,
      state,
      preview,
      onFile,
      onDelete,
    }
  },
})

</script>

<style lang="postcss" scoped>
.q-field--standard {
  :deep(.q-field__control) {
    &::before {
      @apply border-b-0;
    }
  }
}

</style>
