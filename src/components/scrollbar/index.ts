import { SFCWithInstall } from '@/utils/type';
import ScrollBar from './src/Scrollbar.vue'

ScrollBar.install = (app) => {
  app.component(ScrollBar.name, ScrollBar);
}

const _ScrollBar: SFCWithInstall<typeof ScrollBar> = ScrollBar

export default _ScrollBar