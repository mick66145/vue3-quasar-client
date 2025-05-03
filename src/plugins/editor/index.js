import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce.js'
import 'tinymce/models/dom'

// 外觀
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/themes/silver'
import './index.css'

// Icon
import 'tinymce/icons/default'

// 用到的外掛
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/emoticons/js/emojis.js'
import 'tinymce/plugins/table'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/image'

// 語言包
import 'tinymce-i18n/langs5/zh_TW.js'
// import 'tinymce-i18n/langs/zh_Hans.js' (TinyMCE 6 的簡體中文)

export default function (app) {
  app.component('tinymceEditor', Editor)
}
