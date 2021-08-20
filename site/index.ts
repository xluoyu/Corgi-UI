import { createApp } from 'vue'
import Corgi from '../src/index'
import App from './App.vue'
import MdComponent from './views/component/page/demo-box.vue'
import Demos from './views/component/page/demos.vue'
import './styles/base.less'
import router from './routers'

const app = createApp(App)

app.use(Corgi)
app.use(router)
app.component('md-component', MdComponent)
app.component('demos', Demos)
app.mount('#app')