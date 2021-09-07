import { SFCWithInstall } from '@corgi/utils/type'
import Space from './src/Space.vue'

Space.install = app => {
  app.component(Space.name, Space)
}

export const CgSpace = Space as SFCWithInstall<typeof Space>

