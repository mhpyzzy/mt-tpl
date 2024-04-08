import { createI18n } from 'vue-i18n'
import en from './en.js'
import zh from './zh.js'

const i18n = createI18n({
    locale: 'cn', // 设置当前语言类型
    legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
    globalInjection: true, // 全局注册$t方法
    messages: {
        'en': en,
        'cn': zh,
    }
})
export default i18n