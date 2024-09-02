<template>
  <div class="flex-center max-w-480px row fixed-footer">
    <div class="w-full q-pa-md">
      <confirm-button
        v-if="showSave"
        class="w-full q-mr-md q-mb-xs"
        :color="confirmButtonColor"
        :label="confirmButtonLabel"
        @click="onSave"
      />
      <slot name="button" />
      <cancel-button
        v-if="showCancel"
        class="w-full q-mr-md q-mb-xs"
        :color="cancelButtonColor"
        :label="cancelButtonLabel"
        @click="onCancel"
      />
    </div>
    <div class="q-layout__shadow absolute-full overflow-hidden no-pointer-events" />
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
import useGoBack from '@/hooks/useGoBack'

export default defineComponent({
  props: {
    cancelButtonColor: { type: String, default: 'primary' },
    cancelButtonText: { type: String },
    confirmButtonColor: { type: String, default: 'primary' },
    confirmButtonText: { type: String },
    goBackRoute: { type: String, default: '' },
    autoBack: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: true },
    showSave: { type: Boolean, default: true },
  },
  emits: ['cancel', 'save'],
  setup (props, { emit }) {
    // data
    const { cancelButtonText, confirmButtonText } = toRefs(props)

    // computed
    const cancelButtonLabel = computed(() => {
      return cancelButtonText.value ? cancelButtonText.value : i18n.global.t('g.btn.go-back')
    })
    const confirmButtonLabel = computed(() => {
      return confirmButtonText.value ? confirmButtonText.value : i18n.global.t('g.btn.save')
    })

    // methods
    const { goBack } = useGoBack({ autoBack: props.autoBack, fallBack: props.goBackRoute })
    const onCancel = () => {
      emit('cancel')
      goBack()
    }
    const onSave = () => {
      emit('save')
    }

    return {
      cancelButtonLabel,
      confirmButtonLabel,
      onCancel,
      onSave,
    }
  },
})
</script>

<style lang="postcss" scoped>
.fixed-footer {
  @apply bg-white w-full ;
  @apply right-0 bottom-0 z-[200] fixed;
  @apply p-2;

  box-shadow: 0 0 10px 2px rgb(0 0 0 / 4%), 0 0 10px rgb(0 0 0 / 4%);
  .q-layout__shadow {
    @apply -top-[10px];
    &::after {
      @apply top-[10px];
    }
  }
}
</style>
