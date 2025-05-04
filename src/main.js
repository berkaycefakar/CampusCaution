import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import { createI18n } from 'vue-i18n'
import tr from './locales/tr.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'tr',
  fallbackLocale: 'tr',
  messages: { tr, en }
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')
