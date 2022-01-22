import { warn } from '../index'

/**
 * 获取某个dom节点上的css变量
 * @param el
 * @param key
 * @returns
 */
export const getBodyVar = (el: string, key: string) => {
  const bodyEl = document.querySelector(el) as HTMLElement
  return getComputedStyle(bodyEl).getPropertyValue(key)
}



/**
 * 16进制颜色转RGBA
 * @param color 16进制颜色
 * @param a 透明度
 * @param type 返回值格式 string -> 'rgba(xxx,xxx,xxx,xx)'  array -> [xxx,xxx,xxx,xx]
 * @returns
 */

export function colorToRgba (color: string, type: 'string', a?: number): string
export function colorToRgba (color: string, type: 'array', a?: number): number[]
export function colorToRgba (color: string, type: 'string' | 'array' = 'string', a?: number) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  color = color.toLocaleLowerCase()

  if (reg.test(color)) {
    const colorArr = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`).substring(1).match(/.{2}/g).map(x => parseInt(x, 16))
    if (type === 'string') {
      return 'rgba(' + colorArr.join(', ') + (a ? ', ' + a : '') + ')'
    } else {
      return colorArr
    }
  } else {
    if (type === 'string') {
      return color
    } else {
      let res = color.match(/(\d(\.\d+)?)+/g) || [] as number[]
      if (!res.length) {
        warn('colorToRgba', `传入的${color}未找到数值`)
        return []
      }
      res = res.map(Number)
      a && res.push(a)
      return res
    }
  }
}

/**
 * 传入背景颜色，返回字体颜色
 * @param bgColor 16进制 或 RGB
 * @returns Boolean true -> #000 false -> #fff
 */
export const isLight = (bgColor: string): boolean => {
  const rgbArr = colorToRgba(bgColor,'array', 1)
  return (0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2)
}
