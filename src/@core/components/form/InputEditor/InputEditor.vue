<template>
  <div class="input-editor">
    <div :id="id" />
    <base-dialog
      v-model="showDialog"
      title="上傳圖片："
      @confirm="onConfirm"
      @cancel="onCancelCopper"
    >
      <base-form ref="form">
        <div class="row q-col-gutter-y-md">
          <div class="col-12">
            <div class="h-[275px] w-full" :style="cropperWrapStyle">
              <image-cropper
                v-if="useCropper"
                ref="cropper"
                :source="tempCropper"
              />
              <base-image v-else class="w-full" :src="tempCropper" />
            </div>
          </div>
          <div class="col-12">
            <input-text
              v-model="state.title"
              class="full-width"
              label="圖片標題"
              placeholder="請輸入圖片標題"
            />
          </div>
          <div class="col-12">
            <input-text
              v-model="state.alt"
              class="full-width"
              label="圖片描述文字"
              placeholder="請輸入圖片描述文字"
              hint="做為圖片替代文字，用來描述圖片內容，當圖片失效時才會顯示"
            />
          </div>
        </div>
      </base-form>
    </base-dialog>
  </div>
</template>

<script>
import ImageCropper from '@core/components/ImageCropper.vue'
import { defineComponent, reactive, ref, computed, onMounted } from 'vue-demi'
import { useElementBounding, watchOnce } from '@vueuse/core'
import { Quill } from './quillModule'
import isEmpty from 'lodash-es/isEmpty'
import { i18n } from '@/plugins/i18n'
import useNotify from '@/hooks/useNotify'
import useBatchUpload from '@/hooks/useBatchUpload'

export default defineComponent({
  components: {
    ImageCropper,
  },
  props: {
    id: { type: String, default: 'container' },
    modelValue: { type: [Object, File, String, Number] },
    nativeType: { type: String, default: 'text' },
    placeholder: { type: String },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    useCropper: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    let tempRaw = null
    let resolveUpload, rejectUpload
    let editor = null
    const tempCropper = ref()
    const cropper = ref(null)
    const cropperBounding = useElementBounding(cropper, {
      immediate: true,
    })
    const state = reactive({
      alt: '',
      title: '',
    })
    const showDialog = ref(false)

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

    // mounted
    onMounted(async () => {
      initialize()
    })

    // methods
    const initialize = () => {
      editor = new Quill(`#${props.id}`, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              [
                { header: 1 },
                { header: 2 },
              ],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline'],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
              ['link', 'image', 'video', 'clean'],
              [
                { table: 'TD' },
                { 'table-insert-row': 'TIR' },
                { 'table-insert-column': 'TIC' },
                { 'table-delete-row': 'TDR' },
                { 'table-delete-column': 'TDC' },
              ],
            ],
            handlers: {
              table: function () {
                const table = editor.getModule('table')
                table.insertTable(3, 3)
              },
            },
          },
          table: {},
          tableUI: {},
          imageResize: {},
          myImageUploader: {
            upload,
          },
        },
        placeholder: '',
      })
      editor.on('text-change', function (delta, old, source) {
        const snowContent = editor.getContents()
        if (source === 'user') {
          emit('update:modelValue', snowContent)
        }
      })
    }
    const setContents = () => {
      editor.setContents(props.modelValue, 'user')
    }
    const upload = (file) => {
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
    }
    const onConfirm = async () => {
      let blob
      if (props.useCropper) {
        const { canvas } = await cropper.value.getResult()
        blob = await new Promise((resolve) => canvas.toBlob(resolve, tempRaw.type))
      } else {
        blob = URL.createObjectURL(tempRaw)
      }
      const file = props.useCropper ? new File([blob], tempRaw.name, { type: tempRaw.type }) : tempRaw
      const [uploadRes, uploadErrors] = await batchUpload({ imageObj: { raw: file } })
      if (uploadErrors.value) {
        const message = uploadErrors.value.response.data.message
        notifyAPIError({ message })
        return
      }
      const url = uploadRes.imageObj.url
      resolveUpload({ url, ...state })
      showDialog.value = false
    }
    const onCancelCopper = () => {
      rejectUpload(new Error('取消上傳'))
      showDialog.value = false
    }

    // use
    const { notify, notifyAPIError } = useNotify()
    const { batchUpload } = useBatchUpload()

    // watch
    watchOnce(() => props.modelValue, (newV, oldV) => {
      if (!editor) {
        return
      }
      if (!oldV || isEmpty(oldV)) {
        setContents()
      }
    })

    return {
      cropper,
      tempCropper,
      state,
      showDialog,
      cropperWrapStyle,
      onFile,
      onConfirm,
      onCancelCopper,
      upload,
    }
  },
})

</script>

<style lang="scss">
.input-editor {
  @apply h-[450px] w-full;
  .ql-toolbar,
  .ql-container {
    @apply bg-white;
  }
  .ql-toolbar {
    @apply rounded-t border-b-0;
  }
  .ql-container {
    @apply rounded-b;
    @apply font-sans;

    height: calc(100% - 50px);
  }
  .ql-snow .ql-tooltip {
    @apply z-[1000];
  }
}
</style>
