import cssvar from '@corgi/components/style/index'
import { colorToRgba } from '@corgi/utils'

const MenubarVar = {
  theme: cssvar.primary,
  activeColor: cssvar.primary,
  activeBackground: colorToRgba(cssvar.primary, 'string', .2),
}

export default Object.assign({}, cssvar, MenubarVar)
