import { SFCWithInstall } from '@utils/type'
import Button from './src/Button.vue'

Button.install = (app) => {
  app.component(Button.name, Button);
}

const _Button = Button as SFCWithInstall<typeof Button>

export default _Button