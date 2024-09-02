<template>
  <q-dialog v-model="observeValue" :persistent="persistent" @show="onShow" @hide="onHide">
    <q-card :class="sizeClass">
      <q-card-section class="bg-primary text-white row items-center dialog-header">
        <slot name="title">
          <div class="text-h6">{{ title }}</div>
        </slot>
        <q-space />
        <q-btn
          v-close-popup
          icon="far fa-times-circle"
          flat
          round
          dense
          @click="onCancel"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll q-dialog-body">
        <slot />
      </q-card-section>

      <q-separator />

      <q-card-actions class="q-dialog-footer" align="right">
        <slot name="footer" class="text-primary">
          <cancel-button
            v-if="showCancel"
            v-close-popup
            class="q-mr-xs"
            :color="cancelButtonColor"
            :label="cancelButtonLabel"
            padding="sm 2.5em"
            @click="onCancel"
          />
          <confirm-button
            v-if="showConfirm"
            :color="confirmButtonColor"
            :label="confirmButtonLabel"
            padding="sm 2.5em"
            @click="onConfirm"
          />
        </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
export default defineComponent({
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '標題' },
    cancelButtonText: { type: String },
    cancelButtonColor: { type: String, default: 'primary' },
    confirmButtonText: { type: String },
    confirmButtonColor: { type: String, default: 'primary' },
    persistent: { type: Boolean, default: false },
    size: { type: String },
    showCancel: { type: Boolean, default: true },
    showConfirm: { type: Boolean, default: true },
  },
  emits: ['update:modelValue', 'confirm', 'cancel', 'show', 'hide'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const { cancelButtonText, confirmButtonText } = toRefs(props)

    // computed
    const sizeClass = computed(() => {
      switch (props.size) {
      case 'sm':
        return 'w-[25rem]'
      case 'md':
        return 'w-[30rem]'
      case 'lg':
        return 'w-[50rem] !max-w-[50rem]'
      default:
        return 'w-full'
      }
    })
    const cancelButtonLabel = computed(() => {
      return cancelButtonText.value ? cancelButtonText.value : i18n.global.t('g.btn.cancel')
    })
    const confirmButtonLabel = computed(() => {
      return confirmButtonText.value ? confirmButtonText.value : i18n.global.t('g.btn.save')
    })

    // methods
    const onConfirm = () => {
      emit('confirm')
    }

    const onCancel = () => {
      emit('cancel')
    }

    const onShow = () => {
      emit('show')
    }

    const onHide = () => {
      emit('hide')
    }

    return {
      observeValue,
      sizeClass,
      cancelButtonLabel,
      confirmButtonLabel,
      onConfirm,
      onCancel,
      onShow,
      onHide,
    }
  },
})

</script>

<style lang="postcss" scoped>
.q-card {
  .q-dialog-body {
    @apply max-h-[40em];
  }
}
</style>
