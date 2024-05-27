import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@fontsource-variable/rubik';
import '@/styles/index.css'
import I18n from '@/i18n'
import mWeb3Plugin from '@/plugins/mWeb3.js';
import VueClipboard from "vue-clipboard2";

import VConsole from 'vconsole'
import { isDebug } from './config/index'
isDebug && (new VConsole())

import { useAdaptLayout } from '@/hooks/adaptLayout.js'
useAdaptLayout()

const app = createApp(App)

app.use(createPinia())
app.use(I18n)
app.use(router)
app.use(VueClipboard);
app.use(mWeb3Plugin);

app.mount('#app')
