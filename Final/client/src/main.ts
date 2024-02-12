//InShaAllah

import './assets/main.css'

import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next'
import Toastify from 'toastify-js';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Oruga)
app.use(Toastify)
app.use(router)

app.mount('#app')