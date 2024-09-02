
export default function useNewebpay (options = {
  MerchantID: '',
  Version: '',
  TradeInfo: '',
  TradeSha: '',
}) {
  // 藍新金流
  const sendToNewebPay = () => {
    const form = document.createElement('form')
    form.method = 'post'
    form.action = `${options.action}`
    for (const [key, value] of Object.entries(options)) {
      const hiddenField = document.createElement('input')
      hiddenField.type = 'hidden'
      hiddenField.name = key
      hiddenField.value = value
      form.appendChild(hiddenField)
    }
    document.body.appendChild(form)
    form.submit()
  }
  return { sendToNewebPay }
}
