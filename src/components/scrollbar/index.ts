import { SFCWithInstall } from '@corgi/utils/type'
import ScrollBar from './src/Scrollbar.vue'

ScrollBar.install = app => {
  app.component(ScrollBar.name, ScrollBar)
}

export const CgScrollbar = ScrollBar as SFCWithInstall<typeof ScrollBar>

