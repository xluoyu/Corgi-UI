import type { SFCWithInstall } from '@utils/type'
import Button from './src/Button.vue'
import { App } from 'vue'

Button.install = (app: App) => {
  app.component(Button.name, Button)
}

export const CgButton = Button as SFCWithInstall<typeof Button>
