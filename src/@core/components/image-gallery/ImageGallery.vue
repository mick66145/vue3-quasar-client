<template>
  <div class="row q-col-gutter-md">
    <DndProvider :backend="HTML5Backend">
      <div
        v-for="(fileItem, fileIndex) in observeValue"
        :key="fileIndex"
        class="col-md-3 col-sm-4 col-xs-12"
      >
        <image-item
          v-if="preview(fileItem)"
          :img-src="preview(fileItem)"
          :index="fileIndex"
          :show-edit="showEdit"
          :show-delete="showDelete"
          @preview="onPreview"
          @edit="onEdit"
          @delete="onDelete"
          @move="onMove"
        />
      </div>
    </DndProvider>

    <div class="col-md-3 col-sm-4 col-xs-12">
      <image-multiple-uploader
        ref="imageUpload"
        class="full-width"
        :disable="disable"
        @on-file="onFile"
      />
    </div>

    <image-edit-dialog ref="editDialog" />
    <lightbox-dialog ref="previewDialog" :options="lightboxList" />
  </div>
</template>

<script>
import ImageItem from './components/ImageItem.vue'
import ImageEditDialog from './components/ImageEditDialog.vue'
import { defineComponent, computed, ref } from 'vue-demi'
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useImgStorage from '@/hooks/useImgStorage'

export default defineComponent({
  components: {
    ImageItem,
    ImageEditDialog,
    DndProvider,
  },
  props: {
    modelValue: { type: Array, default () { return [] } },
    accept: { type: String, default: 'image/png, image/jpeg, image/jpg' },
    aspect: { type: Number },
    disable: { type: Boolean, default: false },
    showEdit: { type: Boolean, default: true },
    showDelete: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const previewDialog = ref()
    const editDialog = ref()
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
      const { blobURL, url, base64, filename } = data.image || {}
      if (blobURL) return blobURL
      if (url) return url
      if (base64) return base64
      return getImageSrc({ filename, size: '200x' })
    })
    const lightboxList = computed(() => {
      const lightboxList = observeValue.value.map(item => {
        const src = preview.value(item)
        return { src: src, key: src, alt: item.alt }
      })
      return lightboxList
    })

    // methods
    const onFile = async (files) => {
      files.forEach(fileItem => {
        const { file, base64 } = fileItem
        const state = {
          alt: '',
          title: '',
          sequence: 0,
          image: {
            blobURL: URL.createObjectURL(file),
            raw: file,
            base64: base64,
            filename: '',
          },
        }
        observeValue.value.push(state)
      })
    }
    const onPreview = (index) => {
      previewDialog.value.showDialog({ slide: index })
    }
    const onEdit = (index) => {
      editDialog.value.showDialog({ data: observeValue.value[index] })
    }
    const onDelete = async (index) => {
      observeValue.value.splice(index, 1)
    }
    const onMove = ({ dragIndex, hoverIndex }) => {
      const item = observeValue.value[dragIndex]
      observeValue.value.splice(dragIndex, 1)
      observeValue.value.splice(hoverIndex, 0, item)
    }

    // use
    const { getImageSrc } = useImgStorage()

    return {
      previewDialog,
      editDialog,
      imageUpload,
      observeValue,
      preview,
      lightboxList,
      onFile,
      onPreview,
      onEdit,
      onDelete,
      onMove,
      HTML5Backend,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
