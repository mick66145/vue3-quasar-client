import vue3PhotoPreview from 'vue3-photo-preview'
import 'vue3-photo-preview/dist/index.css'
import '@/styles/vender/vue3-photo-preview.scss'

export default function (app) {
  app.use(vue3PhotoPreview)
}
