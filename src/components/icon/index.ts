import { SFCWithInstall } from '@corgi/utils/type'
import Icon from './src/Icon.vue'

Icon.install = app => {
  app.component(Icon.name, Icon)
}

export const CgIcon = Icon as SFCWithInstall<typeof Icon>

