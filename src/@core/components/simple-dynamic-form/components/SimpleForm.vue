<template>
  <simple-form-render :models="models" :store="storeForm" />
</template>

<script >
import SimpleFormRender from './SimpleFormRender.vue'
import { defineComponent, watch, toRefs } from 'vue-demi'

export default defineComponent({
  components: {
    SimpleFormRender,
  },
  props: {
    store: { type: Object },
    models: { type: Array, default () { return [] } },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  setup (props) {
    // data
    const { store: storeForm } = toRefs(props)

    // watch
    watch(() => props.models, (models) => { storeForm.value.init({ models: models }) }, { immediate: true })
    watch(() => props.data, (data) => storeForm.value.updateData(data), { immediate: true })
    watch(() => props.disabled, (data) => storeForm.value.setFormDisabled(data))
    watch(() => props.readonly, (data) => storeForm.value.setFormReadonly(data))

    return {
      storeForm,
    }
  },
})
</script>
