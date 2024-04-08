import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/index.css'
import I18n from '@/i18n'

import VConsole from 'vconsole'
import { isDebug } from './config/index'
isDebug && (new VConsole())

const app = createApp(App)

app.use(I18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
