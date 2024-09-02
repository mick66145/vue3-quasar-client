<template>
  <q-field
    v-model="observeValue"
    :outlined="outlined"
    class="h-full full-width"
  >
    <template #control>
      <div class="mt-1rem input-image">
        <q-form ref="form">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <image-uploader
                ref="imageUpload"
                class="full-width"
                :img-src="uploadPreview"
                @onFile="onFile"
              />
            </div>
          </div>
        </q-form>

        <base-dialog v-model="showCropper" title="裁切圖片 : " @confirm="onCopper" @cancel="onCancelCopper">
          <image-cropper
            ref="cropper"
            :source="tempCropper"
            :aspect-ratio="aspect"
          />
        </base-dialog>
      </div>
    </template>
  </q-field>
</template>

<script>
import { defineComponent, computed, reactive, ref } from 'vue-demi'
import useImgStorage from '@/hooks/useImgStorage'
import ImageCropper from '../ImageCropper.vue'

export default defineComponent({
  components: {
    ImageCropper,
  },
  props: {
    modelValue: { type: [Object, File, String] },
    error: { type: String, default: '' },
    accept: { type: String, default: 'image/png, image/jpeg, image/jpg' },
    aspect: { type: Number },
    outlined: { type: Boolean, default: false },
    useCropper: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const imageUpload = ref()
    const cropper = ref()
    const showDialog = ref(false)
    let tempRaw = null // 存放圖片原始資料(type, name)
    const tempCropper = ref(null) // cropper 暫存圖片資料
    const showCropper = ref(false)
    const state = reactive({
      image: '',
    })

    // computed
    const observeValue = computed({
      get () {
        state.image = props.modelValue
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      },
    })

    const preview = computed(() => {
      const { blobURL, url, filename } = observeValue.value || {}
      if (blobURL) return blobURL
      if (url) return url
      return getImageSrc({ filename, size: '200x' })
    })

    const uploadPreview = computed(() => {
      const { blobURL, url, filename } = state.image || {}
      if (blobURL) return blobURL
      if (url) return url
      return getImageSrc({ filename, size: '200x' })
    })

    // use
    const { getImageSrc } = useImgStorage()

    // methods
    const onFile = (fileObj) => {
      const { file, base64 } = fileObj
      tempCropper.value = base64
      tempRaw = file
      if (props.useCropper) {
        showCropper.value = true
      } else {
        setImage(URL.createObjectURL(file), file, base64)
      }
      imageUpload.value.removeQueuedFiles()
    }
    const onCopper = async () => {
      const { canvas } = await cropper.value.getResult()
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, tempRaw.type))
      const base64 = canvas.toDataURL(tempRaw.type)
      const file = new File(
        [blob],
        tempRaw.name,
        { type: tempRaw.type },
      )
      setImage(URL.createObjectURL(blob), file, base64)
      showCropper.value = false
    }
    const onOpen = () => {
      state.image = props.modelValue
      if (props.modelValue !== null) {
        const { alt, title } = props.modelValue
        state.alt = alt
        state.title = title
      }
    }
    const onCancelCopper = () => {
      tempRaw = null
      tempCropper.value = null
      showCropper.value = false
    }
    const setImage = (blobURL, file, base64) => {
      state.image = {
        blobURL: blobURL,
        raw: file,
        base64: base64,
      }
      const { image } = state
      observeValue.value = { ...image }
    }

    return {
      imageUpload,
      cropper,
      showDialog,
      tempRaw,
      tempCropper,
      showCropper,
      state,
      observeValue,
      preview,
      uploadPreview,
      onFile,
      onCopper,
      onOpen,
      onCancelCopper,
    }
  },
})

</script>

<style lang="postcss" scoped>
.input-image {
  @apply w-full;
}
.q-field--standard {
  :deep(.q-field__control) {
    &::before {
      @apply border-b-0;
    }
    .q-field__control-container {
      @apply pt-0;
      .q-field__label {
        @apply top-0;
      }
    }
  }
}

</style>
