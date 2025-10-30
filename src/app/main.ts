import '../styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '../App.vue'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)
app.mixin({
  mounted() {
    AOS.init({
      duration: 1000,
      once: true, // hanya sekali animasi saat pertama kali muncul
      offset: 80,
    })
  },
})

app.use(createPinia())
app.use(router)

app.mount('#app')
