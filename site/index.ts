import { createApp } from 'vue'
import Corgi from '../src'
import App from './App.vue'
import MdComponent from './views/component/page/demo-box.vue'
import Demos from './views/component/page/demos.vue'
import DocNav from './views/component/page/docNav.vue'
import './styles/base.less'
import router from './routers'

const app = createApp(App)

app.use(Corgi)
app.use(router)
app.component('docNav', DocNav)
app.component('demos', Demos)
app.component('md-component', MdComponent)
app.mount('#app')