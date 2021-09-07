import { SFCWithInstall } from '@corgi/utils/type'
import Layout from './src/Layout.vue'

Layout.install = app => {
  app.component(Layout.name, Layout)
}

export const CgLayout = Layout as SFCWithInstall<typeof Layout>

