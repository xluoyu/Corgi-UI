import { createApp } from 'vue'
import Corgi from '../src/index'
import App from './App.vue'
import MdComponent from './components/md-component.vue'
import './styles/base.css'
import router from './routers'

const app = createApp(App)

app.use(Corgi)
app.use(router)
app.component('md-component', MdComponent)
app.mount('#app')