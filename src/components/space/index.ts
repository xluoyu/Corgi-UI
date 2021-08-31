import { SFCWithInstall } from '@utils/type'
import Space from './src/Space.vue'

Space.install = app => {
  app.component(Space.name, Space)
}

const _Space = Space as SFCWithInstall<typeof Space>

export default _Space
