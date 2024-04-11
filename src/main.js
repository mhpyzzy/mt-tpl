import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/index.css'
import I18n from '@/i18n'

import { isDebug } from './config/index'
import VConsole from 'vconsole'
isDebug && (new VConsole())

import { useAdaptLayout } from '@/hooks/adaptLayout.js'
useAdaptLayout()

const app = createApp(App)

app.use(I18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
