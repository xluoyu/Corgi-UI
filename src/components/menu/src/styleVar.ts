import cssvar from '@corgi/components/style/index'
import { colorToRgba } from '@corgi/utils'

const MenubarVar = {
  theme: cssvar.primary.bg,
  activeColor: cssvar.primary.bg,
  activeBackground: colorToRgba(cssvar.primary.bg, 'string', .2),
}

export default Object.assign({}, cssvar, MenubarVar)
