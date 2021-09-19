import { colorToRgba } from '@corgi/utils'

const MenubarVar = cssvar => {
  return {
    theme: cssvar.primary.bg,
    activeColor: cssvar.primary.bg,
    activeBackground: colorToRgba(cssvar.primary.bg, 'string', .2),
  }
}


export default MenubarVar
