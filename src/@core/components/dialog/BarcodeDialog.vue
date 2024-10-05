<template>
  <base-dialog v-model="isShowDialog" :title="`${$t('barcode.detail.title')}`" @confirm="onConfirm" @hide="onHide">
    <base-form ref="form" label-position="left">
      <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
        <div class="col-12">
          <stream-barcode-reader @decode="onDecode" />
          <base-form-item :label="`${$t('g.common.barcode')} *`">
            <input-text
              v-model="data.state.barcode"
              class="full-width"
              :label="`${$t('g.common.barcode')}`"
              :placeholder="$t('g.common.input', { field: $t('g.common.barcode') })"
              required
            />
          </base-form-item>
        </div>
      </div>
    </base-form>
  </base-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import useDialog from '@/hooks/useDialog'

export default defineComponent({
  emits: ['confirm'],
  setup (props, { emit }) {
    // methods
    const onDecode = (result) => {
      data.state.barcode = result
    }
    const onConfirm = async () => {
      form.value.validate().then((success) => {
        if (success) {
          emit('confirm', { data: { ...data.state } })
          hideDialog()
        }
      })
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, data, isShowDialog, showDialog, hideDialog } = useDialog({
      formData: { barcode: null },
    })

    return {
      form,
      data,
      isShowDialog,
      showDialog,
      onConfirm,
      onHide,
      onDecode,
    }
  },
})
</script>

<style lang="postscss" scoped>
</style>
