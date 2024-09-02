<template>
  <q-btn
    :outline="outline"
    :round="round"
    :flat="flat"
    :color="color"
    :icon="icon"
    :loading="isLoading"
    :size="size"
  >
    <slot name="default" />
    <q-tooltip v-if="label">{{ label }}</q-tooltip>
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
    label: { type: String },
    color: { type: String, default: 'primary' },
    icon: { type: String },
    outline: { type: Boolean, default: false },
    round: { type: Boolean, default: true },
    flat: { type: Boolean, default: true },
    size: { type: String, default: 'md' },
    useLoading: { type: Boolean, default: false },
  },
  setup (props) {
    // data
    const storeApp = useApp()

    const isLoading = computed(() => {
      return props.useLoading && (storeApp.isCreate || storeApp.isUpdate || storeApp.isDelete)
    })

    return {
      isLoading,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>
