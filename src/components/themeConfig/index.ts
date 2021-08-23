import { componentPrefix } from '../../config';
import ThemeConfig from './src/ThemeConfig.vue'

export default {
  install (app) {
    app.component(componentPrefix + ThemeConfig.name, ThemeConfig);
  }
}