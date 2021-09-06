import { SFCWithInstall } from '@utils/type'
import Menu from './src/Menu.vue'

Menu.install = app => {
  app.component(Menu.name, Menu)
}

export const CgMenu = Menu as SFCWithInstall<typeof Menu>

