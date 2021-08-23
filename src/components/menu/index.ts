import { componentPrefix } from '../../config';
import Menu from './src/Menu.vue'

export default {
  install (app) {
    app.component(componentPrefix + Menu.name, Menu);
  }
}