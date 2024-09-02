import { useQuasar } from 'quasar'

export default function useLoading () {
  const $q = useQuasar()

  const showLoading = ({ message = '', spinnerColor = 'white', backgroundColor = 'black', messageColor = 'white' }) => $q.loading.show({
    message,
    spinnerColor,
    backgroundColor,
    messageColor,
  })

  const hideLoading = () => $q.loading.hide()

  return {
    showLoading,
    hideLoading,
  }
}
