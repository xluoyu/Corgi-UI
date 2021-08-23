import { componentPrefix } from '../../config';
import ScrollBar from './src/Scrollbar.vue'

export default {
  install (app) {
    app.component(componentPrefix + ScrollBar.name, ScrollBar);
  }
}