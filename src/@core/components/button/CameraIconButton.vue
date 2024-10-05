<template>
  <upload-icon-button
    icon="photo_camera"
    :label="buttonLabel"
    :capture="capture"
    @on-file="onFile"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
    capture: { type: String, default: 'environment' }, // user、environment
  },
  emits: ['on-file'],
  setup (props, { emit }) {
    // data
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : i18n.global.t('g.btn.upload')
    })

    const onFile = (fileObj) => {
      emit('on-file', fileObj)
    }

    return {
      buttonLabel,
      onFile,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>
