import { SFCWithInstall } from '@utils/type'
import Layout from './src/Layout.vue'

Layout.install = app => {
  app.component(Layout.name, Layout)
}

const _Layout = Layout as SFCWithInstall<typeof Layout>

export default _Layout
