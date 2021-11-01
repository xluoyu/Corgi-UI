import { createApp } from 'vue'
import Corgi from '@corgi/index'
import App from './main.vue'

const app = createApp(App)

app.use(Corgi)
app.mount('#app')
