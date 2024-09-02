import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import GlobalCoreComponents from '@core/components'
import GlobalComponents from './components'
import 'virtual:svg-icons-register'

// plugins
import { registerPlugins } from '@core/utils/plugins'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// directive
import { registerDirective } from '@core/utils/directive'

import '@/styles/index.scss'

useRegisterSW()
const app = createApp(App)
registerPlugins(app)
registerDirective(app)
app.use(createPinia())
app.use(router)
app.use(GlobalCoreComponents)
app.use(GlobalComponents)
app.mount('#app')
