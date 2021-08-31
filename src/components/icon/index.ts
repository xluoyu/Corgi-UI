import { SFCWithInstall } from '@utils/type'
import Icon from './src/Icon.vue'

Icon.install = app => {
  app.component(Icon.name, Icon)
}

const _Icon = Icon as SFCWithInstall<typeof Icon>

export default _Icon
