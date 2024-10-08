import { QuillEditor } from '@vueup/vue-quill'
import 'quill/dist/quill.snow.css'
import 'quill-table-ui/dist/index.css'

export default function (app) {
  app.component('VueEditor', QuillEditor)
}
