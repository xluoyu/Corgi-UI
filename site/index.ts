import { createApp } from 'vue'
import Corgi from '@corgi/index'
import App from './App.vue'
// import example from './blank-test/example1.vue'
import MdComponent from './views/component/page/demo-box.vue'
import Demos from './views/component/page/demos.vue'
import DocNav from './views/component/page/docNav.vue'
import CodeBox from './views/component/page/code-box.vue'
import './styles/base.less'

import router from './routers'

const app = createApp(App)

app.use(Corgi)
app.use(router)
app.component('DocNav', DocNav)
app.component('CodeBox', CodeBox)
app.component('Demos', Demos)
app.component('MdComponent', MdComponent)
app.mount('#app')
