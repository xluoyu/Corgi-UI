import { isObject } from './typeTool'
import { warn } from './warn'
import { IThemeCssVar } from './type'
import { cloneDeep, merge } from 'lodash'

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

/**
 * 混合定制与默认主题
 *
 * @param customTheme
 * @param defaultTheme
 * @returns
 */
export const assignThemecustom = (customTheme: IThemeCssVar, defaultTheme: IThemeCssVar): IThemeCssVar => {
  const newTheme = Object.assign({}, defaultTheme)
  Object.keys(customTheme).forEach(key => {
    if (isObject(customTheme[key]) && newTheme[key] && isObject(newTheme[key])) {
      newTheme[key] = Object.assign({}, newTheme[key], customTheme[key])
    } else if (newTheme[key]) {
      newTheme[key] = customTheme[key]
    }
  })

  return newTheme
}

import defaultCssVar from '@corgi/components/style/index'
import { createTextVNode, VNodeChild, computed, reactive } from 'vue'

/**
 *  获取全局预设变量
 *
 * 混淆自定义的全局变量
 * @param customTheme
 * @returns
 */
export const getGlobalCssVar = (customTheme?: IThemeCssVar): IThemeCssVar => {
  const defaultVar = cloneDeep(defaultCssVar)
  if (!customTheme && !isObject(customTheme)) return defaultVar
  // 混淆预设与自定义
  merge(defaultVar, customTheme)

  return defaultVar
}

/**
 * 获取全局预设变量、组件独有变量、自定义组件独有变量
 *
 * @param customTheme 组定义主题 inject<IThemeCssVar>('theme', null)
 * @param componentVarFn 组件内变量
 * @param componentName 组件名
 * @returns
 */
export const getComponentCssVar = (componentName: string, customTheme: IThemeCssVar, componentVarFn?: (cssvar?: IThemeCssVar) => IThemeCssVar ) => {
  const defaultVar = getGlobalCssVar(customTheme)
  let componentCssVar: IThemeCssVar = {}
  if (componentVarFn) {
    componentCssVar = componentVarFn(defaultVar) // 组件独有
  }
  if (customTheme && customTheme[componentName]) {
    merge(componentCssVar, customTheme[componentName])
  }
  return { ...defaultVar, ...componentCssVar }
}

// 当前的挂载在body上的css变量
const CgBodyCssVar = reactive({})

const mountBodyCssVar = () => {
  const defaultVar = getGlobalCssVar()
  // 默认的
  Object.keys(defaultVar).forEach(key => {
    if (!CgBodyCssVar[key]) {
      CgBodyCssVar[key] = defaultVar[key]
    }
  })
}

export const useGlobalCssVar = (componentName: string, customTheme: IThemeCssVar, componentVarFn?: (cssvar?: IThemeCssVar) => IThemeCssVar ) => {
  const onwCssVar = reactive({})

  // return computed(() => {
  //   CgBodyCssVar
  // })
}

export const cssObjToCssVar = obj => {

}
