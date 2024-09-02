<template>
  <input-file-upload
    v-model="observeValue"
    :outlined="outlined"
    :disable="disable"
    :max-file-size="maxFileSize"
    :accept="accept"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: { type: [Object, File, String] },
    maxFileSize: { type: Number, default: 1048576000 },
    disable: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    accept: { type: String, default: 'video/webm,video/mp4,video/ogg,video/x-msvideo,video/x-matroska,video/quicktime,video/x-ms-wmv' },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
