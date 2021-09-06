import { SFCWithInstall } from '@utils/type'
import ThemeConfig from './src/ThemeConfig.vue'

ThemeConfig.install = app => {
  app.component(ThemeConfig.name, ThemeConfig)
}

export const CgThemeConfig = ThemeConfig as SFCWithInstall<typeof ThemeConfig>

