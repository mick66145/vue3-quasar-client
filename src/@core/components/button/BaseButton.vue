<template>
  <q-btn
    no-caps
    class="shadow-1"
    :unelevated="unelevated"
    :outline="outline"
    :rounded="rounded"
    :color="color"
    :label="label"
    :icon="icon"
    :loading="isLoading"
    :size="size"
    :disable="observeDisable"
  >
    <slot name="default" />
    <template #loading>
      <q-spinner-hourglass size="0.75em" />
    </template>
  </q-btn>
</template>

<script>
import { defineComponent, computed } from 'vue-demi'
import { useApp } from '@/stores/app'

export default defineComponent({
  props: {
    label: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    icon: { type: String },
    unelevated: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    useLoading: { type: Boolean, default: true },
    disable: { type: Boolean, default: false },
  },
  setup (props) {
    // data
    const storeApp = useApp()

    const isLoading = computed(() => {
      return props.useLoading && (storeApp.isCreate || storeApp.isUpdate || storeApp.isDelete || storeApp.isSubmit)
    })

    const observeDisable = computed(() => {
      return props.disable || (storeApp.isCreate || storeApp.isUpdate || storeApp.isDelete || storeApp.isSubmit)
    })

    return {
      isLoading,
      observeDisable,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>
