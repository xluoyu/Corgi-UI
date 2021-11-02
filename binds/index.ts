import { createApp } from 'vue'
import Corgi from '@corgi/index'
import App from './app.vue'

const app = createApp(App)
console.log(app)
app.use(Corgi)
app.mount('#app')


export default app
