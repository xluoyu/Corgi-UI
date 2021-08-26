import { SFCWithInstall } from '@utils/type';
import Space from './src/Space.vue'

Space.install = (app) => {
  app.component(Space.name, Space);
}

const _Space: SFCWithInstall<typeof Space> = Space

export default _Space