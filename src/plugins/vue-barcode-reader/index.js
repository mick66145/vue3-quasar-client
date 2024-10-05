import { StreamBarcodeReader, ImageBarcodeReader } from 'vue-barcode-reader'

export default function (app) {
  app.component('StreamBarcodeReader', StreamBarcodeReader)
  app.component('ImageBarcodeReader', ImageBarcodeReader)
}
