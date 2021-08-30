import { SFCWithInstall } from '@utils/type'
import Validcode from './src/Validcode.vue'

Validcode.install = (app) => {
  app.component(Validcode.name, Validcode);
}

const _Validcode = Validcode as SFCWithInstall<typeof Validcode>

export default _Validcode