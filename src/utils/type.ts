import type { Plugin } from 'vue'

export interface IThemeCssVar {
  [propName: string]: any
}

export type SFCWithInstall<T> = T & Plugin