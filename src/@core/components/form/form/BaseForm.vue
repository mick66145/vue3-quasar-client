<template>
  <q-form
    ref="form"
    :class="formClass"
    @submit="onSubmit"
    @reset="onReset"
    @validation-success="onValidationSuccess"
  >
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </q-form>
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { i18n } from '@/plugins/i18n'
import useNotify from '@/hooks/useNotify'

export default defineComponent({
  props: {
    labelPosition: { type: String, default: 'top' },
    labelWidth: { type: String, default: '6rem' },
  },
  emits: ['submit', 'reset', 'validation-success'],
  setup (props, { emit }) {
    // data
    const form = ref()
    const { labelPosition } = toRefs(props)

    // computed
    const formClass = computed(() => {
      const ret = {}
      ret[`q-form--label-${labelPosition.value}`] = true
      return ret
    })

    // methods
    const validate = () => {
      return form.value.validate().then(async (success) => {
        if (!success) { notifyError({ message: i18n.global.t('g.validation.default-error-message') }) }
        return form.value.validate()
      })
    }
    const resetValidation = () => {
      form.value.resetValidation()
    }
    const submit = (evt = null) => {
      form.value.submit(evt)
    }
    const reset = (evt = null) => {
      form.value.reset(evt)
    }
    const getValidationComponents = () => {
      return form.value.getValidationComponents()
    }
    const onSubmit = (evt) => {
      emit('submit', evt)
    }
    const onReset = () => {
      emit('reset')
    }
    const onValidationSuccess = () => {
      emit('validation-success')
    }

    // use
    const { notifyError } = useNotify()
    return {
      form,
      formClass,
      validate,
      resetValidation,
      submit,
      reset,
      getValidationComponents,
      onSubmit,
      onReset,
      onValidationSuccess,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-form--label-top {
  &:deep(.q-form-item) {
    @apply block;
  }
}
.q-form--label-left {
  &:deep(.q-form-item__label) {
    @apply text-left;
  }
}
.q-form--label-right {
  &:deep(.q-form-item__label) {
    @apply text-right;
  }
}
</style>
