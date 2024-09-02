import { Notify } from 'quasar'

export default function useNotify () {
  const notify = ({ message, type = 'info', timeout = 3000, position = 'top' }) => Notify.create({
    message,
    type,
    timeout,
    position,
  })

  const notifyAPIError = ({ message }) => Notify.create({
    message,
    type: 'negative',
    position: 'top',
  })

  const notifyError = ({ message }) => Notify.create({
    message,
    type: 'negative',
    position: 'top',
  })

  const customNotify = ({ message, timeout = 3000, position = 'top', color = 'brown', textColor = 'white', icon = 'announcement' }) => Notify.create({
    message,
    timeout,
    position,
    color,
    textColor,
    icon,
  })

  return {
    notify,
    notifyAPIError,
    notifyError,
    customNotify,
  }
}
