import type { SFCWithInstall } from '@corgi/utils/type'
import Button from './src/Button.vue'
import { App } from 'vue'
Button.install = (app: App) => {
  app.component(Button.name, Button)
}

export const CgButton = Button as any as SFCWithInstall<typeof Button>

export default CgButton
