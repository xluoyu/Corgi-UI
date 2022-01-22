import defaultCssVar from '../../style/index'
import { isObject } from '@corgi-box/utils'
import { IThemeCssVar } from '../typings'
import { cloneDeep, merge } from 'lodash-es'


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
const CgBodyCssVar = {}
const defaultVar = getGlobalCssVar()

type TCssVar = { [x: string]: string | TCssVar; }
const mountBodyCssVar = (changeList: TCssVar) => {
  const bodyStyle = getComputedStyle(document.body)

  const runList = (list: TCssVar, prefix: string) => {
    Object.keys(list).forEach(key => {
      const valKey = prefix + '-' + key
      if (isObject(changeList[key])) {
        runList(changeList[key] as TCssVar, valKey)
      } else {
        const oldVal = bodyStyle.getPropertyValue(valKey)
        if (oldVal != list[key]) {
          document.body.style.setProperty(valKey, list[key] as string)
        }
      }
    })
  }

  runList(changeList, '--Cg')
}

/**
 *
 * 根据传入的所需字段，比对当前绑定在body上的css变量，挂在上所需的变量
 *
 * @param varList cssVar[] 传入默认的css变量中所需的字段
 */
export const useGlobalCssVar = varList => {
  const changeList = {}
  varList.forEach(key => {
    if (!CgBodyCssVar[key] || CgBodyCssVar[key] != defaultVar[key] && defaultVar[key]) {
      changeList[key] = defaultVar[key]
      CgBodyCssVar[key] = defaultVar[key]
    }
  })
  mountBodyCssVar(changeList)
}
