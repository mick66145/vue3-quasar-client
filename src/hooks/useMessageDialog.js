import { useMessageDialogStore } from '@/stores/messageDialog'
import { i18n } from '@/plugins/i18n'

export default function useMessageDialog () {
  const store = useMessageDialogStore()

  const messageAlert = ({ title, message, confirmButtonText, confirmButtonColor }) => store.alert({
    title: title || i18n.global.t('g.dialog.default-title'),
    message,
    persistent: false,
    showCancel: false,
    confirmButtonText: confirmButtonText || i18n.global.t('g.btn.confirm'),
    confirmButtonColor: confirmButtonColor || 'primary',
  })

  const messageConfirm = ({ title, message, confirmButtonText, confirmButtonColor, cancelButtonText, cancelButtonColor }) => store.alert({
    title: title || i18n.global.t('g.dialog.default-title'),
    message,
    persistent: true,
    confirmButtonText: confirmButtonText || i18n.global.t('g.btn.confirm'),
    confirmButtonColor: confirmButtonColor || 'primary',
    showCancel: true,
    cancelButtonText: cancelButtonText || i18n.global.t('g.btn.cancel'),
    cancelButtonColor: cancelButtonColor || 'primary',
  })

  const messageDelete = ({ title, message, confirmButtonText, cancelButtonText, cancelButtonColor }) => store.alert({
    title: title || i18n.global.t('g.dialog.delete-title'),
    status: 'error',
    message,
    persistent: true,
    confirmButtonText: confirmButtonText || i18n.global.t('g.btn.delete'),
    confirmButtonColor: 'negative',
    showCancel: true,
    cancelButtonText: cancelButtonText || i18n.global.t('g.btn.cancel'),
    cancelButtonColor: cancelButtonColor || 'primary',
  })

  return {
    messageAlert,
    messageConfirm,
    messageDelete,
  }
}
