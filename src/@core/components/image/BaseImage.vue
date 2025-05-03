<template>
  <span>
    <q-img
      v-show="!useSkeleton || (!isReading && useSkeleton)"
      loading="lazy"
      spinner-color="white"
      :src="observeSrc"
      :ratio="ratio"
      :alt="alt"
      :fit="fit"
      :height="height"
      :width="width"
      :position="position"
      :class="preview && 'cursor-pointer'"
      @click="onPreview"
    >
      <template #error>
        <div class="bg-dark flex flex-center text-white absolute-full">
          載入失敗
        </div>
      </template>
    </q-img>
    <skeleton-square v-if="isReading && useSkeleton" />
    <lightbox-dialog ref="dialog" :options="[{src:observeSrc,key:observeSrc,intro:alt}]" />
  </span>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import { getToken } from '@core/utils/auth'
import { fetchBlobData, fetchBlobDataAsDataUrl } from '@/utils/blob'
import { asyncComputed } from '@vueuse/core'
export default defineComponent({
  props: {
    src: { type: String },
    ratio: { type: Number, default: 1 },
    alt: { type: String },
    fit: { type: String, default: 'cover' },
    height: { type: String, default: '100%' },
    width: { type: String, default: '100%' },
    position: { type: String },
    preview: { type: Boolean, default: false },
    useAuthorization: { type: Boolean, default: false },
    headers: { type: Object },
    fileReaderMethod: { type: String, default: 'text' },
    useSkeleton: { type: Boolean, default: false },
  },
  setup (props) {
    // data
    const dialog = ref()
    const isReading = ref(false)

    // computed
    const observeSrc = asyncComputed(
      async () => {
        if (props.useAuthorization) {
          isReading.value = true
          const src = props.src
          const options = {
            headers: props.headers || { Authorization: `Bearer ${getToken()}` },
          }
          const fetchObj = {
            text: () => { return fetchBlobData(src, options) },
            dataUrl: () => { return fetchBlobDataAsDataUrl(src, options) },
          }
          const data = await fetchObj[props.fileReaderMethod]()
          isReading.value = false
          return data
        } else {
          return props.src
        }
      },
      null,
    )

    const onPreview = () => {
      if (props.preview) {
        dialog.value.showDialog({ })
      }
    }
    return {
      dialog,
      isReading,
      observeSrc,
      onPreview,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
@core/utils/auth
