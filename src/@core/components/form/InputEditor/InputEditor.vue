
<template>
  <div class="input-editor">
    <tinymce-editor v-model="observeValue" :init="init()" />
    <base-dialog
      v-model="showDialog"
      title="上傳圖片："
      @confirm="onConfirm"
      @cancel="onCancelCopper"
    >
      <base-form ref="form">
        <div class="row q-col-gutter-y-md">
          <div class="col-24">
            <div class="h-[275px] w-full" :style="cropperWrapStyle">
              <image-cropper
                v-if="useCropper"
                ref="cropper"
                :source="tempCropper"
              />
              <base-image v-else class="w-full" :src="tempCropper" />
            </div>
          </div>
        </div>
      </base-form>
    </base-dialog>
  </div>
</template>

<script>
import ImageCropper from '@core/components/ImageCropper.vue'
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { useElementBounding, useVModel } from '@vueuse/core'
import { i18n } from '@/plugins/i18n'
import useNotify from '@/hooks/useNotify'
import useBatchUpload from '@/hooks/useBatchUpload'
export default defineComponent({
  components: {
    ImageCropper,
  },
  props: {
    modelValue: { type: String, default: '' },
    plugins: { type: [String, Array], default: 'quickbars emoticons table image' },
    toolbar: { type: [String, Array], default: ' bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | axupimgs | removeformat | table | emoticons | image' },
    height: { type: Number, default: 500 },
    width: { type: String, default: '100%' },
    useCropper: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    // data
    let tempRaw = null
    let resolveUpload, rejectUpload
    const { useCropper } = toRefs(props)
    const tempCropper = ref()
    const cropper = ref(null)
    const cropperBounding = useElementBounding(cropper, {
      immediate: true,
    })
    const showDialog = ref(false)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const cropperWrapStyle = computed(() => {
      if (!cropper.value) {
        return {
          height: '275px',
        }
      }
      const { height } = cropperBounding
      return {
        height: height.value + 'px',
      }
    })

    // methods
    const filePicker = (callback) => {
    }
    const upload = (fileInfo) => {
      const file = new File([fileInfo.blob()], fileInfo.name(), {
        type: fileInfo.blob().type,
        lastModified: fileInfo.blob().lastModified,
      })
      console.log('🚀 ~ upload ~ file', file)
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        notify({ message: i18n.global.t('g.validation.image-format'), type: 'negative' })
        return Promise.reject(new Error('格式錯誤'))
      }
      if (file.size / 1024 / 1024 > 2) {
        notify({ message: '圖片大小超過 2 MB', type: 'negative' })
        return Promise.reject(new Error('尺寸錯誤'))
      }
      return new Promise((resolve, reject) => {
        resolveUpload = resolve
        rejectUpload = reject
        onFile(file)
      })
    }
    const onFile = (file) => {
      tempRaw = file

      if (useCropper.value) {
        const reader = new FileReader()

        reader.onload = (event) => {
          tempCropper.value = event.target.result
          showDialog.value = true
        }
        reader.onerror = () => {
          notify({ message: '圖片讀取失敗', type: 'negative' })
          rejectUpload(new Error('圖片讀取失敗'))
        }
        reader.readAsDataURL(file)
      } else {
        onConfirm()
      }
    }
    const onConfirm = async () => {
      let blob
      if (useCropper.value) {
        const { canvas } = await cropper.value.getResult()
        blob = await new Promise((resolve) => canvas.toBlob(resolve, tempRaw.type))
      } else {
        blob = URL.createObjectURL(tempRaw)
      }
      const file = useCropper.value ? new File([blob], tempRaw.name, { type: tempRaw.type }) : tempRaw
      const [uploadRes, uploadErrors] = await batchUpload({ imageObj: { raw: file } })
      if (uploadErrors.value) {
        const message = uploadErrors.value.response.data.message
        notifyAPIError({ message })
        return
      }
      const url = uploadRes.imageObj.url
      resolveUpload(url)
      showDialog.value = false
    }
    const onCancelCopper = () => {
      rejectUpload(new Error('取消上傳'))
      showDialog.value = false
    }

    const init = () => ({
      selector: 'textarea',
      language: 'zh_TW',
      height: props.height,
      width: props.width,
      menubar: 'edit insert format table tools',
      content_css: false,
      skin: false,
      promotion: false,
      plugins: props.plugins,
      toolbar: props.toolbar,
      quickbars_insert_toolbar: false,
      branding: false,
      image_description: false,
      // file_picker_callback: filePicker,
      images_upload_handler: upload,
    })

    // use
    const { notify, notifyAPIError } = useNotify()
    const { batchUpload } = useBatchUpload()

    return {
      cropper,
      tempCropper,
      showDialog,
      cropperWrapStyle,
      observeValue,
      init,
      onFile,
      onConfirm,
      onCancelCopper,
    }
  },
})
</script>
